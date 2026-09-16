"use client";

import { motion } from "framer-motion";

/*
  BACKEND: reemplazar este arreglo estático por datos obtenidos de tu API/CMS,
  ej. GET /api/events?status=upcoming. Cada evento debe incluir disponibilidad
  en tiempo real para reflejar aforo controlado.
*/
const EVENTS = [
  {
    id: "evt-01",
    date: "18 OCT",
    name: "Noche Bioluminiscente",
    artist: "Tobías Kaan en vivo",
    venue: "Foro Indie Roma — CDMX",
    capacity: "Aforo controlado · 1,200 personas",
    tag: "Recinto boutique",
    gradient: "from-neon-violet/40 to-obsidian",
  },
  {
    id: "evt-02",
    date: "02 NOV",
    name: "Desierto Eléctrico",
    artist: "Vane Salinas + invitados",
    venue: "Hacienda Los Cedros — Guadalajara",
    capacity: "Aforo controlado · 2,000 personas",
    tag: "Recinto al aire libre",
    gradient: "from-gold/30 to-obsidian",
  },
  {
    id: "evt-03",
    date: "21 NOV",
    name: "Sesiones de Medianoche",
    artist: "Colectivo Aurora",
    venue: "Almacén 12 — Monterrey",
    capacity: "Aforo controlado · 800 personas",
    tag: "Recinto industrial",
    gradient: "from-neon-cyan/30 to-obsidian",
  },
];

export default function EventsLineup() {
  return (
    <section id="cartelera" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end"
        >
          <div className="max-w-xl">
            <span className="section-eyebrow">Cartelera</span>
            <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
              Próximos <span className="text-gradient-gold">eventos</span>
            </h2>
            <p className="mt-4 text-lg text-white/60">
              Recintos alternativos, seguros y con aforo controlado. Nada de
              estadios masivos saturados: experiencias íntimas y memorables.
            </p>
          </div>
          <a
            href="#flex-pass"
            className="hidden shrink-0 rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-gold/50 hover:bg-white/10 sm:inline-block"
          >
            Ver toda la cartelera
          </a>
        </motion.div>

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {EVENTS.map((event, i) => (
            <motion.article
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <div
                className={`relative flex h-56 flex-col justify-between bg-gradient-to-br ${event.gradient} p-6`}
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-obsidian/60 px-3 py-1 text-xs font-bold uppercase tracking-wide backdrop-blur-sm">
                    {event.date}
                  </span>
                  <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-medium text-white/80 backdrop-blur-sm">
                    {event.tag}
                  </span>
                </div>
                <div className="translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="h-1 w-12 rounded-full bg-gold-gradient" />
                </div>
              </div>

              <div className="glass-card -mt-4 relative rounded-t-2xl p-6">
                <h3 className="font-display text-xl font-bold">{event.name}</h3>
                <p className="mt-1 text-sm text-white/60">{event.artist}</p>

                <div className="mt-4 space-y-1.5 border-t border-white/10 pt-4 text-sm text-white/50">
                  <p className="flex items-center gap-2">📍 {event.venue}</p>
                  <p className="flex items-center gap-2">🛡️ {event.capacity}</p>
                </div>

                {/*
                  BACKEND: enlazar a la página de detalle/checkout del evento,
                  ej. /eventos/[id], y validar ahí membresía Flex Pass para
                  otorgar acceso anticipado / precio preferente.
                */}
                <button
                  type="button"
                  className="mt-6 w-full rounded-full border border-white/20 bg-white/5 py-3 text-sm font-semibold transition-colors hover:border-gold/50 hover:bg-gold/10"
                >
                  Ver detalles
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        <a
          href="#flex-pass"
          className="mt-10 block text-center text-sm font-semibold text-gold-bright underline-offset-4 hover:underline sm:hidden"
        >
          Ver toda la cartelera →
        </a>
      </div>
    </section>
  );
}
