import "./PageShell.css";
import { Link } from "../lib/router";
import Footer from "./Footer";
import LanguageSwitcher from "./LanguageSwitcher";
import { useT } from "../lib/i18n";

// 콘텐츠 페이지(개인정보처리방침·가이드·소개 등) 공통 틀.
// 상단 sticky 헤더(로고 → 홈, 가이드/홈 링크 + 언어 전환) / 가운데 본문 / 하단 Footer.
export default function PageShell({ children, wide = false, loading = false }) {
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
            <Link to="/new-lows" className="ps-nav-link">
              {t("nav.lows")}
            </Link>
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

      <main className={"page" + (wide ? " page-wide" : "")} aria-busy={loading || undefined}>{children}</main>

      {/* 로딩 중에는 푸터를 그리지 않는다 — 본문(글·게임 정보)이 도착하며 푸터가 화면 안에서
          멀리 밀려나던 레이아웃 이동(2026-08-30 라이트하우스 실측: 가이드 글 CLS 0.605)을
          구조적으로 차단. 본문이 오면 푸터는 그때 '새로' 나타나므로 아무것도 밀지 않는다. */}
      {!loading && <Footer />}
    </div>
  );
}
