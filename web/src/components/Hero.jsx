import { useRef } from "react";

// 인기 검색어 칩 (원본 POPULAR에서 앞 5개만 노출).
const POPULAR = [
  { q: "사이버펑크", id: 1091500 },
  { q: "엘든 링", id: 1245620 },
  { q: "발더스 게이트", id: 1086940 },
  { q: "하데스", id: 1145360 },
  { q: "스타듀", id: 413150 },
  { q: "할로우 나이트", id: 367520 },
  { q: "세키로", id: 814380 },
  { q: "잇 테이크 투", id: 1426210 },
];

// 타이틀 + 검색창 + 인기 칩. 검색어는 부모(App)가 state로 들고 있고 onQueryChange로 올린다.
export default function Hero({ query, onQueryChange }) {
  const inputRef = useRef(null);

  return (
    <>
      <h1>
        이 게임, <span className="g">지금</span> 사도 돼?
      </h1>
      <p className="sub">스팀 게임의 역대 최저가와 ‘지금 사도 되나’를 한 줄로 알려드려요.</p>

      <div className="searchbox">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4-4" />
        </svg>
        <input
          id="q"
          ref={inputRef}
          placeholder="게임 이름을 검색하세요"
          autoComplete="off"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        {query.trim() && (
          <button
            className="clear"
            style={{ display: "block" }}
            aria-label="지우기"
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

      <div className="chips">
        {POPULAR.slice(0, 5).map((p) => (
          <button key={p.id} className="chip" onClick={() => onQueryChange(p.q)}>
            {p.q}
          </button>
        ))}
      </div>
    </>
  );
}
