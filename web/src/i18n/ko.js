// 한국어 원본 사전(모든 번역의 기준). 키→문자열.
// {placeholder} 는 t(key, {placeholder: 값}) 또는 tNodes 로 채운다.
export default {
  // 공통
  "common.retry": "다시 시도",
  "common.menu": "사이트 메뉴",
  "common.loading": "불러오는 중…",
  "common.more": "더 보기",
  "home.guidesTitle": "게임 싸게 사는 법",
  "home.guidesMore": "전체 보기",
  "lang.label": "언어",

  // 내비
  "nav.home": "홈",
  "nav.guide": "가이드",
  "nav.lows": "새 최저가",

  // 헤더
  "header.badge": "오늘 최저가 {n}개",
  "header.badgeTitle": "지금 최저가인 게임 수",
  // 히어로
  "hero.title": "이 게임, {hl} 사도 돼?",
  "hero.titleHl": "지금",
  "hero.sub": "지금 가격을 이 게임의 {b}와 비교해 살 때인지 아닌지 한 줄로 답합니다.",
  "hero.subB": "최저가",

  // 검색
  "search.placeholder": "게임 이름을 검색해 보세요",
  "search.aria": "게임 검색",
  "search.clear": "지우기",
  "search.resultsTitle": "‘{q}’ 검색 결과",
  "search.err": "가격을 불러오지 못했습니다. 잠시 후 다시 시도해 주세요.",
  "search.empty": "검색 결과가 없습니다. 영어 제목이나 다른 표기로 찾아보세요.",
  // 탭
  "tab.lowest": "오늘의 최저가",
  "tab.deals": "할인 중",
  "tab.wishlist": "내 찜",

  // 사이드바
  "side.browse": "둘러보기",
  "side.sortFilter": "정렬·필터",
  "side.filterToggle": "필터·정렬",
  "side.nextSale": "다음 스팀 세일",

  // 정렬
  "sort.discount": "할인율 높은 순",
  "sort.price": "현재가 낮은 순",
  "sort.depth": "최저 근접 순",
  "sort.normal": "정가 높은 순",

  // 필터 컨트롤
  "ctrl.onlyLow": "최저만",
  "ctrl.min50": "50%+",
  "ctrl.priceLabel": "가격",
  "ctrl.noLimit": "제한 없음",
  "ctrl.under": "{p} 이하",
  "ctrl.all": "전체",
  "ctrl.genre": "장르",
  "ctrl.reset": "초기화",
  "ctrl.maxPriceAria": "최대 가격",

  // 가격 프리셋
  "preset.u10": "1만원 이하",
  "preset.u20": "2만원 이하",
  "preset.u30": "3만원 이하",
  "preset.u50": "5만원 이하",

  // 적용 필터 칩
  "chip.onlyLow": "최저만",
  "chip.min50": "50%+ 할인",
  "chip.under": "{p} 이하",
  "chip.removeAria": "{label} 필터 제거",

  // 홈 섹션
  "home.lowestTitle": "오늘 최저가",
  "home.lowestEmpty": "오늘 최저가를 찍은 게임이 아직 없습니다. 기록이 쌓이면 하나둘 올라옵니다.",
  "home.lowestErr": "불러오지 못했습니다.",
  "deals.title": "지금 할인 중인 게임",
  "deals.clearAll": "전체 해제",
  "deals.err": "할인 목록을 불러오지 못했습니다.",
  "deals.empty": "조건에 맞는 게임이 없습니다. 필터를 조금 풀어 보세요.",
  // 찜
  "wish.title": "내 찜 목록",
  "wish.empty": "찜한 게임이 없습니다. 카드 왼쪽 위 ★를 누르면 여기에 모이고, 지금 살 때인지 한 번에 볼 수 있습니다.",
  "wish.note": "찜한 {a}개 중 {b}개가 지금 살 만한 가격입니다",
  "star.add": "찜하기",
  "star.remove": "찜 해제",

  // 카드
  "card.atl": "최저 {p}",

  // 스켈레톤
  "skel.listAria": "목록 불러오는 중",

  // 신뢰 배너
  "trust.officialK": "살 때인지 아닌지",
  "trust.officialV": "최저가 기준으로 판단",
  "trust.nokeyshopK": "부풀린 할인 구별",
  "trust.nokeyshopV": "실제로 싼지 확인",
  "trust.dailyK": "하루 1회",
  "trust.dailyV": "가격 갱신",

  // 세일 카운트다운
  "cd.ongoing": "진행 중",
  "cd.upcoming": "예정",
  "cd.day": "일",
  "cd.hour": "시",
  "cd.min": "분",
  "cd.sec": "초",
  "cd.footOngoing": "종료까지 · 예상 일정",
  "cd.footUpcoming": "시작까지 · 예상 일정",
  "cd.footOngoingConfirmed": "종료까지 · 스팀 공식 발표 일정",
  "cd.footUpcomingConfirmed": "시작까지 · 스팀 공식 발표 일정",
  "sale.spring": "봄 세일",
  "sale.summer": "여름 세일",
  "sale.autumn": "가을 세일",
  "sale.winter": "겨울 세일",

  // 게임 페이지
  "gp.back": "← 목록으로",
  "gp.title": "{name} 가격 · 최저가",
  "gp.loading": "불러오는 중…",
  "gp.error": "가격을 불러오지 못했습니다.",
  "gp.notFound": "이 게임을 찾을 수 없습니다. 위 검색창에서 다시 찾아보세요.",
  "gp.chartLabel": "가격 흐름",
  "gp.priceBasis": "한국 스팀 기준",
  "gp.trackedSince": "{since}부터 기록한 가격입니다. 그 전 가격은 포함되지 않습니다.",
  "gp.statsTitle": "가격 통계",
  "gp.lowsTitle": "이전 저점 기록",
  "gp.steam": "스팀에서 보기",
  "gp.copy": "링크 복사",
  "gp.copied": "복사 완료!",
  "gp.share": "공유",
  "gp.relatedTitle": "같은 장르, 지금 할인 중",
  "gp.moreGuides": "가이드: 게임 싸게 사는 법",
  "ad.label": "광고",
  "gp.freshness": "가격은 하루 한 번 갱신됩니다. 결제 전 스팀에서 최종 가격을 확인하세요.",
  "gp.proseSaleAtl": "{name}의 한국 스팀 현재가는 {cur}(정가 {normal}에서 {pct}% 할인)이고, 기록된 최저가는 {atl}{date}입니다. Lowstamp 판정은 '{label}'. {tip}",
  "gp.proseSaleNoAtl": "{name}의 한국 스팀 현재가는 {cur}(정가 {normal}에서 {pct}% 할인)이고, 최저가를 따질 만큼 기록이 아직 쌓이지 않았습니다. Lowstamp 판정은 '{label}'. {tip}",
  "gp.proseNoSaleAtl": "{name}의 한국 스팀 현재가는 {cur}이고, 기록된 최저가는 {atl}{date}입니다. Lowstamp 판정은 '{label}'. {tip}",
  "gp.proseNoSaleNoAtl": "{name}의 한국 스팀 현재가는 {cur}이고, 최저가를 따질 만큼 기록이 아직 쌓이지 않았습니다. Lowstamp 판정은 '{label}'. {tip}",
  "gp.proseDate": " ({d})",
  "gp.proseGap": "지금 가격 {cur}은 기록된 최저가 {atl}보다 {gap}({pct}%) 높습니다.",
  "gp.proseGapLow": "지금 가격 {cur}은 기록된 최저가와 같거나 그보다 낮습니다. 가격만 보면 지금이 바닥입니다.",
  "gp.proseStats": "{since}부터 기록한 가격의 평균은 {avg}, 가장 비쌌을 때는 {max}입니다.",
  // 가격/통계
  "price.normal": "정가 {p}",
  "price.atlLabel": "최저",
  "stats.avg": "기록 평균가",
  "stats.max": "기록 최고가",
  "stats.since": "기록 시작",

  // 판정(7단계) — 핵심 로직(verdict.js)은 그대로, 표시 문구만 여기서.
  "verdict.low-new.label": "오늘 기준 최저가",
  "verdict.low-new.sub": "지금이 가장 쌉니다",
  "verdict.low-new.tip": "오늘 다시 확인한 가격이 기록된 최저가 그대로입니다. 사려던 게임이라면 지금이 적기입니다.",
  "verdict.low.label": "지금이 최저가",
  "verdict.low.sub": "살 때입니다",
  "verdict.low.tip": "기록상 가장 싼 가격입니다. 더 기다린다고 내려간다는 보장이 없으니, 사려던 게임이라면 지금 사도 됩니다.",
  "verdict.near.label": "거의 최저가",
  "verdict.near.sub": "사도 좋습니다",
  "verdict.near.tip": "기록된 최저가와 차이가 거의 없습니다. 몇백 원 아끼려고 기다릴 값이 아닙니다.",
  "verdict.recent.label": "최근 최저가 수준",
  "verdict.recent.sub": "사도 무난합니다",
  "verdict.recent.tip": "기록된 최저가와 크게 차이 나지 않는 가격대입니다. 급하면 지금 사도 되고, 여유가 있다면 큰 세일에서 조금 더 내려갈 수 있습니다.",
  "verdict.ok.label": "괜찮은 할인",
  "verdict.ok.sub": "더 싼 적이 있습니다",
  "verdict.ok.tip": "할인폭은 나쁘지 않지만 전에 이보다 싸게 팔린 적이 있습니다. 급하지 않다면 여름·겨울 세일을 기다리는 편이 낫습니다.",
  "verdict.weak.label": "약한 할인",
  "verdict.weak.sub": "세일을 기다려도 됩니다",
  "verdict.weak.tip": "할인이 크지 않습니다. 위시리스트에 넣어 두고 더 큰 세일을 기다리는 쪽을 권합니다.",
  "verdict.full.label": "지금은 정가",
  "verdict.full.sub": "세일을 기다리세요",
  "verdict.full.tip": "지금은 할인이 없습니다. 스팀은 세일이 잦으니 위시리스트에 넣어 두고 알림을 기다리는 편이 낫습니다.",
  // 푸터
  "footer.tagline": "스팀 게임 가격을 기록된 최저가와 비교해 살 때인지 알려 드립니다.",
  "footer.about": "소개",
  "footer.privacy": "개인정보처리방침",
  "footer.terms": "이용약관",
  "footer.contact": "문의",
  "footer.disclaimer": "표시된 가격은 참고용입니다. 결제 전 스팀에서 최종 가격을 확인하세요.",
  "footer.source": "데이터 출처: Steam",
  "footer.navAria": "사이트 정보",

  // 콘텐츠 페이지 공통 틀
  "ps.pageNavAria": "페이지 이동",

  // 가이드 목록/상세 + 콘텐츠 페이지
  "guide.indexTitle": "가이드",
  "guide.indexDesc": "스팀 세일 일정, 환불 규정, 원화 가격, 부풀린 할인 가려내는 법처럼 게임을 사기 전에 알아 두면 돈이 덜 드는 이야기를 모았습니다.",
  "guide.indexDesc2": "할인율이 실제로 뜻하는 것, 언제 사는 게 싼지, 무료 배포·번들·가족 공유로 아끼는 법, 사고 후회하지 않을 게임 고르는 법 순으로 묶었습니다. 궁금한 것부터 읽으면 됩니다.",
  "guideCat.readPrices": "가격·할인 제대로 읽기",
  "guideCat.timing": "언제 사야 싼가",
  "guideCat.saveMore": "더 아끼는 법",
  "guideCat.choose": "살 게임 고르기",
  "guideCat.more": "그 외 가이드",
  "guide.indexMetaDesc": "스팀 게임을 싸게 사기 위한 가이드 모음",
  "guide.empty": "아직 올라온 글이 없습니다.",
  "guide.readMins": "읽는 시간 {n}분",
  "author.name": "Lowstamp 운영자",
  "author.by": "글 {name}",
  "guide.back": "다른 가이드 보기",
  "guide.tagsAria": "태그",
  "page.updated": "최종 수정 {d}",

  // 쿠키 동의
  "cookie.text": "Lowstamp은 맞춤형 광고와 방문 분석을 위해 쿠키를 사용합니다.",
  "cookie.more": "자세히",
  "cookie.deny": "거부",
  "cookie.allow": "동의",
  "cookie.aria": "쿠키 동의",

  // 문서 메타(브라우저 탭 제목·검색·공유 설명). 브랜드명 Lowstamp는 유지.
  "meta.defaultTitle": "Lowstamp — 스팀 게임 최저가·지금 사도 돼?",
  "meta.defaultDesc": "스팀 게임의 지금 가격이 살 만한지, 기록된 최저가와 비교해 한 줄로 알려 드립니다.",
  "meta.gameTitle": "{name} 가격 — 현재 {cur} · Lowstamp",
  "meta.gameDesc": "{name} 스팀 현재가 {cur}{sale}.{atl} 지금 살 만한 가격인지 확인하세요.",
  "meta.gameDescSale": " (-{pct}%)",
  "meta.gameDescAtl": " 최저 {p}.",

  // 404
  "nf.title": "페이지를 찾을 수 없습니다",
  "nf.desc": "주소가 바뀌었거나 없어진 페이지입니다. 아래에서 다시 시작하세요.",
  "nf.home": "홈으로",

  // 가격 차트
  "chart.1y": "1년",
  "chart.3y": "3년",
  "chart.all": "전체",
  "chart.empty": "가격 기록이 아직 쌓이는 중입니다.",
  "chart.atl": "★ 최저",

  // 장르(스팀 한국어 장르명 → 표시 라벨)
  "genre.action": "액션",
  "genre.adventure": "어드벤처",
  "genre.indie": "인디",
  "genre.strategy": "전략",
  "genre.rpg": "RPG",
  "genre.simulation": "시뮬레이션",
  "genre.casual": "캐주얼",
  "genre.racing": "레이싱",
  "genre.sports": "스포츠",
  "genre.mmo": "대규모 멀티플레이어",
  "genre.f2p": "무료 플레이",
  "genre.earlyaccess": "앞서 해보기",
  "genre.utilities": "유틸리티",
  "genre.gore": "고어",
  "genre.violent": "폭력적",
  "genre.sexual": "성인 콘텐츠",
  "info.title": "게임 정보",
  "info.genres": "장르",
  "info.controller": "컨트롤러",
  "info.controllerFull": "완전 지원",
  "info.controllerPartial": "부분 지원",
  "info.languages": "지원 언어",
  "info.langCount": "총 {n}개 언어",
  "info.dlc": "DLC",
  "info.dlcCount": "{n}개",
  "info.developer": "개발사",
  "info.released": "출시",
  "info.metacritic": "메타크리틱",
  "info.platforms": "플랫폼",
  "info.review": "평가",
  "info.reviewCount": "{n}개 평가",

  // 스팀 종합 평가(영어 문구 → 표시 라벨)
  "review.overwhelmingly_positive": "압도적으로 긍정적",
  "review.very_positive": "매우 긍정적",
  "review.positive": "긍정적",
  "review.mostly_positive": "대체로 긍정적",
  "review.mixed": "복합적",
  "review.mostly_negative": "대체로 부정적",
  "review.negative": "부정적",
  "review.very_negative": "매우 부정적",
  "review.overwhelmingly_negative": "압도적으로 부정적",

  // 이번 주 새 최저가 페이지(/new-lows)
  "lows.title": "이번 주 새 최저가",
  "lows.metaTitle": "이번 주 새 최저가 — 최근 일주일 사이 가장 싸진 스팀 게임",
  "lows.metaDesc": "지난 일주일 사이 기록된 최저가를 새로 갈아치운 스팀 게임만 모았습니다. 지금 할인 중인 목록이 아니라, 그동안 기록된 어떤 가격보다 지금이 싼 게임입니다. 매일 갱신됩니다.",
  "lows.intro1": "여기 있는 게임은 지난 일주일 사이에 기록된 최저가를 새로 갈아치운 게임입니다. 지금 할인 중인 게임을 모은 목록이 아닙니다. 스팀에서 빨간 할인 배지를 단 게임은 이 순간에도 수천 개지만, 그 대부분은 몇 달 전에 이미 더 싸게 팔린 적이 있습니다. 이 목록에 오르려면 지금 가격이 그동안 기록된 어떤 가격보다 낮아야 합니다.",
  "lows.intro2": "그래서 목록이 짧습니다. 보통 일주일에 스무 개 안팎입니다. 스팀 전체에서 하루에도 수백 개가 할인에 들어가는 것에 비하면 아주 적은 수인데, 그 적은 수가 이 목록의 쓸모입니다. 싸 보이는 것과 실제로 가장 싼 것을 가려내는 일이 어렵고, 그 일을 끝낸 결과만 남긴 것이 이 목록입니다.",
  "lows.intro3": "목록은 가격 수집이 매일 돌 때마다 저절로 바뀝니다. 따로 챙길 것 없이 이 주소에 오면 최근 일주일 치가 있습니다. 눈여겨보는 게임이 있다면 일주일에 한 번 들르는 정도로 충분합니다.",
  "lows.listHeading": "최근 {days}일 안에 최저가를 갈아치운 게임",
  "lows.empty": "최근에 최저가를 새로 찍은 게임이 없습니다. 큰 세일이 끝난 직후에는 한동안 조용합니다. 며칠 뒤에 다시 확인하세요.",
  "lows.error": "목록을 불러오지 못했습니다.",
  "lows.updated": "이 목록은 하루에 한 번, 가격을 새로 확인할 때마다 자동으로 갱신됩니다.",
  "lows.readHeading": "이 목록 읽는 법",
  "lows.read1": "카드의 도장이 '지금 사도 되는가'에 대한 답입니다. 최저가를 갈아치웠다고 무조건 좋은 값은 아닙니다. 5천 원짜리가 4천 원이 된 것과 6만 원짜리가 만 원이 된 것은 다른 이야기입니다. 카드에 함께 적힌 정가와 견줘 보세요.",
  "lows.read2": "리뷰 수도 같이 보는 편이 좋습니다. 평가는 좋은데 리뷰가 몇백 개뿐인 게임은 값이 싸진 것이 아니라 원래 잘 알려지지 않은 게임일 수 있습니다. 반대로 리뷰가 수만 개인 유명작이 여기 올라오면 드문 기회입니다. 그래서 목록은 리뷰가 많은 순서로 세웠습니다.",
  "lows.disclosure": "미리 밝혀 둘 것이 있습니다. Lowstamp이 가격을 기록하기 시작한 것은 2026년 6월입니다. 여기서 말하는 새 최저가는 출시 이후 통틀어 가장 싸다는 뜻이 아니라, 기록을 시작한 뒤로 가장 싸다는 뜻입니다. 오래된 게임일수록 그 전에 더 싼 적이 있었을 수 있습니다. 기록이 쌓일수록 정확해집니다.",
};
