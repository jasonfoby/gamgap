import "./Skeleton.css";

// 로딩 자리표시(스켈레톤). 실제 데이터가 오기 전 빈 화면 대신 카드 윤곽을 미리 깔아
// 레이아웃 점프(CLS)를 줄이고 "불러오는 중"이라는 신호를 자연스럽게 준다.
// 모든 자리표시 막대는 .skel-bar 의 shimmer 애니메이션을 공유한다.

// 막대 하나(범용). w/h 로 크기, br 로 모서리, style 로 추가 조정.
// 예: <Skeleton w="60%" h={14} /> → 가로 60%, 높이 14px 짜리 빛나는 바 한 줄.
export function Skeleton({ w = "100%", h = 12, br = 6, style }) {
  return <span className="skel-bar" style={{ width: w, height: h, borderRadius: br, ...style }} />;
}

// 카드 한 장 자리표시: 표지(460:215) → 제목 2줄 → 가격 → 도장 순으로
// 실제 GameCard 의 골격을 그대로 흉내 낸다.
function SkelCard() {
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

// 카드 그리드 자리표시. 바깥은 전역 .list(카드 그리드)로 감싸 실제 목록과 같은 칸에 들어맞는다.
// count: 깔아둘 카드 수(기본 8). 화면을 적당히 채울 만큼만.
export function ListSkeleton({ count = 8 }) {
  return (
    <div className="list" role="status" aria-busy="true" aria-label="목록 불러오는 중">
      {Array.from({ length: count }, (_, i) => (
        <SkelCard key={i} />
      ))}
      <span className="skel-sr">불러오는 중…</span>
    </div>
  );
}
