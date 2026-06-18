// 정적 콘텐츠 페이지 로더 (언어별 + 지연 로딩). 구조: web/src/content/pages/<lang>/<slug>.js
const mods = import.meta.glob("./pages/*/*.js");

const FALLBACK = "ko";

// byLang[lang][slug] = () => Promise<{default}>
const byLang = {};
for (const path in mods) {
  const m = path.match(/\.\/pages\/([^/]+)\/([^/]+)\.js$/);
  if (!m) continue;
  (byLang[m[1]] || (byLang[m[1]] = {}))[m[2]] = mods[path];
}

// 단일 페이지(현재 언어, 없으면 영어→한국어 폴백). Promise<page|null>.
export async function loadPage(lang, slug) {
  const ld =
    (byLang[lang] && byLang[lang][slug]) ||
    (byLang.en && byLang.en[slug]) ||
    (byLang[FALLBACK] && byLang[FALLBACK][slug]);
  if (!ld) return null;
  const m = await ld();
  return (m && m.default) || null;
}
