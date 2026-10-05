// 워커(API) 응답을 Cloudflare 캐시에 잠시 보관해, 같은 요청이 데이터베이스를 반복해서 훑지 않게 한다.
//
// 왜: 워커는 workers.dev 주소라 자체 캐시(Cache API)가 안 먹지만, 이 함수(Pages 함수)는 lowstamp.com 에서
//     돌기 때문에 먹는다. 데이터는 하루에 한 번(크롤러) 바뀌므로 몇십 분~한 시간 묵어도 문제가 없다.
//     (2026-10-06 D1 읽기 한도 경고: 검색 로봇이 같은 목록을 수천 번 요청해 하루 한도의 2배를 쓴 적이 있다.)
//
// 쓰는 법: const data = await cachedApiJson(url, 3600, context, stats?);  → 배열/객체 또는 실패 시 null.
//   · 정상(200) + 올바른 JSON 일 때만 보관한다(오류·404 는 보관하지 않아 다음 요청이 다시 시도).
//   · 캐시를 못 쓰는 환경(로컬 등)에서는 그냥 호출한다.
//   · stats({hit, miss}) 를 주면 캐시에서 준 횟수·워커를 부른 횟수를 센다(응답 헤더 X-Api-Cache 로 확인용).
//   · 캐시는 데이터센터별이라, 요청이 드문 곳에서는 여전히 한 번씩 워커를 부른다 — 그래서 TTL 을 넉넉히(1시간) 둔다.
//   · 보관 열쇠는 '내 도메인 아래의 가짜 주소'(/__apicache/…)로 만든다 — 다른 도메인 주소를 열쇠로 쓰는 것보다 확실하다.
export async function cachedApiJson(url, ttlSeconds, context, stats) {
  let cache = null;
  try {
    cache = caches.default;
  } catch {
    /* 캐시를 못 쓰는 환경 — 아래에서 그냥 호출 */
  }
  let key = null;
  try {
    const origin = new URL(context.request.url).origin;
    key = new Request(`${origin}/__apicache/${encodeURIComponent(url)}`, { method: "GET" });
  } catch {
    cache = null; // 열쇠를 못 만들면 캐시 없이 진행
  }

  if (cache) {
    try {
      const hit = await cache.match(key);
      if (hit) {
        const data = await hit.json();
        if (stats) stats.hit++;
        return data;
      }
    } catch {
      /* 읽기 실패 시 새로 받는다 */
    }
  }

  if (stats) stats.miss++;
  const r = await fetch(url);
  if (!r.ok) return null;
  const text = await r.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    return null;
  }

  if (cache) {
    const res = new Response(text, {
      headers: { "content-type": "application/json", "cache-control": `public, max-age=${ttlSeconds}` },
    });
    const put = cache.put(key, res).catch(() => {});
    try {
      context.waitUntil(put); // 응답을 막지 않고 뒤에서 보관
    } catch {
      await put;
    }
  }
  return data;
}
