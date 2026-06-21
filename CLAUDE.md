# 답변 방식 규칙 (항상 적용 — 이 프로젝트의 모든 답변에 우선)

이 프로젝트에서 사용자에게 답할 때는 **매 세션마다 항상** 아래 방식을 지킨다.

1. **어려운 전문 용어는 최대한 쓰지 않는다.** 누구나 알아들을 수 있는 쉬운 일상어로 설명한다.
2. 전문 용어를 꼭 써야 할 때는, 바로 뒤에 쉬운 말로 풀어서 다시 설명한다.
3. 개념을 설명할 때는 **"예를 들어..."** 처럼 실제 예시나 비유를 들어 이해하기 쉽게 한다.
4. 정확한 용어보다 **비유와 예시**를 우선한다.
5. **리스트(불릿·번호)와 테이블은 최대한 쓰지 않는다.** 자연스러운 대화체 산문으로, 이어지는 문장으로 풀어쓴다. 표나 목록이 정말 필요한 예외적인 경우에만 쓰되, 앞뒤를 산문으로 감싼다.
6. 이 규칙은 코드 설명뿐 아니라 **모든 답변**에 적용한다.

> 예시: "이건 캐시(임시 저장 공간)에 담아둡니다. 예를 들어, 자주 보는 책을 책장 깊숙이 두지 않고 책상 위에 올려두는 것과 같아요."

---

# Lowstamp (구 "겜값" / 백엔드 내부명 gamgap) — 프로젝트 안내 (for Claude Code)

스팀 게임의 **현재 원화 가격 · 역대 최저가 · "지금 사도 되나" 판정**을 한 화면에서 보여주는 게임 가격 추적 서비스입니다. **표시 브랜드는 `Lowstamp`, 도메인은 `lowstamp.com`(Cloudflare Registrar)로 라이브 중**입니다. 백엔드(Worker/D1/크롤러)는 내부적으로 여전히 `gamgap` 이름을 쓰며 건드리지 않습니다 — 화면에 보이던 "겜값"만 Lowstamp로 바꿨습니다.

프런트엔드는 `web/` 폴더의 Vite + React 앱으로 **Cloudflare Pages에 배포돼 lowstamp.com에서 작동 중**입니다. **한국어 외 영어·일본어·중국어 간체·스페인어·포르투갈어까지 6개 언어**를 지원합니다(아래 "현재 상태"). 남은 일은 주로 **구글 애드센스 심사 마무리 + 트래픽 성장**입니다(아래 "해야 할 일").

전부 무료 환경(도메인 제외)에서 돌아갑니다. 데이터(가격)는 한국 스팀 원화 기준이고, 코드 주석은 한국어가 기본입니다.

## 이미 만들어져 작동 중인 것 (건드리지 말 것, 참고만)

- **DB — Cloudflare D1 `gamgap`**: 표 두 개.
  - `games`: appid(PK), name, normal_price, current_price, discount_percent, all_time_low, all_time_low_date, is_low_today, last_checked, (genres)
  - `price_history`: id(PK), appid, price, discount_percent, recorded_at  *(가격이 '바뀐 날만' 기록 — change-only)*
  - `region_prices`(appid,cc PK) · `region_price_history`: 한국 외 지역(us·jp·cn·es·br) 가격. 스팀 원시 ×100 정수로 저장(표기는 /100 + 통화). 한국 games/price_history는 그대로 두고 추가된 표.
- **API — Cloudflare Worker `gamgap-api`**: `https://gamgap-api.ibanisac.workers.dev`
  - `GET /api/search?q=` — 이름 LIKE 검색
  - `GET /api/lowest-today` — 오늘 역대최저 갱신 게임
  - `GET /api/deals?limit=` — 현재 할인 중 게임(할인율 desc), 기본 60 *(프런트는 120으로 호출)*
  - `GET /api/game/:appid` — 단일 게임(긴 이력 포함)
  - D1 바인딩 변수명은 `DB`. CORS는 `*` 허용. 코드는 레포의 `worker.js` 참고.
