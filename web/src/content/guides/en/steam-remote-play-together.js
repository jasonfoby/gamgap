// Guide: Steam Remote Play Together - play with friends when only one of you owns the game
//
// Fact sources, checked 2026-09-16:
//   - Steam Support "Steam Remote Play" (help.steampowered.com/en/faqs/view/0689-74B8-92AC-10F2):
//     friends don't need to own or launch the game, invite steps (launch game, Shift+Tab overlay,
//     right-click friend, Remote Play Together, accept), wired network recommended, quad-core host CPU
//     recommended, lower resolution / vsync / Remote Play settings, non-gamepad DirectInput controllers
//     (wheels, flight sticks) not supported.
//   - Steam store Remote Play page (store.steampowered.com/remoteplay): one player owns and runs the game,
//     up to four players or more with fast connections can join, free, not supported for VR, phones /
//     tablets / TVs join through the Steam Link app even if the game doesn't support mobile.
//   - Steamworks docs (partner.steamgames.com/doc/features/remoteplay): only the host owns and installs,
//     on automatically for games listed with local multiplayer / local co-op / shared or split screen,
//     developers can turn it off.
//   - Steam Remote Play group post (2021 "Invite Anyone"): people without a Steam account can join by link
//     through the Steam Link app (Steam is used if installed). At launch only one link guest was allowed.
//   - Steam client UI strings (2026-09-16, installed client steamui/localization/friendsui_*): "Add Guest",
//     "Copy Link", "Add Another Guest: Create another link in order to invite an additional guest player.",
//     "Guest #N (joined via invite link)". Today each link admits one guest and you can make more links.
//     Do not go back to "only one person by link". Invite failure causes (Remote Play disabled, Invisible,
//     broadcast, VR, screen locked, country) come from the same strings.
//   - 2019 launch announcement: players use their own controllers and can share keyboard and mouse.
// Do not state player counts beyond Steam's wording, and keep the note that the game's own limit applies.
// Korean source: ko/steam-remote-play-together.js (same block structure).

