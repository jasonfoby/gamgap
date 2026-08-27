// About page content, stored as an array of blocks. Rendered by ArticleBody.
export default {
  slug: "about",
  title: "About Lowstamp",
  description:
    "Lowstamp is a game price tracker that shows what a Steam game costs right now, compares it against the lowest price we've recorded, and answers 'should I buy it now?' in a single line. Here's who builds and runs it, where the price data comes from, and an honest look at the limits of that data.",
  updated: "2026-08-28",
  body: [
    {
      type: "p",
      text:
        "Lowstamp is a game price tracker that puts a Steam game's current price next to the lowest price we've recorded, then tells you whether that's a good price to pay today. I built it for those moments when you want a game but can't tell if it's actually cheap right now or if holding out a little longer would get you a better deal.",
    },

    { type: "h2", text: "Who builds and runs it" },
    {
      type: "p",
      text:
        "Lowstamp is a free service built and run by one person who simply likes games. When you see a guide on this site bylined \"By Lowstamp Editor,\" that's me, and I plan and write all 22 of them myself. Since it's one person rather than a company or an editorial team, replies can take a little while, but I read every message that comes in.",
    },

    { type: "h2", text: "Why I built it" },
    {
      type: "p",
      text:
        "Go looking for a cheap game and sooner or later you land on a key shop, one of those sites that resells game keys. But key shop prices come with strings attached: chargebacks, banned accounts, keys of murky origin. Fees get tacked on, or the price you clicked isn't the price you end up paying, and it's hard to trust that the bargain is really a bargain.",
    },
    {
      type: "p",
      text:
        "Lowstamp aims squarely at that trust problem. I don't touch key shop prices at all; every comparison here uses official Steam prices only. All the site does is answer two honest questions: what does this game actually cost on Steam right now, and is that a good price compared to what it has been? No key shops, just official Steam pricing. That's the whole idea.",
    },

    { type: "h2", text: "Where the price data comes from" },
    {
      type: "p",
      text:
        "Every price on Lowstamp is the list price and current price pulled straight from Steam's own store data. Nothing is estimated or converted on my end, so you're seeing exactly what Steam shows shoppers in that region. The English site shows US Steam prices in dollars, and each of the other language versions shows its own region's Steam price in the local currency.",
    },
    {
      type: "p",
      text:
        "Prices are checked automatically once a day, and I only log an entry on days when something actually changed. Those entries are what build each game's price chart and its lowest recorded price. Because the check runs just once a day, there can be a small lag behind the live store, so it's worth glancing at the final price on Steam right before you buy.",
    },

    { type: "h2", text: "The limits of this data, stated honestly" },
    {
      type: "p",
      text:
        "One thing I want to be upfront about: Lowstamp only started recording prices in June 2026. So the 'lowest price' you see here isn't the cheapest a game has ever been since release. It's the cheapest it has been during the stretch we've been recording, and it may well have sold for less before that.",
    },
    {
      type: "p",
      text:
        "That's why every game page also tells you when the recording began. The longer the history runs, the more trustworthy that number gets. And for a game with only two or three entries so far, there's simply not much to go on, so treat its number as a rough reference rather than a verdict. If you spot a figure that doesn't match reality, tell me and I'll check it and fix it.",
    },

    { type: "h2", text: "How the 'Should I buy it now?' verdict works" },
    {
      type: "p",
      text:
        "The heart of Lowstamp is the verdict: it compares a game's current price against the lowest price on record and stamps the answer on the page like a stamp on a receipt. The math behind it is simple. If the current price matches the recorded low or sits right next to it, you get a stamp leaning toward 'go ahead and buy.' If it's well above the low, or there's no discount at all, you get one leaning toward 'it's fine to wait.' Everything in between is graded by how far the price sits from that low.",
    },
    {
      type: "p",
      text:
        "Being able to read the timing from a single stamp, without picking through a whole price history yourself, is the part of Lowstamp I've put the most work into. That said, the verdict only ever looks at price. It has no opinion on whether you'll enjoy the game or whether it will run on your machine, so the final call is yours.",
    },

    { type: "h2", text: "Get in touch" },
    {
      type: "p",
      text:
        "If a price looks wrong, or you have an idea for the site or a partnership to discuss, just email me at ibanisac@gmail.com. Running this alone means a reply might take a few days, but every message that comes in genuinely helps make the site better.",
    },
  ],
};
