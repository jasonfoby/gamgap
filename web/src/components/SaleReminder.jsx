import { useEffect, useState } from "react";
import { nextSale } from "../lib/saleCalendar";
import { calendarTexts, downloadSaleIcs } from "../lib/saleIcs";
import { fmtWhen } from "./SaleCountdown";
import { useT } from "../lib/i18n";
import "./SaleReminder.css";

// 가이드 본문에 끼우는 '다음 세일 알림' 카드(블록 type:"sale-reminder").
// 밸브가 날짜를 확정한 세일일 때만 보인다 — 추정 날짜로 달력 알림을 걸게 하면 틀린 날 울릴 수 있어서.
// 진행 중이면 끝나는 시각만 보여주고 버튼은 뺀다(이미 시작한 세일에 '시작 알림'은 의미가 없다).
export default function SaleReminder() {
  const { t, lang } = useT();
  const [sale, setSale] = useState(() => nextSale());

  useEffect(() => {
    const tm = setInterval(() => setSale(nextSale()), 60000);
    return () => clearInterval(tm);
  }, []);

  if (!sale || !sale.confirmed) return null;
  const ongoing = sale.phase === "ongoing";

  return (
    <div className="sale-reminder">
      <div className="sr-text">
        <div className="sr-name">{t("sale." + sale.id)}</div>
        <div className="sr-when">
          {ongoing ? t("cd.endsAt", { d: fmtWhen(sale.end, lang) }) : t("cd.startsAt", { d: fmtWhen(sale.start, lang) })}
        </div>
      </div>
      {!ongoing && (
        <button type="button" className="sr-btn" onClick={() => downloadSaleIcs(sale, calendarTexts(t, sale))}>
          {t("cd.addCalendar")}
        </button>
      )}
    </div>
  );
}
