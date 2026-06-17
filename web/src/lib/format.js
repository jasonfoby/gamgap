// 원화 정수를 화면용 문자열로. 예: 66000 → "66,000원"
export function won(n) {
  return (Number(n) || 0).toLocaleString("ko-KR") + "원";
}

// "2024-11" / "2024-11-xx" 같은 날짜 문자열을 "2024년 11월"로. 못 읽으면 원문 그대로.
export function ym(d) {
  if (!d) return "";
  const m = String(d).match(/(\d{4})-(\d{1,2})/);
  return m ? `${m[1]}년 ${Number(m[2])}월` : String(d);
}

// 게임 이름 글자 합으로 표지 그라데이션 배경색을 정한다 (이름마다 고정 색).
export function coverGradient(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h += name.charCodeAt(i);
  h = (h * 37) % 360;
  return `linear-gradient(150deg,hsl(${h} 38% 30%),hsl(${(h + 40) % 360} 42% 18%))`;
}

// 표지에 크게 박을 첫 글자.
export function coverInitial(name) {
  return name.trim().charAt(0) || "?";
}
