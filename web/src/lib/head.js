import { money } from "./format";
import { translate, getCurrentLang } from "../i18n";

// 문서의 제목·메타·구조화데이터를 화면 상태(+현재 언어)에 맞춰 갱신한다.
// - 브라우저 탭 제목, 구글(JS 실행함) 색인, SPA 내 공유 미리보기에 반영.
// - JS 미실행 봇(카톡 등)은 Pages 함수(functions/index.js·functions/game/[appid].js)가 서버에서 한국어 메타를 주입.

function set(selector, attr, value) {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
}

// 라우트마다 고유 canonical을 박아 게임 페이지가 홈으로 흡수되는 것을 막는다.
function setCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "canonical");
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

// 색인 여부 제어. noindex=true면 robots noindex, false면 메타 제거(기본 색인).
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
  const L = getCurrentLang();
  const title = translate(L, "meta.defaultTitle");
  const desc = translate(L, "meta.defaultDesc");
  document.title = title;
  set('meta[name="description"]', "content", desc);
  set('meta[property="og:title"]', "content", title);
  set('meta[property="og:description"]', "content", desc);
  set('meta[property="og:url"]', "content", location.origin + "/");
  set('meta[property="og:image"]', "content", "");
  set('meta[name="twitter:title"]', "content", title);
  set('meta[name="twitter:description"]', "content", desc);
  set('meta[name="twitter:image"]', "content", "");
  setCanonical(location.origin + "/");
  setRobots(false);
  removeJsonLd();
}

export function setGameHead(game) {
  if (!game || !game.appid) return resetHead();
  const L = getCurrentLang();
  const onSale = Number(game.discountPercent) > 0;
  const hasLow = Number(game.allTimeLow) > 0;
  const cur = money(game.currentPrice, game.currency);
  const title = translate(L, "meta.gameTitle", { name: game.name, cur });
  const sale = onSale ? translate(L, "meta.gameDescSale", { pct: game.discountPercent }) : "";
  const atl = hasLow ? translate(L, "meta.gameDescAtl", { p: money(game.allTimeLow, game.currency) }) : "";
  const desc = translate(L, "meta.gameDesc", { name: game.name, cur, sale, atl });
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
  // 현재가가 없는(빈) 페이지만 색인 제외. 가격·역대최저·판정·고유 본문이 있으면 색인 허용.
  setRobots(!(Number(game.currentPrice) > 0));
  setJsonLd(game, img, game.currency || "KRW");
}

// 구글 리치 결과용 Product/Offer 구조화데이터(JSON-LD).
// 통화는 화면 통화(game.currency)를 따른다 — 영어/일본어 등에서 가격·통화가 어긋나지 않게.
function setJsonLd(game, img, currency) {
  removeJsonLd();
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: game.name,
    image: img,
    offers: {
      "@type": "Offer",
      priceCurrency: currency || "KRW",
      price: Number(game.currentPrice) || 0,
      availability: "https://schema.org/InStock",
      url: `https://store.steampowered.com/app/${game.appid}/`,
    },
  };
  // 개발사가 있으면 brand로(유효·안전). 별점은 메타크리틱(점수)과 리뷰수(개수)가 출처가 달라
  // aggregateRating으로 묶으면 잘못된 마크업이 되므로 넣지 않는다.
  if (game.developer) data.brand = { "@type": "Organization", name: game.developer };
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
// - title: 글 제목(현재 언어 콘텐츠에서 옴). 'Lowstamp'이 안 들어 있으면 "<title> · Lowstamp"으로.
// - description/path/type 는 호출부에서 전달.
export function setPageHead({ title, description, path, type } = {}) {
  const L = getCurrentLang();
  const def = translate(L, "meta.defaultTitle");
  const hasBrand = typeof title === "string" && title.includes("Lowstamp");
  const docTitle = title ? (hasBrand ? title : `${title} · Lowstamp`) : def;
  const desc = description || translate(L, "meta.defaultDesc");
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
