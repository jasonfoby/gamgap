// Guia — como elegir un juego que valga la pena con las resenas de Steam, el numero de resenas y Metacritic
// body es un array de bloques (texto plano) que dibuja el renderizador (ArticleBody).
// Los umbrales de cada nivel de valoracion y las fechas de rebajas se indican como variables en el texto.

export default {
  slug: "reviews-metacritic-guide",
  title: "Como elegir un juego que valga la pena con las resenas de Steam y Metacritic",
  description:
    "Como leer de verdad los niveles de valoracion de Steam como Extremadamente positivas, el numero de resenas y las notas de Metacritic. Que significan los niveles, por que pocas resenas son menos fiables, resenas recientes frente a todas, la diferencia entre nota de la critica y de usuarios, y como descartar un juego con malas resenas aunque sea barato.",
  date: "2026-06-20",
  tags: ["Steam", "resenas de juegos", "Metacritic", "valoraciones", "guia de compra"],
  readMins: 6,
  body: [
    {
      type: "p",
      text: "Que un juego este barato no significa que sea bueno. Aunque cueste cinco euros, si lo enciendes y es aburrido, esos cinco euros estan tirados; y si pagas veinte por algo que disfrutas durante decenas de horas, esa fue la mejor compra. Por eso las resenas importan tanto como el precio. La buena noticia es que Steam acumula montones de resenas dejadas por otros jugadores. La pega es que tienes que saber leerlas o caes de lleno en las trampas. Esta guia explica de forma sencilla como mirar los niveles de valoracion de Steam, el numero de resenas y las notas de Metacritic para detectar los juegos que de verdad valen la pena.",
    },
    {
      type: "note",
      text: "Los porcentajes que hay detras de cada nivel de valoracion y las fechas de rebajas que se mencionan abajo son explicaciones generales que pueden cambiar. Justo antes de comprar, vuelve a comprobar las resenas mas recientes en la pagina de la tienda de Steam de ese juego.",
    },
    {
      type: "h2",
      text: "Los niveles de Steam: lee el significado, no solo las palabras",
    },
    {
      type: "p",
      text: "Al abrir la pagina de un juego en Steam, en el apartado de resenas aparece una etiqueta como Extremadamente positivas, Muy positivas o Variadas. Esa etiqueta no es mas que el porcentaje de gente que le dio un pulgar arriba al juego, convertido en un nivel. Por ejemplo, si lo valoraron 100 personas y 95 dijeron que era bueno, el porcentaje de positivas es muy alto, asi que recibe un nivel de los altos. Si solo a la mitad le gusto, cae en el nivel intermedio, Variadas. Asi que, mas que memorizar las palabras, entiendelo como lo alto que es el porcentaje de pulgares arriba.",
    },
    {
      type: "ul",
      items: [
        "Extremadamente positivas / Muy positivas: porcentaje de positivas muy alto. Suele ser fiable sin darle muchas vueltas.",
        "Mayormente positivas: muchas resenas buenas, pero tambien algunas pegas. Una eleccion bastante segura.",
        "Variadas: lo bueno y lo regular se reparten mas o menos a partes iguales. Los gustos varian, asi que lee tu mismo algunas resenas.",
        "Mayormente negativas / Muy negativas: hay mas resenas malas que buenas. Mejor descartarlo salvo que tengas una buena razon.",
      ],
    },
    {
      type: "p",
      text: "Algo que conviene recordar: el nivel solo mira el porcentaje. Es decir, la etiqueta no te dice cuanta gente lo valoro. Por eso lo siguiente es importante.",
    },
    {
      type: "h2",
      text: "Si hay pocas resenas, esa valoracion merece menos confianza",
    },
    {
      type: "p",
      text: "El mismo Muy positivas pesa de forma completamente distinta en un juego con 10.000 resenas que en uno con solo 12. Piensalo asi: preguntar a cinco amigos y que todos digan que un restaurante esta bueno no basta para llamarlo un sitio top. Pero pregunta a mil personas y que la mayoria diga que esta bueno, y eso ya es bastante fiable. Con las resenas de juegos pasa igual. Si hay muy pocas, el nivel puede estar inflado por un punado de notas generosas de amigos o seguidores.",
    },
    {
      type: "p",
      text: "Los juegos recien salidos, sobre todo, tendran pocas resenas por fuerza. Aunque el nivel se vea estupendo, es habitual que caiga en picado unos dias despues, cuando llega la multitud. Por eso, cuando mires un nivel de valoracion, fijate siempre tambien en el numero de resenas que tiene al lado. Mas o menos unos cientos antes de poder apoyarte en el nivel, y con solo unas decenas o menos es mas seguro leer directamente el contenido de las resenas.",
    },
    {
      type: "note",
      text: "Consejo: si hay muy pocas resenas pero el nivel es casi perfecto, sospecha un poco. Puede ser un juego de verdad bueno, o que la muestra pequena haya salido alta por suerte.",
    },
    {
      type: "h2",
      text: "Cuando las resenas recientes y todas no coinciden, mira la diferencia",
    },
    {
      type: "p",
      text: "Steam suele mostrar las resenas de dos formas. Una son todas las resenas acumuladas desde el lanzamiento; la otra son las recientes, de aproximadamente el ultimo mes. Cuando estas dos no coinciden, hay una historia escondida. Por ejemplo, si todas son Muy positivas pero las recientes son Variadas, es que ultimamente paso algo. Quiza una actualizacion rompio el juego, o la gente se enfado por como lo estan gestionando.",
    },
    {
      type: "p",
      text: "Al reves, si todas son flojas pero las recientes han mejorado, puede ser un juego que salio mal y se salvo a base de arreglos constantes. Para esa clase de juego, ahora podria ser un buen momento para entrar. Asi que, cuando ambas valoraciones chocan, en vez de descartarlo a ciegas por mal que se vea un lado, lo inteligente es leer algunas resenas recientes y averiguar que paso.",
    },
    {
      type: "h2",
      text: "La nota de la critica y la de usuarios de Metacritic miran cosas distintas",
    },
    {
      type: "p",
      text: "Ademas de las resenas de Steam, veras a menudo una nota de Metacritic. Metacritic tiene dos tipos de nota: una es la nota de la critica, que ponen periodistas y criticos de videojuegos, y la otra es la nota de usuarios, de los jugadores normales. Las dos miran las cosas desde angulos distintos, asi que muchas veces no van juntas. Los criticos valoran el acabado, la pulcritud y la novedad, mientras que los jugadores de a pie se fijan mas en si se divirtieron y si valio lo que costo.",
    },
    {
      type: "p",
      text: "Por eso hay bastantes juegos con una nota de critica alta pero una nota de usuarios baja. Bien hechos, pero que al jugarlos no encajan, o que salieron en mal estado y los que lo compraron se enfadaron. Y al reves: alguna joya escondida con una nota de critica del monton pero un boca a boca buenisimo entre los usuarios. Asi que con Metacritic tampoco te fies solo de la nota de la critica: mira la de usuarios y la valoracion de Steam juntas para un juicio equilibrado.",
    },
    {
      type: "ul",
      items: [
        "Solo la nota de critica alta: bien hecho, pero quiza divisivo o salio en mal estado. Lee mas resenas.",
        "Solo la nota de usuarios alta: sin alardes, pero quiza una joya escondida de verdad divertida. Suele tener gran relacion calidad-precio.",
        "Ambas altas: relativamente seguro de comprar con tranquilidad.",
        "Ambas bajas: por barato que este, mejor descartarlo.",
      ],
    },
    {
      type: "h2",
      text: "Aunque este barato, descarta los juegos con malas resenas",
    },
    {
      type: "p",
      text: "Al recorrer la pagina de rebajas, los numeros grandes como un 90 por ciento de descuento llaman la atencion por naturaleza. Pero un recorte tan profundo a veces es senal de que el juego sencillamente no se vende. Si un juego Variado o Negativo aparece a precio de saldo, comprarlo solo porque es barato suele significar sumar un juego mas que nunca abriras. Por ejemplo, un juego de cinco euros que borras tras dos horas de aburrimiento no es barato: son cinco euros tirados.",
    },
    {
      type: "p",
      text: "Asi que ordena tus pasos de compra de este modo para arrepentirte menos. Usa el nivel de valoracion y el numero de resenas para decidir primero si lo descartas o no, y solo si supera ese filtro miras el precio. Si dudas de si el precio actual es de verdad un punto bajo, comprueba el minimo historico del juego y el veredicto Compro ahora? en Lowstamp. Ver tambien en el grafico de evolucion de precios lo que costaba de costumbre hace mucho mas facil pillar el momento perfecto: buenas resenas y precio bajo a la vez.",
    },
    {
      type: "ol",
      items: [
        "Mira el nivel de valoracion (donde cae, de Extremadamente positivas a Negativas).",
        "Comprueba el numero de resenas que tiene al lado (confia menos en el nivel si son muy pocas).",
        "Si las resenas recientes y todas difieren, lee algunas recientes.",
        "Si existe una nota de Metacritic, mira la de critica y la de usuarios juntas.",
        "Solo cuando supere todo eso, mira el precio y juzga si esta cerca de su minimo historico.",
      ],
    },
    {
      type: "note",
      text: "Compra solo en la tienda oficial de Steam. Las webs externas de venta de claves a precios absurdamente por debajo del oficial (el mercado gris) conllevan riesgos como claves compradas de forma fraudulenta, bloqueos por region y revocaciones posteriores, asi que no las recomendamos. Intentar pillar un juego bien valorado un poco mas barato puede acabar jugandote la cuenta y el dinero.",
    },
    {
      type: "h2",
      text: "Cierre: filtra por resenas y elige el momento por el precio",
    },
    {
      type: "p",
      text: "En resumen: el nivel de valoracion es el porcentaje de pulgares arriba pasado a palabras, y para fiarte de ese porcentaje necesitas suficientes resenas. Cuando las recientes y todas difieren hay una historia, asi que investigala, y Metacritic solo se equilibra cuando miras la nota de critica y la de usuarios juntas. Y por barato que este, pasa con decision de cualquier cosa con malas resenas. Filtra primero por las resenas si un juego vale la pena, y luego usa el minimo historico y el veredicto Compro ahora? de Lowstamp para elegir el momento, y elegiras juegos baratos y sin arrepentimientos.",
    },
    {
      type: "quote",
      text: "Comprar barato no es comprar bien: comprar bien es comprar barato algo que encaja contigo y tiene buenas resenas.",
    },
  ],
};
