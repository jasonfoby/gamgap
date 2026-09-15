// 다음 스팀 세일을 달력 파일(.ics)로 만들어 내려받게 한다.
// 계정·이메일·서버 없이, 방문자 자신의 달력(아이폰·삼성·구글·아웃룩)이 세일 시작을 알려주게 하는
// 가장 가벼운 '재방문 장치'다. 세일이 열리면 다시 와서 찜한 게임 값을 확인하게 만드는 게 목적.
import { track } from "./analytics";

const CRLF = String.fromCharCode(13, 10);
const BS = String.fromCharCode(92); // 백슬래시(소스에 직접 쓰지 않기 위해 문자 코드로)
const LF = String.fromCharCode(10);

// 달력 파일 규격(RFC 5545)의 글자 이스케이프: 백슬래시 · 쉼표 · 세미콜론 · 줄바꿈
function escText(s) {
  return String(s || "")
    .split(BS).join(BS + BS)
    .split(",").join(BS + ",")
    .split(";").join(BS + ";")
    .split(LF).join(BS + "n");
}

// 2026-10-01T17:00:00.000Z → 20261001T170000Z
function stamp(d) {
  return d.toISOString().split("-").join("").split(":").join("").split(".")[0] + "Z";
}

// 규격상 한 줄은 75바이트를 넘기지 않아야 한다. 한글은 글자당 3바이트라 설명이 길면 접어서 쓴다
// (다음 줄은 공백 하나로 시작). 대부분의 달력 앱은 안 접어도 읽지만 까다로운 앱을 위해 지킨다.
function fold(line) {
  const enc = new TextEncoder();
  let out = "";
  let cur = "";
  let bytes = 0;
  for (const ch of line) {
    const b = enc.encode(ch).length;
    if (bytes + b > 73) {
      out += cur + CRLF + " ";
      cur = "";
      bytes = 1;
    }
    cur += ch;
    bytes += b;
  }
  return out + cur;
}

// 화면 언어에 맞춘 제목·설명. t 는 useT() 의 번역 함수.
export function calendarTexts(t, sale) {
  return {
    title: t("cd.calTitle", { sale: t("sale." + sale.id) }),
    description: t("cd.calDesc"),
    url: "https://lowstamp.com/?tab=deals",
  };
}

// .ics 본문. 일정은 세일 기간 전체로 잡고, 시작 1시간 전에 알림이 뜨게 한다.
export function buildSaleIcs(sale, { title, description, url }) {
  const year = sale.start.getUTCFullYear();
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Lowstamp//Steam Sale Reminder//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:steam-${sale.id}-${year}@lowstamp.com`,
    `DTSTAMP:${stamp(new Date())}`,
    `DTSTART:${stamp(sale.start)}`,
    `DTEND:${stamp(sale.end)}`,
    `SUMMARY:${escText(title)}`,
    `DESCRIPTION:${escText(url ? description + " " + url : description)}`,
    ...(url ? [`URL:${url}`] : []),
    "BEGIN:VALARM",
    "ACTION:DISPLAY",
    `DESCRIPTION:${escText(title)}`,
    "TRIGGER:-PT1H",
    "END:VALARM",
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join(CRLF) + CRLF;
}

// 파일을 만들어 내려받게 한다. 실패해도 화면은 멀쩡하게 둔다.
export function downloadSaleIcs(sale, texts) {
  try {
    const blob = new Blob([buildSaleIcs(sale, texts)], { type: "text/calendar;charset=utf-8" });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = `steam-${sale.id}-sale-${sale.start.getUTCFullYear()}.ics`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(href), 1500);
    track("calendar_add", { sale: sale.id, year: sale.start.getUTCFullYear() });
  } catch {
    // 달력 추가는 부가 기능 — 에러를 삼킨다.
  }
}
