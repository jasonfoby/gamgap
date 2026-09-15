// 가이드 글(스페인어): 스팀 리모트 플레이 투게더 — 한 명만 사도 친구랑 같이 하기
// ⚠ 사실 기준은 영어판(en/steam-remote-play-together.js) 머리 주석과 같다(2026-09-16 확인). 영어판에 없는 사실을 새로 넣지 말 것.
// 공식 기능 이름: 스페인어 스팀 상점도 영어 "Remote Play Together" 그대로 표기한다(포털 2 상점 페이지로 확인).
// 영어판과 블록 구성이 같아야 한다. 스페인 기준(유로)이라 vosotros·ustedes 명령형은 피하고 tú로 쓴다.

export default {
  "slug": "steam-remote-play-together",
  "title": "Remote Play Together de Steam: juega con tus amigos aunque solo uno tenga el juego",
  "description": "Con Remote Play Together, la partida de una persona se transmite a sus amigos para que todos puedan jugar, y solo el anfitrión necesita tener el juego. Qué juegos son compatibles, cómo invitar a tus amigos (incluso a quienes no tienen cuenta de Steam) y cómo reducir el lag, según las páginas oficiales de Steam.",
  "date": "2026-09-16",
  "tags": [
    "Remote Play Together",
    "jugar con amigos",
    "ahorro",
    "consejos de compra"
  ],
  "readMins": 7,
  "body": [
    {
      "type": "p",
      "text": "Juntar a cuatro amigos para echar una partida a un juego de fiesta se complica mucho si los cuatro tienen que comprárselo. Steam tiene una función llamada Remote Play Together que permite a tus amigos unirse a tu partida por internet aunque el juego solo lo tengas tú. Piensa en esos juegos cooperativos locales o de fiesta a los que se juega en el mismo sofá: es como si ese sofá se alargara hasta la casa de cada uno de tus amigos. Ellos no tienen que comprar ni instalar nada, y la función en sí es gratuita."
    },
    {
      "type": "note",
      "text": "Esta guía se basa en la página de soporte de Steam sobre Steam Remote Play y en la página de Remote Play de la tienda de Steam, consultadas las dos en septiembre de 2026. Steam cambia los menús de sitio de vez en cuando, así que si ves algo distinto, guíate por el nombre Remote Play Together, que en Steam en español también aparece así, en inglés."
    },
    {
      "type": "table",
      "caption": "Remote Play Together de un vistazo",
      "head": [
        "Tema",
        "Cómo funciona"
      ],
      "rows": [
        [
          "Quién tiene que comprar el juego",
          "Solo el anfitrión, que es quien lo ejecuta. Los amigos no lo compran ni lo instalan"
        ],
        [
          "Cuántos jugadores",
          "Según Steam, hasta cuatro, o más si las conexiones son rápidas. Aun así, no se puede pasar del número de jugadores que admite el propio juego"
        ],
        [
          "Qué juegos funcionan",
          "Los que muestran Remote Play Together en los detalles del juego de su página en la tienda"
        ],
        [
          "Desde dónde se unen tus amigos",
          "Desde un ordenador con Steam, o desde un móvil, una tableta o un televisor con la aplicación Steam Link"
        ],
        [
          "Amigos sin cuenta de Steam",
          "Pueden unirse con un enlace de invitación, una persona por enlace"
        ],
        [
          "Precio",
          "Gratis"
        ],
        [
          "Partidas guardadas y logros",
          "El juego se ejecuta en el ordenador del anfitrión, así que se quedan en su cuenta"
        ],
        [
          "Qué no funciona",
          "Los juegos de realidad virtual (VR) y algunos periféricos que no son mandos, como los volantes de carreras o los joysticks de vuelo"
        ]
      ]
    },
    {
      "type": "h2",
      "text": "¿En qué se diferencia de los grupos familiares de Steam?"
    },
    {
      "type": "p",
      "text": "Las dos opciones sirven para que varias personas disfruten de una sola copia de un juego, así que es fácil confundirlas, pero funcionan de forma totalmente distinta. Con los grupos familiares de Steam, cada miembro de la familia instala el juego en su propio ordenador y juega por su cuenta; y como están pensados para un solo hogar, salir de un grupo conlleva un límite de un año. Con Remote Play Together, el juego se ejecuta en el ordenador del anfitrión, que envía la imagen a tus amigos y recibe lo que ellos pulsan. Por eso tus amigos no tienen por qué ser de tu familia, y no hay ningún grupo en el que entrar ni del que salir. La pega es que solo funciona con juegos pensados para compartir una misma pantalla, y cuando el anfitrión cierra el juego, se acaba la partida para todos."
    },
    {
      "type": "cta",
      "text": "Si las personas con las que quieres compartir juegos viven bajo el mismo techo, puede que te convengan más los grupos familiares de Steam, porque cada uno puede instalar y jugar por su cuenta.",
      "label": "Leer la guía de grupos familiares de Steam",
      "to": "/guide/steam-family-sharing"
    },
    {
      "type": "h2",
      "text": "Cuatro jugadores, una sola copia"
    },
    {
      "type": "p",
      "text": "Pongamos que un juego de fiesta cuesta 19,99 €. Si cada uno de los cuatro amigos se lo compra, son 79,96 €. Con Remote Play Together, el anfitrión paga 19,99 € y los otros tres solo tienen que aceptar la invitación. La diferencia se nota todavía más en esos juegos que solo sacas de vez en cuando, al quedar con tus amigos. Eso sí, si alguno quiere jugar también por su cuenta en casa, tendrá que comprarse su propia copia."
    },
    {
      "type": "h2",
      "text": "Cómo saber si un juego es compatible"
    },
    {
      "type": "p",
      "text": "Abre la página del juego en la tienda de Steam y fíjate en los detalles que aparecen a la derecha. Si ahí sale Remote Play Together, es compatible. Steam activa la función automáticamente en los juegos que figuran con multijugador local o pantalla partida, pero los desarrolladores pueden desactivarla, así que compruébalo aunque el juego parezca de los que deberían funcionar. Por ejemplo, en la página de Portal 2 aparece Remote Play Together junto a su cooperativo a pantalla partida. Los juegos que solo tienen cooperativo en línea y no muestran esa etiqueta no se pueden jugar así."
    },
    {
      "type": "h2",
      "text": "Cómo invitar a un amigo"
    },
    {
      "type": "ol",
      "items": [
        "El anfitrión (la persona que tiene el juego) lo inicia.",
        "Comprueba que tu amigo tenga la sesión iniciada en Steam, ya sea en un ordenador o desde la aplicación Steam Link.",
        "Dentro del juego, pulsa Mayús+Tab (Shift+Tab) para abrir la interfaz superpuesta de Steam.",
        "En tu lista de amigos, haz clic derecho en el nombre de tu amigo y elige Remote Play Together.",
        "En cuanto tu amigo acepte, estará dentro del juego contigo."
      ]
    },
    {
      "type": "note",
      "text": "Cada amigo juega con su propio mando, y el anfitrión también puede dejarles usar el teclado y el ratón. Si lo que pulsa un amigo no hace nada en el juego, el anfitrión puede abrir la interfaz superpuesta de Steam y revisar los dispositivos de ese amigo en el panel de Remote Play."
    },
    {
      "type": "h2",
      "text": "También puede unirse un amigo sin cuenta de Steam"
    },
    {
      "type": "p",
      "text": "Desde 2021 puedes invitar con un enlace a personas que no tienen cuenta de Steam. El anfitrión elige «Añadir invitado» en el panel de Remote Play Together de la interfaz superpuesta de Steam y comparte el enlace con «Copiar enlace». Esa persona instala la aplicación Steam Link y se une desde ahí; si ya tiene Steam instalado, la conexión se hace a través de Steam. Cuando salió la función, con un enlace solo podía entrar un invitado, pero ahora Steam tiene la opción «Añadir otro invitado». Cada enlace sirve para una persona, así que creas otro enlace por cada invitado más. La aplicación Steam Link funciona en Windows, iOS, Android y otros sistemas."
    },
    {
      "type": "h2",
      "text": "Cómo reducir el lag"
    },
    {
      "type": "ul",
      "items": [
        "Si puede, el anfitrión debería conectarse por cable. Es lo que recomienda la propia página de soporte de Steam.",
        "Si a tus amigos la imagen les va a tirones, baja la resolución del juego en el ordenador del anfitrión y desactiva la sincronización vertical (vsync).",
        "En los ajustes de Remote Play de Steam puedes dar prioridad a la velocidad sobre la calidad, limitar el ancho de banda y bajar la resolución máxima de captura.",
        "Steam recomienda que el ordenador del anfitrión tenga al menos un procesador de cuatro núcleos. A tu amigo le vale cualquier portátil reciente."
      ]
    },
    {
      "type": "p",
      "text": "También ayuda saber qué esperar. Tus amigos están viendo un vídeo de la pantalla del anfitrión, así que todo les llega con un poco de retraso. Por eso los juegos de fiesta, los de puzles cooperativos y los de turnos van mejor que los de ritmo o de lucha, en los que cada fracción de segundo cuenta. Además, el progreso y los logros se quedan en la cuenta del anfitrión, porque el juego se ejecuta en su ordenador; si un amigo quiere tenerlos en su cuenta, necesitará su propia copia."
    },
    {
      "type": "h2",
      "text": "Solo lo compra uno, así que cómpralo cuando esté barato"
    },
    {
      "type": "p",
      "text": "Al final, quien paga es solo el anfitrión. Lo único que hay que decidir es cuándo comprar esa copia, así que unos días antes de quedar para jugar, mira si el precio de hoy está cerca del mínimo que hemos registrado para ese juego. Y si hay unas rebajas grandes a la vuelta de la esquina, esperar a que lleguen también es una opción."
    },
    {
      "type": "cta",
      "text": "¿Quieres saber si el juego que va a comprar el anfitrión está barato ahora mismo? Empieza por la lista de ofertas: en cada juego verás en una sola línea lo cerca que está el precio de hoy del mínimo que hemos registrado.",
      "label": "Ver juegos en oferta ahora",
      "to": "/?tab=deals"
    },
    {
      "type": "faq",
      "title": "Preguntas frecuentes sobre Remote Play Together",
      "items": [
        {
          "q": "¿Mis amigos necesitan tener el juego para usar Remote Play Together?",
          "a": "No. Solo lo necesita el anfitrión, que es quien lo ejecuta. Tus amigos no tienen que comprar ni instalar nada."
        },
        {
          "q": "¿Cuántas personas pueden jugar con Remote Play Together?",
          "a": "Según Steam, hasta cuatro jugadores, o más si las conexiones son rápidas. Aun así, no se puede superar el número de jugadores que admite el propio juego."
        },
        {
          "q": "¿Puede unirse un amigo que no tenga cuenta de Steam?",
          "a": "Sí. El anfitrión le manda un enlace de invitación creado con «Añadir invitado» y tu amigo se une sin cuenta instalando la aplicación Steam Link. Cada enlace sirve para una persona, así que para invitar a más gente hay que crear otro enlace."
        },
        {
          "q": "¿Remote Play Together funciona con todos los juegos?",
          "a": "No. Solo con los que muestran Remote Play Together en los detalles de su página de la tienda. Steam lo activa automáticamente en los juegos que figuran con multijugador local o pantalla partida, pero los desarrolladores pueden desactivarlo."
        },
        {
          "q": "¿Mis amigos pueden unirse desde el móvil?",
          "a": "Sí. Con la aplicación Steam Link pueden unirse desde un móvil, una tableta o un televisor. Lo que reciben es la imagen de la pantalla del anfitrión en directo, así que no hace falta que el juego sea compatible con móviles."
        },
        {
          "q": "Mi amigo pulsa los botones, pero en el juego no pasa nada. ¿Qué reviso?",
          "a": "El anfitrión puede pulsar Mayús+Tab (Shift+Tab) para abrir la interfaz superpuesta de Steam y comprobar en el panel de Remote Play que el mando, o el teclado y el ratón, de ese amigo están activados."
        },
        {
          "q": "Envío la invitación, pero me dice que ha fallado. ¿Por qué?",
          "a": "Los avisos de error de Steam recogen varias causas: que Remote Play esté desactivado en la configuración, que no estés visible, que haya una retransmisión activa, que la realidad virtual (VR) esté activa, que la pantalla esté bloqueada o que el juego no esté disponible en tu país. Mira qué causa indica el aviso y empieza por ahí."
        },
        {
          "q": "¿En qué cuenta se quedan las partidas guardadas y los logros?",
          "a": "En la del anfitrión, porque el juego se ejecuta en su ordenador. Si un amigo quiere guardar el progreso en su propia cuenta, necesita su propia copia."
        },
        {
          "q": "La imagen va a tirones todo el rato. ¿Cómo lo arreglo?",
          "a": "Que el anfitrión se conecte por cable, baje la resolución del juego y, en los ajustes de Remote Play de Steam, dé prioridad a la velocidad sobre la calidad."
        },
        {
          "q": "¿En qué se diferencia de los grupos familiares de Steam?",
          "a": "Los grupos familiares de Steam permiten que las personas de un mismo hogar instalen los juegos y jueguen por separado. Remote Play Together permite que tus amigos compartan la pantalla del anfitrión. Para jugar con amigos encaja mejor Remote Play Together: no hay que unirse a ningún grupo familiar ni existe la regla de un año."
        }
      ]
    },
    {
      "type": "quote",
      "text": "En los juegos para jugar en grupo, basta con que uno lo compre y todos compartan la pantalla. Y esa única copia, cómprala cuando esté barata."
    }
  ]
};
