// Datos de la página "Acerca de" (array de bloques). Lo renderiza ArticleBody.
export default {
  slug: "about",
  title: "Acerca de Lowstamp",
  description:
    "Lowstamp es un servicio de seguimiento de precios que compara lo que cuesta ahora un juego de Steam con el precio más bajo que hemos registrado y te responde en una línea: ¿vale la pena comprarlo ya? Aquí cuento quién está detrás del sitio, de dónde salen los datos de precios y, con total franqueza, cuáles son sus límites.",
  updated: "2026-08-28",
  body: [
    {
      type: "p",
      text:
        "Lowstamp es un servicio de seguimiento de precios que te muestra de un vistazo cuánto cuesta ahora un juego de Steam y cuál es el precio más bajo que hemos registrado hasta hoy, y que decide por ti si el momento de comprar es bueno. Lo hice para que, cuando dudes si un juego está realmente barato ahora o si conviene esperar a que baje un poco más, tengas la respuesta en segundos.",
    },

    { type: "h2", text: "Quién está detrás del sitio" },
    {
      type: "p",
      text:
        "Lowstamp es un servicio gratuito que hago y mantengo yo solo, una persona a la que le gustan los videojuegos. Quien firma las guías del sitio como \"Por Editor de Lowstamp\" soy yo, y las 22 guías publicadas las he pensado y escrito todas de mi puño y letra. Al no haber detrás ni una empresa ni un equipo de redacción, puede que tarde un poco en contestar, pero leo absolutamente todos los avisos que me llegan.",
    },

    { type: "h2", text: "Por qué lo creé" },
    {
      type: "p",
      text:
        "Cuando uno se pone a buscar juegos baratos, tarde o temprano acaba en una tienda de claves (esas páginas que revenden claves de juegos). El problema es que esos precios vienen siempre con un riesgo detrás: reembolsos que no llegan, cuentas suspendidas, claves de origen dudoso. Y encima es habitual que al precio anunciado se le sumen comisiones o que la cifra cambie al llegar al pago, así que cuesta creerse que sea de verdad una ganga.",
    },
    {
      type: "p",
      text:
        "Lowstamp apunta justo a ese mercado en el que nadie se fía. No trabajo con precios de tiendas de claves: comparo únicamente los precios oficiales de Steam. Es decir, te digo sin rodeos cuánto cuesta realmente ese juego en Steam ahora mismo y si esa cifra es de las buenas dentro de lo que llevamos registrado. Decidir sin tiendas de claves, solo con el precio oficial de Steam: ese es el planteamiento de Lowstamp.",
    },

    { type: "h2", text: "De dónde salen los precios y cómo se recogen" },
    {
      type: "p",
      text:
        "Todos los precios de Lowstamp salen directamente de los datos oficiales de la tienda de Steam: el precio normal y el precio actual. Sin estimaciones ni conversiones de moneda por mi cuenta, uso tal cual la cifra que Steam le enseña de verdad al usuario de esa región. La versión en español muestra los precios en euros de la tienda española de Steam, y cada idioma muestra los de la tienda de Steam de su región en la moneda local.",
    },
    {
      type: "p",
      text:
        "Los precios se comprueban automáticamente una vez al día, y solo se guarda registro de los días en que la cifra cambia. Con ese historial se calculan el gráfico de evolución de precios y el mínimo de cada juego. Eso sí, como la comprobación es una vez al día, puede haber alguna diferencia con el precio en tiempo real, así que te recomiendo mirar el precio final en Steam justo antes de comprar.",
    },

    { type: "h2", text: "Los límites de estos datos: lo digo con franqueza" },
    {
      type: "p",
      text:
        "Hay algo que quiero dejar claro. Lowstamp empezó a registrar precios en junio de 2026. Por eso, el \"mínimo registrado\" que ves en pantalla no es el precio más bajo al que se ha vendido el juego desde que salió, sino el más bajo dentro del periodo que llevo registrando. Es perfectamente posible que antes se vendiera aún más barato.",
    },
    {
      type: "p",
      text:
        "Por eso en la ficha de cada juego indico también desde cuándo llevo registrando ese precio. Cuanto más historial se acumule, más fiable será la cifra. Y en los juegos de los que apenas hay dos o tres registros la base es demasiado fina para hablar de un mínimo, así que tómate esos números solo como orientación. Si ves un dato que no cuadra con la realidad, avísame y lo reviso y lo corrijo.",
    },

    { type: "h2", text: "Cómo se decide el veredicto \"¿Vale la pena comprar ahora?\"" },
    {
      type: "p",
      text:
        "La función central de Lowstamp es ese veredicto que compara el precio actual de cada juego con el mínimo registrado y te estampa, como un sello de recibo, si es buen precio para comprar. El cálculo en sí es sencillo: si el precio actual es igual o está muy cerca del mínimo registrado, cae un sello cercano a \"buen momento para comprar\"; si está bastante por encima de ese mínimo o directamente no hay descuento, el sello se acerca a \"puedes esperar un poco\". Entre medias hay varios grados, según lo lejos que esté del mínimo.",
    },
    {
      type: "p",
      text:
        "Lo que más he cuidado en Lowstamp es precisamente eso: que con un solo sello sepas si el momento es bueno o malo, sin tener que ponerte a estudiar toda la evolución del precio. Dicho esto, el veredicto es solo una opinión orientativa basada únicamente en el precio. No juzga si ese juego te va a gustar ni si te va a funcionar en tu ordenador, así que la decisión final es tuya.",
    },

    { type: "h2", text: "Contacto" },
    {
      type: "p",
      text:
        "Si un precio aparece mal, se te ocurre alguna mejora o tienes una propuesta de colaboración, escríbeme sin problema a ibanisac@gmail.com. Como llevo esto yo solo, la respuesta puede tardar unos días, pero cada aviso que me llega ayuda muchísimo a que el servicio sea mejor.",
    },
  ],
};
