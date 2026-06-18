import { won } from "./format";
import { defaultDealOpts } from "./dealSort";

// 가격 빠른 선택(프리셋). max=null 이면 '전체'(maxBound = 제한 없음).
export const PRICE_PRESETS = [
  { label: "1만원 이하", max: 10000 },
  { label: "2만원 이하", max: 20000 },
  { label: "3만원 이하", max: 30000 },
  { label: "5만원 이하", max: 50000 },
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
export function activeFilterChips(opts) {
  if (!opts) return [];
  const chips = [];
  if (opts.onlyLow) chips.push({ id: "onlyLow", label: "역대최저만", patch: { onlyLow: false } });
  if (opts.min50) chips.push({ id: "min50", label: "50%+ 할인", patch: { min50: false } });
  if (opts.maxPrice < opts.maxBound)
    chips.push({ id: "maxPrice", label: `${won(opts.maxPrice)} 이하`, patch: { maxPrice: opts.maxBound } });
  for (const g of opts.genres || [])
    chips.push({ id: "genre:" + g, label: g, patch: { genres: (opts.genres || []).filter((x) => x !== g) } });
  return chips;
}

// 전체 해제: 정렬 선택은 유지하고 필터만 초기화.
export function clearedOpts(opts) {
  return { ...defaultDealOpts(opts.maxBound), sort: opts.sort };
}
