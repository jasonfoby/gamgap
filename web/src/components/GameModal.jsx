import { useEffect, useState } from "react";
import Cover from "./Cover";
import Stamp from "./Stamp";
import StarButton from "./StarButton";
import PriceChart from "./PriceChart";
import { verdict } from "../lib/verdict";
import { won } from "../lib/format";
import { priceStats } from "../lib/stats";
import { getGame } from "../api";

// 상세 모달: 가격 흐름(툴팁) + 정가/현재가/역대최저 장부 + 가격 통계 +
// "지금 사도 돼?" 판정 + 찜 + 공유 링크 + 스팀/SteamDB 링크.
// 오버레이 클릭 / X 버튼 / ESC 로 닫힌다.
export default function GameModal({ game, onClose }) {
  const [full, setFull] = useState(game); // 긴 이력을 병합한 상세본
  const [copied, setCopied] = useState(false);

  // 모달이 열리면 /api/game/:appid로 긴 이력까지 받아 병합.
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
      <div className="modal">
        <div className="mhead">
          <Cover appid={g.appid} name={g.name} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="mtitle">{g.name}</div>
            <div style={{ marginTop: 6 }}>
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
          <div className="chartlabel">가격 흐름</div>
          <PriceChart hist={g.history} low={g.allTimeLow} />

          <div className="ledger">
            <div className="lrow">
              <span className="lab">정가</span>
              <span
                className="val"
                style={{ textDecoration: g.discountPercent > 0 ? "line-through" : "none" }}
              >
                {won(g.normalPrice)}
              </span>
            </div>
            <div className="lrow">
              <span className="lab">
                현재가{g.discountPercent > 0 ? ` (-${g.discountPercent}%)` : ""}
              </span>
              <span className="val">{won(g.currentPrice)}</span>
            </div>
            <div className="lrow">
              <span className="lab">
                역대 최저가{g.allTimeLowDate ? ` · ${g.allTimeLowDate}` : ""}
              </span>
              <span className="val" style={{ color: "#C8912B" }}>
                {won(g.allTimeLow)}
              </span>
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
                    <span className="val">{stats.since}</span>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="verdict" style={{ background: v.bg, border: `1px solid ${v.bd}` }}>
            <div className="vt" style={{ color: v.fg }}>
              {v.label} — {v.sub}
            </div>
            <div className="vp" style={{ color: v.fg }}>
              {v.tip}
            </div>
          </div>
        </div>

        <div className="mfoot">
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
            <a
              className="ghostbtn"
              href={`https://steamdb.info/app/${g.appid}/`}
              target="_blank"
              rel="noreferrer"
            >
              SteamDB
            </a>
            <button className="ghostbtn" onClick={copyLink}>
              {copied ? "복사됨!" : "링크 복사"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
