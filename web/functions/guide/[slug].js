// Cloudflare Pages 함수: /guide/:slug (가이드 상세) — self-canonical(/guide/:slug)로 보정하고
// 해당 글의 제목·설명·첫 문단을 서버에서 주입한다(JS 미실행 봇에도 고유 본문이 보이도록).
import { pickLang, getGuide, renderContent } from "../_shared/content.js";

export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const slug = String(params.slug || "").trim();
  const lang = pickLang(request.headers.get("Accept-Language"));
  const shell = await env.ASSETS.fetch(new URL("/index.html", url));

  const mod = getGuide(lang, slug);
  const res = renderContent(shell, {
    lang,
    pathname: `/guide/${slug}`,
    mod, // 못 찾으면 null → canonical 만 self 로 보정.
    fallbackTitle: "Lowstamp",
  });

  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language");
  out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return out;
}
