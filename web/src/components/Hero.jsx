import SearchBar from "./SearchBar";
import { useT, tNodes } from "../lib/i18n";

// 인기 게임 칩 폴백(리뷰 데이터가 아직 없을 때만 사용). 누구나 아는 유명작 영문명.
// 평소엔 App이 전달하는 popular(지금 할인 중 + 리뷰 많은 순)로 동적 표시된다.
const POPULAR = [
  { q: "Cyberpunk 2077", id: 1091500 },
  { q: "Elden Ring", id: 1245620 },
  { q: "Baldur's Gate 3", id: 1086940 },
  { q: "Hades", id: 1145360 },
  { q: "Stardew Valley", id: 413150 },
  { q: "Hollow Knight", id: 367520 },
];

// 본문 상단 히어로: 타이틀 + 한 줄 설명 + (좁은 화면 전용) 검색 + 인기 게임 칩.
// popular: App이 할인 목록에서 리뷰 많은 순으로 추린 {q,id}[]. 3개 이상이면 그걸, 아니면 폴백.
export default function Hero({ query, onQueryChange, onPickGame, popular }) {
  const { t } = useT();
  const chips = popular && popular.length >= 3 ? popular : POPULAR;
  return (
    <section className="hero">
      <h1>{tNodes(t("hero.title"), { hl: <span className="g">{t("hero.titleHl")}</span> })}</h1>
      <p className="sub">{tNodes(t("hero.sub"), { b: <b>{t("hero.subB")}</b> })}</p>

      <div className="hero-search">
        <SearchBar query={query} onQueryChange={onQueryChange} variant="hero" />
      </div>

      <div className="chips">
        {chips.map((p) => (
          <button key={p.id} className="chip" onClick={() => onPickGame(p.id)}>
            {p.q}
          </button>
        ))}
      </div>
    </section>
  );
}