export default {
  "slug": "steam-remote-play-together",
  "title": "Steam Remote Play Together: Play With Friends When Only One of You Owns the Game",
  "description": "Remote Play Together streams one person's game to their friends so everyone can play, and only the host needs to own it. Which games support it, how to invite friends (including friends without a Steam account), and how to cut lag, checked against Steam's official pages.",
  "date": "2026-09-16",
  "tags": [
    "Remote Play Together",
    "playing with friends",
    "saving money",
    "buying tips"
  ],
  "readMins": 7,
  "body": [
    {
      "type": "p",
      "text": "Getting four friends into a party game gets a lot harder when all four have to buy it. Steam has a feature called Remote Play Together that lets friends join your game over the internet when only you own it. Think of it as taking a local co-op or couch party game and stretching the couch all the way to your friends' houses. Your friends don't buy or install anything, and the feature itself is free."
    },
    {
      "type": "note",
      "text": "This guide is based on Steam Support's Steam Remote Play page and the Remote Play page on the Steam store, both checked in September 2026. Steam moves menus around from time to time, so if something looks different, look for the Remote Play Together name."
    },
    {
      "type": "table",
      "caption": "Remote Play Together basics",
      "head": [
        "Topic",
        "How it works"
      ],
      "rows": [
        [
          "Who needs to buy the game",
          "Only the host who runs it. Friends don't buy or install it"
        ],
        [
          "How many players",
          "Up to four, or more with fast connections, according to Steam. You still can't go past the number of players the game itself supports"
        ],
        [
          "Which games work",
          "Games that list Remote Play Together in the game details on their store page"
        ],
        [
          "Where friends join from",
          "A computer with Steam, or a phone, tablet or TV with the Steam Link app"
        ],
        [
          "Friends without a Steam account",
          "They can join through an invite link, one person per link"
        ],
        [
          "Cost",
          "Free"
        ],
        [
          "Saves and achievements",
          "The game runs on the host's computer, so they stay on the host's account"
        ],
        [
          "What doesn't work",
          "VR games, and some controllers that aren't gamepads, like racing wheels and flight sticks"
        ]
      ]
    },
    {
      "type": "h2",
      "text": "How is it different from Family Sharing?"
    },
    {
      "type": "p",
      "text": "Both let several people enjoy one copy of a game, so they're easy to mix up, but they work in completely different ways. Steam Families lets family members install a game on their own computers and play separately, and since it's meant for one household, leaving a family comes with a one-year limit. Remote Play Together runs the game on the host's computer, streams the picture to your friends and sends their button presses back. So your friends don't need to be family, and there's nothing to join or leave. The catch is that it only works with games built for sharing one screen, and when the host quits, everyone's done."
    },
    {
      "type": "cta",
      "text": "If the people you want to share with live under the same roof, Steam Families may suit you better, since everyone can install and play on their own.",
      "label": "Read the Steam Family Sharing guide",
      "to": "/guide/steam-family-sharing"
    },
    {
      "type": "h2",
      "text": "Four players, one copy"
    },
    {
      "type": "p",
      "text": "Say a party game costs $19.99. If four friends each buy it, that's $79.96. With Remote Play Together, the host pays $19.99 and the other three just accept the invite. The difference feels bigger for games you only get together for once in a while. If a friend also wants to play it alone at home, though, they'll need their own copy."
    },
    {
      "type": "h2",
      "text": "How to check whether a game supports it"
    },
    {
      "type": "p",
      "text": "Open the game's page in the Steam store and look at the game details on the right. If Remote Play Together is listed there, you're good. Steam turns the feature on automatically for games listed with local multiplayer or split screen, but developers can switch it off, so check the listing even for games that look like they'd work. Portal 2's store page, for example, shows Remote Play Together next to its split-screen co-op. Games that only have online co-op and don't show the label won't work this way."
    },
    {
      "type": "h2",
      "text": "How to invite a friend"
    },
    {
      "type": "ol",
      "items": [
        "The host (the person who owns the game) launches it.",
        "Make sure your friend is signed in to Steam on a computer or through the Steam Link app.",
        "Press Shift+Tab in the game to open the Steam overlay.",
        "In your friends list, right-click your friend and choose Remote Play Together.",
        "Once your friend accepts, they're in the game with you."
      ]
    },
    {
      "type": "note",
      "text": "Friends play with their own controllers, and the host can let them use keyboard and mouse too. If a friend's input isn't doing anything in the game, the host can open the Steam overlay and check that friend's input devices in the Remote Play panel."
    },
    {
      "type": "h2",
      "text": "A friend without a Steam account can join too"
    },
    {
      "type": "p",
      "text": "Since 2021 you can invite people who don't have a Steam account with an invite link. The host picks Add Guest in the Remote Play Together panel of the Steam overlay and shares the link with Copy Link. Your friend installs the Steam Link app and joins from there, and if they already have Steam installed, Steam handles the connection instead. When the feature launched, a link could bring in only one guest, but Steam now has an Add Another Guest option. Each link works for one person, so you make another link for each extra guest. The Steam Link app runs on Windows, iOS, Android and more."
    },
    {
      "type": "h2",
      "text": "Cutting down on lag"
    },
    {
      "type": "ul",
      "items": [
        "The host should use a wired connection if possible. Steam's own support page recommends it.",
        "If the picture stutters for your friends, lower the game's resolution on the host and turn off vsync.",
        "In Steam's Remote Play settings you can favor speed over quality, cap the bandwidth, and lower the maximum capture resolution.",
        "Steam recommends at least a quad-core CPU on the host. Any recent laptop is fine on your friend's side."
      ]
    },
    {
      "type": "p",
      "text": "It also helps to set expectations. Your friends are watching a video of the host's screen, so everything reaches them a little late. That's why party games, co-op puzzle games and turn-based games feel better than rhythm or fighting games that need split-second timing. Progress and achievements stay on the host's account too, because that's where the game is running, so a friend who wants their own record needs their own copy."
    },
    {
      "type": "h2",
      "text": "Only one of you has to buy it, so buy it cheap"
    },
    {
      "type": "p",
      "text": "In the end, the host is the only one paying. The only question is when to buy that one copy, so a few days before game night, check whether today's price is close to the lowest price we've tracked for it. If a big sale is coming up soon, waiting for it is an option too."
    },
    {
      "type": "cta",
      "text": "Wondering whether the game the host is buying is cheap right now? Start with the sale list. For every game, it shows in one line how close today's price is to the lowest we've tracked.",
      "label": "See games on sale now",
      "to": "/?tab=deals"
    },
    {
      "type": "faq",
      "title": "Remote Play Together questions",
      "items": [
        {
          "q": "Do friends need to own the game for Remote Play Together?",
          "a": "No. Only the host who runs the game needs to own it. Friends don't buy or install anything."
        },
        {
          "q": "How many people can play with Remote Play Together?",
          "a": "Steam says up to four players, or more with fast connections. You still can't go past the number of players the game itself supports."
        },
        {
          "q": "Can a friend without a Steam account join?",
          "a": "Yes. The host sends an invite link made with Add Guest, and your friend joins without an account by installing the Steam Link app. Each link works for one person, so make another link for each extra guest."
        },
        {
          "q": "Does Remote Play Together work with every game?",
          "a": "No. Only games that list Remote Play Together in their store page details. It's on automatically for games listed with local multiplayer or split screen, but developers can switch it off."
        },
        {
          "q": "Can friends join from a phone?",
          "a": "Yes. With the Steam Link app they can join from a phone, tablet or TV. They're receiving a stream of the host's screen, so the game doesn't need to support mobile devices."
        },
        {
          "q": "My friend's controls aren't doing anything. What should I check?",
          "a": "The host can press Shift+Tab to open the Steam overlay and check, in the Remote Play panel, that the friend's controller or keyboard and mouse are turned on."
        },
        {
          "q": "Why does my Remote Play Together invite fail?",
          "a": "Steam's own error messages point to a handful of causes: Remote Play is turned off in Steam's settings, you're set to Invisible, a broadcast is running, VR is active, your screen is locked, or the game isn't available in your country. Check which one the message names and fix that first."
        },
        {
          "q": "Whose account gets the saves and achievements?",
          "a": "The host's, because the game runs on the host's computer. A friend who wants progress on their own account needs their own copy."
        },
        {
          "q": "The stream keeps stuttering. How do I fix it?",
          "a": "Have the host use a wired connection, lower the game's resolution, and set Steam's Remote Play settings to favor speed over quality."
        },
        {
          "q": "How is it different from Steam Family Sharing?",
          "a": "Steam Families lets people in one household install games and play separately. Remote Play Together lets friends share the host's screen. For playing with friends, Remote Play Together is the better fit, with no family group to join and no one-year rule."
        }
      ]
    },
    {
      "type": "quote",
      "text": "For games you play together, one person buys the game and everyone shares the screen. Just buy that one copy when it's cheap."
    }
  ]
};
