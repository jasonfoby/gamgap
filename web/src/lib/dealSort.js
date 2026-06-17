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

// 게임 객체에서 장르 배열을 정규화한다. 워커가 배열로 주든("액션") 쉼표 문자열로 주든("액션,RPG") 모두 처리.
// 아직 장르 데이터가 없으면 빈 배열.
export function gameGenres(g) {
  const raw = g && g.genres;
  if (Array.isArray(raw)) return raw.map((s) => String(s).trim()).filter(Boolean);
  if (typeof raw === "string") return raw.split(",").map((s) => s.trim()).filter(Boolean);
  return [];
}

// 목록에 실제로 등장하는 장르를 빈도 높은 순으로 모은다(필터 칩 후보). 데이터 없으면 빈 배열 → 필터 숨김.
export function availableGenres(rows) {
  const count = new Map();
  for (const g of rows || []) {
    for (const t of gameGenres(g)) count.set(t, (count.get(t) || 0) + 1);
  }
  return [...count.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
}

export const defaultDealOpts = (maxBound) => ({
  sort: "discount",
  onlyLow: false, // 지금이 역대최저인 것만
  min50: false, // 50% 이상 할인만
  maxPrice: maxBound, // 최대 가격(슬라이더). maxBound면 제한 없음.
  maxBound,
  genres: [], // 선택한 장르(여러 개면 OR — 하나라도 맞으면 통과)
});

// 정렬·필터를 적용해 새 배열을 돌려준다.
export function applyDealOpts(rows, opts) {
  let out = rows.slice();
  if (opts.onlyLow)
    out = out.filter((g) => (Number(g.currentPrice) || 0) <= (Number(g.allTimeLow) || 0));
  if (opts.min50) out = out.filter((g) => (Number(g.discountPercent) || 0) >= 50);
  if (opts.maxPrice < opts.maxBound)
    out = out.filter((g) => (Number(g.currentPrice) || 0) <= opts.maxPrice);
  if (opts.genres && opts.genres.length) {
    const want = new Set(opts.genres);
    out = out.filter((g) => gameGenres(g).some((t) => want.has(t)));
  }

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
