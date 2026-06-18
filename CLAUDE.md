# 겜값 (gamgap) — 프로젝트 안내 (for Claude Code)

스팀 게임의 **현재 원화 가격 · 역대 최저가 · "지금 사도 되나" 판정**을 한 화면에서 보여주는, 한국어 게임 가격 추적 서비스입니다. 백엔드는 Cloudflare에 배포돼 작동 중이고, **프런트엔드는 `web/` 폴더에 Vite + React 앱으로 구현 완료**되어 있습니다(아래 "현재 상태" 참고). 지금 남은 일은 주로 **실제 도메인 배포 + 구글 애드센스 심사 준비 마무리**입니다(아래 "해야 할 일").

전부 무료 환경(도메인 제외)에서 돌아갑니다. 한국어 사용자 대상, 코드 주석/문구는 한국어가 기본입니다.

## 이미 만들어져 작동 중인 것 (건드리지 말 것, 참고만)

- **DB — Cloudflare D1 `gamgap`**: 표 두 개.
  - `games`: appid(PK), name, normal_price, current_price, discount_percent, all_time_low, all_time_low_date, is_low_today, last_checked, (genres)
  - `price_history`: id(PK), appid, price, discount_percent, recorded_at  *(가격이 '바뀐 날만' 기록 — change-only)*
- **API — Cloudflare Worker `gamgap-api`**: `https://gamgap-api.ibanisac.workers.dev`
  - `GET /api/search?q=` — 이름 LIKE 검색
  - `GET /api/lowest-today` — 오늘 역대최저 갱신 게임
  - `GET /api/deals?limit=` — 현재 할인 중 게임(할인율 desc), 기본 60 *(프런트는 120으로 호출)*
  - `GET /api/game/:appid` — 단일 게임(긴 이력 포함)
  - D1 바인딩 변수명은 `DB`. CORS는 `*` 허용. 코드는 레포의 `worker.js` 참고.
- **수집 — GitHub Actions (`.github/workflows/crawl.yml` → `crawler.py`)**: 매일 1회.
  - CheapShark에서 '지금 스팀 할인 중인 게임'을 좋은 순으로 받아 + 기존 추적분과 합쳐 최대 3000개를, 스팀 `appdetails?cc=kr`로 원화 가격을 직접 물어 D1에 change-only 저장.
  - GitHub Secrets: `CF_ACCOUNT_ID`, `CF_DATABASE_ID`, `CF_API_TOKEN`. **시크릿/토큰을 코드나 깃에 절대 커밋하지 말 것.**

## API가 돌려주는 game 객체 모양 (프런트가 이 모양을 그대로 씀)

```json
{
  "appid": 1091500, "name": "사이버펑크 2077",
  "normalPrice": 66000, "currentPrice": 19800, "discountPercent": 70,
  "allTimeLow": 16500, "allTimeLowDate": "2024-11-xx", "isLowToday": 0,
  "genres": "액션,RPG",
  "history": [ { "d": "2024-11", "p": 19800 }, ... ]
}
```
가격은 모두 **원(KRW) 정수**. 화면에선 `toLocaleString('ko-KR')`(`src/lib/format.js`의 `won`)로 표시. `genres`는 쉼표 문자열 또는 배열(둘 다 `src/lib/dealSort.js`의 `gameGenres`가 정규화).

## 현재 상태 (구현 완료, 위치: `web/`)

Vite + React 18(순수 JS/JSX). **추가 런타임 의존성 없음** — 차트는 손수 SVG, 라우팅은 자체 경량 라우터(`src/lib/router.jsx`). `API_BASE`는 `src/api.js`.

**배포**: Cloudflare Pages — 루트 디렉터리 **`web`**, 빌드 `npm run build`, 출력 `dist`, 프레임워크 Vite. `web/functions/`의 Pages 함수가 함께 배포됨.

구현된 기능:
- **홈(`/`)**: 탭(오늘의 최저가 / 할인 중 / 내 찜) + 상단·히어로 검색(250ms 디바운스). 포스터형 카드(스팀 헤더 이미지, 없으면 이름 기반 그라데이션 폴백), "지금 사도 돼?" 도장, 찜 별 오버레이.
- **정렬·필터(할인 중 탭)**: 정렬(할인율/현재가/역대최저 근접/정가) · 가격 프리셋+슬라이더 · "역대최저만/50%+" 토글 · **장르 칩**(genres 데이터 기반). 결과 위 **적용 필터 칩(삭제·전체해제)**. 데스크탑은 사이드바 상주, 모바일은 "필터·정렬" 버튼으로 접이식. (`DealControls`, `Sidebar`, `lib/dealSort.js`, `lib/filterUi.js`)
- **찜(위시리스트)**: `localStorage`(`lib/wishlist.js`)에 appid 저장 → `/api/game/:appid`로 최신가 재조회, "찜한 N개 중 M개가 지금 살 때" 요약.
- **상세 모달**: 가격 흐름 차트(기간 프리셋·hover 툴팁·★마커, `PriceChart`), 2단 가격헤더, 가격 통계·이전 저점(`lib/stats.js`), 스팀/SteamDB/링크복사, 포커스 트랩(`lib/focusTrap.js`).
- **공유·SEO**: `?game=appid` 딥링크, 게임별 동적 제목/OG/JSON-LD(클라이언트 `lib/head.js` + JS 미실행 봇용 서버 주입 `functions/index.js`), 동적 `functions/sitemap.xml.js`, `public/robots.txt`.
- **체감 품질**: 스켈레톤 로더(`Skeleton`), 에러 시 "다시 시도" 버튼, `preconnect`, `public/_headers`(에셋 캐시 + 보안 헤더).
- **라우팅·콘텐츠(애드센스 대비)**: 자체 라우터로 `/guide`, `/guide/:slug`, `/privacy`, `/terms`, `/about`, `/contact`, 404. 가이드 글 **8편**(`src/content/guides/*.js`) + 법적/정보 4종(`src/content/pages/*.js`)을 `ArticleBody`/`PageShell`로 렌더(`src/pages/`).
- **광고·동의·분석**: 쿠키 동의 배너(`CookieConsent`), `index.html`의 AdSense 스니펫(플레이스홀더), `public/ads.txt`(플레이스홀더), 개인정보처리방침에 애드센스 고지 포함, Cloudflare Web Analytics 비콘(플레이스홀더 토큰) + `lib/analytics.js`.

