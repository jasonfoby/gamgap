// 가이드 글(스페인어): 스팀 가족 공유 — 한 개 사서 가족이 같이 하기
// ⚠ 사실 기준: 스팀 고객지원 공식 FAQ "Steam Families"
//   (help.steampowered.com/en/faqs/view/054C-3167-DD7F-49D4), 2026-09-15 확인.
// ⚠ 2024년 3월 이후 '스팀 가족' 방식이다. "주인이 게임을 켜면 빌린 사람이 못 한다"는 옛 설명으로 되돌리지 말 것.
// 공식 기능 이름은 스팀 고객지원 스페인어 페이지 제목 기준 "grupos familiares de Steam". 메뉴 이름은 괄호에 영어를 함께 적는다.
// 영어판(en/steam-family-sharing.js)과 블록 구성이 같아야 한다. 스페인 기준(유로)이라 vosotros·ustedes 명령형은 피하고 tú로 쓴다.

export default {
  "slug": "steam-family-sharing",
  "title": "Grupos familiares de Steam: compra una vez y juega en familia",
  "description": "Los grupos familiares de Steam permiten que hasta seis personas compartan sus juegos. Cuándo se puede jugar a la vez, qué juegos no se comparten, el límite de un año al salir de un grupo y cómo crearlo, según la página oficial de soporte de Steam.",
  "date": "2026-07-05",
  "updated": "2026-09-15",
  "tags": [
    "familia compartida",
    "grupos familiares de Steam",
    "ahorro",
    "consejos de compra"
  ],
  "readMins": 8,
  "body": [
    {
      "type": "p",
      "text": "Si en una misma casa cada persona compra el mismo juego, se paga dos veces por lo mismo. Steam tiene una función llamada grupos familiares que permite a los miembros de una familia compartir sus juegos. Resumiendo: dentro del mismo grupo familiar, cualquier miembro puede instalar y jugar desde su propia cuenta los juegos que tenga otro miembro. Un grupo admite hasta seis personas, y se pueden jugar juegos distintos al mismo tiempo."
    },
    {
      "type": "note",
      "text": "En marzo de 2024, Steam sustituyó el antiguo Préstamo familiar y el Modo familiar por los grupos familiares de Steam. Por internet todavía circula la explicación de que, cuando el dueño abre un juego, la persona que lo tiene prestado ya no puede jugar. Eso era el sistema antiguo y ya no funciona así. Esta guía sigue las preguntas frecuentes oficiales del soporte de Steam, consultadas en septiembre de 2026."
    },
    {
      "type": "table",
      "caption": "Grupos familiares de Steam de un vistazo",
      "head": [
        "Tema",
        "Cómo funciona"
      ],
      "rows": [
        [
          "Tamaño del grupo",
          "Hasta 6 personas, contándote a ti"
        ],
        [
          "Qué se comparte",
          "Los juegos de cualquier miembro y los DLC del dueño que el editor permita compartir"
        ],
        [
          "Partidas guardadas y logros",
          "Se guardan por separado en la cuenta de cada persona"
        ],
        [
          "Jugar a la vez",
          "Juegos distintos: sí. El mismo juego: solo tantas personas como copias haya en el grupo"
        ],
        [
          "Juegos que no se comparten",
          "Los que el editor ha excluido, los que necesitan otra cuenta o una suscripción y los que no están disponibles en tu región o en tu sistema operativo"
        ],
        [
          "Funciones",
          "Adulto (puede invitar y gestionar) o menor (con controles parentales)"
        ],
        [
          "Salir del grupo",
          "Los adultos pueden salir cuando quieran, pero para crear otro grupo o unirse a uno nuevo deben esperar un año desde que entraron en el anterior"
        ],
        [
          "Plazas libres",
          "La plaza que deja alguien no puede ocuparla un miembro nuevo hasta que pase un año"
        ]
      ]
    },
    {
      "type": "h2",
      "text": "Cómo te ahorra dinero"
    },
    {
      "type": "p",
      "text": "La idea es comprar una vez y disfrutar entre todos. Si dos hermanos quieren el mismo juego para un jugador, basta con que lo compre uno. Y si cada persona de la familia compra juegos distintos, la biblioteca de todos se multiplica."
    },
    {
      "type": "h2",
      "text": "Un ejemplo rápido"
    },
    {
      "type": "p",
      "text": "Un juego para un jugador de 59,99 € comprado dos veces cuesta 119,98 €. Si se compra una vez y se comparte en el grupo familiar, los dos hermanos juegan por 59,99 €. Si el padre compra un juego de carreras, un hermano uno de acción y el otro uno de puzles, los tres tienen los tres juegos pagando uno cada uno. Y con el sistema actual, un hermano puede jugar al de acción mientras el otro juega al de carreras al mismo tiempo."
    },
    {
      "type": "h2",
      "text": "Jugar al mismo juego a la vez"
    },
    {
      "type": "p",
      "text": "Hay un único límite real: cada copia de un juego solo la puede usar una persona a la vez. El ejemplo del propio Steam lo deja claro. Si alguien del grupo tiene Portal 2 y Half-Life, una persona puede jugar a Portal 2 mientras otra juega a Half-Life. Pero si dos personas quieren jugar a Portal 2 en el mismo momento, alguien del grupo tiene que comprar una segunda copia."
    },
    {
      "type": "p",
      "text": "Si el grupo tiene más de una copia, Steam abre por ti la que esté libre. Si las copias tienen DLC distintos, puede que las partidas guardadas no pasen bien de una a otra, así que conviene igualar los DLC de los juegos que se juegan en común. Si no hay ninguna copia libre, toca esperar a que la otra persona termine o jugar a otra cosa mientras tanto."
    },
    {
      "type": "h2",
      "text": "Algunos juegos no se pueden compartir"
    },
    {
      "type": "ul",
      "items": [
        "Juegos que el editor ha marcado como no disponibles para compartir.",
        "Juegos que necesitan una cuenta de terceros o una suscripción aparte.",
        "Juegos o DLC restringidos en tu región.",
        "Juegos que no son compatibles con tu sistema operativo."
      ]
    },
    {
      "type": "h2",
      "text": "¿Se puede meter a amigos? Antes, la regla del año"
    },
    {
      "type": "p",
      "text": "Steam describe los grupos familiares como una función pensada para un hogar de hasta seis familiares cercanos, y avisa de que los requisitos pueden cambiar según vea cómo se usa. Por eso no recomendamos añadir amigos a la ligera."
    },
    {
      "type": "p",
      "text": "Además hay un motivo práctico. Los adultos pueden salir de un grupo cuando quieran, pero para crear otro o unirse a uno nuevo tienen que esperar un año desde que entraron en el anterior. La plaza que deja alguien tampoco puede ocuparla un miembro nuevo hasta dentro de un año. Entrar y salir por capricho puede dejarte bloqueado un año entero. Los miembros adultos también pueden expulsar a otros miembros. Y pase lo que pase, nunca des tus datos de inicio de sesión: compartir contraseñas es la forma más habitual de que roben o bloqueen una cuenta."
    },
    {
      "type": "h2",
      "text": "Cómo crear el grupo"
    },
    {
      "type": "ol",
      "items": [
        "En la tienda de Steam, haz clic en el nombre de tu cuenta, arriba a la derecha, y abre los detalles de la cuenta (Account Details).",
        "Entra en la gestión del grupo familiar (Family Management).",
        "Haz clic en crear un grupo familiar (Create a Family) y ponle un nombre. Puedes cambiarlo más adelante.",
        "Pulsa invitar a un miembro (Invite a Member), busca a la persona y elige si la añades como adulto o como menor.",
        "Le llegará un aviso. Cuando acepte, los juegos del grupo aparecerán en la biblioteca de cada miembro."
      ]
    },
    {
      "type": "note",
      "text": "En Steam en español los menús pueden llamarse un poco distinto. Guíate por el nombre en inglés entre paréntesis y, si no los encuentras, busca «grupos familiares de Steam» en el soporte de Steam."
    },
    {
      "type": "h2",
      "text": "Los juegos que hay que tener dos veces, cómpralos baratos"
    },
    {
      "type": "p",
      "text": "Si dos personas quieren jugar al mismo juego a la vez, o el juego no se puede compartir, alguien tendrá que comprar otra copia. Ya que hay que comprarla, mejor hacerlo en el momento más barato. Antes de decidir quién la compra, comprueba si el precio de hoy está cerca del mínimo que hemos registrado para ese juego."
    },
    {
      "type": "cta",
      "text": "¿Pensando en comprar un juego para jugar en familia? Mira primero si de verdad está barato ahora. Cada juego rebajado se compara con su mínimo registrado en una sola línea.",
      "label": "Ver juegos en oferta",
      "to": "/?tab=deals"
    },
    {
      "type": "faq",
      "title": "Preguntas frecuentes sobre los grupos familiares de Steam",
      "items": [
        {
          "q": "¿Cuántas personas caben en un grupo familiar de Steam?",
          "a": "Hasta seis personas, contándote a ti."
        },
        {
          "q": "¿Pueden dos personas jugar a la vez al mismo juego compartido?",
          "a": "Solo si el grupo tiene dos copias de ese juego. Los juegos distintos sí se pueden jugar a la vez. Con una sola copia, toca esperar a que la otra persona termine o comprar otra."
        },
        {
          "q": "¿Puedo jugar al juego de un familiar mientras juega a otra cosa?",
          "a": "Sí. Los grupos familiares funcionan por copia de cada juego, así que el dueño jugando a otro juego no te lo impide. Quedarse bloqueado cada vez que el dueño abría algo era el funcionamiento del antiguo Préstamo familiar, anterior a 2024."
        },
        {
          "q": "¿Las partidas guardadas y los logros quedan en mi cuenta?",
          "a": "Sí. Las partidas guardadas y los logros se guardan en la cuenta de cada persona, incluidos los logros que consigas en un juego prestado."
        },
        {
          "q": "¿Se comparten los DLC?",
          "a": "Tienes acceso a los DLC que tenga el dueño del juego, siempre que el editor permita compartirlos."
        },
        {
          "q": "¿Qué juegos no se pueden compartir?",
          "a": "Los que el editor ha excluido, los que necesitan otra cuenta o una suscripción, y los que no están disponibles en tu región o en tu sistema operativo."
        },
        {
          "q": "¿Puedo añadir amigos a un grupo familiar de Steam?",
          "a": "Steam dice que la función está pensada para un hogar de hasta seis familiares cercanos y que los requisitos pueden cambiar. Si sales de un grupo tienes que esperar un año para entrar en otro, y las plazas libres tardan un año en volver a ocuparse, así que elige con cuidado."
        },
        {
          "q": "¿Puedo volver a un grupo familiar después de salir?",
          "a": "Puedes volver sin esperar al último grupo en el que estuviste, siempre que tenga menos de seis miembros. Para crear otro grupo o unirte a uno distinto hay que esperar un año desde que entraste en el anterior."
        },
        {
          "q": "¿Cómo se configura un grupo familiar de Steam?",
          "a": "En la tienda de Steam, ve a los detalles de la cuenta (Account Details), abre la gestión del grupo familiar (Family Management), crea el grupo e invita a los miembros."
        }
      ]
    },
    {
      "type": "quote",
      "text": "Compra una vez y compártelo con tu familia. Y para los juegos que hay que jugar a la vez, compra la segunda copia cuando esté más barata."
    }
  ]
};
