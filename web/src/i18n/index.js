// 지원 언어 레지스트리 + 사전 묶음.
// 사전은 키→문자열 평면 맵. 누락 키는 i18n.jsx의 t()가 기본(한국어)로 폴백한다.
import ko from "./ko";
import en from "./en";
import ja from "./ja";
import zh from "./zh";
import es from "./es";
import pt from "./pt";

export const dicts = { ko, en, ja, zh, es, pt };

// 화면 언어 전환기에 노출되는 순서·표기.
export const SUPPORTED = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "es", label: "Español" },
  { code: "pt", label: "Português" },
];

// 기본/폴백 언어. 데이터(가격)는 한국 스팀 기준이라 한국어를 원본으로 둔다.
export const DEFAULT_LANG = "ko";

// React 밖(head.js 등)에서도 현재 언어로 번역을 쓰기 위한 모듈 전역.
// LanguageProvider가 렌더 시 setCurrentLang으로 맞춰준다.
let _current = DEFAULT_LANG;
export function setCurrentLang(l) {
  if (l) _current = l;
}
export function getCurrentLang() {
  return _current;
}

// 컴포넌트 밖에서 쓰는 번역 함수. 누락 키는 기본 언어로 폴백, 그래도 없으면 키 반환.
export function translate(lang, key, vars) {
  const d = dicts[lang] || {};
  let s = d[key];
  if (s == null) s = (dicts[DEFAULT_LANG] || {})[key];
  if (s == null) return key;
  if (vars) for (const k in vars) s = s.split("{" + k + "}").join(String(vars[k]));
  return s;
}