- **수집 — GitHub Actions (`.github/workflows/crawl.yml` → `crawler.py`)**: 매일 1회.
  - CheapShark에서 '지금 스팀 할인 중인 게임'을 좋은 순으로 받아 + 기존 추적분과 합쳐 최대 3000개를, 스팀 `appdetails?cc=kr`로 원화 가격을 직접 물어 D1에 change-only 저장. 상위 `REGION_MAX`(기본 900)개는 해외 지역(us·jp·cn·es·br) 가격도 함께 물어 region 테이블에 저장.
  - **성능**: 시작 시 games·region_prices 직전 상태를 일괄 선로드(게임당 SELECT 제거), 쓰기는 `{"batch":[...]}`로 묶어 라운드트립 절감. 스팀 호출 간격은 `STEAM_SLEEP`(기본 1.0초, 5분 200회 제한 안전 마진).
  - GitHub Secrets: `CF_ACCOUNT_ID`, `CF_DATABASE_ID`, `CF_API_TOKEN`. **시크릿/토큰을 코드나 깃에 절대 커밋하지 말 것.** (저장소가 공개라 더더욱 — 비밀은 GitHub Secrets에만.)

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
기본(한국) game 객체 가격은 **원(KRW) 정수**. **워커에 `?cc=us`(jp·cn·es·br) 를 주면 해당 지역 가격**을 `currency` 필드와 함께 같은 모양으로 돌려준다(region 테이블). 또 `developer·release_year(releaseYear)·metacritic·controller·platforms·dlc_count(dlcCount)·langs·lang_count(langCount)`(게임 정보)와 `review_desc(reviewDesc)·review_total(reviewTotal)`(스팀 평가)도 함께 내려준다. 화면 표기는 `src/lib/format.js`의 `won`/`money`가 통화에 맞춰 처리(한국어 `62,000원`, 그 외 `₩62,000`·`$59.99` 등). `genres`는 쉼표 문자열/배열(`src/lib/dealSort.js`의 `gameGenres`가 정규화, `lib/genres.js`가 번역).

## 현재 상태 (구현 완료, 위치: `web/`)

Vite + React 18(순수 JS/JSX). **추가 런타임 의존성 없음** — 차트는 손수 SVG, 라우팅은 자체 경량 라우터(`src/lib/router.jsx`). `API_BASE`는 `src/api.js`.

**배포**: Cloudflare Pages — 루트 디렉터리 **`web`**, 빌드 `npm run build`, 출력 `dist`, 프레임워크 Vite. `web/functions/`의 Pages 함수가 함께 배포됨. **GitHub 저장소 `jasonfoby/gamgap`의 main 브랜치에 푸시하면 Cloudflare가 자동으로 다시 빌드·배포**(커스텀 도메인 lowstamp.com). 배포 후 옛 화면이 보이면 보통 브라우저 캐시 → 강력 새로고침(Ctrl+Shift+R).

