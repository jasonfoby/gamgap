-- 0005_localized_names.sql — 검색용 '언어별 게임 제목'을 games 표에 추가.
-- run ONCE (D1에 한 번만 실행). 각 줄에 ALTER 하나씩.
-- 한국어 제목은 기존 games.name(크롤러가 l=koreana 로 받음)이 담당하고,
-- 아래 5개는 영어·일본어·중국어 간체·스페인어·포르투갈어 제목(크롤러가 드물게 backfill).
-- 검색(worker /api/search)이 이 칸들을 함께 뒤져 "巫师"·"ウィッチャー"로 쳐도 같은 게임을 찾게 한다.
ALTER TABLE games ADD COLUMN name_en TEXT DEFAULT '';
ALTER TABLE games ADD COLUMN name_ja TEXT DEFAULT '';
ALTER TABLE games ADD COLUMN name_zh TEXT DEFAULT '';
ALTER TABLE games ADD COLUMN name_es TEXT DEFAULT '';
ALTER TABLE games ADD COLUMN name_pt TEXT DEFAULT '';
ALTER TABLE games ADD COLUMN names_checked TEXT DEFAULT '';  -- 제목을 받은 날(YYYY-MM-DD). 비어있으면 아직 안 받음 → backfill 대상
