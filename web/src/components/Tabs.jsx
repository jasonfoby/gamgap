import { useT } from "../lib/i18n";

// 둘러보기 탭. 검색어가 비어 있을 때 어떤 목록을 볼지 고른다.
const TABS = [
  { key: "lowest", labelKey: "tab.lowest" },
  { key: "deals", labelKey: "tab.deals" },
  { key: "wishlist", labelKey: "tab.wishlist" },
];

export default function Tabs({ active, onChange, wishCount }) {
  const { t } = useT();
  return (
    <div className="tabs">
      {TABS.map((tb) => (
        <button
          key={tb.key}
          className={"tab" + (active === tb.key ? " on" : "")}
          onClick={() => onChange(tb.key)}
        >
          {t(tb.labelKey)}
          {tb.key === "wishlist" && wishCount > 0 && (
            <span className="tabbadge">{wishCount}</span>
          )}
        </button>
      ))}
    </div>
  );
}
