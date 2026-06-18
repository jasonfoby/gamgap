import SearchBar from "./SearchBar";
import { useT, tNodes } from "../lib/i18n";

// 인기 게임 칩. 라벨은 전 세계 공통으로 통하는 영문 정식 게임명으로 둔다(어느 언어 UI에서도 자연스럽게).
// 칩을 누르면 검색 대신 해당 appid 게임 페이지로 바로 이동한다(onPickGame).
const POPULAR = [
  { q: "Cyberpunk 2077", id: 1091500 },
  { q: "Elden Ring", id: 1245620 },
  { q: "Baldur's Gate 3", id: 1086940 },
  { q: "Hades", id: 1145360 },
  { q: "Stardew Valley", id: 413150 },
  { q: "Hollow Knight", id: 367520 },
];

// 본문 상단 히어로: 타이틀 + 한 줄 설명 + (좁은 화면 전용) 검색 + 인기 게임 칩.
export default function Hero({ query, onQueryChange, onPickGame }) {
  const { t } = useT();
  return (
    <section className="hero">
      <h1>{tNodes(t("hero.title"), { hl: <span className="g">{t("hero.titleHl")}</span> })}</h1>
      <p className="sub">{tNodes(t("hero.sub"), { b: <b>{t("hero.subB")}</b> })}</p>

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
