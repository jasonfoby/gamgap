// 화면 언어 → 스팀 지역코드(cc) + 통화. 가격을 그 나라 통화로 보여주기 위한 매핑.
// ⚠️ 크롤러(REGIONS)가 실제로 수집하는 지역만 매핑한다. 현재는 미국(us)만 수집 →
//    영어는 USD, 나머지 언어는 한국(원화)로 폴백. 크롤러에 jp/cn/es/br 등을 추가하면 여기에 줄만 더하면 된다.
const MAP = {
  en: { cc: "us", currency: "USD" },
  // 추후 크롤러 REGIONS 확장 시:
  // ja: { cc: "jp", currency: "JPY" },
  // zh: { cc: "cn", currency: "CNY" },
  // es: { cc: "es", currency: "EUR" },
  // pt: { cc: "br", currency: "BRL" },
};

export function regionForLang(lang) {
  return MAP[lang] || { cc: "kr", currency: "KRW" };
}
