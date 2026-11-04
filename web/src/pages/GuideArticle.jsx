import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import ArticleBody from "../components/ArticleBody";
import AdSlot from "../components/AdSlot";
import { Skeleton } from "../components/Skeleton";
import NotFound from "./NotFound";
import { Link } from "../lib/router";
import { loadGuide } from "../content/guides";
import { relatedGuideSlugs } from "../content/guideCategories";
import { setPageHead } from "../lib/head";
import { ym, ymd } from "../lib/format";
import { useT } from "../lib/i18n";
import "./GuideArticle.css";

// '함께 읽으면 좋은 글' — 같은 묶음의 글 3편(제목만). 글이 도착한 뒤 불러오는 동안에도 같은 높이의 자리표시를 깔아
// 아래 푸터가 밀리지 않게 한다(레이아웃 이동 방지).
function useRelated(slug, lang) {
  const [items, setItems] = useState(null); // null = 로딩 중
  useEffect(() => {
    let alive = true;
    setItems(null);
    Promise.all(relatedGuideSlugs(slug, 3).map((s) => loadGuide(lang, s)))
      .then((gs) => alive && setItems((gs || []).filter((g) => g && g.slug)))
      .catch(() => alive && setItems([]));
    return () => {
      alive = false;
    };
  }, [slug, lang]);
  return items;
}

// 가이드 상세 글 (/guide/<slug>). 현재 언어의 글을 지연 로딩하고, 없으면 404.
export default function GuideArticle({ slug }) {
  const { t, lang } = useT();
  const [state, setState] = useState({ status: "loading", guide: null });
  const related = useRelated(slug, lang);

  useEffect(() => {
    let alive = true;
    setState({ status: "loading", guide: null });
    loadGuide(lang, slug).then((g) => alive && setState({ status: g ? "ok" : "notfound", guide: g }));
    return () => {
      alive = false;
    };
  }, [lang, slug]);

  useEffect(() => {
    if (state.status === "ok" && state.guide) {
      setPageHead({
        title: state.guide.title,
        description: state.guide.description,
        path: `/guide/${state.guide.slug}`,
        type: "article",
      });
    }
  }, [state]);

  if (state.status === "loading")
    return (
      <PageShell loading>
        <article className="guide-article">
          <p className="gi-empty">{t("common.loading")}</p>
        </article>
      </PageShell>
    );

  if (state.status === "notfound" || !state.guide) return <NotFound />;

  const guide = state.guide;
  // 갱신일이 있고 첫 게시일과 다르면 '갱신 N월 N일', 아니면 게시 월. (updated 는 실제로 다시 확인·수정한 날에만 올린다.)
  const dateText =
    guide.updated && guide.updated !== guide.date
      ? t("guide.updated", { d: ymd(guide.updated) })
      : guide.date
        ? ym(guide.date)
        : "";

  return (
    <PageShell>
      <article className="guide-article">
        <nav className="ga-crumbs" aria-label={t("guide.crumbAria")}>
          <Link to="/">{t("nav.home")}</Link>
          <span className="ga-crumb-sep" aria-hidden="true">›</span>
          <Link to="/guide">{t("nav.guide")}</Link>
          <span className="ga-crumb-sep" aria-hidden="true">›</span>
          <span className="ga-crumb-now" aria-current="page">{guide.title}</span>
        </nav>

        <h1 className="ga-title">{guide.title}</h1>

        {/* 글쓴이(소개 페이지로 연결)·갱신일·읽는 시간 — 누가, 언제 다시 확인했는지 드러낸다. */}
        <div className="ga-meta">
          <Link to="/about" className="ga-author" rel="author">
            {t("author.by", { name: t("author.name") })}
          </Link>
          {dateText && (
            <>
              <span className="ga-sep" aria-hidden="true">·</span>
              <span className="ga-date">{dateText}</span>
            </>
          )}
          {guide.readMins && (
            <>
              <span className="ga-sep" aria-hidden="true">·</span>
              <span className="ga-read">{t("guide.readMins", { n: guide.readMins })}</span>
            </>
          )}
        </div>

        {(() => {
          // 본문을 두 토막으로 나눠 사이에 광고 한 자리를 끼운다(슬롯 ID 없으면 안 보임).
          // 글이 너무 짧으면(블록 3개 미만) 나누지 않고 광고는 본문 뒤로.
          const body = Array.isArray(guide.body) ? guide.body : [];
          if (body.length < 3) {
            return (
              <>
                <ArticleBody blocks={body} />
                <AdSlot slot="guideMid" />
              </>
            );
          }
          // 첫 소제목 다음(없으면 두 번째 블록 뒤)에서 자른다.
          let cut = body.findIndex((b, i) => i > 0 && b && b.type === "h2");
          if (cut < 1) cut = Math.min(2, body.length - 1);
          return (
            <>
              <ArticleBody blocks={body.slice(0, cut)} />
              <AdSlot slot="guideMid" />
              <ArticleBody blocks={body.slice(cut)} />
            </>
          );
        })()}

        <nav className="ga-related" aria-label={t("guide.related")}>
          <h2 className="ga-related-title">{t("guide.related")}</h2>
          <ul className="ga-related-list">
            {related === null
              ? [0, 1, 2].map((i) => (
                  <li key={i} className="ga-related-item">
                    <Skeleton h={16} w={72 - i * 9 + "%"} />
                  </li>
                ))
              : related.map((g) => (
                  <li key={g.slug} className="ga-related-item">
                    <Link to={"/guide/" + g.slug}>{g.title}</Link>
                  </li>
                ))}
          </ul>
        </nav>

        <div className="ga-foot">
          <Link to="/guide" className="ga-back">
            {t("guide.back")}
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
