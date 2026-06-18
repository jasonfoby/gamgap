import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import GameCard from "./components/GameCard";
import WishlistView from "./components/WishlistView";
import Footer from "./components/Footer";
import { ListSkeleton } from "./components/Skeleton";
import { getLowestToday, getDeals, searchGames } from "./api";
import { applyDealOpts, defaultDealOpts, availableGenres } from "./lib/dealSort";
import { activeFilterChips, clearedOpts } from "./lib/filterUi";
import { useWishlistState, WishlistProvider } from "./lib/wishlist";
import { resetHead } from "./lib/head";
import { navigate } from "./lib/router";
import { track } from "./lib/analytics";

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
function Section({ title, state, emptyMsg, errMsg, onCardClick, onRetry }) {
  const count = state.status === "ok" ? state.rows.length : "·";
  return (
    <section className="block">
      <h2>
        {title} <span className="cnt">{count}</span>
      </h2>
      {state.status === "loading" && <ListSkeleton />}
      {state.status === "error" && (
        <div className="empty">
          {errMsg}
          <button className="ghostbtn" style={{ marginTop: 10, display: "inline-flex" }} onClick={onRetry}>
            다시 시도
          </button>
        </div>
      )}
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
function SearchSection({ q, state, onCardClick, onRetry }) {
  const count = state.status === "ok" ? state.rows.length : "·";
  return (
    <section className="block">
      <h2>
        ‘{q}’ 검색 결과 <span className="cnt">{count}</span>
      </h2>
      {state.status === "loading" && <ListSkeleton />}
      {state.status === "error" && (
        <div className="errbox">
          가격을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.
          <button className="ghostbtn" style={{ marginTop: 10, display: "inline-flex" }} onClick={onRetry}>
            다시 시도
          </button>
        </div>
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
function DealsView({ state, opts, onCardClick, onRetry, onOptsChange }) {
  const filtered = state.status === "ok" && opts ? applyDealOpts(state.rows, opts) : [];
  const chips = opts ? activeFilterChips(opts) : [];
  return (
    <section className="block">
      <h2>
        지금 할인 중인 게임{" "}
        <span className="cnt">{state.status === "ok" ? filtered.length : "·"}</span>
      </h2>
      {chips.length > 0 && (
        <div className="active-filters">
          {chips.map((c) => (
            <button
              key={c.id}
              className="afchip"
              onClick={() => onOptsChange({ ...opts, ...c.patch })}
              aria-label={`${c.label} 필터 제거`}
            >
              {c.label} <span aria-hidden="true">✕</span>
            </button>
          ))}
          <button className="afclear" onClick={() => onOptsChange(clearedOpts(opts))}>
            전체 해제
          </button>
        </div>
      )}
      {state.status === "loading" && <ListSkeleton count={12} />}
      {state.status === "error" && (
        <div className="empty">
          할인 목록을 불러오지 못했어요.
          <button className="ghostbtn" style={{ marginTop: 10, display: "inline-flex" }} onClick={onRetry}>
            다시 시도
          </button>
        </div>
      )}
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

  const [lowest, setLowest] = useState({ status: "loading", rows: [] });
  const [deals, setDeals] = useState({ status: "loading", rows: [] });
  const [search, setSearch] = useState({ status: "loading", rows: [] });
  const [dealOpts, setDealOpts] = useState(null);

  // 홈 데이터 로더(재시도 가능하도록 useCallback 으로 분리).
  // "오늘 역대최저"와 "할인 중"을 각각 로드. 반환하는 함수는 cleanup(중도 폐기)용.
  const loadLowest = useCallback(() => {
    setLowest({ status: "loading", rows: [] });
    let alive = true;
    getLowestToday()
      .then((rows) => alive && setLowest({ status: "ok", rows }))
      .catch(() => alive && setLowest({ status: "error", rows: [] }));
    return () => {
      alive = false;
    };
  }, []);

  const loadDeals = useCallback(() => {
    setDeals({ status: "loading", rows: [] });
    let alive = true;
    getDeals(120)
      .then((rows) => alive && setDeals({ status: "ok", rows }))
      .catch(() => alive && setDeals({ status: "error", rows: [] }));
    return () => {
      alive = false;
    };
  }, []);

  // 디바운스된 검색어로 검색. term 이 없으면 아무 것도 안 함.
  const loadSearch = useCallback((term) => {
    if (!term) return;
    setSearch({ status: "loading", rows: [] });
    let alive = true;
    searchGames(term)
      .then((rows) => {
        if (!alive) return;
        setSearch({ status: "ok", rows });
        if (rows.length === 0) track("search_zero", { q: term }); // 검색 0건 추적
      })
      .catch(() => alive && setSearch({ status: "error", rows: [] }));
    return () => {
      alive = false;
    };
  }, []);

  // 홈 데이터: 진입 시 한 번. 배지(오늘 역대최저 수)는 검색 중에도 보여야 하므로 항상 로드.
  useEffect(() => {
    const offLow = loadLowest();
    const offDeals = loadDeals();
    return () => {
      offLow && offLow();
      offDeals && offDeals();
    };
  }, [loadLowest, loadDeals]);

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
    const off = loadSearch(debounced);
    return () => off && off();
  }, [debounced, loadSearch]);

  // 홈은 문서 제목·메타·canonical 을 기본(홈)값으로 복원한다.
  // 게임 페이지·가이드에서 클라이언트 이동으로 돌아왔을 때 이전 메타가 남지 않도록 한 번 리셋.
  useEffect(() => {
    resetHead();
  }, []);

  // 탭 상태를 주소창에 반영(공유·새로고침 유지). 뒤로가기 오염 방지로 replace.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (tab && tab !== "lowest") params.set("tab", tab);
    else params.delete("tab");
    const qs = params.toString();
    window.history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : ""));
  }, [tab]);

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

  // 카드 클릭 → 개별 게임 페이지(/game/:appid)로 이동(색인 가능한 독립 URL).
  const openCard = (game) => navigate("/game/" + game.appid);
  // 인기 칩: 한글 검색어가 영문 저장명과 안 맞는 경우가 많아(예: 사이버펑크↔Cyberpunk 2077),
  // 칩을 누르면 검색 대신 해당 appid 게임 페이지로 바로 이동한다.
  const openGameById = (appid) => navigate("/game/" + appid);

  return (
    <WishlistProvider value={wl}>
      <Header lowCount={lowCount} query={query} onQueryChange={setQuery} />
      <Hero query={query} onQueryChange={setQuery} onPickGame={openGameById} />

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
              <SearchSection
                q={debounced}
                state={search}
                onCardClick={openCard}
                onRetry={() => loadSearch(debounced)}
              />
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
                onCardClick={openCard}
                onRetry={loadLowest}
              />
            ) : tab === "deals" ? (
              <DealsView
                state={deals}
                opts={dealOpts}
                onCardClick={openCard}
                onRetry={loadDeals}
                onOptsChange={setDealOpts}
              />
            ) : (
              <WishlistView onCardClick={openCard} />
            )}
          </div>
        </main>
      </div>

      <Footer />
    </WishlistProvider>
  );
}
