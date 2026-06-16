// 카드 안 미니 가격 그래프. 역대최저 지점에 금색 점.
export default function Sparkline({ hist, color }) {
  if (!hist || hist.length < 2) return null;
  const vals = hist.map((p) => Number(p.p) || 0);
  const min = Math.min(...vals),
    max = Math.max(...vals),
    span = max - min || 1,
    w = 96,
    h = 30;
  const pts = vals.map((v, i) => [
    (i / (vals.length - 1)) * w,
    h - ((v - min) / span) * h,
  ]);
  const mi = vals.indexOf(min);
  return (
    <svg width={w} height={h} style={{ display: "block", overflow: "visible" }}>
      <polyline
        points={pts.map((p) => p[0].toFixed(1) + "," + p[1].toFixed(1)).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle
        cx={pts[mi][0].toFixed(1)}
        cy={pts[mi][1].toFixed(1)}
        r="2.6"
        fill="#C8912B"
      />
    </svg>
  );
}
