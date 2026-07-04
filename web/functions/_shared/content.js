// Cloudflare Pages 함수 공용 헬퍼: 콘텐츠 페이지(/guide, /guide/:slug, /privacy, /terms, /about,
// /contact)에 (1) 자기 자신을 가리키는 canonical 과 (2) 실제 제목·설명·첫 문단을 서버에서 주입한다.
// 정적 index.html 의 canonical 은 홈을 가리켜 색인 위험이 있고, JS 미실행 봇에는 빈 본문이 나가므로
// 그 둘을 바로잡는다. 본문 텍스트는 src/content 의 언어별 모듈을 그대로 import 해서 쓴다(빌드에 번들됨).
// (가격/판정 로직과는 무관 — 메타·SSR 텍스트 주입만.)

import PAGE_ko_about from "../../src/content/pages/ko/about.js";
import PAGE_ko_privacy from "../../src/content/pages/ko/privacy.js";
import PAGE_ko_terms from "../../src/content/pages/ko/terms.js";
import PAGE_ko_contact from "../../src/content/pages/ko/contact.js";
import PAGE_en_about from "../../src/content/pages/en/about.js";
import PAGE_en_privacy from "../../src/content/pages/en/privacy.js";
import PAGE_en_terms from "../../src/content/pages/en/terms.js";
import PAGE_en_contact from "../../src/content/pages/en/contact.js";
import PAGE_ja_about from "../../src/content/pages/ja/about.js";
import PAGE_ja_privacy from "../../src/content/pages/ja/privacy.js";
import PAGE_ja_terms from "../../src/content/pages/ja/terms.js";
import PAGE_ja_contact from "../../src/content/pages/ja/contact.js";
import PAGE_zh_about from "../../src/content/pages/zh/about.js";
import PAGE_zh_privacy from "../../src/content/pages/zh/privacy.js";
import PAGE_zh_terms from "../../src/content/pages/zh/terms.js";
import PAGE_zh_contact from "../../src/content/pages/zh/contact.js";
import PAGE_es_about from "../../src/content/pages/es/about.js";
import PAGE_es_privacy from "../../src/content/pages/es/privacy.js";
import PAGE_es_terms from "../../src/content/pages/es/terms.js";
import PAGE_es_contact from "../../src/content/pages/es/contact.js";
import PAGE_pt_about from "../../src/content/pages/pt/about.js";
import PAGE_pt_privacy from "../../src/content/pages/pt/privacy.js";
import PAGE_pt_terms from "../../src/content/pages/pt/terms.js";
import PAGE_pt_contact from "../../src/content/pages/pt/contact.js";
import GUIDE_ko_steam_sale_calendar from "../../src/content/guides/ko/steam-sale-calendar.js";
import GUIDE_ko_how_to_buy_cheap from "../../src/content/guides/ko/how-to-buy-cheap.js";
import GUIDE_ko_verdict_guide from "../../src/content/guides/ko/verdict-guide.js";
import GUIDE_ko_krw_regional_pricing from "../../src/content/guides/ko/krw-regional-pricing.js";
import GUIDE_ko_steam_refund_policy from "../../src/content/guides/ko/steam-refund-policy.js";
import GUIDE_ko_best_value_indies from "../../src/content/guides/ko/best-value-indies.js";
import GUIDE_ko_wishlist_alerts from "../../src/content/guides/ko/wishlist-alerts.js";
import GUIDE_ko_avoid_fake_discounts from "../../src/content/guides/ko/avoid-fake-discounts.js";
import GUIDE_en_steam_sale_calendar from "../../src/content/guides/en/steam-sale-calendar.js";
import GUIDE_en_how_to_buy_cheap from "../../src/content/guides/en/how-to-buy-cheap.js";
import GUIDE_en_verdict_guide from "../../src/content/guides/en/verdict-guide.js";
import GUIDE_en_krw_regional_pricing from "../../src/content/guides/en/krw-regional-pricing.js";
import GUIDE_en_steam_refund_policy from "../../src/content/guides/en/steam-refund-policy.js";
import GUIDE_en_best_value_indies from "../../src/content/guides/en/best-value-indies.js";
import GUIDE_en_wishlist_alerts from "../../src/content/guides/en/wishlist-alerts.js";
import GUIDE_en_avoid_fake_discounts from "../../src/content/guides/en/avoid-fake-discounts.js";
import GUIDE_ja_steam_sale_calendar from "../../src/content/guides/ja/steam-sale-calendar.js";
import GUIDE_ja_how_to_buy_cheap from "../../src/content/guides/ja/how-to-buy-cheap.js";
import GUIDE_ja_verdict_guide from "../../src/content/guides/ja/verdict-guide.js";
import GUIDE_ja_krw_regional_pricing from "../../src/content/guides/ja/krw-regional-pricing.js";
import GUIDE_ja_steam_refund_policy from "../../src/content/guides/ja/steam-refund-policy.js";
import GUIDE_ja_best_value_indies from "../../src/content/guides/ja/best-value-indies.js";
import GUIDE_ja_wishlist_alerts from "../../src/content/guides/ja/wishlist-alerts.js";
import GUIDE_ja_avoid_fake_discounts from "../../src/content/guides/ja/avoid-fake-discounts.js";
import GUIDE_zh_steam_sale_calendar from "../../src/content/guides/zh/steam-sale-calendar.js";
import GUIDE_zh_how_to_buy_cheap from "../../src/content/guides/zh/how-to-buy-cheap.js";
import GUIDE_zh_verdict_guide from "../../src/content/guides/zh/verdict-guide.js";
import GUIDE_zh_krw_regional_pricing from "../../src/content/guides/zh/krw-regional-pricing.js";
import GUIDE_zh_steam_refund_policy from "../../src/content/guides/zh/steam-refund-policy.js";
import GUIDE_zh_best_value_indies from "../../src/content/guides/zh/best-value-indies.js";
import GUIDE_zh_wishlist_alerts from "../../src/content/guides/zh/wishlist-alerts.js";
import GUIDE_zh_avoid_fake_discounts from "../../src/content/guides/zh/avoid-fake-discounts.js";
import GUIDE_es_steam_sale_calendar from "../../src/content/guides/es/steam-sale-calendar.js";
import GUIDE_es_how_to_buy_cheap from "../../src/content/guides/es/how-to-buy-cheap.js";
import GUIDE_es_verdict_guide from "../../src/content/guides/es/verdict-guide.js";
import GUIDE_es_krw_regional_pricing from "../../src/content/guides/es/krw-regional-pricing.js";
import GUIDE_es_steam_refund_policy from "../../src/content/guides/es/steam-refund-policy.js";
import GUIDE_es_best_value_indies from "../../src/content/guides/es/best-value-indies.js";
import GUIDE_es_wishlist_alerts from "../../src/content/guides/es/wishlist-alerts.js";
import GUIDE_es_avoid_fake_discounts from "../../src/content/guides/es/avoid-fake-discounts.js";
import GUIDE_pt_steam_sale_calendar from "../../src/content/guides/pt/steam-sale-calendar.js";
import GUIDE_pt_how_to_buy_cheap from "../../src/content/guides/pt/how-to-buy-cheap.js";
import GUIDE_pt_verdict_guide from "../../src/content/guides/pt/verdict-guide.js";
import GUIDE_pt_krw_regional_pricing from "../../src/content/guides/pt/krw-regional-pricing.js";
import GUIDE_pt_steam_refund_policy from "../../src/content/guides/pt/steam-refund-policy.js";
import GUIDE_pt_best_value_indies from "../../src/content/guides/pt/best-value-indies.js";
import GUIDE_pt_wishlist_alerts from "../../src/content/guides/pt/wishlist-alerts.js";
import GUIDE_pt_avoid_fake_discounts from "../../src/content/guides/pt/avoid-fake-discounts.js";
// 2026-06-20 증편분 + 2026-06-21 DLC 가이드 (봇 SSR 본문 주입용 — 사이트맵/클라이언트와 함께 갱신)
import GUIDE_ko_historical_low_meaning from "../../src/content/guides/ko/historical-low-meaning.js";
import GUIDE_ko_when_to_buy_or_wait from "../../src/content/guides/ko/when-to-buy-or-wait.js";
import GUIDE_ko_steam_bundles_guide from "../../src/content/guides/ko/steam-bundles-guide.js";
import GUIDE_ko_reviews_metacritic_guide from "../../src/content/guides/ko/reviews-metacritic-guide.js";
import GUIDE_ko_price_history_reading from "../../src/content/guides/ko/price-history-reading.js";
import GUIDE_ko_seasonal_sale_strategy from "../../src/content/guides/ko/seasonal-sale-strategy.js";
import GUIDE_ko_first_steam_purchase_guide from "../../src/content/guides/ko/first-steam-purchase-guide.js";
import GUIDE_ko_dlc_season_pass_guide from "../../src/content/guides/ko/dlc-season-pass-guide.js";
import GUIDE_en_historical_low_meaning from "../../src/content/guides/en/historical-low-meaning.js";
import GUIDE_en_when_to_buy_or_wait from "../../src/content/guides/en/when-to-buy-or-wait.js";
import GUIDE_en_steam_bundles_guide from "../../src/content/guides/en/steam-bundles-guide.js";
import GUIDE_en_reviews_metacritic_guide from "../../src/content/guides/en/reviews-metacritic-guide.js";
import GUIDE_en_price_history_reading from "../../src/content/guides/en/price-history-reading.js";
import GUIDE_en_seasonal_sale_strategy from "../../src/content/guides/en/seasonal-sale-strategy.js";
import GUIDE_en_first_steam_purchase_guide from "../../src/content/guides/en/first-steam-purchase-guide.js";
import GUIDE_en_dlc_season_pass_guide from "../../src/content/guides/en/dlc-season-pass-guide.js";
import GUIDE_ja_historical_low_meaning from "../../src/content/guides/ja/historical-low-meaning.js";
import GUIDE_ja_when_to_buy_or_wait from "../../src/content/guides/ja/when-to-buy-or-wait.js";
import GUIDE_ja_steam_bundles_guide from "../../src/content/guides/ja/steam-bundles-guide.js";
import GUIDE_ja_reviews_metacritic_guide from "../../src/content/guides/ja/reviews-metacritic-guide.js";
import GUIDE_ja_price_history_reading from "../../src/content/guides/ja/price-history-reading.js";
import GUIDE_ja_seasonal_sale_strategy from "../../src/content/guides/ja/seasonal-sale-strategy.js";
import GUIDE_ja_first_steam_purchase_guide from "../../src/content/guides/ja/first-steam-purchase-guide.js";
import GUIDE_ja_dlc_season_pass_guide from "../../src/content/guides/ja/dlc-season-pass-guide.js";
import GUIDE_zh_historical_low_meaning from "../../src/content/guides/zh/historical-low-meaning.js";
import GUIDE_zh_when_to_buy_or_wait from "../../src/content/guides/zh/when-to-buy-or-wait.js";
import GUIDE_zh_steam_bundles_guide from "../../src/content/guides/zh/steam-bundles-guide.js";
import GUIDE_zh_reviews_metacritic_guide from "../../src/content/guides/zh/reviews-metacritic-guide.js";
import GUIDE_zh_price_history_reading from "../../src/content/guides/zh/price-history-reading.js";
import GUIDE_zh_seasonal_sale_strategy from "../../src/content/guides/zh/seasonal-sale-strategy.js";
import GUIDE_zh_first_steam_purchase_guide from "../../src/content/guides/zh/first-steam-purchase-guide.js";
import GUIDE_zh_dlc_season_pass_guide from "../../src/content/guides/zh/dlc-season-pass-guide.js";
import GUIDE_es_historical_low_meaning from "../../src/content/guides/es/historical-low-meaning.js";
import GUIDE_es_when_to_buy_or_wait from "../../src/content/guides/es/when-to-buy-or-wait.js";
import GUIDE_es_steam_bundles_guide from "../../src/content/guides/es/steam-bundles-guide.js";
import GUIDE_es_reviews_metacritic_guide from "../../src/content/guides/es/reviews-metacritic-guide.js";
import GUIDE_es_price_history_reading from "../../src/content/guides/es/price-history-reading.js";
import GUIDE_es_seasonal_sale_strategy from "../../src/content/guides/es/seasonal-sale-strategy.js";
import GUIDE_es_first_steam_purchase_guide from "../../src/content/guides/es/first-steam-purchase-guide.js";
import GUIDE_es_dlc_season_pass_guide from "../../src/content/guides/es/dlc-season-pass-guide.js";
import GUIDE_pt_historical_low_meaning from "../../src/content/guides/pt/historical-low-meaning.js";
import GUIDE_pt_when_to_buy_or_wait from "../../src/content/guides/pt/when-to-buy-or-wait.js";
import GUIDE_pt_steam_bundles_guide from "../../src/content/guides/pt/steam-bundles-guide.js";
import GUIDE_pt_reviews_metacritic_guide from "../../src/content/guides/pt/reviews-metacritic-guide.js";
import GUIDE_pt_price_history_reading from "../../src/content/guides/pt/price-history-reading.js";
import GUIDE_pt_seasonal_sale_strategy from "../../src/content/guides/pt/seasonal-sale-strategy.js";
import GUIDE_pt_first_steam_purchase_guide from "../../src/content/guides/pt/first-steam-purchase-guide.js";
import GUIDE_pt_dlc_season_pass_guide from "../../src/content/guides/pt/dlc-season-pass-guide.js";
// 2026-06-22 증편
import GUIDE_ko_avoid_impulse_buys from "../../src/content/guides/ko/avoid-impulse-buys.js";
import GUIDE_en_avoid_impulse_buys from "../../src/content/guides/en/avoid-impulse-buys.js";
import GUIDE_ja_avoid_impulse_buys from "../../src/content/guides/ja/avoid-impulse-buys.js";
import GUIDE_zh_avoid_impulse_buys from "../../src/content/guides/zh/avoid-impulse-buys.js";
import GUIDE_es_avoid_impulse_buys from "../../src/content/guides/es/avoid-impulse-buys.js";
import GUIDE_pt_avoid_impulse_buys from "../../src/content/guides/pt/avoid-impulse-buys.js";
// 2026-07-05 증편 (5편)
import GUIDE_ko_early_access_guide from "../../src/content/guides/ko/early-access-guide.js";
import GUIDE_ko_steam_store_page_checklist from "../../src/content/guides/ko/steam-store-page-checklist.js";
import GUIDE_ko_free_games_guide from "../../src/content/guides/ko/free-games-guide.js";
import GUIDE_ko_review_bomb_guide from "../../src/content/guides/ko/review-bomb-guide.js";
import GUIDE_ko_steam_family_sharing from "../../src/content/guides/ko/steam-family-sharing.js";
import GUIDE_en_early_access_guide from "../../src/content/guides/en/early-access-guide.js";
import GUIDE_en_steam_store_page_checklist from "../../src/content/guides/en/steam-store-page-checklist.js";
import GUIDE_en_free_games_guide from "../../src/content/guides/en/free-games-guide.js";
import GUIDE_en_review_bomb_guide from "../../src/content/guides/en/review-bomb-guide.js";
import GUIDE_en_steam_family_sharing from "../../src/content/guides/en/steam-family-sharing.js";
import GUIDE_ja_early_access_guide from "../../src/content/guides/ja/early-access-guide.js";
import GUIDE_ja_steam_store_page_checklist from "../../src/content/guides/ja/steam-store-page-checklist.js";
import GUIDE_ja_free_games_guide from "../../src/content/guides/ja/free-games-guide.js";
import GUIDE_ja_review_bomb_guide from "../../src/content/guides/ja/review-bomb-guide.js";
import GUIDE_ja_steam_family_sharing from "../../src/content/guides/ja/steam-family-sharing.js";
import GUIDE_zh_early_access_guide from "../../src/content/guides/zh/early-access-guide.js";
import GUIDE_zh_steam_store_page_checklist from "../../src/content/guides/zh/steam-store-page-checklist.js";
import GUIDE_zh_free_games_guide from "../../src/content/guides/zh/free-games-guide.js";
import GUIDE_zh_review_bomb_guide from "../../src/content/guides/zh/review-bomb-guide.js";
import GUIDE_zh_steam_family_sharing from "../../src/content/guides/zh/steam-family-sharing.js";
import GUIDE_es_early_access_guide from "../../src/content/guides/es/early-access-guide.js";
import GUIDE_es_steam_store_page_checklist from "../../src/content/guides/es/steam-store-page-checklist.js";
import GUIDE_es_free_games_guide from "../../src/content/guides/es/free-games-guide.js";
import GUIDE_es_review_bomb_guide from "../../src/content/guides/es/review-bomb-guide.js";
import GUIDE_es_steam_family_sharing from "../../src/content/guides/es/steam-family-sharing.js";
import GUIDE_pt_early_access_guide from "../../src/content/guides/pt/early-access-guide.js";
import GUIDE_pt_steam_store_page_checklist from "../../src/content/guides/pt/steam-store-page-checklist.js";
import GUIDE_pt_free_games_guide from "../../src/content/guides/pt/free-games-guide.js";
import GUIDE_pt_review_bomb_guide from "../../src/content/guides/pt/review-bomb-guide.js";
import GUIDE_pt_steam_family_sharing from "../../src/content/guides/pt/steam-family-sharing.js";

