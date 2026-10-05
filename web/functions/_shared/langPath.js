// 언어별 주소(/ko/…, /ja/…) 공용 도구 — 서버(Pages 함수)용.
//
// 왜 필요한가: 예전엔 한 주소가 방문자 언어(Accept-Language)에 따라 다른 언어를 보여줬다. 그런데 빙·구글
// 로봇은 언어 표시 없이 오므로 영어판만 저장했고, 한국 사람이 빙에서 검색하면 영어 제목이 떠서 클릭이 0이었다
// (2026-09-28 빙 노출 1,500·클릭 0). 그래서 언어마다 고정 주소를 따로 둔다.
//  - 영어 = 접두어 없는 기존 주소(/guide/x). 기존 주소는 지금처럼 방문자 언어에 맞춰 보여주되(사람용),
//    검색엔진에는 영어판이자 x-default(언어를 못 고를 때 기본)로 알린다.
//  - 나머지 = /ko/guide/x, /ja/guide/x … 이 주소는 방문자 언어와 상관없이 항상 그 언어로 고정.
// 각 페이지 head 에 hreflang(“이 글의 한국어판은 여기”라는 안내 표지)을 달아 검색엔진이 언어판을 짝지어 준다.

export const SITE = "https://lowstamp.com";
export const PREFIX_LANGS = ["ko", "ja", "zh", "es", "pt"]; // 영어는 접두어 없음
const HREFLANG = { en: "en", ko: "ko", ja: "ja", zh: "zh-Hans", es: "es", pt: "pt" };

// 언어 + 기본 경로 → 그 언어의 경로. 예: ("ko", "/") → "/ko/", ("ko", "/guide") → "/ko/guide"
export function langPath(lang, base) {
  if (!lang || lang === "en" || !PREFIX_LANGS.includes(lang)) return base;
  return base === "/" ? `/${lang}/` : `/${lang}${base}`;
}

// 기본 경로(접두어 없는 경로)에 대한 hreflang 링크 묶음.
// only 를 주면 그 언어판만 안내한다(예: 게임 페이지는 색인하는 영어·한국어만).
export function hreflangTags(base, only) {
  const langs = ["en", ...PREFIX_LANGS].filter((l) => !only || only.includes(l));
  return (
    langs.map((l) => `<link rel="alternate" hreflang="${HREFLANG[l]}" href="${SITE}${langPath(l, base)}">`).join("") +
    `<link rel="alternate" hreflang="x-default" href="${SITE}${base}">`
  );
}
