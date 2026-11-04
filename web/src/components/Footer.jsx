import "./Footer.css";
import { Link } from "../lib/router";
import { useT } from "../lib/i18n";
import { SUPPORTED } from "../i18n";
import { splitLang, langPath } from "../lib/langPath";
import { reopenConsent } from "../lib/consent";

const CONTACT_MAIL = "ibanisac@gmail.com"; // 문의 페이지·약관에 이미 공개돼 있는 주소

// 사이트 하단 푸터. 좌측 브랜드+태그라인 / 우측 페이지 내비 / 언어별 주소 링크 / 고지·출처·문의·쿠키 설정.
export default function Footer() {
  const { t, lang, setLang } = useT();
  // 지금 보는 페이지의 각 언어판 주소(검색 로봇도 따라갈 수 있는 진짜 링크). 클릭은 화면 언어 전환으로 처리.
  const base = typeof window !== "undefined" ? splitLang(window.location.pathname).base : "/";
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

      <nav className="footer-langs" aria-label={t("lang.label")}>
        {SUPPORTED.map((l) => (
          <a
            key={l.code}
            href={langPath(l.code, base)}
            hrefLang={l.code}
            lang={l.code}
            className={"footer-lang" + (l.code === lang ? " on" : "")}
            aria-current={l.code === lang ? "true" : undefined}
            onClick={(e) => {
              e.preventDefault();
              setLang(l.code);
            }}
          >
            {l.label}
          </a>
        ))}
      </nav>

      <div className="footer-meta">
        <p className="footer-legal">{t("footer.legal")}</p>
        <p className="footer-disclaimer">{t("footer.disclaimer")}</p>
        <div className="footer-bottom">
          <span className="footer-source">{t("footer.source")}</span>
          <span className="footer-sep" aria-hidden="true">·</span>
          <a className="footer-mail" href={"mailto:" + CONTACT_MAIL}>
            {CONTACT_MAIL}
          </a>
          <span className="footer-sep" aria-hidden="true">·</span>
          <button type="button" className="footer-cookie" onClick={reopenConsent}>
            {t("footer.cookies")}
          </button>
          <span className="footer-sep" aria-hidden="true">·</span>
          <span className="footer-copy">© 2026 Lowstamp</span>
        </div>
      </div>
    </footer>
  );
}
