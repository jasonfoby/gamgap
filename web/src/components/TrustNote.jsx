// 신뢰/포지셔닝 배너 — 한국 키샵 불신 시장을 정조준한 메시지.
// 경쟁사(ITAD/GG.deals)가 키샵·다스토어를 섞어 사용자가 위험을 직접 판별해야 하는 마찰을,
// Lowstamp은 "스팀 공식 원화만, 키샵 없음"으로 원천 제거한다. 일1회 갱신은 숨기지 않고 정직히 표기.
export default function TrustNote() {
  const items = [
    { k: "스팀 공식가", v: "원화 그대로" },
    { k: "키샵 없음", v: "안전 비교" },
    { k: "하루 1회", v: "가격 갱신" },
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
