// 가이드 글(포르투갈어·브라질): 스팀 리모트 플레이 투게더 — 한 명만 사도 친구랑 같이 하기
// ⚠ 사실 기준은 영어판(en/steam-remote-play-together.js) 머리 주석과 같다(2026-09-16 확인). 영어판에 없는 사실을 새로 넣지 말 것.
// 공식 기능 이름: 브라질 포르투갈어 스팀 상점도 영어 "Remote Play Together" 그대로 표기한다(포털 2 상점 페이지로 확인).
// 영어판과 블록 구성이 같아야 한다.

export default {
  "slug": "steam-remote-play-together",
  "title": "Remote Play Together da Steam: jogue com amigos quando só um de vocês tem o jogo",
  "description": "O Remote Play Together transmite o jogo de uma pessoa para os amigos, e todo mundo joga junto com uma cópia só, a do anfitrião. Quais jogos são compatíveis, como convidar amigos (até quem não tem conta na Steam) e como diminuir o lag, com base nas páginas oficiais da Steam.",
  "date": "2026-09-16",
  "tags": [
    "Remote Play Together",
    "jogar com amigos",
    "economia",
    "dicas de compra"
  ],
  "readMins": 7,
  "body": [
    {
      "type": "p",
      "text": "Juntar quatro amigos num party game fica bem mais complicado quando os quatro precisam comprar o jogo. A Steam tem um recurso chamado Remote Play Together, que deixa seus amigos entrarem na sua partida pela internet mesmo quando só você comprou o jogo. É como pegar aquele jogo cooperativo local, de todo mundo junto no mesmo sofá, e esticar o sofá até a casa dos seus amigos. Eles não compram nem instalam nada, e o recurso em si é gratuito."
    },
    {
      "type": "note",
      "text": "Este guia segue a página Steam Remote Play do suporte da Steam e a página de Remote Play da loja, ambas conferidas em setembro de 2026. De vez em quando a Steam muda os menus de lugar, então, se algo estiver diferente, procure pelo nome Remote Play Together."
    },
    {
      "type": "table",
      "caption": "Remote Play Together em resumo",
      "head": [
        "Tema",
        "Como funciona"
      ],
      "rows": [
        [
          "Quem precisa comprar o jogo",
          "Só o anfitrião, que roda o jogo. Os amigos não compram nem instalam"
        ],
        [
          "Quantos jogadores",
          "Até quatro, ou mais com conexões rápidas, segundo a Steam. Mesmo assim, não dá para passar do número de jogadores que o próprio jogo aceita"
        ],
        [
          "Quais jogos funcionam",
          "Os que mostram Remote Play Together nas informações do jogo, na página da loja"
        ],
        [
          "De onde os amigos entram",
          "Um computador com a Steam, ou um celular, tablet ou TV com o app Steam Link"
        ],
        [
          "Amigos sem conta na Steam",
          "Podem entrar por um link de convite, uma pessoa por link"
        ],
        [
          "Custo",
          "Grátis"
        ],
        [
          "Saves e conquistas",
          "Ficam na conta do anfitrião, porque o jogo roda no computador dele"
        ],
        [
          "O que não funciona",
          "Jogos de realidade virtual (VR) e alguns controles que não são gamepads, como volantes e joysticks de voo"
        ]
      ]
    },
    {
      "type": "h2",
      "text": "Qual a diferença para o compartilhamento familiar?"
    },
    {
      "type": "p",
      "text": "Os dois deixam várias pessoas aproveitarem uma única cópia de um jogo, então é fácil confundir, mas eles funcionam de jeitos completamente diferentes. As Famílias Steam deixam os membros da família instalarem o jogo no próprio computador e jogarem cada um no seu canto, e, como o recurso é pensado para uma única casa, sair de uma família vem com um limite de um ano. Já o Remote Play Together roda o jogo no computador do anfitrião, manda a imagem para os seus amigos e traz de volta os comandos que eles apertam. Por isso seus amigos não precisam ser da família, e não existe grupo nenhum para entrar ou sair. Só que tem um porém: o recurso funciona apenas com jogos feitos para dividir uma tela, e, quando o anfitrião fecha o jogo, acaba para todo mundo."
    },
    {
      "type": "cta",
      "text": "Se as pessoas com quem você quer dividir os jogos moram debaixo do mesmo teto, as Famílias Steam talvez sejam uma opção melhor, já que cada um instala e joga por conta própria.",
      "label": "Ler o guia das Famílias Steam",
      "to": "/guide/steam-family-sharing"
    },
    {
      "type": "h2",
      "text": "Quatro jogadores, uma cópia só"
    },
    {
      "type": "p",
      "text": "Imagine um party game de R$ 49,90. Se quatro amigos comprarem cada um o seu, são R$ 199,60. Com o Remote Play Together, o anfitrião paga R$ 49,90 e os outros três só precisam aceitar o convite. Essa diferença pesa ainda mais naqueles jogos que a turma só joga quando se reúne, de vez em quando. Mas, se um amigo também quiser jogar sozinho em casa, aí ele vai precisar da própria cópia."
    },
    {
      "type": "h2",
      "text": "Como saber se um jogo é compatível"
    },
    {
      "type": "p",
      "text": "Abra a página do jogo na loja da Steam e olhe as informações do jogo, do lado direito. Se Remote Play Together aparecer ali, está tudo certo. A Steam liga o recurso automaticamente nos jogos marcados com multijogador local ou tela dividida, mas os desenvolvedores podem desligar, então confira a lista mesmo nos jogos que parecem compatíveis. A página do Portal 2 na loja, por exemplo, mostra Remote Play Together junto do cooperativo em tela dividida. Jogos que só têm cooperativo on-line e não mostram essa marcação não funcionam desse jeito."
    },
    {
      "type": "h2",
      "text": "Como convidar um amigo"
    },
    {
      "type": "ol",
      "items": [
        "O anfitrião (a pessoa que tem o jogo) abre o jogo.",
        "Confira se o seu amigo está logado na Steam, no computador ou pelo app Steam Link.",
        "No jogo, aperte Shift+Tab para abrir o Painel Steam (o overlay).",
        "Na lista de amigos, clique com o botão direito no nome do seu amigo e escolha Remote Play Together.",
        "Assim que ele aceitar, já está no jogo com você."
      ]
    },
    {
      "type": "note",
      "text": "Cada amigo joga com o próprio controle, e o anfitrião também pode liberar teclado e mouse para eles. Se o seu amigo aperta os botões e nada acontece no jogo, o anfitrião pode abrir o Painel Steam e conferir os dispositivos desse amigo na janela do Remote Play."
    },
    {
      "type": "h2",
      "text": "Um amigo sem conta na Steam também pode entrar"
    },
    {
      "type": "p",
      "text": "Desde 2021, dá para convidar quem não tem conta na Steam usando um link de convite. O anfitrião escolhe \"Convidar outra pessoa\" na janela do Remote Play Together, no Painel Steam, e manda o link com \"Copiar link\". A pessoa instala o app Steam Link e entra por ali, e, se já tiver a Steam instalada, a própria Steam cuida da conexão. Quando o recurso foi lançado, um link só servia para um convidado, mas hoje a Steam tem a opção \"Convidar mais alguém\". Cada link vale para uma pessoa, então é só criar outro link para cada convidado a mais. O app Steam Link funciona no Windows, iOS, Android e outros sistemas."
    },
    {
      "type": "h2",
      "text": "Como diminuir o lag"
    },
    {
      "type": "ul",
      "items": [
        "Se der, o anfitrião deve usar cabo de rede em vez de Wi-Fi. A própria página de suporte da Steam recomenda a conexão com fio.",
        "Se a imagem travar para os seus amigos, baixe a resolução do jogo no computador do anfitrião e desligue a sincronização vertical (V-Sync).",
        "Nas configurações de Remote Play da Steam, dá para priorizar a velocidade em vez da qualidade, limitar a largura de banda e baixar a resolução máxima de captura.",
        "A Steam recomenda pelo menos um processador de quatro núcleos (quad-core) no computador do anfitrião. Do lado do seu amigo, qualquer notebook recente dá conta."
      ]
    },
    {
      "type": "p",
      "text": "Também ajuda alinhar as expectativas. Seus amigos estão vendo um vídeo da tela do anfitrião, então tudo chega para eles com um pequeno atraso. Por isso party games, puzzles cooperativos e jogos por turnos funcionam melhor do que jogos de ritmo ou de luta, que exigem precisão de fração de segundo. O progresso e as conquistas também ficam na conta do anfitrião, porque é lá que o jogo está rodando, então, se um amigo quiser isso na própria conta, vai precisar da própria cópia."
    },
    {
      "type": "h2",
      "text": "Só um precisa comprar, então compre barato"
    },
    {
      "type": "p",
      "text": "No fim das contas, só o anfitrião paga. A única questão é quando comprar essa cópia, então, alguns dias antes da jogatina marcada, confira se o preço de hoje está perto do menor preço que registramos para esse jogo. Se uma grande promoção estiver chegando, esperar por ela também é uma opção."
    },
    {
      "type": "cta",
      "text": "Quer saber se o jogo que o anfitrião vai comprar está barato agora? Comece pela lista de promoções. Para cada jogo, ela mostra numa linha só o quão perto o preço de hoje está do menor que registramos.",
      "label": "Ver jogos em promoção agora",
      "to": "/?tab=deals"
    },
    {
      "type": "faq",
      "title": "Perguntas frequentes sobre o Remote Play Together",
      "items": [
        {
          "q": "No Remote Play Together, os amigos também precisam ter o jogo?",
          "a": "Não. Basta o anfitrião, que roda o jogo, ter comprado. Os amigos não compram nem instalam nada."
        },
        {
          "q": "Quantas pessoas podem jogar pelo Remote Play Together?",
          "a": "Segundo a Steam, até quatro jogadores, ou mais com conexões rápidas. Mesmo assim, não dá para passar do número de jogadores que o próprio jogo aceita."
        },
        {
          "q": "Um amigo sem conta na Steam pode entrar?",
          "a": "Pode. O anfitrião manda um link de convite criado em \"Convidar outra pessoa\", e o amigo entra sem conta instalando o app Steam Link. Cada link vale para uma pessoa, então, para chamar mais gente, é só criar outro link."
        },
        {
          "q": "O Remote Play Together funciona com qualquer jogo?",
          "a": "Não. Só nos jogos que mostram Remote Play Together nas informações da página da loja. O recurso já vem ligado nos jogos marcados com multijogador local ou tela dividida, mas os desenvolvedores podem desligar."
        },
        {
          "q": "Dá para os amigos entrarem pelo celular?",
          "a": "Dá. Com o app Steam Link, eles entram pelo celular, tablet ou TV. Como estão recebendo uma transmissão da tela do anfitrião, o jogo não precisa ter suporte a dispositivos móveis."
        },
        {
          "q": "Meu amigo aperta os botões e nada acontece. O que eu confiro?",
          "a": "O anfitrião pode apertar Shift+Tab para abrir o Painel Steam e conferir, na janela do Remote Play, se o controle ou o teclado e o mouse desse amigo estão ativados."
        },
        {
          "q": "Mando o convite e aparece que falhou. Por quê?",
          "a": "As mensagens de erro da Steam apontam algumas causas: o Remote Play está desativado nas configurações, você está invisível, há uma transmissão ao vivo no ar, o modo de realidade virtual (VR) está ativado, a tela está bloqueada ou o jogo não está disponível na sua região. Veja qual causa a mensagem indica e comece por ela."
        },
        {
          "q": "Os saves e as conquistas ficam na conta de quem?",
          "a": "Na do anfitrião, porque o jogo roda no computador dele. Se um amigo quiser o progresso na própria conta, vai precisar ter a própria cópia."
        },
        {
          "q": "A transmissão fica travando. Como resolver?",
          "a": "Peça para o anfitrião usar cabo de rede, baixar a resolução do jogo e ajustar as configurações de Remote Play da Steam para priorizar a velocidade em vez da qualidade."
        },
        {
          "q": "Qual a diferença para o compartilhamento familiar da Steam?",
          "a": "As Famílias Steam deixam as pessoas de uma mesma casa instalarem os jogos e jogarem cada uma no seu canto. O Remote Play Together deixa os amigos dividirem a tela do anfitrião. Para jogar com amigos, o Remote Play Together faz mais sentido: não tem grupo familiar para entrar nem a regra de um ano."
        }
      ]
    },
    {
      "type": "quote",
      "text": "Nos jogos que vocês jogam juntos, uma pessoa compra e todo mundo divide a tela. É só comprar essa cópia quando ela estiver barata."
    }
  ]
};
