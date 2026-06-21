// 살아 있는 점원(Worker) 주소. 모든 데이터는 여기서 fetch.
export const API_BASE = "https://gamgap-api.ibanisac.workers.dev";

function api(path) {
  return fetch(API_BASE + path).then((r) => {
    if (!r.ok) throw new Error("API 응답 오류: " + r.status);
    return r.json();
  });
}

// 지역코드(cc) 쿼리 조각. 한국(kr)이거나 없으면 안 붙인다(=한국 원화 기본).
const ccq = (cc, joiner) => (cc && cc !== "kr" ? joiner + "cc=" + encodeURIComponent(cc) : "");

// 오늘 역대 최저가를 갱신한 게임들 (limit·offset 으로 더 보기/무한 스크롤)
export const getLowestToday = (cc, limit = 60, offset = 0) =>
  api("/api/lowest-today?limit=" + limit + "&offset=" + offset + ccq(cc, "&"));
// 지금 할인 중인 게임들 (할인율 desc · limit·offset 으로 더 보기/무한 스크롤)
export const getDeals = (limit = 60, cc, offset = 0) =>
  api("/api/deals?limit=" + limit + "&offset=" + offset + ccq(cc, "&"));
// 이름 LIKE 검색
export const searchGames = (q, cc) => api("/api/search?q=" + encodeURIComponent(q) + ccq(cc, "&"));
// 단일 게임 (긴 가격 이력 포함). 모달·찜·공유 딥링크에서 사용.
export const getGame = (appid, cc) => api("/api/game/" + appid + ccq(cc, "?"));