const SUPPORTED = ["ko", "en", "ja", "zh", "es", "pt"];
const DEFAULT = "en";
const LOCALE = { ko: "ko_KR", en: "en_US", ja: "ja_JP", zh: "zh_CN", es: "es_ES", pt: "pt_BR" };
const SITE = "https://lowstamp.com";

// 언어 → slug → 콘텐츠 모듈(default export: { title, description, body:[{type,text}] }).
const PAGES = {
  "ko": {
    "about": PAGE_ko_about,
    "privacy": PAGE_ko_privacy,
    "terms": PAGE_ko_terms,
    "contact": PAGE_ko_contact
  },
  "en": {
    "about": PAGE_en_about,
    "privacy": PAGE_en_privacy,
    "terms": PAGE_en_terms,
    "contact": PAGE_en_contact
  },
  "ja": {
    "about": PAGE_ja_about,
    "privacy": PAGE_ja_privacy,
    "terms": PAGE_ja_terms,
    "contact": PAGE_ja_contact
  },
  "zh": {
    "about": PAGE_zh_about,
    "privacy": PAGE_zh_privacy,
    "terms": PAGE_zh_terms,
    "contact": PAGE_zh_contact
  },
  "es": {
    "about": PAGE_es_about,
    "privacy": PAGE_es_privacy,
    "terms": PAGE_es_terms,
    "contact": PAGE_es_contact
  },
  "pt": {
    "about": PAGE_pt_about,
    "privacy": PAGE_pt_privacy,
    "terms": PAGE_pt_terms,
    "contact": PAGE_pt_contact
  }
};

