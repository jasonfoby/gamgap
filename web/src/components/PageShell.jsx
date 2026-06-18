import "./PageShell.css";
import { Link } from "../lib/router";
import Footer from "./Footer";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "../lib/i18n";

// 콘텐츠 페이지(개인정보처리방침·가이드·소개 등) 공통 틀.
// 상단 sticky 헤더(로고 → 홈, 가이드/홈 링크 + 언어 전환) / 가운데 본문 / 하단 Footer.
export default function PageShell({ children }) {
  const { t } = useT();
  return (
    <div className="pageshell">
      <header className="ps-header">
        <div className="ps-bar">
          <Link to="/" className="ps-logo" aria-label={"Lowstamp " + t("nav.home")}>
            <span className="ps-dot" />
            Lowstamp
          </Link>
          <nav className="ps-nav" aria-label={t("ps.pageNavAria")}>
            <Link to="/guide" className="ps-nav-link">
              {t("nav.guide")}
            </Link>
            <Link to="/" className="ps-nav-link">
              {t("nav.home")}
            </Link>
            <LanguageSwitcher className="ps-lang" />
          </nav>
        </div>
      </header>

      <main className="page">{children}</main>

      <Footer />
    </div>
  );
}
