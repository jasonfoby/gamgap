// Cloudflare Pages 함수: /new-lows (이번 주 새 최저가)
//
// 이 페이지는 데이터가 매일 바뀌므로 정적 콘텐츠 모듈이 없다. 그래서 여기서 직접
// 워커의 최저가 목록을 받아 '최근에 최저 기록이 새로 세워진' 게임만 걸러 본문 HTML을 만든다
// (클라이언트 src/pages/LowsPage.jsx 와 같은 규칙 — 7일, 모자라면 14일, 리뷰 많은 순).
// JS를 안 돌리는 검색 로봇도 제목·설명글·실제 목록을 그대로 보게 되어 빈 껍데기로 나가지 않는다.
import { pickLang as pickLangShared, renderContent } from "./_shared/content.js";
import { translate } from "../src/i18n/index.js";

const API = "https://gamgap-api.ibanisac.workers.dev";

// 언어 → 스팀 지역코드(cc)·통화. src/lib/region.js 와 동기화 유지. ko 는 cc 없이(한국 기본) KRW.
const REGION = {
  ko: { cc: "", currency: "KRW" },
  en: { cc: "us", currency: "USD" },
  ja: { cc: "jp", currency: "JPY" },
  zh: { cc: "cn", currency: "CNY" },
  es: { cc: "es", currency: "EUR" },
  pt: { cc: "br", currency: "BRL" },
};

const CUR = {
  KRW: { sym: "₩", dec: 0 },
  USD: { sym: "$", dec: 2 },
  JPY: { sym: "¥", dec: 0 },
  CNY: { sym: "¥", dec: 2 },
  EUR: { sym: "€", dec: 2 },
  BRL: { sym: "R$", dec: 2 },
};

const DAYS_PRIMARY = 7;
const DAYS_FALLBACK = 14;
const MIN_SHOWN = 6;
const MAX_SHOWN = 60;
const FETCH_PAGES = 6;
const PAGE = 100;

function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// 통화 기호 + 천단위 콤마 + 언어별 소수 자릿수 (functions/game/[appid].js 와 동일 규칙).
function fmtMoney(n, currency, lang) {
  const info = CUR[currency] || CUR.KRW;
  const v = Number(n) || 0;
  const [intPart, decPart] = v.toFixed(info.dec).split(".");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const num = decPart ? `${grouped}.${decPart}` : grouped;
  if (lang === "ko" && currency === "KRW") return `${num}원`;
  return `${info.sym}${num}`;
}

function cutoffDate(days) {
  return new Date(Date.now() - days * 86400000).toISOString().slice(0, 10);
}

// 최근 days 일 안에 최저 기록이 세워진 게임을, 리뷰 많은 순으로.
function pickRecent(rows, days) {
  const cut = cutoffDate(days);
  return rows
    .filter((g) => g && g.allTimeLowDate && g.allTimeLowDate >= cut)
    .sort((a, b) => (Number(b.reviewTotal) || 0) - (Number(a.reviewTotal) || 0))
    .slice(0, MAX_SHOWN);
}

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const lang = pickLangShared(request.headers.get("Accept-Language"));
  const region = REGION[lang] || REGION.en;
  const shell = await env.ASSETS.fetch(new URL("/index.html", url));

  // 목록을 못 받아도 페이지가 깨지지 않게: 실패하면 설명글만 있는 본문으로 나간다.
  const rows = [];
  try {
    const ccQuery = region.cc ? `&cc=${encodeURIComponent(region.cc)}` : "";
    const seen = new Set();
    for (let i = 0; i < FETCH_PAGES; i++) {
      const r = await fetch(`${API}/api/lowest-today?limit=${PAGE}&offset=${i * PAGE}${ccQuery}`);
      if (!r.ok) break;
      const data = await r.json();
      if (!Array.isArray(data) || data.length === 0) break;
      let added = 0;
      for (const g of data) {
        if (g && g.appid && !seen.has(g.appid)) {
          seen.add(g.appid);
          rows.push(g);
          added++;
        }
      }
      // 서버가 offset 을 무시하고 같은 묶음을 다시 줬거나 마지막 묶음이면 멈춘다.
      if (added === 0 || data.length < PAGE) break;
    }
  } catch {
    /* 목록 없이 진행 */
  }

  let picked = pickRecent(rows, DAYS_PRIMARY);
  let days = DAYS_PRIMARY;
  if (picked.length < MIN_SHOWN) {
    const wider = pickRecent(rows, DAYS_FALLBACK);
    if (wider.length > picked.length) {
      picked = wider;
      days = DAYS_FALLBACK;
    }
  }

  const T = (k, vars) => translate(lang, k, vars);
  const li = (g) => {
    // 지역 데이터가 없는 게임은 워커가 원화로 폴백하므로 currency 를 그대로 존중한다.
    const cur = g.currency || (region.cc ? region.currency : "KRW");
    const now = fmtMoney(g.currentPrice, cur, lang);
    const was = Number(g.normalPrice) > Number(g.currentPrice) ? ` (${fmtMoney(g.normalPrice, cur, lang)})` : "";
    const off = Number(g.discountPercent) > 0 ? ` -${Number(g.discountPercent)}%` : "";
    const on = g.allTimeLowDate ? ` · ${esc(g.allTimeLowDate)}` : "";
    return `<li><a href="/game/${encodeURIComponent(g.appid)}">${esc(g.name)}</a> — ${esc(now)}${esc(was)}${esc(off)}${on}</li>`;
  };

  const listHtml = picked.length
    ? `<ul>${picked.map(li).join("")}</ul><p>${esc(T("lows.updated"))}</p>`
    : `<p>${esc(T("lows.empty"))}</p>`;

  const bodyHtml =
    `<h1>${esc(T("lows.title"))}</h1>` +
    `<p>${esc(T("lows.intro1"))}</p>` +
    `<p>${esc(T("lows.intro2"))}</p>` +
    `<p>${esc(T("lows.intro3"))}</p>` +
    `<h2>${esc(T("lows.listHeading", { days }))}</h2>` +
    listHtml +
    `<h2>${esc(T("lows.readHeading"))}</h2>` +
    `<p>${esc(T("lows.read1"))}</p>` +
    `<p>${esc(T("lows.read2"))}</p>` +
    `<p>${esc(T("lows.disclosure"))}</p>`;

  const res = renderContent(shell, {
    lang,
    pathname: "/new-lows",
    mod: { title: T("lows.metaTitle"), description: T("lows.metaDesc") },
    bodyHtml,
  });

  const out = new Response(res.body, res);
  out.headers.set("Vary", "Accept-Language");
  // 목록이 하루 한 번 바뀌므로 짧게 캐시해 봇 재방문 때 워커를 매번 때리지 않게 한다.
  out.headers.set("Cache-Control", "public, max-age=600, must-revalidate");
  return out;
}
