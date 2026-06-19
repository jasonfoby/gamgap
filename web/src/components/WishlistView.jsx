import { useEffect, useState } from "react";
import GameCard from "./GameCard";
import { ListSkeleton } from "./Skeleton";
import { getGame } from "../api";
import { isBuyNow } from "../lib/stats";
import { useWishlist } from "../lib/wishlist";
import { useT, tNodes } from "../lib/i18n";
import { regionForLang } from "../lib/region";

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
  const { t, lang } = useT();
  const { cc } = regionForLang(lang); // 현재 언어의 지역코드(가격 통화)
  const ids = wl?.ids || [];
  const [games, setGames] = useState({}); // appid -> game | "error"
  const [loading, setLoading] = useState(false);

  // 언어(통화)가 바뀌면 캐시한 가격이 옛 통화이므로 비워 새 통화로 다시 불러오게 한다.
  useEffect(() => {
    setGames({});
  }, [cc]);

  useEffect(() => {
    const missing = ids.filter((id) => games[id] === undefined);
    if (!missing.length) return;
    let alive = true;
    setLoading(true);
    Promise.all(
      missing.map((id) =>
        getGame(id, cc)
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
        <h2>{t("wish.title")}</h2>
        <div className="empty">{t("wish.empty")}</div>
      </section>
    );

  const loaded = ids.map((id) => games[id]).filter((g) => g && g !== "error");
  const buyNow = loaded.filter(isBuyNow).length;
  const ordered = loaded.slice().sort((a, b) => depth(a) - depth(b));

  return (
    <section className="block">
      <h2>
        {t("wish.title")} <span className="cnt">{ids.length}</span>
      </h2>
      {loaded.length > 0 && (
        <div className="wishnote">
          {tNodes(t("wish.note"), {
            a: <b>{loaded.length}</b>,
            b: <b style={{ color: "#C8912B" }}>{buyNow}</b>,
          })}
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
