// 가이드 로더 (언어별 + 지연 로딩). 파일 구조: web/src/content/guides/<lang>/<slug>.js
// import.meta.glob(비eager)로 각 글을 "필요할 때 가져오는 함수"로 받아, 보고 있는 언어의 글만
// 동적으로 불러온다(메인 번들에서 분리 → 초기 로딩 가볍게).
const mods = import.meta.glob("./guides/*/*.js");

const FALLBACK = "ko";

// byLang[lang][slug] = () => Promise<{default}>
const byLang = {};
for (const path in mods) {
  const m = path.match(/\.\/guides\/([^/]+)\/([^/]+)\.js$/);
  if (!m) continue;
  (byLang[m[1]] || (byLang[m[1]] = {}))[m[2]] = mods[path];
}

function loaderFor(lang, slug) {
  return (
    (byLang[lang] && byLang[lang][slug]) ||
    (byLang.en && byLang.en[slug]) ||
    (byLang[FALLBACK] && byLang[FALLBACK][slug])
  );
}

// 슬러그 집합은 한국어(원본) 기준 — 동기적으로 알 수 있음.
export function guideSlugs() {
  return Object.keys(byLang[FALLBACK] || {});
}

// 단일 글(현재 언어, 없으면 영어→한국어 폴백). Promise<guide|null>.
export async function loadGuide(lang, slug) {
  const ld = loaderFor(lang, slug);
  if (!ld) return null;
  const m = await ld();
  return (m && m.default) || null;
}

// 해당 언어의 전체 글 목록(날짜 내림차순). Promise<guide[]>.
export async function loadGuides(lang) {
  const slugs = guideSlugs();
  const arr = await Promise.all(slugs.map((s) => loadGuide(lang, s)));
  return arr.filter((g) => g && g.slug).sort((a, b) => (a.date < b.date ? 1 : -1));
}
