// 서버 함수(Cloudflare Pages Functions) 로컬 시험 — 배포 없이 응답 HTML 을 확인한다.
//
// 쓰는 법(저장소 맨 위에서):
//   cd web && npm run build            # dist/index.html(정적 껍데기)이 필요하다
//   node scripts/fn-harness/run.mjs    # 전부 통과하면 'ALL PASS' 와 함께 종료 코드 0
//
// 방식: esbuild(web/node_modules)로 각 함수를 한 파일로 묶어 불러오고, 클라우드플레어에만 있는 HTMLRewriter 는
//   mock_rewriter.mjs(우리 함수가 쓰는 동작만 흉내 낸 간이판)로 대신한다. npm 'htmlrewriter' 는 한글 일부에서 멈춰 쓰지 않는다.
//   게임·워커 호출은 가짜 fetch 로 막는다(실제 데이터베이스를 건드리지 않는다).
// 확인하는 규칙: 번역 언어판(ja·zh·es·pt) noindex·사이트맵·hreflang, 가이드 봇용 본문(빵부스러기·글쓴이·관련 글)·구조화 데이터,
//   없는 글 404, 허브 메타, 홈 구조화 데이터, 게임 JSON-LD 의 '&'.
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "../../web");
const OUT = path.join(HERE, ".out"); // .gitignore 에 넣어 둔 임시 폴더
const esbuild = createRequire(ROOT + "/package.json")("esbuild");
const { MockRewriter, SyncResponse } = await import("./mock_rewriter.mjs");
globalThis.HTMLRewriter = MockRewriter;

fs.mkdirSync(OUT, { recursive: true });
const entries = {
  ja: "functions/ja/[[path]].js",
  ko: "functions/ko/[[path]].js",
  es: "functions/es/[[path]].js",
  guideSlug: "functions/guide/[slug].js",
  guideIndex: "functions/guide/index.js",
  home: "functions/index.js",
  sitemap: "functions/sitemap.xml.js",
  game: "functions/game/[appid].js",
};
const mods = {};
for (const [k, f] of Object.entries(entries)) {
  const out = path.join(OUT, k + ".mjs");
  await esbuild.build({ entryPoints: [path.join(ROOT, f)], bundle: true, format: "esm", platform: "neutral", outfile: out, logLevel: "error", mainFields: ["module", "main"] });
  mods[k] = await import(pathToFileURL(out).href + "?v=" + Date.now());
}

const shellPath = path.join(ROOT, "dist/index.html");
if (!fs.existsSync(shellPath)) throw new Error("web/dist/index.html 이 없다 — 먼저 cd web && npm run build");
const shell = fs.readFileSync(shellPath, "utf8");
const env = { ASSETS: { fetch: async () => new SyncResponse(shell, { headers: { "content-type": "text/html; charset=utf-8" } }) } };
const ctx = (url, headers = {}, params = {}) => ({ request: new Request(url, { headers }), env, params, waitUntil() {} });

