import "./CookieConsent.css";
import { useEffect, useState } from "react";
import { Link } from "../lib/router";

// 쿠키 동의 저장 키. 값은 'granted'(동의) | 'denied'(거부).
const CONSENT_KEY = "gamgap:consent";

// localStorage 읽기/쓰기는 시크릿 모드·차단 환경에서 예외를 던질 수 있으니 항상 감싼다.
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
    // 저장 실패해도 배너만 닫고 조용히 넘어간다(앱 흐름을 막지 않음).
  }
}

// 하단 쿠키 동의 배너.
// - 첫 방문(이전 선택 기록 없음)에만 노출. 동의/거부를 누르면 localStorage에 남기고 숨긴다.
// - '자세히' 링크는 개인정보처리방침(/privacy)으로 이동.
// - 어떤 경우에도 예외를 밖으로 던지지 않는다(전역 앱이 멈추지 않게).
export default function CookieConsent() {
  // 초기엔 숨겨두고, 마운트 후 저장값을 확인해 선택 기록이 없을 때만 띄운다.
  // (SSR/하이드레이션 불일치 방지 겸, localStorage 접근을 effect 안으로)
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
    <div className="cookie-consent" role="dialog" aria-live="polite" aria-label="쿠키 동의">
      <div className="cc-inner">
        <p className="cc-text">
          Lowstamp은 맞춤형 광고와 방문 분석을 위해 쿠키를 사용합니다.{" "}
          <Link to="/privacy" className="cc-more">
            자세히
          </Link>
        </p>
        <div className="cc-actions">
          <button type="button" className="cc-btn cc-deny" onClick={choose("denied")}>
            거부
          </button>
          <button type="button" className="cc-btn cc-allow" onClick={choose("granted")}>
            동의
          </button>
        </div>
      </div>
    </div>
  );
}
