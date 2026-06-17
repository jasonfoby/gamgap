import { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import GameCard from "./components/GameCard";
import GameModal from "./components/GameModal";
import WishlistView from "./components/WishlistView";
import { getLowestToday, getDeals, searchGames, getGame } from "./api";
import { applyDealOpts, defaultDealOpts, availableGenres } from "./lib/dealSort";
import { useWishlistState, WishlistProvider } from "./lib/wishlist";

// 입력이 멈춘 뒤 delay(ms)가 지나야 값을 반영하는 디바운스 (원본 250ms 검색 지연).
function useDebounce(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

const VALID_TABS = ["lowest", "deals", "wishlist"];
function initialTab() {
  const t = new URLSearchParams(window.location.search).get("tab");
  return VALID_TABS.includes(t) ? t : "lowest";
}

// 게임 목록 한 섹션. state.status: "loading" | "ok" | "error".
function Section({ title, state, emptyMsg, errMsg, onCardClick }) {
  const count = state.status === "ok" ? state.rows.length : "·";
  return (
    <section className="block">
      <h2>
        {title} <span className="cnt">{count}</span>
      </h2>
      {state.status === "loading" && <div className="loading">불러오는 중…</div>}
      {state.status === "error" && <div className="empty">{errMsg}</div>}
      {state.status === "ok" &&
        (state.rows.length ? (
          <div className="list">
            {state.rows.map((g) => (
              <GameCard key={g.appid} game={g} onClick={onCardClick} />
            ))}
          </div>
        ) : (
          <div className="empty">{emptyMsg}</div>
        ))}
    </section>
  );
}

// 검색 결과 섹션 (에러 시 .errbox 스타일을 쓰는 점만 홈 섹션과 다름).
function SearchSection({ q, state, onCardClick }) {
  const count = state.status === "ok" ? state.rows.length : "·";
  return (
    <section className="block">
      <h2>
        ‘{q}’ 검색 결과 <span className="cnt">{count}</span>
      </h2>
      {state.status === "loading" && <div className="loading">불러오는 중…</div>}
      {state.status === "error" && (
        <div className="errbox">가격을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</div>
      )}
      {state.status === "ok" &&
        (state.rows.length ? (
          <div className="list">
            {state.rows.map((g) => (
              <GameCard key={g.appid} game={g} onClick={onCardClick} />
            ))}
          </div>
        ) : (
          <div className="empty">찾는 게임이 없어요. 다른 이름으로 검색해 보세요.</div>
        ))}
    </section>
  );
}

// "할인 중" 섹션: 거른 목록만 렌더(정렬·필터 바는 사이드바로 이동).
function DealsView({ state, opts, onCardClick }) {
  const filtered = state.status === "ok" && opts ? applyDealOpts(state.rows, opts) : [];
  return (
    <section className="block">
      <h2>
        지금 할인 중인 게임{" "}
        <span className="cnt">{state.status === "ok" ? filtered.length : "·"}</span>
      </h2>
      {state.status === "loading" && <div className="loading">불러오는 중…</div>}
      {state.status === "error" && <div className="empty">할인 목록을 불러오지 못했어요.</div>}
      {state.status === "ok" &&
        (filtered.length ? (
          <div className="list">
            {filtered.map((g) => (
              <GameCard key={g.appid} game={g} onClick={onCardClick} />
            ))}
          </div>
        ) : (
          <div className="empty">조건에 맞는 게임이 없어요. 필터를 풀어보세요.</div>
        ))}
    </section>
  );
}

export default function App() {
  const wl = useWishlistState();
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query.trim(), 250);
  const [tab, setTab] = useState(initialTab);
  const [selected, setSelected] = useState(null); // 모달에 띄울 게임 객체

  const [lowest, setLowest] = useState({ status: "loading", rows: [] });
  const [deals, setDeals] = useState({ status: "loading", rows: [] });
  const [search, setSearch] = useState({ status: "loading", rows: [] });
  const [dealOpts, setDealOpts] = useState(null);

  // 홈 데이터: 진입 시 한 번. 배지(오늘 역대최저 수)는 검색 중에도 보여야 하므로 항상 로드.
  useEffect(() => {
    let alive = true;
    getLowestToday()
      .then((rows) => alive && setLowest({ status: "ok", rows }))
      .catch(() => alive && setLowest({ status: "error", rows: [] }));
    getDeals(120)
      .then((rows) => alive && setDeals({ status: "ok", rows }))
      .catch(() => alive && setDeals({ status: "error", rows: [] }));
    return () => {
      alive = false;
    };
  }, []);

  // 할인 목록을 받으면 정렬·필터 기본값(최대가격 한도 포함)을 한 번 세팅.
  useEffect(() => {
    if (deals.status === "ok" && !dealOpts) {
      const prices = deals.rows.map((g) => Number(g.currentPrice) || 0);
      const maxBound = prices.length ? Math.max(...prices) : 100000;
      setDealOpts(defaultDealOpts(maxBound));
    }
  }, [deals, dealOpts]);

  // 검색어(디바운스)가 있으면 검색.
  useEffect(() => {
    if (!debounced) return;
    let alive = true;
    setSearch({ status: "loading", rows: [] });
    searchGames(debounced)
      .then((rows) => alive && setSearch({ status: "ok", rows }))
      .catch(() => alive && setSearch({ status: "error", rows: [] }));
    return () => {
      alive = false;
    };
  }, [debounced]);

  // 진입 시 ?game=appid 가 있으면 그 게임 모달을 바로 연다(공유 딥링크).
  useEffect(() => {
    const gid = new URLSearchParams(window.location.search).get("game");
    if (!gid) return;
    let alive = true;
    getGame(gid)
      .then((g) => alive && g && setSelected(g))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // 선택/탭 상태를 주소창에 반영(공유·새로고침 유지). 뒤로가기 오염 방지로 replace.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (selected) params.set("game", selected.appid);
    else params.delete("game");
    if (tab && tab !== "lowest") params.set("tab", tab);
    else params.delete("tab");
    const qs = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : ""));
  }, [selected, tab]);

  const searching = !!debounced;
  const lowCount =
    lowest.status === "loading" ? "·" : lowest.status === "error" ? "0" : lowest.rows.length;
  // 할인 목록에 등장하는 장르(빈도순). 데이터에 장르가 없으면 빈 배열 → 사이드바 장르 필터 자동 숨김.
  const genreOptions = deals.status === "ok" ? availableGenres(deals.rows) : [];

  // 탭을 누르면 검색 모드에서 빠져나오도록 검색어를 비운다.
  const onTabChange = (t) => {
    setTab(t);
    setQuery("");
  };

  // 인기 칩: 한글 검색어가 영문 저장명과 안 맞는 경우가 많아(예: 사이버펑크↔Cyberpunk 2077),
  // 칩을 누르면 검색 대신 해당 appid 게임 상세를 바로 연다.
  const openGame = (appid) => {
    getGame(appid)
      .then((g) => g && setSelected(g))
      .catch(() => {});
  };

  return (
    <WishlistProvider value={wl}>
      <Header lowCount={lowCount} query={query} onQueryChange={setQuery} />
      <Hero query={query} onQueryChange={setQuery} onPickGame={openGame} />

      <div className="shell">
        <Sidebar
          tab={tab}
          onTabChange={onTabChange}
          wishCount={wl.ids.length}
          searching={searching}
          dealOpts={dealOpts}
          onDealOptsChange={setDealOpts}
          genreOptions={genreOptions}
        />

        <main className="main">
          <div id="content">
            {searching ? (
              <SearchSection q={debounced} state={search} onCardClick={setSelected} />
            ) : tab === "lowest" ? (
              <Section
                title={
                  <>
                    <span style={{ color: "#C8912B" }}>★</span> 오늘 역대 최저가
                  </>
                }
                state={lowest}
                emptyMsg="오늘은 아직 역대 최저가 갱신이 없어요. 내일부터 기록이 쌓이면 채워져요."
                errMsg="불러오지 못했어요."
                onCardClick={setSelected}
              />
            ) : tab === "deals" ? (
              <DealsView state={deals} opts={dealOpts} onCardClick={setSelected} />
            ) : (
              <WishlistView onCardClick={setSelected} />
            )}
          </div>
        </main>
      </div>

      {selected && <GameModal game={selected} onClose={() => setSelected(null)} />}
    </WishlistProvider>
  );
}
