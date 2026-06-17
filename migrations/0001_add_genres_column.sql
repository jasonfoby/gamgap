-- 겜값 D1 마이그레이션 0001: games 테이블에 장르 컬럼 추가
-- 장르는 쉼표로 구분된 한국어 장르명으로 저장한다(예: "액션,RPG,어드벤처").
-- crawler.py가 스팀 appdetails(cc=kr, l=koreana)에서 가격과 함께 뽑아 채운다.

ALTER TABLE games ADD COLUMN genres TEXT;
