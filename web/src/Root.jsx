import { useRoute } from "./lib/router";
import App from "./App";
import GuideIndex from "./pages/GuideIndex";
import GuideArticle from "./pages/GuideArticle";
import ContentPage from "./pages/ContentPage";
import NotFound from "./pages/NotFound";
import CookieConsent from "./components/CookieConsent";

// 정적 콘텐츠 페이지 데이터(각 파일의 default export).
import privacy from "./content/pages/privacy";
import terms from "./content/pages/terms";
import about from "./content/pages/about";
import contact from "./content/pages/contact";

// 앱 최상위 라우팅 스위치.
// useRoute()로 현재 경로(pathname)를 읽어 어떤 화면을 그릴지 분기한다.
// CookieConsent(쿠키 동의 배너)는 어떤 경로에서도 항상 한 번 마운트되도록 맨 아래 둔다.
const GUIDE_PREFIX = "/guide/";

export default function Root() {
  const path = useRoute();

  let page;
  if (path === "/" || path === "") {
    page = <App />;
  } else if (path === "/guide") {
    page = <GuideIndex />;
  } else if (path.startsWith(GUIDE_PREFIX)) {
    // "/guide/steam-sale-calendar" → slug "steam-sale-calendar"
    const slug = decodeURIComponent(path.slice(GUIDE_PREFIX.length));
    page = <GuideArticle slug={slug} />;
  } else if (path === "/privacy") {
    page = <ContentPage data={privacy} />;
  } else if (path === "/terms") {
    page = <ContentPage data={terms} />;
  } else if (path === "/about") {
    page = <ContentPage data={about} />;
  } else if (path === "/contact") {
    page = <ContentPage data={contact} />;
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
