import { useT } from "../lib/i18n";
import { SUPPORTED } from "../i18n";
import "./LanguageSwitcher.css";

// 화면 언어 전환기. 네이티브 <select> 기반(가볍고 접근성 양호).
// 선택 즉시 useT의 setLang으로 반영되고, localStorage·<html lang>까지 i18n 엔진이 처리한다.
export default function LanguageSwitcher({ className = "" }) {
  const { lang, setLang, t } = useT();
  return (
    <span className={"langsw" + (className ? " " + className : "")}>
      <svg className="langsw-ico" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18" />
        <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18" />
      </svg>
      <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label={t("lang.label")}>
        {SUPPORTED.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </span>
  );
}
