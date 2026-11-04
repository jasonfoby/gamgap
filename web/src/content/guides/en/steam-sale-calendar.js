// Guide: when is the next Steam sale. Valve's officially announced dates, through summer 2027.
// Block array (body) is drawn by ArticleBody. Plain text only, no HTML tags.
//
// ⚠ The seasonal sale dates here are Valve's confirmed dates from Steamworks, not estimates.
//   Keep them identical to the CONFIRMED array in src/lib/saleCalendar.js, and keep the Korean master
//   (ko/steam-sale-calendar.js) in step. The tables, FAQ and title all repeat the same dates.
// ⚠ The Autumn Sale has been in late September / early October since 2025, not November. Don't revert.
// Voice: plain blogger English, contractions, no em-dashes, never "all-time low".

export default {
  "slug": "steam-sale-calendar",
  "title": "Steam Sale Dates 2026: Winter Sale Starts December 17, Plus Every Confirmed Sale Through 2027",
  "description": "The next Steam sale is the Winter Sale, December 17, 2026 at 10 AM Pacific through January 4, 2027. Here's the start time in your time zone, Valve's confirmed dates through summer 2027, the themed fests in between, and how to decide whether to buy now or wait.",
  "date": "2026-08-29",
  "updated": "2026-11-05",
  "tags": ["Steam sales", "Steam Winter Sale", "sale dates", "buying guide"],
  "readMins": 10,
  "body": [
    {
      "type": "p",
      "text": "Straight to the answer: the next Steam sale is the Winter Sale. It opens December 17, 2026 at 10:00 AM Pacific (1:00 PM Eastern, 6:00 PM in the UK) and runs through January 4, 2027, a full 18 days and the longest sale of the year. The Autumn Sale already ended on October 8. Until December, the only dated event on Valve's calendar is a small themed one, the Auto-Battler RPG Fest from November 16 to 23. Valve has also said Black Friday discounts are coming, but it hasn't published dates yet."
    },
    { "type": "sale-reminder" },
    {
      "type": "p",
      "text": "These dates aren't anybody's guess. Valve publishes them in advance in the official documentation it keeps for developers and publishers, usually six months' worth at a time and anywhere from five to eleven months ahead. So there's no need to predict when the next sale might land. You can just look it up."
    },
    { "type": "h2", "text": "Valve's confirmed seasonal sale dates" },
    {
      "type": "p",
      "text": "As of November 5, 2026, Valve has published dates through the Summer 2027 sale. The Autumn 2027 dates aren't out yet. This table uses the dates exactly as Valve lists them, with Pacific time as the clock."
    },
    {
      "type": "table",
      "caption": "Steam seasonal sale dates (Valve's official schedule, Pacific time)",
      "head": ["Sale", "Opens", "Closes", "Length"],
      "rows": [
        ["Winter Sale 2026", "Dec 17, 2026, 10 AM PT", "Jan 4, 2027, 10 AM PT", "18 days"],
        ["Spring Sale 2027", "Mar 18, 2027, 10 AM PT", "Mar 25, 2027, 10 AM PT", "7 days"],
        ["Summer Sale 2027", "Jun 24, 2027, 10 AM PT", "Jul 8, 2027, 10 AM PT", "14 days"],
        ["Autumn Sale 2026 (ended)", "Oct 1, 2026, 10 AM PT", "Oct 8, 2026, 10 AM PT", "7 days"]
      ]
    },
    { "type": "h2", "text": "What time does the Winter Sale start where you live?" },
    {
      "type": "p",
      "text": "Valve opens and closes every seasonal sale at 10:00 AM Pacific, so the clock time on your wall depends on where you are. Here's the Winter Sale in a few time zones, both the opening and the closing."
    },
    {
      "type": "table",
      "caption": "Winter Sale 2026 opening and closing time around the world",
      "head": ["Where", "Opens", "Closes"],
      "rows": [
        ["US Pacific", "Thu, Dec 17, 10:00 AM", "Mon, Jan 4, 10:00 AM"],
        ["US Eastern", "Thu, Dec 17, 1:00 PM", "Mon, Jan 4, 1:00 PM"],
        ["UK", "Thu, Dec 17, 6:00 PM", "Mon, Jan 4, 6:00 PM"],
        ["Central Europe", "Thu, Dec 17, 7:00 PM", "Mon, Jan 4, 7:00 PM"],
        ["Turkey, Saudi Arabia", "Thu, Dec 17, 9:00 PM", "Mon, Jan 4, 9:00 PM"],
        ["India", "Thu, Dec 17, 11:30 PM", "Mon, Jan 4, 11:30 PM"],
        ["Thailand, Vietnam, western Indonesia", "Fri, Dec 18, 1:00 AM", "Tue, Jan 5, 1:00 AM"],
        ["Philippines, Malaysia, Singapore, China", "Fri, Dec 18, 2:00 AM", "Tue, Jan 5, 2:00 AM"],
        ["Japan, Korea", "Fri, Dec 18, 3:00 AM", "Tue, Jan 5, 3:00 AM"],
        ["Eastern Australia (Sydney, Melbourne)", "Fri, Dec 18, 5:00 AM", "Tue, Jan 5, 5:00 AM"]
      ]
    },
    {
      "type": "note",
      "text": "A couple of quirks. The US is on standard time in winter and daylight time the rest of the year, so the same 10 AM Pacific start lands an hour earlier on the clock in places that don't change theirs, like India, Japan, and Korea. The Spring, Summer and Autumn sales open an hour earlier there than the Winter Sale does. And since every sale closes at the hour it opened, the last day ends in the early hours of the next morning in Asia and Australia, and before lunch on the US East Coast. Wherever you are, don't leave the final purchase for the last evening."
    },
    { "type": "h2", "text": "The thing most sites still get wrong: the Autumn Sale isn't in November anymore" },
    {
      "type": "p",
      "text": "This is the most important part of the page. Through 2024, the Autumn Sale landed in late November, right around Black Friday. Then in 2025 Valve moved it forward by almost two months, to late September and early October. This year's Autumn Sale, October 1 to 8, followed the same pattern."
    },
    {
      "type": "p",
      "text": "The problem is that the web is still full of older articles saying Steam's Autumn Sale happens in late November. Believe those and wait, and you end up waiting for a sale that already ended. This year that meant sitting on a game you could have bought cheaply in early October, with only smaller events left before Black Friday and the Winter Sale in mid-December."
    },
    {
      "type": "p",
      "text": "Valve never explained the change publicly. The Autumn Sale is the part that moved. Late November now belongs to a separate event, Black Friday, covered next."
    },
    { "type": "h2", "text": "Steam Black Friday 2026: what we know so far" },
    {
      "type": "p",
      "text": "Steam ran its first-ever Black Friday sale in 2025, from late November through December 1, a few weeks after the Autumn Sale had moved to early October. Valve's calendar for 2026 says Black Friday discounts are coming again, with the dates still to be announced. As of November 5, 2026, the Steamworks schedule I check doesn't list dates for it."
    },
    {
      "type": "p",
      "text": "So there's no date to put in your calendar yet. Last year it ran through the last week of November, which is where I'd look first, on Steam's front page. It isn't one of the four seasonal sales, and nobody has promised it will be as big as one, so the same rule applies: compare the price with the lowest we've tracked before you buy."
    },
    { "type": "h2", "text": "Which of the four is actually the biggest? Length is your clue" },
    {
      "type": "p",
      "text": "The four seasonal sales don't carry equal weight, and the easiest way to gauge them is by how long Valve keeps them open. Longer sales tend to pull in more participating games and deeper cuts. Winter is the longest at 18 days, Summer runs 14, and Spring and Autumn get a week each."
    },
    {
      "type": "ul",
      "items": [
        "Winter Sale (18 days): the biggest event of the year, with the widest participation.",
        "Summer Sale (14 days): the other heavyweight. Big-budget releases tend to take their deepest cuts here.",
        "Spring Sale (7 days): short and comparatively modest, but still clearly cheaper than a normal week.",
        "Autumn Sale (7 days): similar in scale to Spring, with the feel of a last chance before Winter."
      ]
    },
    {
      "type": "p",
      "text": "So if a game isn't urgent, aiming for Summer or Winter is the statistically better bet. But that's a general tendency, not a rule for any specific game. Plenty of titles hit their lowest tracked price during a Spring sale and then offer something unremarkable in December. More on that below."
    },
    { "type": "h2", "text": "The event that looks like a sale but isn't: Next Fest" },
    {
      "type": "p",
      "text": "Look at Steam's calendar and you'll see a big event called Next Fest three times a year. The name is loud and the whole storefront lights up for it, so it's easy to mistake for a sale. It isn't one. Next Fest is a festival of demos for games that haven't launched yet. It's not a place to open your wallet. It's a place to try things before you ever have to."
    },
    {
      "type": "ul",
      "items": [
        "Next Fest: October 19 to October 26, 2026 (already over)",
        "Next Fest: February 22 to March 1, 2027",
        "Next Fest: June 14 to June 21, 2027"
      ]
    },
    {
      "type": "p",
      "text": "There's actually a thrifty way to use it. Play the demos, wishlist the ones you liked, and when those games launch and eventually run their first discount, you'll be buying something you already know you enjoy. That's a much better feeling than refunding a blind purchase two hours in."
    },
    { "type": "h2", "text": "The themed sales that fill the gaps" },
    {
      "type": "p",
      "text": "Nothing much happens between the big sales, right? Not quite. Valve runs smaller events almost every month, each built around a genre or theme, discounting only the games that fit. They're nowhere near the scale of a seasonal sale, but if a game you've been eyeing happens to match the theme, the price can be just as good. These are the ones Valve has scheduled so far."
    },
    {
      "type": "ul",
      "items": [
        "Auto-Battler RPG Fest: November 16 to 23, 2026",
        "Desktop Companion Fest: January 14 to 18, 2027",
        "Shop Keeper Fest: January 25 to February 1, 2027",
        "Sheep Fest: February 4 to 8, 2027",
        "Couch Co-Op Fest: February 8 to 15, 2027",
        "Rhythm Fest: March 8 to 15, 2027",
        "Dinos vs. Robots Fest: March 29 to April 5, 2027",
        "Racing Fest: April 12 to 19, 2027",
        "Witch Fest: April 22 to 26, 2027",
        "Fighting Fest: April 26 to May 3, 2027",
        "Real-Time Strategy Fest: May 10 to 17, 2027",
        "Mountaineering Fest: May 31 to June 3, 2027"
      ]
    },
    {
      "type": "note",
      "text": "Themed sales only touch games that fit the theme, which is why a stretch without a seasonal sale isn't as discouraging as it sounds. If the game you want is an auto-battler, the fest on November 16 is effectively its sale. If it's a rhythm game, look at March."
    },
    { "type": "h2", "text": "Knowing the dates doesn't actually get you a good price" },
    {
      "type": "p",
      "text": "If you've read this far and marked your calendar, you're halfway there. The other half is a slightly uncomfortable truth: a seasonal sale doesn't mean every game hits its cheapest price. A game can wear a 70% badge during the Summer Sale and still be more expensive than it was last December at 75%."
    },
    {
      "type": "p",
      "text": "The reverse happens just as often. Some ordinary week with no sale attached, a game quietly drops below anything it has charged before. Every game has its own discount rhythm, and the seasonal sales are just a large wave rolling over the top of it."
    },
    {
      "type": "quote",
      "text": "What matters isn't the discount percentage. It's the gap between today's price and the lowest price we've tracked for that game."
    },
    { "type": "h2", "text": "Buy now, or wait for the sale?" },
    {
      "type": "p",
      "text": "In practice, four questions at the checkout screen are enough. Work through them in order and the answer usually falls out on its own."
    },
    {
      "type": "ol",
      "items": [
        "Find the lowest price we've tracked for this game, and compare it to today's price.",
        "If today's price is at or near that low, stop deliberating. Buy it.",
        "If the gap is noticeably wide, count the days to the next big sale. Under two weeks is worth waiting for.",
        "If you'd be waiting months, count the time you won't be playing as part of the cost. Saving five dollars isn't always worth three months."
      ]
    },
    {
      "type": "p",
      "text": "Lowstamp handles the first two steps for you. Search for a game and you'll see today's price next to the lowest we've tracked, with the gap between them worked out into a plain verdict, a receipt stamp that tells you whether it's a good moment to buy. For step three, the countdown at the top of this page tracks the confirmed dates listed here. Star the games you're watching and you can check them all at once later, when prices have moved."
    },
    {
      "type": "cta",
      "text": "Star the games you want before the Winter Sale opens, and on day one you can check which of them are actually cheap in a single look.",
      "label": "See what's on sale now",
      "to": "/?tab=deals"
    },
    {
      "type": "note",
      "text": "One thing to be upfront about: Lowstamp only started recording prices in June 2026. So the low you see here isn't the cheapest this game has ever been since release. It's the cheapest we've seen while watching. For older games in particular, there may well have been a better price before we started. That gets more accurate as our records grow, but for now it's worth knowing."
    },
    { "type": "h2", "text": "When does this calendar get longer?" },
    {
      "type": "p",
      "text": "Valve typically publishes six months of dates at a time, twice a year, in late January and mid-July. That means the Autumn and Winter 2027 dates will most likely surface around late January 2027. Until then nobody knows the exact days, and if you find a site that already lists them, those are estimates extrapolated from past years."
    },
    {
      "type": "p",
      "text": "I check Valve's official event schedule for developers myself and update this page whenever new dates are announced. The last check was on November 5, 2026. In the end there's only one thing to memorize: know roughly when the next big sale is, but when you're actually staring at the buy button, look at the game's price history rather than the calendar. That single habit does more than anything else to stop you overpaying."
    },
    {
      "type": "sources",
      "title": "Sources and when they were checked",
      "items": [
        {
          "label": "Valve Steamworks: Upcoming Steam Sales and Events",
          "url": "https://partner.steamgames.com/doc/marketing/upcoming_events",
          "note": "Seasonal sales, Next Fest and themed fests. Checked November 5, 2026."
        },
        {
          "label": "Valve Steamworks: Seasonal Sales",
          "url": "https://partner.steamgames.com/doc/marketing/discounts/seasonalsales",
          "note": "Seasonal sale dates. Checked November 5, 2026."
        },
        {
          "label": "Valve Steamworks: Discounting",
          "url": "https://partner.steamgames.com/doc/marketing/discounts",
          "note": "Steam's daily and weeklong deals also switch over at 10 AM Pacific. Checked November 5, 2026."
        },
        {
          "label": "dlcompare: Valve confirms the complete schedule of Steam events in 2026",
          "url": "https://www.dlcompare.co.uk/gaming-news/valve-reveals-the-full-lineup-of-steam-events-scheduled-throughout-2026-70170",
          "note": "News report from January 2026, the source for Black Friday 2026 being listed with dates still to come."
        },
        {
          "label": "PC Gamer: Steam's first-ever Black Friday sale",
          "url": "https://www.pcgamer.com/games/steam-black-friday-sale-2025/",
          "note": "News report on the 2025 sale."
        }
      ]
    },
    {
      "type": "faq",
      "title": "Steam sale dates: common questions",
      "items": [
        {
          "q": "When is the next Steam sale?",
          "a": "The Winter Sale, from December 17, 2026 at 10 AM Pacific to January 4, 2027. Before that, the only dated Valve event is the Auto-Battler RPG Fest, November 16 to 23, which discounts only auto-battler games. Black Friday discounts are also expected, but the dates haven't been published."
        },
        {
          "q": "What time does the Steam Winter Sale start?",
          "a": "10:00 AM Pacific on December 17, 2026. That's 1:00 PM Eastern, 6:00 PM in the UK, 7:00 PM in Central Europe, 11:30 PM in India, and 3:00 AM on December 18 in Japan and Korea."
        },
        {
          "q": "When does the Steam Winter Sale end?",
          "a": "January 4, 2027 at 10:00 AM Pacific, which is 6:00 PM in the UK and 3:00 AM on January 5 in Japan and Korea. At 18 days it's the longest sale of the year."
        },
        {
          "q": "Is there a Steam Black Friday sale in 2026?",
          "a": "Valve has said Black Friday discounts are coming, but as of November 5, 2026 it hasn't published dates. Last year Steam ran its first-ever Black Friday sale, from late November through December 1, 2025. It isn't one of the four seasonal sales, so watch Steam's front page in the second half of November."
        },
        {
          "q": "When was the Steam Autumn Sale in 2026?",
          "a": "October 1 to October 8, 2026, opening and closing at 10 AM Pacific. It's over. The 2027 Autumn Sale dates haven't been announced."
        },
        {
          "q": "When is the Steam Spring Sale in 2027?",
          "a": "March 18 to March 25, 2027, opening at 10 AM Pacific. It runs seven days."
        },
        {
          "q": "When is the Steam Summer Sale in 2027?",
          "a": "June 24 to July 8, 2027, opening at 10 AM Pacific. It runs 14 days."
        },
        {
          "q": "Is Steam Next Fest a sale?",
          "a": "No. It's a festival of demos for games that haven't launched yet. The next ones are February 22 to March 1, 2027 and June 14 to 21, 2027."
        },
        {
          "q": "Are these Steam sale dates official?",
          "a": "Yes. They come from Valve's official event schedule for developers on Steamworks, which Valve usually updates twice a year, in late January and mid-July."
        },
        {
          "q": "Is a Steam sale always the cheapest time to buy?",
          "a": "No. Some games hit their lowest price outside the seasonal sales, and some run shallower discounts than they used to. Compare today's price with the lowest price tracked for that game instead of trusting the discount badge."
        }
      ]
    }
  ]
};
