import { lazy, Suspense } from "react";
import { useRoute } from "./lib/router";
import App from "./App";
import CookieConsent from "./components/CookieConsent";

// 홈(App)만 첫 화면에 필요하므로 즉시 로드하고, 나머지 라우트는 그 페이지로 이동할 때만
// 코드를 받아온다(lazy). 이렇게 하면 홈 첫 화면용 JS 번들이 가벼워져 모바일 FCP/LCP 가 준다
// (게임 상세의 차트·통계·지역가격, 가이드 렌더러 등이 홈 로딩에서 빠짐).
// 검색 로봇에는 Pages 함수(functions/)가 서버에서 본문을 주입하므로 SEO 영향은 없다.
const GamePage = lazy(() => import("./pages/GamePage"));
const GuideIndex = lazy(() => import("./pages/GuideIndex"));
const GuideArticle = lazy(() => import("./pages/GuideArticle"));
const ContentPage = lazy(() => import("./pages/ContentPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// 앱 최상위 라우팅 스위치.
// useRoute()로 현재 경로(pathname)를 읽어 어떤 화면을 그릴지 분기한다.
// 콘텐츠 페이지는 slug만 넘기고, 언어별 데이터 로딩은 ContentPage가 직접 처리한다.
// CookieConsent(쿠키 동의 배너)는 어떤 경로에서도 항상 한 번 마운트되도록 맨 아래 둔다.
const GUIDE_PREFIX = "/guide/";
const GAME_PREFIX = "/game/";
const CONTENT_SLUGS = ["privacy", "terms", "about", "contact"];

// 잘못된 퍼센트 인코딩(예: /game/%E0)이 와도 decodeURIComponent가 던지는 URIError로
// 라우팅이 통째로 깨지지 않게 안전하게 디코드한다.
function safeDecode(s) {
  try {
    return decodeURIComponent(s);
  } catch {
    return s;
  }
}

export default function Root() {
  const path = useRoute();

  let page;
  if (path === "/" || path === "") {
    page = <App />;
  } else if (path.startsWith(GAME_PREFIX)) {
    // "/game/1091500" → appid "1091500" (숫자만 허용, 아니면 404)
    const appid = safeDecode(path.slice(GAME_PREFIX.length)).replace(/\/+$/, "");
    page = /^\d+$/.test(appid) ? <GamePage appid={appid} /> : <NotFound />;
  } else if (path === "/guide") {
    page = <GuideIndex />;
  } else if (path.startsWith(GUIDE_PREFIX)) {
    // "/guide/steam-sale-calendar" → slug "steam-sale-calendar"
    const slug = safeDecode(path.slice(GUIDE_PREFIX.length));
    page = <GuideArticle slug={slug} />;
  } else if (CONTENT_SLUGS.includes(path.slice(1))) {
    page = <ContentPage slug={path.slice(1)} />;
  } else {
    page = <NotFound />;
  }

  return (
    <>
      {/* lazy 라우트를 받아오는 짧은 순간 동안 화면 높이를 예약해 푸터가 튀지 않게 한다.
          홈(App)은 lazy 가 아니라 이 fallback 없이 즉시 그려진다. */}
      <Suspense fallback={<div style={{ minHeight: "70vh" }} aria-busy="true" />}>{page}</Suspense>
      <CookieConsent />
    </>
  );
}