구현된 기능:
- **홈(`/`)**: 탭(오늘의 최저가 / 할인 중 / 내 찜) + 상단·히어로 검색(250ms 디바운스). 포스터형 카드(스팀 헤더 이미지, 없으면 이름 기반 그라데이션 폴백), "지금 사도 돼?" 도장, 찜 별 오버레이.
- **정렬·필터(할인 중 탭)**: 정렬(할인율/현재가/역대최저 근접/정가) · 가격 프리셋+슬라이더 · "역대최저만/50%+" 토글 · **장르 칩**(genres 데이터 기반). 결과 위 **적용 필터 칩(삭제·전체해제)**. 데스크탑은 사이드바 상주, 모바일은 "필터·정렬" 버튼으로 접이식. (`DealControls`, `Sidebar`, `lib/dealSort.js`, `lib/filterUi.js`)
- **찜(위시리스트)**: `localStorage`(`lib/wishlist.js`)에 appid 저장 → `/api/game/:appid`로 최신가 재조회, "찜한 N개 중 M개가 지금 살 때" 요약.
- **개별 게임 페이지(`/game/:appid`)**: 모달을 대체한 **색인 가능한 실제 페이지**(`src/pages/GamePage.jsx`). 가격 흐름 차트(`PriceChart`, 이력 2점 이상일 때만), 2단 가격헤더 + "한국 스팀 기준" 라벨, 판정, 검색에 읽히는 고유 본문 문단, 가격 통계·이전 저점(`lib/stats.js`), 스팀/SteamDB/링크복사. 카드 클릭 시 `navigate("/game/:appid")`로 이동.
- **게임 페이지 SEO**: 페이지마다 고유 canonical(`lib/head.js`), 봇용 서버 메타·**본문·JSON-LD를 방문자 언어/통화에 맞춰 주입**(`functions/game/[appid].js` — Accept-Language로 언어·지역·통화 선택), 옛 `/?game=appid`는 301로 `/game/:appid`에 합침(`functions/index.js`), `functions/sitemap.xml.js`도 `/game/:appid` 사용. **가이드·법적 페이지(`/guide`·`/privacy` 등)도 자기 canonical + 본문을 봇에 주입**(`functions/_shared/content.js` + 라우트별 함수). 현재가 없는/없는 게임은 **HTTP 404 + noindex**(소프트 404 방지).
- **다국어(i18n) — 6개 언어(ko·en·ja·zh·es·pt)**: 자체 경량 엔진(`src/lib/i18n.jsx` + 언어별 사전 `src/i18n/<lang>.js`, 새 라이브러리 없음). `useT()`의 `t("키", {vars})`·`tNodes`로 렌더. 헤더·콘텐츠 페이지에 언어 전환 버튼(`LanguageSwitcher`), 브라우저 언어 자동 감지 + `localStorage`(`lowstamp:lang`) 저장, `<html lang>` 반영. **판정 문구는 `verdict.js`의 단계(tier)만 쓰고 표시 문구는 사전에서**(로직 불변). **기본 UI 언어는 영어(`DEFAULT_LANG="en"`)**, 한국어는 폴백 소스. **가격은 언어별 지역 통화로 표시** — 한국어 원화, 그 외 언어는 해당 지역 통화(en→USD·ja→JPY·zh→CNY·es→EUR·pt→BRL, `lib/region.js`가 언어→cc 매핑). 해외 데이터 없는 게임(상위 `REGION_MAX` 밖)은 원화로 폴백.
- **콘텐츠 다국어**: 가이드 **16편**·법적 4종을 `src/content/<guides|pages>/<lang>/<slug>.js`로 6개 언어 분리, 로더(`content/guides.js`·`content/pages.js`)가 **지연 로딩**으로 현재 언어 글만 가져옴(없으면 영어→한국어 폴백 / 메인 번들 경량 유지).
- **다지역 가격·게임정보·스팀평가(최근 추가)**: 언어별로 그 지역 스팀 가격을 통화까지 맞춰 표시(워커 `?cc=`). 게임 상세에 **게임 정보** 섹션(개발사·출시연도·메타크리틱·컨트롤러·플랫폼·DLC·지원언어 — `appdetails`에서 함께 수집) + **스팀 종합 평가** 배지(압도적 긍정적 등 9단계, `lib/reviews.js` 라벨 매핑, 카드+상세). 히어로 인기 칩은 **'지금 할인 중 + 리뷰 많은 유명작'** 동적 선정(`popularPicks`, 리뷰 5천+ 기준, 로딩 중 스켈레톤).
- **체감 품질**: 스켈레톤 로더(`Skeleton`), 에러 시 "다시 시도" 버튼, `preconnect`, `public/_headers`(에셋 캐시 + 보안 헤더).
- **라우팅(애드센스 대비)**: 자체 라우터(`src/lib/router.jsx`)로 `/`, `/game/:appid`, `/guide`, `/guide/:slug`, `/privacy`, `/terms`, `/about`, `/contact`, 404(`src/Root.jsx`에서 분기). 콘텐츠는 `ArticleBody`/`PageShell`로 렌더(`src/pages/`). 콘텐츠 페이지(`ContentPage`)는 slug만 받고 언어별 데이터를 직접 로드.
- **광고·동의·분석**: 쿠키 동의 배너(`CookieConsent`)가 **Google 동의 모드 v2**(`lib/consent.js`)와 연동(동의 전 광고 쿠키 거부, 기본 denied). `index.html`에 **실제 게시자 ID `ca-pub-6033148215263757`** 애드센스 스니펫 + 소유권 메타, `public/ads.txt`도 **실제 ID**, 개인정보처리방침에 애드센스/DART 쿠키 고지. 방문자 분석은 **Cloudflare Web Analytics 자동 설정**(엣지 주입 — 페이지에 비콘 스니펫 없음).

