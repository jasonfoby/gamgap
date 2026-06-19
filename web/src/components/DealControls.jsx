import { SORTS } from "../lib/dealSort";
import { PRICE_PRESETS } from "../lib/filterUi";
import { money } from "../lib/format";
import { useT } from "../lib/i18n";

// "할인 중" 목록 위/옆에 붙는 정렬·필터 바.
// currency: 목록 가격의 통화(원화면 'KRW'). 가격 라벨을 통화에 맞추고, 원화 고정 프리셋은 비원화일 때 숨긴다.
// availableGenres(데이터에 실제 등장하는 장르)가 있을 때만 장르 칩을 보여준다.
export default function DealControls({ opts, onChange, availableGenres = [], currency = "KRW" }) {
  const { t } = useT();
  const set = (patch) => onChange({ ...opts, ...patch });
  const selected = opts.genres || [];
  const isKRW = !currency || currency === "KRW";
  const step = opts.maxBound >= 2000 ? 1000 : 1; // 원화는 1000 단위, 달러 등 소액 통화는 1 단위
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
            {opts.maxPrice >= opts.maxBound ? t("ctrl.noLimit") : t("ctrl.under", { p: money(opts.maxPrice, currency) })}
          </span>
        </div>
        <div className="genre-chips">
          {isKRW &&
            PRICE_PRESETS.filter((p) => p.max < opts.maxBound).map((p) => (
              <button
                key={p.max}
                className={"toggle" + (opts.maxPrice === p.max ? " on" : "")}
                onClick={() => set({ maxPrice: p.max })}
              >
                {t("ctrl.under", { p: money(p.max, currency) })}
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
          step={step}
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
