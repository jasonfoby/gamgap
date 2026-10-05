-- 0006_region_prices_discount_index.sql — 지역 할인·최저가 목록용 색인 (2026-10-06 D1 콘솔에서 직접 적용함)
-- 왜: 검색 로봇이 게임 페이지를 열 때마다 나가는 '같은 장르 할인'(/api/deals)·'최저가 목록'(/api/lowest-today)
--     지역 쿼리가 region_prices 를 통째로 훑어 한 번에 5~6천 행을 읽었다(9/28·10/3 하루 무료 한도 2배 폭주).
--     이 색인이 있으면 같은 쿼리가 정렬 없이 앞쪽 몇백 행만 읽는다(모의 실험: 할인 목록 20배·최저가 1쪽 8배 가벼움).
-- 비용: 크롤러의 region_prices 쓰기가 하루 약 4.5천 행(+9%) 늘어난다(무료 한도 10만 행 중 약 5만 → 5.4만).
-- 되돌리기: DROP INDEX idx_rp_cc_disc;  (기존 idx_region_prices_cc 는 그대로 두었다)
-- IF NOT EXISTS 라 두 번 실행해도 안전하다. DB 를 새로 만들면 이 파일도 실행할 것.
CREATE INDEX IF NOT EXISTS idx_rp_cc_disc ON region_prices(cc, discount_percent DESC, current_price ASC);
