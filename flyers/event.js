/*
  ============================================================
  DATOS DEL EVENTO — edita solo este archivo para cada flyer.
  ============================================================
  Todos los diseños (1–5) leen de aquí. Guarda y recarga
  flyer.html, o corre `node flyers/render.mjs` para exportar PNG.

  Cualquier campo que dejes vacío ("") o en null se oculta
  automáticamente del flyer.
*/
window.EVENT = {
  // Línea superior ("presenta")
  presenter: "Drakkars Producciones presenta",

  // Nombre / concepto de la noche. `kicker` va arriba del título en
  // pequeño ("Tributo a"); `eventLogo` es el logo del concepto o banda
  // (PNG con fondo transparente; se pinta en dorado automáticamente).
  kicker: "Tributo a",
  title: "Héroes del Silencio",
  subtitle: "Rock en español · En vivo",
  eventLogo: "assets/heroes-del-silencio.png",

  // Artistas principales — los que se destacan en grande.
  // `photo` es opcional: coloca la imagen en flyers/assets/artistas/
  // (PNG recortado sin fondo o JPG vertical, mínimo 1200 px de alto).
  headliners: [
    { name: "Gox Valdivia", tag: "", photo: "" },
    { name: "Alex Boguslavsky", tag: "", photo: "" },
  ],
  // Separador entre headliners: "/", "B2B", "&", "×"
  headlinerSeparator: "/",

  // Artistas de apoyo / warm-up (puede quedar vacío: [])
  support: ["Invitado Especial", "Residente Drakkars"],

  // Fecha y horario
  dayName: "Miércoles",
  day: "14",
  month: "Octubre",
  year: "2026",
  doors: "9:00 PM",
  endTime: "",

  // Lugar
  venue: "Mesón Terraza León",
  venueTag: "Terraza Bar",
  address: "Dirección del recinto, Ciudad",

  // Accesos / boletos
  tickets: [
    { label: "Preventa", price: "$250" },
    { label: "Taquilla", price: "$350" },
    { label: "Mesa VIP", price: "$2,500" },
  ],
  ticketsCta: "Boletos sin cargos ocultos",
  ticketUrl: "https://www.drakkars.show",
  showQr: true,

  // Reservaciones
  reservations: "Reservaciones WhatsApp 000 000 0000",

  // Políticas / letra chica
  age: "+18",
  dressCode: "Dress code: elegante casual",
  capacity: "Aforo controlado",
  finePrint: "Se reserva el derecho de admisión. Prohibido el acceso con armas u objetos punzocortantes. Consumo responsable.",

  // Redes y web
  instagram: "@drakkarsproducciones",
  venueInstagram: "@mesonterrazaleon",
  website: "drakkars.show",
  hashtag: "#TributoHeroesDelSilencio",

  // Patrocinadores (texto; se muestran como fila al pie). Vacío = oculto.
  sponsors: [],
};
