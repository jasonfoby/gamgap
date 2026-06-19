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
    "avoid-fake-discounts": GUIDE_ko_avoid_fake_discounts
  },
  "en": {
    "steam-sale-calendar": GUIDE_en_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_en_how_to_buy_cheap,
    "verdict-guide": GUIDE_en_verdict_guide,
    "krw-regional-pricing": GUIDE_en_krw_regional_pricing,
    "steam-refund-policy": GUIDE_en_steam_refund_policy,
    "best-value-indies": GUIDE_en_best_value_indies,
    "wishlist-alerts": GUIDE_en_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_en_avoid_fake_discounts
  },
  "ja": {
    "steam-sale-calendar": GUIDE_ja_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_ja_how_to_buy_cheap,
    "verdict-guide": GUIDE_ja_verdict_guide,
    "krw-regional-pricing": GUIDE_ja_krw_regional_pricing,
    "steam-refund-policy": GUIDE_ja_steam_refund_policy,
    "best-value-indies": GUIDE_ja_best_value_indies,
    "wishlist-alerts": GUIDE_ja_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_ja_avoid_fake_discounts
  },
  "zh": {
    "steam-sale-calendar": GUIDE_zh_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_zh_how_to_buy_cheap,
    "verdict-guide": GUIDE_zh_verdict_guide,
    "krw-regional-pricing": GUIDE_zh_krw_regional_pricing,
    "steam-refund-policy": GUIDE_zh_steam_refund_policy,
    "best-value-indies": GUIDE_zh_best_value_indies,
    "wishlist-alerts": GUIDE_zh_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_zh_avoid_fake_discounts
  },
  "es": {
    "steam-sale-calendar": GUIDE_es_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_es_how_to_buy_cheap,
    "verdict-guide": GUIDE_es_verdict_guide,
    "krw-regional-pricing": GUIDE_es_krw_regional_pricing,
    "steam-refund-policy": GUIDE_es_steam_refund_policy,
    "best-value-indies": GUIDE_es_best_value_indies,
    "wishlist-alerts": GUIDE_es_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_es_avoid_fake_discounts
  },
  "pt": {
    "steam-sale-calendar": GUIDE_pt_steam_sale_calendar,
    "how-to-buy-cheap": GUIDE_pt_how_to_buy_cheap,
    "verdict-guide": GUIDE_pt_verdict_guide,
    "krw-regional-pricing": GUIDE_pt_krw_regional_pricing,
    "steam-refund-policy": GUIDE_pt_steam_refund_policy,
    "best-value-indies": GUIDE_pt_best_value_indies,
    "wishlist-alerts": GUIDE_pt_wishlist_alerts,
    "avoid-fake-discounts": GUIDE_pt_avoid_fake_discounts
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

// 콘텐츠 body 배열에서 첫 문단(type:"p")을 찾아 평문으로 돌려준다(봇 본문/설명 폴백용).
function firstParagraph(mod) {
  if (!mod || !Array.isArray(mod.body)) return "";
  const p = mod.body.find((b) => b && b.type === "p" && b.text);
  return p ? String(p.text) : "";
}

// 공통 렌더: shell(index.html) 위에 self-canonical + 제목/설명/og + (가능하면) #root 첫 문단을 주입.
// mod 가 없으면(콘텐츠를 못 찾으면) canonical 만 self 로 바로잡고 끝낸다(본문 주입은 생략).
export function renderContent(shell, { lang, pathname, mod, fallbackTitle }) {
  const self = SITE + pathname;
  const locale = LOCALE[lang] || "en_US";
  const title = (mod && mod.title) ? `${mod.title} · Lowstamp` : (fallbackTitle || "Lowstamp");
  const desc = mod && mod.description ? String(mod.description) : "";
  const lead = firstParagraph(mod);

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

  // 베스트에포트 본문 주입: 제목(h1) + 첫 문단을 #root 에 채워 빈 페이지/얇은 본문 판정을 피한다.
  if (mod && (mod.title || lead)) {
    const bodyHtml =
      `<main style="max-width:760px;margin:0 auto;padding:24px;font-family:sans-serif">` +
      (mod.title ? `<h1>${esc(mod.title)}</h1>` : "") +
      (lead ? `<p>${esc(lead)}</p>` : "") +
      `</main>`;
    rw = rw.on("#root", { element(e) { e.setInnerContent(bodyHtml, { html: true }); } });
  }

  return rw.transform(shell);
}
