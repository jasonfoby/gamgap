import { useRef } from "react";
import { useT } from "../lib/i18n";

// 재사용 검색 입력. 헤더 상주 검색(데스크탑) / 히어로 검색 어디서나 쓴다.
// 검색어는 부모(App)가 state로 들고 onQueryChange로 올린다. variant로 크기/여백만 달라진다.
export default function SearchBar({ query, onQueryChange, variant = "hero" }) {
  const inputRef = useRef(null);
  const { t } = useT();

  return (
    <div className={"searchbox sb-" + variant}>
      <svg className="s-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <path d="m21 21-4-4" />
      </svg>
      <input
        ref={inputRef}
        className="q"
        placeholder={t("search.placeholder")}
        autoComplete="off"
        value={query}
        onChange={(e) => onQueryChange(e.target.value)}
        aria-label={t("search.aria")}
      />
      {query.trim() && (
        <button
          className="clear"
          aria-label={t("search.clear")}
          onClick={() => {
            onQueryChange("");
            inputRef.current?.focus();
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
