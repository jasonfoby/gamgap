# 장르 필터 — 백엔드 적용 가이드

장르 필터를 켜려면 **DB · 크롤러 · 워커** 세 곳이 맞물려야 합니다. 프런트(웹)는 이미 준비돼 있고,
API 응답에 `genres`가 들어오는 순간 자동으로 장르 필터가 노출됩니다(없으면 숨김).

순서대로 적용하세요.

## 1. DB: `genres` 컬럼 추가 (한 번만)

`migrations/0001_add_genres_column.sql` 의 SQL을 D1 `gamgap`에 실행합니다.

wrangler가 있으면:

```bash
wrangler d1 execute gamgap --remote --file=./migrations/0001_add_genres_column.sql
```

또는 Cloudflare API로(크롤러가 쓰는 것과 같은 토큰):

```bash
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT_ID/d1/database/$CF_DATABASE_ID/query" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  --data '{"sql":"ALTER TABLE games ADD COLUMN genres TEXT;"}'
```

## 2. 크롤러: 이미 반영됨 ✅

`crawler.py`가 `appdetails`에서 장르를 뽑아 `genres` 컬럼에 저장하도록 수정돼 있습니다
(가격을 묻는 같은 응답에서 추출 — 추가 호출 없음). 다음 일일 크롤이 돌면 장르가 채워집니다.
바로 채우고 싶으면 GitHub Actions의 crawl 워크플로를 수동 실행하세요.

## 3. 워커: API 응답에 `genres` 포함 (소스가 레포에 없어 직접 수정 필요)

워커(`gamgap-api`)의 각 쿼리에서 `genres` 컬럼을 함께 SELECT하고 응답 객체에 넣으면 됩니다.
다른 필드(normalPrice 등)를 만드는 매핑 부분에 아래 한 줄을 더하면 끝입니다.

- **SELECT**: `games`에서 컬럼을 고르는 모든 쿼리(`/api/deals`, `/api/lowest-today`, `/api/search`,
  `/api/game/:appid`)에 `genres`를 추가. 예) `SELECT appid, name, ..., is_low_today, genres FROM games ...`
  - `SELECT *`를 쓰고 있다면 SELECT는 그대로 두고 매핑만 추가하면 됩니다.
- **응답 매핑**: 행을 JSON으로 바꿀 때 다음을 추가.

  ```js
  // row.genres 는 "액션,RPG,어드벤처" 같은 쉼표 문자열(없으면 null)
  genres: row.genres ? row.genres.split(",") : [],
  ```

  > 프런트는 `genres`가 **배열이든 쉼표 문자열이든** 모두 처리하므로(`gameGenres()` 정규화),
  > 굳이 split 하지 않고 `genres: row.genres` 로 문자열을 그대로 넘겨도 동작합니다.

수정 후 워커를 재배포하세요.

## 4. 확인

```bash
curl -s "https://gamgap-api.ibanisac.workers.dev/api/deals?limit=1" | python -m json.tool
```

응답에 `genres`가 보이고 값이 차 있으면(다음 크롤 이후) 웹의 "할인 중" 탭 좌측 필터에
**장르 칩**이 자동으로 나타납니다.
