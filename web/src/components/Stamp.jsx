// 영수증 도장. verdict()가 준 v(라벨/색)를 살짝 기운 스탬프로 표시.
// big=true면 모달 머리에 쓰는 큰 도장.
// note를 주면 둘째 줄을 그 값으로 대체한다(카드에선 '역대최저 N원'을 새겨 함께 보여준다).
export default function Stamp({ v, big, note }) {
  return (
    <div
      className={"stamp" + (big ? " big" : "") + (v.tier ? " tier-" + v.tier : "")}
      style={{
        color: v.fg,
        background: v.bg,
        border: `2px solid ${v.bd}`,
        boxShadow: `0 0 0 2px ${v.bg},0 0 0 3px ${v.bd}`,
      }}
    >
      <span className="l">
        {v.star ? "★ " : ""}
        {v.label}
      </span>
      <span className="s" style={{ color: v.fg }}>
        {note || v.sub}
      </span>
    </div>
  );
}