## 해야 할 일 (TODO)

**완료됨 (개발·애드센스 준비 — 사실상 완성)**: Lowstamp 리브랜딩·lowstamp.com 라이브(SSL), 개별 게임 페이지(`/game/:appid`) 색인화, 6개 언어 다국어, Search Console+사이트맵, **쿠키 동의→Google 동의 모드 v2**, **실제 애드센스 게시자 ID·ads.txt 라이브**, **언어별 OG 공유 이미지**, **봇용 SSR**(게임·가이드·법적 페이지 본문/자기 canonical/404), **기본 영어화**, **다지역 가격(USD·JPY 등)**, **게임 상세 정보(#3a)·스팀 평가(#3b)·동적 인기칩(#2)**, 현지 자연스러운 문구, 화폐 표기 모순 수정, 가이드 8→15편, Cloudflare Web Analytics(자동), 저장소 공개 전환 + 크롤러 D1 최적화(선로드+batch).

**남은 일 — 심사/승인:**
- [ ] 구글 애드센스 **검토 요청(Request review)** 제출 → 결과 대기(보통 며칠~2주). 거절 시 적힌 사유만 보정.
- [ ] (승인 후) 유럽(EEA) 맞춤광고용 **Google 인증 CMP**(동의 도구) 켜기 — 승인 블로커 아님, 한국 중심이라 후순위.

**성장(트래픽·수익) — 심사 블로커 아님:**
- [ ] 한글↔영문 검색 별칭("사이버펑크"→"Cyberpunk 2077"). 별칭/현지화 이름 layer.
- [ ] 네이버/커뮤니티 채널(아카라이브·펨코·루리웹·레딧 등)에 주간 "오늘의 역대최저가" → 백링크·직접 방문.
- [ ] 공식 리셀러 제휴(어필리에이트) 링크 — 광고 외 둘째 수익원.
- [ ] 가격 알림(목표가/할인율 도달 시) — 재방문 장치.
- [ ] 언어별 URL(`/en/` 등) + `hreflang` — 언어별 색인(현재는 단일 URL).
- [ ] 가이드 글 주기적 추가(현재 15편 — 통과·유지·트래픽에 가장 효과적).

**참고**: 자세한 성장·수익 전략 메모는 공개 저장소에 두지 않는다(작업 환경 메모에서 관리).

## 디자인 토큰 (영수증/가격 장부 컨셉 — 유지할 것)

전체 토큰은 `web/src/index.css`의 `:root` 참고. 핵심: 배경 ink `#0F1320`, 상단바 `#161B2B`, 패널 `#171D2E`, 카드(영수증 종이) `#F4F1E8`, 괘선 `#E2DBC9`, 종이 위 글자 `#1C1B17`, 흐린 글자 `#8C8674`, 강조 금색 `#C8912B`.
- 한글 폰트: `'Apple SD Gothic Neo','Pretendard','Malgun Gothic','Noto Sans KR',sans-serif`. 가격 숫자는 고정폭(monospace).
- 시그니처: "지금 사도 돼?" 판정을 영수증 도장(살짝 기운 스탬프)으로, 역대 최저가는 금색 ★.
- 새 컴포넌트는 같은 이름의 `.css`를 만들어 import(전역 `index.css`는 공용 토큰·레이아웃 위주).

## 주의사항

- 백엔드(Worker/D1/크롤러)와 `src/api.js`·`src/lib/verdict.js`의 **판정 로직**은 건드리지 말 것. (단, 판정의 **표시 문구**는 `verdict.js`의 단계(tier)만 두고 `src/i18n/<lang>.js`의 `verdict.*` 키에서 가져오므로, 문구 수정은 사전에서.)
- **브랜드 표기 = `Lowstamp`(화면), 기술 내부명 = `gamgap`(Worker·D1·localStorage 키 등).** 화면 문구에 "겜값"을 다시 넣지 말 것. 백엔드 주소 `gamgap-api.ibanisac.workers.dev`는 그대로.
- **카피 톤 = 캐주얼 구매자 눈높이(파워유저·"스팀 죽돌이"용 아님).** UI 문구(hero·trust 배지·footer·meta 등 반복 노출 카피)에 **인사이더 용어 금지** — "키샵/key shop/원화가/공식 원화가만/reseller/転売/激活码/tiendas de claves" 등. 대신 "지금 사도 돼? · 역대 최저가랑 비교 · 비싸게 사지 않게 · 가짜 세일 구별"처럼 누구나 아는 쉬운 말로. (가이드·About **본문**에서 키샵을 교육적으로 설명·경고하는 건 허용 — 초보에게 도움.)
- **다국어**: 새 UI 문구는 `src/i18n/ko.js`에 키를 추가하고 컴포넌트에서 `useT()`의 `t("키")`로 쓴 뒤, 나머지 5개 언어 사전에도 같은 키로 번역을 채울 것(빈 키는 한국어로 폴백). `{placeholder}`는 모든 언어에서 그대로 유지. 가격·날짜 표기는 `src/lib/format.js`의 `won`/`ym`가 현재 언어에 맞춰 처리(원화 값 자체는 불변).
- **새 게임 페이지는 모달이 아니라 `/game/:appid` 라우트**. 카드 클릭은 `navigate("/game/:appid")`.
- **그래프는 recharts 안 씀** — 손수 SVG(`PriceChart`/`Sparkline`). **아이콘도 lucide 안 씀** — 인라인 SVG. (불필요한 의존성 추가 지양.)
- **`localStorage` 사용함**(찜·쿠키 동의·언어 선택 기억). 과거 "localStorage 불필요" 지침은 폐기됨.
- 가격 단위: 스팀 정수는 보통 1/100. `crawler.py`의 `PRICE_DIVISOR`가 원화 스케일을 맞춤(현재 100). 카드 가격이 100배로 보이면 이 값을 1로.
- D1 무료: 저장 5GB, 하루 쓰기 10만/읽기 500만. change-only라 여유 큼. 스팀은 5분에 200회 제한 → 크롤러는 호출 사이 `STEAM_SLEEP`(기본 1.0초) 대기(로그에 429/조회실패 잦으면 올림). 저장소가 공개라 GitHub Actions 분은 무제한 → `crawl.yml` `timeout-minutes`로 완주 보장.
- **새 가이드 글 추가 시**: ① `src/content/guides/ko/<slug>.js`에 원본 작성 → ② 각 언어 폴더(`en/ja/zh/es/pt`)에도 번역본을 같은 파일명으로 추가(없으면 영어→한국어 폴백되긴 함) → ③ `functions/sitemap.xml.js`의 `GUIDE_PATHS` 배열 갱신 → ④ **`functions/_shared/content.js`의 `import`와 `GUIDES` 표에 6개 언어 모두 등록**(이게 봇 SSR 본문 주입용 — 빠지면 그 글은 검색 로봇에 제목·본문 없이 빈 껍데기로 나가 색인이 안 됨). ③④ 모두 함수 런타임은 `import.meta.glob` 불가라 하드코딩이 필수. (가이드의 목적이 검색 유입이므로 ④를 빠뜨리지 말 것.)
