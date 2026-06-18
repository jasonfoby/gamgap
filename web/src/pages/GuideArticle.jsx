import { useEffect } from "react";
import PageShell from "../components/PageShell";
import ArticleBody from "../components/ArticleBody";
import NotFound from "./NotFound";
import { Link } from "../lib/router";
import { getGuide } from "../content/guides";
import { setPageHead } from "../lib/head";
import { ym } from "../lib/format";
import "./GuideArticle.css";

// 가이드 상세 글 (/guide/<slug>).
// props: { slug } — URL에서 디코딩된 글 식별자(예: "steam-sale-calendar").
// getGuide(slug)로 글을 찾고, 없으면 404(NotFound)를 보여 준다.
// 있으면 종이 카드 안에 제목 → 메타줄(날짜·읽는 시간·태그) → 본문 → 하단 "다른 가이드 보기" 순으로 그린다.
export default function GuideArticle({ slug }) {
  const guide = getGuide(slug);

  useEffect(() => {
    if (!guide) return;
    setPageHead({
      title: guide.title,
      description: guide.description,
      path: `/guide/${guide.slug}`,
      type: "article",
    });
  }, [guide]);

  // 알 수 없는 slug면 404. (제목/메타는 NotFound 쪽 흐름에 맡긴다)
  if (!guide) return <NotFound />;

  const tags = Array.isArray(guide.tags) ? guide.tags : [];

  return (
    <PageShell>
      <article className="guide-article">
        <h1 className="ga-title">{guide.title}</h1>

        <div className="ga-meta">
          {guide.date && <span className="ga-date">{ym(guide.date)}</span>}
          {guide.date && guide.readMins && (
            <span className="ga-sep" aria-hidden="true">
              ·
            </span>
          )}
          {guide.readMins && (
            <span className="ga-read">읽는 시간 {guide.readMins}분</span>
          )}
        </div>

        {tags.length > 0 && (
          <div className="ga-tags" aria-label="태그">
            {tags.map((t) => (
              <span key={t} className="ga-tag">
                #{t}
              </span>
            ))}
          </div>
        )}

        <ArticleBody blocks={guide.body} />

        <div className="ga-foot">
          <Link to="/guide" className="ga-back">
            다른 가이드 보기
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
