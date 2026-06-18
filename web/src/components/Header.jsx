import SearchBar from "./SearchBar";
import LanguageSwitcher from "./LanguageSwitcher";
import { Link } from "../lib/router";
import { useT, tNodes } from "../lib/i18n";

// 상단 바: 로고 + (데스크탑) 상주 검색 + 가이드 내비 + 언어 전환 + "오늘 N개 역대 최저가" 배지.
// 검색을 1순위 진입점으로 헤더에 상주시킨다. (좁은 화면에선 CSS로 숨기고 히어로 검색을 쓴다)
export default function Header({ lowCount, query, onQueryChange }) {
  const { t } = useT();
  return (
    <header>
      <div className="bar">
        <a className="logo" href="/" aria-label={"Lowstamp " + t("nav.home")}>
          <span className="dot" />
          Lowstamp
        </a>

        <div className="bar-search">
          <SearchBar query={query} onQueryChange={onQueryChange} variant="bar" />
        </div>

        <nav className="bar-nav" aria-label={t("common.menu")}>
          <Link to="/guide" className="bar-nav-link">
            {t("nav.guide")}
          </Link>
        </nav>

        <LanguageSwitcher className="bar-lang" />

        <span className="badge" title={t("header.badgeTitle")}>
          {tNodes(t("header.badge"), { n: <b>{lowCount}</b> })}
        </span>
      </div>
    </header>
  );
}
