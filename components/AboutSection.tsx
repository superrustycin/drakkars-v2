import Reveal from "@/components/Reveal";

const PILLARS = [
  {
    n: "01",
    title: "Cero cargos ocultos",
    problem: "Compras un boleto de $800 y pagas $1,200 al finalizar.",
    solution:
      "Precio final visible desde el primer clic, alineado a los lineamientos de PROFECO. Lo que ves es lo que pagas.",
  },
  {
    n: "02",
    title: "Seguridad total",
    problem: "Recintos saturados, salidas bloqueadas y aforos sin control.",
    solution:
      "Aforo controlado y protocolos de Protección Civil en cada recinto aliado. Tu seguridad no es negociable.",
  },
  {
    n: "03",
    title: "Experiencia sin fricciones",
    problem: "Plataformas que colapsan, filas virtuales interminables y reventa desmedida.",
    solution: "Accesos con QR verificados, compra ágil y boletos justos. Sin bots, sin caos, sin estrés.",
  },
];

const SERVICES = [
  { title: "Producción de conciertos", text: "Del booking al último acorde: logística, audio, iluminación y operación en recinto." },
  { title: "Boletaje transparente", text: "Venta con precio final, accesos con QR y atención real antes, durante y después." },
  { title: "Experiencias y membresía", text: "Flex Pass: preventas, accesos preferentes y beneficios en cada noche Drakkars." },
];

export default function AboutSection() {
  return (
    <section id="nosotros" className="scroll-mt-20 bg-paper py-20 text-ink md:scroll-mt-24 md:py-28">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-wine">Nosotros</p>
            <h2 className="mt-3 font-display text-5xl leading-[1.02] md:text-6xl">
              Estamos cansados de lo mismo. Por eso, cambiamos las reglas.
            </h2>
          </Reveal>
          <Reveal delay={0.08} className="space-y-5 text-lg text-ink/75 lg:pt-10">
            <p>
              Drakkars Producciones nace de la frustración del público mexicano ante un sistema que abusa de su confianza:
              cargos sorpresa, plataformas que colapsan y recintos saturados.
            </p>
            <p>
              Producimos noches en vivo en recintos íntimos y seguros, con boletos justos y una experiencia cuidada de
              principio a fin.
            </p>
          </Reveal>
        </div>

        {/* Qué hacemos */}
        <ul className="mt-16 grid border-t border-ink/15 md:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="border-b border-ink/15 py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0">
              <h3 className="font-subheading text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-ink/65">{s.text}</p>
            </Reveal>
          ))}
        </ul>

        {/* Pilares */}
        <div className="mt-16 bg-ink p-6 text-paper sm:p-10 md:mt-24 lg:p-14">
          <p className="eyebrow text-gold">Nuestros pilares innegociables</p>
          <ol className="mt-8 grid gap-10 md:grid-cols-3 md:gap-8">
            {PILLARS.map((p, i) => (
              <Reveal as="li" key={p.n} delay={i * 0.08}>
                <span className="font-subheading text-5xl font-extrabold text-gold/80">{p.n}</span>
                <h3 className="mt-4 font-subheading text-xl font-bold">{p.title}</h3>
                <p className="mt-4 text-sm text-paper/45 line-through decoration-wine/70">{p.problem}</p>
                <p className="mt-2 text-paper/80">{p.solution}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
