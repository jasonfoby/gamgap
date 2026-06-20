// Guia: como leer un grafico de historial de precios - distinguir si esta oferta es el suelo real
// El array body lo dibuja el renderizador ArticleBody. No escribas etiquetas HTML directamente.

export default {
  slug: "price-history-reading",
  title: "Como leer un grafico de historial de precios - es esta oferta el suelo real?",
  description:
    "Si sabes leer un grafico de historial de precios, en segundos distingues si una oferta es el suelo real. Aprende a ver la linea del minimo historico, las falsas rebajas de siempre, los ciclos de verano e invierno y por que los lanzamientos tienen historial corto.",
  date: "2026-06-20",
  tags: ["historial de precios", "leer graficos", "minimo historico", "ciclos de oferta", "consejos de compra"],
  readMins: 6,
  body: [
    {
      type: "p",
      text: "Cuando ves un -75% rojo durante una oferta, entra el agobio. Pero esa etiqueta sola no te dice si el juego esta de verdad en su precio mas bajo ahora mismo, o si tendra exactamente el mismo precio el mes que viene. Lo que responde a eso de un vistazo es el grafico de historial de precios. Es simplemente una linea que muestra como subio y bajo el precio con el tiempo, y una vez que sabes leerla, puedes separar una oportunidad genuina de la falsa emocion en pocos segundos. En esta guia lo voy a explicar paso a paso, aunque nunca hayas visto uno.",
    },
    {
      type: "h2",
      text: "Que es un grafico de historial de precios?",
    },
    {
      type: "p",
      text: "Un grafico de historial de precios es una linea que muestra como se movio el precio de un juego durante los ultimos meses o anos. El eje horizontal es el tiempo (lo antiguo a la izquierda, el ahora a la derecha) y el eje vertical es el precio (cuanto mas arriba, mas caro). Por ejemplo, si un juego suele estar alto cerca de 60 euros y el verano pasado bajo hasta unos 20 euros antes de volver a subir, el grafico mostrara una linea alta con un valle profundo tallado en ella. Esos valles son los momentos en que el juego estuvo de oferta.",
    },
    {
      type: "p",
      text: "Puede parecer cargado, pero en realidad del grafico solo quieres dos cosas. Una es cuan bajo ha caido el precio alguna vez (el minimo historico) y la otra es cuan cerca esta el precio actual de ese suelo. Lee esas dos y practicamente ya dominas el grafico.",
    },
    {
      type: "h2",
      text: "Como leer la linea del minimo historico",
    },
    {
      type: "p",
      text: "Lo primero que hay que buscar en el grafico es la caida mas profunda que alcanzo la linea, que es el minimo historico. Lowstamp marca este minimo historico por separado, asi que ves de inmediato si el punto del precio de hoy esta justo sobre esa linea de suelo o flotando muy por encima. Si el punto esta al mismo nivel que la linea de suelo o por debajo, es un precio genuinamente bueno con poco motivo para dudar. Si esta bastante por encima del suelo, entonces por muy grande que se vea el descuento rojo, solo significa que el juego ya estuvo mas barato antes.",
    },
    {
      type: "note",
      text: "Punto clave: mira cuan cerca esta el punto de la linea de suelo, no el porcentaje de descuento. Incluso un -90% puede no ser buen precio si queda muy por encima del suelo.",
    },
    {
      type: "h2",
      text: "Falsas rebajas de siempre - la linea de suelo plana",
    },
    {
      type: "p",
      text: "La forma que mas hay que vigilar es una linea larga y plana tumbada a lo largo del suelo. Muchos juegos se asientan en un precio bajo en algun momento despues del lanzamiento y apenas se mueven de ahi, y aunque lleven una etiqueta de -75%, ese es en esencia su precio de todos los dias. No hay motivo para correr ante las palabras en oferta ahora, porque lo mas probable es que tenga el mismo precio el mes que viene y en la oferta siguiente tambien.",
    },
    {
      type: "p",
      text: "Un ejemplo. El juego A suele flotar alto y solo se hunde en un valle dos o tres veces al ano. Para ese juego, esos momentos de valle son la oportunidad real. El juego B, en cambio, cayo una vez y desde entonces su linea se quedo plana y baja. Para ese el precio es el mismo cuando sea que compres, asi que no hay que dejarse llevar por la palabreria de la oferta. El mismo -75% es un suelo real en el valle de A, pero solo el precio de siempre en el tramo plano de B.",
    },
    {
      type: "h2",
      text: "Patrones del ciclo de ofertas - el mismo punto cada verano e invierno",
    },
    {
      type: "p",
      text: "Mira un grafico en un periodo largo y aparece una regla curiosa. Muchos juegos bajan al mismo punto hacia el verano y el invierno y luego vuelven a subir, repitiendolo cada ano. En el grafico se ve como valles de profundidad parecida alineados a intervalos regulares. Cuando ves eso, puedes estimar mas o menos cuanto bajara la proxima oferta. Por ejemplo, si las dos ultimas ofertas de verano e invierno bajaron a unos 20 euros, quiza te saltes el descuento de hoy de 30 euros y esperes a la siguiente gran oferta.",
    },
    {
      type: "p",
      text: "Steam suele hacer sus mayores ofertas en verano e invierno, con ofertas medianas hacia la primavera, el otono y las fiestas, y este ritmo tiende a repetirse cada ano. Dicho esto, las fechas exactas cambian de un ano a otro, asi que tomalas solo como una estimacion aproximada de por estas fechas. Aun asi, el espaciado de los valles en el grafico te dice si un juego sigue ese ciclo o solo baja de forma irregular de vez en cuando.",
    },
    {
      type: "h2",
      text: "Los lanzamientos tienen graficos cortos - no juzgues demasiado pronto",
    },
    {
      type: "p",
      text: "Una cosa con la que tener cuidado: un lanzamiento recien salido tiene un historial de precios corto, asi que el grafico solo tiene unos pocos puntos. Cuando la linea es corta, el propio criterio de lo mas barato que ha estado nunca aun no se ha formado, lo que hace dificil saber si el precio de hoy es bueno o malo. Los lanzamientos suelen casi no rebajarse justo tras salir y solo bajan por primera vez en una oferta unos meses despues. Por eso, trata un juego con grafico corto como que aun no hay suficiente pasado con que comparar, y a menos que tengas mucha prisa, es mas seguro esperar al menos a la primera oferta.",
    },
    {
      type: "ol",
      items: [
        "Encuentra en el grafico la caida mas profunda de la linea (el minimo historico).",
        "Comprueba si el punto del precio de hoy toca esa linea de suelo o flota muy por encima.",
        "Si la linea es larga y plana, puede ser una falsa rebaja de siempre, asi que no corras.",
        "Si valles parecidos se repiten cada verano e invierno, puede valer la pena esperar a la proxima oferta.",
        "Si un lanzamiento tiene solo unos pocos puntos, falta pasado con que comparar, asi que observa la primera oferta.",
      ],
    },
    {
      type: "h2",
      text: "Sacar partido al grafico de Lowstamp",
    },
    {
      type: "p",
      text: "Lowstamp muestra el precio normal, el precio actual y el minimo historico de cada juego uno al lado del otro en una sola linea, y debajo ensena un grafico de historial que marca un punto solo en los dias que cambio el precio. Eso te deja distinguir de un vistazo si un juego es un titulo de oferta real con valles profundos, un titulo de rebaja permanente tumbado plano en el suelo, o un lanzamiento con solo unos pocos puntos. Puedes cerrar el juicio en esta unica pantalla sin rebuscar en otros sitios.",
    },
    {
      type: "p",
      text: "Y el veredicto de me lo compro ya? es una funcion que calcula la distancia entre este precio actual y el minimo historico y te la sella. Incluso cuando no te apetece diseccionar el grafico tu mismo, ese sello te deja decidir rapido. Si anades a tu lista de deseos los juegos que te importan, en la siguiente oferta solo tienes que mirar si aparecio un valle nuevo en el grafico, es decir, si se actualizo el minimo historico.",
    },
    {
      type: "quote",
      text: "Mira cuan cerca esta hoy el punto de la linea de suelo en el grafico, no el porcentaje rojo de descuento.",
    },
    {
      type: "p",
      text: "En resumen, el grafico de historial de precios es la herramienta mas honesta para saber si una oferta es el suelo real. Si el punto de hoy toca un valle profundo tallado, es una buena ocasion; un tramo largo y plano significa un precio falso de siempre; el mismo punto cada verano e invierno es una senal para esperar a la proxima oferta; y solo unos pocos puntos significa frenar por ahora. Recuerda solo estas cuatro formas y dejaras de ir arrastrado por las etiquetas rojas, abriendo la cartera solo cuando de verdad vale la pena.",
    },
  ],
};
