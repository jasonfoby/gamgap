// 둘러보기 탭. 검색어가 비어 있을 때 어떤 목록을 볼지 고른다.
const TABS = [
  { key: "lowest", label: "오늘의 최저가" },
  { key: "deals", label: "할인 중" },
  { key: "wishlist", label: "내 찜" },
];

export default function Tabs({ active, onChange, wishCount }) {
  return (
    <div className="tabs">
      {TABS.map((t) => (
        <button
          key={t.key}
          className={"tab" + (active === t.key ? " on" : "")}
          onClick={() => onChange(t.key)}
        >
          {t.label}
          {t.key === "wishlist" && wishCount > 0 && (
            <span className="tabbadge">{wishCount}</span>
          )}
        </button>
      ))}
    </div>
  );
}
