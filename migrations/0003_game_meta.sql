-- 겜값 D1 마이그레이션 0003: games 테이블에 '언어 중립' 게임 메타데이터 컬럼 추가
-- 게임 상세 페이지의 "게임 정보" 섹션(체류 시간↑, 애드센스용)을 채우기 위함.
-- crawler.py가 기존 스팀 appdetails(cc=kr, l=koreana) 응답에서 함께 뽑아 채운다(추가 호출 없음).
--
-- ⚠ D1/SQLite는 ALTER TABLE ... ADD COLUMN 에 IF NOT EXISTS 를 못 쓴다.
--   이 파일은 '한 번만' 실행하세요. 이미 컬럼이 있으면 두 번째 실행은 에러납니다(정상).

ALTER TABLE games ADD COLUMN developer TEXT;
ALTER TABLE games ADD COLUMN release_year INTEGER;
ALTER TABLE games ADD COLUMN metacritic INTEGER DEFAULT 0;
ALTER TABLE games ADD COLUMN controller TEXT;          -- "full" | "partial" | ""
ALTER TABLE games ADD COLUMN platforms TEXT;           -- "win,mac,linux" 중 부분집합
ALTER TABLE games ADD COLUMN dlc_count INTEGER DEFAULT 0;
ALTER TABLE games ADD COLUMN langs TEXT;               -- 우리 6개 UI 언어 중 코드(예: "ko,en,ja")
ALTER TABLE games ADD COLUMN lang_count INTEGER DEFAULT 0;
