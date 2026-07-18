import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import Cover from "../components/Cover";
import Stamp from "../components/Stamp";
import StarButton from "../components/StarButton";
import PriceChart from "../components/PriceChart";
import GameCard from "../components/GameCard";
import AdSlot from "../components/AdSlot";
import { Link, navigate } from "../lib/router";
import { verdict } from "../lib/verdict";
import { money, ym } from "../lib/format";
import { priceStats, lowPoints, chartSeries } from "../lib/stats";
import { setGameHead, resetHead } from "../lib/head";
import { getGame, getDeals } from "../api";
import { track } from "../lib/analytics";
import { useT, tNodes } from "../lib/i18n";
import { regionForLang } from "../lib/region";
import { gameGenres } from "../lib/dealSort";
import { genreKey } from "../lib/genres";
import { reviewKey } from "../lib/reviews";
import { SUPPORTED } from "../i18n";
import "./GamePage.css";

// 개별 게임 상세 "페이지"(/game/:appid). 모달을 대체하는 색인 가능한 독립 URL.
export default function GamePage({ appid }) {
  const { t, lang } = useT();
  const { cc } = regionForLang(lang); // 현재 언어의 지역코드(가격 통화)
  const [state, setState] = useState({ status: "loading", game: null });
  const [nonce, setNonce] = useState(0); // 재시도 트리거
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    setState({ status: "loading", game: null });
    getGame(appid, cc)
      .then((g) => {
        if (!alive) return;
        if (g && g.appid) setState({ status: "ok", game: g });
        else setState({ status: "notfound", game: null });
      })
      .catch(() => alive && setState({ status: "error", game: null }));
    return () => {
      alive = false;
    };
  }, [appid, nonce, cc]);

  // 성공 시 문서 제목·메타·canonical·JSON-LD 갱신. 페이지 이탈 시 홈 기본값으로 복원.
  useEffect(() => {
    if (state.status === "ok" && state.game) {
      setGameHead(state.game);
      track("game_view", { appid: state.game.appid });
    }
    return () => resetHead();
  }, [state.status, state.game]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + "/game/" + appid);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 클립보드 거부 시 무시 */
    }
  };

  return (
    <PageShell>
      <Link to="/" className="gp-back">
        {t("gp.back")}
      </Link>

      {state.status === "loading" && <div className="gp-card gp-msg">{t("gp.loading")}</div>}

      {state.status === "error" && (
        <div className="gp-card gp-msg">
          {t("gp.error")}
          <button
            className="ghostbtn"
            style={{ marginTop: 12, display: "inline-flex" }}
            onClick={() => setNonce((n) => n + 1)}
          >
            {t("common.retry")}
          </button>
        </div>
      )}

      {state.status === "notfound" && <div className="gp-card gp-msg">{t("gp.notFound")}</div>}

      {state.status === "ok" && state.game && (
        <GameDetail g={state.game} copied={copied} onCopy={copyLink} t={t} cc={cc} />
      )}
    </PageShell>
  );
}

// 같은 장르의 "지금 할인 중" 게임을 모아 내부 링크 레일을 만든다(체류·페이지뷰↑).
// 충분히(3개 이상) 못 모으면 그냥 상위 할인작으로 채워서라도 내부 링크를 남긴다.
function useRelated(g, cc) {
  const [related, setRelated] = useState([]);
  useEffect(() => {
    let alive = true;
    setRelated([]);
    getDeals(60, cc)
      .then((rows) => {
        if (!alive || !Array.isArray(rows)) return;
        const myGenres = new Set(gameGenres(g));
        const others = rows.filter((x) => x.appid !== g.appid);
        let pick = others.filter((x) => gameGenres(x).some((t) => myGenres.has(t)));
        if (pick.length < 3) {
          // 같은 장르가 부족하면 상위 할인작으로 보충(중복 제외).
          const seen = new Set(pick.map((x) => x.appid));
          for (const x of others) {
            if (pick.length >= 8) break;
            if (!seen.has(x.appid)) {
              pick.push(x);
              seen.add(x.appid);
            }
          }
        }
        setRelated(pick.slice(0, 8));
      })
      .catch(() => {
        /* 실패하면 레일을 그냥 숨긴다 */
      });
    return () => {
      alive = false;
    };
  }, [g.appid, cc]);
  return related;
}

