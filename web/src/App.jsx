import { Fragment, useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import GameCard from "./components/GameCard";
import WishlistView from "./components/WishlistView";
import Footer from "./components/Footer";
import AdSlot from "./components/AdSlot";
import { ListSkeleton } from "./components/Skeleton";
import { getLowestToday, getDeals, searchGames } from "./api";
import { applyDealOpts, defaultDealOpts, availableGenres, popularPicks } from "./lib/dealSort";
import { activeFilterChips, clearedOpts } from "./lib/filterUi";
import { useWishlistState, WishlistProvider } from "./lib/wishlist";
import { resetHead } from "./lib/head";
import { navigate } from "./lib/router";
import { track } from "./lib/analytics";
import { useT } from "./lib/i18n";
import { regionForLang } from "./lib/region";

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
  const params = new URLSearchParams(window.location.search);
  // genre 링크(게임 페이지의 장르 칩)로 들어오면 자동으로 "할인 중" 탭을 연다.
  if (params.get("genre")) return "deals";
  const t = params.get("tab");
  return VALID_TABS.includes(t) ? t : "lowest";
}
// 게임 페이지 장르 칩에서 넘어온 장르 문자열(데이터 원본 그대로). 없으면 "".
function initialGenre() {
  return new URLSearchParams(window.location.search).get("genre") || "";
}
// 개발사 칩 등에서 넘어온 검색어(?q=). 없으면 "".
function initialQuery() {
  return new URLSearchParams(window.location.search).get("q") || "";
}

// 게임 목록 한 섹션. state.status: "loading" | "ok" | "error".
function Section({ title, state, emptyMsg, errMsg, onCardClick, onRetry }) {
  const { t } = useT();
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
            {t("common.retry")}
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
  const { t } = useT();
  const count = state.status === "ok" ? state.rows.length : "·";
  return (
    <section className="block">
      <h2>
        {t("search.resultsTitle", { q })} <span className="cnt">{count}</span>
      </h2>
      {state.status === "loading" && <ListSkeleton />}
      {state.status === "error" && (
        <div className="errbox">
          {t("search.err")}
          <button className="ghostbtn" style={{ marginTop: 10, display: "inline-flex" }} onClick={onRetry}>
            {t("common.retry")}
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
          <div className="empty">{t("search.empty")}</div>
        ))}
    </section>
  );
}

