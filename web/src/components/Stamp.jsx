import { useT } from "../lib/i18n";

// 영수증 도장. verdict()가 준 v(단계/색)를 살짝 기운 스탬프로 표시.
// 표시 문구(라벨/서브)는 단계(v.tier) 기준으로 번역 사전에서 가져온다(로직은 verdict.js 그대로).
// big=true면 모달/페이지 머리에 쓰는 큰 도장. note를 주면 둘째 줄을 그 값으로 대체한다.
//
// flat=true면 기울지 않은 한 줄 표시로 그린다. 목록에서 카드마다 도장이 찍혀 있으면
// 시그니처가 벽지가 되어 버려서, 목록에선 최상위 단계(★)만 도장을 쓰고 나머지는 이 납작한 형태를 쓴다.

// 도장은 종이에 찍혀야 도장으로 읽힌다. 패널 테마에선 배경이 어두워 도장이 그냥 '색깔 있는 네모'가
// 되어 버려서, 도장 뒤에만 영수증 조각을 깔고(CSS ::before) 그 위에 찍는 방식으로 되돌렸다.
// 그래서 도장 잉크색은 어두운 패널용(verdict.js 의 v.fg/bg/bd)이 아니라 아래 '종이 위' 값을 쓴다.
// 납작한 표시(flat)는 어두운 행 위에 그대로 놓이므로 v 의 색을 그대로 쓴다.
const PAPER = {
  "low-new": { fg: "#7A560F", bg: "#F4E5BD", bd: "#C8912B" },
  "low":     { fg: "#7A560F", bg: "#F4E5BD", bd: "#C8912B" },
  "near":    { fg: "#6B4E12", bg: "#EFE5C9", bd: "#B98A2C" },
  "recent":  { fg: "#33424E", bg: "#E3E8ED", bd: "#7E97AC" },
  "ok":      { fg: "#3E4C5C", bg: "#E8ECF0", bd: "#8FA3B4" },
  "weak":    { fg: "#4C5765", bg: "#EDEFF2", bd: "#A3ADB8" },
  "full":    { fg: "#7E2B22", bg: "#F0DAD6", bd: "#B5483C" },
};

export default function Stamp({ v, big, note, flat }) {
  const { t } = useT();
  const label = t("verdict." + v.tier + ".label");
  const sub = t("verdict." + v.tier + ".sub");

  if (flat) {
    return (
      <div className={"vflag" + (v.tier ? " tier-" + v.tier : "")} style={{ "--flag": v.bd }}>
        <span className="vflag-l">
          {v.star ? <span className="vflag-star">★ </span> : ""}
          {label}
        </span>
        <span className="vflag-s">{note || sub}</span>
      </div>
    );
  }

  const ink = PAPER[v.tier] || PAPER.weak;
  return (
    <div
      className={"stamp on-paper" + (big ? " big" : "") + (v.tier ? " tier-" + v.tier : "")}
      style={{
        color: ink.fg,
        background: ink.bg,
        border: `2px solid ${ink.bd}`,
        boxShadow: `0 0 0 2px ${ink.bg},0 0 0 3px ${ink.bd}`,
      }}
    >
      <span className="l">
        {v.star ? "★ " : ""}
        {label}
      </span>
      <span className="s" style={{ color: ink.fg }}>
        {note || sub}
      </span>
    </div>
  );
}
