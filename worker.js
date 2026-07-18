// Lowstamp API 워커 (Cloudflare Worker: gamgap-api, D1 바인딩명 DB)
// - 한국(원화): games / price_history 테이블 (가격은 ÷100 된 원화 정수).
// - 그 외 지역(미국 등): region_prices / region_price_history 테이블 (스팀 원시 ×100 저장).
//   요청에 ?cc=us 처럼 지역코드가 오면 해당 지역 가격을 ÷100 + currency 필드와 함께 같은 모양으로 내려준다.
//   지역 테이블이 없거나 해당 게임/지역 데이터가 없으면 한국(원화)으로 안전하게 폴백한다(사이트 안 깨지게).
const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};
const json = (data, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...CORS },
  });

// 한국(games): 가격은 이미 ÷100 된 원화 정수. currency 필드는 없음 → 프런트가 원화로 처리.
const SUMMARY = `
  SELECT appid, name,
         normal_price      AS normalPrice,
         current_price     AS currentPrice,
         discount_percent  AS discountPercent,
         all_time_low      AS allTimeLow,
         all_time_low_date AS allTimeLowDate,
         is_low_today      AS isLowToday,
         genres,
         developer,
         release_year      AS releaseYear,
         metacritic,
         controller,
         platforms,
         dlc_count         AS dlcCount,
         langs,
         lang_count        AS langCount,
         review_desc       AS reviewDesc,
         review_total      AS reviewTotal
    FROM games`;

// 지역(region_prices): 원시 ×100을 ÷100 해 실가로, currency 함께. 모양은 games와 동일 + currency.
// 이름은 지역 언어명 우선(영문명 등), 장르는 한국 games에서 가져온다.
const REGION_SUMMARY = `
  SELECT r.appid                              AS appid,
         COALESCE(NULLIF(r.name,''), g.name, '')  AS name,
         r.normal_price  / 100.0              AS normalPrice,
         r.current_price / 100.0              AS currentPrice,
         r.discount_percent                   AS discountPercent,
         r.all_time_low  / 100.0              AS allTimeLow,
         r.all_time_low_date                  AS allTimeLowDate,
         r.is_low_today                       AS isLowToday,
         r.currency                           AS currency,
         g.genres                             AS genres,
         g.developer                          AS developer,
         g.release_year                       AS releaseYear,
         g.metacritic                         AS metacritic,
         g.controller                         AS controller,
         g.platforms                          AS platforms,
         g.dlc_count                          AS dlcCount,
         g.langs                              AS langs,
         g.lang_count                         AS langCount,
         g.review_desc                        AS reviewDesc,
         g.review_total                       AS reviewTotal
    FROM region_prices r
    LEFT JOIN games g ON g.appid = r.appid`;

// '진짜 게임' 품질 기준 — 리뷰가 300개 이상이거나 메타크리틱 점수가 있는 게임만.
// 정가 42,000원을 95% 깎아 2,100원에 파는 양산형(에셋만 갈아끼운 저품질) 떨이는 보통 리뷰가
// 100~120개 안팎이라 이 기준에서 걸러져, 할인·최저가 목록 상단을 점령하지 못한다.
// 이 QUALITY_* 는 '홈 목록(할인 중/오늘의 최저가)'을 채우는 필터다 — 목록이 너무 비지 않게 리뷰 300+ 유지.
const QUALITY_KR = "(review_total >= 300 OR metacritic > 0)"; // 홈 목록(한국 games 쿼리)용
const QUALITY_RG = "(g.review_total >= 300 OR g.metacritic > 0)"; // 홈 목록(지역 region+games join)용

// 검색 '색인' 기준은 홈 목록보다 더 엄격하게(리뷰 2,000+ 또는 메타크리틱). 애드센스 '가치 낮은 콘텐츠'
// 대응 — 얕은 양산형·비주류 페이지 수백 개를 검색 색인에서 빼 사이트 평균 품질을 올린다(홈 목록엔 그대로
// 보이되 검색엔 안 뜨게). ⚠ /api/appids(사이트맵)와 functions/game/[appid].js 의 noindex 기준을 이 값과
// 반드시 같게 유지할 것 — 어긋나면 "사이트맵엔 넣고 페이지는 noindex" 모순이 생긴다.
const INDEX_MIN_REVIEWS = 2000;

