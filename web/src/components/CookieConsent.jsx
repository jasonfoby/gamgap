import "./CookieConsent.css";
import { useEffect, useState } from "react";
import { Link } from "../lib/router";
import { useT } from "../lib/i18n";

// 쿠키 동의 저장 키. 값은 'granted'(동의) | 'denied'(거부).
const CONSENT_KEY = "gamgap:consent";

function readConsent() {
  try {
    return localStorage.getItem(CONSENT_KEY);
  } catch {
    return null;
  }
}
function writeConsent(value) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // 저장 실패해도 배너만 닫고 조용히 넘어간다.
  }
}

// 하단 쿠키 동의 배너. 첫 방문에만 노출. '자세히'는 개인정보처리방침으로.
export default function CookieConsent() {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
  }, []);

  const choose = (value) => () => {
    writeConsent(value);
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label={t("cookie.aria")}>
      <div className="cc-inner">
        <p className="cc-text">
          {t("cookie.text")}{" "}
          <Link to="/privacy" className="cc-more">
            {t("cookie.more")}
          </Link>
        </p>
        <div className="cc-actions">
          <button type="button" className="cc-btn cc-deny" onClick={choose("denied")}>
            {t("cookie.deny")}
          </button>
          <button type="button" className="cc-btn cc-allow" onClick={choose("granted")}>
            {t("cookie.allow")}
          </button>
        </div>
      </div>
    </div>
  );
}
