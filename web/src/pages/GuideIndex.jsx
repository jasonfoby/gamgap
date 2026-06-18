import { useEffect } from "react";
import PageShell from "../components/PageShell";
import { Link } from "../lib/router";
import { GUIDES } from "../content/guides";
import { setPageHead } from "../lib/head";
import { ym } from "../lib/format";
import "./GuideIndex.css";

// 가이드 목록 페이지 (/guide).
// content/guides/*.js 의 글들을 날짜 내림차순(GUIDES)으로 카드 리스트로 보여 준다.
// 각 카드는 제목·설명·날짜·읽는 시간을 담고, 클릭하면 /guide/<slug> 상세로 이동.
export default function GuideIndex() {
  useEffect(() => {
    setPageHead({
      title: "가이드",
      description: "스팀 할인·최저가 활용 가이드 모음",
      path: "/guide",
    });
  }, []);

  return (
    <PageShell>
      <div className="guide-index">
        <header className="gi-head">
          <h1 className="gi-title">가이드</h1>
          <p className="gi-desc">
            스팀 세일·환불·원화 가격제부터 가짜 할인 피하는 법까지, 게임을 더
            싸고 똑똑하게 사는 데 도움이 되는 글들을 모았습니다.
          </p>
        </header>

        {GUIDES.length === 0 ? (
          <p className="gi-empty">아직 등록된 가이드가 없습니다.</p>
        ) : (
          <ul className="gi-list">
            {GUIDES.map((g) => (
              <li key={g.slug} className="gi-item">
                <Link to={`/guide/${g.slug}`} className="gi-card">
                  <h2 className="gi-card-title">{g.title}</h2>
                  {g.description && (
                    <p className="gi-card-desc">{g.description}</p>
                  )}
                  <div className="gi-card-meta">
                    {g.date && <span className="gi-date">{ym(g.date)}</span>}
                    {g.date && g.readMins && (
                      <span className="gi-sep" aria-hidden="true">
                        ·
                      </span>
                    )}
                    {g.readMins && (
                      <span className="gi-read">읽는 시간 {g.readMins}분</span>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageShell>
  );
}
