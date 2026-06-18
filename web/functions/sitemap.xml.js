// Cloudflare Pages 함수: /sitemap.xml — 구글이 정적 페이지·가이드 글·개별 게임 페이지를
// 모두 발견하도록, 고정 경로 + 가이드 글 + 현재 할인 목록(최대 200개)을 사이트맵으로 내보낸다.
const API = "https://gamgap-api.ibanisac.workers.dev";

// 고정 정적 경로(라우터에 등록된 페이지).
const STATIC_PATHS = ["/", "/about", "/privacy", "/terms", "/contact", "/guide"];

// 가이드 글 경로(콘텐츠 슬러그). Pages Functions 런타임에선 import.meta.glob 을 못 쓰므로
// 슬러그를 여기에 상수로 하드코딩한다 — 새 가이드 글을 추가하면 이 배열도 갱신할 것.
const GUIDE_PATHS = [
  "/guide/steam-sale-calendar",
  "/guide/how-to-buy-cheap",
  "/guide/verdict-guide",
  "/guide/krw-regional-pricing",
  "/guide/steam-refund-policy",
  "/guide/best-value-indies",
  "/guide/wishlist-alerts",
  "/guide/avoid-fake-discounts",
];

export async function onRequest(context) {
  const { request } = context;
  const origin = new URL(request.url).origin;

  let rows = [];
  try {
    const r = await fetch(`${API}/api/deals?limit=200`);
    if (r.ok) rows = await r.json();
  } catch {
    /* 실패해도 정적 경로/가이드는 포함 */
  }

  const locs = [
    ...STATIC_PATHS.map((p) => `${origin}${p}`),
    ...GUIDE_PATHS.map((p) => `${origin}${p}`),
    ...rows.filter((g) => g && g.appid).map((g) => `${origin}/game/${g.appid}`),
  ];
  const body =
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    locs.map((u) => `  <url><loc>${u}</loc></url>`).join("\n") +
    `\n</urlset>\n`;

  return new Response(body, {
    headers: {
      "content-type": "application/xml; charset=utf-8",
      "cache-control": "public, max-age=3600",
    },
  });
}
