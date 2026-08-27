// Dados de conteúdo da página Sobre (array de blocos). Renderizado pelo ArticleBody.
export default {
  slug: "about",
  title: "Sobre o Lowstamp",
  description:
    "O Lowstamp é um serviço de monitoramento de preços que compara quanto um jogo da Steam custa agora com o menor preço que já registramos e responde numa linha: \"Vale a pena comprar agora?\". Aqui eu conto quem faz e mantém o site, de onde vêm os dados de preço e quais são as limitações deles.",
  updated: "2026-08-28",
  body: [
    {
      type: "p",
      text:
        "O Lowstamp é um serviço de monitoramento de preços da Steam que mostra, lado a lado, quanto um jogo custa agora e qual foi o menor preço já registrado por aqui — e ainda julga por você se esse é um bom preço para comprar. Eu fiz o site pensando naquela dúvida de sempre: será que o jogo que eu quero está barato agora, ou é melhor esperar mais um pouco para ver se cai?",
    },

    { type: "h2", text: "Quem faz e mantém o site" },
    {
      type: "p",
      text:
        "O Lowstamp é um serviço gratuito que eu criei e mantenho sozinho — sou só uma pessoa que gosta de jogos. Aquela assinatura \"Por Editor do Lowstamp\" que aparece nos guias do site sou eu, e os 22 guias publicados foram todos pensados e escritos por mim. Como aqui não existe empresa nem equipe editorial, minha resposta pode demorar um pouco — mas eu leio todos os avisos que vocês me mandam, sem exceção.",
    },

    { type: "h2", text: "Por que eu criei o Lowstamp" },
    {
      type: "p",
      text:
        "Quem tenta comprar jogo mais barato acaba, mais cedo ou mais tarde, esbarrando nas lojas de chaves (sites que revendem chaves de jogos). Só que o preço dessas lojas vem sempre acompanhado de riscos — reembolso negado, conta banida, dúvida sobre a origem da chave — e ainda é comum aparecer uma taxa em cima do valor anunciado ou o preço mudar na hora do pagamento. No fim das contas, fica difícil confiar que aquilo é mesmo barato.",
    },
    {
      type: "p",
      text:
        "O Lowstamp mira exatamente nesse mercado cheio de desconfiança. Eu simplesmente não trabalho com preço de loja de chave: a comparação é feita só com o preço oficial da Steam. Ou seja, o site mostra com honestidade uma coisa só — quanto este jogo custa de verdade se você comprar na Steam agora, e se esse valor é bom perto do que já foi registrado. Decidir sem loja de chave, olhando apenas o preço oficial da Steam: esse é o posicionamento do Lowstamp.",
    },

    { type: "h2", text: "De onde vêm os preços e como eu coleto" },
    {
      type: "p",
      text:
        "Todos os preços do Lowstamp são o valor cheio e o preço atual que eu pego direto dos dados oficiais da loja Steam. Não existe estimativa nem conversão de moeda feita por conta própria: é exatamente o preço que a Steam apresenta a quem está naquela região. Nesta versão em português, os valores são os da Steam brasileira, em reais; nas outras versões do site, aparecem os preços em moeda local de cada região.",
    },
    {
      type: "p",
      text:
        "A checagem é automática, uma vez por dia, e eu só guardo registro nos dias em que o valor mudou. É com esse histórico acumulado que o site monta o gráfico de evolução de preço e calcula o menor preço de cada jogo. Como a atualização acontece só uma vez por dia, pode haver alguma diferença em relação ao tempo real — então, logo antes de fechar a compra, vale conferir o preço final na própria Steam.",
    },

    { type: "h2", text: "As limitações destes dados — falando com sinceridade" },
    {
      type: "p",
      text:
        "Tem uma coisa que eu preciso deixar bem clara: o Lowstamp começou a registrar preços em junho de 2026. Por isso, o \"menor preço registrado\" que aparece na tela não é o menor preço que o jogo já teve desde que foi lançado, e sim o menor preço dentro do período em que eu venho registrando. É perfeitamente possível que ele já tenha sido vendido mais barato antes disso.",
    },
    {
      type: "p",
      text:
        "Foi por isso que eu passei a anotar, em cada página de jogo, desde quando aquele preço vem sendo registrado. Quanto mais tempo o histórico acumula, mais confiável esse número fica. E jogo que ainda tem só dois ou três registros tem uma base fina demais para se falar em menor preço, então nesses casos trate o número apenas como referência. Se você encontrar algum valor diferente do real, me avise que eu verifico e corrijo.",
    },

    { type: "h2", text: "Como o veredito \"Vale a pena comprar agora?\" é decidido" },
    {
      type: "p",
      text:
        "O recurso central do Lowstamp é o veredito: para cada jogo, o site compara o preço de agora com o menor preço registrado e carimba a resposta como um selo de recibo. A conta em si é simples. Se o preço atual está igual ou bem pertinho do menor já registrado, sai um carimbo mais próximo de \"pode comprar agora\"; se está bem acima desse menor preço, ou se não tem desconto nenhum, sai um carimbo mais próximo de \"dá pra esperar um pouco\". Entre um extremo e outro, o resultado vai variando em degraus, conforme a distância até o menor preço.",
    },
    {
      type: "p",
      text:
        "Fazer com que um único carimbo já diga se o momento é bom ou ruim, sem você precisar analisar toda a evolução do preço, foi a parte em que eu mais caprichei. Mas vale lembrar: esse veredito é só uma opinião de referência, tirada exclusivamente do preço. Ele não sabe se o jogo vai te divertir nem se ele roda no seu computador, então a decisão final é sua.",
    },

    { type: "h2", text: "Contato" },
    {
      type: "p",
      text:
        "Se algum preço estiver aparecendo errado, ou se você tiver ideias de melhoria e propostas de parceria, é só me escrever em ibanisac@gmail.com. Como eu toco tudo sozinho, a resposta pode levar alguns dias, mas cada aviso que chega ajuda muito a melhorar a qualidade do serviço.",
    },
  ],
};
