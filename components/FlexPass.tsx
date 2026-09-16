"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    number: "01",
    title: "Únete al Flex Pass",
    description:
      "Elige tu plan y activa tu membresía en menos de 2 minutos. Sin letras chiquitas.",
  },
  {
    number: "02",
    title: "Accede antes que nadie",
    description:
      "Recibe notificaciones de preventa exclusiva y compra sin filas virtuales ni bots.",
  },
  {
    number: "03",
    title: "Vive la experiencia premium",
    description:
      "Disfruta zonas exclusivas, fast-track de acceso y beneficios en cada evento Drakkar.",
  },
];

const PLANS = [
  {
    name: "Fan",
    price: "$149",
    period: "/mes",
    highlight: false,
    features: [
      "Cero cargos por servicio",
      "Acceso anticipado a preventas",
      "Comunidad digital Drakkar",
      "Notificaciones prioritarias",
    ],
  },
  {
    name: "Flex Pass",
    price: "$349",
    period: "/mes",
    highlight: true,
    badge: "Más popular",
    features: [
      "Todo lo del plan Fan",
      "Boletos asegurados en cada evento",
      "Fast-track de acceso sin filas",
      "Zonas VIP en recintos aliados",
      "1 meet & greet al año incluido",
    ],
  },
  {
    name: "Icon",
    price: "$699",
    period: "/mes",
    highlight: false,
    features: [
      "Todo lo del Flex Pass",
      "Meet & greets ilimitados*",
      "Concierge de eventos personal",
      "Invitaciones a eventos privados",
    ],
  },
];

export default function FlexPass() {
  return (
    <section id="flex-pass" className="relative py-28">
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-neon-magenta/10 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">El Modelo Flex Pass</span>
          <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            Una membresía, <span className="text-gradient-gold">acceso ilimitado</span>{" "}
            a la magia
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Deja de competir contra bots y reventa. Con Flex Pass, tu lugar
            está garantizado desde antes de que el evento se anuncie al
            público general.
          </p>
        </motion.div>

        {/* Cómo funciona: 3 pasos */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="relative"
            >
              <div className="font-display text-6xl font-extrabold text-white/5">
                {step.number}
              </div>
              <h3 className="-mt-6 font-display text-xl font-bold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-white/60">{step.description}</p>
              {i < STEPS.length - 1 && (
                <div className="absolute right-[-1rem] top-6 hidden h-px w-8 bg-gradient-to-r from-gold/50 to-transparent md:block" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Tarjetas de precios */}
        <div className="mt-20 grid gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`relative flex flex-col rounded-2xl border p-8 ${
                plan.highlight
                  ? "border-gold/40 bg-gradient-to-b from-gold/10 to-transparent shadow-gold lg:scale-105"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gold-gradient px-4 py-1 text-xs font-bold text-obsidian">
                  {plan.badge}
                </span>
              )}

              <h3 className="font-display text-lg font-bold text-white/80">
                {plan.name}
              </h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="font-display text-4xl font-extrabold">
                  {plan.price}
                </span>
                <span className="text-white/50">{plan.period}</span>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-white/70">
                    <span className="mt-0.5 text-gold-bright">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/*
                PAGOS: conectar aquí con la pasarela de pagos (ej. Stripe, Conekta, Mercado Pago).
                Este botón debe iniciar el flujo de checkout/suscripción recurrente para el plan seleccionado.
              */}
              <button
                type="button"
                data-plan={plan.name}
                onClick={() => {
                  // TODO: integrar con API de backend -> POST /api/subscriptions { plan: plan.name }
                }}
                className={`mt-8 rounded-full px-6 py-3 text-sm font-bold transition-transform hover:scale-[1.02] active:scale-95 ${
                  plan.highlight
                    ? "bg-gold-gradient text-obsidian shadow-gold"
                    : "border border-white/20 bg-white/5 text-white hover:border-gold/50"
                }`}
              >
                Solicitar Acceso Anticipado
              </button>
            </motion.div>
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-white/30">
          *Sujeto a disponibilidad del artista y del recinto. Precios en MXN,
          IVA incluido. Cancela cuando quieras, sin penalizaciones.
        </p>
      </div>
    </section>
  );
}
