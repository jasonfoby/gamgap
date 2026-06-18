import { useEffect, useState } from "react";
import Cover from "./Cover";
import Stamp from "./Stamp";
import StarButton from "./StarButton";
import PriceChart from "./PriceChart";
import { verdict } from "../lib/verdict";
import { won, ym } from "../lib/format";
import { priceStats, lowPoints } from "../lib/stats";
import { useFocusTrap } from "../lib/focusTrap";
import { getGame } from "../api";

// 상세 모달(개편): 데스크탑에서 좌(가격 흐름 차트) | 우(2단 가격헤더 + 판정) 2컬럼.
// 그 아래 전폭으로 가격 통계 장부 + 이전 저점 기록 + 푸터(스팀/SteamDB/공유).
// 오버레이 클릭 / X 버튼 / ESC 로 닫힌다.
export default function GameModal({ game, onClose }) {
  const [full, setFull] = useState(game); // 긴 이력을 병합한 상세본
  const [copied, setCopied] = useState(false);
  // 모달이 열려 있는 동안 키보드 포커스를 .modal 안에 가두고, 닫힐 때 직전 포커스(연 카드)로 복원.
  const trapRef = useFocusTrap(true);

  useEffect(() => {
    setFull(game);
    let alive = true;
    getGame(game.appid)
      .then((g) => {
        if (alive && g) setFull((cur) => ({ ...cur, ...g }));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [game.appid]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const g = full;
  const v = verdict(g);
  const stats = priceStats(g.history);
  const lows = lowPoints(g.history, 5);
  const onSale = Number(g.discountPercent) > 0;

  const copyLink = async () => {
    const url = window.location.origin + window.location.pathname + "?game=" + g.appid;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 클립보드 거부 시 무시 */
    }
  };

  return (
    <div
      className="overlay"
      onClick={(e) => {
        if (e.target.classList.contains("overlay")) onClose();
      }}
    >
      <div className="modal" role="dialog" aria-modal="true" aria-label={g.name} ref={trapRef}>
        <div className="mhead">
          <Cover appid={g.appid} name={g.name} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="mtitle">{g.name}</div>
            <div style={{ marginTop: 8 }}>
              <Stamp v={v} big />
            </div>
          </div>
          <StarButton appid={g.appid} />
          <button className="x" onClick={onClose} aria-label="닫기">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mbody">
          <div className="mtop">
            <div className="mtop-chart">
              <div className="chartlabel">가격 흐름</div>
              <PriceChart hist={g.history} low={g.allTimeLow} />
            </div>

            <div className="mtop-summary">
              {/* 2단 가격헤더: 큰 현재가 → 바로 아래 역대최저(금색 ★) */}
              <div className="pricehead">
                {onSale && <div className="ph-pct">-{g.discountPercent}%</div>}
                <div className="ph-cur">{won(g.currentPrice)}</div>
                {onSale && (
                  <div className="ph-normal">
                    정가 <s>{won(g.normalPrice)}</s>
                  </div>
                )}
                {Number(g.allTimeLow) > 0 && (
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
          </div>

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
        </div>

        <div className="mfoot">
          <a className="steam" href={`https://store.steampowered.com/app/${g.appid}/`} target="_blank" rel="noreferrer">
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
            <button className="ghostbtn" onClick={copyLink}>
              {copied ? "복사됨!" : "링크 복사"}
            </button>
          </div>
          <div className="freshness">가격은 하루 한 번 갱신돼요 · 스팀 결제 직전 최종가를 확인하세요</div>
        </div>
      </div>
    </div>
  );
}
