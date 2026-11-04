# Lowstamp

**Lowstamp** is a Steam price tracker that answers one question in plain language: *should I buy this game now, or wait?* It shows the current price next to the lowest price it has recorded and gives a simple verdict, plus buying guides (refunds, family sharing, gifts, sale dates and more) in six languages.

스팀 게임의 현재 가격과 기록된 최저가를 나란히 보여주고 "지금 사도 돼?"를 쉬운 말로 알려주는 가격 추적 사이트예요.

Live site: **https://lowstamp.com** (한국어 · English · 日本語 · 简体中文 · Español · Português)

## What's inside

- **Price tracking** — a daily crawl of Steam store prices (KRW, plus USD, JPY, CNY, EUR and BRL for the most popular games), stored as a change-only history.
- **"Should I buy now?" verdict** — based on how far today's price is from the lowest price recorded.
- **Buying guides** — step-by-step articles on Steam refunds, Family Sharing, gifts, Remote Play Together, sale dates, DLC and more, written from Valve's official support pages.
- **Steam sale calendar** — Valve's published seasonal sale dates with a countdown and a calendar-reminder download.

## How it is built

- Frontend: Vite + React 18 on Cloudflare Pages. Pages Functions render crawler-friendly HTML and handle per-language URLs.
- API: a Cloudflare Worker backed by a D1 database (`worker.js`).
- Crawler: Python on GitHub Actions (`crawler.py`).

## Good to know

Price history starts in June 2026, so "lowest" means the lowest price Lowstamp has recorded, not an all-time low.

Lowstamp is an independent project. It is not affiliated with or endorsed by Valve Corporation. Steam and the Steam logo are trademarks of Valve Corporation.