// ?cc= 가 한국이 아닌 2글자 지역코드면 그걸, 아니면 null(=한국).
function regionCC(url) {
  const cc = (url.searchParams.get("cc") || "").trim().toLowerCase();
  return /^[a-z]{2}$/.test(cc) && cc !== "kr" ? cc : null;
}

async function krHistory(env, appid, limit = 12) {
  const { results } = await env.DB
    .prepare("SELECT recorded_at AS d, price AS p FROM price_history WHERE appid=? ORDER BY recorded_at DESC LIMIT ?")
    .bind(appid, limit).all();
  return (results || []).reverse();
}
async function regionHistory(env, appid, cc, limit = 12) {
  const { results } = await env.DB
    .prepare("SELECT recorded_at AS d, price/100.0 AS p FROM region_price_history WHERE appid=? AND cc=? ORDER BY recorded_at DESC LIMIT ?")
    .bind(appid, cc, limit).all();
  return (results || []).reverse();
}
async function withHistory(env, rows, cc) {
  const out = [];
  for (const g of rows || [])
    out.push({ ...g, history: cc ? await regionHistory(env, g.appid, cc) : await krHistory(env, g.appid) });
  return out;
}

export default {
  async fetch(req, env) {
    if (req.method === "OPTIONS") return new Response(null, { headers: CORS });
    const url = new URL(req.url);
    const path = url.pathname;
    const cc = regionCC(url);
    try {
      if (path === "/api/search") {
        const q = (url.searchParams.get("q") || "").trim();
        if (!q) return json([]);
        const esc = q.replace(/[\\%_]/g, (c) => "\\" + c); // LIKE 와일드카드(%,_) 이스케이프
        const like = `%${esc}%`;
        // 게임 이름 + 언어별 제목(name_en/ja/zh/es/pt)을 함께 뒤진다 → "巫师"·"ウィッチャー"로 쳐도 매칭.
        // 마이그레이션 0005 전이면 이 칼럼들이 없어 throw → catch 에서 name 만으로 폴백.
        const NAME_COLS = ["name", "name_en", "name_ja", "name_zh", "name_es", "name_pt"];
        const orLike = (col) => NAME_COLS.map((c) => `${col ? col + "." : ""}${c} LIKE ? ESCAPE '\\'`).join(" OR ");
        const likeArgs = NAME_COLS.map(() => like);
        if (cc) {
          try {
            const { results } = await env.DB
              .prepare(`${REGION_SUMMARY} WHERE r.cc=? AND (${orLike("g")} OR r.name LIKE ? ESCAPE '\\') ORDER BY r.discount_percent DESC LIMIT 30`)
              .bind(cc, ...likeArgs, like).all();
            if (results && results.length) return json(results); // 목록은 이력 불필요(홈 카드가 안 씀) → 게임당 이력 조회 생략으로 응답 가속
          } catch (e) { /* 지역 테이블/칼럼 없음 → 한국 폴백 */ }
        }
        try {
          const { results } = await env.DB
            .prepare(`${SUMMARY} WHERE (${orLike("")}) ORDER BY discount_percent DESC LIMIT 30`)
            .bind(...likeArgs).all();
          return json(results); // 목록은 이력 불필요(홈 카드가 안 씀) → 게임당 이력 조회 생략으로 응답 가속
        } catch (e) {
          // 언어별 제목 칼럼이 아직 없을 때(마이그레이션 0005 전): 기존처럼 name 만으로 검색.
          const { results } = await env.DB
            .prepare(`${SUMMARY} WHERE name LIKE ? ESCAPE '\\' ORDER BY discount_percent DESC LIMIT 30`)
            .bind(like).all();
          return json(results); // 목록은 이력 불필요(홈 카드가 안 씀) → 게임당 이력 조회 생략으로 응답 가속
        }
      }

      if (path === "/api/lowest-today") {
        // limit(한 페이지 개수, 최대 100)·offset(건너뛸 개수)로 페이지네이션(무한 스크롤).
        const limit = Math.min(Number(url.searchParams.get("limit")) || 60, 100);
        const offset = Math.max(Number(url.searchParams.get("offset")) || 0, 0);
        if (cc) {
          try {
            const { results } = await env.DB
              .prepare(`${REGION_SUMMARY} WHERE r.cc=? AND r.current_price <= r.all_time_low AND ${QUALITY_RG} ORDER BY r.discount_percent DESC LIMIT ? OFFSET ?`)
              .bind(cc, limit, offset).all();
            if (results && results.length) return json(results); // 목록은 이력 불필요(홈 카드가 안 씀) → 게임당 이력 조회 생략으로 응답 가속
            // 지역 데이터가 있는데 이 페이지가 비었다면 '목록 끝'이므로 한국으로 폴백하지 않는다(끝 페이지에 한국 게임이 섞이는 것 방지).
            if (offset > 0) return json([]);
          } catch (e) { /* 지역 테이블 없음/오류 → 한국 폴백 */ }
        }
        const { results } = await env.DB
          .prepare(`${SUMMARY} WHERE current_price <= all_time_low AND ${QUALITY_KR} ORDER BY discount_percent DESC LIMIT ? OFFSET ?`)
          .bind(limit, offset).all();
        return json(results); // 목록은 이력 불필요(홈 카드가 안 씀) → 게임당 이력 조회 생략으로 응답 가속
      }

      if (path === "/api/deals") {
        // limit(한 페이지 개수, 최대 100)·offset(건너뛸 개수)로 페이지네이션(무한 스크롤).
        const limit = Math.min(Number(url.searchParams.get("limit")) || 60, 100);
        const offset = Math.max(Number(url.searchParams.get("offset")) || 0, 0);
        if (cc) {
          try {
            const { results } = await env.DB
              .prepare(`${REGION_SUMMARY} WHERE r.cc=? AND r.discount_percent > 0 AND ${QUALITY_RG} ORDER BY r.discount_percent DESC, r.current_price ASC LIMIT ? OFFSET ?`)
              .bind(cc, limit, offset).all();
            if (results && results.length) return json(results); // 목록은 이력 불필요(홈 카드가 안 씀) → 게임당 이력 조회 생략으로 응답 가속
            if (offset > 0) return json([]); // 지역 목록 끝 — 한국 폴백 안 함
          } catch (e) { /* 폴백 */ }
        }
        const { results } = await env.DB
          .prepare(`${SUMMARY} WHERE discount_percent > 0 AND ${QUALITY_KR} ORDER BY discount_percent DESC, current_price ASC LIMIT ? OFFSET ?`)
          .bind(limit, offset).all();
        return json(results); // 목록은 이력 불필요(홈 카드가 안 씀) → 게임당 이력 조회 생략으로 응답 가속
      }

      // 사이트맵용 경량 엔드포인트: '색인 허용된' 게임의 appid 배열.
      // ⚠ functions/game/[appid].js 의 noindex 기준(INDEX_MIN_REVIEWS)과 반드시 일치시킨다 —
      //   거기서 (review_total>=2000 OR metacritic>0)가 아니면 noindex 를 붙이므로,
      //   여기서도 같은 조건만 내보내야 "사이트맵엔 넣고 페이지엔 noindex" 모순이 안 생긴다.
      //   (얇은 양산형·비주류 페이지 수백 개를 색인에서 빼 사이트 평균 품질을 올린다 — 애드센스 대응.)
      if (path === "/api/appids") {
        const { results } = await env.DB
          .prepare(`SELECT appid FROM games WHERE current_price > 0 AND (review_total >= ${INDEX_MIN_REVIEWS} OR metacritic > 0) ORDER BY last_checked DESC`).all();
        return json((results || []).map((r) => r.appid));
      }

      const m = path.match(/^\/api\/game\/(\d+)$/);
      if (m) {
        const appid = Number(m[1]);
        if (cc) {
          try {
            const g = await env.DB.prepare(`${REGION_SUMMARY} WHERE r.cc=? AND r.appid=?`).bind(cc, appid).first();
            if (g) {
              g.history = await regionHistory(env, appid, cc, 60);
              return json(g);
            }
          } catch (e) { /* 폴백 */ }
        }
        const g = await env.DB.prepare(`${SUMMARY} WHERE appid=?`).bind(appid).first();
        if (!g) return json({ error: "not_found" }, 404);
        g.history = await krHistory(env, appid, 60);
        return json(g);
      }

      return json({ error: "not_found" }, 404);
    } catch (e) {
      return json({ error: "server_error", detail: String(e) }, 500);
    }
  },
};
