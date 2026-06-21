import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Sidebar from "./components/Sidebar";
import GameCard from "./components/GameCard";
import WishlistView from "./components/WishlistView";
import Footer from "./components/Footer";
import AdSlot from "./components/AdSlot";
import { ListSkeleton, SkelCards } from "./components/Skeleton";
import { getLowestToday, getDeals, searchGames } from "./api";
import { applyDealOpts, defaultDealOpts, availableGenres, popularPicks } from "./lib/dealSort";
import { activeFilterChips, clearedOpts } from "./lib/filterUi";
import { useWishlistState, WishlistProvider } from "./lib/wishlist";
import { resetHead } from "./lib/head";
import { navigate } from "./lib/router";
import { track } from "./lib/analytics";
import { useT } from "./lib/i18n";
import { regionForLang } from "./lib/region";
import { expandQuery } from "./lib/searchAlias";

// 입력이 멈춘 뒤 delay(ms)가 지나야 값을 반영하는 디바운스 (원본 250ms 검색 지연).
function useDebounce(value, delay) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setV(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return v;
}

// 한 번에 받아오는 묶음 크기. 첫 화면은 이만큼만 받고, 스크롤 끝에 닿으면 다음 묶음을 이어 받는다.
const PAGE_SIZE = 60;

// 서버에서 한 페이지씩 받아 누적하는(무한 스크롤) 목록 상태 관리 훅.
// fetchPage(offset, limit) → Promise<rows>. fetchPage 가 바뀌면(예: 언어/지역 변경) 처음부터 다시 받는다.
// 이미 받은 게임(appid)은 거르고, 새로 들어온 게 하나도 없으면 거기서 멈춘다 — 서버가 옛 버전이라
// offset 을 무시하고 같은 묶음을 다시 줘도 중복이 쌓이거나 같은 요청을 무한히 반복하지 않게 한다.
function usePagedList(fetchPage) {
  const [rows, setRows] = useState([]);
  const [status, setStatus] = useState("loading"); // "loading" | "ok" | "error"
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const loadingRef = useRef(false); // 요청 진행 중이면 true(중복 호출 방지)
  const epochRef = useRef(0); // 재시작(reload)마다 증가 — 옛 요청 결과를 버리는 표식
  const offsetRef = useRef(0); // 서버가 지금까지 돌려준 누적 개수(=다음 offset)
  const seenRef = useRef(new Set()); // 이미 화면에 있는 appid (중복 방지)
  const hasMoreRef = useRef(true);

  // 받은 묶음에서 처음 보는 것만 골라낸다(중복 제거 + seen 갱신).
  const pickFresh = (r) => {
    const fresh = [];
    for (const g of r || []) {
      const id = g && g.appid;
      if (id == null || seenRef.current.has(id)) continue;
      seenRef.current.add(id);
      fresh.push(g);
    }
    return fresh;
  };

  const reload = useCallback(() => {
    const epoch = ++epochRef.current;
    loadingRef.current = true;
    hasMoreRef.current = true;
    offsetRef.current = 0;
    seenRef.current = new Set();
    setStatus("loading");
    setRows([]);
    setHasMore(true);
    setLoadingMore(false);
    fetchPage(0, PAGE_SIZE)
      .then((r) => {
        if (epoch !== epochRef.current) return; // 그 사이 다시 시작됨 → 버림
        loadingRef.current = false;
        offsetRef.current = (r || []).length;
        const fresh = pickFresh(r);
        const more = (r || []).length >= PAGE_SIZE;
        hasMoreRef.current = more;
        setRows(fresh);
        setStatus("ok");
        setHasMore(more);
      })
      .catch(() => {
        if (epoch !== epochRef.current) return;
        loadingRef.current = false;
        hasMoreRef.current = false;
        setStatus("error");
        setHasMore(false);
      });
  }, [fetchPage]);

  const loadMore = useCallback(() => {
    if (loadingRef.current || !hasMoreRef.current) return; // 진행 중이거나 더 없으면 무시
    const epoch = epochRef.current;
    loadingRef.current = true;
    setLoadingMore(true);
    fetchPage(offsetRef.current, PAGE_SIZE)
      .then((r) => {
        if (epoch !== epochRef.current) return;
        loadingRef.current = false;
        setLoadingMore(false);
        offsetRef.current += (r || []).length;
        const fresh = pickFresh(r);
        // 한 페이지를 꽉 채워 받았고(=뒤에 더 있을 수 있고) 새로 들어온 게 있을 때만 계속.
        const more = (r || []).length >= PAGE_SIZE && fresh.length > 0;
        hasMoreRef.current = more;
        if (fresh.length) setRows((cur) => cur.concat(fresh));
        setHasMore(more);
      })
      .catch(() => {
        if (epoch !== epochRef.current) return;
        loadingRef.current = false;
        setLoadingMore(false);
        hasMoreRef.current = false;
        setHasMore(false);
      });
  }, [fetchPage]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { rows, status, hasMore, loadingMore, reload, loadMore };
}

// 목록 맨 아래에 두는 '더 보기' 영역. 화면에 들어오면(스크롤 끝 근처) 자동으로 다음 묶음을 부른다.
// 불러오는 동안엔 카드 자리표시(스켈레톤) + 빙글 도는 표시로 '오고 있다'는 느낌을 준다.
// 자동 감지가 막힌 환경을 위해 버튼도 함께 둔다. 더 없으면 아무것도 안 그린다.
function LoadMore({ hasMore, loading, onLoadMore }) {
  const { t } = useT();
  const ref = useRef(null);
  useEffect(() => {
    if (!hasMore) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const ob = new IntersectionObserver(
      (entries) => {
        if (entries[0] && entries[0].isIntersecting) onLoadMore();
      },
      { rootMargin: "600px" } // 바닥에 닿기 600px 전에 미리 불러와 끊김 줄임
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, [hasMore, onLoadMore]);
  if (!hasMore) return null;
  return (
    <div ref={ref} className="loadmore">
      {loading ? (
        <span className="loadmore-status" role="status" aria-busy="true">
          <span className="spinner" aria-hidden="true" />
          {t("common.loading")}
        </span>
      ) : (
        <button className="loadmore-btn" onClick={onLoadMore}>
          {t("common.more")}
        </button>
      )}
    </div>
  );
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
// hasMore/loadingMore/onLoadMore 가 오면 목록 끝에 '더 보기'(무한 스크롤)를 단다.
function Section({ title, state, emptyMsg, errMsg, onCardClick, onRetry, hasMore, loadingMore, onLoadMore }) {
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
          <>
            <div className="list">
              {state.rows.map((g) => (
                <GameCard key={g.appid} game={g} onClick={onCardClick} />
              ))}
              {/* 다음 묶음 자리표시 — 같은 격자 안에 넣어 진짜 카드와 간격·정렬을 맞춘다. */}
              {loadingMore && <SkelCards count={4} />}
            </div>
            {onLoadMore && (
              <LoadMore hasMore={hasMore} loading={loadingMore} onLoadMore={onLoadMore} />
            )}
          </>
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
function DealsView({ state, opts, onCardClick, onRetry, onOptsChange, currency, hasMore, loadingMore, onLoadMore }) {
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
          <>
            <div className="list">
              {filtered.map((g, i) => (
                <Fragment key={g.appid}>
                  <GameCard game={g} onClick={onCardClick} />
                  {/* 첫 6장 뒤에 인라인 광고 한 자리(슬롯 ID 없으면 안 보임). */}
                  {i === 5 && <AdSlot slot="dealsInline" />}
                </Fragment>
              ))}
              {/* 다음 묶음 자리표시 — 같은 격자 안에 넣어 진짜 카드와 간격·정렬을 맞춘다. */}
              {loadingMore && <SkelCards count={4} />}
            </div>
            {onLoadMore && (
              <LoadMore hasMore={hasMore} loading={loadingMore} onLoadMore={onLoadMore} />
            )}
          </>
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

  const [search, setSearch] = useState({ status: "loading", rows: [] });
  const [dealOpts, setDealOpts] = useState(null);
  // 히어로 인기 칩·장르 목록·통화: 첫 묶음을 받은 순간 한 번 고정한다(스크롤로 더 받아도 안 흔들리게).
  const [dealsMeta, setDealsMeta] = useState({ popular: [], genres: [], currency: "KRW" });

  // 홈 두 탭은 한 페이지씩 받아 누적(무한 스크롤). 언어/지역(cc)이 바뀌면 fetch 함수가 바뀌어 처음부터 다시 받는다.
  const fetchLowest = useCallback((offset, limit) => getLowestToday(cc, limit, offset), [cc]);
  const fetchDeals = useCallback((offset, limit) => getDeals(limit, cc, offset), [cc]);
  const lowest = usePagedList(fetchLowest);
  const deals = usePagedList(fetchDeals);

  // 디바운스된 검색어로 검색. term 이 없으면 아무 것도 안 함.
  const loadSearch = useCallback(
    (term) => {
      if (!term) return;
      setSearch({ status: "loading", rows: [] });
      let alive = true;
      // 줄임말·현지어("위처"·"갓오워")는 영어 핵심어("Witcher"·"God of War")로 바꿔 검색.
      // 화면에 보이는 검색어(헤더)는 사용자가 친 그대로 두고, API 호출만 보정한다.
      searchGames(expandQuery(term), cc)
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

  // 할인 첫 묶음을 받으면 ① 정렬·필터 기본값(최대가격 한도 포함)과 ② 히어로 칩·장르·통화를 한 번 고정.
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
      setDealsMeta({
        popular: popularPicks(deals.rows, 6),
        genres: availableGenres(deals.rows),
        currency: (deals.rows[0] && deals.rows[0].currency) || "KRW",
      });
    }
  }, [deals.status, deals.rows, dealOpts, pendingGenre]);

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
  // 첫 묶음에서 고정해 둔 값들(스크롤로 더 받아도 히어로 칩·장르·통화가 흔들리지 않게).
  const genreOptions = dealsMeta.genres;
  const popular = dealsMeta.popular;
  const dealCurrency = dealsMeta.currency;

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
                onRetry={lowest.reload}
                hasMore={lowest.hasMore}
                loadingMore={lowest.loadingMore}
                onLoadMore={lowest.loadMore}
              />
            ) : tab === "deals" ? (
              <DealsView
                state={deals}
                opts={dealOpts}
                onCardClick={openCard}
                onRetry={deals.reload}
                onOptsChange={setDealOpts}
                currency={dealCurrency}
                hasMore={deals.hasMore}
                loadingMore={deals.loadingMore}
                onLoadMore={deals.loadMore}
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
