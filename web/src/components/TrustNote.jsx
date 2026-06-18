import { useT } from "../lib/i18n";

// 신뢰/포지셔닝 배너 — 키샵 불신 시장을 정조준한 메시지.
// "스팀 공식 원화만, 키샵 없음"으로 사용자가 위험을 직접 판별해야 하는 마찰을 원천 제거한다.
export default function TrustNote() {
  const { t } = useT();
  const items = [
    { k: t("trust.officialK"), v: t("trust.officialV") },
    { k: t("trust.nokeyshopK"), v: t("trust.nokeyshopV") },
    { k: t("trust.dailyK"), v: t("trust.dailyV") },
  ];
  return (
    <div className="trust">
      {items.map((it) => (
        <div className="trust-row" key={it.k}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          <span className="trust-k">{it.k}</span>
          <span className="trust-v">{it.v}</span>
        </div>
      ))}
    </div>
  );
}
