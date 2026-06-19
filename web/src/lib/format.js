// 화면 표기용 포맷 유틸. 가격 값 자체는 항상 한국 스팀 원화(KRW) — 언어에 따라 표기만 달라진다.
// (한국어: "62,000원" / 그 외 언어: "₩62,000" — 누구나 아는 원화 기호 사용)

// 현재 표기 언어. i18n 엔진(LanguageProvider)이 렌더 시 setFormatLang으로 맞춰준다.
let _lang = "ko";
export function setFormatLang(l) {
  _lang = l || "ko";
}

const LOCALE = { ko: "ko-KR", en: "en-US", ja: "ja-JP", zh: "zh-CN", es: "es-ES", pt: "pt-BR" };

// 원화 정수를 화면용 문자열로. 예(ko): 66000 → "66,000원" / (en): "₩66,000"
export function won(n) {
  const v = Number(n) || 0;
  const num = v.toLocaleString(LOCALE[_lang] || "en-US");
  return _lang === "ko" ? num + "원" : "₩" + num;
}

// 통화에 맞춰 가격을 표기한다. 게임 객체가 들고 온 currency 기준(없거나 KRW면 원화 표기).
// 예: money(59.99,"USD") → "$59.99" / money(5980,"JPY") → "¥5,980" / money(62000) → "62,000원"/"₩62,000"
export function money(n, currency) {
  if (!currency || currency === "KRW") return won(n);
  const v = Number(n) || 0;
  const loc = LOCALE[_lang] || "en-US";
  try {
    return new Intl.NumberFormat(loc, { style: "currency", currency }).format(v);
  } catch {
    return v.toLocaleString(loc) + " " + currency;
  }
}

// "2024-11" 같은 날짜 문자열을 언어에 맞게. ko: "2024년 11월" / 그 외: "Nov 2024" 등.
export function ym(d) {
  if (!d) return "";
  const m = String(d).match(/(\d{4})-(\d{1,2})/);
  if (!m) return String(d);
  if (_lang === "ko") return `${m[1]}년 ${Number(m[2])}월`;
  try {
    const dt = new Date(Number(m[1]), Number(m[2]) - 1, 1);
    return dt.toLocaleString(LOCALE[_lang] || "en-US", { year: "numeric", month: "short" });
  } catch {
    return `${m[1]}-${m[2]}`;
  }
}

// 게임 이름 글자 합으로 표지 그라데이션 배경색을 정한다 (이름마다 고정 색).
export function coverGradient(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h += name.charCodeAt(i);
  h = (h * 37) % 360;
  return `linear-gradient(150deg,hsl(${h} 38% 30%),hsl(${(h + 40) % 360} 42% 18%))`;
}

// 표지에 크게 박을 첫 글자.
export function coverInitial(name) {
  return name.trim().charAt(0) || "?";
}
