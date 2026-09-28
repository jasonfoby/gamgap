// 언어 고정 주소(/ko/…, /ja/… 등)를 처리하는 공용 핸들러. functions/<lang>/[[path]].js 가 이걸 쓴다.
//
// 방식: 접두어를 떼어 낸 기본 경로의 기존 함수(홈·가이드·게임 등)를 그대로 부르되, 요청의 언어 표시
// (Accept-Language)를 그 언어로 바꿔 끼운다. 예를 들어 /ko/guide/x 는 “한국어 브라우저가 /guide/x 를
// 요청한 것”과 같은 화면을 받는다. 그다음 결과에서 canonical·og:url·구조화 데이터의 자기 주소를
// /ko/… 로 고치고, 봇용 본문 속 사이트 안 링크도 /ko/… 로 바꿔 로봇이 한국어판끼리 따라가게 한다.
// (기존 함수의 로직은 손대지 않는다 — 같은 화면을 주소만 다르게 내보내는 얇은 층.)
import { SITE, langPath } from "./langPath.js";
import * as home from "../index.js";
import * as guideIndex from "../guide/index.js";
import * as guideSlug from "../guide/[slug].js";
import * as game from "../game/[appid].js";
import * as newLows from "../new-lows.js";
import * as about from "../about.js";
import * as contact from "../contact.js";
import * as privacy from "../privacy.js";
import * as terms from "../terms.js";

const STATIC = { "/": home, "/guide": guideIndex, "/new-lows": newLows, "/about": about, "/contact": contact, "/privacy": privacy, "/terms": terms };

function route(base) {
  if (STATIC[base]) return { mod: STATIC[base], params: {} };
  let m = base.match(/^\/guide\/([^/]+)$/);
  if (m) return { mod: guideSlug, params: { slug: m[1] } };
  m = base.match(/^\/game\/([^/]+)$/);
  if (m) return { mod: game, params: { appid: m[1] } };
  return null;
}

export function langHandler(lang) {
  return async function onRequest(context) {
    const { request, env } = context;
    const url = new URL(request.url);
    const prefix = "/" + lang;

    // /ko → /ko/ (홈 주소를 하나로)
    if (url.pathname === prefix) return Response.redirect(`${url.origin}${prefix}/${url.search}`, 301);

    let base = url.pathname.slice(prefix.length) || "/";
    if (base.length > 1) base = base.replace(/\/+$/, "");
    const hit = route(base);

    if (!hit) {
      // 없는 주소: 껍데기 + 404 + noindex (소프트 404 방지)
      const shell = await env.ASSETS.fetch(new URL("/index.html", url));
      const html = (await shell.text()).replace("</head>", `<meta name="robots" content="noindex,follow"></head>`);
      return new Response(html, { status: 404, headers: { "content-type": "text/html; charset=utf-8" } });
    }

    const headers = new Headers(request.headers);
    headers.set("Accept-Language", lang);
    const inner = new Request(url.origin + base + url.search, { method: request.method, headers });
    const res = await hit.mod.onRequest({ ...context, request: inner, params: hit.params });

    // 기존 함수가 넘겨주기(301)를 하면 그 목적지에도 같은 언어 접두어를 붙인다(예: /ko/?game=1 → /ko/game/1).
    const loc = res.headers.get("Location");
    if (res.status >= 300 && res.status < 400 && loc) {
      const to = new URL(loc, url.origin);
      if (to.origin === url.origin) return Response.redirect(url.origin + langPath(lang, to.pathname) + to.search, res.status);
      return res;
    }
    if (!(res.headers.get("content-type") || "").includes("text/html")) return res;

    const self = SITE + langPath(lang, base);
    const oldSelf = SITE + base;
    let html = await res.text();
    html = html
      .replace(/(<link rel="canonical" href=")[^"]*"/, `$1${self}"`)
      .replace(/(<meta property="og:url" content=")[^"]*"/, `$1${self}"`)
      // 구조화 데이터 속 '이 페이지 주소'만 바꾼다(hreflang 링크의 영어판 주소는 그대로 둬야 함).
      .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, (blk) => blk.split(`"${oldSelf}"`).join(`"${self}"`));

    // 봇용 본문(#root 안) 속 사이트 안 링크를 같은 언어판으로.
    const i = html.indexOf('<div id="root">');
    if (i >= 0) {
      html = html.slice(0, i) + html.slice(i).replace(/href="(\/(?!\/)[^"]*)"/g, (_, p) => {
        const q = p.search(/[?#]/);
        const path = q < 0 ? p : p.slice(0, q);
        const tail = q < 0 ? "" : p.slice(q);
        return `href="${langPath(lang, path) + tail}"`;
      });
    }

    const out = new Headers(res.headers);
    out.delete("content-length");
    out.delete("Vary"); // 이 주소는 언어가 고정이라 방문자 언어에 따라 달라지지 않는다.
    return new Response(html, { status: res.status, headers: out });
  };
}
