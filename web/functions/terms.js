// Cloudflare Pages 함수: /terms — self-canonical 보정 + 이용약관 제목·설명·첫 문단 주입.
import { pickLang, getPage, renderContent } from "./_shared/content.js";

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const lang = pickLang(request.headers.get("Accept-Language"));
  const shell = await env.ASSETS.fetch(new URL("/index.html", url));
  const res = renderContent(shell, { lang, pathname: "/terms", mod: getPage(lang, "terms") });
  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language");
  out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return out;
}
