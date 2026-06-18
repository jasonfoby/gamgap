import "./Footer.css";
import { Link } from "../lib/router";
import { useT } from "../lib/i18n";

// 사이트 하단 푸터. 좌측 브랜드+태그라인 / 우측 페이지 내비 / 면책·출처·저작권.
export default function Footer() {
  const { t } = useT();
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="footer-dot" />
            <span className="footer-name">Lowstamp</span>
          </div>
          <p className="footer-tagline">{t("footer.tagline")}</p>
        </div>

        <nav className="footer-nav" aria-label={t("footer.navAria")}>
          <Link to="/about" className="footer-link">
            {t("footer.about")}
          </Link>
          <Link to="/guide" className="footer-link">
            {t("nav.guide")}
          </Link>
          <Link to="/privacy" className="footer-link">
            {t("footer.privacy")}
          </Link>
          <Link to="/terms" className="footer-link">
            {t("footer.terms")}
          </Link>
          <Link to="/contact" className="footer-link">
            {t("footer.contact")}
          </Link>
        </nav>
      </div>

      <div className="footer-meta">
        <p className="footer-disclaimer">{t("footer.disclaimer")}</p>
        <div className="footer-bottom">
          <span className="footer-source">{t("footer.source")}</span>
          <span className="footer-sep" aria-hidden="true">·</span>
          <span className="footer-copy">© 2026 Lowstamp</span>
        </div>
      </div>
    </footer>
  );
}
