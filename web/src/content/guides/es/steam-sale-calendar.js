// 가이드 글(스페인어): 다음 스팀 세일 언제? — 밸브 공식 발표 일정 (2027년 여름까지, 겨울 세일 기준)
// ⚠ 세일 날짜·사실 기준은 영어판(en/steam-sale-calendar.js)과 같다. src/lib/saleCalendar.js 의 CONFIRMED,
//   영어·한국어판의 표·FAQ·제목과 같은 값을 유지할 것. 블록 구성(44블록)도 영어판과 같다.
// 스페인어권용으로만 덧붙인 것: 둘째 표(스페인·멕시코시티·콜롬비아/페루·아르헨티나), 시간대 메모, 테마 축제 이름 옆 짧은 설명,
//   'ofertas' 별칭 한 줄, 남반구 계절 이름 한 줄. 날짜·시각을 건드리지 않는 한 지워도 된다.
// 스페인(반도) 시각 기준값: 겨울 19:00 · 봄 18:00(스페인 여름시간은 3월 28일 시작이라 한 시간 이르다) · 여름 19:00 · 가을 19:00.
// 용어: Rebajas de Invierno/Primavera/Verano/Otoño, Next Fest. 테마 축제 이름은 영어 공식명 유지.
//   'mínimo histórico' 금지 → 'el precio más bajo que hemos registrado'(Lowstamp 기록은 2026년 6월부터).
// 말투: tú 중립(vosotros·voseo 금지), 블로거식 담백한 문체, 줄표(—) 대신 쉼표·콜론.
//   정직성 점검(2026-11-05): "직접 확인한다·내가 본다" 같은 운영자 1인칭 확인 문장 금지(실제로는 도구가 확인함).
//   'Esta página se actualiza…', 'el calendario de Steamworks no incluye…' 식의 주어 없는 문장으로 쓴다. 사이트 기록('hemos registrado')은 그대로 둔다.
// (2026-11-05) 가을 세일이 끝나 겨울 세일 기준으로 바꿨다. 겨울 세일이 끝나면(2027-01-04 19:00 스페인) 제목·설명·첫 문단을
//   "봄 세일 3월 18일 시작" 기준으로 다시 바꿀 것 — 제목의 날짜도 CONFIRMED 와 같아야 한다.
// (2026-11-05) 블랙프라이데이: 스팀은 2025년 11월 말~12월 1일에 첫 블랙프라이데이 세일을 열었고 2026년에도 예고했지만
//   Steamworks 일정표에는 날짜가 없다. 날짜가 올라오면 첫 문단·'Black Friday en Steam 2026' 절·FAQ(Black Friday)·출처를 함께 고칠 것.

