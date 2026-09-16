// 가이드 글(포르투갈어·브라질): 스팀 선물하기 — 보내는 법, 예약 발송, 거절, 선물 환불
// ⚠ 사실 기준은 영어판(en/steam-gifts.js) 머리 주석과 같다(2026-09-16 확인). 영어판에 없는 사실을 새로 넣지 말 것.
// 메뉴·버튼 이름은 스팀 고객지원 브라질 포르투갈어 "Steam 선물" 안내(2C02-3563-B72F-F117)에 적힌 그대로 쓴다.
// 영어판과 블록 구성이 같아야 한다.

export default {
  "slug": "steam-gifts",
  "title": "Presentes na Steam: como enviar um jogo, agendar a entrega e pedir reembolso",
  "description": "Na Steam, dá para comprar um jogo e mandar de presente para qualquer pessoa da sua lista de amigos, com a opção de agendar a entrega para até 12 meses depois da compra. Quem recebe tem 30 dias para aceitar ou recusar, e até um presente já aceito pode ser reembolsado se cumprir as regras. Veja por que às vezes não dá para enviar um presente e como funciona o reembolso de presentes, passo a passo, com os nomes de menu das páginas de suporte da própria Steam.",
  "date": "2026-09-16",
  "tags": [
    "presentes Steam",
    "reembolso de presente",
    "economia",
    "dicas de compra"
  ],
  "readMins": 8,
  "body": [
    {
      "type": "p",
      "text": "Quer dar um jogo para um amigo no aniversário dele? Na Steam, dá para mandar o jogo como presente ali mesmo, na hora de finalizar a compra. A pessoa precisa estar na sua lista de amigos da Steam, e o presente tem que ser uma compra nova, não um jogo que você já tem. Se ela recusar ou deixar o presente parado por 30 dias, o dinheiro volta automaticamente, e até um presente já aceito pode ser reembolsado se cumprir as condições. O reembolso funciona de um jeito antes de o presente ser aceito e de outro depois, por isso essa parte ganhou seções só para ela."
    },
    {
      "type": "note",
      "text": "Este guia segue a página Presentes Steam do Suporte Steam e a política de reembolso da Steam, ambas conferidas em setembro de 2026. Os nomes de menus e botões entre aspas estão escritos exatamente como aparecem na página de suporte da Steam em português do Brasil."
    },
    {
      "type": "table",
      "caption": "Presentes na Steam em resumo",
      "head": [
        "Tema",
        "Como funciona"
      ],
      "rows": [
        [
          "Quem pode receber um presente",
          "Qualquer pessoa da sua lista de amigos da Steam"
        ],
        [
          "O que dá para enviar",
          "Uma compra nova. Não dá para passar adiante um jogo que você já tem"
        ],
        [
          "Quando o presente chega",
          "Na hora, ou numa data agendada para até 12 meses depois da compra"
        ],
        [
          "Prazo para aceitar",
          "30 dias depois da entrega. Se nada acontecer, a compra é cancelada e reembolsada"
        ],
        [
          "Se o destinatário recusar",
          "Reembolso automático para a forma de pagamento de quem comprou"
        ],
        [
          "Condições para reembolso",
          "Compra feita nos últimos 14 dias e menos de 2 horas jogadas pelo destinatário"
        ],
        [
          "Reembolso de presente já aceito",
          "O destinatário autoriza primeiro, e depois quem comprou pede o reembolso"
        ],
        [
          "Para onde vai o dinheiro",
          "A forma de pagamento original de quem comprou, ou a Carteira Steam quando isso não é possível"
        ]
      ]
    },
    {
      "type": "h2",
      "text": "Como enviar um presente"
    },
    {
      "type": "ol",
      "items": [
        "Na página do jogo na loja, clique em \"+ Carrinho\".",
        "No menu suspenso, escolha \"Para presente\".",
        "Clique em \"Continuar para as opções de presente\", depois em \"Escolher destinatário...\" e selecione o seu amigo.",
        "Escolha \"Assim que possível\" ou \"Agendar entrega\". A entrega pode ser agendada para até 12 meses depois da data da compra.",
        "Clique em \"Continuar para o pagamento\", escolha a forma de pagamento, aceite os termos e clique em \"Comprar\"."
      ]
    },
    {
      "type": "note",
      "text": "O destinatário recebe um e-mail com a sua mensagem pessoal e as instruções para adicionar o jogo à conta. Se o saldo da sua Carteira Steam não cobrir o valor total, dá para pagar o restante com outra forma de pagamento."
    },
    {
      "type": "h2",
      "text": "Como mudar a data de uma entrega agendada"
    },
    {
      "type": "p",
      "text": "Um presente agendado para uma data futura fica guardado no seu Inventário Steam até ser entregue. Em Detalhes da conta, clique em \"Ver histórico de compras\" e encontre a compra com o ícone de presente. Depois, vá até o seu Inventário Steam e clique em \"Gerenciar presente\" para escolher outra data. Na nova data, o presente é enviado automaticamente, e você recebe um e-mail quando ele for entregue. E a lista de todos os presentes que você já enviou também fica no Inventário Steam: é só clicar no botão \"...\" e depois em \"Histórico de presentes\"."
    },
    {
      "type": "h2",
      "text": "Quando não dá para enviar o presente"
    },
    {
      "type": "p",
      "text": "Se você não consegue selecionar alguém da sua lista de amigos, a página de suporte da Steam aponta seis motivos possíveis."
    },
    {
      "type": "ul",
      "items": [
        "O seu amigo já tem o jogo. Nesse caso, o nome dele aparece em cinza e não pode ser selecionado.",
        "Como os preços mudam de uma região para outra, alguns jogos não podem ser presenteados para quem está em outra região de compra. A restrição aparece na página da loja, e o Suporte Steam não pode mudar isso.",
        "Um DLC só pode ser presenteado se o seu amigo tiver o jogo base.",
        "Conjuntos que mostram o texto \"Complete a sua coleção\" na página da loja são personalizados para a sua conta, então não dá para presenteá-los.",
        "Pacotes multicópias (de 2, 3 ou 4 cópias) não podem ser presenteados como um pacote só. Você compra o pacote para a sua própria conta e presenteia as cópias extras uma de cada vez, e não dá para comprar um pacote multicópias de um jogo que você já tem.",
        "Alguns jogos simplesmente não podem ser presenteados. Nesses casos, a opção de presente nem aparece na hora de finalizar a compra."
      ]
    },
    {
      "type": "note",
      "text": "Se o presente continuar não dando certo, você pode mandar um vale-presente Steam digital no lugar e deixar o seu amigo escolher o jogo. Só não dá para fazer isso com o saldo da sua própria Carteira Steam: ele não pode ser movido nem dado de presente para outra conta."
    },
    {
      "type": "h2",
      "text": "Como o destinatário aceita o presente"
    },
    {
      "type": "p",
      "text": "Quando o presente é entregue, o destinatário recebe um e-mail com um link para adicionar o presente à conta, além de uma notificação de presente no aplicativo da Steam. Clicar em \"1 novo presente\" abre a página de presentes, e \"Aceitar presente\" coloca o jogo na biblioteca dele de vez. Já \"Recusar presente\" gera um reembolso automático para a forma de pagamento de quem comprou, e essa pessoa recebe um e-mail avisando que o presente foi recusado. Se o destinatário não fizer nada por 30 dias, a Steam cancela a compra e faz o reembolso."
    },
    {
      "type": "h2",
      "text": "Presentes também podem ser reembolsados"
    },
    {
      "type": "p",
      "text": "Um presente pode ser reembolsado se foi comprado nos últimos 14 dias e o destinatário jogou menos de 2 horas. Se o reembolso for aprovado, o dinheiro volta para a forma de pagamento usada na compra, ou para a Carteira Steam de quem comprou, se essa forma de pagamento não aceitar reembolso. Os 14 dias contam a partir da data da compra, não da entrega. O jeito de pedir depende de o destinatário já ter aceitado o presente ou não."
    },
    {
      "type": "p",
      "text": "Se o presente ainda não foi aceito, quem comprou pode pedir o reembolso direto. Faça login no Suporte Steam, abra \"Compras\", clique no jogo com o ícone de presente, escolha \"Desejo solicitar um reembolso\", selecione um motivo e clique em \"Enviar solicitação\". Você recebe um e-mail quando o pedido for processado."
    },
    {
      "type": "h2",
      "text": "Como reembolsar um presente que já foi aceito"
    },
    {
      "type": "p",
      "text": "Nesse caso, o destinatário precisa autorizar primeiro. Se o comprador pedir antes disso, a solicitação é recusada, com uma mensagem avisando que o destinatário precisa entrar no site de ajuda e autorizar o reembolso. Veja o passo a passo de quem recebeu o presente."
    },
    {
      "type": "ol",
      "items": [
        "Faça login no Suporte Steam e escolha \"Jogos, softwares etc.\".",
        "Encontre na lista o jogo que você ganhou de presente e clique nele.",
        "Selecione o motivo que melhor explica por que você não vai ficar com o presente.",
        "Escolha \"Desejo solicitar um reembolso\" e marque a caixa \"Autorizar que o comprador original deste presente solicite um reembolso\" para concluir.",
        "Com a autorização do destinatário, o comprador envia o próprio pedido de reembolso da compra do presente."
      ]
    },
    {
      "type": "cta",
      "text": "No guia de reembolso você encontra o que fazer quando já passou das 2 horas ou dos 14 dias, além das regras de reembolso para itens comprados dentro do jogo e fundos da Carteira Steam.",
      "label": "Ler o guia de reembolso da Steam",
      "to": "/guide/steam-refund-policy"
    },
    {
      "type": "h2",
      "text": "Compre na promoção e entregue no aniversário"
    },
    {
      "type": "p",
      "text": "Como dá para agendar um presente para até 12 meses depois da compra, você pode aproveitar uma promoção para comprar o jogo e marcar a entrega para um aniversário ou outra data especial. Só tenha em mente que o prazo de 14 dias para reembolso começa a contar na data da compra, então, se você agendar a entrega para uma data muito distante, esse prazo acaba antes mesmo de o presente chegar. Por outro lado, se uma promoção começar poucos dias depois de você comprar um presente, a própria página de dúvidas comuns sobre reembolsos da Steam diz que dá para reembolsar a compra, se ela cumprir as condições, e comprar de novo pelo preço promocional."
    },
    {
      "type": "cta",
      "text": "Antes de comprar o presente, confira se o preço de hoje está bom. Cada jogo em promoção ganha um veredicto de uma linha que compara o preço atual com o menor preço que registramos.",
      "label": "Ver jogos em promoção agora",
      "to": "/?tab=deals"
    },
    {
      "type": "h2",
      "text": "Presentes comprados fora da Steam podem sumir"
    },
    {
      "type": "p",
      "text": "Cuidado com \"presentes Steam\" baratos vendidos em outros sites. Se o pagamento feito para comprar um presente for reembolsado por fraude ou por uma disputa de pagamento, o jogo é removido da biblioteca de quem recebeu. A Steam diz que não dá suporte à venda de presentes fora da Steam, então você teria que pedir o dinheiro de volta ao vendedor, e a Steam não devolve nenhum item que você tenha trocado pelo presente. A sua conta não sofre restrição, mas, para jogar de novo, você teria que comprar o jogo ou receber outra cópia de presente."
    },
    {
      "type": "faq",
      "title": "Perguntas frequentes sobre presentes na Steam",
      "items": [
        {
          "q": "Dá para dar um jogo de presente para alguém que não é meu amigo na Steam?",
          "a": "Não. O destinatário é escolhido na sua lista de amigos da Steam, então só dá para presentear jogos para quem você adicionou como amigo."
        },
        {
          "q": "Posso dar para um amigo um jogo que eu já tenho?",
          "a": "Não. Só dá para presentear compras novas. Depois que o presente é aceito, o jogo passa a ser de quem recebeu e não pode ser transferido de novo."
        },
        {
          "q": "Com quanta antecedência dá para agendar um presente na Steam?",
          "a": "Até 12 meses depois da data da compra. Dá para mudar a data depois em \"Gerenciar presente\", no seu Inventário Steam."
        },
        {
          "q": "E se o meu amigo nunca aceitar o presente?",
          "a": "Se ele não aceitar nem recusar em até 30 dias depois da entrega, a Steam cancela a compra e faz o reembolso para a sua forma de pagamento original."
        },
        {
          "q": "Se o presente for recusado, para onde vai o dinheiro?",
          "a": "O valor é reembolsado automaticamente para a forma de pagamento de quem comprou, e essa pessoa recebe um e-mail avisando que o presente foi recusado."
        },
        {
          "q": "Um presente que já foi aceito pode ser reembolsado?",
          "a": "Pode, se foi comprado nos últimos 14 dias e o destinatário jogou menos de 2 horas. Primeiro o destinatário autoriza o reembolso no Suporte Steam, e depois quem comprou faz o pedido. O dinheiro volta para quem comprou."
        },
        {
          "q": "Posso dar DLC de presente na Steam?",
          "a": "Só se o seu amigo tiver o jogo base."
        },
        {
          "q": "Dá para mandar um presente para um amigo em outro país?",
          "a": "Depende do jogo. Como os preços mudam de uma região para outra, alguns jogos não podem ser presenteados para quem está em outra região de compra, e a página da loja avisa sobre essa restrição."
        },
        {
          "q": "Um jogo que ganhei de presente sumiu da minha biblioteca. Por quê?",
          "a": "Se o pagamento do presente foi reembolsado por fraude ou por algum problema no pagamento, o jogo é removido. A sua conta não sofre restrição, mas, para jogar de novo, você vai precisar comprar o jogo ou receber outra cópia de presente."
        },
        {
          "q": "Dá para mandar o saldo da Carteira Steam para um amigo?",
          "a": "Não. O saldo da Carteira Steam não pode ser movido nem dado de presente para outra conta. No lugar disso, você pode comprar um vale-presente Steam digital para ele."
        }
      ]
    },
    {
      "type": "quote",
      "text": "Compre o presente na promoção e agende a data. Só não esqueça que o prazo de reembolso conta a partir do dia da compra, não do dia em que o presente chega."
    }
  ]
};
