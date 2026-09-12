// 방문 분석 — Google Analytics 4(GA4).
//
// 왜 GA4 인가:
//   이 사이트에서 알고 싶은 건 "사람이 다시 오는가"와 "찜·게임 조회·스팀 이동을 하는가"다.
//   Cloudflare Web Analytics 는 쿠키 없는 페이지뷰 집계라 재방문도 커스텀 이벤트도 못 잰다.
//   GA4 는 재방문 사용자·이벤트를 기본으로 보여주고, 같은 구글 계정의 서치 콘솔과 연결하면
//   "어떤 검색어로 들어와서 무엇을 했는지"까지 한곳에서 볼 수 있다.
//   게다가 Google 동의 모드 v2(index.html 의 consent default + lib/consent.js 의 update)가
//   이미 깔려 있어, 동의 전에는 분석 쿠키 없이 익명 신호만 가고 동의하면 정상 수집된다.
//
// 켜는 법: 아래 GA_ID 에 GA4 측정 ID(G-로 시작)를 넣거나, Cloudflare Pages 환경변수
//   VITE_GA_MEASUREMENT_ID 로 넣고 다시 배포한다. 비어 있으면 모든 수집이 꺼진 채(no-op)로 돈다.
//
// 어떤 경우에도 예외를 던지지 않는다 — 분석 코드가 화면을 깨뜨리면 안 되므로.

const GA_ID = (import.meta.env && import.meta.env.VITE_GA_MEASUREMENT_ID) || "";

let gaStarted = false; // gtag.js 를 한 번만 불러오기 위한 표식
let lastPath = null; // 같은 경로 페이지뷰 중복 방지(StrictMode 이중 실행·리렌더 대비)

// GA4 스크립트를 처음 필요할 때 한 번만 붙인다. 준비되면 true.
function ensureGA() {
  if (!GA_ID || typeof window === "undefined" || typeof window.gtag !== "function") return false;
  if (!gaStarted) {
    gaStarted = true;
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(GA_ID);
    document.head.appendChild(s);
    window.gtag("js", new Date());
    // SPA 라 페이지뷰는 경로가 바뀔 때 직접 보낸다(자동 페이지뷰를 켜면 첫 화면만 잡힌다).
    window.gtag("config", GA_ID, { send_page_view: false });
  }
  return true;
}

// 커스텀 이벤트 한 건. 예: track("wishlist_add", { appid: 1091500 })
// 쓰는 이벤트: game_view · wishlist_add · wishlist_remove · steam_click · search_zero
export function track(event, props = {}) {
  try {
    if (typeof window === "undefined") return;
    if (typeof console !== "undefined" && console.debug) console.debug("[analytics] track", event, props);
    // 바깥으로 나가는 클릭(스팀 이동 등)에서도 전송이 끊기지 않게 beacon 방식으로 보낸다.
    if (ensureGA()) window.gtag("event", event, { ...props, transport_type: "beacon" });
    if (typeof window.__gamgapTrack === "function") window.__gamgapTrack(event, props);
  } catch {
    // 분석은 부가 기능 — 어떤 에러도 삼킨다.
  }
}

// 페이지뷰 한 건. Root 가 경로가 바뀔 때마다 부른다.
export function pageview(path) {
  try {
    if (typeof window === "undefined") return;
    const p = path || (window.location && window.location.pathname) || "/";
    if (p === lastPath) return;
    lastPath = p;
    if (typeof console !== "undefined" && console.debug) console.debug("[analytics] pageview", p);
    if (ensureGA()) {
      window.gtag("event", "page_view", {
        page_path: p,
        page_location: window.location.href,
        page_title: document.title,
      });
    }
    if (typeof window.__gamgapPageview === "function") window.__gamgapPageview(p);
  } catch {
    // no-op
  }
}