const GUIDES = {
  "ko": {
    "steam-sale-calendar": GUIDE_ko_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_ko_how_to_buy_cheap,
    "verdict-guide": GUIDE_ko_verdict_guide,
    "krw-regional-pricing": GUIDE_ko_krw_regional_pricing,
    "steam-refund-policy": GUIDE_ko_steam_refund_policy,
    "best-value-indies": GUIDE_ko_best_value_indies,
    "wishlist-alerts": GUIDE_ko_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_ko_avoid_fake_discounts,
    "historical-low-meaning": GUIDE_ko_historical_low_meaning,
    "when-to-buy-or-wait": GUIDE_ko_when_to_buy_or_wait,
    "steam-bundles-guide": GUIDE_ko_steam_bundles_guide,
    "reviews-metacritic-guide": GUIDE_ko_reviews_metacritic_guide,
    "price-history-reading": GUIDE_ko_price_history_reading,
    "seasonal-sale-strategy": GUIDE_ko_seasonal_sale_strategy,
    "first-steam-purchase-guide": GUIDE_ko_first_steam_purchase_guide,
    "dlc-season-pass-guide": GUIDE_ko_dlc_season_pass_guide,
    "avoid-impulse-buys": GUIDE_ko_avoid_impulse_buys,
    "early-access-guide": GUIDE_ko_early_access_guide,
    "steam-store-page-checklist": GUIDE_ko_steam_store_page_checklist,
    "free-games-guide": GUIDE_ko_free_games_guide,
    "review-bomb-guide": GUIDE_ko_review_bomb_guide,
    "steam-family-sharing": GUIDE_ko_steam_family_sharing
  },
  "en": {
    "steam-sale-calendar": GUIDE_en_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_en_how_to_buy_cheap,
    "verdict-guide": GUIDE_en_verdict_guide,
    "krw-regional-pricing": GUIDE_en_krw_regional_pricing,
    "steam-refund-policy": GUIDE_en_steam_refund_policy,
    "best-value-indies": GUIDE_en_best_value_indies,
    "wishlist-alerts": GUIDE_en_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_en_avoid_fake_discounts,
    "historical-low-meaning": GUIDE_en_historical_low_meaning,
    "when-to-buy-or-wait": GUIDE_en_when_to_buy_or_wait,
    "steam-bundles-guide": GUIDE_en_steam_bundles_guide,
    "reviews-metacritic-guide": GUIDE_en_reviews_metacritic_guide,
    "price-history-reading": GUIDE_en_price_history_reading,
    "seasonal-sale-strategy": GUIDE_en_seasonal_sale_strategy,
    "first-steam-purchase-guide": GUIDE_en_first_steam_purchase_guide,
    "dlc-season-pass-guide": GUIDE_en_dlc_season_pass_guide,
    "avoid-impulse-buys": GUIDE_en_avoid_impulse_buys,
    "early-access-guide": GUIDE_en_early_access_guide,
    "steam-store-page-checklist": GUIDE_en_steam_store_page_checklist,
    "free-games-guide": GUIDE_en_free_games_guide,
    "review-bomb-guide": GUIDE_en_review_bomb_guide,
    "steam-family-sharing": GUIDE_en_steam_family_sharing
  },
  "ja": {
    "steam-sale-calendar": GUIDE_ja_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_ja_how_to_buy_cheap,
    "verdict-guide": GUIDE_ja_verdict_guide,
    "krw-regional-pricing": GUIDE_ja_krw_regional_pricing,
    "steam-refund-policy": GUIDE_ja_steam_refund_policy,
    "best-value-indies": GUIDE_ja_best_value_indies,
    "wishlist-alerts": GUIDE_ja_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_ja_avoid_fake_discounts,
    "historical-low-meaning": GUIDE_ja_historical_low_meaning,
    "when-to-buy-or-wait": GUIDE_ja_when_to_buy_or_wait,
    "steam-bundles-guide": GUIDE_ja_steam_bundles_guide,
    "reviews-metacritic-guide": GUIDE_ja_reviews_metacritic_guide,
    "price-history-reading": GUIDE_ja_price_history_reading,
    "seasonal-sale-strategy": GUIDE_ja_seasonal_sale_strategy,
    "first-steam-purchase-guide": GUIDE_ja_first_steam_purchase_guide,
    "dlc-season-pass-guide": GUIDE_ja_dlc_season_pass_guide,
    "avoid-impulse-buys": GUIDE_ja_avoid_impulse_buys,
    "early-access-guide": GUIDE_ja_early_access_guide,
    "steam-store-page-checklist": GUIDE_ja_steam_store_page_checklist,
    "free-games-guide": GUIDE_ja_free_games_guide,
    "review-bomb-guide": GUIDE_ja_review_bomb_guide,
    "steam-family-sharing": GUIDE_ja_steam_family_sharing
  },
  "zh": {
    "steam-sale-calendar": GUIDE_zh_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_zh_how_to_buy_cheap,
    "verdict-guide": GUIDE_zh_verdict_guide,
    "krw-regional-pricing": GUIDE_zh_krw_regional_pricing,
    "steam-refund-policy": GUIDE_zh_steam_refund_policy,
    "best-value-indies": GUIDE_zh_best_value_indies,
    "wishlist-alerts": GUIDE_zh_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_zh_avoid_fake_discounts,
    "historical-low-meaning": GUIDE_zh_historical_low_meaning,
    "when-to-buy-or-wait": GUIDE_zh_when_to_buy_or_wait,
    "steam-bundles-guide": GUIDE_zh_steam_bundles_guide,
    "reviews-metacritic-guide": GUIDE_zh_reviews_metacritic_guide,
    "price-history-reading": GUIDE_zh_price_history_reading,
    "seasonal-sale-strategy": GUIDE_zh_seasonal_sale_strategy,
    "first-steam-purchase-guide": GUIDE_zh_first_steam_purchase_guide,
    "dlc-season-pass-guide": GUIDE_zh_dlc_season_pass_guide,
    "avoid-impulse-buys": GUIDE_zh_avoid_impulse_buys,
    "early-access-guide": GUIDE_zh_early_access_guide,
    "steam-store-page-checklist": GUIDE_zh_steam_store_page_checklist,
    "free-games-guide": GUIDE_zh_free_games_guide,
    "review-bomb-guide": GUIDE_zh_review_bomb_guide,
    "steam-family-sharing": GUIDE_zh_steam_family_sharing
  },
  "es": {
    "steam-sale-calendar": GUIDE_es_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_es_how_to_buy_cheap,
    "verdict-guide": GUIDE_es_verdict_guide,
    "krw-regional-pricing": GUIDE_es_krw_regional_pricing,
    "steam-refund-policy": GUIDE_es_steam_refund_policy,
    "best-value-indies": GUIDE_es_best_value_indies,
    "wishlist-alerts": GUIDE_es_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_es_avoid_fake_discounts,
    "historical-low-meaning": GUIDE_es_historical_low_meaning,
    "when-to-buy-or-wait": GUIDE_es_when_to_buy_or_wait,
    "steam-bundles-guide": GUIDE_es_steam_bundles_guide,
    "reviews-metacritic-guide": GUIDE_es_reviews_metacritic_guide,
    "price-history-reading": GUIDE_es_price_history_reading,
    "seasonal-sale-strategy": GUIDE_es_seasonal_sale_strategy,
    "first-steam-purchase-guide": GUIDE_es_first_steam_purchase_guide,
    "dlc-season-pass-guide": GUIDE_es_dlc_season_pass_guide,
    "avoid-impulse-buys": GUIDE_es_avoid_impulse_buys,
    "early-access-guide": GUIDE_es_early_access_guide,
    "steam-store-page-checklist": GUIDE_es_steam_store_page_checklist,
    "free-games-guide": GUIDE_es_free_games_guide,
    "review-bomb-guide": GUIDE_es_review_bomb_guide,
    "steam-family-sharing": GUIDE_es_steam_family_sharing
  },
  "pt": {
    "steam-sale-calendar": GUIDE_pt_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_pt_how_to_buy_cheap,
    "verdict-guide": GUIDE_pt_verdict_guide,
    "krw-regional-pricing": GUIDE_pt_krw_regional_pricing,
    "steam-refund-policy": GUIDE_pt_steam_refund_policy,
    "best-value-indies": GUIDE_pt_best_value_indies,
    "wishlist-alerts": GUIDE_pt_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_pt_avoid_fake_discounts,
    "historical-low-meaning": GUIDE_pt_historical_low_meaning,
    "when-to-buy-or-wait": GUIDE_pt_when_to_buy_or_wait,
    "steam-bundles-guide": GUIDE_pt_steam_bundles_guide,
    "reviews-metacritic-guide": GUIDE_pt_reviews_metacritic_guide,
    "price-history-reading": GUIDE_pt_price_history_reading,
    "seasonal-sale-strategy": GUIDE_pt_seasonal_sale_strategy,
    "first-steam-purchase-guide": GUIDE_pt_first_steam_purchase_guide,
    "dlc-season-pass-guide": GUIDE_pt_dlc_season_pass_guide,
    "avoid-impulse-buys": GUIDE_pt_avoid_impulse_buys,
    "early-access-guide": GUIDE_pt_early_access_guide,
    "steam-store-page-checklist": GUIDE_pt_steam_store_page_checklist,
    "free-games-guide": GUIDE_pt_free_games_guide,
    "review-bomb-guide": GUIDE_pt_review_bomb_guide,
    "steam-family-sharing": GUIDE_pt_steam_family_sharing
  }
};

