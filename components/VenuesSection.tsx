import Image from "next/image";
import Reveal from "@/components/Reveal";
import type { Accent, DrakkarsEvent, Venue } from "@/lib/events";

const ACCENT_BG: Record<Accent, string> = {
  gold: "radial-gradient(80% 80% at 30% 20%, #4a3a10 0%, #141217 70%)",
  wine: "radial-gradient(80% 80% at 30% 20%, #5a0f1c 0%, #141217 70%)",
  violet: "radial-gradient(80% 80% at 30% 20%, #2f1d5c 0%, #141217 70%)",
  cyan: "radial-gradient(80% 80% at 30% 20%, #0f3f3d 0%, #141217 70%)",
};

export default function VenuesSection({ venues, events }: { venues: Venue[]; events: DrakkarsEvent[] }) {
  return (
    <section id="recintos" className="scroll-mt-20 bg-ink py-20 md:scroll-mt-24 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 border-b border-paper/15 pb-8 md:grid-cols-2 md:items-end">
          <div>
            <p className="eyebrow text-gold">Recintos aliados</p>
            <h2 className="mt-3 font-display text-5xl leading-none md:text-7xl">Dónde sucede</h2>
          </div>
          <p className="max-w-lg text-paper/65 md:justify-self-end">
            Espacios íntimos, seguros y con aforo controlado. Nada de estadios saturados: recintos donde se escucha, se ve y
            se vive mejor la música.
          </p>
        </div>

        <ul className="mt-10 grid gap-px overflow-hidden bg-paper/10 sm:grid-cols-2 lg:grid-cols-4">
          {venues.map((v, i) => {
            const count = events.filter((e) => e.venue === v.slug).length;
            return (
              <Reveal as="li" key={v.slug} delay={i * 0.06} className="bg-ink">
                <a href={`/?recinto=${v.slug}#eventos`} className="group flex h-full flex-col">
                  <div className="relative aspect-[16/9] overflow-hidden sm:aspect-[4/3]" style={{ background: ACCENT_BG[v.accent] }}>
                    {v.logo ? (
                      <Image
                        src={v.logo}
                        alt={v.name}
                        fill
                        sizes="(min-width: 1024px) 20vw, (min-width: 640px) 45vw, 90vw"
                        className="object-contain p-10 transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-end p-6">
                        <span className="font-display text-4xl leading-none text-paper/90 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                          {v.name}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="eyebrow text-paper/50">
                      {v.kind}
                      {v.city ? ` · ${v.city}` : ""}
                    </p>
                    <h3 className="mt-2 font-subheading text-lg font-bold">{v.name}</h3>
                    {v.capacity ? <p className="mt-1 text-sm text-paper/55">Aforo controlado · {v.capacity.toLocaleString("es-MX")} personas</p> : null}
                    <span className="mt-auto pt-6 font-subheading text-xs font-bold uppercase tracking-[0.16em] text-gold transition-colors group-hover:text-gold-bright">
                      {count ? `${count} ${count === 1 ? "evento" : "eventos"} →` : "Ver recinto →"}
                    </span>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
