// Cloudflare Pages 함수: /guide (가이드 목록) — 정적 index.html 의 canonical 이 홈을 가리키는 문제를
// 바로잡아 self-canonical(/guide)로 덮고, 가이드 목록임을 알리는 제목을 넣는다.
// (개별 글 본문은 없으므로 본문 주입은 생략 — canonical·제목만.)
import { pickLang, renderContent } from "../_shared/content.js";

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

  const res = renderContent(shell, {
    lang,
    pathname: "/guide",
    mod: null, // 목록 페이지: 단일 콘텐츠 모듈 없음 → canonical·제목만 보정.
    fallbackTitle: `${GUIDE_INDEX_TITLE[lang] || GUIDE_INDEX_TITLE.en} · Lowstamp`,
  });

  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language");
  out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return out;
}
