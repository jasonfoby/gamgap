// 지금 화면을 보는 쪽이 검색 로봇(자바스크립트를 실행하는 구글·빙·네이버 등)인지 브라우저 이름표로 어림잡는다.
//
// 왜: 로봇이 게임 가격 페이지를 열 때마다 '같은 장르 할인'·'같은 시리즈' 칸이 무거운 목록·검색 요청을 보내
//     데이터베이스를 크게 훑는다(페이지 하나에 약 1.4만 행 — 로봇이 천 페이지를 열면 하루 무료 한도의 2배,
//     2026-10-06 D1 한도 경고). 이 두 칸은 덤이라 로봇에게는 안 불러오게 한다. 로봇이 보는 본문(제목·가격·
//     역대 최저가·분석 문단)과 서버가 넣어 주는 글은 그대로이고, 덜 보여주는 쪽이라 속임수(클로킹)가 아니다.
// ⚠ 이름표 검사는 어림짐작이다. 놓친 로봇은 예전처럼 칸을 불러올 뿐이라 해가 없다.
const CRAWLER_RE = /bot|crawl|spider|slurp|yeti|mediapartners|preview|facebookexternalhit/i;

export function isCrawler() {
  if (typeof navigator === "undefined") return false;
  return CRAWLER_RE.test(navigator.userAgent || "");
}
