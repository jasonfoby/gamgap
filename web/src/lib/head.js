import { won } from "./format";

// 문서의 제목·메타·구조화데이터를 화면 상태에 맞춰 갱신한다.
// - 브라우저 탭 제목, 구글(JS 실행함) 색인, SPA 내 공유 미리보기에 반영.
// - 카톡/트위터 같은 JS 미실행 봇은 Pages 함수(functions/index.js)가 서버에서 같은 내용을 주입.
const DEFAULT_TITLE = "Lowstamp — 스팀 게임 원화 최저가·지금 사도 돼?";
const DEFAULT_DESC =
  "스팀 게임의 현재 원화 가격과 역대 최저가, '지금 사도 되나' 판정을 한눈에. 키샵 없이 스팀 공식 원화가만 비교합니다.";

function set(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// 정식 주소(canonical) 링크를 현재 페이지에 맞게 갱신한다(없으면 만든다).
// 게임 페이지가 홈으로 흡수되던 문제를 막기 위해, 라우트마다 고유 canonical을 박는다.
function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// 색인 여부 제어. noindex=true면 robots 메타를 noindex로, false면 메타를 제거(=기본 색인).
// 가격 이력이 빈약한 게임 페이지를 색인에서 빼 얇은 페이지 패널티를 방지하는 데 쓴다.
function setRobots(noindex) {
  let el = document.head.querySelector('meta[name="robots"]');
  if (noindex) {
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute("name", "robots");
      document.head.appendChild(el);
    }
    el.setAttribute("content", "noindex,follow");
  } else if (el) {
    el.remove();
  }
}

function steamHeader(appid) {
  return `https://cdn.cloudflare.steamstatic.com/steam/apps/${appid}/header.jpg`;
}

export function resetHead() {
  document.title = DEFAULT_TITLE;
  set('meta[name="description"]', "content", DEFAULT_DESC);
  set('meta[property="og:title"]', "content", DEFAULT_TITLE);
  set('meta[property="og:description"]', "content", DEFAULT_DESC);
  set('meta[property="og:url"]', "content", location.origin + "/");
  set('meta[property="og:image"]', "content", "");
  set('meta[name="twitter:title"]', "content", DEFAULT_TITLE);
  set('meta[name="twitter:description"]', "content", DEFAULT_DESC);
  set('meta[name="twitter:image"]', "content", "");
  setCanonical(location.origin + "/");
  setRobots(false);
  removeJsonLd();
}

export function setGameHead(game) {
  if (!game || !game.appid) return resetHead();
  const onSale = Number(game.discountPercent) > 0;
  const atl = Number(game.allTimeLow) > 0 ? ` 역대최저 ${won(game.allTimeLow)}.` : "";
  const title = `${game.name} 가격 — 현재 ${won(game.currentPrice)} · Lowstamp`;
  const desc =
    `${game.name} 스팀 현재가 ${won(game.currentPrice)}${onSale ? ` (-${game.discountPercent}%)` : ""}.` +
    `${atl} 지금 사도 되는지 Lowstamp에서 확인하세요.`;
  const img = steamHeader(game.appid);
  const url = `${location.origin}/game/${game.appid}`;

  document.title = title;
  set('meta[name="description"]', "content", desc);
  set('meta[property="og:title"]', "content", title);
  set('meta[property="og:description"]', "content", desc);
  set('meta[property="og:image"]', "content", img);
  set('meta[property="og:url"]', "content", url);
  set('meta[name="twitter:title"]', "content", title);
  set('meta[name="twitter:description"]', "content", desc);
  set('meta[name="twitter:image"]', "content", img);
  setCanonical(url);
  // 현재가가 없는(데이터가 빈) 페이지만 색인 제외. 현재가·역대최저·판정·고유 본문이 있으면
  // 게임마다 다른 정보가 있으므로, 가격 이력이 짧아도 색인을 허용한다.
  setRobots(!(Number(game.currentPrice) > 0));
  setJsonLd(game, img);
}

// 구글 리치 결과용 Product/Offer 구조화데이터(JSON-LD).
function setJsonLd(game, img) {
  removeJsonLd();
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: game.name,
    image: img,
    offers: {
      "@type": "Offer",
      priceCurrency: "KRW",
      price: Number(game.currentPrice) || 0,
      availability: "https://schema.org/InStock",
      url: `https://store.steampowered.com/app/${game.appid}/`,
    },
  };
  const s = document.createElement("script");
  s.type = "application/ld+json";
  s.id = "ld-game";
  s.textContent = JSON.stringify(data);
  document.head.appendChild(s);
}

function removeJsonLd() {
  const e = document.getElementById("ld-game");
  if (e) e.remove();
}

// 일반 콘텐츠 페이지(가이드·약관·소개 등)의 제목·메타·OG/트위터를 갱신한다.
// - title: 글 제목. document.title은 "<title> · Lowstamp"으로 맞추되, 이미 'Lowstamp'이 들어 있으면 중복으로 안 붙인다.
// - description: 메타 설명(없으면 기본 설명 사용).
// - path: 현재 경로(예: "/guide/steam-sale-calendar"). og:url/canonical 후보로 location.origin+path 사용.
// - type: og:type 값(예: "article"). 없으면 건드리지 않음(기존 값 유지).
// 게임 상세 전용 JSON-LD(ld-game)는 콘텐츠 페이지엔 어울리지 않으니 깔끔히 제거한다.
export function setPageHead({ title, description, path, type } = {}) {
  const hasBrand = typeof title === "string" && title.includes("Lowstamp");
  const docTitle = title ? (hasBrand ? title : `${title} · Lowstamp`) : DEFAULT_TITLE;
  const desc = description || DEFAULT_DESC;
  const url = location.origin + (path || "/");

  document.title = docTitle;
  set('meta[name="description"]', "content", desc);
  set('meta[property="og:title"]', "content", docTitle);
  set('meta[property="og:description"]', "content", desc);
  set('meta[property="og:url"]', "content", url);
  set('meta[name="twitter:title"]', "content", docTitle);
  set('meta[name="twitter:description"]', "content", desc);
  if (type) set('meta[property="og:type"]', "content", type);
  setCanonical(url);
  setRobots(false);

  // 콘텐츠 페이지엔 상품용 구조화데이터가 남아 있으면 안 되므로 정리.
  removeJsonLd();
}
