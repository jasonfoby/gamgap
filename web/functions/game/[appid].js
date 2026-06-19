// Cloudflare Pages 함수: /game/:appid 요청에 게임 가격으로 제목·메타·canonical·OG·JSON-LD를
// 서버에서 주입한다. 카톡·디스코드·트위터·구글 등 JS 미실행 봇에게도 개별 게임 페이지가
// 독립적으로 보이고 색인되도록 하는 핵심(클라이언트 GamePage가 그릴 화면과 같은 메타).
// 방문자 언어(Accept-Language)에 맞춰 언어·통화·지역을 골라 렌더한다(functions/index.js 와 동일한 방식).
// (기존 Worker/D1/크롤러는 건드리지 않음 — 프런트 배포에 딸린 함수. 가격/판정 로직 불변.)
const API = "https://gamgap-api.ibanisac.workers.dev";

const SUPPORTED = ["ko", "en", "ja", "zh", "es", "pt"];
const DEFAULT = "en"; // 글로벌 타깃 — 못 알아보는 언어는 영어로.
const LOCALE = { ko: "ko_KR", en: "en_US", ja: "ja_JP", zh: "zh_CN", es: "es_ES", pt: "pt_BR" };

// 언어 → 스팀 지역코드(cc)·통화. region.js 와 동기화 유지. ko 는 cc 없이(한국 기본) KRW.
const REGION = {
  ko: { cc: "", currency: "KRW" },
  en: { cc: "us", currency: "USD" },
  ja: { cc: "jp", currency: "JPY" },
  zh: { cc: "cn", currency: "CNY" },
  es: { cc: "es", currency: "EUR" },
  pt: { cc: "br", currency: "BRL" },
};

// 통화 → 표기 정보. KRW/JPY 는 소수점 없음, 나머지는 2자리. (런타임 Intl 의존 없이 안전 수동 포맷)
const CUR = {
  KRW: { sym: "₩", dec: 0, suffix: "" },
  USD: { sym: "$", dec: 2, suffix: "" },
  JPY: { sym: "¥", dec: 0, suffix: "" },
  CNY: { sym: "¥", dec: 2, suffix: "" },
  EUR: { sym: "€", dec: 2, suffix: "" },
  BRL: { sym: "R$", dec: 2, suffix: "" },
};

