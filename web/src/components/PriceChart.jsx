import { useMemo, useState } from "react";
import { won } from "../lib/format";

// 기간 프리셋. months=null 이면 전체. (이력이 change-only 월단위라 촘촘하진 않음)
const RANGES = [
  { key: "1y", label: "1년", months: 12 },
  { key: "3y", label: "3년", months: 36 },
  { key: "all", label: "전체", months: null },
];

// "YYYY-MM" 형태의 컷오프 문자열을 만든다(현재 기준 months개월 전). 문자열 비교로 필터.
function cutoffYM(months) {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}

// 모달 안 가격 흐름 그래프. 역대최저 금색 점선 + ★ 마커 + 면적 그라데이션 + hover 툴팁.
// 기간 프리셋으로 보는 구간을 좁힐 수 있다(데이터가 적으면 자동으로 전체로 폴백).
export default function PriceChart({ hist, low }) {
  const [hover, setHover] = useState(null);
  const [range, setRange] = useState("all");

  const view = useMemo(() => {
    if (!hist || hist.length < 2) return hist || [];
    const r = RANGES.find((x) => x.key === range);
    if (!r || r.months == null) return hist;
    const cut = cutoffYM(r.months);
    const f = hist.filter((p) => String(p.d) >= cut);
    return f.length >= 2 ? f : hist; // 너무 적으면 전체로 폴백
  }, [hist, range]);

  if (!hist || hist.length < 2)
    return <div className="empty">가격 흐름 데이터가 아직 쌓이는 중이에요.</div>;

  const W = 480,
    H = 160,
    pl = 46,
    pr = 10,
    pt = 12,
    pb = 22;
  const vals = view.map((p) => Number(p.p) || 0).concat([Number(low) || 0]);
  const min = Math.min(...vals),
    max = Math.max(...vals),
    span = max - min || 1;
  const X = (i) => pl + (i / (view.length - 1)) * (W - pl - pr);
  const Y = (v) => pt + (1 - (v - min) / span) * (H - pt - pb);
  const line = view
    .map((p, i) => (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(Number(p.p) || 0).toFixed(1))
    .join(" ");
  const area =
    line + " L" + X(view.length - 1).toFixed(1) + " " + (H - pb) + " L" + X(0).toFixed(1) + " " + (H - pb) + " Z";
  const lowY = Y(Number(low) || 0).toFixed(1);

  // 현재 구간의 최저점(★ 마커 위치)
  const viewVals = view.map((p) => Number(p.p) || 0);
  const minIdx = viewVals.indexOf(Math.min(...viewVals));

  const pick = (clientX, target) => {
    const rect = target.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * W;
    let idx = Math.round(((x - pl) / (W - pl - pr)) * (view.length - 1));
    idx = Math.max(0, Math.min(view.length - 1, idx));
    setHover(idx);
  };

  return (
    <div className="chartblock">
      <div className="chart-presets">
        {RANGES.map((r) => (
          <button
            key={r.key}
            className={"preset" + (range === r.key ? " on" : "")}
            onClick={() => {
              setRange(r.key);
              setHover(null);
            }}
          >
            {r.label}
          </button>
        ))}
      </div>

      <div className="chartwrap">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          width="100%"
          height="170"
          preserveAspectRatio="none"
          style={{ overflow: "visible", touchAction: "none" }}
          onMouseMove={(e) => pick(e.clientX, e.currentTarget)}
          onMouseLeave={() => setHover(null)}
          onTouchStart={(e) => pick(e.touches[0].clientX, e.currentTarget)}
          onTouchMove={(e) => pick(e.touches[0].clientX, e.currentTarget)}
          onTouchEnd={() => setHover(null)}
        >
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C8912B" stopOpacity="0.32" />
              <stop offset="100%" stopColor="#C8912B" stopOpacity="0.02" />
            </linearGradient>
          </defs>
          <path d={area} fill="url(#grad)" />
          <path d={line} fill="none" stroke="#C8912B" strokeWidth="2" vectorEffect="non-scaling-stroke" />
          <line x1={pl} y1={lowY} x2={W - pr} y2={lowY} stroke="#C8912B" strokeDasharray="4 4" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          <text x={pl} y={Number(lowY) - 5} fill="#C8912B" fontSize="10" fontFamily="sans-serif">
            ★ 역대최저
          </text>
          <text x="2" y={pt + 8} fill="#8C8674" fontSize="10" fontFamily="monospace">
            {(max / 10000).toFixed(0)}만
          </text>
          <text x="2" y={H - pb} fill="#8C8674" fontSize="10" fontFamily="monospace">
            {(min / 10000).toFixed(0)}만
          </text>
          {/* 구간 최저점 ★ 마커 */}
          {minIdx >= 0 && (
            <text
              x={X(minIdx)}
              y={Y(viewVals[minIdx]) - 7}
              fill="#C8912B"
              fontSize="12"
              textAnchor="middle"
            >
              ★
            </text>
          )}
          {hover != null && (
            <g>
              <line x1={X(hover)} y1={pt} x2={X(hover)} y2={H - pb} stroke="#1C1B17" strokeOpacity="0.25" strokeWidth="1" vectorEffect="non-scaling-stroke" />
              <circle cx={X(hover)} cy={Y(Number(view[hover].p) || 0)} r="3.5" fill="#C8912B" stroke="#FBF9F3" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
            </g>
          )}
        </svg>
        {hover != null && (
          <div className="charttip" style={{ left: (X(hover) / W) * 100 + "%" }}>
            <div className="tt-d">{view[hover].d}</div>
            <div className="tt-p">{won(view[hover].p)}</div>
          </div>
        )}
      </div>
    </div>
  );
}
