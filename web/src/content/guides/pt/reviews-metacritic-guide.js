// Guia — como escolher um jogo que vale a pena com as analises da Steam, o numero de analises e o Metacritic
// body e um array de blocos (texto puro) desenhado pelo renderizador (ArticleBody).
// Os limites de cada nivel de avaliacao e as datas de promocoes sao indicados como variaveis no texto.

export default {
  slug: "reviews-metacritic-guide",
  title: "Como escolher um jogo que vale a pena com as analises da Steam e o Metacritic",
  description:
    "Como ler de verdade os niveis de avaliacao da Steam como Extremamente positivas, o numero de analises e as notas do Metacritic. O que cada nivel significa, por que poucas analises sao menos confiaveis, analises recentes contra todas, a diferenca entre nota da critica e dos usuarios, e como descartar um jogo com analises ruins mesmo barato.",
  date: "2026-06-20",
  tags: ["Steam", "analises de jogos", "Metacritic", "avaliacoes", "guia de compra"],
  readMins: 6,
  body: [
    {
      type: "p",
      text: "Um jogo estar barato nao significa que seja bom. Mesmo custando cinco reais, se voce abre e e chato, esses cinco reais foram jogados fora; e se voce paga vinte por algo que aproveita por dezenas de horas, essa foi a melhor compra. Por isso as analises importam tanto quanto o preco. A boa noticia e que a Steam acumula montes de analises deixadas por outros jogadores. O problema e que voce precisa saber le-las, ou cai direto nas armadilhas. Este guia explica de forma simples como olhar os niveis de avaliacao da Steam, o numero de analises e as notas do Metacritic para identificar os jogos que realmente valem a pena.",
    },
    {
      type: "note",
      text: "As porcentagens por tras de cada nivel de avaliacao e as datas de promocoes mencionadas abaixo sao explicacoes gerais que podem mudar. Bem antes de comprar, confira mais uma vez as analises mais recentes na pagina da loja Steam daquele jogo.",
    },
    {
      type: "h2",
      text: "Os niveis da Steam: leia o significado, nao so as palavras",
    },
    {
      type: "p",
      text: "Ao abrir a pagina de um jogo na Steam, na secao de analises aparece um rotulo como Extremamente positivas, Muito positivas ou Variadas. Esse rotulo nada mais e que a parcela de pessoas que deu um polegar para cima ao jogo, transformada em um nivel. Por exemplo, se 100 pessoas avaliaram e 95 disseram que era bom, a parcela de positivas e muito alta, entao ele recebe um nivel dos mais altos. Se so cerca da metade gostou, ele cai no nivel do meio, Variadas. Entao, em vez de decorar as palavras, entenda como o quao alta e a parcela de polegares para cima.",
    },
    {
      type: "ul",
      items: [
        "Extremamente positivas / Muito positivas: parcela de positivas muito alta. Costuma ser confiavel sem muita preocupacao.",
        "Majoritariamente positivas: muitas analises boas, mas tambem alguns poréns. Uma escolha bem segura.",
        "Variadas: o bom e o mais ou menos se dividem quase pela metade. Os gostos variam, entao leia voce mesmo algumas analises.",
        "Majoritariamente negativas / Muito negativas: ha mais analises ruins do que boas. Melhor descartar, a menos que tenha um bom motivo.",
      ],
    },
    {
      type: "p",
      text: "Uma coisa para lembrar: o nivel so olha a porcentagem. Ou seja, o rotulo nao diz quantas pessoas avaliaram. Por isso o proximo ponto e importante.",
    },
    {
      type: "h2",
      text: "Se ha poucas analises, confie menos nessa avaliacao",
    },
    {
      type: "p",
      text: "O mesmo Muito positivas pesa de forma completamente diferente em um jogo com 10.000 analises e em um com apenas 12. Pense assim: perguntar a cinco amigos e ouvir que todos gostaram de um restaurante nao basta para chama-lo de otimo. Mas pergunte a mil pessoas e tenha a maioria dizendo que e bom, e isso ja e bem confiavel. Com as analises de jogos e igual. Com analises de menos, o nivel pode estar inflado por um punhado de notas generosas de amigos ou apoiadores.",
    },
    {
      type: "p",
      text: "Jogos recem-lancados, em especial, terao poucas analises por forca. Mesmo que o nivel pareca otimo, e comum ele despencar alguns dias depois, quando a multidao chega. Por isso, sempre que olhar um nivel de avaliacao, olhe tambem o numero de analises ao lado. Mais ou menos algumas centenas antes de poder se apoiar no nivel, e com apenas algumas dezenas ou menos e mais seguro ler direto o conteudo das analises.",
    },
    {
      type: "note",
      text: "Dica: se ha pouquissimas analises mas o nivel e quase perfeito, desconfie um pouco. Pode ser um jogo de verdade bom, ou a amostra pequena pode ter saido alta por sorte.",
    },
    {
      type: "h2",
      text: "Quando analises recentes e todas nao batem, olhe a diferenca",
    },
    {
      type: "p",
      text: "A Steam costuma mostrar as analises de duas formas. Uma e todas as analises acumuladas desde o lancamento; a outra sao as recentes, de cerca do ultimo mes. Quando essas duas nao batem, ha uma historia escondida ali. Por exemplo, se todas sao Muito positivas mas as recentes sao Variadas, e que algo aconteceu ultimamente. Talvez uma atualizacao tenha quebrado o jogo, ou as pessoas tenham se irritado com a forma como ele esta sendo conduzido.",
    },
    {
      type: "p",
      text: "Ao contrario, se todas sao fracas mas as recentes melhoraram, pode ser um jogo que saiu ruim e foi salvo por correcoes constantes. Para esse tipo de jogo, agora pode ser uma boa hora de entrar. Entao, quando as duas avaliacoes batem de frente, em vez de descartar as cegas por pior que um lado pareca, o esperto e ler algumas analises recentes e descobrir o que aconteceu.",
    },
    {
      type: "h2",
      text: "A nota da critica e a dos usuarios no Metacritic olham coisas diferentes",
    },
    {
      type: "p",
      text: "Alem das analises da Steam, voce vera com frequencia uma nota do Metacritic. O Metacritic tem dois tipos de nota: uma e a nota da critica, dada por jornalistas e criticos de jogos, e a outra e a nota dos usuarios, dos jogadores comuns. As duas olham as coisas de angulos diferentes, entao muitas vezes nao andam juntas. Os criticos valorizam o acabamento, o polimento e a novidade, enquanto os jogadores comuns se importam mais em ter se divertido e se valeu o preco.",
    },
    {
      type: "p",
      text: "Por isso ha bastantes jogos com nota da critica alta e nota dos usuarios baixa. Bem feitos, mas que na hora de jogar nao engatam, ou que sairam em mau estado e quem comprou ficou irritado. E o contrario tambem existe: alguma joia escondida com nota da critica mediana mas um boca a boca otimo entre os usuarios. Entao, com o Metacritic tambem, nao confie so na nota da critica: olhe a dos usuarios e a avaliacao da Steam juntas para um julgamento equilibrado.",
    },
    {
      type: "ul",
      items: [
        "So a nota da critica alta: bem feito, mas talvez divisivo ou tenha saido em mau estado. Leia mais analises.",
        "So a nota dos usuarios alta: sem brilho, mas talvez uma joia escondida de verdade divertida. Costuma ter otimo custo-beneficio.",
        "As duas altas: relativamente seguro de comprar com tranquilidade.",
        "As duas baixas: por mais barato que esteja, melhor descartar.",
      ],
    },
    {
      type: "h2",
      text: "Mesmo barato, descarte jogos com analises ruins",
    },
    {
      type: "p",
      text: "Ao percorrer a pagina de promocoes, numeros grandes como 90 por cento de desconto chamam a atencao por natureza. Mas um corte tao fundo as vezes e sinal de que o jogo simplesmente nao vende. Se um jogo Variado ou Negativo aparece a preco de banana, compra-lo so porque e barato costuma significar somar mais um jogo que voce nunca vai abrir. Por exemplo, um jogo de cinco reais que voce apaga depois de duas horas de tedio nao e barato: sao cinco reais jogados fora.",
    },
    {
      type: "p",
      text: "Entao organize seus passos de compra assim para se arrepender menos. Use o nivel de avaliacao e o numero de analises para decidir primeiro se descarta ou nao, e so se passar nesse filtro voce olha o preco. Se ficar em duvida se o preco atual e de verdade um ponto baixo, confira o minimo historico do jogo e o veredito Compro agora? no Lowstamp. Ver tambem no grafico de variacao de precos quanto ele costumava custar torna muito mais facil pegar o momento perfeito: boas analises e preco baixo ao mesmo tempo.",
    },
    {
      type: "ol",
      items: [
        "Olhe o nivel de avaliacao (onde cai, de Extremamente positivas a Negativas).",
        "Confira o numero de analises ao lado (confie menos no nivel se forem poucas).",
        "Se as analises recentes e todas diferem, leia algumas recentes.",
        "Se houver nota do Metacritic, olhe a da critica e a dos usuarios juntas.",
        "So depois de passar por tudo isso, olhe o preco e julgue se esta perto do minimo historico.",
      ],
    },
    {
      type: "note",
      text: "Compre so na loja oficial da Steam. Sites externos de venda de chaves a precos absurdamente abaixo do oficial (o mercado cinza) trazem riscos como chaves compradas de forma fraudulenta, bloqueios por regiao e revogacoes posteriores, por isso nao recomendamos. Tentar pegar um jogo bem avaliado um pouco mais barato pode acabar arriscando sua conta e seu dinheiro.",
    },
    {
      type: "h2",
      text: "Fechamento: filtre pelas analises e escolha a hora pelo preco",
    },
    {
      type: "p",
      text: "Resumindo: o nivel de avaliacao e a parcela de polegares para cima virada em palavras, e para confiar nessa parcela voce precisa de analises suficientes. Quando as recentes e todas diferem ha uma historia, entao investigue, e o Metacritic so se equilibra quando voce olha a nota da critica e a dos usuarios juntas. E por mais barato que esteja, deixe passar com firmeza qualquer coisa com analises ruins. Filtre primeiro pelas analises se um jogo vale a pena, e depois use o minimo historico e o veredito Compro agora? do Lowstamp para escolher a hora, e voce vai escolher jogos baratos e sem arrependimentos.",
    },
    {
      type: "quote",
      text: "Comprar barato nao e comprar bem: comprar bem e comprar barato algo que combina com voce e tem boas analises.",
    },
  ],
};
