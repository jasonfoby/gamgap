// 가이드 글(포르투갈어·브라질): 다음 스팀 세일 언제? — 밸브 공식 발표 일정 (2027년 여름까지)
// 블록 배열(body)을 ArticleBody 렌더러가 그려준다. HTML 태그는 쓰지 않는다(순수 텍스트).
//
// ⚠ 여기 적힌 시즌 세일 날짜는 '추정'이 아니라 밸브가 Steamworks 공식 문서로 공개한 확정 날짜다.
//   src/lib/saleCalendar.js 의 CONFIRMED 배열, 영어 마스터(en/steam-sale-calendar.js), 한국어 마스터와 같은 값을 유지할 것.
//   제목·설명·표·FAQ 가 같은 날짜를 되풀이한다 — 일정이 바뀌면 함께 고칠 것. 영어판과 블록 구성(44블록)이 같아야 한다.
// ⚠ 가을 세일은 2025년부터 11월 말이 아니라 9월 말~10월 초다. 11월로 되돌리지 말 것.
// (2026-11-05) 가을 세일이 끝나 겨울 세일 기준으로 바꿨다. 겨울 세일이 끝나면(브라질리아 2027-01-04 15:00)
//   제목·설명·첫 문단·둘째 표(지역별 시각)·FAQ 를 봄 세일(2027-03-18) 기준으로 다시 바꿀 것.
// ⚠ 블랙프라이데이(2026-11-05 정정): 스팀은 2025년 11월 말~12월 1일에 첫 블랙프라이데이 세일을 열었고, 밸브의 2026년 일정에도
//   '날짜 미정'으로 올라 있다(Steamworks 일정표엔 날짜 없음). 시즌 세일 4개와는 별개의 행사다.
//   "11월엔 스팀 세일이 없다"고 단정하지 말 것. 날짜가 뜨면 첫 문단·새 절(Black Friday da Steam 2026)·FAQ(1번, 블랙프라이데이)·
//   영어/한국어판을 함께 고치고, 끝나면 절 내용을 정리한다.
// 지역별 시각(둘째 표·메모): 브라질·앙골라·모잠비크는 시계를 안 바꿔서 미국 여름시간 구간(봄·여름·가을 세일)엔
//   겨울보다 1시간 이르다(브라질리아 14시). 포르투갈은 봄 세일(3월 18~25일)만 17시 — 포르투갈 여름시간이 3월 28일에 시작하기 때문.
// 말투: 브라질 블로거식 담백한 구어체(você, 'dá para'). 'menor preço histórico' 금지 → 'o menor preço que registramos'.
//   운영자가 직접 확인·경험했다는 1인칭 단수 문장('eu confiro', 'eu olharia' 등)은 쓰지 않는다(사이트 정직성 점검, 2026-11).
//   확인한 사실은 "Conferido em 5 de novembro de 2026" 식의 주어 없는 문장으로 쓴다. 의견·권유 표현('vale olhar')은 그대로 둔다.

