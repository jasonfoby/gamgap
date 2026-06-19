import "./CookieConsent.css";
import { useEffect, useState } from "react";
import { Link } from "../lib/router";
import { useT } from "../lib/i18n";
import { readConsent, setConsent } from "../lib/consent";

// 하단 쿠키 동의 배너. 첫 방문에만 노출. '자세히'는 개인정보처리방침으로.
// 선택값은 lib/consent.js 가 저장 + Google 동의 모드(gtag)에 반영한다.
export default function CookieConsent() {
  const { t } = useT();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!readConsent()) setOpen(true);
  }, []);

  const choose = (value) => () => {
    setConsent(value);
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
