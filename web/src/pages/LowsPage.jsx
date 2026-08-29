import { useCallback, useEffect, useMemo, useState } from "react";
import PageShell from "../components/PageShell";
import GameCard from "../components/GameCard";
import { ListSkeleton } from "../components/Skeleton";
import { getLowestToday } from "../api";
import { setPageHead } from "../lib/head";
import { navigate } from "../lib/router";
import { useT } from "../lib/i18n";
import { regionForLang } from "../lib/region";
import { useWishlistState, WishlistProvider } from "../lib/wishlist";
import "./LowsPage.css";

// "이번 주 새 최저가" — 우리가 기록해온 가장 싼 값을 최근에 갈아치운 게임만 모아 보여주는 페이지.
// 홈의 '오늘의 최저가' 탭은 '지금 최저가에 머물러 있는' 게임 전부를 보여주지만,
// 이 페이지는 '최근 N일 안에 그 최저 기록이 새로 세워진' 게임만 걸러낸다(주간 소식 성격).
//
// 데이터는 워커의 최저가 목록을 그대로 쓰고(백엔드 변경 없음), 기록일(allTimeLowDate)로
// 클라이언트에서 거른다. 7일 안이 너무 적으면 14일로 자동으로 넓히고 그 사실을 화면에 밝힌다.
const DAYS_PRIMARY = 7;
const DAYS_FALLBACK = 14;
const MIN_SHOWN = 6; // 7일치가 이보다 적으면 14일로 넓힌다
const MAX_SHOWN = 60; // 실제로는 주당 20개 안팎이라 걸릴 일이 거의 없다(조용히 잘리는 것 방지용 여유)
const FETCH_PAGES = 6; // 100개씩 최대 6번(=600). 짧은 묶음이 오면 그 전에 멈춘다
const PAGE = 100;

// "YYYY-MM-DD" 형태의 UTC 기준 날짜. 수집기가 UTC 날짜로 기록일을 남기므로 맞춰 계산한다.
function cutoffDate(days) {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}

export default function LowsPage() {
  const { t, lang } = useT();
  const wl = useWishlistState();
  const cc = regionForLang(lang).cc;
  const [state, setState] = useState({ status: "loading", rows: [] });

  const load = useCallback(() => {
    let alive = true;
    setState({ status: "loading", rows: [] });
    (async () => {
      try {
        const rows = [];
        const seen = new Set();
        for (let i = 0; i < FETCH_PAGES; i++) {
          const page = await getLowestToday(cc, PAGE, i * PAGE);
          if (!Array.isArray(page) || page.length === 0) break;
          let added = 0;
          for (const g of page) {
            if (g && g.appid && !seen.has(g.appid)) {
              seen.add(g.appid);
              rows.push(g);
              added++;
            }
          }
          // 서버가 offset을 무시하고 같은 묶음을 다시 줬다면 여기서 멈춘다.
          if (added === 0 || page.length < PAGE) break;
        }
        if (alive) setState({ status: "ok", rows });
      } catch {
        if (alive) setState({ status: "error", rows: [] });
      }
    })();
    return () => {
      alive = false;
    };
  }, [cc]);

  useEffect(() => load(), [load]);

  useEffect(() => {
    setPageHead({
      title: t("lows.metaTitle"),
      description: t("lows.metaDesc"),
      path: "/new-lows",
    });
  }, [t]);

  // 기록일이 최근인 것만 고르고, 리뷰가 많은(=아는 사람이 많은) 순으로 세운다.
  const { picked, days } = useMemo(() => {
    const pick = (d) => {
      const cut = cutoffDate(d);
      return state.rows
        .filter((g) => g.allTimeLowDate && g.allTimeLowDate >= cut)
        .sort((a, b) => (Number(b.reviewTotal) || 0) - (Number(a.reviewTotal) || 0))
        .slice(0, MAX_SHOWN);
    };
    const week = pick(DAYS_PRIMARY);
    if (week.length >= MIN_SHOWN) return { picked: week, days: DAYS_PRIMARY };
    const two = pick(DAYS_FALLBACK);
    return two.length > week.length
      ? { picked: two, days: DAYS_FALLBACK }
      : { picked: week, days: DAYS_PRIMARY };
  }, [state.rows]);

  const onCardClick = (g) => navigate("/game/" + g.appid);

  return (
    <PageShell wide>
      <article className="lows">
        <h1 className="lows-title">{t("lows.title")}</h1>

        <p className="lows-p">{t("lows.intro1")}</p>
        <p className="lows-p">{t("lows.intro2")}</p>
        <p className="lows-p">{t("lows.intro3")}</p>

        <h2 className="lows-h2">
          {t("lows.listHeading", { days })}
          {state.status === "ok" && <span className="lows-cnt">{picked.length}</span>}
        </h2>

        {state.status === "loading" && <ListSkeleton count={8} />}

        {state.status === "error" && (
          <div className="lows-empty">
            {t("lows.error")}
            <button className="ghostbtn lows-retry" onClick={load}>
              {t("common.retry")}
            </button>
          </div>
        )}

        {state.status === "ok" &&
          (picked.length ? (
            <WishlistProvider value={wl}>
              <div className="list lows-list">
                {picked.map((g, i) => (
                  <GameCard key={g.appid} game={g} onClick={onCardClick} priority={i < 4} />
                ))}
              </div>
            </WishlistProvider>
          ) : (
            <div className="lows-empty">{t("lows.empty")}</div>
          ))}

        {state.status === "ok" && picked.length > 0 && (
          <p className="lows-updated">{t("lows.updated")}</p>
        )}

        <h2 className="lows-h2">{t("lows.readHeading")}</h2>
        <p className="lows-p">{t("lows.read1")}</p>
        <p className="lows-p">{t("lows.read2")}</p>

        <div className="lows-note">{t("lows.disclosure")}</div>
      </article>
    </PageShell>
  );
}
