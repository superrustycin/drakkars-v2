/*
  Cartelera y recintos.
  BACKEND: reemplazar estos arreglos por datos de tu API/CMS
  (ej. GET /api/events?status=upcoming). La forma de `DrakkarsEvent`
  es la que esperan todos los componentes.
*/

export type EventStatus = "onsale" | "presale" | "lowtickets" | "soldout" | "soon";
export type Accent = "gold" | "wine" | "violet" | "cyan";

export type Venue = {
  slug: string;
  name: string;
  kind: string; // "Terraza bar", "Foro", "Al aire libre"...
  city?: string;
  capacity?: number;
  logo?: string; // ruta en /public
  accent: Accent;
};

export type DrakkarsEvent = {
  slug: string;
  kicker?: string; // línea pequeña sobre el título ("Tributo a")
  title: string;
  headliners: string[];
  support?: string[];
  genre: string;
  /** Fecha y hora de apertura en ISO con zona horaria de México. */
  date: string;
  venue: string; // slug del recinto
  status: EventStatus;
  priceFrom?: number;
  /** Link de compra (Boletia). Vacío = la venta aún no abre. */
  ticketUrl?: string;
  /** Arte del evento (4:5). Sin arte se genera uno tipográfico. */
  poster?: string;
  accent: Accent;
  featured?: boolean;
  description: string;
  details?: string[];
};

export const VENUES: Venue[] = [
  {
    slug: "meson-terraza-leon",
    name: "Mesón Terraza León",
    kind: "Terraza bar",
    logo: "/brand/venues/meson-terraza-leon.png",
    accent: "wine",
  },
  { slug: "foro-indie-roma", name: "Foro Indie Roma", kind: "Recinto boutique", city: "CDMX", capacity: 1200, accent: "violet" },
  { slug: "hacienda-los-cedros", name: "Hacienda Los Cedros", kind: "Al aire libre", city: "Guadalajara", capacity: 2000, accent: "gold" },
  { slug: "almacen-12", name: "Almacén 12", kind: "Recinto industrial", city: "Monterrey", capacity: 800, accent: "cyan" },
];

export const EVENTS: DrakkarsEvent[] = [
  {
    slug: "tributo-heroes-del-silencio",
    kicker: "Tributo a",
    title: "Héroes del Silencio",
    headliners: ["Gox Valdivia"],
    genre: "Rock en español",
    date: "2026-11-14T21:00:00-06:00",
    venue: "meson-terraza-leon",
    status: "presale",
    priceFrom: 250,
    ticketUrl: "", // ← pega aquí el link del evento en Boletia
    poster: "/media/events/tributo-heroes-del-silencio.jpg",
    accent: "gold",
    featured: true,
    description:
      "Revive los himnos que marcaron al rock en español en una noche única bajo el cielo de la terraza del Mesón Terraza León. Un tributo con toda la fuerza, la mística y la intensidad de Héroes del Silencio, interpretado en vivo por Gox Valdivia.",
    details: [
      "Apertura de puertas: 9:00 PM",
      "Evento para mayores de 18 años",
      "Dress code: elegante casual",
      "Aforo controlado",
    ],
  },
  // Eventos de ejemplo del sitio anterior — reemplázalos por la cartelera real.
  {
    slug: "noche-bioluminiscente",
    title: "Noche Bioluminiscente",
    headliners: ["Tobías Kaan"],
    genre: "Electrónica",
    date: "2026-10-18T20:00:00-06:00",
    venue: "foro-indie-roma",
    status: "onsale",
    priceFrom: 450,
    accent: "violet",
    description: "Una noche inmersiva de electrónica en vivo en un recinto boutique de la Roma.",
  },
  {
    slug: "desierto-electrico",
    title: "Desierto Eléctrico",
    headliners: ["Vane Salinas"],
    support: ["Invitados"],
    genre: "Indie",
    date: "2026-11-02T19:00:00-06:00",
    venue: "hacienda-los-cedros",
    status: "lowtickets",
    priceFrom: 520,
    accent: "wine",
    featured: true,
    description: "Un atardecer al aire libre con Vane Salinas e invitados en Hacienda Los Cedros.",
  },
  {
    slug: "sesiones-de-medianoche",
    title: "Sesiones de Medianoche",
    headliners: ["Colectivo Aurora"],
    genre: "Alternativo",
    date: "2026-11-21T22:00:00-06:00",
    venue: "almacen-12",
    status: "soon",
    accent: "cyan",
    description: "Sesiones nocturnas en un almacén industrial de Monterrey con Colectivo Aurora.",
  },
];

export const STATUS_LABEL: Record<EventStatus, string> = {
  onsale: "A la venta",
  presale: "Preventa",
  lowtickets: "Últimos boletos",
  soldout: "Agotado",
  soon: "Próximamente",
};

const TZ = "America/Mexico_City";

export function getVenue(slug: string): Venue | undefined {
  return VENUES.find((v) => v.slug === slug);
}

export function getEvent(slug: string): DrakkarsEvent | undefined {
  return EVENTS.find((e) => e.slug === slug);
}

export function upcomingEvents(): DrakkarsEvent[] {
  return [...EVENTS].sort((a, b) => a.date.localeCompare(b.date));
}

/** Destacados en el orden en que aparecen en EVENTS (el primero abre el hero). */
export function featuredEvents(): DrakkarsEvent[] {
  return EVENTS.filter((e) => e.featured);
}

export function eventName(e: DrakkarsEvent): string {
  return [e.kicker, e.title].filter(Boolean).join(" ");
}

/** Partes de fecha ya formateadas en español y en hora de México. */
export function dateParts(iso: string) {
  const d = new Date(iso);
  const part = (opts: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat("es-MX", { timeZone: TZ, ...opts }).format(d);
  const clean = (s: string) => s.replace(".", "");
  return {
    weekday: clean(part({ weekday: "short" })).toUpperCase(),
    weekdayLong: part({ weekday: "long" }),
    day: part({ day: "2-digit" }),
    month: clean(part({ month: "short" })).toUpperCase(),
    monthLong: part({ month: "long" }),
    year: part({ year: "numeric" }),
    time: part({ hour: "numeric", minute: "2-digit", hour12: true })
      .replace(/\s?a\.?\s?m\.?/i, " AM")
      .replace(/\s?p\.?\s?m\.?/i, " PM"),
  };
}

export function formatPrice(n?: number) {
  return n == null ? undefined : `$${n.toLocaleString("es-MX")}`;
}
