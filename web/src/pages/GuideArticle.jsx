import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import ArticleBody from "../components/ArticleBody";
import NotFound from "./NotFound";
import { Link } from "../lib/router";
import { loadGuide } from "../content/guides";
import { setPageHead } from "../lib/head";
import { ym } from "../lib/format";
import { useT } from "../lib/i18n";
import "./GuideArticle.css";

// 가이드 상세 글 (/guide/<slug>). 현재 언어의 글을 지연 로딩하고, 없으면 404.
export default function GuideArticle({ slug }) {
  const { t, lang } = useT();
  const [state, setState] = useState({ status: "loading", guide: null });

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
      <PageShell>
        <article className="guide-article">
          <p className="gi-empty">{t("common.loading")}</p>
        </article>
      </PageShell>
    );

  if (state.status === "notfound" || !state.guide) return <NotFound />;

  const guide = state.guide;
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
          {guide.readMins && <span className="ga-read">{t("guide.readMins", { n: guide.readMins })}</span>}
        </div>

        {tags.length > 0 && (
          <div className="ga-tags" aria-label={t("guide.tagsAria")}>
            {tags.map((tg) => (
              <span key={tg} className="ga-tag">
                #{tg}
              </span>
            ))}
          </div>
        )}

        <ArticleBody blocks={guide.body} />

        <div className="ga-foot">
          <Link to="/guide" className="ga-back">
            {t("guide.back")}
          </Link>
        </div>
      </article>
    </PageShell>
  );
}
