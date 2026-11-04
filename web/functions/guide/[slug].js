// Cloudflare Pages 함수: /guide/:slug (가이드 상세) — self-canonical(/guide/:slug)로 보정하고
// 해당 글의 제목·설명·본문을 서버에서 주입한다(JS 미실행 봇에도 고유 본문·내부 링크가 보이도록).
import { pickLang, getGuide, renderContent, guideJsonLd, guideBodyHtml } from "../_shared/content.js";

export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const slug = String(params.slug || "").trim();
  const lang = pickLang(request.headers.get("Accept-Language"));
  const shell = await env.ASSETS.fetch(new URL("/index.html", url));

  const mod = getGuide(lang, slug);

  // 없는 글 주소: HTTP 404 + noindex 로 응답(200 으로 빈 껍데기를 내면 소프트 404 라 사이트 평가를 깎는다).
  if (!mod) {
    const nf = new HTMLRewriter()
      .on("html", { element(e) { e.setAttribute("lang", lang); } })
      .on("head", { element(e) { e.append('<meta name="robots" content="noindex,follow">', { html: true }); } })
      .transform(shell);
    return new Response(nf.body, {
      status: 404,
      headers: { "content-type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=0, must-revalidate", Vary: "Accept-Language" },
    });
  }

  const res = renderContent(shell, {
    lang,
    pathname: `/guide/${slug}`,
    mod,
    fallbackTitle: "Lowstamp",
    bodyHtml: guideBodyHtml(lang, slug, mod), // 빵부스러기 + 제목 + 글쓴이·갱신일 + 본문 + 관련 글
    jsonld: guideJsonLd(lang, slug, mod), // Article + BreadcrumbList + (있으면) FAQPage
  });

  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language");
  out.headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  return out;
}
