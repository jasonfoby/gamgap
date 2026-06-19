// 스팀이 영어 표준 문구로 준 '종합 평가'(review_desc, 예: "Overwhelmingly Positive")를
// 표시용 i18n 키와 색상 등급(tier)으로 매핑한다. 백엔드 데이터(games.review_desc)는
// 영어 표준 문구 그대로라, 비한국어 UI에서도 같은 매핑으로 번역해 보여줄 수 있다.
// 매핑에 없거나 빈 값이면 reviewKey()는 null → 호출부에서 평가 줄을 그리지 않는다.
const MAP = {
  "Overwhelmingly Positive": { key: "review.overwhelmingly_positive", tier: "positive" },
  "Very Positive":           { key: "review.very_positive",           tier: "positive" },
  "Positive":                { key: "review.positive",                tier: "positive" },
  "Mostly Positive":         { key: "review.mostly_positive",         tier: "positive" },
  "Mixed":                   { key: "review.mixed",                   tier: "mixed" },
  "Mostly Negative":         { key: "review.mostly_negative",         tier: "negative" },
  "Negative":                { key: "review.negative",                tier: "negative" },
  "Very Negative":           { key: "review.very_negative",           tier: "negative" },
  "Overwhelmingly Negative": { key: "review.overwhelmingly_negative", tier: "negative" },
};

// 영어 평가 문구 → i18n 키. 모르는/빈 값이면 null. 앞뒤 공백·중복 공백에 관대.
export function reviewKey(desc) {
  const norm = String(desc || "").trim().replace(/\s+/g, " ");
  return MAP[norm] ? MAP[norm].key : null;
}

// 영어 평가 문구 → 색상 등급 "positive" | "mixed" | "negative" | "" (모름).
export function reviewTier(desc) {
  const norm = String(desc || "").trim().replace(/\s+/g, " ");
  return MAP[norm] ? MAP[norm].tier : "";
}
