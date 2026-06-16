// 살아 있는 점원(Worker) 주소. 모든 데이터는 여기서 fetch.
export const API_BASE = "https://gamgap-api.ibanisac.workers.dev";

function api(path) {
  return fetch(API_BASE + path).then((r) => {
    if (!r.ok) throw new Error("API 응답 오류: " + r.status);
    return r.json();
  });
}

// 오늘 역대 최저가를 갱신한 게임들
export const getLowestToday = () => api("/api/lowest-today");
// 지금 할인 중인 게임들 (할인율 desc, 기본 60개)
export const getDeals = (limit = 60) => api("/api/deals?limit=" + limit);
// 이름 LIKE 검색
export const searchGames = (q) => api("/api/search?q=" + encodeURIComponent(q));
// 단일 게임 (긴 가격 이력 포함). 모달·찜·공유 딥링크에서 사용.
export const getGame = (appid) => api("/api/game/" + appid);
