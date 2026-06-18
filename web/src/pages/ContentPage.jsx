import { useEffect } from "react";
import PageShell from "../components/PageShell";
import ArticleBody from "../components/ArticleBody";
import { setPageHead } from "../lib/head";
import { ym } from "../lib/format";
import "./ContentPage.css";

// 정적 콘텐츠 페이지(개인정보처리방침·이용약관·소개·문의 등) 공통 화면.
// props:
//   data: { title, description, updated?, body }  — content/pages/<slug>.js 의 default export.
//     - title: 페이지 제목(예: "개인정보처리방침").
//     - description: 메타 설명(검색·공유 미리보기용).
//     - updated: 최종 수정일 문자열(예: "2026-06-18"). 있으면 제목 아래 "최종 수정 2026년 6월"로 표기.
//     - body: ArticleBody가 그리는 블록 배열.
// PageShell(헤더/푸터 공통 틀) 안에 종이 카드(.content-card)로 본문을 감싼다.
// ArticleBody는 밝은 종이 배경 위 짙은 글자색을 가정하므로 카드 배경을 --paper로 둔다.
export default function ContentPage({ data }) {
  // 마운트/데이터 변경 시 문서 제목·메타를 이 페이지에 맞춰 갱신.
  useEffect(() => {
    if (!data) return;
    setPageHead({
      title: data.title,
      description: data.description,
      path: window.location.pathname,
    });
  }, [data]);

  // 라우팅이 보장하지만, 방어적으로 데이터 없으면 아무 것도 안 그림.
  if (!data) return null;

  return (
    <PageShell>
      <article className="content-card">
        <h1 className="content-title">{data.title}</h1>
        {data.updated && (
          <p className="content-updated">최종 수정 {ym(data.updated)}</p>
        )}
        <ArticleBody blocks={data.body} />
      </article>
    </PageShell>
  );
}
