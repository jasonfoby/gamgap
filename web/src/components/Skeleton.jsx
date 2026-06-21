import { useT } from "../lib/i18n";
import "./Skeleton.css";

// 로딩 자리표시(스켈레톤). 실제 데이터가 오기 전 빈 화면 대신 카드 윤곽을 미리 깔아
// 레이아웃 점프(CLS)를 줄이고 "불러오는 중"이라는 신호를 자연스럽게 준다.

// 막대 하나(범용). w/h 로 크기, br 로 모서리, style 로 추가 조정.
export function Skeleton({ w = "100%", h = 12, br = 6, style }) {
  return <span className="skel-bar" style={{ width: w, height: h, borderRadius: br, ...style }} />;
}

// 카드 한 장 자리표시: 실제 GameCard 의 골격을 그대로 흉내 낸다.
export function SkelCard() {
  return (
    <div className="skel-card" aria-hidden="true">
      <div className="skel-img" />
      <div className="skel-body">
        <div className="skel-title">
          <span className="skel-bar" />
          <span className="skel-bar skel-title2" />
        </div>
        <span className="skel-bar skel-price" />
        <span className="skel-bar skel-stamp" />
      </div>
    </div>
  );
}

// 카드 낱장 묶음(감싸는 .list 없음). 이미 있는 목록 그리드 '안에' 이어 붙여
// 진짜 카드와 같은 간격·열 정렬로 보이게 할 때 쓴다(무한 스크롤의 다음 묶음 자리표시).
export function SkelCards({ count = 4 }) {
  return Array.from({ length: count }, (_, i) => <SkelCard key={"skel" + i} />);
}

// 카드 그리드 자리표시. count: 깔아둘 카드 수(기본 8).
export function ListSkeleton({ count = 8 }) {
  const { t } = useT();
  return (
    <div className="list" role="status" aria-busy="true" aria-label={t("skel.listAria")}>
      {Array.from({ length: count }, (_, i) => (
        <SkelCard key={i} />
      ))}
      <span className="skel-sr">{t("common.loading")}</span>
    </div>
  );
}
