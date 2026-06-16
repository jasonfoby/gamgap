# 겜값 (gamgap) — 프로젝트 안내 (for Claude Code)

스팀 게임의 **현재 원화 가격 · 역대 최저가 · "지금 사도 되나" 판정**을 한 화면에서 보여주는, 한국어 게임 가격 추적 서비스입니다. 백엔드는 이미 Cloudflare에 배포되어 작동 중이고, **지금 할 일은 프런트엔드(화면)를 React로 다시 만들어 Cloudflare Pages에 배포하는 것**입니다.

전부 무료 환경(도메인 제외)에서 돌아갑니다. 한국어 사용자를 대상으로 하며, 코드 주석/문구는 한국어가 기본입니다.

## 이미 만들어져 작동 중인 것 (건드리지 말 것, 참고만)

- **DB — Cloudflare D1 `gamgap`**: 표 두 개.
  - `games`: appid(PK), name, normal_price, current_price, discount_percent, all_time_low, all_time_low_date, is_low_today, last_checked
  - `price_history`: id(PK), appid, price, discount_percent, recorded_at  *(가격이 '바뀐 날만' 기록 — change-only)*
- **API — Cloudflare Worker `gamgap-api`**: `https://gamgap-api.ibanisac.workers.dev`
  - `GET /api/search?q=` — 이름 LIKE 검색
  - `GET /api/lowest-today` — 오늘 역대최저 갱신 게임
  - `GET /api/deals?limit=` — 현재 할인 중 게임(할인율 desc), 기본 60
  - `GET /api/game/:appid` — 단일 게임(긴 이력 포함)
  - D1 바인딩 변수명은 `DB`. CORS는 `*` 허용. 코드는 레포의 `worker.js` 참고.
- **수집 — GitHub Actions (`.github/workflows/crawl.yml` → `crawler.py`)**: 매일 1회.
  - CheapShark(`/api/1.0/deals?storeID=1&onSale=1&sortBy=Deal Rating`)에서 '지금 스팀 할인 중인 게임'을 좋은 순으로 받아 + 기존 추적분과 합쳐 최대 3000개를, 스팀 `appdetails?cc=kr`로 원화 가격을 직접 물어 D1에 change-only 저장.
  - GitHub Secrets: `CF_ACCOUNT_ID`, `CF_DATABASE_ID`, `CF_API_TOKEN`. **시크릿/토큰을 코드나 깃에 절대 커밋하지 말 것.**

## API가 돌려주는 game 객체 모양 (프런트가 이 모양을 그대로 씀)

```json
{
  "appid": 1091500, "name": "사이버펑크 2077",
  "normalPrice": 66000, "currentPrice": 19800, "discountPercent": 70,
  "allTimeLow": 16500, "allTimeLowDate": "2024-11-xx", "isLowToday": 0,
  "history": [ { "d": "2024-11", "p": 19800 }, ... ]
}
```
가격은 모두 **원(KRW) 정수**. 화면에선 `toLocaleString('ko-KR')`로 표시.

## 지금 할 일 (프런트엔드)

레포 루트의 **`index.html`** 이 현재 작동 중인 화면입니다(빌드 없는 단일 HTML, Worker에 연결됨). **이 화면의 디자인과 기능을 그대로 React(Vite) 앱으로 옮기고** Cloudflare Pages에 배포하는 것이 목표입니다.

- Vite + React로 스캐폴딩. `API_BASE` 상수에 `https://gamgap-api.ibanisac.workers.dev` 를 두고 거기서 fetch.
- 화면 구성: 상단 검색 → 첫 화면은 "오늘 역대 최저가"(`/api/lowest-today`) + "지금 할인 중인 게임"(`/api/deals`). 검색 시 `/api/search`. 카드 클릭 → 상세 모달(가격 흐름 그래프 + 정가/현재가/역대최저 + "지금 사도 돼?" 판정 + 스팀 링크).
- "지금 사도 돼?" 판정 로직(현재가 vs 역대최저 비교)과 디자인을 `index.html`에서 그대로 가져올 것.
- 그래프는 recharts 사용 가능(이미 의존성으로 둘 수 있음). 아이콘은 lucide-react.
- Cloudflare Pages 빌드 설정: 빌드 명령 `npm run build`, 출력 디렉터리 `dist`, 프레임워크 Vite.

## 디자인 토큰 (영수증/가격 장부 컨셉 — 유지할 것)

- 배경 ink `#0F1320`, 상단바 `#161B2B`, 카드(영수증 종이) `#F4F1E8`, 괘선 `#E2DBC9`, 종이 위 글자 `#1C1B17`, 흐린 글자 `#8C8674`, 강조 금색(역대최저 도장) `#C8912B`.
- 한글 폰트 스택: `'Apple SD Gothic Neo','Pretendard','Malgun Gothic','Noto Sans KR',sans-serif`.
- 가격 숫자는 고정폭(monospace)로 — 금전출납기 느낌.
- 시그니처: 각 게임의 "지금 사도 돼?" 판정을 영수증 도장(살짝 기운 스탬프)으로 표시. 역대 최저가는 금색 ★ 도장.

## 주의사항

- 스팀은 5분에 200회 제한 → 크롤러는 호출 사이 0.7초 대기(이미 반영됨).
- 가격 단위: 스팀 정수는 보통 1/100(예 1099=$10.99). `crawler.py`의 `PRICE_DIVISOR`가 원화 스케일을 맞춤(현재 100). 카드 가격이 100배로 보이면 이 값을 1로.
- D1 무료: 저장 5GB, 하루 쓰기 10만/읽기 500만 줄. change-only라 여유 큼.
- 브라우저 localStorage 같은 건 불필요. 상태는 React state로.
