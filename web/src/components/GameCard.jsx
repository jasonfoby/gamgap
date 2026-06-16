import Cover from "./Cover";
import Stamp from "./Stamp";
import Sparkline from "./Sparkline";
import StarButton from "./StarButton";
import { verdict } from "../lib/verdict";
import { won } from "../lib/format";

// 게임 한 장(영수증 카드). 클릭하면 onClick(game)으로 상세 모달을 연다.
// 카드 위에 찜 별 버튼을 오버레이로 올린다(버튼 중첩을 피하려 형제로 배치).
export default function GameCard({ game, onClick }) {
  const v = verdict(game);
  return (
    <div className="card-wrap">
      <button className="card" onClick={() => onClick(game)}>
        <Cover appid={game.appid} name={game.name} />
        <div className="mid">
          <div className="name">{game.name}</div>
          <div className="low">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C8912B" strokeWidth="2">
              <path d="M3 7l6 6 4-4 8 8" />
              <path d="M21 17v-4h-4" />
            </svg>
            역대 최저 <span className="n">{won(game.allTimeLow)}</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <Sparkline hist={game.history} color={v.bd} />
          </div>
        </div>
        <div className="right">
          <div style={{ textAlign: "right" }}>
            {game.discountPercent > 0 && <span className="pct">-{game.discountPercent}%</span>}
            <div className="cur">{won(game.currentPrice)}</div>
            {game.discountPercent > 0 && <div className="normal">{won(game.normalPrice)}</div>}
          </div>
          <div style={{ marginTop: 8 }}>
            <Stamp v={v} />
          </div>
        </div>
      </button>
      <StarButton appid={game.appid} className="star-overlay" />
    </div>
  );
}
