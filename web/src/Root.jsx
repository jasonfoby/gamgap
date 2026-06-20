import { useRoute } from "./lib/router";
import App from "./App";
import GamePage from "./pages/GamePage";
import GuideIndex from "./pages/GuideIndex";
import GuideArticle from "./pages/GuideArticle";
import ContentPage from "./pages/ContentPage";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";

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
      {page}
      <CookieConsent />
    </>
  );
}
