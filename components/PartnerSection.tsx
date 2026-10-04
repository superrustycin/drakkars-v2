import Reveal from "@/components/Reveal";
import { SITE } from "@/lib/site";

const AUDIENCES = [
  {
    title: "Artistas y bandas",
    text: "Producimos tu show de principio a fin: recinto, audio, promoción y venta de boletos con precio justo.",
    subject: "Quiero presentarme con Drakkars",
  },
  {
    title: "Recintos",
    text: "Sumamos tu espacio a la red Drakkars con eventos curados, aforo controlado y operación profesional.",
    subject: "Quiero ser recinto aliado",
  },
  {
    title: "Marcas y patrocinios",
    text: "Conecta con audiencias reales en noches en vivo con experiencias de marca cuidadas.",
    subject: "Patrocinios Drakkars",
  },
];

export default function PartnerSection() {
  return (
    <section id="contacto" className="scroll-mt-20 bg-ink py-20 md:scroll-mt-24 md:py-28">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-gold">Trabaja con nosotros</p>
          <h2 className="mt-3 font-display text-5xl leading-[1.02] md:text-6xl">Produzcamos la siguiente gran noche</h2>
        </Reveal>
        <ul className="mt-12 grid gap-px bg-paper/10 md:grid-cols-3">
          {AUDIENCES.map((a, i) => (
            <Reveal as="li" key={a.title} delay={i * 0.06} className="bg-ink">
              <a
                href={`mailto:${SITE.email}?subject=${encodeURIComponent(a.subject)}`}
                className="group flex h-full flex-col p-8 transition-colors duration-200 hover:bg-ink-soft"
              >
                <h3 className="font-subheading text-xl font-bold">{a.title}</h3>
                <p className="mt-3 flex-1 text-paper/60">{a.text}</p>
                <span className="mt-8 font-subheading text-xs font-bold uppercase tracking-[0.16em] text-gold group-hover:text-gold-bright">
                  Escríbenos →
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
