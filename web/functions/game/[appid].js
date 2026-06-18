// Cloudflare Pages 함수: /game/:appid 요청에 게임 가격으로 제목·메타·canonical·OG·JSON-LD를
// 서버에서 주입한다. 카톡·디스코드·트위터·구글 등 JS 미실행 봇에게도 개별 게임 페이지가
// 독립적으로 보이고 색인되도록 하는 핵심(클라이언트 GamePage가 그릴 화면과 같은 메타).
// (기존 Worker/D1/크롤러는 건드리지 않음 — 프런트 배포에 딸린 함수)
const API = "https://gamgap-api.ibanisac.workers.dev";

// 원화 콤마 포맷(런타임 로케일 의존 없이 안전하게 수동 처리).
const won = (n) =>
  String(Math.round(Number(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "원";

const esc = (s) =>
  String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

export async function onRequest(context) {
  const { request, env, params } = context;
  const url = new URL(request.url);
  const appid = String(params.appid || "").replace(/[^0-9]/g, "");

  // SPA 껍데기(빌드된 index.html) — 봇이든 사람이든 이 위에 메타만 덮어 그린다.
  const shell = await env.ASSETS.fetch(new URL("/index.html", url));
  if (!appid) return shell;

  let game = null;
  try {
    const r = await fetch(`${API}/api/game/${encodeURIComponent(appid)}`);
    if (r.ok) game = await r.json();
  } catch {
    /* 실패 시 메타 주입 없이 기본 껍데기 반환(클라이언트가 알아서 처리) */
  }
  if (!game || !game.appid) return shell;

  const onSale = Number(game.discountPercent) > 0;
  const atl = Number(game.allTimeLow) > 0 ? ` 역대최저 ${won(game.allTimeLow)}.` : "";
  const title = `${game.name} 가격 — 현재 ${won(game.currentPrice)} · Lowstamp`;
  const desc =
    `${game.name} 스팀 현재가 ${won(game.currentPrice)}${onSale ? ` (-${game.discountPercent}%)` : ""}.` +
    `${atl} 지금 사도 되는지 Lowstamp에서 확인하세요.`;
  const img = `https://cdn.cloudflare.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
  const pageUrl = `${url.origin}/game/${game.appid}`;
  // 현재가가 없는(빈) 페이지만 색인 제외. 현재가·역대최저·판정이 있으면 게임마다 고유 정보가
  // 있으므로(얇은 자동생성 페이지가 아님), 이력이 짧아도 색인을 허용한다.
  const thin = !(Number(game.currentPrice) > 0);
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
    .on('link[rel="canonical"]', { element(e) { e.setAttribute("href", pageUrl); } })
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
        if (thin) e.append(`<meta name="robots" content="noindex,follow">`, { html: true });
      },
    })
    .transform(shell);
}
