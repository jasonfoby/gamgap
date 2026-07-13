// Cloudflare Pages 함수: /guide (가이드 목록) — self-canonical(/guide) 보정 + 제목,
// 그리고 봇이 첫 방문에 글들을 발견하도록 #root 에 '글 목록(제목 링크 + 설명)'을 서버에서 그린다.
import { pickLang, renderContent, guideIndexBody } from "../_shared/content.js";

const GUIDE_INDEX_TITLE = {
  ko: "가이드",
  en: "Guides",
  ja: "ガイド",
  zh: "指南",
  es: "Guías",
  pt: "Guias",
};

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const lang = pickLang(request.headers.get("Accept-Language"));
  const shell = await env.ASSETS.fetch(new URL("/index.html", url));

  const heading = GUIDE_INDEX_TITLE[lang] || GUIDE_INDEX_TITLE.en;
  const res = renderContent(shell, {
    lang,
    pathname: "/guide",
    mod: null,
    fallbackTitle: `${heading} · Lowstamp`,
    // 봇용 본문: 제목 + 소개 2문단 + 주제별 묶음(글 링크·설명). 소개·카테고리 문구는 i18n 사전에서.
    bodyHtml: guideIndexBody(lang, heading),
  });

  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language");
  out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return out;
}
