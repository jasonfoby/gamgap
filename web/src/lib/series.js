import { useCallback, useMemo, useState } from "react";

// 시리즈 묶기 — 같은 개발사의 "권·편·부제만 다른" 게임들이 같은 값·같은 할인율로 줄지어 나오면
// (예: UBERMOSH Vol.3 / Vol.5 / :WRAITH / :BLACK … 8개가 전부 550원·-90%) 목록을 도배하지 않게
// 한 장으로 접고, 카드 아래 "시리즈 N개 더" 버튼으로 펼쳐 볼 수 있게 한다.
//
// 묶는 조건(넷 다 만족해야 함 — 엉뚱한 게임이 섞이지 않게 일부러 좁게 잡음):
//   ① 개발사가 같다(없으면 안 묶음)  ② 이름의 밑동(부제·권수·에디션 표기를 뗀 앞부분)이 같다
//   ③ 지금 가격이 같다  ④ 할인율이 같다
// 그래서 '위쳐 2'와 '위쳐 3'처럼 값이 다른 본편 시리즈는 각각 따로 보인다.
// 대표 카드는 리뷰가 가장 많은 것(=제일 알려진 것). 검색 결과·찜 목록에는 쓰지 않는다.

// 부제 구분자: 콜론, 또는 양옆에 공백이 있는 대시·세로줄 ("Half-Life"처럼 붙은 하이픈은 자르지 않음)
const SEP = /\s*[:：]\s*|\s+[-–—|]\s+/;
// 꼬리의 권·편·장·숫자·로마숫자
const TRAIL = /\s*(?:vol\.?|volume|part|episode|ep\.?|chapter|ch\.?|book|season|no\.?|#)?\s*(?:[0-9]+|[ivx]{1,5})\s*$/i;
// 꼬리의 에디션 표기
const EDITION =
  /\s+(?:hd|remastered|remake|classic|classics|goty|complete edition|definitive edition|special edition|deluxe edition|anniversary edition|goty edition|edition)\s*$/i;

// 이름의 밑동. "UBERMOSH Vol.7" → "ubermosh", "Serious Sam Classic: The First Encounter" → "serious sam"
export function seriesBase(name) {
  let n = String(name || "")
    .toLowerCase()
    .trim()
    .split(SEP)[0]
    .trim();
  let prev;
  do {
    prev = n;
    n = n.replace(TRAIL, "").replace(EDITION, "").trim();
  } while (n && n !== prev);
  return n;
}

// 묶음 키. 묶을 수 없는 게임(개발사 없음·이름 너무 짧음)은 null.
export function seriesKey(g) {
  const dev = String(g.developer || "").trim().toLowerCase();
  if (!dev) return null;
  const base = seriesBase(g.name);
  if (!base || base.length < 3) return null;
  return `${dev}|${base}|${Number(g.currentPrice) || 0}|${Number(g.discountPercent) || 0}`;
}

// rows 를 같은 순서로 돌려주되, 묶음(2개 이상)은 대표 한 장으로 접는다.
//   접힌 대표: { ...대표게임, seriesKey, seriesCount, seriesItems }
//   펼친 묶음(expanded 에 키가 있음): 첫 장에만 { seriesKey, seriesCount, seriesExpanded:true } 표시(접기 버튼용)
export function collapseSeries(rows, expanded) {
  const groups = new Map();
  const order = [];
  for (const g of rows || []) {
    const k = seriesKey(g);
    if (!k) {
      order.push({ single: g });
      continue;
    }
    if (!groups.has(k)) {
      groups.set(k, []);
      order.push({ key: k });
    }
    groups.get(k).push(g);
  }
  const out = [];
  for (const o of order) {
    if (o.single) {
      out.push(o.single);
      continue;
    }
    const items = groups.get(o.key);
    if (items.length < 2) {
      out.push(items[0]);
      continue;
    }
    if (expanded && expanded.has(o.key)) {
      items.forEach((g, i) =>
        out.push(i === 0 ? { ...g, seriesKey: o.key, seriesCount: items.length, seriesExpanded: true } : g)
      );
      continue;
    }
    const rep = items.reduce(
      (a, b) => ((Number(b.reviewTotal) || 0) > (Number(a.reviewTotal) || 0) ? b : a),
      items[0]
    );
    out.push({ ...rep, seriesKey: o.key, seriesCount: items.length, seriesItems: items });
  }
  return out;
}

// 목록 컴포넌트용 훅: 접힌 목록(items)과 묶음 펼치기/접기 토글(toggle)을 돌려준다.
export function useSeriesCollapse(rows) {
  const [expanded, setExpanded] = useState(() => new Set());
  const items = useMemo(() => collapseSeries(rows, expanded), [rows, expanded]);
  const toggle = useCallback((key) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);
  return { items, toggle };
}
