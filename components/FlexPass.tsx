import Reveal from "@/components/Reveal";

const STEPS = [
  { n: "01", title: "Únete al Flex Pass", text: "Elige tu plan y activa tu membresía en menos de 2 minutos. Sin letras chiquitas." },
  { n: "02", title: "Accede antes que nadie", text: "Preventas exclusivas y compra sin filas virtuales ni bots." },
  { n: "03", title: "Vive la experiencia", text: "Zonas exclusivas, acceso preferente y beneficios en cada evento Drakkars." },
];

const PLANS = [
  {
    name: "Fan",
    price: "$149",
    features: ["Cero cargos por servicio", "Acceso anticipado a preventas", "Comunidad digital Drakkars", "Notificaciones prioritarias"],
  },
  {
    name: "Flex Pass",
    price: "$349",
    highlight: true,
    features: [
      "Todo lo del plan Fan",
      "Boletos asegurados en cada evento",
      "Acceso preferente sin filas",
      "Zonas VIP en recintos aliados",
      "1 meet & greet al año incluido",
    ],
  },
  {
    name: "Icon",
    price: "$699",
    features: ["Todo lo del Flex Pass", "Meet & greets ilimitados*", "Concierge de eventos personal", "Invitaciones a eventos privados"],
  },
];

export default function FlexPass() {
  return (
    <section id="flex-pass" className="grain scroll-mt-20 overflow-hidden bg-wine-deep py-20 md:scroll-mt-24 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(60% 60% at 85% 10%, rgba(212,175,55,.18), transparent 70%), radial-gradient(70% 60% at 0% 100%, rgba(122,20,38,.7), transparent 70%)" }}
      />
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-end">
          <Reveal>
            <p className="eyebrow text-gold">Membresía</p>
            <h2 className="mt-3 font-display text-6xl leading-none md:text-8xl">Flex Pass</h2>
            <p className="mt-6 max-w-lg text-lg text-paper/70">
              Deja de competir contra bots y reventa. Con Flex Pass, tu lugar está garantizado desde antes de que el evento se
              anuncie al público general.
            </p>
          </Reveal>
          <ol className="grid gap-6 sm:grid-cols-3 lg:gap-8">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 0.06} className="border-t border-paper/20 pt-4">
                <span className="font-subheading text-sm font-bold text-gold">{s.n}</span>
                <h3 className="mt-2 font-subheading font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-paper/60">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>

        <ul className="mt-16 grid gap-px bg-paper/15 lg:grid-cols-3">
          {PLANS.map((p, i) => (
            <Reveal
              as="li"
              key={p.name}
              delay={i * 0.06}
              className={`relative flex flex-col p-8 lg:p-10 ${p.highlight ? "bg-paper text-ink" : "bg-wine-deep"}`}
            >
              {p.highlight && <span className="eyebrow absolute right-6 top-6 bg-gold px-2 py-1 text-ink">Más popular</span>}
              <h3 className="font-subheading text-sm font-bold uppercase tracking-[0.2em]">{p.name}</h3>
              <p className="mt-6 flex items-baseline gap-1">
                <span className="font-subheading text-5xl font-extrabold tracking-tight">{p.price}</span>
                <span className={p.highlight ? "text-ink/50" : "text-paper/50"}>/mes</span>
              </p>
              <ul className={`mt-8 flex-1 space-y-3 text-sm ${p.highlight ? "text-ink/75" : "text-paper/70"}`}>
                {p.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span aria-hidden className={p.highlight ? "text-wine" : "text-gold"}>
                      ✓
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
              {/*
                PAGOS: conectar con la pasarela (Stripe, Conekta, Mercado Pago).
                Debe iniciar el checkout/suscripción recurrente del plan.
              */}
              <button
                type="button"
                data-plan={p.name}
                className={`mt-10 ${p.highlight ? "btn bg-ink text-paper hover:bg-wine" : "btn-ghost-light"}`}
              >
                Solicitar acceso anticipado
              </button>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-xs text-paper/45">
          *Sujeto a disponibilidad del artista y del recinto. Precios en MXN, IVA incluido. Cancela cuando quieras, sin
          penalizaciones.
        </p>
      </div>
    </section>
  );
}
