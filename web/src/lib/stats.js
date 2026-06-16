// 가격 이력에서 통계 뽑기. hist: [{ d:"2024-11", p:19800 }, ...]
export function priceStats(hist) {
  if (!hist || !hist.length) return null;
  const vals = hist.map((p) => Number(p.p) || 0).filter((v) => v > 0);
  if (!vals.length) return null;
  const sum = vals.reduce((a, b) => a + b, 0);
  return {
    avg: Math.round(sum / vals.length), // 역대 평균가
    max: Math.max(...vals), // 역대 최고가
    min: Math.min(...vals), // 역대 최저가(이력 기준)
    since: hist[0]?.d || null, // 기록 시작 시점
    count: hist.length,
  };
}

// "지금 살 때"인가? 역대최저거나 거의 역대최저(5% 이내).
export function isBuyNow(g) {
  const low = Number(g.allTimeLow) || 0,
    cur = Number(g.currentPrice) || 0;
  if (cur <= low) return true;
  return low > 0 && (cur - low) / low <= 0.05;
}
