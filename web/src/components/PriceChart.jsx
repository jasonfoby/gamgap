import { useState } from "react";
import { won } from "../lib/format";

// 모달 안 가격 흐름 그래프. 역대최저 점선 + 면적 그라데이션.
// 마우스/터치를 올리면 가장 가까운 기록의 날짜·가격 툴팁을 띄운다.
export default function PriceChart({ hist, low }) {
  const [hover, setHover] = useState(null); // 가리킨 기록의 인덱스

  if (!hist || hist.length < 2)
    return <div className="empty">가격 흐름 데이터가 아직 쌓이는 중이에요.</div>;

  const W = 480,
    H = 150,
    pl = 44,
    pr = 8,
    pt = 8,
    pb = 20;
  const vals = hist.map((p) => Number(p.p) || 0).concat([Number(low) || 0]);
  const min = Math.min(...vals),
    max = Math.max(...vals),
    span = max - min || 1;
  const X = (i) => pl + (i / (hist.length - 1)) * (W - pl - pr);
  const Y = (v) => pt + (1 - (v - min) / span) * (H - pt - pb);
  const line = hist
    .map((p, i) => (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(Number(p.p) || 0).toFixed(1))
    .join(" ");
  const area =
    line +
    " L" + X(hist.length - 1).toFixed(1) + " " + (H - pb) +
    " L" + X(0).toFixed(1) + " " + (H - pb) + " Z";
  const lowY = Y(Number(low) || 0).toFixed(1);

  // 화면 x좌표 → 가장 가까운 기록 인덱스
  const pick = (clientX, target) => {
    const rect = target.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * W;
    let idx = Math.round(((x - pl) / (W - pl - pr)) * (hist.length - 1));
    idx = Math.max(0, Math.min(hist.length - 1, idx));
    setHover(idx);
  };

  return (
    <div className="chartwrap">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        height="150"
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
        <path d={line} fill="none" stroke="#C8912B" strokeWidth="2" />
        <line
          x1={pl}
          y1={lowY}
          x2={W - pr}
          y2={lowY}
          stroke="#C8912B"
          strokeDasharray="4 4"
          strokeWidth="1"
        />
        <text x={pl} y={Number(lowY) - 4} fill="#C8912B" fontSize="10" fontFamily="sans-serif">
          역대최저
        </text>
        <text x="2" y={pt + 8} fill="#8C8674" fontSize="10" fontFamily="monospace">
          {(max / 10000).toFixed(0)}만
        </text>
        <text x="2" y={H - pb} fill="#8C8674" fontSize="10" fontFamily="monospace">
          {(min / 10000).toFixed(0)}만
        </text>
        {hover != null && (
          <g>
            <line
              x1={X(hover)}
              y1={pt}
              x2={X(hover)}
              y2={H - pb}
              stroke="#1C1B17"
              strokeOpacity="0.25"
              strokeWidth="1"
            />
            <circle
              cx={X(hover)}
              cy={Y(Number(hist[hover].p) || 0)}
              r="3.5"
              fill="#C8912B"
              stroke="#FBF9F3"
              strokeWidth="1.5"
            />
          </g>
        )}
      </svg>
      {hover != null && (
        <div className="charttip" style={{ left: (X(hover) / W) * 100 + "%" }}>
          <div className="tt-d">{hist[hover].d}</div>
          <div className="tt-p">{won(hist[hover].p)}</div>
        </div>
      )}
    </div>
  );
}
