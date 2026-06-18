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
import "./GamePage.css";

// 개별 게임 상세 "페이지"(/game/:appid). 기존 모달을 대체하는 색인 가능한 독립 URL.
// - 검색엔진이 게임마다 독립 페이지로 색인하도록 h1·본문 텍스트·가격표를 실제 HTML로 렌더.
// - head.js가 이 페이지의 제목·설명·canonical·OG·JSON-LD를 갱신(이력이 빈약하면 noindex).
// - 봇(카톡/구글 미실행)용 메타는 functions/game/[appid].js 가 서버에서 같은 내용을 주입.
export default function GamePage({ appid }) {
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
        ← 목록으로
      </Link>

      {state.status === "loading" && <div className="gp-card gp-msg">불러오는 중…</div>}

      {state.status === "error" && (
        <div className="gp-card gp-msg">
          가격을 불러오지 못했어요.
          <button
            className="ghostbtn"
            style={{ marginTop: 12, display: "inline-flex" }}
            onClick={() => setNonce((n) => n + 1)}
          >
            다시 시도
          </button>
        </div>
      )}

      {state.status === "notfound" && (
        <div className="gp-card gp-msg">
          해당 게임을 찾을 수 없어요. 상단 검색으로 다시 찾아보세요.
        </div>
      )}

      {state.status === "ok" && state.game && (
        <GameDetail g={state.game} copied={copied} onCopy={copyLink} />
      )}
    </PageShell>
  );
}

// 가격 상세 본문(영수증 카드). 모달과 동일한 인라인 클래스를 재사용하되 페이지 맥락에 맞춤.
function GameDetail({ g, copied, onCopy }) {
  const v = verdict(g);
  const stats = priceStats(g.history);
  const lows = lowPoints(g.history, 5);
  const onSale = Number(g.discountPercent) > 0;
  const hasLow = Number(g.allTimeLow) > 0;

  // 가격 요약(현재가 헤더 + 판정). 차트가 있을 땐 2단, 없을 땐 단독으로 렌더.
  const summary = (
    <div className="mtop-summary">
      <div className="pricehead">
        {onSale && <div className="ph-pct">-{g.discountPercent}%</div>}
        <div className="ph-cur">{won(g.currentPrice)}</div>
        {onSale && (
          <div className="ph-normal">
            정가 <s>{won(g.normalPrice)}</s>
          </div>
        )}
        {hasLow && (
          <div className="ph-atl">
            <span className="atl-star">★</span> 역대최저 <b>{won(g.allTimeLow)}</b>
            {g.allTimeLowDate && <span className="atl-date"> · {ym(g.allTimeLowDate)}</span>}
          </div>
        )}
      </div>
      <div className="verdict" style={{ background: v.bg, border: `1px solid ${v.bd}` }}>
        <div className="vt" style={{ color: v.fg }}>
          {v.label} — {v.sub}
        </div>
        <div className="vp" style={{ color: v.fg }}>
          {v.tip}
        </div>
      </div>
    </div>
  );

  return (
    <article className="gp-card">
      <div className="gp-head">
        <Cover appid={g.appid} name={g.name} />
        <div className="gp-headtext">
          <h1 className="gp-title">{g.name} 가격 · 역대 최저가</h1>
          <div className="gp-stamp">
            <Stamp v={v} big />
          </div>
        </div>
        <StarButton appid={g.appid} />
      </div>

      {stats ? (
        <div className="mtop">
          <div className="mtop-chart">
            <div className="chartlabel">가격 흐름</div>
            <PriceChart hist={g.history} low={g.allTimeLow} />
          </div>
          {summary}
        </div>
      ) : (
        summary
      )}

      {/* 검색에 읽히는 고유 본문 한 단락 (게임마다 다른 텍스트) */}
      <p className="gp-prose">
        {g.name}의 스팀 한국(원화) 현재가는 <b>{won(g.currentPrice)}</b>
        {onSale ? ` (정가 ${won(g.normalPrice)}에서 ${g.discountPercent}% 할인)` : ""}
        이고,{" "}
        {hasLow
          ? `역대 최저가는 ${won(g.allTimeLow)}${g.allTimeLowDate ? ` (${ym(g.allTimeLowDate)})` : ""}입니다. `
          : "아직 역대 최저가로 판단할 가격 이력이 충분하지 않습니다. "}
        Lowstamp의 “지금 사도 돼?” 판정은 <b>{v.label}</b> — {v.tip}
      </p>

      {stats && (
        <>
          <div className="subhead">가격 통계</div>
          <div className="ledger">
            <div className="lrow">
              <span className="lab">역대 평균가</span>
              <span className="val">{won(stats.avg)}</span>
            </div>
            <div className="lrow">
              <span className="lab">역대 최고가</span>
              <span className="val">{won(stats.max)}</span>
            </div>
            {stats.since && (
              <div className="lrow">
                <span className="lab">기록 시작</span>
                <span className="val">{ym(stats.since)}</span>
              </div>
            )}
          </div>
        </>
      )}

      {lows.length > 1 && (
        <>
          <div className="subhead">이전 저점 기록</div>
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
        <a
          className="steam"
          href={`https://store.steampowered.com/app/${g.appid}/`}
          target="_blank"
          rel="noreferrer"
        >
          스팀에서 보기
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
            {copied ? "복사됨!" : "링크 복사"}
          </button>
        </div>
        <div className="freshness">가격은 하루 한 번 갱신돼요 · 스팀 결제 직전 최종가를 확인하세요</div>
      </div>
    </article>
  );
}
