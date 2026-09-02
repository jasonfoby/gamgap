// 스팀 시즌 세일 일정.
//
// 밸브는 시즌 세일 날짜를 Steamworks 공식 문서로 5~11개월 전에 미리 공개한다(보통 1월 말과 7월
// 중순에 반년 치씩). 그래서 이 파일은 두 층으로 나뉜다.
//   ① CONFIRMED — 밸브가 공식 발표한 '확정' 날짜. 화면에 '확정 일정'으로 표시된다.
//   ② ESTIMATED — 아직 발표 전 기간을 최근 몇 년 패턴으로 채운 '예상' 날짜. '예상 일정'으로 표시.
// 새 일정이 공개되면 CONFIRMED 에 줄만 추가하면 되고, 그 시점부터 자동으로 '확정'으로 바뀐다.
//
// ⚠ 2025년부터 밸브가 '가을 세일'을 11월 말(블랙프라이데이)에서 9월 말~10월 초로 옮겼다.
//   웹에 아직도 11월이라 적힌 낡은 정보가 많으니 되돌리지 말 것.
//
// 시각: 시즌 세일은 항상 미국 태평양시 오전 10시에 시작/종료한다. 어느 나라에서 봐도 같은 순간을
// 가리키도록 UTC 로 못박는다(태평양 서머타임 기간은 17:00Z, 겨울은 18:00Z).

// 밸브 공식 발표(Steamworks) 기준 확정 일정.
const CONFIRMED = [
  { id: "autumn", year: 2026, start: "2026-10-01T17:00:00Z", end: "2026-10-08T17:00:00Z" },
  { id: "winter", year: 2026, start: "2026-12-17T18:00:00Z", end: "2027-01-04T18:00:00Z" },
  { id: "spring", year: 2027, start: "2027-03-18T17:00:00Z", end: "2027-03-25T17:00:00Z" },
  { id: "summer", year: 2027, start: "2027-06-24T17:00:00Z", end: "2027-07-08T17:00:00Z" },
];

// 아직 발표되지 않은 해를 채우는 예상 패턴(최근 2~3년 실제 일정의 평균 근처).
// 월(sm/em)은 1~12. 겨울처럼 연말→연초로 넘어가면 em < sm 이므로 종료는 다음 해로 계산한다.
const ESTIMATED = [
  { id: "spring", sm: 3, sd: 17, em: 3, ed: 24 },
  { id: "summer", sm: 6, sd: 24, em: 7, ed: 8 },
  { id: "autumn", sm: 9, sd: 29, em: 10, ed: 6 },
  { id: "winter", sm: 12, sd: 17, em: 1, ed: 4 },
];

// 태평양시 오전 10시에 해당하는 UTC 시각(겨울 세일 구간만 표준시라 한 시간 뒤).
const utcHour = (id) => (id === "winter" ? 18 : 17);

// 해당 연도의 '예상' 일정 4개.
function estimatedFor(year) {
  return ESTIMATED.map((e) => {
    const h = utcHour(e.id);
    const endYear = e.em < e.sm ? year + 1 : year;
    return {
      id: e.id,
      year,
      confirmed: false,
      start: new Date(Date.UTC(year, e.sm - 1, e.sd, h)),
      end: new Date(Date.UTC(endYear, e.em - 1, e.ed, h)),
    };
  });
}

// 확정 + (확정이 없는 자리만) 예상 을 합쳐 시간순으로 돌려준다.
function allOccurrences(year) {
  const confirmed = CONFIRMED.map((c) => ({
    id: c.id,
    year: c.year,
    confirmed: true,
    start: new Date(c.start),
    end: new Date(c.end),
  }));
  const taken = new Set(confirmed.map((c) => c.id + ":" + c.year));
  const est = [];
  for (const y of [year - 1, year, year + 1, year + 2]) {
    for (const o of estimatedFor(y)) {
      if (!taken.has(o.id + ":" + o.year)) est.push(o);
    }
  }
  return [...confirmed, ...est].sort((a, b) => a.start - b.start);
}

function build(o, phase, target, now) {
  const totalSec = Math.max(0, Math.floor((target - now) / 1000));
  return {
    id: o.id,
    phase, // "ongoing"(진행 중) | "upcoming"(예정)
    confirmed: o.confirmed, // true 면 밸브 공식 발표 날짜, false 면 예상
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
  const all = allOccurrences(now.getFullYear());
  const ongoing = all.find((o) => now >= o.start && now <= o.end);
  if (ongoing) return build(ongoing, "ongoing", ongoing.end, now);
  const upcoming = all.find((o) => o.start > now);
  return upcoming ? build(upcoming, "upcoming", upcoming.start, now) : null;
}

// 추정 일정을 '2027년 3월 중순'처럼 뭉뚱그려 표기하기 위한 조각. 추정치를 날짜까지 못 박아 보여주면
// 확정처럼 읽히므로, 위젯은 확정(confirmed)일 때만 정확한 날짜·카운트다운을 쓰고 추정일 땐 이 조각만 쓴다.
// part: 1~10일 early(초) / 11~20일 mid(중순) / 21일~ late(말). UTC 기준(수집·발표 기준과 동일).
export function estimateParts(start) {
  const d = start instanceof Date ? start : new Date(start);
  const day = d.getUTCDate();
  return {
    year: d.getUTCFullYear(),
    month: d.getUTCMonth() + 1,
    part: day <= 10 ? "early" : day <= 20 ? "mid" : "late",
  };
}
