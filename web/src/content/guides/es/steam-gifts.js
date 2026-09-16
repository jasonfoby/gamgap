// 가이드 글(스페인어): 스팀 선물하기 — 보내는 법, 예약 발송, 거절, 선물 환불
// ⚠ 사실 기준은 영어판(en/steam-gifts.js) 머리 주석과 같다(2026-09-16 확인). 영어판에 없는 사실을 새로 넣지 말 것.
// 메뉴·버튼 이름은 스팀 고객지원 스페인어 "Steam 선물" 안내(2C02-3563-B72F-F117)에 적힌 그대로 쓴다.
// 영어판과 블록 구성이 같아야 한다. 스페인 기준이라 vosotros·ustedes 명령형은 피하고 tú로 쓴다.

export default {
  "slug": "steam-gifts",
  "title": "Regalos de Steam: cómo enviar un juego, programar la entrega y pedir el reembolso",
  "description": "Puedes regalar una compra nueva de Steam a cualquier persona de tu lista de amigos y programar la entrega hasta 12 meses después. Quien lo recibe tiene 30 días para aceptarlo o rechazarlo, e incluso un regalo ya canjeado se puede reembolsar si cumple las condiciones. Por qué a veces no se puede enviar un regalo y cómo funcionan exactamente los reembolsos de regalos, con los nombres de menú que usa el propio Soporte de Steam.",
  "date": "2026-09-16",
  "tags": [
    "regalos de Steam",
    "reembolso de regalos",
    "ahorro",
    "consejos de compra"
  ],
  "readMins": 8,
  "body": [
    {
      "type": "p",
      "text": "Si quieres regalarle un juego a un amigo por su cumpleaños, Steam te deja enviárselo como regalo en el mismo momento de comprarlo. Eso sí, esa persona tiene que estar en tu lista de amigos de Steam, y el juego tiene que ser una compra nueva: no puedes regalar uno que ya tengas. Si lo rechaza o deja pasar 30 días sin hacer nada, te devuelven el dinero automáticamente, e incluso un regalo que ya se ha canjeado se puede reembolsar si cumple las condiciones. El reembolso de un regalo funciona de forma distinta antes y después de canjearlo, así que esa parte tiene sus propios apartados más abajo."
    },
    {
      "type": "note",
      "text": "Esta guía se basa en la página de ayuda de Steam sobre los regalos y en la política de reembolsos de Steam, consultadas las dos en septiembre de 2026. Los nombres de menús y botones entre comillas son los que aparecen en la página de soporte de Steam en español."
    },
    {
      "type": "table",
      "caption": "Lo básico de los regalos de Steam",
      "head": [
        "Tema",
        "Cómo funciona"
      ],
      "rows": [
        [
          "Quién puede recibir un regalo",
          "Cualquier persona de tu lista de amigos de Steam"
        ],
        [
          "Qué se puede regalar",
          "Una compra nueva. No puedes pasarle a otra persona un juego que ya tienes"
        ],
        [
          "Cuándo llega",
          "Al momento, o en la fecha que programes, hasta 12 meses después de la compra"
        ],
        [
          "Plazo para aceptarlo",
          "30 días desde la entrega. Si no se hace nada, la compra se cancela y se reembolsa"
        ],
        [
          "Si el destinatario lo rechaza",
          "Reembolso automático al método de pago del comprador"
        ],
        [
          "Condiciones para el reembolso",
          "Comprado en los últimos 14 días y con menos de 2 horas jugadas por el destinatario"
        ],
        [
          "Reembolso de un regalo ya canjeado",
          "Primero lo aprueba el destinatario y después el comprador pide el reembolso"
        ],
        [
          "Adónde va el dinero reembolsado",
          "Al método de pago original del comprador, o a su Cartera de Steam si ese método no lo admite"
        ]
      ]
    },
    {
      "type": "h2",
      "text": "Cómo enviar un regalo"
    },
    {
      "type": "ol",
      "items": [
        "En la página del juego en la tienda de Steam, haz clic en «Añadir al carro».",
        "En el menú desplegable, elige «Esto es un regalo».",
        "Haz clic en «Continuar a las opciones de regalo», luego en «Seleccionar el destinatario del regalo...» y elige a tu amigo.",
        "Elige «Lo antes posible» o «Programar entrega». Puedes programar la entrega hasta 12 meses después de la fecha de compra.",
        "Haz clic en «Continuar al pago», elige un método de pago, acepta las condiciones y pulsa «Comprar»."
      ]
    },
    {
      "type": "note",
      "text": "El destinatario recibe un correo electrónico con tu mensaje personal e instrucciones para canjear el regalo. Si el saldo de tu Cartera de Steam no cubre todo el precio, puedes pagar el resto con otro método de pago."
    },
    {
      "type": "h2",
      "text": "Cómo cambiar la fecha de entrega programada"
    },
    {
      "type": "p",
      "text": "Un regalo programado para una fecha futura se queda en tu inventario de Steam hasta que se entrega. Para cambiar la fecha, busca la compra con el icono de regalo en «Detalles de la cuenta» > «Ver historial de compras», ve a tu inventario de Steam y haz clic en «Gestionar regalo» para elegir otro día. Cuando llega la nueva fecha, el regalo se envía automáticamente y recibes un correo electrónico en cuanto se ha entregado. Y si quieres ver todos los regalos que has enviado, en tu inventario de Steam haz clic en «...» y después en «Ver el historial de regalos»."
    },
    {
      "type": "h2",
      "text": "Cuando Steam no te deja enviar el regalo"
    },
    {
      "type": "p",
      "text": "Si no puedes seleccionar a alguien de tu lista de amigos, la página de soporte de Steam señala seis posibles motivos."
    },
    {
      "type": "ul",
      "items": [
        "Tu amigo ya tiene el juego. En ese caso, su nombre aparece en gris y no se puede seleccionar.",
        "Como los precios cambian de una región a otra, algunos juegos no se pueden regalar a alguien de otra región de compra. La restricción se indica en la página de la tienda, y el Soporte de Steam no puede cambiarla.",
        "Un DLC solo se puede regalar si tu amigo ya tiene el juego base.",
        "Los lotes que muestran «Completa tu colección» en la página de la tienda están personalizados para tu cuenta, así que no se pueden regalar.",
        "Los paquetes múltiples (packs de 2, 3 o 4 copias) no se pueden regalar enteros: compras uno para tu propia cuenta y regalas las copias extra de una en una. Además, no puedes comprar un paquete múltiple si ya tienes el juego.",
        "Hay juegos que directamente no se pueden regalar. En esos casos, la opción de regalo ni siquiera aparece al finalizar la compra."
      ]
    },
    {
      "type": "note",
      "text": "Si regalar el juego te sigue dando problemas, puedes enviar una tarjeta regalo digital de Steam en su lugar y dejar que tu amigo elija el juego. Eso sí, el saldo de tu propia Cartera de Steam no se puede transferir ni regalar a otra cuenta."
    },
    {
      "type": "h2",
      "text": "Cómo se acepta un regalo"
    },
    {
      "type": "p",
      "text": "Cuando se entrega el regalo, el destinatario recibe un correo electrónico con un enlace para canjearlo y, además, una notificación de regalo en el cliente de Steam. Al hacer clic en «1 regalo nuevo» se abre la página del regalo, y con «Aceptar regalo» el juego se añade a su biblioteca de forma permanente. Si elige «Rechazar regalo», se emite automáticamente un reembolso al método de pago de quien lo compró, y el comprador recibe un correo electrónico avisándole de que el regalo se ha rechazado. Si el destinatario no hace nada en 30 días, Steam cancela la compra y la reembolsa."
    },
    {
      "type": "h2",
      "text": "Los regalos también se pueden reembolsar"
    },
    {
      "type": "p",
      "text": "Un regalo se puede reembolsar si se compró en los últimos 14 días y el destinatario ha jugado menos de 2 horas. Si se aprueba el reembolso, el dinero vuelve al método de pago que usó el comprador, o a su Cartera de Steam si ese método no admite reembolsos. Los 14 días se cuentan desde la fecha de compra, no desde la de entrega. Cómo se pide depende de si el destinatario ya ha canjeado el regalo o todavía no."
    },
    {
      "type": "p",
      "text": "Si el regalo todavía no se ha canjeado, quien lo compró puede pedir el reembolso directamente. Para ello, inicia sesión en el Soporte de Steam, abre «Compras», haz clic en el juego con el icono de regalo, elige «Deseo un reembolso», selecciona un motivo y pulsa «Enviar solicitud». Te llegará un correo electrónico cuando se haya procesado."
    },
    {
      "type": "h2",
      "text": "Cómo reembolsar un regalo que ya se ha canjeado"
    },
    {
      "type": "p",
      "text": "En este caso, el destinatario tiene que dar su aprobación primero. Si el comprador lo pide antes, la solicitud se deniega con un mensaje que indica que el destinatario tiene que aceptar el reembolso desde el sitio de ayuda. Esto es lo que tiene que hacer el destinatario."
    },
    {
      "type": "ol",
      "items": [
        "Inicia sesión en el Soporte de Steam y elige «Juegos, software, etc.».",
        "Busca en la lista el juego que te han regalado y haz clic en él.",
        "Selecciona el motivo que mejor explique por qué no te quedas con el regalo.",
        "Elige «Me gustaría solicitar un reembolso» y, para terminar, marca la casilla «Permitir al comprador original de este regalo solicitar un reembolso».",
        "Una vez que el destinatario lo ha aprobado, el comprador envía su propia solicitud de reembolso por la compra del regalo."
      ]
    },
    {
      "type": "cta",
      "text": "En la guía de reembolsos tienes qué hacer si ya has pasado de las 2 horas o de los 14 días, además de las reglas para los objetos comprados dentro de los juegos y para el saldo de la Cartera de Steam.",
      "label": "Leer la guía de reembolsos de Steam",
      "to": "/guide/steam-refund-policy"
    },
    {
      "type": "h2",
      "text": "Cómpralo en rebajas y que llegue en su cumpleaños"
    },
    {
      "type": "p",
      "text": "Como un regalo se puede programar con hasta 12 meses de antelación, puedes comprar un juego durante unas rebajas y hacer que llegue justo el día de un cumpleaños o de un aniversario. Eso sí, ten en cuenta que el plazo de 14 días para el reembolso empieza a contar el día de la compra, así que si programas la entrega para dentro de mucho tiempo, el plazo se cierra incluso antes de que llegue el regalo. Y al revés: si unas rebajas empiezan pocos días después de haber comprado un regalo, las preguntas habituales de Steam sobre reembolsos dicen que puedes reembolsar la compra si cumple los requisitos y volver a comprarla al precio rebajado."
    },
    {
      "type": "cta",
      "text": "Antes de comprar un regalo, comprueba si el precio de hoy es bueno. En cada juego en oferta verás un veredicto de una línea que compara su precio con el mínimo que hemos registrado.",
      "label": "Ver juegos en oferta ahora",
      "to": "/?tab=deals"
    },
    {
      "type": "h2",
      "text": "Los regalos comprados fuera de Steam pueden desaparecer"
    },
    {
      "type": "p",
      "text": "Cuidado con los «regalos de Steam» baratos que se venden en otras webs. Si el pago con el que se compró un regalo se reembolsa por fraude o por una disputa de pago, el juego se elimina de la biblioteca de quien lo recibió. Steam indica que no apoya la venta de sus regalos fuera de Steam, así que tendrías que pedirle el dinero al vendedor, y Steam tampoco te devolverá los artículos que hayas intercambiado por el regalo. Tu cuenta no queda restringida, pero para volver a jugar a ese juego tendrías que comprarlo o recibir otra copia como regalo."
    },
    {
      "type": "faq",
      "title": "Preguntas frecuentes sobre los regalos de Steam",
      "items": [
        {
          "q": "¿Se puede regalar un juego de Steam a alguien que no sea tu amigo?",
          "a": "No. El destinatario se elige de tu lista de amigos de Steam, así que solo puedes regalar juegos a las personas que tengas añadidas como amigos."
        },
        {
          "q": "¿Puedo pasarle a un amigo un juego que ya tengo?",
          "a": "No. Solo se pueden regalar compras nuevas. Además, cuando un regalo se canjea, pasa a ser del destinatario y ya no se puede volver a transferir."
        },
        {
          "q": "¿Con cuánta antelación se puede programar un regalo de Steam?",
          "a": "Hasta 12 meses desde la fecha de compra. Después puedes cambiar la fecha con «Gestionar regalo» en tu inventario de Steam."
        },
        {
          "q": "¿Qué pasa si mi amigo nunca acepta el regalo?",
          "a": "Si no lo acepta ni lo rechaza en los 30 días siguientes a la entrega, Steam cancela la compra y te devuelve el importe a tu método de pago original."
        },
        {
          "q": "Si se rechaza un regalo, ¿adónde va el dinero?",
          "a": "Se reembolsa automáticamente al método de pago de quien lo compró, y el comprador recibe un correo electrónico avisándole de que el regalo se ha rechazado."
        },
        {
          "q": "¿Se puede reembolsar un regalo de Steam que ya se ha canjeado?",
          "a": "Sí, si se compró en los últimos 14 días y el destinatario ha jugado menos de 2 horas. Primero el destinatario acepta el reembolso en el Soporte de Steam y después lo solicita el comprador. El dinero vuelve al comprador."
        },
        {
          "q": "¿Se puede regalar un DLC en Steam?",
          "a": "Solo si tu amigo ya tiene el juego base."
        },
        {
          "q": "¿Puedo enviar un regalo de Steam a un amigo que vive en otro país?",
          "a": "Depende del juego. Como los precios cambian de una región a otra, algunos juegos no se pueden regalar a alguien de otra región de compra, y la página de la tienda indica esa restricción."
        },
        {
          "q": "Un juego que me han regalado ha desaparecido de mi biblioteca. ¿Por qué?",
          "a": "Si el pago del regalo se reembolsó por fraude o por un problema con el pago, el juego se elimina. Tu cuenta no queda restringida, pero para volver a jugar tendrías que comprarlo o recibir otra copia como regalo."
        },
        {
          "q": "¿Puedo enviarle a un amigo el saldo de mi Cartera de Steam?",
          "a": "No. El saldo de la Cartera de Steam no se puede transferir ni regalar a otra cuenta. Lo que sí puedes hacer es comprarle una tarjeta regalo digital de Steam."
        }
      ]
    },
    {
      "type": "quote",
      "text": "Compra el regalo en rebajas y programa la fecha de entrega. Eso sí, recuerda que el plazo para el reembolso empieza a contar el día que lo compras, no el día que llega."
    }
  ]
};
