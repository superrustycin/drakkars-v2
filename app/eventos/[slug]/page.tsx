import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Newsletter from "@/components/Newsletter";
import PosterArt from "@/components/PosterArt";
import {
  dateParts,
  EVENTS,
  eventName,
  formatPrice,
  getEvent,
  getVenue,
  STATUS_LABEL,
  upcomingEvents,
} from "@/lib/events";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const e = getEvent(params.slug);
  if (!e) return {};
  const v = getVenue(e.venue);
  const d = dateParts(e.date);
  const title = `${eventName(e)} · ${e.headliners.join(", ")}`;
  const description = `${d.weekdayLong} ${d.day} de ${d.monthLong}, ${d.time} en ${v?.name}. ${e.description}`;
  return {
    title: `${title} | ${SITE.name}`,
    description,
    alternates: { canonical: `/eventos/${e.slug}` },
    openGraph: { title, description, images: e.poster ? [{ url: e.poster }] : undefined, type: "website" },
  };
}

export default function EventPage({ params }: { params: { slug: string } }) {
  const e = getEvent(params.slug);
  if (!e) notFound();
  const v = getVenue(e.venue);
  const d = dateParts(e.date);
  const price = formatPrice(e.priceFrom);
  const more = upcomingEvents().filter((x) => x.slug !== e.slug).slice(0, 3);

  // Datos estructurados para que Google muestre el evento en resultados.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MusicEvent",
    name: `${eventName(e)} — ${e.headliners.join(", ")}`,
    startDate: e.date,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: { "@type": "Place", name: v?.name, address: v?.city ?? v?.name },
    performer: e.headliners.map((name) => ({ "@type": "MusicGroup", name })),
    organizer: { "@type": "Organization", name: SITE.name, url: SITE.url },
    image: e.poster ? [`${SITE.url}${e.poster}`] : undefined,
    description: e.description,
    offers: e.priceFrom
      ? { "@type": "Offer", price: e.priceFrom, priceCurrency: "MXN", url: e.ticketUrl || `${SITE.url}/eventos/${e.slug}` }
      : undefined,
  };

  return (
    <>
      <Navbar />
      <main className="bg-ink pt-16 md:pt-[7.25rem]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        <div className="container-x pt-8">
          <Link href="/#eventos" className="eyebrow text-paper/60 hover:text-paper">
            ← Todos los eventos
          </Link>
        </div>

        <section className="container-x grid gap-10 pb-20 pt-8 md:grid-cols-[0.85fr_1.15fr] md:gap-16 lg:gap-24">
          <div className="mx-auto w-full max-w-md md:sticky md:top-32 md:max-w-none md:self-start">
            <PosterArt event={e} sizes="(min-width: 768px) 40vw, 90vw" priority className="ring-1 ring-paper/10" />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow rounded-sm bg-gold px-2.5 py-1.5 text-ink">{STATUS_LABEL[e.status]}</span>
              <span className="eyebrow text-paper/60">{e.genre}</span>
            </div>
            {e.kicker && (
              <p className="mt-8 font-subheading text-sm font-semibold uppercase tracking-[0.4em] text-paper/70">{e.kicker}</p>
            )}
            <h1 className="mt-3 font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] text-gradient-gold">{e.title}</h1>
            <p className="mt-5 font-subheading text-xl font-bold uppercase tracking-[0.08em] md:text-2xl">
              {e.headliners.join(" / ")}
            </p>
            {e.support?.length ? <p className="mt-1 text-paper/60">con {e.support.join(", ")}</p> : null}

            {/* Bloque de compra */}
            <div className="mt-10 border border-paper/15">
              <dl className="grid sm:grid-cols-3">
                <div className="border-b border-paper/15 p-5 sm:border-b-0 sm:border-r">
                  <dt className="eyebrow text-paper/50">Fecha</dt>
                  <dd className="mt-2 font-subheading font-bold">
                    {d.weekdayLong.charAt(0).toUpperCase() + d.weekdayLong.slice(1)} {d.day} de {d.monthLong}
                  </dd>
                </div>
                <div className="border-b border-paper/15 p-5 sm:border-b-0 sm:border-r">
                  <dt className="eyebrow text-paper/50">Puertas</dt>
                  <dd className="mt-2 font-subheading font-bold">{d.time}</dd>
                </div>
                <div className="p-5">
                  <dt className="eyebrow text-paper/50">Recinto</dt>
                  <dd className="mt-2 font-subheading font-bold">
                    {v?.name}
                    {v?.city ? <span className="block text-sm font-normal text-paper/60">{v.city}</span> : null}
                  </dd>
                </div>
              </dl>
              <div className="flex flex-col gap-4 border-t border-paper/15 bg-ink-soft p-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {price && (
                    <p className="font-subheading text-2xl font-extrabold">
                      Desde {price} <span className="text-sm font-semibold text-paper/50">MXN</span>
                    </p>
                  )}
                  <p className="text-sm text-paper/55">Precio final, sin cargos ocultos.</p>
                </div>
                {e.status === "soldout" ? (
                  <span className="btn-ghost-light pointer-events-none opacity-50">Agotado</span>
                ) : e.ticketUrl ? (
                  <a href={e.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                    Comprar boletos
                  </a>
                ) : (
                  <a href="#avisame" className="btn-gold">
                    Venta muy pronto · Avísame
                  </a>
                )}
              </div>
            </div>

            <div className="mt-12 space-y-4 text-lg leading-relaxed text-paper/75">
              <p>{e.description}</p>
            </div>

            {e.details?.length ? (
              <ul className="mt-10 grid gap-px bg-paper/10 sm:grid-cols-2">
                {e.details.map((x) => (
                  <li key={x} className="bg-ink p-4 text-sm text-paper/75">
                    {x}
                  </li>
                ))}
              </ul>
            ) : null}

            <p className="mt-10 text-xs text-paper/45">
              Se reserva el derecho de admisión. Prohibido el acceso con armas u objetos punzocortantes. Consumo responsable.
            </p>
          </div>
        </section>

        {more.length > 0 && (
          <section className="bg-paper py-16 text-ink md:py-20">
            <div className="container-x">
              <div className="flex items-end justify-between border-b border-ink/15 pb-6">
                <h2 className="font-display text-4xl md:text-5xl">Más eventos</h2>
                <Link href="/#eventos" className="eyebrow text-ink/60 hover:text-ink">
                  Ver cartelera →
                </Link>
              </div>
              <ul className="mt-8 grid gap-8 sm:grid-cols-3">
                {more.map((x) => {
                  const xd = dateParts(x.date);
                  return (
                    <li key={x.slug} className="group">
                      <Link href={`/eventos/${x.slug}`}>
                        <div className="overflow-hidden">
                          <PosterArt event={x} sizes="(min-width: 640px) 30vw, 90vw" className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                        </div>
                        <p className="eyebrow mt-4 text-wine">
                          {xd.weekday} {xd.day} {xd.month}
                        </p>
                        <h3 className="mt-1 font-subheading text-lg font-extrabold uppercase group-hover:underline">
                          {x.headliners.join(" / ")}
                        </h3>
                        <p className="text-sm text-ink/65">{eventName(x)}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        )}
        <div id="avisame">
          <Newsletter />
        </div>
      </main>
      <Footer />
    </>
  );
}
