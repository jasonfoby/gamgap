import { useT } from "../lib/i18n";

// 영수증 도장. verdict()가 준 v(단계/색)를 살짝 기운 스탬프로 표시.
// 표시 문구(라벨/서브)는 단계(v.tier) 기준으로 번역 사전에서 가져온다(로직은 verdict.js 그대로).
// big=true면 모달/페이지 머리에 쓰는 큰 도장. note를 주면 둘째 줄을 그 값으로 대체한다.
export default function Stamp({ v, big, note }) {
  const { t } = useT();
  const label = t("verdict." + v.tier + ".label");
  const sub = t("verdict." + v.tier + ".sub");
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
        {label}
      </span>
      <span className="s" style={{ color: v.fg }}>
        {note || sub}
      </span>
    </div>
  );
}
