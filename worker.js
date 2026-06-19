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
         lang_count        AS langCount
    FROM games`;

// 지역(region_prices): 원시 ×100을 ÷100 해 실가로, currency 함께. 모양은 games와 동일 + currency.
// 이름은 지역 언어명 우선(영문명 등), 장르는 한국 games에서 가져온다.
const REGION_SUMMARY = `
  SELECT r.appid                              AS appid,
         COALESCE(NULLIF(r.name,''), g.name)  AS name,
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
         g.lang_count                         AS langCount
    FROM region_prices r
    LEFT JOIN games g ON g.appid = r.appid`;

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
        if (cc) {
          try {
            const { results } = await env.DB
              .prepare(`${REGION_SUMMARY} WHERE r.cc=? AND (g.name LIKE ? OR r.name LIKE ?) ORDER BY r.discount_percent DESC LIMIT 30`)
              .bind(cc, `%${q}%`, `%${q}%`).all();
            if (results && results.length) return json(await withHistory(env, results, cc));
          } catch (e) { /* 지역 테이블 없음/오류 → 한국 폴백 */ }
        }
        const { results } = await env.DB
          .prepare(`${SUMMARY} WHERE name LIKE ? ORDER BY discount_percent DESC LIMIT 30`)
          .bind(`%${q}%`).all();
        return json(await withHistory(env, results));
      }

      if (path === "/api/lowest-today") {
        if (cc) {
          try {
            const { results } = await env.DB
              .prepare(`${REGION_SUMMARY} WHERE r.cc=? AND r.is_low_today=1 ORDER BY r.discount_percent DESC LIMIT 40`)
              .bind(cc).all();
            if (results && results.length) return json(await withHistory(env, results, cc));
          } catch (e) { /* 폴백 */ }
        }
        const { results } = await env.DB
          .prepare(`${SUMMARY} WHERE is_low_today=1 ORDER BY discount_percent DESC LIMIT 40`).all();
        return json(await withHistory(env, results));
      }

      if (path === "/api/deals") {
        const limit = Math.min(Number(url.searchParams.get("limit")) || 60, 120);
        if (cc) {
          try {
            const { results } = await env.DB
              .prepare(`${REGION_SUMMARY} WHERE r.cc=? AND r.discount_percent > 0 ORDER BY r.discount_percent DESC, r.current_price ASC LIMIT ?`)
              .bind(cc, limit).all();
            if (results && results.length) return json(await withHistory(env, results, cc));
          } catch (e) { /* 폴백 */ }
        }
        const { results } = await env.DB
          .prepare(`${SUMMARY} WHERE discount_percent > 0 ORDER BY discount_percent DESC, current_price ASC LIMIT ?`)
          .bind(limit).all();
        return json(await withHistory(env, results));
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
