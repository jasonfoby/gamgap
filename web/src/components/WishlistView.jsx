import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { ListSkeleton } from "./Skeleton";
import { getGame } from "../api";
import { isBuyNow } from "../lib/stats";
import { useWishlist } from "../lib/wishlist";

// 역대최저에 가까운 순(작을수록 지금이 쌈)
const depth = (g) => {
  const low = Number(g.allTimeLow) || 0,
    cur = Number(g.currentPrice) || 0;
  return low > 0 ? (cur - low) / low : 9;
};

// "내 찜" 화면. 찜한 appid들을 /api/game/:appid로 최신가까지 다시 불러와
// "지금 살 때"인 게임을 위로 올려 보여준다.
export default function WishlistView({ onCardClick }) {
  const wl = useWishlist();
  const ids = wl?.ids || [];
  const [games, setGames] = useState({}); // appid -> game | "error"
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const missing = ids.filter((id) => games[id] === undefined);
    if (!missing.length) return;
    let alive = true;
    setLoading(true);
    Promise.all(
      missing.map((id) =>
        getGame(id)
          .then((g) => [id, g || "error"])
          .catch(() => [id, "error"])
      )
    ).then((pairs) => {
      if (!alive) return;
      setGames((cur) => {
        const next = { ...cur };
        for (const [id, g] of pairs) next[id] = g;
        return next;
      });
      setLoading(false);
    });
    return () => {
      alive = false;
    };
  }, [ids, games]);

  if (!ids.length)
    return (
      <section className="block">
        <h2>내 찜 목록</h2>
        <div className="empty">
          아직 찜한 게임이 없어요. 카드 왼쪽 위 ★를 눌러 찜해두면, 지금 살 때인지 여기서 한눈에 볼 수 있어요.
        </div>
      </section>
    );

  const loaded = ids.map((id) => games[id]).filter((g) => g && g !== "error");
  const buyNow = loaded.filter(isBuyNow).length;
  const ordered = loaded.slice().sort((a, b) => depth(a) - depth(b));

  return (
    <section className="block">
      <h2>
        내 찜 목록 <span className="cnt">{ids.length}</span>
      </h2>
      {loaded.length > 0 && (
        <div className="wishnote">
          찜한 <b>{loaded.length}</b>개 중{" "}
          <b style={{ color: "#C8912B" }}>{buyNow}</b>개가 지금 살 때예요
        </div>
      )}
      {loading && <ListSkeleton />}
      {ordered.length > 0 && (
        <div className="list">
          {ordered.map((g) => (
            <GameCard key={g.appid} game={g} onClick={onCardClick} />
          ))}
        </div>
      )}
    </section>
  );
}
