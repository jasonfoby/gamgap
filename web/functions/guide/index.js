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

// 목록 페이지 한 줄 소개(봇 본문 + 사람용).
const GUIDE_INDEX_INTRO = {
  ko: "스팀 게임을 더 싸게, 더 똑똑하게 사는 법을 정리한 가이드 모음입니다.",
  en: "A collection of guides on buying Steam games cheaper and smarter.",
  ja: "Steam ゲームをより安く、より賢く買うためのガイド集です。",
  zh: "教你更便宜、更聪明地购买 Steam 游戏的指南合集。",
  es: "Una colección de guías para comprar juegos de Steam más baratos y de forma más inteligente.",
  pt: "Uma coleção de guias para comprar jogos da Steam mais barato e com mais esperteza.",
};

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const lang = pickLang(request.headers.get("Accept-Language"));
  const shell = await env.ASSETS.fetch(new URL("/index.html", url));

  const heading = GUIDE_INDEX_TITLE[lang] || GUIDE_INDEX_TITLE.en;
  const intro = GUIDE_INDEX_INTRO[lang] || GUIDE_INDEX_INTRO.en;
  const res = renderContent(shell, {
    lang,
    pathname: "/guide",
    mod: null,
    fallbackTitle: `${heading} · Lowstamp`,
    bodyHtml: guideIndexBody(lang, heading, intro), // 봇용 글 목록(제목 링크 + 설명) 주입
  });

  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language");
  out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return out;
}
