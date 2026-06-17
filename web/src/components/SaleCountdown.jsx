import { useEffect, useState } from "react";
import { nextSale } from "../lib/saleCalendar";

const pad = (n) => String(n).padStart(2, "0");

// 다음 스팀 세일까지(또는 진행 중이면 종료까지) 카운트다운 위젯.
// '지금 살까 vs 다음 세일을 기다릴까'에 직접 답하는 재방문 훅. 일정은 '예상'이라고 명시한다.
export default function SaleCountdown() {
  const [sale, setSale] = useState(() => nextSale());

  useEffect(() => {
    const t = setInterval(() => setSale(nextSale()), 1000);
    return () => clearInterval(t);
  }, []);

  if (!sale) return null;
  const ongoing = sale.phase === "ongoing";

  return (
    <div className={"countdown" + (ongoing ? " live" : "")}>
      <div className="cd-head">
        <span className="cd-ico" aria-hidden="true">
          {ongoing ? "●" : "▸"}
        </span>
        <span className="cd-name">{sale.name}</span>
        <span className="cd-state">{ongoing ? "진행 중" : "예정"}</span>
      </div>
      <div
        className="cd-clock"
        aria-label={`${ongoing ? "종료까지" : "시작까지"} ${sale.days}일 ${sale.hours}시간 남음`}
      >
        <span className="cd-unit" aria-hidden="true">
          <b>{sale.days}</b>일
        </span>
        <span className="cd-unit" aria-hidden="true">
          <b>{pad(sale.hours)}</b>시
        </span>
        <span className="cd-unit" aria-hidden="true">
          <b>{pad(sale.mins)}</b>분
        </span>
        <span className="cd-unit" aria-hidden="true">
          <b>{pad(sale.secs)}</b>초
        </span>
      </div>
      <div className="cd-foot">{ongoing ? "종료까지 · 예상 일정" : "시작까지 · 예상 일정"}</div>
    </div>
  );
}
