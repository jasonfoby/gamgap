// 가이드 글 로더 (React 앱 전용).
// web/src/content/guides/ 폴더의 *.js 파일 하나하나가 가이드 글 한 편이다.
// 각 파일은 default export로 글 객체 하나를 내보낸다. 모양 예시:
//   export default {
//     slug: "steam-sale-calendar",      // URL 조각, 예: /guide/steam-sale-calendar
//     title: "스팀 세일 일정 총정리",     // 글 제목
//     date: "2026-06-01",               // 정렬·표시용 날짜(YYYY-MM-DD)
//     description: "...",               // 요약(목록 카드/메타용)
//     body: [ { type:"p", text:"..." }, ... ]  // ArticleBody가 그리는 블록 배열
//   }
//
// import.meta.glob(eager)로 빌드 시점에 모든 글을 모은다(런타임 fetch 없음).

const mods = import.meta.glob("./guides/*.js", { eager: true });

// 모든 가이드 글. slug 없는 잘못된 파일은 거르고, 최신 날짜가 먼저 오도록 내림차순 정렬.
export const GUIDES = Object.values(mods)
  .map((m) => m.default)
  .filter((g) => g && g.slug)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

// slug로 가이드 글 하나를 찾는다. 없으면 undefined.
export const getGuide = (slug) => GUIDES.find((g) => g.slug === slug);
