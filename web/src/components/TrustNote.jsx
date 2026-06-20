import { useT } from "../lib/i18n";

// 신뢰/포지셔닝 배너 — 평범한 구매자가 궁금한 "지금 사도 되나?"에 정조준한 메시지.
// "지금 살 때인지 역대 최저가로 판단 + 가짜 세일 구별"로, 비싸게 사지 않게 도와준다는 가치를 앞세운다.
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
