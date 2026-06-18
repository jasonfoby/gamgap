// Cloudflare Pages 함수: 홈("/") 요청을 가로채, ?game=appid 가 있으면
// 그 게임의 가격으로 OG/트위터 메타·제목·JSON-LD를 서버에서 주입한다.
// 카톡·디스코드·트위터처럼 JS를 실행하지 않는 공유 봇에게도 미리보기 카드가 뜨게 하는 핵심.
// (기존 Worker/D1/크롤러는 건드리지 않음 — 이건 프런트 배포에 딸린 함수)
const API = "https://gamgap-api.ibanisac.workers.dev";

// 원화 콤마 포맷(런타임 로케일 의존 없이 안전하게 수동 처리).
const won = (n) =>
  String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const gid = url.searchParams.get("game");

  // SPA 껍데기(빌드된 index.html)
  const shell = await env.ASSETS.fetch(new URL("/index.html", url));
  if (!gid) return shell;

  let game = null;
  try {
    const r = await fetch(`${API}/api/game/${encodeURIComponent(gid)}`);
    if (r.ok) game = await r.json();
  } catch {
    /* 실패 시 메타 주입 없이 기본 껍데기 반환 */
  }
  if (!game || !game.appid) return shell;

  const onSale = Number(game.discountPercent) > 0;
  const atl = Number(game.allTimeLow) > 0 ? ` 역대최저 ${won(game.allTimeLow)}.` : "";
  const title = `${game.name} 가격 — 현재 ${won(game.currentPrice)} · Lowstamp`;
  const desc =
    `${game.name} 스팀 현재가 ${won(game.currentPrice)}${onSale ? ` (-${game.discountPercent}%)` : ""}.` +
    `${atl} 지금 사도 되는지 Lowstamp에서 확인하세요.`;
  const img = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
  const pageUrl = `${url.origin}/?game=${game.appid}`;
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: game.name,
    image: img,
    offers: {
      "@type": "Offer",
      priceCurrency: "KRW",
      price: Number(game.currentPrice) || 0,
      availability: "https://schema.org/InStock",
      url: `https://store.steampowered.com/app/${game.appid}/`,
    },
  });

  return new HTMLRewriter()
    .on("title", { element(e) { e.setInnerContent(title); } })
    .on('meta[name="description"]', { element(e) { e.setAttribute("content", desc); } })
    .on('meta[property="og:title"]', { element(e) { e.setAttribute("content", title); } })
    .on('meta[property="og:description"]', { element(e) { e.setAttribute("content", desc); } })
    .on('meta[property="og:image"]', { element(e) { e.setAttribute("content", img); } })
    .on('meta[property="og:url"]', { element(e) { e.setAttribute("content", pageUrl); } })
    .on('meta[name="twitter:title"]', { element(e) { e.setAttribute("content", title); } })
    .on('meta[name="twitter:description"]', { element(e) { e.setAttribute("content", desc); } })
    .on('meta[name="twitter:image"]', { element(e) { e.setAttribute("content", img); } })
    .on("head", {
      element(e) {
        e.append(`<script type="application/ld+json">${esc(jsonld).replace(/&quot;/g, '"')}</script>`, { html: true });
      },
    })
    .transform(shell);
}