// Accept-Language 헤더에서 지원 언어 하나를 고른다. 못 찾으면 영어.
export function pickLang(al) {
  if (!al) return DEFAULT;
  for (const part of al.toLowerCase().split(",")) {
    const base = part.split(";")[0].trim().split("-")[0];
    if (SUPPORTED.includes(base)) return base;
  }
  return DEFAULT;
}

const esc = (s) =>
  String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

// 언어별 모듈을 고르되, 없으면 영어 → 한국어 순으로 폴백(클라이언트 로더와 동일한 정책).
function pick(table, lang, slug) {
  return (table[lang] && table[lang][slug]) || (table[DEFAULT] && table[DEFAULT][slug]) || (table.ko && table.ko[slug]) || null;
}

export function getPage(lang, slug) { return pick(PAGES, lang, slug); }
export function getGuide(lang, slug) { return pick(GUIDES, lang, slug); }

// 콘텐츠 body 배열에서 첫 문단(type:"p")을 찾아 평문으로 돌려준다(메타 설명 폴백용).
function firstParagraph(mod) {
  if (!mod || !Array.isArray(mod.body)) return "";
  const p = mod.body.find((b) => b && b.type === "p" && b.text);
  return p ? String(p.text) : "";
}

// 콘텐츠 body 배열 전체를 HTML로 그린다(클라이언트 ArticleBody.jsx 와 같은 블록 → 태그 매핑).
// JS 안 돌리는 봇에게도 글 전문이 보이게 해서 '얇은 콘텐츠' 오판을 막는다.
function renderBody(mod) {
  if (!mod || !Array.isArray(mod.body)) return "";
  const li = (items) => (items || []).map((it) => `<li>${esc(it)}</li>`).join("");
  return mod.body
    .map((b) => {
      if (!b || !b.type) return "";
      switch (b.type) {
        case "h2": return `<h2>${esc(b.text)}</h2>`;
        case "ul": return `<ul>${li(b.items)}</ul>`;
        case "ol": return `<ol>${li(b.items)}</ol>`;
        case "quote": return `<blockquote>${esc(b.text)}</blockquote>`;
        default: return `<p>${esc(b.text)}</p>`; // p, note → 문단
      }
    })
    .join("");
}

