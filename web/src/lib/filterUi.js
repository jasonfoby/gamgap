import { won } from "./format";
import { defaultDealOpts } from "./dealSort";

// 가격 빠른 선택(프리셋). 라벨은 번역 키로 둔다(DealControls가 t로 그린다).
export const PRICE_PRESETS = [
  { labelKey: "preset.u10", max: 10000 },
  { labelKey: "preset.u20", max: 20000 },
  { labelKey: "preset.u30", max: 30000 },
  { labelKey: "preset.u50", max: 50000 },
];

// 현재 걸린 필터 개수(정렬은 필터가 아니라 제외). 사이드바 토글 배지·활성 표시에 사용.
export function activeFilterCount(opts) {
  if (!opts) return 0;
  let n = 0;
  if (opts.onlyLow) n++;
  if (opts.min50) n++;
  if (opts.maxPrice < opts.maxBound) n++;
  if (opts.genres && opts.genres.length) n += opts.genres.length;
  return n;
}

// 적용된 필터를 삭제 가능한 칩 목록으로 변환. 각 칩의 patch를 opts에 합치면 그 필터가 풀린다.
// 라벨은 번역 키(labelKey)+변수(labelVars)로 두고, 장르 칩만 장르명 그대로(label)를 쓴다.
// (표시는 DealsView가 t(labelKey, labelVars) 또는 label 로 그린다.)
export function activeFilterChips(opts) {
  if (!opts) return [];
  const chips = [];
  if (opts.onlyLow) chips.push({ id: "onlyLow", labelKey: "chip.onlyLow", patch: { onlyLow: false } });
  if (opts.min50) chips.push({ id: "min50", labelKey: "chip.min50", patch: { min50: false } });
  if (opts.maxPrice < opts.maxBound)
    chips.push({ id: "maxPrice", labelKey: "chip.under", labelVars: { p: won(opts.maxPrice) }, patch: { maxPrice: opts.maxBound } });
  for (const g of opts.genres || [])
    chips.push({ id: "genre:" + g, label: g, patch: { genres: (opts.genres || []).filter((x) => x !== g) } });
  return chips;
}

// 전체 해제: 정렬 선택은 유지하고 필터만 초기화.
export function clearedOpts(opts) {
  return { ...defaultDealOpts(opts.maxBound), sort: opts.sort };
}
