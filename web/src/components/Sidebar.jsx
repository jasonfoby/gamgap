import { useState } from "react";
import Tabs from "./Tabs";
import DealControls from "./DealControls";
import SaleCountdown from "./SaleCountdown";
import TrustNote from "./TrustNote";
import { activeFilterCount } from "../lib/filterUi";

// 좌측 사이드바(데스크탑 상주 / 모바일 본문 위로 접힘).
// 둘러보기 탭 + (할인 탭일 때) 정렬·필터 + 다음 세일 카운트다운 + 신뢰 배너.
// 데스크탑에서 sticky로 상주시켜, 스크롤해도 탐색 컨트롤이 사라지지 않게 한다(검증된 데스크탑 패턴).
// 모바일에선 정렬·필터를 '필터·정렬' 버튼으로 접어, 자리를 아끼면서도 존재를 분명히 드러낸다.
export default function Sidebar({ tab, onTabChange, wishCount, searching, dealOpts, onDealOptsChange, genreOptions = [] }) {
  const showFilters = !searching && tab === "deals" && dealOpts;
  const [open, setOpen] = useState(false); // 모바일 필터 패널 펼침 여부(데스크탑은 CSS로 항상 펼침)
  const activeCount = activeFilterCount(dealOpts);

  return (
    <aside className="side">
      <nav className="side-block">
        <div className="side-label">둘러보기</div>
        <Tabs active={searching ? null : tab} onChange={onTabChange} wishCount={wishCount} />
      </nav>

      {showFilters && (
        <div className="side-block side-filters">
          <div className="side-label">정렬·필터</div>
          <button
            className="filter-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M7 12h10M11 18h2" />
            </svg>
            필터·정렬
            {activeCount > 0 && <span className="fbadge">{activeCount}</span>}
            <span className="chev" aria-hidden="true">{open ? "▲" : "▼"}</span>
          </button>
          <div className={"filter-body" + (open ? " open" : "")}>
            <DealControls opts={dealOpts} onChange={onDealOptsChange} availableGenres={genreOptions} />
          </div>
        </div>
      )}

      <div className="side-block side-countdown">
        <div className="side-label">다음 스팀 세일</div>
        <SaleCountdown />
      </div>

      <div className="side-block side-trust">
        <TrustNote />
      </div>
    </aside>
  );
}
