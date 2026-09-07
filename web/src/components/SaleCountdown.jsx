import { useEffect, useState } from "react";
import { nextSale, estimateParts } from "../lib/saleCalendar";
import { useT } from "../lib/i18n";

const pad = (n) => String(n).padStart(2, "0");

// 화면 언어 → 날짜 표기용 로케일(시각은 보는 사람의 시간대로 자동 변환된다).
const LOCALE = { ko: "ko-KR", en: "en-US", ja: "ja-JP", zh: "zh-CN", es: "es-ES", pt: "pt-BR" };

// 절대 시각 한 줄: "10월 2일 (금) 오전 2:00" 처럼, 카운트다운(상대)과 짝을 이루는 실제 날짜.
function fmtWhen(d, lang) {
  try {
    return new Intl.DateTimeFormat(LOCALE[lang] || "en-US", {
      month: "long",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "2-digit",
    }).format(d);
  } catch {
    return d.toLocaleString();
  }
}

// 다음 스팀 세일 위젯. 상태가 셋이다(saleCalendar.js 의 phase·confirmed 값).
//   ① 진행 중            → "진행 중" 배지 + 종료까지 카운트다운
//   ② 예정·밸브 공식 확정 → "공식 일정" 배지 + 시작까지 카운트다운 + 실제 시작 시각 한 줄
//   ③ 예정·아직 추정      → "예상" 배지, 카운트다운 없음. "2027년 3월 중순 시작 예상"처럼 못 박아두고
//                            밸브가 발표하면 카운트다운으로 바뀐다고 적는다.
// 예전엔 ②③ 모두 "예정" 배지에 카운트다운을 돌려서, 추정 날짜를 확정처럼 세는 것으로 오해될 수 있었다.
export default function SaleCountdown() {
  const { t, lang } = useT();
  const [sale, setSale] = useState(() => nextSale());

  useEffect(() => {
    const tm = setInterval(() => setSale(nextSale()), 1000);
    return () => clearInterval(tm);
  }, []);

  if (!sale) return null;
  const ongoing = sale.phase === "ongoing";
  const estimated = !ongoing && !sale.confirmed;
  const saleName = sale.id ? t("sale." + sale.id) : sale.name;

  // ③ 추정 상태의 표기: "{year}년 {month} {part}" (언어별 어순은 사전 키 cd.estWhen 이 정한다)
  let estLine = "";
  if (estimated) {
    const p = estimateParts(sale.start);
    let month = "";
    try {
      month = new Intl.DateTimeFormat(LOCALE[lang] || "en-US", { month: "long" }).format(sale.start);
    } catch {
      month = String(p.month);
    }
    const part = t(p.part === "early" ? "cd.partEarly" : p.part === "mid" ? "cd.partMid" : "cd.partLate");
    estLine = t("cd.estStart", { when: t("cd.estWhen", { year: p.year, month, part }) });
  }

  const stateLabel = ongoing ? t("cd.ongoing") : estimated ? t("cd.estimated") : t("cd.confirmed");
  const stateClass = ongoing ? " live" : estimated ? " est" : " confirmed";

  return (
    <div className={"countdown" + (ongoing ? " live" : "")}>
      <div className="cd-head">
        <span className="cd-ico" aria-hidden="true">
          {ongoing ? "●" : "▸"}
        </span>
        <span className="cd-name">{saleName}</span>
        <span className={"cd-state" + stateClass}>{stateLabel}</span>
      </div>

      {estimated ? (
        <div className="cd-est">{estLine}</div>
      ) : (
        <>
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
          {/* 카운트다운(상대 시간) 옆에 실제 시각(절대 시간)을 같이 둔다 — 보는 사람의 시간대 기준 */}
          <div className="cd-date">
            {ongoing ? t("cd.endsAt", { d: fmtWhen(sale.end, lang) }) : t("cd.startsAt", { d: fmtWhen(sale.start, lang) })}
          </div>
        </>
      )}

      <div className="cd-foot">
        {ongoing
          ? sale.confirmed
            ? t("cd.footOngoingConfirmed")
            : t("cd.footOngoing")
          : estimated
          ? t("cd.footEstimated")
          : t("cd.footUpcomingConfirmed")}
      </div>
    </div>
  );
}
