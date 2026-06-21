// 검색 별칭 — 줄임말·현지어 게임 이름을 '실제 검색에 쓸 영어 핵심어'로 바꿔준다.
// DB의 게임 이름이 대부분 영어라, "위처"·"갓오워"·"엘든링"처럼 쳐도
// "Witcher"·"God of War"·"Elden Ring"을 찾게 해준다(검색 매칭 보강).
//
// 모양: { term: 검색에 쓸 영어 핵심어, a: [그 게임을 가리키는 별칭들 — 한국어 줄임말·현지표기·영어 약칭] }
// 별칭은 너무 짧거나 흔한 말은 피한다(엉뚱한 게임이 매칭되지 않게).

const ALIASES = [
  { term: "Witcher", a: ["위처", "위쳐", "더위처", "ウィッチャー", "巫师"] },
  { term: "Cyberpunk", a: ["사펑", "사이버펑크", "サイバーパンク", "赛博朋克", "cp2077"] },
  { term: "Elden Ring", a: ["엘든링", "엘든", "エルデンリング", "艾尔登法环"] },
  { term: "Dark Souls", a: ["다크소울", "다소울", "ダークソウル", "黑暗之魂"] },
  { term: "Sekiro", a: ["세키로", "隻狼"] },
  { term: "Baldur's Gate", a: ["발더스게이트", "발게", "バルダーズゲート", "博德之门", "bg3"] },
  { term: "God of War", a: ["갓오브워", "갓오워", "ゴッドオブウォー", "战神"] },
  { term: "Red Dead", a: ["레데리", "레드데드", "レッドデッド", "荒野大镖客", "rdr2"] },
  { term: "Grand Theft Auto", a: ["지티에이", "그타", "gta", "gta5", "gtav", "侠盗猎车"] },
  { term: "Monster Hunter", a: ["몬헌", "몬스터헌터", "モンハン", "怪物猎人"] },
  { term: "Stardew Valley", a: ["스타듀", "스타듀밸리", "별농장", "星露谷"] },
  { term: "Terraria", a: ["테라리아", "泰拉瑞亚"] },
  { term: "Hollow Knight", a: ["할로우나이트", "할나", "空洞骑士"] },
  { term: "Hades", a: ["하데스", "黑帝斯"] },
  { term: "Cuphead", a: ["컵헤드", "茶杯头"] },
  { term: "Half-Life", a: ["하프라이프", "半条命"] },
  { term: "Counter-Strike", a: ["카운터스트라이크", "카스", "csgo", "cs2", "反恐精英"] },
  { term: "Civilization", a: ["문명", "文明", "civ6", "civ5"] },
  { term: "Total War", a: ["토탈워", "全面战争"] },
  { term: "Resident Evil", a: ["바이오하자드", "레지던트이블", "바하", "生化危机", "re4", "バイオハザード"] },
  { term: "Devil May Cry", a: ["데빌메이크라이", "dmc", "鬼泣"] },
  { term: "Final Fantasy", a: ["파이널판타지", "파판", "ファイナルファンタジー", "最终幻想", "ff14", "ff7"] },
  { term: "Persona", a: ["페르소나", "女神异闻录", "ペルソナ"] },
  { term: "Nier", a: ["니어", "니어오토마타", "尼尔", "ニーア"] },
  { term: "Assassin's Creed", a: ["어쌔신크리드", "어크", "刺客信条"] },
  { term: "Far Cry", a: ["파크라이", "孤岛惊魂"] },
  { term: "Call of Duty", a: ["콜오브듀티", "콜옵", "使命召唤", "cod"] },
  { term: "Need for Speed", a: ["니드포스피드", "极品飞车", "nfs"] },
  { term: "Borderlands", a: ["보더랜드", "无主之地"] },
  { term: "Fallout", a: ["폴아웃", "辐射"] },
  { term: "Skyrim", a: ["스카이림", "上古卷轴"] },
  { term: "Elder Scrolls", a: ["엘더스크롤"] },
  { term: "Disco Elysium", a: ["디스코엘리시움", "极乐迪斯科"] },
  { term: "Lies of P", a: ["P의거짓", "라이즈오브피"] },
  { term: "PUBG", a: ["배틀그라운드", "배그", "绝地求生"] },
  { term: "Lost Ark", a: ["로스트아크", "로아", "失落的方舟"] },
  { term: "Dave the Diver", a: ["데이브더다이버"] },
  { term: "The Forest", a: ["더포레스트", "森林"] },
  { term: "Palworld", a: ["팰월드", "파루월드", "幻兽帕鲁"] },
  { term: "Hogwarts Legacy", a: ["호그와트레거시", "호그와트", "霍格沃茨"] },
  { term: "BioShock", a: ["바이오쇼크", "生化奇兵"] },
  { term: "Ghost of Tsushima", a: ["고스트오브쓰시마", "쓰시마", "对马岛"] },
  { term: "Factorio", a: ["팩토리오", "异星工厂"] },
  { term: "RimWorld", a: ["림월드", "边缘世界"] },
  { term: "Subnautica", a: ["서브노티카", "深海迷航"] },
  { term: "It Takes Two", a: ["잇테이크투", "双人成行"] },
];

// 입력 정규화: 소문자 + 공백·일부 기호 제거(숫자·한글·한자는 유지 — "ff7","cs2" 등 보존).
function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[\s\-_:!.,'"()[\]]/g, "");
}

// 미리 정규화한 (별칭 → term) 목록. 긴 별칭부터 검사해 더 구체적인 매칭을 우선한다.
const TABLE = [];
for (const { term, a } of ALIASES) for (const alias of a) TABLE.push([norm(alias), term]);
TABLE.sort((x, y) => y[0].length - x[0].length);

// 사용자 입력에 별칭이 들어 있으면 그 게임의 영어 핵심어로 바꿔 돌려준다. 없으면 입력 그대로.
// 예: expandQuery("위처3") → "Witcher", expandQuery("god of war") → "god of war"(그대로).
export function expandQuery(q) {
  const n = norm(q);
  if (!n) return q;
  for (const [alias, term] of TABLE) {
    if (alias && n.includes(alias)) return term;
  }
  return q;
}
