import { SORTS } from "../lib/dealSort";
import { won } from "../lib/format";

// "할인 중" 목록 위/옆에 붙는 정렬·필터 바.
// availableGenres(데이터에 실제 등장하는 장르)가 있을 때만 장르 칩을 보여준다 → 장르 데이터가
// 들어오기 전엔 자동으로 숨겨진다.
export default function DealControls({ opts, onChange, availableGenres = [] }) {
  const set = (patch) => onChange({ ...opts, ...patch });
  const selected = opts.genres || [];
  const toggleGenre = (t) =>
    set({ genres: selected.includes(t) ? selected.filter((x) => x !== t) : [...selected, t] });

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
        <button className={"toggle" + (opts.onlyLow ? " on" : "")} onClick={() => set({ onlyLow: !opts.onlyLow })}>
          역대최저만
        </button>
        <button className={"toggle" + (opts.min50 ? " on" : "")} onClick={() => set({ min50: !opts.min50 })}>
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

      {availableGenres.length > 0 && (
        <div className="ctrl-genres">
          <div className="ctrl-genres-top">
            <span className="ctrl-lab">장르</span>
            {selected.length > 0 && (
              <button className="ctrl-clear" onClick={() => set({ genres: [] })}>
                초기화
              </button>
            )}
          </div>
          <div className="genre-chips">
            {availableGenres.map((t) => (
              <button
                key={t}
                className={"toggle" + (selected.includes(t) ? " on" : "")}
                onClick={() => toggleGenre(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
