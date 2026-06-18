import SearchBar from "./SearchBar";
import { Link } from "../lib/router";

// 상단 바: 로고 + (데스크탑) 상주 검색 + 가이드 내비 + "오늘 N개 역대 최저가" 배지.
// 경쟁 조사 결론: ITAD가 리디자인에서 검색을 숨겨 비판받은 것과 정반대로,
// 검색을 1순위 진입점으로 헤더에 상주시킨다. (좁은 화면에선 CSS로 숨기고 히어로 검색을 쓴다)
// 콘텐츠 페이지(PageShell)와 동선을 맞추기 위해 홈 헤더에도 '가이드' 링크를 둔다.
export default function Header({ lowCount, query, onQueryChange }) {
  return (
    <header>
      <div className="bar">
        <a className="logo" href="/" aria-label="Lowstamp 홈">
          <span className="dot" />
          Lowstamp
        </a>

        <div className="bar-search">
          <SearchBar query={query} onQueryChange={onQueryChange} variant="bar" />
        </div>

        <nav className="bar-nav" aria-label="사이트 메뉴">
          <Link to="/guide" className="bar-nav-link">가이드</Link>
        </nav>

        <span className="badge" title="오늘 역대 최저가를 새로 찍은 게임 수">
          오늘 <b>{lowCount}</b>개 역대 최저가
        </span>
      </div>
    </header>
  );
}
