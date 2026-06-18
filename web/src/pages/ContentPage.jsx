import { useEffect, useState } from "react";
import PageShell from "../components/PageShell";
import ArticleBody from "../components/ArticleBody";
import NotFound from "./NotFound";
import { loadPage } from "../content/pages";
import { setPageHead } from "../lib/head";
import { ym } from "../lib/format";
import { useT } from "../lib/i18n";
import "./ContentPage.css";

// 정적 콘텐츠 페이지(개인정보처리방침·이용약관·소개·문의). slug별로 현재 언어 콘텐츠를 지연 로딩.
export default function ContentPage({ slug }) {
  const { t, lang } = useT();
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    let alive = true;
    setState({ status: "loading", data: null });
    loadPage(lang, slug).then((d) => alive && setState({ status: d ? "ok" : "notfound", data: d }));
    return () => {
      alive = false;
    };
  }, [lang, slug]);

  useEffect(() => {
    if (state.status === "ok" && state.data) {
      setPageHead({
        title: state.data.title,
        description: state.data.description,
        path: window.location.pathname,
      });
    }
  }, [state]);

  if (state.status === "loading")
    return (
      <PageShell>
        <article className="content-card">
          <p className="content-loading">{t("common.loading")}</p>
        </article>
      </PageShell>
    );

  if (state.status === "notfound" || !state.data) return <NotFound />;

  const data = state.data;
  return (
    <PageShell>
      <article className="content-card">
        <h1 className="content-title">{data.title}</h1>
        {data.updated && <p className="content-updated">{t("page.updated", { d: ym(data.updated) })}</p>}
        <ArticleBody blocks={data.body} />
      </article>
    </PageShell>
  );
}