## 해야 할 일 (TODO)

**배포 전 필수 (대부분 사용자가 직접 — 플레이스홀더 교체):**
- [ ] Cloudflare Pages에 저장소 연결(루트 `web`) + **실제 도메인 연결**해 라이브화.
- [ ] `web/index.html`의 `canonical`·`og:url`, `web/public/robots.txt`의 `Sitemap:` 줄을 **실제 도메인**으로 교체(현재 임시 `gamgap.pages.dev`).
- [ ] `web/index.html`의 AdSense `ca-pub-XXXXXXXXXXXXXXXX`를 애드센스 발급 코드로 교체.
- [ ] `web/public/ads.txt`의 `pub-0000…`을 본인 게시자 ID로 교체.
- [ ] `web/index.html`의 Cloudflare Web Analytics `REPLACE_WITH_YOUR_CF_TOKEN` 교체.
- [ ] 배포 후 `/privacy`·`/sitemap.xml`·`/robots.txt`·`/guide` 접근 확인 → 구글 Search Console에 사이트맵 제출 → **애드센스 심사 요청**.

**품질·확장 (선택, 심사 블로커 아님):**
- [ ] 라우트별 OG 서버 주입(가이드·법적 페이지의 카톡/소셜 미리보기) — `functions/`에 경로 추가.
- [ ] PNG 앱 아이콘 + 홈 대표 OG 이미지(현재 `favicon.svg`만, `og:image` 기본 빈값).
- [ ] **가이드 글 주기적 추가**(통과·유지에 가장 효과적). 새 글 추가 시 `web/functions/sitemap.xml.js`의 `GUIDE_PATHS` 배열도 갱신할 것(함수 런타임은 `import.meta.glob` 불가).
- [ ] (백엔드 영역) 검색 한글↔영문 저장명 불일치 개선.

## 디자인 토큰 (영수증/가격 장부 컨셉 — 유지할 것)

전체 토큰은 `web/src/index.css`의 `:root` 참고. 핵심: 배경 ink `#0F1320`, 상단바 `#161B2B`, 패널 `#171D2E`, 카드(영수증 종이) `#F4F1E8`, 괘선 `#E2DBC9`, 종이 위 글자 `#1C1B17`, 흐린 글자 `#8C8674`, 강조 금색 `#C8912B`.
- 한글 폰트: `'Apple SD Gothic Neo','Pretendard','Malgun Gothic','Noto Sans KR',sans-serif`. 가격 숫자는 고정폭(monospace).
- 시그니처: "지금 사도 돼?" 판정을 영수증 도장(살짝 기운 스탬프)으로, 역대 최저가는 금색 ★.
- 새 컴포넌트는 같은 이름의 `.css`를 만들어 import(전역 `index.css`는 공용 토큰·레이아웃 위주).

## 주의사항

- 백엔드(Worker/D1/크롤러)와 `src/api.js`·`src/lib/verdict.js` 등 핵심 로직은 건드리지 말 것.
- **그래프는 recharts 안 씀** — 손수 SVG(`PriceChart`/`Sparkline`). **아이콘도 lucide 안 씀** — 인라인 SVG. (불필요한 의존성 추가 지양.)
- **`localStorage` 사용함**(찜·쿠키 동의 기억). 과거 "localStorage 불필요" 지침은 폐기됨.
- 가격 단위: 스팀 정수는 보통 1/100. `crawler.py`의 `PRICE_DIVISOR`가 원화 스케일을 맞춤(현재 100). 카드 가격이 100배로 보이면 이 값을 1로.
- D1 무료: 저장 5GB, 하루 쓰기 10만/읽기 500만. change-only라 여유 큼. 스팀은 5분에 200회 제한 → 크롤러는 호출 사이 0.7초 대기.
- 새 가이드 글 추가 시 `functions/sitemap.xml.js`의 `GUIDE_PATHS` 갱신을 잊지 말 것.
