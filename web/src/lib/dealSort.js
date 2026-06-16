// "할인 중" 목록의 정렬 기준들.
export const SORTS = [
  { key: "discount", label: "할인율 높은 순" },
  { key: "price", label: "현재가 낮은 순" },
  { key: "depth", label: "역대최저 근접 순" },
  { key: "normal", label: "정가 높은 순" },
];

// 현재가가 역대최저에 얼마나 가까운지(작을수록 지금이 쌈). 역대최저 없으면 뒤로.
const depth = (g) => {
  const low = Number(g.allTimeLow) || 0,
    cur = Number(g.currentPrice) || 0;
  return low > 0 ? (cur - low) / low : 9;
};

export const defaultDealOpts = (maxBound) => ({
  sort: "discount",
  onlyLow: false, // 지금이 역대최저인 것만
  min50: false, // 50% 이상 할인만
  maxPrice: maxBound, // 최대 가격(슬라이더). maxBound면 제한 없음.
  maxBound,
});

// 정렬·필터를 적용해 새 배열을 돌려준다.
export function applyDealOpts(rows, opts) {
  let out = rows.slice();
  if (opts.onlyLow)
    out = out.filter((g) => (Number(g.currentPrice) || 0) <= (Number(g.allTimeLow) || 0));
  if (opts.min50) out = out.filter((g) => (Number(g.discountPercent) || 0) >= 50);
  if (opts.maxPrice < opts.maxBound)
    out = out.filter((g) => (Number(g.currentPrice) || 0) <= opts.maxPrice);

  out.sort((a, b) => {
    switch (opts.sort) {
      case "price":
        return (Number(a.currentPrice) || 0) - (Number(b.currentPrice) || 0);
      case "normal":
        return (Number(b.normalPrice) || 0) - (Number(a.normalPrice) || 0);
      case "depth":
        return depth(a) - depth(b);
      case "discount":
      default:
        return (Number(b.discountPercent) || 0) - (Number(a.discountPercent) || 0);
    }
  });
  return out;
}