export default {
  "slug": "steam-sale-calendar",
  "title": "¿Cuándo son las rebajas de Steam? Rebajas de Invierno 2026 desde el 17 de diciembre y fechas confirmadas hasta 2027",
  "description": "Las próximas rebajas de Steam son las de Invierno: del 17 de diciembre de 2026 al 4 de enero de 2027. Empiezan a las 19:00 en la España peninsular y a las 12:00 en Ciudad de México. Aquí tienes la hora en tu país, las fechas confirmadas por Valve hasta el verano de 2027, los festivales temáticos de por medio y cómo decidir si comprar ahora o esperar.",
  "date": "2026-08-29",
  "updated": "2026-11-05",
  "tags": ["rebajas de Steam", "rebajas de Invierno", "fechas de rebajas", "guía de compra"],
  "readMins": 10,
  "body": [
    {
      "type": "p",
      "text": "Vamos al grano: las próximas rebajas de Steam son las de Invierno. Empiezan el 17 de diciembre de 2026 a las 10:00 de la mañana, hora del Pacífico de EE. UU. (las 19:00 en la España peninsular y las 12:00 en Ciudad de México), y terminan el 4 de enero de 2027: 18 días enteros, las rebajas más largas del año. Las de Otoño ya acabaron el 8 de octubre. Hasta diciembre, el único evento con fecha en el calendario de Valve es uno temático pequeño, el Auto-Battler RPG Fest, del 16 al 23 de noviembre. Valve también ha dicho que habrá descuentos de Black Friday, pero aún no ha publicado las fechas."
    },
    { "type": "sale-reminder" },
    {
      "type": "p",
      "text": "Estas fechas no se las ha inventado nadie. Valve (la empresa que está detrás de Steam) las publica por adelantado en la documentación oficial que mantiene para estudios y distribuidoras, normalmente medio año de golpe y con entre cinco y once meses de antelación. Así que no hace falta adivinar cuándo caerán las próximas rebajas (u ofertas, como también se les llama en buena parte de Latinoamérica): basta con consultarlo."
    },
    { "type": "h2", "text": "Las fechas de las rebajas de temporada confirmadas por Valve" },
    {
      "type": "p",
      "text": "A fecha de 5 de noviembre de 2026, Valve ha publicado el calendario hasta las rebajas de Verano de 2027. Las de Otoño de 2027 todavía no tienen fecha. La tabla recoge los días tal como los lista Valve, en hora del Pacífico de EE. UU."
    },
    {
      "type": "table",
      "caption": "Fechas de las rebajas de temporada de Steam (calendario oficial de Valve; PT = hora del Pacífico de EE. UU.)",
      "head": ["Rebajas", "Empiezan", "Terminan", "Duración"],
      "rows": [
        ["Rebajas de Invierno 2026", "17 dic 2026, 10:00 PT", "4 ene 2027, 10:00 PT", "18 días"],
        ["Rebajas de Primavera 2027", "18 mar 2027, 10:00 PT", "25 mar 2027, 10:00 PT", "7 días"],
        ["Rebajas de Verano 2027", "24 jun 2027, 10:00 PT", "8 jul 2027, 10:00 PT", "14 días"],
        ["Rebajas de Otoño 2026 (terminadas)", "1 oct 2026, 10:00 PT", "8 oct 2026, 10:00 PT", "7 días"]
      ]
    },
    { "type": "h2", "text": "¿A qué hora empiezan las rebajas de Invierno en tu país?" },
    {
      "type": "p",
      "text": "Valve empieza y termina todas las rebajas de temporada a las 10:00, hora del Pacífico de EE. UU., así que la hora que marca tu reloj depende de dónde estés. Esta es la hora de las rebajas de Invierno en España y en varios países de Latinoamérica, tanto al empezar como al terminar. Si tu país no sale, mete las 10:00 de Los Ángeles en cualquier conversor de horas y te dirá la tuya."
    },
    {
      "type": "table",
      "caption": "Hora de inicio y de final de las rebajas de Invierno 2026 en España y Latinoamérica",
      "head": ["Dónde", "Empiezan", "Terminan"],
      "rows": [
        ["España peninsular", "jue 17 dic 2026, 19:00", "lun 4 ene 2027, 19:00"],
        ["Ciudad de México", "jue 17 dic 2026, 12:00", "lun 4 ene 2027, 12:00"],
        ["Colombia y Perú", "jue 17 dic 2026, 13:00", "lun 4 ene 2027, 13:00"],
        ["Argentina", "jue 17 dic 2026, 15:00", "lun 4 ene 2027, 15:00"]
      ]
    },
    {
      "type": "note",
      "text": "Un par de detalles. EE. UU. cambia la hora dos veces al año: usa la hora estándar en invierno y el horario de verano el resto del año. Por eso, donde no se toca el reloj (Ciudad de México, Colombia, Perú, Argentina), las rebajas de Primavera, Verano y Otoño empiezan una hora antes que las de Invierno: a las 11:00 en Ciudad de México, a las 12:00 en Colombia y Perú y a las 14:00 en Argentina. En España pasa algo parecido, aunque solo en marzo, porque EE. UU. adelanta el reloj antes que Europa: las de Primavera de 2027 empiezan y terminan a las 18:00 en vez de a las 19:00. Y como todas las rebajas de temporada terminan a la misma hora a la que empezaron, el último día, las de Invierno cierran a las 19:00 en España (a las 18:00 en Canarias) y a las 12:00 en Ciudad de México. Estés donde estés, no dejes para el último momento el juego que de verdad quieres."
    },
    { "type": "h2", "text": "El dato que muchas webs siguen dando mal: las rebajas de Otoño ya no son en noviembre" },
    {
      "type": "p",
      "text": "Esta es la parte más importante de la guía. Hasta 2024, las rebajas de Otoño caían a finales de noviembre, justo alrededor del Black Friday. En 2025 Valve las adelantó casi dos meses, a finales de septiembre y principios de octubre, y las de este año, del 1 al 8 de octubre, siguieron el mismo patrón."
    },
    {
      "type": "p",
      "text": "El problema es que internet sigue lleno de artículos antiguos que dicen que las rebajas de Otoño de Steam son a finales de noviembre. Si te fías y esperas, acabas esperando unas rebajas que ya terminaron. Este año eso era dejar pasar un juego que a principios de octubre estaba barato y quedarte solo con eventos menores antes del Black Friday y de las rebajas de Invierno, a mediados de diciembre."
    },
    {
      "type": "p",
      "text": "Valve nunca ha explicado públicamente el cambio. Lo que se movió fueron las rebajas de Otoño. Ahora el final de noviembre lo ocupa un evento distinto, el Black Friday, del que hablamos a continuación."
    },
    { "type": "h2", "text": "Black Friday en Steam 2026: lo que sabemos hasta ahora" },
    {
      "type": "p",
      "text": "Steam celebró en 2025 las primeras rebajas de Black Friday de su historia, desde finales de noviembre hasta el 1 de diciembre, unas semanas después de que las rebajas de Otoño se adelantaran a principios de octubre. El calendario de Valve para 2026 dice que habrá descuentos de Black Friday otra vez, con las fechas todavía por anunciar. A fecha de 5 de noviembre de 2026, el calendario de Steamworks no incluye fechas para este evento."
    },
    {
      "type": "p",
      "text": "Así que todavía no hay ninguna fecha que apuntar en el calendario. El año pasado cayó en la última semana de noviembre, de modo que ahí conviene mirar primero, en la portada de Steam. No es una de las cuatro rebajas de temporada y nadie ha prometido que vaya a ser tan grande como una de ellas, por lo que sigue valiendo la misma regla: compara el precio con el más bajo que hemos registrado antes de comprar."
    },
    { "type": "h2", "text": "¿Cuál de las cuatro es la más grande? La duración da la pista" },
    {
      "type": "p",
      "text": "Las cuatro rebajas de temporada no pesan lo mismo, y la forma más fácil de hacerse una idea es fijarse en cuánto tiempo las mantiene abiertas Valve. Cuanto más largas, más juegos suelen participar y más profundos son los descuentos. Las de Invierno son las más largas, con 18 días; las de Verano duran 14, y las de Primavera y las de Otoño, una semana cada una. Los nombres siguen las estaciones del hemisferio norte, así que en Argentina o Chile las de Verano caen en pleno invierno."
    },
    {
      "type": "ul",
      "items": [
        "Rebajas de Invierno (18 días): el mayor evento del año, con más juegos participando que ningún otro.",
        "Rebajas de Verano (14 días): el otro peso pesado. Los grandes lanzamientos suelen tener aquí sus descuentos más fuertes.",
        "Rebajas de Primavera (7 días): cortas y más comedidas, pero aun así claramente más baratas que una semana normal.",
        "Rebajas de Otoño (7 días): de tamaño parecido a las de Primavera, con aire de última oportunidad antes del invierno."
      ]
    },
    {
      "type": "p",
      "text": "Así que, si un juego no corre prisa, apuntar a Verano o Invierno es estadísticamente la mejor apuesta. Pero es una tendencia general, no una regla para un juego concreto. Hay muchos títulos que alcanzan su precio más bajo registrado en unas rebajas de Primavera y luego, en diciembre, ofrecen algo del montón. Volveremos a esto más abajo."
    },
    { "type": "h2", "text": "El evento que parece unas rebajas pero no lo es: el Next Fest" },
    {
      "type": "p",
      "text": "Si miras el calendario de Steam, verás un evento grande llamado Next Fest tres veces al año. El nombre es muy llamativo y la tienda entera se pone de gala, así que es fácil confundirlo con unas rebajas. No lo es. El Next Fest es un festival de demos de juegos que todavía no han salido. No es el momento de gastar dinero, sino de probar antes de tener que hacerlo."
    },
    {
      "type": "ul",
      "items": [
        "Next Fest: del 19 al 26 de octubre de 2026 (ya terminó)",
        "Next Fest: del 22 de febrero al 1 de marzo de 2027",
        "Next Fest: del 14 al 21 de junio de 2027"
      ]
    },
    {
      "type": "p",
      "text": "Aun así, se le puede sacar partido para ahorrar. Juega las demos, añade a tu lista de deseos las que te hayan gustado y, cuando esos juegos salgan y estrenen su primer descuento, estarás comprando algo que ya sabes que te gusta. Es una sensación mucho mejor que pedir un reembolso a las dos horas de una compra a ciegas."
    },
    { "type": "h2", "text": "Los festivales temáticos que rellenan los huecos" },
    {
      "type": "p",
      "text": "Podría parecer que entre las grandes rebajas no pasa nada, pero no es así. Valve organiza casi cada mes eventos más pequeños, montados alrededor de un género o un tema, que rebajan solo los juegos que encajan. No tienen ni de lejos la escala de unas rebajas de temporada, pero si el juego al que le has echado el ojo encaja en el tema, el precio puede ser igual de bueno. Estos son los que Valve tiene programados hasta ahora."
    },
    {
      "type": "ul",
      "items": [
        "Auto-Battler RPG Fest (RPG con combates automáticos): del 16 al 23 de noviembre de 2026",
        "Desktop Companion Fest (mascotas y compañeros de escritorio): del 14 al 18 de enero de 2027",
        "Shop Keeper Fest (juegos de llevar una tienda): del 25 de enero al 1 de febrero de 2027",
        "Sheep Fest (juegos con ovejas): del 4 al 8 de febrero de 2027",
        "Couch Co-Op Fest (cooperativo local): del 8 al 15 de febrero de 2027",
        "Rhythm Fest (juegos de ritmo): del 8 al 15 de marzo de 2027",
        "Dinos vs. Robots Fest (dinosaurios contra robots): del 29 de marzo al 5 de abril de 2027",
        "Racing Fest (juegos de carreras): del 12 al 19 de abril de 2027",
        "Witch Fest (juegos de brujas): del 22 al 26 de abril de 2027",
        "Fighting Fest (juegos de lucha): del 26 de abril al 3 de mayo de 2027",
        "Real-Time Strategy Fest (estrategia en tiempo real): del 10 al 17 de mayo de 2027",
        "Mountaineering Fest (montañismo): del 31 de mayo al 3 de junio de 2027"
      ]
    },
    {
      "type": "note",
      "text": "Los festivales temáticos solo afectan a los juegos que encajan en el tema, así que pasar una temporada sin rebajas grandes no es tan desalentador como suena. Si el juego que quieres es un auto-battler, el festival del 16 de noviembre es en la práctica su rebaja. Si es un juego de ritmo, mira marzo."
    },
    { "type": "h2", "text": "Saber las fechas no te garantiza un buen precio" },
    {
      "type": "p",
      "text": "Si has llegado hasta aquí y ya lo has apuntado en el calendario, llevas la mitad del camino. La otra mitad es una verdad algo incómoda: que haya rebajas de temporada no significa que todos los juegos lleguen a su precio más bajo. Un juego puede llevar la etiqueta del 70% en las rebajas de Verano y seguir estando más caro que el diciembre pasado, cuando estuvo al 75%."
    },
    {
      "type": "p",
      "text": "Lo contrario pasa igual de a menudo. En una semana cualquiera, sin rebajas de por medio, un juego baja discretamente por debajo de todo lo que había costado antes. Cada juego tiene su propio ritmo de descuentos, y las rebajas de temporada no son más que una ola grande que pasa por encima de ese ritmo."
    },
    {
      "type": "quote",
      "text": "Lo que importa no es el porcentaje de descuento, sino la distancia entre el precio de hoy y el más bajo que hemos registrado de ese juego."
    },
    { "type": "h2", "text": "¿Comprar ahora o esperar a las rebajas?" },
    {
      "type": "p",
      "text": "En la práctica, con cuatro preguntas delante de la pantalla de pago basta. Si las repasas en orden, la respuesta suele salir sola."
    },
    {
      "type": "ol",
      "items": [
        "Mira cuál es el precio más bajo que hemos registrado de ese juego y compáralo con el de hoy.",
        "Si el precio de hoy está igual o muy cerca de ese precio más bajo, deja de darle vueltas y cómpralo.",
        "Si la diferencia es notable, cuenta cuántos días faltan para las próximas rebajas grandes. Si son menos de dos semanas, compensa esperar.",
        "Si vas a esperar meses, cuenta también como coste el tiempo que pasarás sin jugarlo. Ahorrar 5 euros no siempre vale tres meses de espera."
      ]
    },
    {
      "type": "p",
      "text": "Lowstamp se encarga por ti de los dos primeros pasos. Busca un juego y verás el precio de hoy junto al más bajo que hemos registrado, con la diferencia entre ambos resumida en un veredicto claro: un sello de recibo que te dice si es buen momento para comprar. Para el tercer paso, la cuenta atrás que aparece al principio de esta página sigue las fechas confirmadas que ves aquí. Y si marcas con una estrella los juegos que te interesan, luego puedes revisarlos todos de una vez, cuando los precios se hayan movido."
    },
    {
      "type": "cta",
      "text": "Marca con una estrella los juegos que quieres antes de que empiecen las rebajas de Invierno y, el primer día, podrás ver de un vistazo cuáles están baratos de verdad.",
      "label": "Ver qué está en oferta ahora",
      "to": "/?tab=deals"
    },
    {
      "type": "note",
      "text": "Hay algo que conviene decir claro: Lowstamp empezó a registrar precios en junio de 2026. Así que el precio más bajo que ves aquí no es el más barato que ha tenido el juego desde su lanzamiento, sino el más barato que hemos visto mientras lo seguíamos. En juegos antiguos, sobre todo, es muy posible que hubiera un precio mejor antes de que empezáramos. Irá ganando precisión a medida que se acumule el historial, pero de momento conviene saberlo."
    },
    { "type": "h2", "text": "¿Cuándo publica Valve más fechas?" },
    {
      "type": "p",
      "text": "Valve suele publicar medio año de fechas cada vez, dos veces al año: a finales de enero y a mediados de julio. Eso significa que las fechas de Otoño e Invierno de 2027 probablemente se conocerán a finales de enero de 2027. Hasta entonces nadie sabe los días exactos, y si encuentras una web que ya los da por seguros, son estimaciones sacadas del patrón de los últimos años."
    },
    {
      "type": "p",
      "text": "Esta página se actualiza cada vez que Valve anuncia fechas nuevas. La última comprobación con el calendario oficial de eventos que Valve publica para los estudios fue el 5 de noviembre de 2026. Al final solo hay una cosa que memorizar: saber más o menos cuándo es la próxima rebaja grande, pero, cuando estés delante del botón de comprar, mirar el historial de precios del juego en vez del calendario. Ese hábito, por sí solo, es lo que más te ayuda a no pagar de más."
    },
    {
      "type": "sources",
      "title": "Fuentes y fecha de comprobación",
      "items": [
        {
          "label": "Valve Steamworks: Upcoming Steam Sales and Events (próximas rebajas y eventos de Steam)",
          "url": "https://partner.steamgames.com/doc/marketing/upcoming_events",
          "note": "Rebajas de temporada, Next Fest y festivales temáticos. Comprobado el 5 de noviembre de 2026."
        },
        {
          "label": "Valve Steamworks: Seasonal Sales (rebajas de temporada)",
          "url": "https://partner.steamgames.com/doc/marketing/discounts/seasonalsales",
          "note": "Fechas de las rebajas de temporada. Comprobado el 5 de noviembre de 2026."
        },
        {
          "label": "Valve Steamworks: Discounting (descuentos)",
          "url": "https://partner.steamgames.com/doc/marketing/discounts",
          "note": "Las ofertas del día y las ofertas semanales de Steam también cambian a las 10:00, hora del Pacífico de EE. UU. Comprobado el 5 de noviembre de 2026."
        },
        {
          "label": "dlcompare: Valve confirms the complete schedule of Steam events in 2026 (Valve confirma el calendario completo de eventos de Steam de 2026)",
          "url": "https://www.dlcompare.co.uk/gaming-news/valve-reveals-the-full-lineup-of-steam-events-scheduled-throughout-2026-70170",
          "note": "Noticia de enero de 2026, de donde sale el dato de que el Black Friday de 2026 figura en el calendario con las fechas todavía por anunciar."
        },
        {
          "label": "PC Gamer: Steam's first-ever Black Friday sale (las primeras rebajas de Black Friday de la historia de Steam)",
          "url": "https://www.pcgamer.com/games/steam-black-friday-sale-2025/",
          "note": "Noticia sobre las rebajas de 2025."
        }
      ]
    },
    {
      "type": "faq",
      "title": "Fechas de las rebajas de Steam: preguntas frecuentes",
      "items": [
        {
          "q": "¿Cuándo son las próximas rebajas de Steam?",
          "a": "Las rebajas de Invierno. Empiezan el 17 de diciembre de 2026 a las 10:00 hora del Pacífico de EE. UU. (las 19:00 en la España peninsular) y terminan el 4 de enero de 2027. Antes de eso, el único evento de Valve con fecha es el Auto-Battler RPG Fest, del 16 al 23 de noviembre, que solo rebaja juegos de auto-battler. También se esperan descuentos de Black Friday, pero todavía no se han publicado las fechas."
        },
        {
          "q": "¿A qué hora empiezan las rebajas de Invierno de Steam?",
          "a": "A las 10:00 hora del Pacífico de EE. UU. del 17 de diciembre de 2026. Eso son las 19:00 en la España peninsular, las 12:00 en Ciudad de México, las 13:00 en Colombia y Perú y las 15:00 en Argentina."
        },
        {
          "q": "¿Cuándo terminan las rebajas de Invierno de Steam?",
          "a": "El 4 de enero de 2027 a las 10:00 hora del Pacífico de EE. UU., es decir, a las 19:00 en la España peninsular y a las 12:00 en Ciudad de México. Con 18 días, son las rebajas más largas del año."
        },
        {
          "q": "¿Hay rebajas de Black Friday en Steam en 2026?",
          "a": "Valve ha dicho que habrá descuentos de Black Friday, pero a fecha de 5 de noviembre de 2026 todavía no ha publicado las fechas. El año pasado Steam celebró sus primeras rebajas de Black Friday, desde finales de noviembre hasta el 1 de diciembre de 2025. No es una de las cuatro rebajas de temporada, así que conviene vigilar la portada de Steam en la segunda mitad de noviembre."
        },
        {
          "q": "¿Cuándo fueron las rebajas de Otoño de Steam en 2026?",
          "a": "Del 1 al 8 de octubre de 2026, con inicio y final a las 10:00 hora del Pacífico de EE. UU. (las 19:00 en la España peninsular). Ya terminaron. Las fechas de las de Otoño de 2027 todavía no se han anunciado."
        },
        {
          "q": "¿Cuándo son las rebajas de Primavera de Steam en 2027?",
          "a": "Del 18 al 25 de marzo de 2027, con inicio a las 10:00 hora del Pacífico de EE. UU. (las 18:00 en la España peninsular). Duran siete días."
        },
        {
          "q": "¿Cuándo son las rebajas de Verano de Steam en 2027?",
          "a": "Del 24 de junio al 8 de julio de 2027, con inicio a las 10:00 hora del Pacífico de EE. UU. (las 19:00 en la España peninsular). Duran 14 días."
        },
        {
          "q": "¿El Steam Next Fest es una rebaja?",
          "a": "No. Es un festival de demos de juegos que todavía no han salido. Los próximos son del 22 de febrero al 1 de marzo de 2027 y del 14 al 21 de junio de 2027."
        },
        {
          "q": "¿Son oficiales estas fechas de las rebajas de Steam?",
          "a": "Sí. Salen del calendario oficial de eventos que Valve publica para los estudios en Steamworks, que suele actualizar dos veces al año, a finales de enero y a mediados de julio."
        },
        {
          "q": "¿Siempre es mejor comprar en las rebajas de Steam?",
          "a": "No. Hay juegos que alcanzan su precio más bajo fuera de las rebajas de temporada, y otros que ahora rebajan menos que antes. Compara el precio de hoy con el más bajo registrado de ese juego en lugar de fiarte de la etiqueta del descuento."
        }
      ]
    }
  ]
};