// 가격 상세 본문(영수증 카드).
function GameDetail({ g, copied, onCopy, t, cc }) {
  const related = useRelated(g, cc);
  const v = verdict(g);
  const stats = priceStats(g.history);
  const lows = lowPoints(g.history, 5);
  // 차트용 시리즈: 실제 이력이 부족하면(해외 지역 등) 정가→현재가로 합성해 모든 언어에서 그래프가 보이게.
  const chartHist = chartSeries(g);
  const hasChart = chartHist.length >= 2;
  const onSale = Number(g.discountPercent) > 0;
  const hasLow = Number(g.allTimeLow) > 0;

  const vLabel = t("verdict." + v.tier + ".label");
  const vSub = t("verdict." + v.tier + ".sub");
  const vTip = t("verdict." + v.tier + ".tip");

  // 검색에 읽히는 고유 본문 문단(상황별 템플릿에 값 채움).
  const dateStr = g.allTimeLowDate ? t("gp.proseDate", { d: ym(g.allTimeLowDate) }) : "";
  const proseKey = onSale
    ? hasLow
      ? "gp.proseSaleAtl"
      : "gp.proseSaleNoAtl"
    : hasLow
    ? "gp.proseNoSaleAtl"
    : "gp.proseNoSaleNoAtl";
  const prose = t(proseKey, {
    name: g.name,
    cur: money(g.currentPrice, g.currency),
    normal: money(g.normalPrice, g.currency),
    pct: g.discountPercent,
    atl: money(g.allTimeLow, g.currency),
    date: dateStr,
    label: vLabel,
    tip: vTip,
  });

  // 게임별 실데이터로 만드는 두 번째 분석 문단 — 페이지마다 값이 다른 고유 텍스트(템플릿 인상 완화).
  //  ① 역대 최저가와의 격차(지금이 얼마나 비싼지/바닥인지) ② 추적 기간의 평균·최고가.
  const gapVal = hasLow ? Number(g.currentPrice) - Number(g.allTimeLow) : 0;
  const gapPct = hasLow && Number(g.allTimeLow) > 0 ? Math.round((gapVal / Number(g.allTimeLow)) * 100) : 0;
  const prose2 = [];
  if (hasLow) {
    prose2.push(
      gapVal > 0
        ? t("gp.proseGap", {
            cur: money(g.currentPrice, g.currency),
            atl: money(g.allTimeLow, g.currency),
            gap: money(gapVal, g.currency),
            pct: gapPct,
          })
        : t("gp.proseGapLow", { cur: money(g.currentPrice, g.currency) })
    );
  }
  if (stats && stats.since) {
    prose2.push(
      t("gp.proseStats", {
        since: ym(stats.since),
        avg: money(stats.avg, g.currency),
        max: money(stats.max, g.currency),
      })
    );
  }

  const summary = (
    <div className="mtop-summary">
      <div className="pricehead">
        {onSale && <div className="ph-pct">-{g.discountPercent}%</div>}
        <div className="ph-cur">{money(g.currentPrice, g.currency)}</div>
        {onSale && <div className="ph-normal">{tNodes(t("price.normal"), { p: <s>{money(g.normalPrice, g.currency)}</s> })}</div>}
        {hasLow && (
          <div className="ph-atl">
            <span className="atl-star">★</span> {t("price.atlLabel")} <b>{money(g.allTimeLow, g.currency)}</b>
            {g.allTimeLowDate && <span className="atl-date"> · {ym(g.allTimeLowDate)}</span>}
          </div>
        )}
        <div className="gp-basis">{t("gp.priceBasis")}</div>
      </div>

      <div className="verdict" style={{ background: v.bg, border: `1px solid ${v.bd}` }}>
        <div className="vt" style={{ color: v.fg }}>
          {vLabel} — {vSub}
        </div>
        <div className="vp" style={{ color: v.fg }}>
          {vTip}
        </div>
      </div>
    </div>
  );

  return (
    <article className="gp-card">
      <div className="gp-head">
        <Cover appid={g.appid} name={g.name} />
        <div className="gp-headtext">
          <h1 className="gp-title">{t("gp.title", { name: g.name })}</h1>
          <div className="gp-stamp">
            <Stamp v={v} big />
          </div>
        </div>
        <StarButton appid={g.appid} />
      </div>

      {hasChart ? (
        <div className="mtop">
          <div className="mtop-chart">
            <div className="chartlabel">{t("gp.chartLabel")}</div>
            <PriceChart hist={chartHist} low={g.allTimeLow} currency={g.currency} />
          </div>
          {summary}
        </div>
      ) : (
        summary
      )}

      <p className="gp-prose">{prose}</p>
      {prose2.length > 0 && <p className="gp-prose">{prose2.join(" ")}</p>}

      <GameInfo g={g} t={t} />

      {/* 본문 안 광고(가격 위쪽이 아닌, 정보 아래). 슬롯 ID 없으면 아무것도 안 그림. */}
      <AdSlot slot="gameTop" />

      {stats && (
        <>
          <div className="subhead">{t("gp.statsTitle")}</div>
          <div className="ledger">
            <div className="lrow">
              <span className="lab">{t("stats.avg")}</span>
              <span className="val">{money(stats.avg, g.currency)}</span>
            </div>
            <div className="lrow">
              <span className="lab">{t("stats.max")}</span>
              <span className="val">{money(stats.max, g.currency)}</span>
            </div>
            {stats.since && (
              <div className="lrow">
                <span className="lab">{t("stats.since")}</span>
                <span className="val">{ym(stats.since)}</span>
              </div>
            )}
          </div>
        </>
      )}

      {lows.length > 1 && (
        <>
          <div className="subhead">{t("gp.lowsTitle")}</div>
          <div className="lows">
            {lows.map((p, i) => (
              <div className={"lowchip" + (i === 0 ? " best" : "")} key={p.d + "-" + p.p}>
                <span className="lc-p">{money(p.p, g.currency)}</span>
                <span className="lc-d">{ym(p.d)}</span>
              </div>
            ))}
          </div>
        </>
      )}

      <div className="gp-foot">
        <a className="steam" href={`https://store.steampowered.com/app/${g.appid}/`} target="_blank" rel="noreferrer">
          {t("gp.steam")}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M15 3h6v6" />
            <path d="M10 14 21 3" />
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
          </svg>
        </a>
        <div className="mfoot-row">
          <a className="ghostbtn" href={`https://steamdb.info/app/${g.appid}/`} target="_blank" rel="noreferrer">
            SteamDB
          </a>
          <button className="ghostbtn" onClick={onCopy}>
            {copied ? t("gp.copied") : t("gp.copy")}
          </button>
          <ShareButtons g={g} t={t} />
        </div>
        <div className="freshness">{t("gp.freshness")}</div>
      </div>

      <RelatedRail related={related} t={t} />

      <div className="gp-guides">
        <Link to="/guide" className="gp-guides-link">
          {t("gp.moreGuides")}
        </Link>
      </div>
    </article>
  );
}

