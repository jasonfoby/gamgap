import { useState } from "react";
import Tabs from "./Tabs";
import DealControls from "./DealControls";
import SaleCountdown from "./SaleCountdown";
import TrustNote from "./TrustNote";
import AdSlot from "./AdSlot";
import { activeFilterCount } from "../lib/filterUi";
import { useT } from "../lib/i18n";

// 좌측 사이드바(데스크탑 상주 / 모바일 본문 위로 접힘).
// 둘러보기 탭 + (할인 탭일 때) 정렬·필터 + 다음 세일 카운트다운 + 신뢰 배너.
export default function Sidebar({ tab, onTabChange, wishCount, searching, dealOpts, onDealOptsChange, genreOptions = [], currency = "KRW" }) {
  const { t } = useT();
  const showFilters = !searching && tab === "deals" && dealOpts;
  const [open, setOpen] = useState(false); // 모바일 필터 패널 펼침 여부(데스크탑은 CSS로 항상 펼침)
  const activeCount = activeFilterCount(dealOpts);

  return (
    <aside className="side">
      <nav className="side-block">
        <div className="side-label">{t("side.browse")}</div>
        <Tabs active={searching ? null : tab} onChange={onTabChange} wishCount={wishCount} />
      </nav>

      {showFilters && (
        <div className="side-block side-filters">
          <div className="side-label">{t("side.sortFilter")}</div>
          <button className="filter-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 6h18M7 12h10M11 18h2" />
            </svg>
            {t("side.filterToggle")}
            {activeCount > 0 && <span className="fbadge">{activeCount}</span>}
            <span className="chev" aria-hidden="true">{open ? "▲" : "▼"}</span>
          </button>
          <div className={"filter-body" + (open ? " open" : "")}>
            <DealControls opts={dealOpts} onChange={onDealOptsChange} availableGenres={genreOptions} currency={currency} />
          </div>
        </div>
      )}

      <div className="side-block side-countdown">
        <div className="side-label">{t("side.nextSale")}</div>
        <SaleCountdown />
      </div>

      {/* 사이드바 광고(데스크탑 전용). 슬롯 ID 없으면 AdSlot이 null → :empty 로 자리 숨김. */}
      <div className="side-ad">
        <AdSlot slot="sidebar" />
      </div>

      <div className="side-block side-trust">
        <TrustNote />
      </div>
    </aside>
  );
}
