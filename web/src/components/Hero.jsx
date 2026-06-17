import SearchBar from "./SearchBar";

// 인기 검색어 칩 (원본 POPULAR에서 앞 6개 노출).
const POPULAR = [
  { q: "사이버펑크", id: 1091500 },
  { q: "엘든 링", id: 1245620 },
  { q: "발더스 게이트", id: 1086940 },
  { q: "하데스", id: 1145360 },
  { q: "스타듀", id: 413150 },
  { q: "할로우 나이트", id: 367520 },
];

// 본문 상단 히어로: 타이틀 + 한 줄 설명 + (좁은 화면 전용) 검색 + 인기 게임 칩.
// 데스크탑에선 검색이 헤더에 상주하므로 히어로 검색(.hero-search)은 CSS로 감춘다.
// 칩은 한글 검색어로 검색하면 영문 저장명(예: 사이버펑크↔Cyberpunk 2077)과 안 맞아 0건이 나오므로,
// 검색을 우회해 해당 appid 게임 상세를 바로 연다(onPickGame).
export default function Hero({ query, onQueryChange, onPickGame }) {
  return (
    <section className="hero">
      <h1>
        이 게임, <span className="g">지금</span> 사도 돼?
      </h1>
      <p className="sub">
        스팀 게임의 <b>역대 최저가</b>와 ‘지금 사도 되나’를 한 줄로 알려드려요. 원화 그대로, 키샵 없이.
      </p>

      <div className="hero-search">
        <SearchBar query={query} onQueryChange={onQueryChange} variant="hero" />
      </div>

      <div className="chips">
        {POPULAR.map((p) => (
          <button key={p.id} className="chip" onClick={() => onPickGame(p.id)}>
            {p.q}
          </button>
        ))}
      </div>
    </section>
  );
}
