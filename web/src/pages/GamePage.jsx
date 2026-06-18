import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import Cover from "../components/Cover";
import Stamp from "../components/Stamp";
import StarButton from "../components/StarButton";
import PriceChart from "../components/PriceChart";
import { Link } from "../lib/router";
import { verdict } from "../lib/verdict";
import { won, ym } from "../lib/format";
import { priceStats, lowPoints } from "../lib/stats";
import { setGameHead, resetHead } from "../lib/head";
import { getGame } from "../api";
import { track } from "../lib/analytics";
import { useT, tNodes } from "../lib/i18n";
import "./GamePage.css";

// 개별 게임 상세 "페이지"(/game/:appid). 모달을 대체하는 색인 가능한 독립 URL.
export default function GamePage({ appid }) {
  const { t } = useT();
  const [state, setState] = useState({ status: "loading", game: null });
  const [nonce, setNonce] = useState(0); // 재시도 트리거
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let alive = true;
    setState({ status: "loading", game: null });
    getGame(appid)
      .then((g) => {
        if (!alive) return;
        if (g && g.appid) setState({ status: "ok", game: g });
        else setState({ status: "notfound", game: null });
      })
      .catch(() => alive && setState({ status: "error", game: null }));
    return () => {
      alive = false;
    };
  }, [appid, nonce]);

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
        <GameDetail g={state.game} copied={copied} onCopy={copyLink} t={t} />
      )}
    </PageShell>
  );
}

// 가격 상세 본문(영수증 카드).
function GameDetail({ g, copied, onCopy, t }) {
  const v = verdict(g);
  const stats = priceStats(g.history);
  const lows = lowPoints(g.history, 5);
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
    cur: won(g.currentPrice),
    normal: won(g.normalPrice),
    pct: g.discountPercent,
    atl: won(g.allTimeLow),
    date: dateStr,
    label: vLabel,
    tip: vTip,
  });

  const summary = (
    <div className="mtop-summary">
      <div className="pricehead">
        {onSale && <div className="ph-pct">-{g.discountPercent}%</div>}
        <div className="ph-cur">{won(g.currentPrice)}</div>
        {onSale && <div className="ph-normal">{tNodes(t("price.normal"), { p: <s>{won(g.normalPrice)}</s> })}</div>}
        {hasLow && (
          <div className="ph-atl">
            <span className="atl-star">★</span> {t("price.atlLabel")} <b>{won(g.allTimeLow)}</b>
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

      {stats ? (
        <div className="mtop">
          <div className="mtop-chart">
            <div className="chartlabel">{t("gp.chartLabel")}</div>
            <PriceChart hist={g.history} low={g.allTimeLow} />
          </div>
          {summary}
        </div>
      ) : (
        summary
      )}

      <p className="gp-prose">{prose}</p>

      {stats && (
        <>
          <div className="subhead">{t("gp.statsTitle")}</div>
          <div className="ledger">
            <div className="lrow">
              <span className="lab">{t("stats.avg")}</span>
              <span className="val">{won(stats.avg)}</span>
            </div>
            <div className="lrow">
              <span className="lab">{t("stats.max")}</span>
              <span className="val">{won(stats.max)}</span>
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
                <span className="lc-p">{won(p.p)}</span>
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
        </div>
        <div className="freshness">{t("gp.freshness")}</div>
      </div>
    </article>
  );
}
