// About page content (block array), drawn by ArticleBody.
// Voice: plain blogger English, contractions, no em-dashes.
// (2026-11-05) Expert review: say how the guides are made (AI tools), how we check and fix things, how the site earns, and what we corrected.
//   ⚠ Every sentence here must be true. No invented experience and no "I write all of them". The line about dates shown at the end
//   of guides is true only for guides that really have a sources block (refunds, Family Sharing, gifts, Remote Play, sale dates, wishlists).
export default {
  "slug": "about",
  "title": "About Lowstamp",
  "description": "Lowstamp puts a Steam game's current price next to the lowest price we've tracked and tells you whether now is a good time to buy. Who runs it, where the prices come from, how guides are made and checked, how the site earns, and where the data falls short.",
  "updated": "2026-11-05",
  "body": [
    {
      "type": "p",
      "text": "Lowstamp puts a Steam game's current price next to the lowest price we've tracked, works out the gap, and answers one question: is this a good price to pay today? It's built for the moment when you want a game but can't tell whether it's actually cheap right now or whether holding out a bit would get you a better deal."
    },
    { "type": "h2", "text": "Who runs it" },
    {
      "type": "p",
      "text": "One person who likes games runs Lowstamp. The name on guides, Lowstamp Editor, is that person's pen name. The guides are written with the help of AI tools and checked against Steam's official pages before they go up. There's no company and no editorial team behind this, so a reply can take a few days, but every message gets read."
    },
    {
      "type": "table",
      "caption": "Lowstamp at a glance",
      "head": ["Item", "Details"],
      "rows": [
        ["Run by", "One person, under the pen name Lowstamp Editor. No company, no editorial team"],
        ["Based in", "South Korea"],
        ["Started", "June 2026, which is also when price tracking began"],
        ["Price source", "What the Steam store shows shoppers in each region"],
        ["Updated", "Once a day"],
        ["Income", "None right now. If ads appear, they'll be labeled"],
        ["Contact", "ibanisac@gmail.com"]
      ]
    },
    { "type": "h2", "text": "Why it exists" },
    {
      "type": "p",
      "text": "Search for a cheap game and sooner or later you land on a key reseller. Those sites look cheap, but refunds are a coin toss, accounts get locked, and the price you clicked isn't always the price you pay. It's hard to trust that a bargain there is really a bargain."
    },
    {
      "type": "p",
      "text": "So Lowstamp only looks at official Steam prices. Two questions, nothing else: what does this game actually cost on Steam right now, and is that a good price compared with what it's been? Key reseller prices don't appear here at all."
    },
    { "type": "h2", "text": "Where the prices come from" },
    {
      "type": "p",
      "text": "Every price is the list price and current price Steam shows shoppers in that region. Nothing is estimated or converted. The English site shows US Steam prices in dollars; each of the other language versions shows its own region's price in the local currency."
    },
    {
      "type": "p",
      "text": "We also use CheapShark's public list to find which games are on sale, but every price comes straight from Steam. For games where we haven't collected regional prices yet, the site shows the Korean Steam price in won (₩)."
    },
    {
      "type": "p",
      "text": "Prices get checked once a day, and an entry is logged only on days when something changed. Those entries build each game's price chart and its tracked low. Because the check runs once a day, the store can be a little ahead of us, so glance at the final price on Steam before you pay."
    },
    { "type": "h2", "text": "How we check and fix things" },
    {
      "type": "p",
      "text": "If someone tells us a price doesn't match Steam, we compare the two and fix ours if it's wrong. Guides about Steam's own rules (refunds, Family Sharing, gifting, Remote Play, sale dates) are written from Steam's official pages, and each one ends with a list of sources and the date we last checked them. When a rule changes, we update the guide and the date."
    },
    {
      "type": "p",
      "text": "Buying tips and picks are different. They're opinions based on tracked prices, not official rules. If you spot a mistake, email ibanisac@gmail.com. We'll check it, fix it, and list bigger fixes under \"What we've corrected\" below."
    },
    { "type": "h2", "text": "How the site makes money" },
    {
      "type": "p",
      "text": "Lowstamp is free, and you don't need an account. Right now there are no ads and no affiliate links. The domain is paid for by the person who runs the site, and the rest runs on free services. Later on we may show Google ads on pages with a lot of text. If that happens, they'll be labeled as ads, and they won't change the stamp or the order of any list. Links to Steam are plain links, not affiliate links. If that ever changes, we'll mark every affiliate link and update this section first."
    },
    { "type": "h2", "text": "Where the data falls short" },
    {
      "type": "p",
      "text": "Lowstamp started recording prices in June 2026. So the 'lowest price' you see here isn't the cheapest a game has ever been since it came out. It's the cheapest during the stretch we've been recording, and it may well have sold for less before that."
    },
    {
      "type": "p",
      "text": "That's why every game page says when its records begin. The longer the history, the more the number is worth. A game with only two or three entries doesn't have much to go on yet, so treat its low as a rough reference. If you spot a price that doesn't match reality, tell us and we'll check and fix it."
    },
    { "type": "h2", "text": "How the 'Buy now?' stamp works" },
    {
      "type": "p",
      "text": "The stamp compares today's price with the lowest price on record. The math is simple. If today's price matches the low or sits right next to it, the stamp leans toward 'buy.' If it's well above the low, or there's no discount at all, it leans toward 'you can wait.' Everything in between is graded by how far the price sits from that low."
    },
    {
      "type": "p",
      "text": "The stamp only ever looks at price. It has no opinion on whether you'll enjoy the game or whether it runs on your machine. That part is yours."
    },
    { "type": "h2", "text": "What we've corrected" },
    {
      "type": "ul",
      "items": [
        "Nov 2026: We rewrote the Steam sale dates guide for the Winter Sale and corrected a claim that Steam has no store-wide sale in November. Steam ran its first Black Friday sale in late November 2025, and Black Friday discounts are listed again for 2026, with dates not yet announced.",
        "Nov 2026: We fixed the wishlist guide. Steam's wishlist emails only go out for discounts of 20% or more that last over 8 hours, and the English text had said any discount.",
        "Nov 2026: We reworded the refund guide to match Steam's official page, dropping wording like 'automatic approval' that the page doesn't use. We also corrected when Steam Families launched: beta in March 2024, open to everyone in September 2024.",
        "Sep 15, 2026: We fixed the Family Sharing guide. It still described the old Family Library Sharing, and it now follows Steam Families, which Steam has used since 2024.",
        "Late Aug 2026: We rewrote the refund guide from Steam's official refund page. It now covers the 2024 change for pre-purchases you can play early (Advanced Access) and several exceptions that were missing.",
        "Aug to Sep 2026: We stopped calling the lowest price \"all-time\" and started calling it the tracked low. Price tracking began in June 2026, and the site and this page now say so."
      ]
    },
    { "type": "h2", "text": "Get in touch" },
    {
      "type": "p",
      "text": "If a price looks wrong, or you have an idea or a partnership to discuss, email ibanisac@gmail.com. Running this alone means a reply might take a few days."
    }
  ]
};
