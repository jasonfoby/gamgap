import Cover from "./Cover";
import Stamp from "./Stamp";
import StarButton from "./StarButton";
import { verdict } from "../lib/verdict";
import { won } from "../lib/format";

// 게임 한 장(세로 포스터형 영수증 카드).
// 위: 큰 표지 배너(할인율 배지) → 아래: 제목 / 현재가·정가 / 판정 도장(역대최저 함께 새김).
// 모든 카드가 같은 구조라 제목·가격이 줄 맞춰 정렬된다. 찜 별은 오른쪽 위에 오버레이.
export default function GameCard({ game, onClick }) {
  const v = verdict(game);
  const onSale = Number(game.discountPercent) > 0;
  const hasLow = Number(game.allTimeLow) > 0;

  return (
    <div className="card-wrap">
      <button className="card" onClick={() => onClick(game)}>
        <div className="card-img">
          <Cover appid={game.appid} name={game.name} />
          {onSale && <span className="card-disc">-{game.discountPercent}%</span>}
        </div>
        <div className="card-body">
          <div className="name">{game.name}</div>
          <div className="price-row">
            <span className="cur">{won(game.currentPrice)}</span>
            {onSale && <span className="normal">{won(game.normalPrice)}</span>}
          </div>
          <Stamp
            v={v}
            note={hasLow ? <>역대최저 <span className="lcnum">{won(game.allTimeLow)}</span></> : undefined}
          />
        </div>
      </button>
      <StarButton appid={game.appid} className="star-overlay" />
    </div>
  );
}
