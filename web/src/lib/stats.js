// 가격 이력에서 통계 뽑기. hist: [{ d:"2024-11", p:19800 }, ...]
export function priceStats(hist) {
  if (!hist || !hist.length) return null;
  const vals = hist.map((p) => Number(p.p) || 0).filter((v) => v > 0);
  // 점이 1개뿐이면 '역대 평균/최고가'가 현재가와 똑같이 찍혀 오해를 부른다.
  // 차트도 2점 미만이면 빈 상태이므로, 통계도 같이 숨겨 일관성을 맞춘다.
  if (vals.length < 2) return null;
  const sum = vals.reduce((a, b) => a + b, 0);
  return {
    avg: sum / vals.length, // 역대 평균가(반올림 안 함 — 통화별 자릿수는 money()/Intl가 처리. 원화는 0자리로 동일)
    max: Math.max(...vals), // 역대 최고가
    min: Math.min(...vals), // 역대 최저가(이력 기준)
    since: hist[0]?.d || null, // 기록 시작 시점
    count: hist.length,
  };
}

// 차트에 그릴 가격 시리즈. 실제 이력이 2점 이상이면 그대로 쓴다.
// 부족하면(해외 지역은 수집이 짧아 1점인 경우가 많음) '정가 → 현재가' 2점으로 합성해
// 모든 언어에서 가격 흐름 그래프가 일관되게 보이게 한다(정가>현재가, 즉 할인 중일 때만).
export function chartSeries(game) {
  const h = (game.history || []).filter((p) => Number(p.p) > 0);
  if (h.length >= 2) return h;
  const normal = Number(game.normalPrice) || 0;
  const cur = Number(game.currentPrice) || 0;
  if (normal > cur && cur > 0) {
    const curDate = (h[0] && h[0].d) || game.allTimeLowDate || "";
    return [{ d: "", p: normal }, { d: curDate, p: cur }];
  }
  return h; // 합성도 불가(정가=현재가 등)면 그대로 → 차트는 빈 상태로 폴백
}

// 이력에서 "과거 저점" 모음 — 가격 오름차순, 같은 가격은 가장 이른 기록만, 상위 n개.
// 그래프를 못 읽는 사용자도 "평소 얼마까지 떨어졌나"를 한눈에 보게 하는 보조 리스트용.
export function lowPoints(hist, n = 5) {
  if (!hist || !hist.length) return [];
  const seen = new Set();
  return hist
    .map((p) => ({ d: p.d, p: Number(p.p) || 0 }))
    .filter((p) => p.p > 0)
    .sort((a, b) => a.p - b.p || String(a.d).localeCompare(String(b.d)))
    .filter((p) => (seen.has(p.p) ? false : (seen.add(p.p), true)))
    .slice(0, n);
}

// "지금 살 때"인가? 역대최저거나 거의 역대최저(5% 이내).
export function isBuyNow(g) {
  const low = Number(g.allTimeLow) || 0,
    cur = Number(g.currentPrice) || 0;
  if (cur <= low) return true;
  return low > 0 && (cur - low) / low <= 0.05;
}