// 언어별 메타/본문 템플릿. {n}=이름 {c}=현재가 {atl}=역대최저절 {sale}=할인절 등은 함수에서 합성.
// src/i18n/<lang>.js 의 meta.* / gp.* 와 의미상 동기화 유지.
const STR = {
  ko: {
    titleSuffix: " 가격 — 현재 ",
    descSale: (pct) => ` (-${pct}%)`,
    h1: (n) => `${n} 가격 · 역대 최저가`,
    saleClause: (normal, pct) => ` (정가 ${normal}에서 ${pct}% 할인)`,
    atlClause: (atl, date) => `, 역대 최저가는 ${atl}${date}`,
    descAtl: (atl) => ` 역대최저 ${atl}.`,
    descTail: " 지금 사도 되는지 Lowstamp에서 확인하세요.",
    bodyCur: (n, cur, sale, atl) => `${n}의 스팀 현재가는 ${cur}입니다${sale}${atl}. Lowstamp에서 지금이 살 때인지 ‘지금 사도 돼?’ 판정과 가격 흐름을 확인하세요.`,
    steamLink: (n) => `스팀에서 ${n} 보기`,
  },
  en: {
    titleSuffix: " price — now ",
    descSale: (pct) => ` (-${pct}%)`,
    h1: (n) => `${n} price · all-time low`,
    saleClause: (normal, pct) => ` (${pct}% off the ${normal} list price)`,
    atlClause: (atl, date) => `, and its all-time low is ${atl}${date}`,
    descAtl: (atl) => ` All-time low ${atl}.`,
    descTail: " Check on Lowstamp whether now is a good time to buy.",
    bodyCur: (n, cur, sale, atl) => `${n}'s current Steam price is ${cur}${sale}${atl}. See Lowstamp's buy-or-wait verdict and price history to decide if now is the time.`,
    steamLink: (n) => `View ${n} on Steam`,
  },
  ja: {
    titleSuffix: " 価格 — 現在 ",
    descSale: (pct) => ` (-${pct}%)`,
    h1: (n) => `${n} の価格・過去最安値`,
    saleClause: (normal, pct) => `(定価 ${normal} から ${pct}% 割引)`,
    atlClause: (atl, date) => `、過去最安値は ${atl}${date}`,
    descAtl: (atl) => ` 過去最安値 ${atl}。`,
    descTail: " 今が買い時か Lowstamp で確認しましょう。",
    bodyCur: (n, cur, sale, atl) => `${n} の Steam 現在価格は ${cur} です${sale}${atl}。Lowstamp で「今買っていい?」判定と価格推移を確認しましょう。`,
    steamLink: (n) => `Steam で ${n} を見る`,
  },
  zh: {
    titleSuffix: " 价格 — 现价 ",
    descSale: (pct) => ` (-${pct}%)`,
    h1: (n) => `${n} 价格 · 历史最低价`,
    saleClause: (normal, pct) => `（原价 ${normal}，${pct}% 折扣）`,
    atlClause: (atl, date) => `，历史最低价为 ${atl}${date}`,
    descAtl: (atl) => ` 历史最低价 ${atl}。`,
    descTail: " 到 Lowstamp 看看现在是不是入手的好时机。",
    bodyCur: (n, cur, sale, atl) => `${n} 的 Steam 当前价格为 ${cur}${sale}${atl}。在 Lowstamp 查看“现在入手合适吗？”判定和价格走势。`,
    steamLink: (n) => `在 Steam 查看 ${n}`,
  },
  es: {
    titleSuffix: " precio — ahora ",
    descSale: (pct) => ` (-${pct}%)`,
    h1: (n) => `Precio de ${n} · mínimo histórico`,
    saleClause: (normal, pct) => ` (${pct}% de descuento sobre el precio normal de ${normal})`,
    atlClause: (atl, date) => `, y su mínimo histórico es ${atl}${date}`,
    descAtl: (atl) => ` Mínimo histórico ${atl}.`,
    descTail: " Comprueba en Lowstamp si ahora es buen momento para comprar.",
    bodyCur: (n, cur, sale, atl) => `El precio actual de ${n} en Steam es ${cur}${sale}${atl}. Consulta en Lowstamp el veredicto de comprar o esperar y el historial de precios.`,
    steamLink: (n) => `Ver ${n} en Steam`,
  },
  pt: {
    titleSuffix: " preço — agora ",
    descSale: (pct) => ` (-${pct}%)`,
    h1: (n) => `Preço de ${n} · menor preço histórico`,
    saleClause: (normal, pct) => ` (${pct}% de desconto sobre o preço cheio de ${normal})`,
    atlClause: (atl, date) => `, e o menor preço histórico é ${atl}${date}`,
    descAtl: (atl) => ` Menor preço ${atl}.`,
    descTail: " Veja no Lowstamp se vale a pena comprar agora.",
    bodyCur: (n, cur, sale, atl) => `O preço atual de ${n} na Steam é ${cur}${sale}${atl}. Veja no Lowstamp o veredito de comprar ou esperar e o histórico de preços.`,
    steamLink: (n) => `Ver ${n} na Steam`,
  },
};

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// Accept-Language 헤더에서 지원 언어 하나를 고른다. 예: "ja,en-US;q=0.9" → "ja". 못 찾으면 영어.
function pickLang(al) {
  if (!al) return DEFAULT;
  for (const part of al.toLowerCase().split(",")) {
    const base = part.split(";")[0].trim().split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return DEFAULT;
}

// 통화 기호 + 천단위 콤마 + 언어별 소수 자릿수. (런타임 로케일 의존 없이 안전하게 수동 처리)
function fmtMoney(n, currency, lang) {
  const info = CUR[currency] || CUR.KRW;
  const v = Number(n) || 0;
  const fixed = v.toFixed(info.dec);
  const [intPart, decPart] = fixed.split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const num = decPart ? `${grouped}.${decPart}` : grouped;
  // 한국어 + 원화는 "62,000원" 형태로(클라이언트 won() 과 동일), 그 외엔 기호 접두.
  if (lang === "ko" && currency === "KRW") return `${num}원`;
  return `${info.sym}${num}`;
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const appid = String(params.appid || "").replace(/[^0-9]/g, "");

  const lang = pickLang(request.headers.get("Accept-Language"));
  const region = REGION[lang] || REGION[DEFAULT];
  const s = STR[lang] || STR[DEFAULT];
  const locale = LOCALE[lang] || "en_US";

  // SPA 껍데기(빌드된 index.html) — 봇이든 사람이든 이 위에 메타만 덮어 그린다.
  const shell = await env.ASSETS.fetch(new URL("/index.html", url));

  // 빈/없는 appid: 본문 없는 껍데기를 404 + noindex 로(소프트 404 방지).
  if (!appid) return notFound(shell, lang, locale);

  let game = null;
  try {
    const ccQuery = region.cc ? `?cc=${encodeURIComponent(region.cc)}` : "";
    const r = await fetch(`${API}/api/game/${encodeURIComponent(appid)}${ccQuery}`);
    if (r.ok) game = await r.json();
  } catch {
    /* 실패 시 아래 not-found 경로로 떨어짐 */
  }

  // 현재가가 없는(빈/없는) 페이지: 얇은 자동생성 페이지로 보이지 않게 404 + noindex 로 응답.
  if (!game || !game.appid || !(Number(game.currentPrice) > 0)) {
    return notFound(shell, lang, locale);
  }

  // 워커가 돌려준 통화를 그대로 사용. 해외 데이터가 없는 게임(상위 REGION_MAX 밖)은 워커가
  // 원화로 폴백(currency 없음)하므로, region.currency(달러 등)로 채우면 '원화 값을 달러 기호로'
  // 잘못 표기하게 된다 → KRW로 폴백해 클라이언트(money())와 표기를 일치시킨다.
  const currency = game.currency || "KRW";
  const fmt = (n) => fmtMoney(n, currency, lang);

  const onSale = Number(game.discountPercent) > 0;
  const cur = fmt(game.currentPrice);
  const atlVal = Number(game.allTimeLow) > 0 ? fmt(game.allTimeLow) : "";

  const title = `${game.name}${s.titleSuffix}${cur} · Lowstamp`;
  const descAtl = atlVal ? s.descAtl(atlVal) : "";
  const desc =
    `${game.name} ${cur}${onSale ? s.descSale(game.discountPercent) : ""}.` +
    `${descAtl}${s.descTail}`;
  const img = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
  const pageUrl = `${url.origin}/game/${game.appid}`;

  // 봇용 본문: 빈 <div id="root"> 대신 실제 텍스트(게임명·가격·역대최저·스팀 링크)를 서버에서 채운다.
  // 게임명만 외부 입력이므로 esc() 처리(가격·할인절은 자체 생성 숫자/기호라 안전).
  const nameE = esc(game.name);
  const saleClause = onSale ? s.saleClause(fmt(game.normalPrice), Number(game.discountPercent) || 0) : "";
  const atlDate = game.allTimeLowDate ? ` (${esc(game.allTimeLowDate)})` : "";
  const atlClause = atlVal ? s.atlClause(atlVal, atlDate) : "";
  const bodyHtml =
    `<main style="max-width:880px;margin:0 auto;padding:24px;font-family:sans-serif">` +
    `<h1>${s.h1(nameE)}</h1>` +
    `<p>${s.bodyCur(nameE, cur, saleClause, atlClause)}</p>` +
    `<p><a href="https://store.steampowered.com/app/${game.appid}/">${s.steamLink(nameE)}</a></p>` +
    `</main>`;

  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: game.name,
    image: img,
    offers: {
      "@type": "Offer",
      priceCurrency: currency,
      price: Number(game.currentPrice) || 0,
      availability: "https://schema.org/InStock",
      url: `https://store.steampowered.com/app/${game.appid}/`,
    },
  });

  return new HTMLRewriter()
    .on("html", { element(e) { e.setAttribute("lang", lang); } })
    .on("title", { element(e) { e.setInnerContent(title); } })
    .on('meta[name="description"]', { element(e) { e.setAttribute("content", desc); } })
    .on('link[rel="canonical"]', { element(e) { e.setAttribute("href", pageUrl); } })
    .on('meta[property="og:title"]', { element(e) { e.setAttribute("content", title); } })
    .on('meta[property="og:description"]', { element(e) { e.setAttribute("content", desc); } })
    .on('meta[property="og:image"]', { element(e) { e.setAttribute("content", img); } })
    .on('meta[property="og:url"]', { element(e) { e.setAttribute("content", pageUrl); } })
    .on('meta[property="og:locale"]', { element(e) { e.setAttribute("content", locale); } })
    .on('meta[name="twitter:title"]', { element(e) { e.setAttribute("content", title); } })
    .on('meta[name="twitter:description"]', { element(e) { e.setAttribute("content", desc); } })
    .on('meta[name="twitter:image"]', { element(e) { e.setAttribute("content", img); } })
    .on("#root", { element(e) { e.setInnerContent(bodyHtml, { html: true }); } })
    .on("head", {
      element(e) {
        e.append(`<script type="application/ld+json">${esc(jsonld).replace(/&quot;/g, '"')}</script>`, { html: true });
      },
    })
    .transform(shell);
}

// 현재가 없는/없는 게임: HTTP 404 + noindex 로 응답해 소프트 404(200으로 빈 페이지)를 방지.
function notFound(shell, lang, locale) {
  const res = new HTMLRewriter()
    .on("html", { element(e) { e.setAttribute("lang", lang); } })
    .on('meta[property="og:locale"]', { element(e) { e.setAttribute("content", locale); } })
    .on("head", {
      element(e) {
        e.append(`<meta name="robots" content="noindex,follow">`, { html: true });
      },
    })
    .transform(shell);
  return new Response(res.body, { status: 404, headers: res.headers });
}