export default {
  "slug": "steam-sale-calendar",
  "title": "Promoção de Inverno da Steam 2026 começa em 17 de dezembro: horário no Brasil e datas até 2027",
  "description": "A próxima promoção da Steam é a de Inverno: abre em 17 de dezembro de 2026, às 15h em Brasília (10h no horário do Pacífico), e vai até 4 de janeiro de 2027. Inclui o horário em Portugal, Angola e Moçambique, as datas confirmadas pela Valve até a promoção de Verão de 2027, os festivais temáticos dos intervalos e como decidir entre comprar agora ou esperar.",
  "date": "2026-08-29",
  "updated": "2026-11-05",
  "tags": ["promoções da Steam", "Promoção de Inverno da Steam", "datas de promoção", "guia de compras"],
  "readMins": 10,
  "body": [
    {
      "type": "p",
      "text": "Direto ao ponto: a próxima promoção da Steam é a de Inverno. Ela abre em 17 de dezembro de 2026, às 15h no horário de Brasília (10h no horário do Pacífico dos EUA, 18h em Portugal), e vai até 4 de janeiro de 2027, também às 15h. São 18 dias, a promoção mais longa do ano. A de Outono já acabou, em 8 de outubro. Até dezembro, o único evento com data no calendário da Valve é um festival temático menor, o Auto-Battler RPG Fest, de 16 a 23 de novembro. A Valve também já avisou que vêm aí descontos de Black Friday, mas ainda não divulgou as datas."
    },
    { "type": "sale-reminder" },
    {
      "type": "p",
      "text": "Essas datas não são chute de ninguém. A Valve (a empresa dona da Steam) divulga o calendário na documentação oficial que mantém para desenvolvedoras e publicadoras, em geral um semestre inteiro de uma vez e com cinco a onze meses de antecedência. Então não precisa adivinhar quando cai a próxima promoção: dá para simplesmente consultar."
    },
    { "type": "h2", "text": "As datas das promoções sazonais confirmadas pela Valve" },
    {
      "type": "p",
      "text": "Em 5 de novembro de 2026, a Valve já tinha divulgado as datas até a promoção de Verão de 2027. As da promoção de Outono de 2027 ainda não saíram. A tabela traz as datas exatamente como a Valve lista, no horário do Pacífico dos EUA. Os nomes seguem as estações do hemisfério norte, então a promoção de Inverno cai no começo do nosso verão e a de Verão, no nosso inverno."
    },
    {
      "type": "table",
      "caption": "Datas das promoções sazonais da Steam (calendário oficial da Valve, horário do Pacífico dos EUA)",
      "head": ["Promoção", "Abre", "Fecha", "Duração"],
      "rows": [
        ["Promoção de Inverno 2026", "17 dez 2026, 10h (Pacífico)", "4 jan 2027, 10h (Pacífico)", "18 dias"],
        ["Promoção de Primavera 2027", "18 mar 2027, 10h (Pacífico)", "25 mar 2027, 10h (Pacífico)", "7 dias"],
        ["Promoção de Verão 2027", "24 jun 2027, 10h (Pacífico)", "8 jul 2027, 10h (Pacífico)", "14 dias"],
        ["Promoção de Outono 2026 (encerrada)", "1º out 2026, 10h (Pacífico)", "8 out 2026, 10h (Pacífico)", "7 dias"]
      ]
    },
    { "type": "h2", "text": "Que horas a Promoção de Inverno abre e fecha na sua região?" },
    {
      "type": "p",
      "text": "A Valve abre e fecha todas as promoções sazonais às 10h no horário do Pacífico, então a hora no seu relógio depende de onde você está. Na de Inverno, o horário fica assim no Brasil, em Portugal, em Angola e em Moçambique, tanto na abertura quanto no fechamento."
    },
    {
      "type": "table",
      "caption": "Horário de abertura e de fechamento da Promoção de Inverno de 2026 no Brasil, em Portugal, em Angola e em Moçambique",
      "head": ["Onde", "Abre", "Fecha"],
      "rows": [
        ["Brasil (Brasília)", "qui, 17 dez 2026, 15h", "seg, 4 jan 2027, 15h"],
        ["Portugal continental", "qui, 17 dez 2026, 18h", "seg, 4 jan 2027, 18h"],
        ["Angola", "qui, 17 dez 2026, 19h", "seg, 4 jan 2027, 19h"],
        ["Moçambique", "qui, 17 dez 2026, 20h", "seg, 4 jan 2027, 20h"]
      ]
    },
    {
      "type": "note",
      "text": "O Brasil não muda o relógio, mas os Estados Unidos mudam: ficam no horário padrão no inverno e no horário de verão no resto do ano. Por isso as promoções de Primavera, Verão e Outono abrem às 14h em Brasília, uma hora mais cedo que a de Inverno (15h). Em Angola e em Moçambique, que também não mudam o relógio, vale a mesma regra. Portugal também muda de horário, só que em outras datas, então a abertura quase sempre cai às 18h. A exceção é a promoção de Primavera, que abre e fecha às 17h, porque o horário de verão de Portugal só começa em 28 de março. Quem mora num estado com horário diferente do de Brasília, como o Acre e o Amazonas, precisa descontar a diferença. E, como toda promoção fecha na mesma hora em que abriu, o último dia acaba à tarde, e não à meia-noite: deixar a compra para a noite do último dia é chegar tarde."
    },
    { "type": "h2", "text": "O que muito site ainda erra: a Promoção de Outono não é mais em novembro" },
    {
      "type": "p",
      "text": "Esta é a parte mais importante da página. Até 2024, a Promoção de Outono caía no fim de novembro, perto da Black Friday. Em 2025, a Valve adiantou tudo em quase dois meses, para o fim de setembro e o começo de outubro. A deste ano, de 1º a 8 de outubro, seguiu o mesmo padrão."
    },
    {
      "type": "p",
      "text": "O problema é que a internet continua cheia de textos antigos dizendo que a Promoção de Outono da Steam é no fim de novembro. Quem acredita e espera acaba esperando por uma promoção que já terminou. Neste ano, quem fez isso deixou passar um jogo que dava para comprar barato no começo de outubro e ficou só com eventos menores antes da Black Friday e da Promoção de Inverno, em meados de dezembro."
    },
    {
      "type": "p",
      "text": "A Valve nunca explicou publicamente a mudança. O que se mexeu foi a Promoção de Outono. O fim de novembro agora é de um evento à parte, a Black Friday, explicada logo abaixo."
    },
    { "type": "h2", "text": "Black Friday da Steam 2026: o que já se sabe" },
    {
      "type": "p",
      "text": "A Steam fez a primeira Black Friday da sua história em 2025, do fim de novembro até 1º de dezembro, algumas semanas depois de a Promoção de Outono ter ido para o começo de outubro. O calendário da Valve para 2026 diz que vêm aí descontos de Black Friday de novo, com as datas ainda a serem anunciadas. Em 5 de novembro de 2026, o calendário do Steamworks não trazia datas para esse evento."
    },
    {
      "type": "p",
      "text": "Por enquanto, não existe data para marcar no calendário. No ano passado, ela rolou na última semana de novembro, e é nessa época, na página inicial da Steam, que vale olhar primeiro. Ela não é uma das quatro promoções sazonais, e ninguém prometeu que vai ser tão grande quanto uma delas, então a regra é a mesma: antes de comprar, compare o preço com o menor que registramos."
    },
    { "type": "h2", "text": "Qual das quatro é a maior? A duração dá a dica" },
    {
      "type": "p",
      "text": "As quatro promoções sazonais não têm o mesmo peso, e o jeito mais fácil de medir isso é ver por quanto tempo a Valve deixa cada uma no ar. Promoção mais longa costuma reunir mais jogos participantes e descontos maiores. A de Inverno é a mais longa, com 18 dias; a de Verão dura 14; e as de Primavera e Outono ficam uma semana cada."
    },
    {
      "type": "ul",
      "items": [
        "Promoção de Inverno (18 dias): o maior evento do ano, com a participação mais ampla de jogos.",
        "Promoção de Verão (14 dias): o outro grande evento. Os grandes lançamentos costumam ter aqui os descontos mais fortes.",
        "Promoção de Primavera (7 dias): curta e mais modesta, mas ainda claramente mais barata que uma semana comum.",
        "Promoção de Outono (7 dias): porte parecido com o da Primavera, com jeito de última chance antes do Inverno."
      ]
    },
    {
      "type": "p",
      "text": "Então, se o jogo não é urgente, mirar o Verão ou o Inverno é, estatisticamente, a aposta melhor. Só que isso é uma tendência geral, não uma regra para um jogo específico. Muito jogo chega ao menor preço que registramos numa promoção de Primavera e, em dezembro, vem com um desconto sem graça."
    },
    { "type": "h2", "text": "O evento que parece promoção, mas não é: o Next Fest" },
    {
      "type": "p",
      "text": "Olhando o calendário da Steam, você vai ver um evento grande chamado Next Fest, três vezes por ano. O nome é chamativo e a loja inteira se agita, então é fácil confundir com promoção. Mas não é. O Next Fest é um festival de demos (versões de demonstração) de jogos que ainda não foram lançados. Não é hora de abrir a carteira, e sim de experimentar antes de precisar abrir."
    },
    {
      "type": "ul",
      "items": [
        "Next Fest: de 19 a 26 de outubro de 2026 (já passou)",
        "Next Fest: de 22 de fevereiro a 1º de março de 2027",
        "Next Fest: de 14 a 21 de junho de 2027"
      ]
    },
    {
      "type": "p",
      "text": "Dá para aproveitar o evento de um jeito econômico. Jogue as demos, coloque na lista de desejos as que você curtiu e, quando esses jogos forem lançados e fizerem o primeiro desconto, você vai estar comprando algo que já sabe que gosta. É bem mais tranquilo do que pedir reembolso duas horas depois de uma compra às cegas."
    },
    { "type": "h2", "text": "Os festivais temáticos que preenchem os intervalos" },
    {
      "type": "p",
      "text": "Entre uma promoção grande e outra não acontece nada? Acontece, sim. A Valve faz eventos menores quase todo mês, cada um girando em torno de um gênero ou tema, e só entram com desconto os jogos que se encaixam. A escala é bem menor que a de uma promoção sazonal, mas, se o jogo em que você está de olho combina com o tema, o preço pode ser tão bom quanto. Estes são os que a Valve já agendou."
    },
    {
      "type": "ul",
      "items": [
        "Auto-Battler RPG Fest (RPGs de auto-battler): de 16 a 23 de novembro de 2026",
        "Desktop Companion Fest (companheiros na área de trabalho): de 14 a 18 de janeiro de 2027",
        "Shop Keeper Fest (administrar lojinhas): de 25 de janeiro a 1º de fevereiro de 2027",
        "Sheep Fest (jogos com ovelhas): de 4 a 8 de fevereiro de 2027",
        "Couch Co-Op Fest (cooperativo no sofá): de 8 a 15 de fevereiro de 2027",
        "Rhythm Fest (jogos de ritmo): de 8 a 15 de março de 2027",
        "Dinos vs. Robots Fest (dinossauros contra robôs): de 29 de março a 5 de abril de 2027",
        "Racing Fest (jogos de corrida): de 12 a 19 de abril de 2027",
        "Witch Fest (jogos de bruxas): de 22 a 26 de abril de 2027",
        "Fighting Fest (jogos de luta): de 26 de abril a 3 de maio de 2027",
        "Real-Time Strategy Fest (estratégia em tempo real): de 10 a 17 de maio de 2027",
        "Mountaineering Fest (jogos de alpinismo): de 31 de maio a 3 de junho de 2027"
      ]
    },
    {
      "type": "note",
      "text": "Os festivais temáticos só mexem nos jogos que combinam com o tema, e é por isso que ficar um tempo sem promoção sazonal não é tão desanimador quanto parece. Se o jogo que você quer é um auto-battler, o festival de 16 de novembro é, na prática, a promoção dele. Se for um jogo de ritmo, olhe março."
    },
    { "type": "h2", "text": "Saber as datas não garante um bom preço" },
    {
      "type": "p",
      "text": "Se você leu até aqui e já anotou as datas no calendário, metade do caminho está feita. A outra metade é uma verdade meio incômoda: promoção sazonal não quer dizer que todo jogo chega ao menor preço que já teve. Um jogo pode aparecer com 70% de desconto na promoção de Verão e ainda ficar mais caro do que em dezembro do ano passado, quando estava com 75%."
    },
    {
      "type": "p",
      "text": "O contrário acontece com a mesma frequência. Numa semana comum, sem promoção nenhuma por perto, um jogo cai discretamente abaixo de tudo o que já custou. Cada jogo tem o próprio ritmo de descontos, e as promoções sazonais são só uma onda grande passando por cima desse ritmo."
    },
    {
      "type": "quote",
      "text": "O que importa não é a porcentagem do desconto, e sim a distância entre o preço de hoje e o menor preço que registramos para aquele jogo."
    },
    { "type": "h2", "text": "Comprar agora ou esperar a promoção?" },
    {
      "type": "p",
      "text": "Na prática, quatro perguntas na hora de pagar bastam. Seguindo na ordem, a resposta costuma aparecer sozinha."
    },
    {
      "type": "ol",
      "items": [
        "Veja qual foi o menor preço que registramos para o jogo e compare com o de hoje.",
        "Se o preço de hoje está igual ou colado nesse mínimo, pare de pensar. Compre.",
        "Se a diferença é grande, conte quantos dias faltam para a próxima promoção grande. Menos de duas semanas vale a espera.",
        "Se for esperar meses, conte como custo o tempo em que você não vai estar jogando. Economizar 20 reais nem sempre compensa três meses de espera."
      ]
    },
    {
      "type": "p",
      "text": "O Lowstamp cuida dos dois primeiros passos por você. Procure um jogo e você vai ver o preço de hoje ao lado do menor que registramos, com a diferença entre os dois transformada num veredito simples, um carimbo de recibo que diz se é uma boa hora de comprar. Para o terceiro passo, a contagem regressiva no topo desta página acompanha as datas confirmadas que estão aqui. E, se você favoritar os jogos que está acompanhando (é só tocar na ★ do card), dá para conferir todos de uma vez depois, quando os preços tiverem mudado."
    },
    {
      "type": "cta",
      "text": "Favorite os jogos que você quer antes de a Promoção de Inverno abrir e, no primeiro dia, veja de uma vez quais deles estão mesmo baratos.",
      "label": "Ver o que está em promoção agora",
      "to": "/?tab=deals"
    },
    {
      "type": "note",
      "text": "Uma coisa que a gente quer deixar clara: o Lowstamp só começou a registrar preços em junho de 2026. Então o menor preço que aparece aqui não é o menor que o jogo já teve desde o lançamento, e sim o menor que vimos enquanto acompanhávamos. Em jogos mais antigos, principalmente, é bem possível que tenha existido um preço melhor antes de a gente começar. Isso vai ficando mais preciso conforme o histórico cresce, mas, por enquanto, vale saber."
    },
    { "type": "h2", "text": "Quando esse calendário ganha mais datas?" },
    {
      "type": "p",
      "text": "A Valve costuma publicar seis meses de datas por vez, duas vezes por ano: no fim de janeiro e em meados de julho. Isso quer dizer que as datas de Outono e Inverno de 2027 devem aparecer por volta do fim de janeiro de 2027. Até lá ninguém sabe os dias exatos e, se você achar um site que já lista essas datas, são estimativas tiradas do padrão dos anos anteriores."
    },
    {
      "type": "p",
      "text": "Esta página é atualizada sempre que a Valve anuncia datas novas. A última conferência das datas com o calendário oficial de eventos da Valve para desenvolvedoras foi em 5 de novembro de 2026. Só tem uma coisa para guardar: saiba mais ou menos quando é a próxima promoção grande, mas, na hora de apertar o botão de comprar, olhe o histórico de preços do jogo, e não o calendário. Esse hábito, sozinho, é o que mais ajuda a não pagar caro à toa."
    },
    {
      "type": "sources",
      "title": "Fontes e quando foram conferidas",
      "items": [
        {
          "label": "Valve Steamworks: Próximas promoções e eventos da Steam (Upcoming Steam Sales and Events)",
          "url": "https://partner.steamgames.com/doc/marketing/upcoming_events",
          "note": "Promoções sazonais, Next Fest e festivais temáticos. Conferido em 5 de novembro de 2026."
        },
        {
          "label": "Valve Steamworks: Promoções sazonais (Seasonal Sales)",
          "url": "https://partner.steamgames.com/doc/marketing/discounts/seasonalsales",
          "note": "Datas das promoções sazonais. Conferido em 5 de novembro de 2026."
        },
        {
          "label": "Valve Steamworks: Descontos (Discounting)",
          "url": "https://partner.steamgames.com/doc/marketing/discounts",
          "note": "As ofertas diárias e semanais da Steam também trocam às 10h no horário do Pacífico. Conferido em 5 de novembro de 2026."
        },
        {
          "label": "dlcompare: Valve confirma o calendário completo de eventos da Steam em 2026 (notícia em inglês)",
          "url": "https://www.dlcompare.co.uk/gaming-news/valve-reveals-the-full-lineup-of-steam-events-scheduled-throughout-2026-70170",
          "note": "Notícia de janeiro de 2026. É dela que vem a informação de que a Black Friday de 2026 aparece na lista, com as datas ainda por divulgar."
        },
        {
          "label": "PC Gamer: a primeira Black Friday da história da Steam (notícia em inglês)",
          "url": "https://www.pcgamer.com/games/steam-black-friday-sale-2025/",
          "note": "Notícia sobre a promoção de 2025."
        }
      ]
    },
    {
      "type": "faq",
      "title": "Datas das promoções da Steam: perguntas frequentes",
      "items": [
        {
          "q": "Quando é a próxima promoção da Steam?",
          "a": "A Promoção de Inverno, de 17 de dezembro de 2026, às 10h no horário do Pacífico (15h em Brasília), até 4 de janeiro de 2027. Antes dela, o único evento da Valve com data é o Auto-Battler RPG Fest, de 16 a 23 de novembro, que dá desconto só em jogos de auto-battler. Também são esperados descontos de Black Friday, mas as datas ainda não foram publicadas."
        },
        {
          "q": "Que horas começa a Promoção de Inverno da Steam?",
          "a": "Às 10h no horário do Pacífico, em 17 de dezembro de 2026. Isso dá 15h em Brasília, 18h em Portugal continental, 19h em Angola e 20h em Moçambique."
        },
        {
          "q": "Quando termina a Promoção de Inverno da Steam?",
          "a": "Em 4 de janeiro de 2027, às 10h no horário do Pacífico, ou seja, 15h em Brasília e 18h em Portugal. Com 18 dias, é a promoção mais longa do ano."
        },
        {
          "q": "Vai ter Black Friday na Steam em 2026?",
          "a": "A Valve já avisou que vêm aí descontos de Black Friday, mas, até 5 de novembro de 2026, não publicou as datas. No ano passado, a Steam fez a primeira Black Friday da sua história, do fim de novembro até 1º de dezembro de 2025. Ela não é uma das quatro promoções sazonais, então vale ficar de olho na página inicial da Steam na segunda quinzena de novembro."
        },
        {
          "q": "Quando foi a Promoção de Outono da Steam em 2026?",
          "a": "De 1º a 8 de outubro de 2026, abrindo e fechando às 10h no horário do Pacífico (14h em Brasília). Já acabou. As datas da Promoção de Outono de 2027 ainda não foram anunciadas."
        },
        {
          "q": "Quando é a Promoção de Primavera da Steam em 2027?",
          "a": "De 18 a 25 de março de 2027, abrindo às 10h no horário do Pacífico (14h em Brasília). Dura sete dias."
        },
        {
          "q": "Quando é a Promoção de Verão da Steam em 2027?",
          "a": "De 24 de junho a 8 de julho de 2027, abrindo às 10h no horário do Pacífico (14h em Brasília). Dura 14 dias."
        },
        {
          "q": "O Steam Next Fest é uma promoção?",
          "a": "Não. É um festival de demos de jogos que ainda não foram lançados. Os próximos são de 22 de fevereiro a 1º de março de 2027 e de 14 a 21 de junho de 2027."
        },
        {
          "q": "Essas datas das promoções da Steam são oficiais?",
          "a": "São. Elas vêm do calendário oficial de eventos que a Valve mantém para desenvolvedoras no Steamworks, que costuma ser atualizado duas vezes por ano, no fim de janeiro e em meados de julho."
        },
        {
          "q": "Comprar durante uma promoção da Steam sai sempre mais barato?",
          "a": "Nem sempre. Alguns jogos chegam ao menor preço fora das promoções sazonais, e outros hoje têm descontos mais rasos do que tinham antes. Em vez de confiar na etiqueta de desconto, compare o preço de hoje com o menor preço que registramos para aquele jogo."
        }
      ]
    }
  ]
};
