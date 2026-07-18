// Cloudflare Pages 함수: /game/:appid 요청에 게임 가격으로 제목·메타·canonical·OG·JSON-LD를
// 서버에서 주입한다. 카톡·디스코드·트위터·구글 등 JS 미실행 봇에게도 개별 게임 페이지가
// 독립적으로 보이고 색인되도록 하는 핵심(클라이언트 GamePage가 그릴 화면과 같은 메타).
// 방문자 언어(Accept-Language)에 맞춰 언어·통화·지역을 골라 렌더한다(functions/index.js 와 동일한 방식).
// (기존 Worker/D1/크롤러는 건드리지 않음 — 프런트 배포에 딸린 함수. 가격/판정 로직 불변.)
// 클라이언트 GamePage 와 같은 분석 문단(역대 최저가 격차·추적 기간 통계)을 봇 본문에도 넣기 위해
// i18n 사전의 gp.prose* 키를 재사용한다(순수 JS라 함수 런타임에서 안전).
import { translate } from "../../src/i18n/index.js";
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
    homeLink: "Lowstamp 홈 — 오늘의 역대 최저가",
    guideLink: "게임 싸게 사는 가이드",
    descFact: (reviews, meta) => meta ? ` 메타크리틱 ${meta}점.` : (reviews ? ` 스팀 평가 ${reviews}개+.` : ""),
    meta2: (n, { dev, year, reviews, meta }) => {
      let a = "";
      if (dev && year) a = `${n}, ${dev}가 ${year}년에 출시한 게임입니다.`;
      else if (dev) a = `${n}, ${dev}가 만든 게임입니다.`;
      else if (year) a = `${n}, ${year}년에 출시된 게임입니다.`;
      let b = "";
      if (reviews && meta) b = ` 스팀 이용자 평가 ${reviews}개, 메타크리틱 점수는 ${meta}점입니다.`;
      else if (reviews) b = ` 스팀 이용자 평가가 ${reviews}개 쌓였습니다.`;
      else if (meta) b = ` 메타크리틱 점수는 ${meta}점입니다.`;
      return (a + b).trim();
    },
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
    homeLink: "Lowstamp home — today's all-time lows",
    guideLink: "Guide: how to buy games cheap",
    descFact: (reviews, meta) => meta ? ` Metacritic ${meta}.` : (reviews ? ` ${reviews}+ Steam reviews.` : ""),
    meta2: (n, { dev, year, reviews, meta }) => {
      let a = "";
      if (dev && year) a = `${n} was developed by ${dev} and released in ${year}.`;
      else if (dev) a = `${n} was developed by ${dev}.`;
      else if (year) a = `${n} was released in ${year}.`;
      let b = "";
      if (reviews && meta) b = ` It has ${reviews}+ Steam user reviews and a Metacritic score of ${meta}.`;
      else if (reviews) b = ` It has ${reviews}+ Steam user reviews.`;
      else if (meta) b = ` It has a Metacritic score of ${meta}.`;
      return (a + b).trim();
    },
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
    homeLink: "Lowstamp ホーム — 本日の過去最安値",
    guideLink: "ガイド: ゲームを安く買う方法",
    descFact: (reviews, meta) => meta ? ` メタスコア ${meta}。` : (reviews ? ` Steam レビュー ${reviews}件+。` : ""),
    meta2: (n, { dev, year, reviews, meta }) => {
      let a = "";
      if (dev && year) a = `${n} は ${dev} が ${year} 年にリリースしたゲームです。`;
      else if (dev) a = `${n} は ${dev} が手がけたゲームです。`;
      else if (year) a = `${n} は ${year} 年にリリースされたゲームです。`;
      let b = "";
      if (reviews && meta) b = ` Steam のユーザーレビューは ${reviews} 件、メタスコアは ${meta} です。`;
      else if (reviews) b = ` Steam のユーザーレビューは ${reviews} 件です。`;
      else if (meta) b = ` メタスコアは ${meta} です。`;
      return (a + b).trim();
    },
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
    homeLink: "Lowstamp 首页 — 今日历史最低价",
    guideLink: "指南：如何便宜买游戏",
    descFact: (reviews, meta) => meta ? ` Metacritic ${meta}。` : (reviews ? ` Steam 评测 ${reviews}+。` : ""),
    meta2: (n, { dev, year, reviews, meta }) => {
      let a = "";
      if (dev && year) a = `${n} 由 ${dev} 开发，${year} 年发行。`;
      else if (dev) a = `${n} 由 ${dev} 开发。`;
      else if (year) a = `${n} 于 ${year} 年发行。`;
      let b = "";
      if (reviews && meta) b = ` Steam 上有 ${reviews}+ 条用户评测，Metacritic 评分 ${meta}。`;
      else if (reviews) b = ` Steam 上有 ${reviews}+ 条用户评测。`;
      else if (meta) b = ` Metacritic 评分 ${meta}。`;
      return (a + b).trim();
    },
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
    homeLink: "Inicio de Lowstamp — mínimos históricos de hoy",
    guideLink: "Guía: cómo comprar juegos baratos",
    descFact: (reviews, meta) => meta ? ` Metacritic ${meta}.` : (reviews ? ` ${reviews}+ reseñas en Steam.` : ""),
    meta2: (n, { dev, year, reviews, meta }) => {
      let a = "";
      if (dev && year) a = `${n} fue desarrollado por ${dev} y se lanzó en ${year}.`;
      else if (dev) a = `${n} fue desarrollado por ${dev}.`;
      else if (year) a = `${n} se lanzó en ${year}.`;
      let b = "";
      if (reviews && meta) b = ` Tiene ${reviews}+ reseñas de usuarios en Steam y una puntuación Metacritic de ${meta}.`;
      else if (reviews) b = ` Tiene ${reviews}+ reseñas de usuarios en Steam.`;
      else if (meta) b = ` Tiene una puntuación Metacritic de ${meta}.`;
      return (a + b).trim();
    },
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
    homeLink: "Início do Lowstamp — menores preços de hoje",
    guideLink: "Guia: como comprar jogos barato",
    descFact: (reviews, meta) => meta ? ` Metacritic ${meta}.` : (reviews ? ` ${reviews}+ avaliações na Steam.` : ""),
    meta2: (n, { dev, year, reviews, meta }) => {
      let a = "";
      if (dev && year) a = `${n} foi desenvolvido por ${dev} e lançado em ${year}.`;
      else if (dev) a = `${n} foi desenvolvido por ${dev}.`;
      else if (year) a = `${n} foi lançado em ${year}.`;
      let b = "";
      if (reviews && meta) b = ` Tem ${reviews}+ avaliações de usuários na Steam e uma nota Metacritic de ${meta}.`;
      else if (reviews) b = ` Tem ${reviews}+ avaliações de usuários na Steam.`;
      else if (meta) b = ` Tem uma nota Metacritic de ${meta}.`;
      return (a + b).trim();
    },
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
  const grp = (x) => String(x).replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 천단위 콤마

  // 색인 기준: 리뷰 2,000개↑ 또는 메타크리틱이 있는 '알찬' 게임만 검색에 노출한다(애드센스 '가치 낮은
  // 콘텐츠' 대응 — 얕은 양산형·비주류 페이지를 색인에서 제외). 그 아래 게임은 페이지는 정상(200)으로
  // 보여주되 robots noindex 를 덧붙인다. ⚠ 워커 INDEX_MIN_REVIEWS(=2000)·/api/appids 와 반드시 같게 유지.
  const thin = !(Number(game.reviewTotal) >= 2000 || Number(game.metacritic) > 0);

  const onSale = Number(game.discountPercent) > 0;
  const cur = fmt(game.currentPrice);
  const atlVal = Number(game.allTimeLow) > 0 ? fmt(game.allTimeLow) : "";

  const title = `${game.name}${s.titleSuffix}${cur} · Lowstamp`;
  const descAtl = atlVal ? s.descAtl(atlVal) : "";
  // 메타 설명 끝에 게임별로 다른 '사실'(메타크리틱 또는 평가 수)을 덧붙여 페이지마다 다르게 한다(중복 메타 방지).
  const descReviews = Number(game.reviewTotal) > 0 ? grp(Number(game.reviewTotal)) : "";
  const descMeta = Number(game.metacritic) > 0 ? Number(game.metacritic) : 0;
  const fact = s.descFact ? s.descFact(descReviews, descMeta) : "";
  const desc =
    `${game.name} ${cur}${onSale ? s.descSale(game.discountPercent) : ""}.` +
    `${descAtl}${s.descTail}${fact}`;
  const img = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
  const pageUrl = `${url.origin}/game/${game.appid}`;

  // 봇용 본문: 빈 <div id="root"> 대신 실제 텍스트(게임명·가격·역대최저·스팀 링크)를 서버에서 채운다.
  // 게임명만 외부 입력이므로 esc() 처리(가격·할인절은 자체 생성 숫자/기호라 안전).
  const nameE = esc(game.name);
  const saleClause = onSale ? s.saleClause(fmt(game.normalPrice), Number(game.discountPercent) || 0) : "";
  const atlDate = game.allTimeLowDate ? ` (${esc(game.allTimeLowDate)})` : "";
  const atlClause = atlVal ? s.atlClause(atlVal, atlDate) : "";
  // 게임별로 달라지는 '사실' 문장 한 줄 더(개발사·출시연도·스팀 평가 수·메타크리틱) →
  // 봇이 보는 본문이 가격 한 문장만 돌려쓰는 양산형으로 보이지 않게 한다. 데이터 없는 항목은 자동 생략.
  const info2 = s.meta2 ? s.meta2(nameE, {
    dev: game.developer ? esc(game.developer) : "",
    year: Number(game.releaseYear) || 0,
    reviews: Number(game.reviewTotal) > 0 ? grp(Number(game.reviewTotal)) : "",
    meta: Number(game.metacritic) > 0 ? Number(game.metacritic) : 0,
  }) : "";

  // 게임별 실데이터 분석 문단(역대 최저가와의 격차 + 추적 기간 평균·최고가) — 클라이언트 gp.prose* 키를
  // 그대로 재사용해 봇 본문도 페이지마다 다른 고유 텍스트가 되게 한다(양산형 한문장 템플릿 인상 완화).
  const hist = Array.isArray(game.history) ? game.history.filter((h) => h && Number(h.p) > 0) : [];
  const aParts = [];
  if (atlVal) {
    const gapNum = Number(game.currentPrice) - Number(game.allTimeLow);
    if (gapNum > 0 && Number(game.allTimeLow) > 0) {
      aParts.push(translate(lang, "gp.proseGap", { cur, atl: atlVal, gap: fmt(gapNum), pct: Math.round((gapNum / Number(game.allTimeLow)) * 100) }));
    } else {
      aParts.push(translate(lang, "gp.proseGapLow", { cur }));
    }
  }
  if (hist.length >= 2) {
    const prices = hist.map((h) => Number(h.p));
    const avg = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
    const since = hist[0] && hist[0].d ? String(hist[0].d).slice(0, 7) : "";
    if (since) aParts.push(translate(lang, "gp.proseStats", { since, avg: fmt(avg), max: fmt(Math.max(...prices)) }));
  }
  const analysis = aParts.join(" "); // 값은 전부 자체 생성 숫자/기호라 esc 불필요

  // 봇이 사이트를 돌아다닐 수 있게(개별 게임 페이지가 고아가 되지 않게) 홈·가이드 내부 링크를 함께 넣는다.
  const bodyHtml =
    `<main style="max-width:880px;margin:0 auto;padding:24px;font-family:sans-serif">` +
    `<h1>${s.h1(nameE)}</h1>` +
    `<p>${s.bodyCur(nameE, cur, saleClause, atlClause)}</p>` +
    (info2 ? `<p>${info2}</p>` : "") +
    (analysis ? `<p>${analysis}</p>` : "") +
    `<p><a href="https://store.steampowered.com/app/${game.appid}/">${s.steamLink(nameE)}</a></p>` +
    `<nav><a href="/">${esc(s.homeLink)}</a> · <a href="/guide">${esc(s.guideLink)}</a></nav>` +
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
        if (thin) e.append(`<meta name="robots" content="noindex,follow">`, { html: true });
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
