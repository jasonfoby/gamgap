import { createContext, useContext, useEffect, useState, Fragment } from "react";
import { dicts, SUPPORTED, DEFAULT_LANG, SOURCE_LANG, setCurrentLang } from "../i18n";
import { setFormatLang } from "./format";
import { urlLang, splitLang, langPath } from "./langPath";

// 의존성 없는 초경량 다국어(i18n) 엔진.
// - LanguageProvider: 현재 언어 상태를 들고 localStorage·<html lang>에 반영.
// - useT(): { lang, setLang, t } 를 반환. t("키", {vars}) 로 문자열을 가져온다.
// - 누락 키는 기본 언어(en)→원본(ko) 순으로 폴백하고, 그래도 없으면 키 자체를 반환(개발 중 누락 감지).
const KEY = "lowstamp:lang";
const codes = SUPPORTED.map((l) => l.code);

const LangContext = createContext({ lang: DEFAULT_LANG, setLang: () => {}, t: (k) => k });

// 첫 진입 언어: 주소의 언어(/ko/ 등) → 저장값 → 브라우저 언어 매핑 → 기본(en).
function detectInitial() {
  const fixed = urlLang();
  if (fixed) return fixed;
  try {
    const saved = localStorage.getItem(KEY);
    if (saved && codes.includes(saved)) return saved;
  } catch {
    /* 시크릿/차단 환경 무시 */
  }
  const nav = (typeof navigator !== "undefined" ? navigator.language || "" : "").toLowerCase();
  const hit = codes.find((c) => nav.startsWith(c)); // ko, en, ja, es, pt
  if (hit) return hit;
  if (nav.startsWith("zh")) return "zh"; // zh-CN, zh-Hans 등
  return DEFAULT_LANG;
}

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(detectInitial);

  // 렌더 시점에 통화·날짜 포맷 + 비React 번역(head.js) 언어를 맞춘다.
  setFormatLang(lang);
  setCurrentLang(lang);

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang;
    try {
      localStorage.setItem(KEY, lang);
    } catch {
      /* 저장 실패 무시 */
    }
  }, [lang]);

  const setLang = (l) => {
    if (!codes.includes(l)) return;
    setLangState(l);
    // 언어 고정 주소(/ko/…)에서 언어를 바꾸면 주소도 그 언어판으로 옮긴다(영어는 접두어 없는 주소).
    if (typeof window !== "undefined" && urlLang()) {
      const { base } = splitLang(window.location.pathname);
      window.history.replaceState(null, "", langPath(l, base) + window.location.search + window.location.hash);
    }
  };

  const t = (key, vars) => {
    const dict = dicts[lang] || {};
    let s = dict[key];
    if (s == null) s = (dicts[DEFAULT_LANG] || {})[key]; // 1차 폴백: 영어
    if (s == null) s = (dicts[SOURCE_LANG] || {})[key]; // 2차 폴백: 한국어(원본·전체 키)
    if (s == null) return key; // 키 자체 반환(누락 표시)
    if (vars) {
      for (const k in vars) s = s.split("{" + k + "}").join(String(vars[k]));
    }
    return s;
  };

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export function useT() {
  return useContext(LangContext);
}

// 템플릿 문자열의 {placeholder} 자리에 React 노드(강조 <b>·<span> 등)를 끼워 렌더한다.
// 언어마다 어순이 달라도 {p} 위치만 맞추면 되므로 강조를 안전하게 다국어화할 수 있다.
// 예: tNodes(t("card.atl"), { p: <span className="lcnum">{won(x)}</span> })
export function tNodes(template, nodes) {
  return String(template)
    .split(/(\{[a-zA-Z0-9_]+\})/g)
    .map((part, i) => {
      const m = part.match(/^\{([a-zA-Z0-9_]+)\}$/);
      return <Fragment key={i}>{m ? nodes[m[1]] ?? "" : part}</Fragment>;
    });
}
