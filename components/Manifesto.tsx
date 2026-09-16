"use client";

import { motion } from "framer-motion";

const PILLARS = [
  {
    icon: "🛡️",
    title: "Cero cargos ocultos",
    problem: "Compras un boleto de $800 y pagas $1,200 al finalizar.",
    solution:
      "Precio final visible desde el primer clic. Transparencia total, alineada a los lineamientos de PROFECO. Lo que ves es lo que pagas.",
  },
  {
    icon: "🔒",
    title: "Seguridad total",
    problem: "Recintos saturados, salidas de emergencia bloqueadas, aforos sin control.",
    solution:
      "Ingeniería de aforo certificada y protocolos de Protección Civil de primer nivel en cada recinto aliado. Tu seguridad no es negociable.",
  },
  {
    icon: "⚡",
    title: "Experiencia sin fricciones",
    problem: "Plataformas que colapsan, filas virtuales interminables y reventa desmedida.",
    solution:
      "Tecnología cashless real, infraestructura que escala y accesos justos y verificados. Sin bots, sin caos, sin estrés.",
  },
];

export default function Manifesto() {
  return (
    <section id="manifiesto" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">Nuestro Manifiesto</span>
          <h2 className="mt-6 font-display text-4xl leading-snug sm:text-5xl">
            Estamos cansados de lo mismo.{" "}
            <span className="text-gradient-gold">Por eso, cambiamos las reglas.</span>
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Drakkar nace de la frustración del público mexicano ante un
            sistema que abusa de su confianza. Estos son nuestros tres
            pilares innegociables.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="glass-card group relative flex flex-col p-8 transition-colors hover:border-gold/30"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-gradient text-2xl shadow-gold">
                {pillar.icon}
              </div>

              <h3 className="mt-6 font-subheading text-xl font-bold">
                {pillar.title}
              </h3>

              <div className="mt-5 rounded-xl border border-red-500/20 bg-red-500/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-red-400/80">
                  El problema
                </p>
                <p className="mt-1 text-sm text-white/60">{pillar.problem}</p>
              </div>

              <div className="mt-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-300/80">
                  Nuestra solución
                </p>
                <p className="mt-1 text-sm text-white/80">{pillar.solution}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
