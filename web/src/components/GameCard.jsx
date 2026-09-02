import Cover from "./Cover";
import Stamp from "./Stamp";
import StarButton from "./StarButton";
import { verdict } from "../lib/verdict";
import { money } from "../lib/format";
import { reviewKey, reviewTier } from "../lib/reviews";
import { useT, tNodes } from "../lib/i18n";

// 게임 한 장(세로 포스터형 영수증 카드).
// 위: 큰 표지 배너(할인율 배지) → 아래: 제목 / 현재가·정가 / 판정 도장(역대최저 함께 새김).
export default function GameCard({ game, onClick, priority = false, onSeriesToggle }) {
  const { t } = useT();
  const v = verdict(game);
  const onSale = Number(game.discountPercent) > 0;
  const hasLow = Number(game.allTimeLow) > 0;
  const rKey = game.reviewDesc ? reviewKey(game.reviewDesc) : null; // 평가 i18n 키(없으면 null)

  return (
    <div className={"card-wrap" + (game.seriesCount > 1 && onSeriesToggle ? " has-series" : "")}>
      <button className="card" onClick={() => onClick(game)}>
        <div className="card-img">
          <Cover appid={game.appid} name={game.name} priority={priority} />
          {onSale && <span className="card-disc">-{game.discountPercent}%</span>}
        </div>
        <div className="card-body">
          <div className="name">{game.name}</div>
          {rKey && (
            <span className={"card-review review-" + reviewTier(game.reviewDesc)}>{t(rKey)}</span>
          )}
          <div className="price-row">
            <span className="cur">{money(game.currentPrice, game.currency)}</span>
            {onSale && <span className="normal">{money(game.normalPrice, game.currency)}</span>}
          </div>
          <Stamp
            v={v}
            note={hasLow ? tNodes(t("card.atl"), { p: <span className="lcnum">{money(game.allTimeLow, game.currency)}</span> }) : undefined}
          />
        </div>
      </button>
      {/* 시리즈 묶음(같은 개발사·같은 값의 권/편 여러 개)을 접었을 때: 카드 아래 펼치기/접기 스트립.
          카드 자체가 <button> 이라 그 안에 넣을 수 없어 형제로 둔다. */}
      {game.seriesCount > 1 && onSeriesToggle && (
        <button type="button" className="card-series" onClick={() => onSeriesToggle(game.seriesKey)}>
          {game.seriesExpanded ? t("card.seriesCollapse") : t("card.series", { n: game.seriesCount - 1 })}
          <span aria-hidden="true">{game.seriesExpanded ? " ▴" : " ▾"}</span>
        </button>
      )}
      <StarButton appid={game.appid} className="star-overlay" />
    </div>
  );
}
