// Cloudflare Pages 함수: 홈("/") 요청 처리.
// - 과거 공유/색인된 딥링크 형식인 "/?game=appid" 는 새 정식 주소 "/game/appid" 로
//   301(영구) 리다이렉트해 검색 평가와 공유 링크를 새 URL로 모은다.
// - 그 외엔 SPA 껍데기(index.html)를 그대로 돌려준다.
// (게임별 메타·OG 주입은 functions/game/[appid].js 가 담당. 백엔드는 건드리지 않음.)
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const gid = url.searchParams.get("game");

  if (gid && /^\d+$/.test(gid)) {
    return Response.redirect(`${url.origin}/game/${gid}`, 301);
  }

  return env.ASSETS.fetch(new URL("/index.html", url));
}
