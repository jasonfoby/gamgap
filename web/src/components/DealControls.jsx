import { SORTS } from "../lib/dealSort";
import { won } from "../lib/format";

// "할인 중" 목록 위에 붙는 정렬·필터 바.
export default function DealControls({ opts, onChange }) {
  const set = (patch) => onChange({ ...opts, ...patch });
  return (
    <div className="controls">
      <div className="ctrl-row">
        <select className="sel" value={opts.sort} onChange={(e) => set({ sort: e.target.value })}>
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              {s.label}
            </option>
          ))}
        </select>
        <button
          className={"toggle" + (opts.onlyLow ? " on" : "")}
          onClick={() => set({ onlyLow: !opts.onlyLow })}
        >
          역대최저만
        </button>
        <button
          className={"toggle" + (opts.min50 ? " on" : "")}
          onClick={() => set({ min50: !opts.min50 })}
        >
          50%+
        </button>
      </div>
      <div className="ctrl-row">
        <span className="ctrl-lab">최대 가격</span>
        <input
          type="range"
          min="0"
          max={opts.maxBound}
          step="1000"
          value={opts.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
        />
        <span className="ctrl-val">
          {opts.maxPrice >= opts.maxBound ? "제한 없음" : won(opts.maxPrice)}
        </span>
      </div>
    </div>
  );
}
