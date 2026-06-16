// 영수증 도장. verdict()가 준 v(라벨/색)를 살짝 기운 스탬프로 표시.
// big=true면 모달 머리에 쓰는 큰 도장.
export default function Stamp({ v, big }) {
  return (
    <div
      className={"stamp" + (big ? " big" : "")}
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
        {v.sub}
      </span>
    </div>
  );
}
