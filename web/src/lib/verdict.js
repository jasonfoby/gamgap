// "지금 사도 돼?" 판정. 게임 객체 g를 받아 도장에 쓸 라벨/색/설명을 돌려준다.
// 현재가가 역대최저보다 얼마나 높은지(gap)와 할인율(disc)로 5단계 판정.
// (원본 index.html의 verdict() 로직을 숫자 하나 바꾸지 않고 그대로 옮김)
export function verdict(g) {
  const low = Number(g.allTimeLow) || 0,
    cur = Number(g.currentPrice) || 0,
    disc = Number(g.discountPercent) || 0;
  const gap = low > 0 ? (cur - low) / low : 1;
  if (cur <= low)
    return {
      label: "지금이 역대 최저가",
      sub: "살 때예요",
      fg: "#7A560F",
      bg: "#F4E5BD",
      bd: "#C8912B",
      star: true,
      tip: "기록상 가장 싼 가격이에요. 더 기다린다고 떨어진다는 보장이 없으니, 원하던 게임이면 지금이 사기 좋은 시점이에요.",
    };
  if (gap <= 0.05)
    return {
      label: "거의 역대 최저가",
      sub: "사도 좋아요",
      fg: "#6B4E12",
      bg: "#EFE5C9",
      bd: "#B98A2C",
      tip: "역대 최저가와 거의 차이가 없어요. 몇백 원 더 아끼려고 무한정 기다리기보단 지금 사도 아깝지 않은 가격이에요.",
    };
  if (disc >= 50)
    return {
      label: "괜찮은 할인",
      sub: "더 내려간 적은 있어요",
      fg: "#0F5E58",
      bg: "#D6E8E5",
      bd: "#1C7C76",
      tip: "할인폭은 괜찮지만, 과거엔 이보다 더 싸게 풀린 적이 있어요. 급하지 않다면 큰 세일(여름·겨울)을 노려도 좋아요.",
    };
  if (disc > 0)
    return {
      label: "약한 할인",
      sub: "세일을 더 기다려도 OK",
      fg: "#3E4654",
      bg: "#E4E7EC",
      bd: "#8A93A3",
      tip: "할인이 크지 않아요. 위시리스트에 담아두고 더 큰 세일을 기다리는 편을 추천해요.",
    };
  return {
    label: "지금은 정가",
    sub: "세일을 기다리세요",
    fg: "#7E2B22",
    bg: "#F0DAD6",
    bd: "#B5483C",
    tip: "지금은 할인이 없어요. 스팀은 세일을 자주 하니, 위시리스트에 담아두고 알림을 기다리는 게 좋아요.",
  };
}
