// 스팀이 한국어(l=koreana)로 준 장르명을, 표시용 i18n 키로 매핑한다.
// 백엔드 데이터(games.genres)는 한국어 장르명 그대로라(예: "액션,RPG"),
// 비한국어 UI에서 번역해 보여주기 위해 여기서 키로 바꾼다(백엔드는 안 건드림).
// 매핑에 없는 장르는 genreKey()가 null → 호출부에서 원문(한국어)을 그대로 표시(안전한 폴백).
const KEY_BY_KO = {
  "액션": "genre.action",
  "어드벤처": "genre.adventure",
  "인디": "genre.indie",
  "전략": "genre.strategy",
  "롤플레잉": "genre.rpg",
  RPG: "genre.rpg",
  "시뮬레이션": "genre.simulation",
  "캐주얼": "genre.casual",
  "레이싱": "genre.racing",
  "스포츠": "genre.sports",
  "대규모 멀티플레이어": "genre.mmo",
  "무료 플레이": "genre.f2p",
  "앞서 해보기": "genre.earlyaccess",
  "유틸리티": "genre.utilities",
  "고어": "genre.gore",
  "폭력적": "genre.violent",
  "폭력": "genre.violent",
  "성인 전용 콘텐츠": "genre.sexual",
};

// 한국어 장르명 → i18n 키. 매핑에 없으면 null(원문 표시).
export function genreKey(koGenre) {
  return KEY_BY_KO[String(koGenre || "").trim()] || null;
}
