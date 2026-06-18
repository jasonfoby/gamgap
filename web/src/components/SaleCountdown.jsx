import { useEffect, useState } from "react";
import { nextSale } from "../lib/saleCalendar";
import { useT } from "../lib/i18n";

const pad = (n) => String(n).padStart(2, "0");

// 다음 스팀 세일까지(또는 진행 중이면 종료까지) 카운트다운 위젯.
// '지금 살까 vs 다음 세일을 기다릴까'에 직접 답하는 재방문 훅. 일정은 '예상'이라고 명시한다.
export default function SaleCountdown() {
  const { t } = useT();
  const [sale, setSale] = useState(() => nextSale());

  useEffect(() => {
    const tm = setInterval(() => setSale(nextSale()), 1000);
    return () => clearInterval(tm);
  }, []);

  if (!sale) return null;
  const ongoing = sale.phase === "ongoing";
  const saleName = sale.id ? t("sale." + sale.id) : sale.name;

  return (
    <div className={"countdown" + (ongoing ? " live" : "")}>
      <div className="cd-head">
        <span className="cd-ico" aria-hidden="true">
          {ongoing ? "●" : "▸"}
        </span>
        <span className="cd-name">{saleName}</span>
        <span className="cd-state">{ongoing ? t("cd.ongoing") : t("cd.upcoming")}</span>
      </div>
      <div className="cd-clock">
        <span className="cd-unit" aria-hidden="true">
          <b>{sale.days}</b>
          {t("cd.day")}
        </span>
        <span className="cd-unit" aria-hidden="true">
          <b>{pad(sale.hours)}</b>
          {t("cd.hour")}
        </span>
        <span className="cd-unit" aria-hidden="true">
          <b>{pad(sale.mins)}</b>
          {t("cd.min")}
        </span>
        <span className="cd-unit" aria-hidden="true">
          <b>{pad(sale.secs)}</b>
          {t("cd.sec")}
        </span>
      </div>
      <div className="cd-foot">{ongoing ? t("cd.footOngoing") : t("cd.footUpcoming")}</div>
    </div>
  );
}
