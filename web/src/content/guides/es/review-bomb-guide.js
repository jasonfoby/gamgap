// Guía: cómo detectar un review bomb — cuando las valoraciones se ponen mal de repente
// body es un array de bloques (texto plano) que dibuja el renderizador (ArticleBody). No se usan etiquetas HTML directamente.

export default {
  slug: "review-bomb-guide",
  title: "Cómo detectar un review bomb — cuando las valoraciones se ponen mal de repente",
  description:
    "A veces el juego está perfectamente bien, pero su valoración en Steam cae de golpe a \"Variadas\". Aquí te explicamos cómo distinguir si el juego de verdad es flojo o si se trata de un \"review bomb\", una avalancha de reseñas negativas por motivos que no tienen nada que ver con el juego.",
  date: "2026-07-05",
  tags: ["valoraciones de Steam", "review bomb", "consejos de compra"],
  readMins: 7,
  body: [
    {
      type: "p",
      text: "Seguro que alguna vez te ha pasado: vas a comprar un juego, ves que su valoración en Steam de repente está en \"Variadas\" o \"Mayormente negativas\", piensas \"uf, ¿será malo?\" y lo dejas pasar. Pero hay veces en que el juego en sí está perfectamente bien y lo que ocurre es que un montón de gente se ha lanzado a dejar reseñas negativas por motivos que no tienen nada que ver con el juego. Es lo que se conoce como \"review bomb\". Si aprendes a distinguirlo de una crítica de verdad, evitarás dejar escapar un buen juego por un malentendido.",
    },
    {
      type: "h2",
      text: "¿Qué es un review bomb?",
    },
    {
      type: "p",
      text: "En pocas palabras, es cuando en poco tiempo se amontonan un montón de valoraciones negativas \"por razones que no tienen mucho que ver con el contenido del juego\". Por ejemplo, que el estudio haya hecho unas declaraciones políticas o sociales, que hayan decidido vender el juego solo en otra plataforma, o que a la gente no le guste su política de precios o el tener que vincular una cuenta. Gente enfadada por eso le pone una valoración baja para protestar, pero no contra el \"juego\" en sí, sino contra la \"empresa\". El resultado es que el juego sigue igual, pero su valoración de golpe parece mala.",
    },
    {
      type: "note",
      text: "Punto a revisar: no te quedes en \"la valoración es mala\", sino en \"por qué y desde cuándo se puso mala\". Si el motivo no tiene que ver con lo divertido que sea el juego y se concentró en un momento concreto, es muy probable que sea un review bomb.",
    },
    {
      type: "h2",
      text: "Veámoslo con un ejemplo",
    },
    {
      type: "p",
      text: "El juego A tiene una valoración general \"Extremadamente positivas\" (97 %), pero solo las recientes se han desplomado a \"Variadas\" (en torno al 40 %). Entras a leer las reseñas negativas y resulta que casi todas dicen lo mismo: \"estoy enfadado porque ahora obligan a vincular la cuenta con otro servicio\", y prácticamente nadie dice que el juego en sí se haya vuelto aburrido. Esto es un review bomb de manual: el juego sigue igual, lo que pasa es que las protestas por una decisión de la empresa se han amontonado en la puntuación. En cambio, el juego B tiene tanto las recientes como las generales en \"Variadas\", y sus reseñas negativas están llenas de quejas de gente que de verdad ha jugado: \"a las dos horas ya aburre\", \"se cierra solo por los bugs\". Eso no es un review bomb, sino una crítica real que conviene tener en cuenta. Aunque las dos digan \"Variadas\", en cuanto miras los motivos ves que son señales completamente distintas.",
    },
    {
      type: "h2",
      text: "Cómo distinguirlo ① Separa las valoraciones recientes de las de todos los tiempos",
    },
    {
      type: "p",
      text: "Steam te muestra las valoraciones de dos formas: \"recientes\" y \"de todos los tiempos\". Si la valoración general es \"Muy positivas\" pero solo las recientes han caído en picado a \"Variadas\", es una señal de que en el fondo es un buen juego pero que últimamente ha pasado algo. Al contrario, si tanto las recientes como las generales llevan tiempo siendo malas de forma constante, entonces sí hay un problema real con el juego. Solo con mirar la diferencia entre esos dos números ya te haces una idea de si es un \"revuelo pasajero\" o un \"problema de verdad\".",
    },
    {
      type: "h2",
      text: "Cómo distinguirlo ② Lee el \"contenido\" de unas cuantas reseñas negativas",
    },
    {
      type: "p",
      text: "Entra y lee solo cinco valoraciones negativas. Si son quejas de alguien que de verdad ha jugado —\"los controles son malos\", \"tiene muchos bugs\", \"aburre enseguida\"— entonces son críticas reales que vale la pena tener en cuenta. En cambio, si lo que abunda son motivos que no tienen nada que ver con lo divertido que sea —\"no me gusta la empresa\", \"por lo que dijeron sobre tal tema\", \"porque es exclusivo de otra tienda\"— es señal de review bomb. Con solo leer el contenido enseguida se ve si el motivo está en el juego o en la empresa.",
    },
    {
      type: "h2",
      text: "Cómo distinguirlo ③ Busca el \"valle puntiagudo\" en la gráfica de valoraciones",
    },
    {
      type: "p",
      text: "Si pasas el ratón por encima del apartado de valoraciones de Steam, aparece una gráfica con la evolución de las reseñas a lo largo del tiempo. Un review bomb se ve como un pico de valoraciones negativas que sube de golpe solo durante unos días concretos y luego vuelve a bajar. Si normalmente las reseñas son positivas y hay un único momento en el que la línea se hunde como un valle, es que en esos días hubo algún revuelo y lo más probable es que no sea un problema del juego en sí.",
    },
    {
      type: "h2",
      text: "Steam también filtra los review bombs",
    },
    {
      type: "p",
      text: "Por suerte, Steam también tiene un mecanismo para detectar estos revuelos. Cuando en poco tiempo se amontonan valoraciones por motivos que no tienen que ver con lo divertido que sea el juego, a veces Steam marca ese periodo como \"actividad de reseñas fuera de tema\" y lo deja fuera del cálculo de la puntuación general. En la gráfica de valoraciones del juego, ese tramo aparece sombreado en gris. Así que, si la puntuación te parece rara de baja, puedes cambiar en el apartado de valoraciones el ajuste de \"incluir o excluir ese periodo\" y comprobar tú mismo cómo queda la \"puntuación de verdad, sin el revuelo\". Y si Steam ya lo ha filtrado, no hace falta que te preocupes demasiado por el número que se ve por fuera.",
    },
    {
      type: "quote",
      text: "Lo importante no es que el número sea malo, sino por qué se puso mal: si el motivo está en el juego, tenlo en cuenta; si está en la empresa, es solo ruido.",
    },
    {
      type: "p",
      text: "En resumen, cuando de repente veas una valoración mala, si ① separas las reseñas recientes de las generales, ② lees el contenido de unas cuantas negativas y ③ compruebas si hay un valle puntiagudo en la gráfica, podrás distinguir si es una crítica de verdad o un review bomb por motivos ajenos al juego. Así no dejarás escapar un buen juego por un revuelo que no tiene nada que ver con lo divertido que es. Y si además de leer bien las valoraciones compruebas el precio en Lowstamp, comparándolo con el mínimo histórico para ver si \"¿lo compro ahora?\", podrás comprar de forma inteligente sin dejarte llevar por los rumores.",
    },
  ],
};
