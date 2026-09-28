// 언어별 주소(/ko/…, /ja/…) 브라우저 쪽 도구. 서버 쪽 짝은 functions/_shared/langPath.js.
// 영어는 접두어 없는 기존 주소, 나머지 언어는 /ko/ 처럼 앞에 언어 코드를 붙인다.
// 화면 라우팅은 접두어를 뗀 '기본 경로'(/guide/x)로 하고, 주소창·링크·canonical 에만 접두어를 붙인다.
export const PREFIX_LANGS = ["ko", "ja", "zh", "es", "pt"];
const RE = /^\/(ko|ja|zh|es|pt)(?=\/|$)/;

// "/ko/guide/x" → { lang: "ko", base: "/guide/x" },  "/guide/x" → { lang: null, base: "/guide/x" }
export function splitLang(pathname) {
  const m = String(pathname || "/").match(RE);
  if (!m) return { lang: null, base: pathname || "/" };
  return { lang: m[1], base: pathname.slice(m[0].length) || "/" };
}

// 지금 주소창의 언어 접두어(없으면 null).
export function urlLang() {
  return typeof window === "undefined" ? null : splitLang(window.location.pathname).lang;
}

// 언어 + 기본 경로(쿼리 포함 가능) → 그 언어의 주소. 예: ("ko", "/?tab=deals") → "/ko/?tab=deals"
export function langPath(lang, to) {
  const s = String(to || "/");
  const q = s.search(/[?#]/);
  const path = q < 0 ? s : s.slice(0, q);
  const tail = q < 0 ? "" : s.slice(q);
  if (!lang || !PREFIX_LANGS.includes(lang)) return (path || "/") + tail;
  return (path === "/" || path === "" ? `/${lang}/` : `/${lang}${path}`) + tail;
}

// 사이트 안 경로에 '지금 주소의' 언어 접두어를 붙인다. 이미 접두어가 있으면 그대로.
export function localize(to) {
  const s = String(to || "/");
  if (!s.startsWith("/") || s.startsWith("//") || splitLang(s).lang) return s;
  return langPath(urlLang(), s);
}
