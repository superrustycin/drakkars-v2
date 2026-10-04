"use client";

import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import PosterArt from "@/components/PosterArt";
import { dateParts, formatPrice, getVenue, STATUS_LABEL, type DrakkarsEvent } from "@/lib/events";

const INTERVAL = 7000;
const EASE = [0.23, 1, 0.32, 1] as const;

/*
  Hero con eventos destacados: póster 4:5 + datos clave + compra.
  Rota solo cuando hay más de uno, se pausa con el cursor encima,
  con la pestaña oculta y con "reducir movimiento".
*/
export default function FeaturedHero({ events }: { events: DrakkarsEvent[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = events.length;
  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (count < 2 || paused || reduce) return;
    const id = window.setTimeout(() => {
      if (document.visibilityState === "visible") go(index + 1);
    }, INTERVAL);
    return () => window.clearTimeout(id);
  }, [index, paused, reduce, count, go]);

  if (!count) return null;
  const event = events[index];
  const venue = getVenue(event.venue);
  const d = dateParts(event.date);
  const price = formatPrice(event.priceFrom);

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Eventos destacados"
      className="relative overflow-hidden bg-ink pt-16 md:pt-[7.25rem]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Ambiente: el póster desenfocado detrás de todo */}
      <AnimatePresence initial={false}>
        <motion.div
          key={event.slug + "-bg"}
          aria-hidden
          className="absolute inset-0 -z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {event.poster ? (
            <Image src={event.poster} alt="" fill sizes="100vw" className="scale-110 object-cover opacity-30 blur-2xl" />
          ) : (
            <div className="absolute inset-0 opacity-60" style={{ background: "radial-gradient(60% 60% at 70% 40%, rgba(122,20,38,.55), transparent 70%)" }} />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="container-x relative grid items-center gap-10 pb-14 pt-10 md:grid-cols-[1.15fr_0.85fr] md:gap-16 md:pb-20 md:pt-16 lg:gap-24">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={event.slug}
            initial={{ opacity: 0, transform: reduce ? "none" : "translateY(12px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.45, ease: EASE }}
            className="order-2 md:order-1"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow rounded-sm bg-gold px-2.5 py-1.5 text-ink">{STATUS_LABEL[event.status]}</span>
              <span className="eyebrow text-paper/60">{event.genre}</span>
            </div>

            {event.kicker && (
              <p className="mt-8 font-subheading text-sm font-semibold uppercase tracking-[0.4em] text-paper/70">
                {event.kicker}
              </p>
            )}
            <h1 className="mt-3 font-display text-[clamp(2.75rem,7vw,6.5rem)] leading-[0.95] text-gradient-gold">
              {event.title}
            </h1>
            <p className="mt-5 font-subheading text-xl font-bold uppercase tracking-[0.08em] text-paper md:text-2xl">
              {event.headliners.join(" / ")}
              {event.support?.length ? (
                <span className="font-semibold normal-case tracking-normal text-paper/60"> con {event.support.join(", ")}</span>
              ) : null}
            </p>

            <dl className="mt-10 grid max-w-xl grid-cols-3 border-y border-paper/15">
              <div className="py-4 pr-4">
                <dt className="eyebrow text-paper/50">Fecha</dt>
                <dd className="mt-2 font-subheading text-base font-bold md:text-lg">
                  {d.weekday} {d.day} {d.month}
                </dd>
              </div>
              <div className="border-l border-paper/15 py-4 pl-4 pr-4">
                <dt className="eyebrow text-paper/50">Puertas</dt>
                <dd className="mt-2 font-subheading text-base font-bold md:text-lg">{d.time}</dd>
              </div>
              <div className="border-l border-paper/15 py-4 pl-4">
                <dt className="eyebrow text-paper/50">Recinto</dt>
                <dd className="mt-2 font-subheading text-base font-bold leading-snug md:text-lg">{venue?.name}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              {event.ticketUrl ? (
                <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className="btn-gold">
                  Comprar boletos{price ? ` · desde ${price}` : ""}
                </a>
              ) : (
                <Link href={`/eventos/${event.slug}`} className="btn-gold">
                  {price ? `Boletos desde ${price}` : "Ver boletos"}
                </Link>
              )}
              <Link href={`/eventos/${event.slug}`} className="btn-ghost-light">
                Más información
              </Link>
            </div>
            <p className="mt-4 text-xs text-paper/50">Precio final, sin cargos ocultos.</p>
          </motion.div>
        </AnimatePresence>

        <div className="order-1 mx-auto w-full max-w-[22rem] md:order-2 md:max-w-none">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={event.slug + "-poster"}
              initial={{ opacity: 0, transform: reduce ? "none" : "scale(0.97)" }}
              animate={{ opacity: 1, transform: "scale(1)" }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <Link href={`/eventos/${event.slug}`} className="block shadow-[0_40px_80px_-30px_rgba(0,0,0,0.9)] ring-1 ring-paper/10">
                <PosterArt event={event} sizes="(min-width: 768px) 40vw, 22rem" priority={index === 0} />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {count > 1 && (
        <div className="container-x relative flex items-center gap-4 pb-10">
          <div className="flex flex-1 gap-2">
            {events.map((e, i) => (
              <button
                key={e.slug}
                type="button"
                onClick={() => go(i)}
                aria-label={`Ver ${e.title}`}
                aria-current={i === index}
                className="group relative h-8 flex-1"
              >
                <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 overflow-hidden bg-paper/20">
                  {i === index && (
                    <span
                      key={`${index}-${paused}`}
                      className="absolute inset-y-0 left-0 w-full origin-left bg-gold"
                      style={{
                        animation: paused || reduce ? "none" : `hero-progress ${INTERVAL}ms linear forwards`,
                        transform: paused || reduce ? "scaleX(1)" : undefined,
                      }}
                    />
                  )}
                </span>
                <span className="eyebrow absolute left-0 top-full mt-1 hidden truncate text-left text-paper/50 group-aria-[current=true]:text-paper sm:block">
                  {String(i + 1).padStart(2, "0")} · {e.headliners[0]}
                </span>
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => go(index - 1)} aria-label="Anterior" className="btn-ghost-light h-10 w-10 !px-0">
              ←
            </button>
            <button type="button" onClick={() => go(index + 1)} aria-label="Siguiente" className="btn-ghost-light h-10 w-10 !px-0">
              →
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes hero-progress { from { transform: scaleX(0) } to { transform: scaleX(1) } }`}</style>
    </section>
  );
}
