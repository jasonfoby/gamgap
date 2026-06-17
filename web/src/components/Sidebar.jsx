import Tabs from "./Tabs";
import DealControls from "./DealControls";
import SaleCountdown from "./SaleCountdown";
import TrustNote from "./TrustNote";

// 좌측 사이드바(데스크탑 상주 / 모바일 본문 위로 접힘).
// 둘러보기 탭 + (할인 탭일 때) 정렬·필터 + 다음 세일 카운트다운 + 신뢰 배너.
// 데스크탑에서 sticky로 상주시켜, 스크롤해도 탐색 컨트롤이 사라지지 않게 한다(검증된 데스크탑 패턴).
export default function Sidebar({ tab, onTabChange, wishCount, searching, dealOpts, onDealOptsChange, genreOptions = [] }) {
  const showFilters = !searching && tab === "deals" && dealOpts;

  return (
    <aside className="side">
      <nav className="side-block">
        <div className="side-label">둘러보기</div>
        <Tabs active={searching ? null : tab} onChange={onTabChange} wishCount={wishCount} />
      </nav>

      {showFilters && (
        <div className="side-block">
          <div className="side-label">정렬·필터</div>
          <DealControls opts={dealOpts} onChange={onDealOptsChange} availableGenres={genreOptions} />
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
