import Cover from "./Cover";
import Stamp from "./Stamp";
import StarButton from "./StarButton";
import { verdict } from "../lib/verdict";
import { money } from "../lib/format";
import { reviewKey, reviewTier } from "../lib/reviews";
import { useT, tNodes } from "../lib/i18n";

// 게임 한 장(세로 포스터형 영수증 카드).
// 위: 큰 표지 배너(할인율 배지) → 아래: 제목 / 현재가·정가 / 판정 도장(역대최저 함께 새김).
export default function GameCard({ game, onClick }) {
  const { t } = useT();
  const v = verdict(game);
  const onSale = Number(game.discountPercent) > 0;
  const hasLow = Number(game.allTimeLow) > 0;
  const rKey = game.reviewDesc ? reviewKey(game.reviewDesc) : null; // 평가 i18n 키(없으면 null)

  return (
    <div className="card-wrap">
      <button className="card" onClick={() => onClick(game)}>
        <div className="card-img">
          <Cover appid={game.appid} name={game.name} />
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
      <StarButton appid={game.appid} className="star-overlay" />
    </div>
  );
}
