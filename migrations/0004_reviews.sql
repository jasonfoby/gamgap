-- 0004_reviews.sql — 스팀 '종합 평가'(리뷰 등급/개수)를 games 표에 추가.
-- run ONCE (D1에 한 번만 실행). 각 줄에 ALTER 하나씩, IF NOT EXISTS 안 씀.
ALTER TABLE games ADD COLUMN review_desc TEXT;          -- English Steam desc, e.g. "Overwhelmingly Positive"
ALTER TABLE games ADD COLUMN review_total INTEGER DEFAULT 0;
ALTER TABLE games ADD COLUMN reviews_checked TEXT;      -- date (YYYY-MM-DD) we last fetched reviews; drives sparing refresh
