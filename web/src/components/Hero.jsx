import SearchBar from "./SearchBar";
import { FAMOUS } from "../lib/dealSort";
import { useT, tNodes } from "../lib/i18n";

// 로딩 중 자리표시(스켈레톤) 칩 너비들 — 유명작을 보여줬다 바꾸는 깜빡임 대신 회색 칩을 잠깐 보여준다.
const SKEL_WIDTHS = [120, 92, 112, 84, 132, 100];

// 본문 상단 히어로: 타이틀 + 한 줄 설명 + (좁은 화면 전용) 검색 + 인기 게임 칩.
// popular: App이 할인 목록에서 '리뷰 많은 유명작'으로 추린 {q,id}[]. 3개 이상이면 그걸 쓰고,
// 아직 로딩 중이면 스켈레톤, 로딩이 끝났는데도 없으면(데이터 오류 등) FAMOUS로 폴백.
export default function Hero({ query, onQueryChange, onPickGame, popular, popularLoading }) {
  const { t } = useT();
  const chips = popular && popular.length >= 3 ? popular : popularLoading ? null : FAMOUS;
  return (
    <section className="hero">
      <h1>{tNodes(t("hero.title"), { hl: <span className="g">{t("hero.titleHl")}</span> })}</h1>
      <p className="sub">{tNodes(t("hero.sub"), { b: <b>{t("hero.subB")}</b> })}</p>

      <div className="hero-search">
        <SearchBar query={query} onQueryChange={onQueryChange} variant="hero" />
      </div>

      <div className="chips">
        {chips
          ? chips.map((p) => (
              <button key={p.id} className="chip" onClick={() => onPickGame(p.id)}>
                {p.q}
              </button>
            ))
          : SKEL_WIDTHS.map((w, i) => (
              <span key={i} className="chip-skel" style={{ width: w }} aria-hidden="true" />
            ))}
      </div>
    </section>
  );
}