// "할인 중" 섹션: 거른 목록만 렌더(정렬·필터 바는 사이드바로 이동).
function DealsView({ state, opts, onCardClick, onRetry, onOptsChange, currency }) {
  const { t } = useT();
  const filtered = state.status === "ok" && opts ? applyDealOpts(state.rows, opts) : [];
  const chips = opts ? activeFilterChips(opts, currency) : [];
  return (
    <section className="block">
      <h2>
        {t("deals.title")} <span className="cnt">{state.status === "ok" ? filtered.length : "·"}</span>
      </h2>
      {chips.length > 0 && (
        <div className="active-filters">
          {chips.map((c) => {
            const text = c.labelKey ? t(c.labelKey, c.labelVars) : c.label;
            return (
              <button
                key={c.id}
                className="afchip"
                onClick={() => onOptsChange({ ...opts, ...c.patch })}
                aria-label={t("chip.removeAria", { label: text })}
              >
                {text} <span aria-hidden="true">✕</span>
              </button>
            );
          })}
          <button className="afclear" onClick={() => onOptsChange(clearedOpts(opts))}>
            {t("deals.clearAll")}
          </button>
        </div>
      )}
      {state.status === "loading" && <ListSkeleton count={12} />}
      {state.status === "error" && (
        <div className="empty">
          {t("deals.err")}
          <button className="ghostbtn" style={{ marginTop: 10, display: "inline-flex" }} onClick={onRetry}>
            {t("common.retry")}
          </button>
        </div>
      )}
      {state.status === "ok" &&
        (filtered.length ? (
          <div className="list">
            {filtered.map((g, i) => (
              <Fragment key={g.appid}>
                <GameCard game={g} onClick={onCardClick} />
                {/* 첫 6장 뒤에 인라인 광고 한 자리(슬롯 ID 없으면 안 보임). */}
                {i === 5 && <AdSlot slot="dealsInline" />}
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="empty">{t("deals.empty")}</div>
        ))}
    </section>
  );
}

export default function App() {
  const wl = useWishlistState();
  const { t, lang } = useT();
  const { cc } = regionForLang(lang); // 현재 언어의 스팀 지역코드(원화면 'kr')
  const [query, setQuery] = useState(initialQuery);
  const debounced = useDebounce(query.trim(), 250);
  const [tab, setTab] = useState(initialTab);
  // 진입 URL에 genre가 있으면 첫 dealOpts에 미리 적용(한 번만 소비).
  const [pendingGenre, setPendingGenre] = useState(initialGenre);

  const [lowest, setLowest] = useState({ status: "loading", rows: [] });
  const [deals, setDeals] = useState({ status: "loading", rows: [] });
  const [search, setSearch] = useState({ status: "loading", rows: [] });
  const [dealOpts, setDealOpts] = useState(null);

  // 홈 데이터 로더(재시도 가능하도록 useCallback 으로 분리).
  const loadLowest = useCallback(() => {
    setLowest({ status: "loading", rows: [] });
    let alive = true;
    getLowestToday(cc)
      .then((rows) => alive && setLowest({ status: "ok", rows }))
      .catch(() => alive && setLowest({ status: "error", rows: [] }));
    return () => {
      alive = false;
    };
  }, [cc]);

  const loadDeals = useCallback(() => {
    setDeals({ status: "loading", rows: [] });
    let alive = true;
    getDeals(120, cc)
      .then((rows) => alive && setDeals({ status: "ok", rows }))
      .catch(() => alive && setDeals({ status: "error", rows: [] }));
    return () => {
      alive = false;
    };
  }, [cc]);

  // 디바운스된 검색어로 검색. term 이 없으면 아무 것도 안 함.
  const loadSearch = useCallback(
    (term) => {
      if (!term) return;
      setSearch({ status: "loading", rows: [] });
      let alive = true;
      searchGames(term, cc)
        .then((rows) => {
          if (!alive) return;
          setSearch({ status: "ok", rows });
          if (rows.length === 0) track("search_zero", { q: term }); // 검색 0건 추적
        })
        .catch(() => alive && setSearch({ status: "error", rows: [] }));
      return () => {
        alive = false;
      };
    },
    [cc]
  );

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
      const base = defaultDealOpts(maxBound);
      // 게임 페이지 장르 칩에서 넘어왔다면 그 장르를 미리 선택해 둔다(한 번만).
      if (pendingGenre) {
        base.genres = [pendingGenre];
        setPendingGenre("");
      }
      setDealOpts(base);
    }
  }, [deals, dealOpts, pendingGenre]);

  // 언어(통화)가 바뀌면 가격 단위가 달라지므로(원→달러 등) 정렬·필터 한도를 다시 잡게 초기화.
  useEffect(() => {
    setDealOpts(null);
  }, [cc]);

  // 검색어(디바운스)가 있으면 검색.
  useEffect(() => {
    if (!debounced) return;
    const off = loadSearch(debounced);
    return () => off && off();
  }, [debounced, loadSearch]);

  // 홈은 문서 제목·메타·canonical 을 기본(홈)값으로 복원한다.
  // lang을 의존성에 넣어 언어를 바꾸면 탭 제목·메타도 그 언어로 다시 설정되게 한다
  // (안 그러면 다른 언어로 보다가 전환해도 제목이 옛 언어에 멈춤).
  useEffect(() => {
    resetHead();
  }, [lang]);

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
  const genreOptions = deals.status === "ok" ? availableGenres(deals.rows) : [];
  // 히어로 인기 칩: 할인 목록 중 리뷰 많은 순 상위 6. 리뷰 데이터 없으면 [] → Hero가 하드코딩 폴백.
  const popular = deals.status === "ok" ? popularPicks(deals.rows, 6) : [];
  // 할인 목록이 어떤 통화로 왔는지(워커가 게임마다 currency를 붙임. 없으면 원화). 필터 라벨 표기에 사용.
  const dealCurrency = (deals.status === "ok" && deals.rows[0] && deals.rows[0].currency) || "KRW";

  const onTabChange = (tb) => {
    setTab(tb);
    setQuery("");
  };

  // 카드 클릭 → 개별 게임 페이지(/game/:appid)로 이동(색인 가능한 독립 URL).
  const openCard = (game) => navigate("/game/" + game.appid);
  const openGameById = (appid) => navigate("/game/" + appid);

  return (
    <WishlistProvider value={wl}>
      <Header lowCount={lowCount} query={query} onQueryChange={setQuery} />
      <Hero
        query={query}
        onQueryChange={setQuery}
        onPickGame={openGameById}
        popular={popular}
        popularLoading={deals.status === "loading"}
      />

      {/* 히어로(칩) 아래 · 본문 위 가로 띠 배너. 슬롯 ID 없거나 광고 없으면 :empty 로 자리 접힘. */}
      <div className="home-ad">
        <AdSlot slot="homeTop" format="horizontal" />
      </div>

      <div className="shell">
        <Sidebar
          tab={tab}
          onTabChange={onTabChange}
          wishCount={wl.ids.length}
          searching={searching}
          dealOpts={dealOpts}
          onDealOptsChange={setDealOpts}
          genreOptions={genreOptions}
          currency={dealCurrency}
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
                    <span style={{ color: "#C8912B" }}>★</span> {t("home.lowestTitle")}
                  </>
                }
                state={lowest}
                emptyMsg={t("home.lowestEmpty")}
                errMsg={t("home.lowestErr")}
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
                currency={dealCurrency}
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
