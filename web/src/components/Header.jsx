import SearchBar from "./SearchBar";

// 상단 바: 로고 + (데스크탑) 상주 검색 + "오늘 N개 역대 최저가" 배지.
// 경쟁 조사 결론: ITAD가 리디자인에서 검색을 숨겨 비판받은 것과 정반대로,
// 검색을 1순위 진입점으로 헤더에 상주시킨다. (좁은 화면에선 CSS로 숨기고 히어로 검색을 쓴다)
export default function Header({ lowCount, query, onQueryChange }) {
  return (
    <header>
      <div className="bar">
        <a className="logo" href="/" aria-label="겜값 홈">
          <span className="dot" />
          겜값
        </a>

        <div className="bar-search">
          <SearchBar query={query} onQueryChange={onQueryChange} variant="bar" />
        </div>

        <span className="badge" title="오늘 역대 최저가를 새로 찍은 게임 수">
          오늘 <b>{lowCount}</b>개 역대 최저가
        </span>
      </div>
    </header>
  );
}
