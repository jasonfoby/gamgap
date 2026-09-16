// Guide: Steam gifts - how to send one, schedule it, decline it, and get a gift refunded
//
// Fact sources, checked 2026-09-16:
//   - Steam Support "Steam Gifts" (help.steampowered.com/en/faqs/view/2C02-3563-B72F-F117):
//     friends list only, new purchases only (you can't transfer games you own), Add to cart -> "This is a gift" ->
//     "Continue to gift options" -> "Select gift recipient" -> "As soon as possible" / "Schedule delivery" (up to 12 months
//     from purchase) -> "Continue to payment" -> "Purchase". Recipient has 30 days to accept or decline (auto cancel and
//     refund otherwise), declining refunds the buyer's payment method automatically. Scheduled gifts sit in the Steam
//     Inventory ("Manage gift" changes the date), gift history under Inventory "..." "View Gift History". Refunds within
//     14 days of purchase and under 2 hours played by the recipient (Steam Wallet if the payment method can't take it).
//     Unredeemed: buyer requests via "Purchases". Redeemed: recipient first allows it ("Allow the original purchaser of
//     this gift to request a refund"), then the buyer requests. Can't send: already owned, region restrictions,
//     DLC needs base game, "Complete Your Collection" bundles, multipacks, non-giftable titles.
//   - Steam refund policy (store.steampowered.com/steam_refunds): unredeemed gifts 14 days / 2 hours, redeemed gifts
//     under the same conditions if the recipient initiates, money returns to the original purchaser.
//   - Steam Support "Revoked Gifts" (558E-7FF0-1C5C-D1EE): removed after fraud or payment dispute refunds, no account
//     restriction, traded items not restored, Steam doesn't support gift sales outside Steam (ask the seller).
//   - Steam Support "Steam Wallet" (78E3-7431-1E88-AD59): wallet funds can't be moved or gifted; Digital Gift Cards can.
//   - Steam Support "Common Refund Questions" (5FDE-BA65-ACCE-A411): bought right before a sale -> refund if eligible
//     and repurchase at the sale price.
// Menu names in quotes match Steam's English support page.
// Korean source: ko/steam-gifts.js (same block structure).