// 공유 버튼들 — 네이티브 공유(navigator.share, 지원 기기만) + X·레딧 공유 인텐트 링크.
function ShareButtons({ g, t }) {
  const url = (typeof window !== "undefined" ? window.location.origin : "https://lowstamp.com") + "/game/" + g.appid;
  const title = g.name;
  const canNative = typeof navigator !== "undefined" && !!navigator.share;

  const onNative = () => {
    try {
      navigator.share({ title, url });
    } catch {
      /* 사용자가 취소하거나 미지원이면 무시 */
    }
  };

  const xHref = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(url);
  const redditHref = "https://www.reddit.com/submit?url=" + encodeURIComponent(url) + "&title=" + encodeURIComponent(title);

  return (
    <>
      {canNative && (
        <button className="ghostbtn" onClick={onNative}>
          {t("gp.share")}
        </button>
      )}
      <a className="ghostbtn" href={xHref} target="_blank" rel="noreferrer">
        X
      </a>
      <a className="ghostbtn" href={redditHref} target="_blank" rel="noreferrer">
        Reddit
      </a>
    </>
  );
}

// 같은 장르(없으면 인기) 할인작 레일 — 카드 클릭 시 그 게임 페이지로 이동.
function RelatedRail({ related, t }) {
  if (!related || related.length === 0) return null;
  return (
    <>
      <div className="subhead">{t("gp.relatedTitle")}</div>
      <div className="list gp-related">
        {related.map((rg) => (
          <GameCard key={rg.appid} game={rg} onClick={(game) => navigate("/game/" + game.appid)} />
        ))}
      </div>
    </>
  );
}

