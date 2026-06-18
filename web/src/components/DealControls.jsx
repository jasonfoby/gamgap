import { SORTS } from "../lib/dealSort";
import { PRICE_PRESETS } from "../lib/filterUi";
import { won } from "../lib/format";
import { useT } from "../lib/i18n";

// "할인 중" 목록 위/옆에 붙는 정렬·필터 바.
// availableGenres(데이터에 실제 등장하는 장르)가 있을 때만 장르 칩을 보여준다.
// (장르명은 백엔드 데이터 문자열이라 그대로 노출 — 다국어 매핑은 후속 과제)
export default function DealControls({ opts, onChange, availableGenres = [] }) {
  const { t } = useT();
  const set = (patch) => onChange({ ...opts, ...patch });
  const selected = opts.genres || [];
  const toggleGenre = (g) =>
    set({ genres: selected.includes(g) ? selected.filter((x) => x !== g) : [...selected, g] });

  return (
    <div className="controls">
      <div className="ctrl-row">
        <select className="sel" value={opts.sort} onChange={(e) => set({ sort: e.target.value })}>
          {SORTS.map((s) => (
            <option key={s.key} value={s.key}>
              {t(s.labelKey)}
            </option>
          ))}
        </select>
        <button className={"toggle" + (opts.onlyLow ? " on" : "")} onClick={() => set({ onlyLow: !opts.onlyLow })}>
          {t("ctrl.onlyLow")}
        </button>
        <button className={"toggle" + (opts.min50 ? " on" : "")} onClick={() => set({ min50: !opts.min50 })}>
          {t("ctrl.min50")}
        </button>
      </div>

      <div className="ctrl-price">
        <div className="ctrl-genres-top">
          <span className="ctrl-lab">{t("ctrl.priceLabel")}</span>
          <span className="ctrl-val">
            {opts.maxPrice >= opts.maxBound ? t("ctrl.noLimit") : t("ctrl.under", { p: won(opts.maxPrice) })}
          </span>
        </div>
        <div className="genre-chips">
          {PRICE_PRESETS.filter((p) => p.max < opts.maxBound).map((p) => (
            <button
              key={p.max}
              className={"toggle" + (opts.maxPrice === p.max ? " on" : "")}
              onClick={() => set({ maxPrice: p.max })}
            >
              {t("ctrl.under", { p: won(p.max) })}
            </button>
          ))}
          <button
            className={"toggle" + (opts.maxPrice >= opts.maxBound ? " on" : "")}
            onClick={() => set({ maxPrice: opts.maxBound })}
          >
            {t("ctrl.all")}
          </button>
        </div>
        <input
          type="range"
          min="0"
          max={opts.maxBound}
          step="1000"
          value={opts.maxPrice}
          onChange={(e) => set({ maxPrice: Number(e.target.value) })}
          aria-label={t("ctrl.maxPriceAria")}
        />
      </div>

      {availableGenres.length > 0 && (
        <div className="ctrl-genres">
          <div className="ctrl-genres-top">
            <span className="ctrl-lab">{t("ctrl.genre")}</span>
            {selected.length > 0 && (
              <button className="ctrl-clear" onClick={() => set({ genres: [] })}>
                {t("ctrl.reset")}
              </button>
            )}
          </div>
          <div className="genre-chips">
            {availableGenres.map((g) => (
              <button
                key={g}
                className={"toggle" + (selected.includes(g) ? " on" : "")}
                onClick={() => toggleGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
