// 가이드 목록(/guide)을 주제별로 묶는 순서·구성. 클라이언트(GuideIndex.jsx)와
// 봇용 SSR(functions/_shared/content.js)이 '같은 분류'를 쓰도록 한곳에 둔다.
// labelKey = i18n 사전의 카테고리 제목 키(6개 언어). slugs 순서가 그 묶음 안 표시 순서.
// 여기 없는 새 slug 는 목록에서 '그 외'(guideCat.more) 묶음으로 항상 노출돼 사라지지 않는다.
export const GUIDE_CATEGORIES = [
  {
    key: "readPrices",
    labelKey: "guideCat.readPrices",
    slugs: ["historical-low-meaning", "avoid-fake-discounts", "price-history-reading", "krw-regional-pricing"],
  },
  {
    key: "timing",
    labelKey: "guideCat.timing",
    slugs: ["steam-sale-calendar", "seasonal-sale-strategy", "when-to-buy-or-wait", "wishlist-alerts", "verdict-guide"],
  },
  {
    key: "saveMore",
    labelKey: "guideCat.saveMore",
    slugs: [
      "how-to-buy-cheap",
      "best-value-indies",
      "steam-bundles-guide",
      "dlc-season-pass-guide",
      "free-games-guide",
      "steam-family-sharing",
      "steam-refund-policy",
      "avoid-impulse-buys",
    ],
  },
  {
    key: "choose",
    labelKey: "guideCat.choose",
    slugs: ["first-steam-purchase-guide", "steam-store-page-checklist", "early-access-guide", "review-bomb-guide", "reviews-metacritic-guide"],
  },
];

// 로드된 가이드 배열([{slug,...}])을 카테고리 순서대로 묶는다. 각 카테고리는 그 안에서
// GUIDE_CATEGORIES 의 slugs 순서를 따르고, 어느 카테고리에도 없는 글은 마지막 '그 외'로 모은다.
// 반환: [{ labelKey, items: [guide,...] }] — 빈 묶음은 제외.
export function groupGuides(guides) {
  const bySlug = new Map((guides || []).filter((g) => g && g.slug).map((g) => [g.slug, g]));
  const used = new Set();
  const out = [];
  for (const cat of GUIDE_CATEGORIES) {
    const items = [];
    for (const slug of cat.slugs) {
      const g = bySlug.get(slug);
      if (g) {
        items.push(g);
        used.add(slug);
      }
    }
    if (items.length) out.push({ labelKey: cat.labelKey, items });
  }
  const leftover = (guides || []).filter((g) => g && g.slug && !used.has(g.slug));
  if (leftover.length) out.push({ labelKey: "guideCat.more", items: leftover });
  return out;
}