// "게임 정보" 섹션 — 언어 중립 메타데이터(개발사·출시연도·플랫폼·언어 등)를
// 영수증 장부 스타일 행으로 보여준다(데이터 있는 항목만). 체류 시간/SEO용.
function GameInfo({ g, t }) {
  const genres = gameGenres(g);
  const controller = g.controller === "full" ? t("info.controllerFull") : g.controller === "partial" ? t("info.controllerPartial") : "";
  const langCodes = (g.langs || "").split(",").map((s) => s.trim()).filter(Boolean);
  const dlcCount = Number(g.dlcCount) || 0;
  const releaseYear = Number(g.releaseYear) || 0;
  const metacritic = Number(g.metacritic) || 0;
  const platformLabel = { win: "Windows", mac: "macOS", linux: "Linux" };
  const platforms = (g.platforms || "").split(",").map((s) => s.trim()).filter(Boolean);
  // 스팀 종합 평가: 영어 문구를 i18n 키로 매핑(없으면 null → 줄 생략)
  const rKey = g.reviewDesc ? reviewKey(g.reviewDesc) : null;
  const reviewTotal = Number(g.reviewTotal) || 0;

  // 모든 행이 비면 섹션 자체를 그리지 않는다.
  const hasAny =
    rKey || genres.length || controller || langCodes.length || dlcCount > 0 ||
    g.developer || releaseYear > 0 || metacritic > 0 || platforms.length;
  if (!hasAny) return null;

  return (
    <>
      <div className="subhead">{t("info.title")}</div>
      <div className="ledger gp-info">
        {rKey && (
          <div className="lrow">
            <span className="lab">{t("info.review")}</span>
            <span className="val">
              {t(rKey)}
              {reviewTotal > 0 && <span className="gp-info-sub"> · {t("info.reviewCount", { n: reviewTotal.toLocaleString() })}</span>}
            </span>
          </div>
        )}
        {genres.length > 0 && (
          <div className="lrow">
            <span className="lab">{t("info.genres")}</span>
            <span className="val gp-genrelinks">
              {genres.map((x, i) => (
                <span key={x}>
                  {i > 0 && ", "}
                  <button
                    type="button"
                    className="gp-genrelink"
                    onClick={() => navigate("/?tab=deals&genre=" + encodeURIComponent(x))}
                  >
                    {genreKey(x) ? t(genreKey(x)) : x}
                  </button>
                </span>
              ))}
            </span>
          </div>
        )}
        {controller && (
          <div className="lrow">
            <span className="lab">{t("info.controller")}</span>
            <span className="val">{controller}</span>
          </div>
        )}
        {langCodes.length > 0 && (
          <div className="lrow">
            <span className="lab">{t("info.languages")}</span>
            <span className="val">
              {SUPPORTED.filter((s) => langCodes.includes(s.code)).map((s) => "✓ " + s.label).join(" · ")}
              {Number(g.langCount) > 0 && <span className="gp-info-sub"> · {t("info.langCount", { n: g.langCount })}</span>}
            </span>
          </div>
        )}
        {dlcCount > 0 && (
          <div className="lrow">
            <span className="lab">{t("info.dlc")}</span>
            <span className="val">{t("info.dlcCount", { n: dlcCount })}</span>
          </div>
        )}
        {g.developer && (
          <div className="lrow">
            <span className="lab">{t("info.developer")}</span>
            <span className="val">
              <button
                type="button"
                className="gp-genrelink"
                onClick={() => navigate("/?q=" + encodeURIComponent(g.developer))}
              >
                {g.developer}
              </button>
            </span>
          </div>
        )}
        {releaseYear > 0 && (
          <div className="lrow">
            <span className="lab">{t("info.released")}</span>
            <span className="val">{releaseYear}</span>
          </div>
        )}
        {metacritic > 0 && (
          <div className="lrow">
            <span className="lab">{t("info.metacritic")}</span>
            <span className="val">{metacritic}</span>
          </div>
        )}
        {platforms.length > 0 && (
          <div className="lrow">
            <span className="lab">{t("info.platforms")}</span>
            <span className="val">{platforms.map((p) => platformLabel[p] || p).join(", ")}</span>
          </div>
        )}
      </div>
    </>
  );
}
