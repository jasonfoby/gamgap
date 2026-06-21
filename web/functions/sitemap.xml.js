// Cloudflare Pages 함수: /sitemap.xml — 구글이 정적 페이지·가이드 글·개별 게임 페이지를
// 모두 발견하도록, 고정 경로 + 가이드 글 + (현재가 있는) 모든 게임 페이지를 사이트맵으로 내보낸다.
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
  // 2026-06-20 증편
  "/guide/historical-low-meaning",
  "/guide/when-to-buy-or-wait",
  "/guide/steam-bundles-guide",
  "/guide/reviews-metacritic-guide",
  "/guide/price-history-reading",
  "/guide/seasonal-sale-strategy",
  "/guide/first-steam-purchase-guide",
  // 2026-06-21 증편
  "/guide/dlc-season-pass-guide",
  // 2026-06-22 증편
  "/guide/avoid-impulse-buys",
];

export async function onRequest(context) {
  const { request } = context;
  const origin = new URL(request.url).origin;

  // 현재가가 있는 모든 게임의 appid 목록(가벼운 엔드포인트). 실패하면 게임 URL 없이
  // 정적 경로/가이드만 내보낸다(사이트맵이 깨지지 않게). ~3000개라 단일 사이트맵(5만 한도) 안.
  let appids = [];
  try {
    const r = await fetch(`${API}/api/appids`);
    if (r.ok) {
      const data = await r.json();
      if (Array.isArray(data)) appids = data;
    }
  } catch {
    /* 실패해도 정적 경로/가이드는 포함 */
  }

  const locs = [
    ...STATIC_PATHS.map((p) => `${origin}${p}`),
    ...GUIDE_PATHS.map((p) => `${origin}${p}`),
    // 현재가 있는 모든 게임 페이지를 색인 대상으로 내보낸다.
    ...appids
      .filter((id) => Number(id) > 0)
      .map((id) => `${origin}/game/${id}`),
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
