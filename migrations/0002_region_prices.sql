-- 0002: 나라별(지역) 가격 테이블.
-- 한국(cc=kr)은 기존 games/price_history 를 그대로 쓰고, 그 외 지역(미국 등)만 여기에 저장한다.
-- 한국 데이터/기존 API는 전혀 건드리지 않는다(추가 테이블만 생성).
--
-- 가격 정수 표기: 스팀 price_overview 의 원시 정수를 그대로 저장한다(주요 단위 ×100).
--   예) $59.99 → 5999, ¥5980 → 598000, ₩62,000 → 6200000.
--   화면에 보일 땐 /100 한 뒤 currency(예: "USD")로 통화 포맷한다.
--   (한국 games 테이블은 이미 ÷100 된 원화 정수라 표기 규칙이 다름 — Worker가 통일해 내려줌.)

CREATE TABLE IF NOT EXISTS region_prices (
  appid             INTEGER NOT NULL,
  cc                TEXT    NOT NULL,            -- 지역 코드: 'us', 'jp' ...
  name              TEXT,                        -- 해당 지역 언어 게임명(예: 영어명)
  currency          TEXT,                        -- 'USD','JPY' ... (price_overview.currency)
  normal_price      INTEGER,                     -- 정가(원시 ×100)
  current_price     INTEGER,                     -- 현재가(원시 ×100)
  discount_percent  INTEGER DEFAULT 0,
  all_time_low      INTEGER,                     -- 역대최저(원시 ×100)
  all_time_low_date TEXT,
  is_low_today      INTEGER DEFAULT 0,
  last_checked      TEXT,
  PRIMARY KEY (appid, cc)
);

CREATE TABLE IF NOT EXISTS region_price_history (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  appid            INTEGER NOT NULL,
  cc               TEXT    NOT NULL,
  price            INTEGER,                       -- 원시 ×100
  discount_percent INTEGER,
  recorded_at      TEXT
);

CREATE INDEX IF NOT EXISTS idx_region_prices_cc ON region_prices(cc);
CREATE INDEX IF NOT EXISTS idx_region_hist_appid_cc ON region_price_history(appid, cc);
