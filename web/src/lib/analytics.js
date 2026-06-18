// 가벼운 분석(애널리틱스) 래퍼.
//
// 용도: 검색 결과 0건(이벤트명 "search_zero")과 게임 상세 열람(이벤트명 "game_view")
// 같은 커스텀 이벤트를 호출하는 곳에서 이 모듈의 track()을 쓴다.
//
// 왜 이렇게 단순한가:
//   Cloudflare Web Analytics(비콘 방식)는 페이지뷰를 '자동'으로 잡아주지만,
//   임의의 커스텀 이벤트를 보내는 공개 API가 없다(향후 별도 엔드포인트나 Zaraz가 필요).
//   그래서 여기서는 "안전한 no-op + 확장 가능한 훅" 형태로만 둔다:
//     - 브라우저(window)가 없으면 아무 것도 안 함(서버 사이드/빌드 안전).
//     - 개발 중 흐름 확인용으로 console.debug 로깅만 남김.
//     - window.__gamgapTrack 같은 외부 훅이 있으면 그쪽으로 넘겨준다
//       (나중에 진짜 수집 엔드포인트를 붙일 때 이 훅만 끼우면 됨).
//   어떤 경우에도 예외를 던지지 않는다 — 분석 코드가 화면을 깨뜨리면 안 되므로.

// 커스텀 이벤트 한 건을 기록한다.
//   event: 이벤트 이름 문자열. 예: "search_zero", "game_view".
//   props: 이벤트에 딸린 속성 객체(선택). 예: { q: "사이버펑크" }, { appid: 1091500 }.
// window가 없으면 no-op. 실패해도 절대 throw 하지 않는다.
export function track(event, props = {}) {
  try {
    if (typeof window === "undefined") return; // 브라우저 밖(빌드/SSR)에선 아무 것도 안 함
    // 개발 중 흐름 확인용 디버그 로그(프로덕션 콘솔엔 debug 레벨이라 거의 안 보임).
    if (typeof console !== "undefined" && console.debug) {
      console.debug("[analytics] track", event, props);
    }
    // 외부 수집 훅이 끼워져 있으면 그쪽으로 위임(향후 실제 전송 지점).
    if (typeof window.__gamgapTrack === "function") {
      window.__gamgapTrack(event, props);
    }
  } catch {
    // 분석은 부가 기능 — 어떤 에러도 삼켜서 화면 동작을 방해하지 않는다.
  }
}

// 페이지뷰 한 건을 기록한다.
//   path: 현재 경로 문자열(선택). 안 주면 현재 location.pathname 사용.
// Cloudflare Web Analytics 비콘이 페이지뷰는 자동으로 잡으므로 기본은 안전한 no-op.
// SPA 라우팅에서 수동 페이지뷰가 필요해지면 여기 훅을 채우면 된다.
export function pageview(path) {
  try {
    if (typeof window === "undefined") return;
    const p = path || (window.location && window.location.pathname) || "/";
    if (typeof console !== "undefined" && console.debug) {
      console.debug("[analytics] pageview", p);
    }
    if (typeof window.__gamgapPageview === "function") {
      window.__gamgapPageview(p);
    }
  } catch {
    // no-op: 분석 실패가 앱을 멈추게 두지 않는다.
  }
}