export default {
  "slug": "steam-gifts",
  "title": "Steam Gifts: How to Send a Game, Schedule It, and Get a Gift Refunded",
  "description": "You can gift a new Steam purchase to anyone on your friends list and schedule it up to 12 months out. The recipient has 30 days to accept or decline, and even a redeemed gift can be refunded if it meets the rules. Why a gift won't send and exactly how gift refunds work, using the menu names from Steam's own support pages.",
  "date": "2026-09-16",
  "tags": [
    "Steam gifts",
    "gift refunds",
    "saving money",
    "buying tips"
  ],
  "readMins": 8,
  "body": [
    {
      "type": "p",
      "text": "If you want to buy a friend a game for their birthday, Steam lets you send it as a gift right at checkout. The person has to be on your Steam friends list, and it has to be a new purchase, not a game you already own. If they decline it or leave it for 30 days, the money comes back automatically, and even a redeemed gift can be refunded if it meets the conditions. Gift refunds work differently before and after the gift is redeemed, so that part gets its own sections."
    },
    {
      "type": "note",
      "text": "This guide is based on Steam Support's Steam Gifts page and Steam's refund policy, both checked in September 2026. Menu names in quotes match Steam's English support page."
    },
    {
      "type": "table",
      "caption": "Steam gift basics",
      "head": [
        "Topic",
        "How it works"
      ],
      "rows": [
        [
          "Who can receive a gift",
          "Anyone on your Steam friends list"
        ],
        [
          "What you can send",
          "A new purchase. You can't hand over a game you already own"
        ],
        [
          "When it arrives",
          "Right away, or scheduled up to 12 months after purchase"
        ],
        [
          "Time to accept",
          "30 days after delivery. If nothing happens, it's canceled and refunded"
        ],
        [
          "If the recipient declines",
          "Automatic refund to the buyer's payment method"
        ],
        [
          "Refund conditions",
          "Bought within the last 14 days and played less than 2 hours by the recipient"
        ],
        [
          "Refunding a redeemed gift",
          "The recipient agrees first, then the buyer requests the refund"
        ],
        [
          "Where refunded money goes",
          "The buyer's original payment method, or Steam Wallet if that isn't supported"
        ]
      ]
    },
    {
      "type": "h2",
      "text": "How to send a gift"
    },
    {
      "type": "ol",
      "items": [
        "On the game's store page, click \"Add to cart\".",
        "Choose \"This is a gift\" from the drop-down menu.",
        "Click \"Continue to gift options\", then \"Select gift recipient\", and pick your friend.",
        "Choose \"As soon as possible\" or \"Schedule delivery\". You can schedule up to 12 months from the purchase date.",
        "Click \"Continue to payment\", pick a payment method, agree to the terms and click \"Purchase\"."
      ]
    },
    {
      "type": "note",
      "text": "The recipient gets an email with your personal message and instructions for redeeming the gift. If your Steam Wallet balance doesn't cover the whole price, you can pay the rest with another payment method."
    },
    {
      "type": "h2",
      "text": "Changing a scheduled delivery date"
    },
    {
      "type": "p",
      "text": "A gift scheduled for a future date sits in your Steam Inventory until it's delivered. Find the purchase with the gift icon under Account Details and \"View purchase history\", go to your Steam Inventory, and click \"Manage gift\" to pick a different date. On the new date it's sent automatically, and you get an email once it's delivered. Every gift you've sent is also listed in your Steam Inventory under \"...\" and \"View Gift History\"."
    },
    {
      "type": "h2",
      "text": "When a gift won't send"
    },
    {
      "type": "p",
      "text": "If you can't select someone on your friends list, Steam's support page points to six possible reasons."
    },
    {
      "type": "ul",
      "items": [
        "Your friend already owns the game. Their name shows up grayed out and can't be selected.",
        "Because prices differ by region, some games can't be gifted to someone in a different purchase region. The restriction is noted on the store page, and Steam Support can't change it.",
        "DLC can only be gifted if your friend owns the base game.",
        "Bundles marked \"Complete Your Collection\" on the store page are customized for your account, so they can't be gifted.",
        "Multipacks (2-, 3- and 4-packs) can't be gifted as a whole. You buy one for your own account and gift the extra copies one at a time, and you can't buy a multipack if you already own the game.",
        "Some games can't be gifted at all. For those, the gift option never shows up at checkout."
      ]
    },
    {
      "type": "note",
      "text": "If gifting a game keeps failing, you can send a Steam Digital Gift Card instead and let your friend pick the game. Just note that the balance in your own Steam Wallet can't be moved or gifted to another account."
    },
    {
      "type": "h2",
      "text": "How the recipient accepts a gift"
    },
    {
      "type": "p",
      "text": "When the gift is delivered, the recipient gets an email with a link to redeem it, plus a gift notification in the Steam client. Clicking \"1 New Gift\" opens the gift page, and \"Accept Gift\" adds the game to their library for good. \"Decline Gift\" triggers an automatic refund to the buyer's payment method, and the buyer gets an email saying the gift was declined. If the recipient does nothing for 30 days, Steam cancels the purchase and refunds it."
    },
    {
      "type": "h2",
      "text": "Gifts can be refunded too"
    },
    {
      "type": "p",
      "text": "A gift can be refunded if it was bought within the last 14 days and the recipient has played it for less than 2 hours. If the refund is approved, the money goes back to the payment method the buyer used, or to their Steam Wallet if that method doesn't support refunds. The 14 days count from the purchase date, not the delivery date. How you request it depends on whether the recipient has redeemed the gift yet."
    },
    {
      "type": "p",
      "text": "If it hasn't been redeemed, the buyer can request the refund directly. Sign in to Steam Support, open \"Purchases\", click the game with the gift icon, choose \"I would like a refund\", pick a reason and click \"Submit Request\". You'll get an email once it's processed."
    },
    {
      "type": "h2",
      "text": "Refunding a gift that was already redeemed"
    },
    {
      "type": "p",
      "text": "The recipient has to agree first. If the buyer asks before that, the request is declined with a message saying the recipient needs to agree to the refund on the help site. Here's what the recipient does."
    },
    {
      "type": "ol",
      "items": [
        "Sign in to Steam Support and choose \"Games, Software, etc.\".",
        "Find the gifted game in the list and click it.",
        "Pick the reason that best explains why you're not keeping the gift.",
        "Choose \"I'd like to request a refund\" and check \"Allow the original purchaser of this gift to request a refund\" to finish.",
        "Once the recipient has agreed, the buyer submits their own refund request for the gift purchase."
      ]
    },
    {
      "type": "cta",
      "text": "What to do past 2 hours or 14 days, plus the refund rules for in-game items and Steam Wallet funds, are all in the refund guide.",
      "label": "Read the Steam refund guide",
      "to": "/guide/steam-refund-policy"
    },
    {
      "type": "h2",
      "text": "Buy on sale, deliver on the birthday"
    },
    {
      "type": "p",
      "text": "Since you can schedule a gift up to 12 months ahead, you can grab a game during a sale and have it arrive on a birthday or anniversary. Keep in mind that the 14-day refund window starts on the purchase date, so if you schedule far ahead, the window closes before the gift even arrives. On the flip side, if a sale starts a few days after you bought a gift, Steam's own refund FAQ says you can refund an eligible purchase and buy it again at the sale price."
    },
    {
      "type": "cta",
      "text": "Before you buy a gift, check whether today's price is a good one. Every game on sale gets a one-line verdict comparing its price with the lowest we've tracked.",
      "label": "See games on sale now",
      "to": "/?tab=deals"
    },
    {
      "type": "h2",
      "text": "Gifts bought outside Steam can disappear"
    },
    {
      "type": "p",
      "text": "Be careful with cheap \"Steam gifts\" sold on other websites. If the payment that bought a gift is refunded because of fraud or a payment dispute, the game is removed from the recipient's library. Steam says it doesn't support selling gifts outside of Steam, so you'd have to ask the seller for your money back, and Steam won't restore any items you traded away for the gift. Your account isn't restricted, but to play the game again you'd need to buy it or get another gift copy."
    },
    {
      "type": "faq",
      "title": "Steam gift questions",
      "items": [
        {
          "q": "Can you gift a Steam game to someone who isn't your friend?",
          "a": "No. You pick the recipient from your Steam friends list, so you can only gift games to people you've added as friends."
        },
        {
          "q": "Can you give a game you already own to a friend?",
          "a": "No. You can only gift new purchases. Once a gift is redeemed, it belongs to the recipient and can't be moved again."
        },
        {
          "q": "How far ahead can you schedule a Steam gift?",
          "a": "Up to 12 months from the purchase date. You can change the date later with \"Manage gift\" in your Steam Inventory."
        },
        {
          "q": "What happens if your friend never accepts the gift?",
          "a": "If they don't accept or decline within 30 days of delivery, Steam cancels the purchase and refunds your original payment method."
        },
        {
          "q": "Where does the money go if a gift is declined?",
          "a": "It's automatically refunded to the buyer's payment method, and the buyer gets an email saying the gift was declined."
        },
        {
          "q": "Can a redeemed Steam gift be refunded?",
          "a": "Yes, if it was bought within the last 14 days and the recipient has played less than 2 hours. The recipient agrees to the refund on Steam Support first, then the buyer requests it. The money goes back to the buyer."
        },
        {
          "q": "Can you gift DLC on Steam?",
          "a": "Only if your friend owns the base game."
        },
        {
          "q": "Can you send a Steam gift to a friend in another country?",
          "a": "It depends on the game. Because prices differ by region, some games can't be gifted to someone in a different purchase region, and the store page notes the restriction."
        },
        {
          "q": "A gifted game disappeared from my library. Why?",
          "a": "If the payment for the gift was refunded because of fraud or a payment problem, the game gets removed. Your account isn't restricted, but you'd need to buy it or receive another gift copy to play again."
        },
        {
          "q": "Can you send your Steam Wallet balance to a friend?",
          "a": "No. Wallet funds can't be moved or gifted to another account. You can buy a Steam Digital Gift Card for them instead."
        }
      ]
    },
    {
      "type": "quote",
      "text": "Buy the gift on sale and schedule the date. Just remember the refund window counts from the day you bought it, not the day it arrives."
    }
  ]
};
