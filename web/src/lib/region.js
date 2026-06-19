// 화면 언어 → 스팀 지역코드(cc) + 통화. 가격을 그 나라 통화로 보여주기 위한 매핑.
// ⚠️ 크롤러(REGIONS)가 실제로 수집하는 지역과 일치해야 한다. 데이터가 아직 없는 언어는
//    워커가 한국(원화)으로 안전 폴백하므로, 매핑만 있고 데이터가 없으면 원화로 보인다(버그 아님).
const MAP = {
  en: { cc: "us", currency: "USD" }, // 영어 → 미국 달러
  ja: { cc: "jp", currency: "JPY" }, // 일본어 → 엔
  zh: { cc: "cn", currency: "CNY" }, // 중국어 → 위안
  es: { cc: "es", currency: "EUR" }, // 스페인어 → 유로(스페인)
  pt: { cc: "br", currency: "BRL" }, // 포르투갈어 → 헤알(브라질)
};

export function regionForLang(lang) {
  return MAP[lang] || { cc: "kr", currency: "KRW" };
}
