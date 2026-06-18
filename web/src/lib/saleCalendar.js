// 스팀 시즌 세일 "예상" 일정. 정확한 날짜는 매년 밸브가 따로 정해 달라지므로,
// 대략적인 연례 시기를 하드코딩하고 화면에서는 '예상'으로 표기한다(서버 불필요).
// '지금 살까 vs 다음 세일을 기다릴까'라는 한국 게이머의 실제 고민에 직접 답하기 위한 위젯용.
//
// 각 항목: 이름, 시작(월 sm, 일 sd), 종료(월 em, 일 ed). 월은 1~12.
// 겨울 세일처럼 연말→연초로 넘어가는 경우 em < sm 이면 종료는 다음 해로 계산한다.
const SALES = [
  { id: "spring", name: "봄 세일", sm: 3, sd: 13, em: 3, ed: 20 },
  { id: "summer", name: "여름 세일", sm: 6, sd: 26, em: 7, ed: 10 },
  { id: "autumn", name: "가을 세일", sm: 11, sd: 26, em: 12, ed: 3 },
  { id: "winter", name: "겨울 세일", sm: 12, sd: 19, em: 1, ed: 2 },
];

// 스팀 세일은 보통 한국시간 새벽~오전에 시작. 시각은 대략값(02:00)으로 둔다(예상 표기라 정밀도는 비핵심).
const HOUR = 2;

function occurrences(year) {
  return SALES.map((s) => {
    const start = new Date(year, s.sm - 1, s.sd, HOUR, 0, 0, 0);
    const endYear = s.em < s.sm ? year + 1 : year;
    const end = new Date(endYear, s.em - 1, s.ed, HOUR, 0, 0, 0);
    return { id: s.id, name: s.name, start, end };
  });
}

function build(o, phase, target, now) {
  const totalSec = Math.max(0, Math.floor((target - now) / 1000));
  return {
    id: o.id,
    name: o.name,
    phase, // "ongoing"(진행 중) | "upcoming"(예정)
    start: o.start,
    end: o.end,
    target, // 카운트다운 목표: 진행 중이면 종료, 예정이면 시작
    days: Math.floor(totalSec / 86400),
    hours: Math.floor((totalSec % 86400) / 3600),
    mins: Math.floor((totalSec % 3600) / 60),
    secs: totalSec % 60,
  };
}

// 지금 진행 중인 세일이 있으면 그걸(종료까지 카운트다운), 없으면 다음 예정 세일(시작까지)을 돌려준다.
export function nextSale(now = new Date()) {
  const y = now.getFullYear();
  const all = [...occurrences(y - 1), ...occurrences(y), ...occurrences(y + 1)].sort(
    (a, b) => a.start - b.start
  );
  const ongoing = all.find((o) => now >= o.start && now <= o.end);
  if (ongoing) return build(ongoing, "ongoing", ongoing.end, now);
  const upcoming = all.find((o) => o.start > now);
  return upcoming ? build(upcoming, "upcoming", upcoming.start, now) : null;
}
