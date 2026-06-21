// 검색 별칭 — 줄임말·현지어·현지 별명으로 쳐도 영어로 저장된 게임명을 찾게 해준다.
// DB의 게임 이름이 대부분 영어라, "위처"·"巫师"·"ウィッチャー"·"老头环"처럼 쳐도
// "Witcher"·"Elden Ring"을 찾도록 한국어/일본어/중국어/스페인어/포르투갈어 + 영어 약칭 별칭을 모았다.
// (자동 조사 워크플로 + 언어별 검수로 생성, 위험 별칭은 안전 필터로 제거 — _genalias.mjs 참고. 직접 손으로 추가/수정해도 됨.)
//
// 모양: { term: 검색에 쓸 영어 핵심어(DB 이름과 매칭), a: [그 게임을 가리키는 별칭들] }

const ALIASES = [
  { term: "Witcher", a: ["위쳐","위처","위쳐3","위처3","더 위쳐","위쳐 3 와일드 헌트","ウィッチャー","ウィッチャー3","ウィッチャー3 ワイルドハント","巫师","巫师3","昆特牌","The Witcher"] },
  { term: "Cyberpunk", a: ["사이버펑크","사펑","사이버펑크 2077","사펑2077","サイバーパンク2077","サイパン","サイパン2077","赛博朋克2077","2077","Cyberpunk 2077","cp2077"] },
  { term: "Elden Ring", a: ["엘든링","엘딩","エルデンリング","エルデン","艾尔登法环","老头环","法环","eldenring"] },
  { term: "Dark Souls", a: ["다크소울","다크소울3","다크소울 리마스터","ダークソウル","ダクソ","黑暗之魂","黑魂","魂3","Dark Souls 3","DS3"] },
  { term: "Sekiro", a: ["세키로","세키로우","隻狼","セキロ","只狼","影逝二度"] },
  { term: "Baldur's Gate", a: ["발더스 게이트","발더스 게이트 3","발겐","발3","バルダーズゲート","バルダーズ・ゲート","バルダーズゲート3","BG3","博德之门","博德之门3","博德3","Baldur's Gate 3"] },
  { term: "God of War", a: ["갓 오브 워","갓워","갓오브워 라그나로크","ゴッドオブウォー","ゴッド・オブ・ウォー","战神","奎爷","gow"] },
  { term: "Red Dead", a: ["레드 데드 리뎀션","레데리","레데리2","레드 데드 리뎀션 2","レッドデッドリデンプション","レッドデッド","RDR2","荒野大镖客","荒野大镖客2","大表哥","救赎2","rdr","Red Dead Redemption 2","Red Dead Redemption"] },
  { term: "Grand Theft Auto", a: ["GTA","지티에이","gta5","グランドセフトオート","侠盗猎车手","侠盗飞车","gta v","gta6"] },
  { term: "Monster Hunter", a: ["몬스터 헌터","몬헌","몬헌 와일즈","몬스터 헌터 월드","몬헌 월드","モンスターハンター","モンハン","怪物猎人","怪猎","MHW","Monster Hunter World","Monster Hunter Wilds","mhwilds"] },
  { term: "Stardew Valley", a: ["스타듀 밸리","스듀","스타듀","スターデューバレー","スタバレ","星露谷物语","星露谷"] },
  { term: "Terraria", a: ["테라리아","テラリア","泰拉瑞亚","泰拉"] },
  { term: "Hollow Knight", a: ["할로우 나이트","할나","ホロウナイト","空洞骑士","Silksong","Hollow Knight Silksong"] },
  { term: "Hades", a: ["하데스","ハデス","哈迪斯","黑帝斯"] },
  { term: "Cuphead", a: ["컵헤드","カップヘッド","茶杯头"] },
  { term: "Half-Life", a: ["하프라이프","하프라이프2","하프라이프 알릭스","ハーフライフ","ハーフ・ライフ","半衰期","半条命","半条命2","Half Life","HL2","Half-Life 2"] },
  { term: "Counter-Strike", a: ["카운터 스트라이크","카스","CS2","CSGO","カウンターストライク","反恐精英","Counter Strike"] },
  { term: "Civilization", a: ["문명","시드 마이어의 문명","문명6","문명5","문명7","シヴィライゼーション","シヴィ","文明6","文明5","Civ 6","Civ VI","civ5","civ7"] },
  { term: "Total War", a: ["토탈 워","토탈워 워해머","삼국지 토탈워","トータルウォー","トタウォ","全面战争","全战"] },
  { term: "Resident Evil", a: ["레지던트 이블","바이오하자드","레지던트 이블 4","바하","バイオハザード","バイオ","生化危机","生化","RE4","Resident Evil 4","re2","re8","biohazard"] },
  { term: "Devil May Cry", a: ["데빌 메이 크라이","데메크","데빌 메이 크라이 5","デビルメイクライ","DMC","鬼泣","DMC5","Devil May Cry 5"] },
  { term: "Final Fantasy", a: ["파이널 판타지","파판","파판7","파판 7 리버스","파이널 판타지 7","ファイナルファンタジー","最终幻想","太空战士","FF7","Final Fantasy 7","Final Fantasy VII","FFVII","ff14","ff16","ffxiv"] },
  { term: "Persona", a: ["페르소나","페르소나5","페5","페르소나3 리로드","ペルソナ","ペルソナ5","P5","女神异闻录","P5R","Persona 5","Persona 5 Royal"] },
  { term: "Nier", a: ["니어","니어 오토마타","니오토","ニーア","ニーアオートマタ","尼尔","尼尔机械纪元","Nier Automata"] },
  { term: "Assassin's Creed", a: ["어쌔신 크리드","어새신 크리드","어크","어쌔신 크리드 발할라","어크 섀도우스","アサシンクリード","アサクリ","刺客信条","Assassins Creed"] },
  { term: "Far Cry", a: ["파 크라이","파크라이5","파크라이 6","ファークライ","孤岛惊魂","极地战嚎"] },
  { term: "Call of Duty", a: ["콜 오브 듀티","콜옵","COD","콜옵 워존","워존","コールオブデューティ","コールオブデューティー","コッド","使命召唤","Warzone","Call of Duty Warzone","mw2","mw3","bo6"] },
  { term: "Need for Speed", a: ["니드 포 스피드","NFS","ニードフォースピード","极品飞车","Need for Speed Unbound"] },
  { term: "Borderlands", a: ["보더랜드","보더랜즈","보더랜드3","보더랜드 4","ボーダーランズ","ボダラン","无主之地","Borderlands 3","BL3"] },
  { term: "Fallout", a: ["폴아웃","폴아웃4","폴아웃 뉴베가스","폴뉴","フォールアウト","辐射","辐射4","Fallout 4","Fallout 76","Fallout New Vegas"] },
  { term: "Skyrim", a: ["스카이림","스카이림 SE","엘더스크롤 5","엘스5","スカイリム","上古卷轴5","老滚5","The Elder Scrolls V Skyrim"] },
  { term: "Disco Elysium", a: ["디스코 엘리시움","디스코 엘리시움 파이널 컷","ディスコエリジウム","ディスコ・エリジウム","极乐迪斯科"] },
  { term: "Lies of P", a: ["라이즈 오브 피","P의 거짓","피의 거짓","라오피","ライズオブP","匹诺曹的谎言","P的谎言"] },
  { term: "PUBG", a: ["배틀그라운드","배그","펍지","플레이어언노운스 배틀그라운드","パブジー","绝地求生","吃鸡","PlayerUnknown's Battlegrounds"] },
  { term: "Lost Ark", a: ["로스트아크","로아","ロストアーク","失落的方舟","命运方舟"] },
  { term: "Dave the Diver", a: ["데이브 더 다이버","데다","デイヴ・ザ・ダイバー","デイヴザダイバー","潜水员戴夫"] },
  { term: "Palworld", a: ["팰월드","팔월드","펠월드","パルワールド","パルワ","幻兽帕鲁","帕鲁"] },
  { term: "Hogwarts Legacy", a: ["호그와트 레거시","ホグワーツレガシー","ホグワーツ・レガシー","ホグレガ","霍格沃茨之遗","霍格沃茨","Hogwarts"] },
  { term: "BioShock", a: ["바이오쇼크","바쇼","バイオショック","生化奇兵","Bioshock Infinite"] },
  { term: "Ghost of Tsushima", a: ["고스트 오브 쓰시마","고스트 오브 쯔시마","쓰시마","고스트 오브 요테이","ゴーストオブツシマ","ツシマ","对马岛之魂","对马岛"] },
  { term: "Factorio", a: ["팩토리오","ファクトリオ","异星工厂"] },
  { term: "RimWorld", a: ["림월드","リムワールド","リムワ","环世界","Rim World"] },
  { term: "Subnautica", a: ["서브노티카","サブノーティカ","深海迷航","美丽水世界"] },
  { term: "It Takes Two", a: ["잇 테이크 투","잇테투","イットテイクスツー","双人成行"] },
  { term: "Valheim", a: ["발헤임","ヴァルヘイム","英灵神殿","瓦尔海姆"] },
  { term: "Dead by Daylight", a: ["데드 바이 데이라이트","데바데","DBD","デッドバイデイライト","デドバ","黎明杀机"] },
  { term: "Vampire Survivors", a: ["뱀파이어 서바이버즈","뱀서","ヴァンパイアサバイバーズ","ヴァンサバ","吸血鬼幸存者"] },
  { term: "Balatro", a: ["발라트로","バラトロ","小丑牌"] },
  { term: "Yakuza", a: ["야쿠자","용과 같이","류가고토쿠","龍が如く","りゅうがごとく","如龙","人中之龙","Like a Dragon"] },
  { term: "Dragon's Dogma", a: ["드래곤즈 도그마","드그마","드래곤스 도그마","드래곤즈 도그마 2","ドラゴンズドグマ","ドラドグ","龙之信条","Dragon's Dogma 2"] },
  { term: "Tekken", a: ["철권","철권8","鉄拳","てっけん","铁拳","Tekken 8"] },
  { term: "Street Fighter", a: ["스트리트 파이터","스파6","스트리트 파이터 6","ストリートファイター","スト6","ストファイ","街头霸王","街霸","SF6","Street Fighter 6"] },
  { term: "Death Stranding", a: ["데스 스트랜딩","데스트","데스 스트랜딩 2","デスストランディング","デススト","死亡搁浅"] },
  { term: "Diablo", a: ["디아블로","디아","디아블로4","디아4","디아2","ディアブロ","ディアブロ4","暗黑破坏神","暗黑","D4","D2","Diablo 4","Diablo IV"] },
  { term: "Hitman", a: ["히트맨","히트맨 월드 오브 어쌔시네이션","ヒットマン","杀手47","代号47","光头","Hitman 3","Hitman World of Assassination"] },
  { term: "Tomb Raider", a: ["툼 레이더","툼레","라이즈 오브 더 툼레이더","トゥームレイダー","古墓丽影","劳拉","Rise of the Tomb Raider","Shadow of the Tomb Raider"] },
  { term: "Helldivers", a: ["헬다이버즈","헬다이버스","헬다","헬다이버즈 2","ヘルダイバー","ヘルダイバーズ","绝地潜兵","地狱潜兵","绝地潜兵2","Helldivers 2","HD2"] },
  { term: "Sea of Thieves", a: ["씨 오브 시브즈","시 오브 시브즈","シーオブシーブス","シーオブシーヴス","盗贼之海"] },
  { term: "No Man's Sky", a: ["노 맨즈 스카이","노맨스카이","노맨","ノーマンズスカイ","ノマスカ","无人深空","nms","No Mans Sky"] },
  { term: "Cities: Skylines", a: ["시티즈 스카이라인","시스카","시티즈 스카이라인 2","シティーズスカイライン","シティーズ・スカイライン","城市天际线","Cities Skylines","Cities Skylines 2","Cities Skylines II"] },
];

// 입력 정규화: 소문자 + 공백·일부 기호 제거(숫자·한글·한자·가나는 유지 — "ff7","cs2","老头环" 등 보존).
function norm(s) {
  return String(s || "")
    .toLowerCase()
    .replace(/[\s\-_:!.,'"()[\]]/g, "");
}

// 미리 정규화한 (별칭 → term) 목록. 긴 별칭부터 검사해 더 구체적인 매칭을 우선한다
// (예: "城市天际线"가 "天际"보다 먼저 잡혀 Cities/Skyrim 혼동을 막음).
const TABLE = [];
for (const { term, a } of ALIASES) for (const alias of a) TABLE.push([norm(alias), term]);
TABLE.sort((x, y) => y[0].length - x[0].length);

// 사용자 입력에 별칭이 들어 있으면 그 게임의 영어 핵심어로 바꿔 돌려준다. 없으면 입력 그대로.
// 예: expandQuery("위처3") → "Witcher", expandQuery("老头环") → "Elden Ring", expandQuery("god of war") → 그대로.
export function expandQuery(q) {
  const n = norm(q);
  if (!n) return q;
  for (const [alias, term] of TABLE) {
    if (alias && n.includes(alias)) return term;
  }
  return q;
}
