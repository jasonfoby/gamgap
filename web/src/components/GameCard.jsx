import Cover from "./Cover";
import Stamp from "./Stamp";
import StarButton from "./StarButton";
import { verdict } from "../lib/verdict";
import { money } from "../lib/format";
import { reviewKey, reviewLevel } from "../lib/reviews";
import { useT, tNodes } from "../lib/i18n";

// 게임 한 장. 좁은 화면과 '오늘의 추천'(feat)에서는 세로 포스터형 영수증 카드,
// 넓은 화면 목록에서는 같은 마크업이 CSS 로 장부 한 줄(가로 행)로 접힌다 — 실제 영수증·장부처럼
// 한 화면에 많은 줄이 보이게 하려는 것. 구조를 하나로 두어 컴포넌트가 갈라지지 않게 했다.
export default function GameCard({ game, onClick, priority = false, feat = false }) {
  const { t } = useT();
  const v = verdict(game);
  const onSale = Number(game.discountPercent) > 0;
  // 최저가를 덧붙이는 건 '지금보다 더 쌌던 적이 있을 때'만 뜻이 있다.
  // 지금이 곧 최저가인 경우(오늘 최저가 탭은 전부 그렇다) "3,200원 · 최저 3,200원"이 되어
  // 같은 숫자가 두 번 나올 뿐이라, 그때는 단계 설명("지금이 가장 쌀 때")을 그대로 둔다.
  const hasLow =
    Number(game.allTimeLow) > 0 && Number(game.currentPrice) > Number(game.allTimeLow);
  const rKey = game.reviewDesc ? reviewKey(game.reviewDesc) : null; // 평가 i18n 키(없으면 null)

  return (
    <div className={"card-wrap" + (feat ? " is-feat" : "")}>
      <button className="card" onClick={() => onClick(game)}>
        <div className="card-img">
          <Cover appid={game.appid} name={game.name} priority={priority} />
          {onSale && <span className="card-disc">-{game.discountPercent}%</span>}
        </div>
        <div className="card-body">
          <div className="name">{game.name}</div>
          {rKey && (
            <span className={"card-review rv-" + reviewLevel(game.reviewDesc)}>{t(rKey)}</span>
          )}
          <div className="price-row">
            <span className="cur">{money(game.currentPrice, game.currency)}</span>
            {onSale && <span className="normal">{money(game.normalPrice, game.currency)}</span>}
          </div>
          {/* 도장은 앞머리 큰 카드에만 찍는다. '오늘 최저가' 탭은 모든 항목이 최저가라
              행마다 도장을 찍으면 화면에 도장이 수십 개 깔려 시그니처가 벽지가 된다.
              행에서는 같은 색을 왼쪽 막대로만 세운 납작한 표시를 쓴다(문구·색 체계는 동일). */}
          <Stamp
            v={v}
            flat={!feat}
            note={hasLow ? tNodes(t("card.atl"), { p: <span className="lcnum">{money(game.allTimeLow, game.currency)}</span> }) : undefined}
          />
        </div>
      </button>
      <StarButton appid={game.appid} className="star-overlay" />
    </div>
  );
}