// 가이드 목록(현재 언어, 없으면 영어→한국어 폴백). 날짜 내림차순. [{slug,title,description,date}]
export function listGuides(lang) {
  const slugs = Object.keys(GUIDES.ko || {}); // ko = 전체 슬러그 집합
  const out = [];
  for (const slug of slugs) {
    const mod = pick(GUIDES, lang, slug);
    if (mod && mod.slug) out.push({ slug: mod.slug, title: mod.title || mod.slug, description: mod.description || "", date: mod.date || "" });
  }
  out.sort((a, b) => (a.date < b.date ? 1 : -1));
  return out;
}

// 가이드 목록 페이지의 #root 본문(제목 + 각 글 링크·설명). renderContent 의 bodyHtml 로 넘긴다.
export function guideIndexBody(lang, heading, intro) {
  const items = listGuides(lang)
    .map((g) => `<li><a href="/guide/${esc(g.slug)}">${esc(g.title)}</a>${g.description ? " — " + esc(g.description) : ""}</li>`)
    .join("");
  return `<h1>${esc(heading)}</h1>${intro ? `<p>${esc(intro)}</p>` : ""}<ul>${items}</ul>`;
}

// 공통 렌더: shell(index.html) 위에 self-canonical + 제목/설명/og + (가능하면) #root 첫 문단을 주입.
// mod 가 없으면(콘텐츠를 못 찾으면) canonical 만 self 로 바로잡고 끝낸다(본문 주입은 생략).
export function renderContent(shell, { lang, pathname, mod, fallbackTitle, bodyHtml }) {
  const self = SITE + pathname;
  const locale = LOCALE[lang] || "en_US";
  const title = (mod && mod.title) ? `${mod.title} · Lowstamp` : (fallbackTitle || "Lowstamp");
  const desc = mod && mod.description ? String(mod.description) : "";

  let rw = new HTMLRewriter()
    .on("html", { element(e) { e.setAttribute("lang", lang); } })
    .on('link[rel="canonical"]', { element(e) { e.setAttribute("href", self); } })
    .on('meta[property="og:url"]', { element(e) { e.setAttribute("content", self); } })
    .on('meta[property="og:locale"]', { element(e) { e.setAttribute("content", locale); } })
    .on("title", { element(e) { e.setInnerContent(title); } })
    .on('meta[property="og:title"]', { element(e) { e.setAttribute("content", title); } })
    .on('meta[name="twitter:title"]', { element(e) { e.setAttribute("content", title); } });

  if (desc) {
    rw = rw
      .on('meta[name="description"]', { element(e) { e.setAttribute("content", desc); } })
      .on('meta[property="og:description"]', { element(e) { e.setAttribute("content", desc); } })
      .on('meta[name="twitter:description"]', { element(e) { e.setAttribute("content", desc); } });
  }

  // 본문 주입: JS 안 돌리는 봇에게도 글 '전문'이 보이게 #root 를 채운다(얇은 콘텐츠 판정 방지).
  //  - bodyHtml 을 직접 주면(가이드 목록·홈 등) 그걸 쓰고,
  //  - 아니면 콘텐츠 모듈의 제목(h1) + 본문 전체(renderBody)를 그린다.
  const inner = bodyHtml || (mod && (mod.title || (mod.body && mod.body.length))
    ? (mod.title ? `<h1>${esc(mod.title)}</h1>` : "") + renderBody(mod)
    : "");
  if (inner) {
    const wrapped =
      `<main style="max-width:760px;margin:0 auto;padding:24px;font-family:sans-serif;line-height:1.6">${inner}</main>`;
    rw = rw.on("#root", { element(e) { e.setInnerContent(wrapped, { html: true }); } });
  }

  return rw.transform(shell);
}
