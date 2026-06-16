// 상단 바: 로고 + "오늘 N개 역대 최저가" 배지.
export default function Header({ lowCount }) {
  return (
    <header>
      <div className="bar">
        <div className="logo">
          <span className="dot"></span>겜값
        </div>
        <span className="badge">
          오늘 <b>{lowCount}</b>개 역대 최저가
        </span>
      </div>
    </header>
  );
}