let fail = 0;
const ok = (c, m) => { console.log((c ? "  ✓ " : "  ✗ ") + m); if (!c) fail++; };
const robots = (h) => (h.match(/<meta name="robots" content="([^"]*)"/) || [])[1];
const hreflangs = (h) => [...h.matchAll(/<link rel="alternate" hreflang="([^"]*)"/g)].map((m) => m[1]).join(",");
const ld = (h) => [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
const noscript = (h) => (h.match(/<noscript><main[^>]*>([\s\S]*?)<\/main><\/noscript>/) || [])[1] || "";

console.log("■ 번역 언어판은 noindex, 영어·한국어는 아님");
let r = await mods.ja.onRequest(ctx("https://lowstamp.com/ja/guide/steam-refund-policy"));
let h = await r.text();
ok(robots(h) === "noindex,follow" && hreflangs(h) === "", "/ja/ 글: noindex, hreflang 없음");
r = await mods.es.onRequest(ctx("https://lowstamp.com/es/"));
ok(robots(await r.text()) === "noindex,follow", "/es/ 홈: noindex");
r = await mods.ko.onRequest(ctx("https://lowstamp.com/ko/guide/steam-refund-policy"));
h = await r.text();
ok(robots(h) === undefined && hreflangs(h) === "en,ko,x-default", "/ko/ 글: noindex 없음, hreflang en,ko,x-default");
r = await mods.guideSlug.onRequest(ctx("https://lowstamp.com/guide/steam-refund-policy", { "Accept-Language": "ja" }, { slug: "steam-refund-policy" }));
h = await r.text();
ok(robots(h) === undefined && hreflangs(h) === "en,ko,x-default", "접두어 없는 영어 글: 방문자 언어가 일본어여도 noindex 없음");
r = await mods.sitemap.onRequest(ctx("https://lowstamp.com/sitemap.xml"));
const locs = [...(await r.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(locs.length > 100 && !locs.some((u) => /\/(ja|zh|es|pt)\//.test(u)), "사이트맵에 ja·zh·es·pt 주소 없음 (" + locs.length + "개)");

console.log("■ 가이드 봇용 본문·구조화 데이터");
r = await mods.guideSlug.onRequest(ctx("https://lowstamp.com/guide/steam-refund-policy", { "Accept-Language": "en" }, { slug: "steam-refund-policy" }));
h = await r.text();
const ns = noscript(h);
ok(/<nav aria-label="Breadcrumb"><a href="\/">Home<\/a> › <a href="\/guide">Guides<\/a> › <span>/.test(ns), "빵부스러기");
ok(/<a href="\/about" rel="author">/.test(ns), "글쓴이 → 소개 링크");
ok((ns.match(/<li><a href="\/guide\/[a-z-]+">/g) || []).length >= 3, "관련 글 3개 이상");
const l = ld(h);
ok(l.some((o) => o["@type"] === "Article" && o.author && o.author["@type"] === "Organization"), "Article(글쓴이=Organization)");
ok(l.some((o) => o["@type"] === "BreadcrumbList" && o.itemListElement.length === 3), "BreadcrumbList 3단계");
ok(l.some((o) => o["@type"] === "FAQPage"), "FAQPage");
r = await mods.ko.onRequest(ctx("https://lowstamp.com/ko/guide/steam-refund-policy"));
ok(noscript(await r.text()).includes('href="/ko/about"'), "/ko/ 에서 봇용 본문 링크가 /ko/ 로");

console.log("■ 소프트 404·허브·홈·게임");
r = await mods.guideSlug.onRequest(ctx("https://lowstamp.com/guide/zzz-nope", { "Accept-Language": "en" }, { slug: "zzz-nope" }));
ok(r.status === 404 && /noindex/.test(await r.text()), "없는 글: 404 + noindex");
r = await mods.guideIndex.onRequest(ctx("https://lowstamp.com/guide", { "Accept-Language": "ko" }));
ok(/<title>가이드 · Lowstamp<\/title>/.test(await r.text()), "허브 제목이 언어별");
r = await mods.home.onRequest(ctx("https://lowstamp.com/", { "Accept-Language": "en" }));
const hl = ld(await r.text());
ok(hl.some((o) => o["@type"] === "WebSite") && hl.some((o) => o["@type"] === "Organization"), "홈 WebSite + Organization");
globalThis.fetch = async (url) =>
  String(url).includes("/api/game/")
    ? new Response(JSON.stringify({ appid: 105600, name: "Dungeons & Dragons: Test", currentPrice: 9.99, normalPrice: 9.99, discountPercent: 0, allTimeLow: 9.99, allTimeLowDate: "2026-06-19", currency: "USD", history: [{ d: "2026-06-19", p: 9.99 }], reviewTotal: 5000 }), { headers: { "content-type": "application/json" } })
    : new Response("{}", { status: 404 });
r = await mods.game.onRequest(ctx("https://lowstamp.com/game/105600", { "Accept-Language": "en" }, { appid: "105600" }));
const prod = ld(await r.text()).find((o) => o["@type"] === "Product");
ok(prod && prod.name === "Dungeons & Dragons: Test", "게임 JSON-LD 이름의 '&' 그대로");

console.log(fail ? `\n실패 ${fail}건` : "\nALL PASS");
process.exit(fail ? 1 : 0);
