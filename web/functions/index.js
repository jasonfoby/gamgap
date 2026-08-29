// Cloudflare Pages 함수: 홈("/") 요청 처리.
// - 과거 딥링크 "/?game=appid" → 정식 "/game/appid" 로 301(영구) 리다이렉트.
// - 그 외엔 방문자 언어(Accept-Language)에 맞춰 홈 메타(제목·설명·OG 이미지·locale·<html lang>)를
//   주입한 뒤 SPA 껍데기(index.html)를 돌려준다. → 카톡·트위터·디스코드 등으로 홈을 공유할 때
//   보는 사람 언어의 미리보기(특히 og-<lang>.jpg 공유 이미지)가 나가도록 한다(단일 URL 한계 내 최선).
//   ※ 페북·트위터 크롤러는 Accept-Language 를 잘 안 보내 기본(영어)으로 떨어질 수 있음 — 언어별 완전
//     분리는 추후 언어별 URL(/en/ 등) + hreflang 단계에서 마무리.
// (게임별 메타·OG는 functions/game/[appid].js, 백엔드는 건드리지 않음.)
import { homeBody } from "./_shared/content.js";

const SUPPORTED = ["ko", "en", "ja", "zh", "es", "pt"];
const DEFAULT = "en"; // 글로벌 타깃 — 못 알아보는 언어는 영어로.
const LOCALE = { ko: "ko_KR", en: "en_US", ja: "ja_JP", zh: "zh_CN", es: "es_ES", pt: "pt_BR" };

// 홈 메타(제목·설명). src/i18n/<lang>.js 의 meta.defaultTitle / meta.defaultDesc 와 동기화 유지.
const META = {
  ko: {
    t: "Lowstamp — 스팀 게임 최저가·지금 사도 돼?",
    d: "스팀 게임이 지금 살 만한 가격인지, 역대 최저가와 비교해 '지금 사도 돼?'를 한 줄로. 비싸게 사지 않게 도와드려요.",
  },
  en: {
    t: "Lowstamp — Steam game lowest prices & should you buy now?",
    d: "Is a Steam game a good price right now, or should you wait? We check it against its all-time low and tell you in one line — so you don't overpay.",
  },
  ja: {
    t: "Lowstamp — Steam ゲームの最安値・今買っていい?",
    d: "Steam ゲームが今買い時か、それとも待つべきか。過去最安値と比べて「今買っていい?」を一行で。高く買って損しないように。",
  },
  zh: {
    t: "Lowstamp —— Steam 游戏最低价 · 现在入手合适吗？",
    d: "Steam 游戏现在这个价该不该买，还是再等等？对比历史最低价，一行告诉你“现在入手合适吗”，帮你别买贵了。",
  },
  es: {
    t: "Lowstamp — Mínimos de juegos de Steam y ¿conviene comprar ahora?",
    d: "¿Es buen precio ahora un juego de Steam o conviene esperar? Lo comparamos con su mínimo histórico y te decimos en una línea si conviene comprarlo, para que no pagues de más.",
  },
  pt: {
    t: "Lowstamp — menor preço de jogos da Steam e vale a pena comprar agora?",
    d: "Um jogo da Steam está num bom preço agora ou é melhor esperar? Comparamos com o menor preço histórico e dizemos em uma linha se vale a pena comprar, pra você não pagar caro.",
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

  // 봇용 본문을 #root 에 주입한다. JS를 안 돌리는 크롤러(빙·AI 크롤러 등)에게 홈이 빈 껍데기로
  // 나가지 않게 하기 위한 것이다.
  // ⚠ 반드시 <noscript> 로 감싼다. 예전엔 그냥 #root 에 넣고 index.html 의 인라인 스크립트로
  //   첫 페인트 전에 지우려 했지만, 실측(2026-08-30 PageSpeed 데스크탑) 결과 CLS 0.75 로 튀었다.
  //   응답이 스트리밍이라 '주입 본문' 청크와 '지우는 스크립트' 청크 사이에 브라우저가 한 번 그려버리기
  //   때문이다(느린 모바일에선 스타일시트가 늦어 안 그려져서 0 이 나와 오래 못 잡았다).
  //   <noscript> 는 JS 가 켜진 브라우저에서 '절대' 렌더되지 않으므로 구조적으로 이동이 불가능하고,
  //   JS 를 안 돌리는 크롤러는 안의 내용을 그대로 읽는다.
  const wrapped =
    `<noscript><main style="max-width:760px;margin:0 auto;padding:24px;font-family:sans-serif;line-height:1.6">${homeBody(lang)}</main></noscript>`;

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
    .on("#root", { element(e) { e.setInnerContent(wrapped, { html: true }); } })
    .transform(shell);

  // 언어별로 응답이 달라지므로 한 언어로 캐시가 굳지 않게.
  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language");
  out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return out;
}
