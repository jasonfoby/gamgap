// 게임 가격 페이지 색인 제한 — 애드센스 3차 심사 기간 한정 조치(2026-10-06 시작).
//
// 왜: 사이트맵 2,868개 주소 중 2,682개가 같은 틀의 게임 가격 페이지(447개 게임 × 6개 언어)였다. 그런데
//     검색에서 이 페이지들의 몫은 0.1~0.3% 뿐이라(빙·네이버 실측) 얻는 건 없고, '가치 낮은 콘텐츠'로
//     두 번 반려된 사이트에는 위험만 된다. 그래서 심사 기간에는 인기 게임 150개의 영어·한국어판만 색인한다.
//
// 규칙(서버: functions/game/[appid].js·functions/sitemap.xml.js, 브라우저: src/lib/head.js 가 같이 쓴다)
//   · 목록(indexableGamesList.js)에 있는 게임 + 언어가 영어·한국어일 때만 색인·사이트맵에 올린다.
//   · 나머지 게임·언어(일·중·스·포 게임 페이지)는 화면은 그대로 보여주되 robots noindex 를 붙이고 사이트맵에서 뺀다.
//   · 가이드·홈·소개 등 글 페이지는 6개 언어 모두 그대로 색인한다.
//   · 스팀이 성적 내용 표시를 붙인 게임은 목록에서 이미 빠져 있다(scripts/build_indexable_games.py).
//
// 해제(승인 뒤 다시 넓힐 때): RESTRICT_GAME_INDEXING 을 false 로 바꾸고 푸시하면 예전 규칙으로 돌아간다
//   (리뷰 2,000개↑ 또는 메타크리틱 게임을 6개 언어로 색인, 사이트맵은 /api/appids 목록).
// 목록 갱신: python scripts/build_indexable_games.py (몇 달에 한 번이면 충분).
//
// ⚠ 이 파일은 functions/ 에서도 불러온다 — 브라우저·워커 어디서나 도는 순수 자바스크립트로만 쓸 것.
import { INDEXABLE_GAME_IDS } from "./indexableGamesList.js";

export const RESTRICT_GAME_INDEXING = true;
export const INDEXABLE_LANGS = ["en", "ko"];

const ID_SET = new Set(INDEXABLE_GAME_IDS);

// 이 게임 페이지(이 언어판)를 검색에 내보내도 되는가.
export function isIndexableGame(appid, lang) {
  return INDEXABLE_LANGS.includes(lang) && ID_SET.has(Number(appid));
}

// 사이트맵에 올릴 게임 appid 목록(제한이 켜져 있을 때).
export function indexableGameIds() {
  return INDEXABLE_GAME_IDS.slice();
}
