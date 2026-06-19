// Cloudflare Pages 함수: 홈("/") 요청 처리.
// - 과거 딥링크 "/?game=appid" → 정식 "/game/appid" 로 301(영구) 리다이렉트.
// - 그 외엔 방문자 언어(Accept-Language)에 맞춰 홈 메타(제목·설명·OG 이미지·locale·<html lang>)를
//   주입한 뒤 SPA 껍데기(index.html)를 돌려준다. → 카톡·트위터·디스코드 등으로 홈을 공유할 때
//   보는 사람 언어의 미리보기(특히 og-<lang>.jpg 공유 이미지)가 나가도록 한다(단일 URL 한계 내 최선).
//   ※ 페북·트위터 크롤러는 Accept-Language 를 잘 안 보내 기본(영어)으로 떨어질 수 있음 — 언어별 완전
//     분리는 추후 언어별 URL(/en/ 등) + hreflang 단계에서 마무리.
// (게임별 메타·OG는 functions/game/[appid].js, 백엔드는 건드리지 않음.)

const SUPPORTED = ["ko", "en", "ja", "zh", "es", "pt"];
const DEFAULT = "en"; // 글로벌 타깃 — 못 알아보는 언어는 영어로.
const LOCALE = { ko: "ko_KR", en: "en_US", ja: "ja_JP", zh: "zh_CN", es: "es_ES", pt: "pt_BR" };

// 홈 메타(제목·설명). src/i18n/<lang>.js 의 meta.defaultTitle / meta.defaultDesc 와 동기화 유지.
const META = {
  ko: {
    t: "Lowstamp — 스팀 게임 원화 최저가·지금 사도 돼?",
    d: "스팀 게임의 현재 원화 가격과 역대 최저가, '지금 사도 되나' 판정을 한눈에. 키샵 없이 스팀 공식 원화가만 비교합니다.",
  },
  en: {
    t: "Lowstamp — Steam game lowest prices (KRW) & should you buy now?",
    d: "See a Steam game's current price and all-time low, plus a buy-or-wait verdict, at a glance. Official Steam prices only, no key shops.",
  },
  ja: {
    t: "Lowstamp — Steam ゲームの最安値・今買っていい?",
    d: "Steam ゲームの現在価格と過去最安値、「今が買い時か」の判定をひと目で。キーショップ抜きで Steam 公式価格だけを比較します。",
  },
  zh: {
    t: "Lowstamp —— Steam 游戏韩元最低价 · 现在入手合适吗？",
    d: "一眼看清 Steam 游戏的当前韩元价格、历史最低价，以及现在该不该买。不走激活码站，只比较 Steam 官方韩元价。",
  },
  es: {
    t: "Lowstamp — Mínimos de juegos de Steam y ¿conviene comprar ahora?",
    d: "El precio actual de los juegos de Steam, su mínimo histórico y el veredicto de “¿conviene comprar ahora?” de un vistazo. Solo el precio oficial de Steam, sin tiendas de claves.",
  },
  pt: {
    t: "Lowstamp — menor preço de jogos da Steam e vale a pena comprar agora?",
    d: "Veja de relance o preço atual e o menor preço histórico de jogos da Steam, além do veredito “vale a pena comprar agora”. Comparamos só o preço oficial da Steam, sem sites de chave.",
  },
};

// Accept-Language 헤더에서 지원 언어 하나를 고른다. 예: "ja,en-US;q=0.9" → "ja". 못 찾으면 영어.
function pickLang(al) {
  if (!al) return DEFAULT;
  for (const part of al.toLowerCase().split(",")) {
    const base = part.split(";")[0].trim().split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return DEFAULT;
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const gid = url.searchParams.get("game");

  if (gid && /^\d+$/.test(gid)) {
    return Response.redirect(`${url.origin}/game/${gid}`, 301);
  }

  const shell = await env.ASSETS.fetch(new URL("/index.html", url));

  const lang = pickLang(request.headers.get("Accept-Language"));
  const m = META[lang] || META[DEFAULT];
  const img = `${url.origin}/og-${lang}.jpg`;
  const locale = LOCALE[lang] || "en_US";

  const res = new HTMLRewriter()
    .on("html", { element(e) { e.setAttribute("lang", lang); } })
    .on("title", { element(e) { e.setInnerContent(m.t); } })
    .on('meta[name="description"]', { element(e) { e.setAttribute("content", m.d); } })
    .on('meta[property="og:title"]', { element(e) { e.setAttribute("content", m.t); } })
    .on('meta[property="og:description"]', { element(e) { e.setAttribute("content", m.d); } })
    .on('meta[property="og:image"]', { element(e) { e.setAttribute("content", img); } })
    .on('meta[property="og:locale"]', { element(e) { e.setAttribute("content", locale); } })
    .on('meta[name="twitter:title"]', { element(e) { e.setAttribute("content", m.t); } })
    .on('meta[name="twitter:description"]', { element(e) { e.setAttribute("content", m.d); } })
    .on('meta[name="twitter:image"]', { element(e) { e.setAttribute("content", img); } })
    .transform(shell);

  // 언어별로 응답이 달라지므로 한 언어로 캐시가 굳지 않게.
  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language");
  out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return out;
}
