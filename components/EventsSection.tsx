"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import PosterArt from "@/components/PosterArt";
import {
  dateParts,
  eventName,
  formatPrice,
  getVenue,
  STATUS_LABEL,
  VENUES,
  type DrakkarsEvent,
} from "@/lib/events";

type View = "lista" | "cuadricula";

const STATUS_STYLE: Record<DrakkarsEvent["status"], string> = {
  onsale: "border-ink/20 text-ink/70",
  presale: "border-gold bg-gold/15 text-[#6b5417]",
  lowtickets: "border-wine/40 bg-wine/10 text-wine",
  soldout: "border-ink/20 text-ink/40 line-through",
  soon: "border-ink/20 text-ink/50",
};

function TicketButton({ event, compact }: { event: DrakkarsEvent; compact?: boolean }) {
  const cls = `btn-ghost-dark ${compact ? "!px-4 !py-2.5" : ""}`;
  if (event.status === "soldout") {
    return (
      <span className={`${cls} pointer-events-none opacity-40`} aria-disabled>
        Agotado
      </span>
    );
  }
  if (event.ticketUrl) {
    return (
      <a href={event.ticketUrl} target="_blank" rel="noopener noreferrer" className={`btn bg-ink text-paper hover:bg-wine ${compact ? "!px-4 !py-2.5" : ""}`}>
        Boletos
      </a>
    );
  }
  return (
    <Link href={`/eventos/${event.slug}`} className={cls}>
      {event.status === "soon" ? "Avísame" : "Boletos"}
    </Link>
  );
}

export default function EventsSection({ events }: { events: DrakkarsEvent[] }) {
  const [venue, setVenue] = useState<string>("todos");
  const [query, setQuery] = useState("");
  const [view, setView] = useState<View>("lista");

  // Los recintos enlazan a /?recinto=slug#eventos para llegar ya filtrados.
  // Se lee en el cliente para que la cartelera completa salga en el HTML estático (SEO).
  useEffect(() => {
    const r = new URLSearchParams(window.location.search).get("recinto");
    if (r && VENUES.some((v) => v.slug === r)) setVenue(r);
  }, []);

  const venuesWithEvents = useMemo(() => VENUES.filter((v) => events.some((e) => e.venue === v.slug)), [events]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (venue !== "todos" && e.venue !== venue) return false;
      if (!q) return true;
      const hay = [eventName(e), ...e.headliners, ...(e.support ?? []), e.genre, getVenue(e.venue)?.name, getVenue(e.venue)?.city]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [events, venue, query]);

  return (
    <section id="eventos" className="scroll-mt-20 bg-paper py-20 text-ink md:scroll-mt-24 md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-8 border-b border-ink/15 pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow text-wine">Cartelera</p>
            <h2 className="mt-3 font-display text-5xl leading-none md:text-7xl">Próximos eventos</h2>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <label className="relative block">
              <span className="sr-only">Buscar artista, evento o recinto</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Buscar artista o evento"
                className="h-11 w-full rounded-sm border border-ink/20 bg-transparent pl-10 pr-3 text-base text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none sm:w-64 sm:text-sm"
              />
              <svg aria-hidden viewBox="0 0 20 20" className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50">
                <circle cx="8.5" cy="8.5" r="5.5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                <path d="M13 13l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </label>
            <div className="flex rounded-sm border border-ink/20 p-1" role="group" aria-label="Vista">
              {(["lista", "cuadricula"] as View[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-pressed={view === v}
                  className={`h-9 flex-1 rounded-[2px] px-4 font-subheading text-[11px] font-bold uppercase tracking-[0.16em] transition-colors duration-150 ${
                    view === v ? "bg-ink text-paper" : "text-ink/60 hover:text-ink"
                  }`}
                >
                  {v === "lista" ? "Lista" : "Cuadrícula"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filtro por recinto */}
        <div className="-mx-5 mt-6 overflow-x-auto px-5 sm:mx-0 sm:px-0">
          <div className="flex w-max gap-2" role="group" aria-label="Filtrar por recinto">
            {[{ slug: "todos", name: "Todos los recintos" }, ...venuesWithEvents].map((v) => (
              <button
                key={v.slug}
                type="button"
                onClick={() => setVenue(v.slug)}
                aria-pressed={venue === v.slug}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 active:scale-[0.97] ${
                  venue === v.slug ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink/70 hover:border-ink hover:text-ink"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-ink/60" aria-live="polite">
          {filtered.length === 1 ? "1 evento" : `${filtered.length} eventos`}
        </p>

        {filtered.length === 0 ? (
          <div className="mt-6 border border-dashed border-ink/25 px-6 py-16 text-center">
            <p className="font-display text-3xl">Sin eventos por ahora</p>
            <p className="mt-2 text-ink/60">Prueba con otro recinto o búsqueda, o suscríbete para enterarte primero.</p>
            <button
              type="button"
              onClick={() => {
                setVenue("todos");
                setQuery("");
              }}
              className="btn-ghost-dark mt-6"
            >
              Ver todos los eventos
            </button>
          </div>
        ) : view === "lista" ? (
          <ul className="mt-4 divide-y divide-ink/15 border-t border-ink/15">
            {filtered.map((e) => {
              const d = dateParts(e.date);
              const v = getVenue(e.venue);
              const price = formatPrice(e.priceFrom);
              return (
                <li key={e.slug} className="group grid grid-cols-[4.5rem_1fr] items-center gap-x-4 gap-y-4 py-6 sm:grid-cols-[5.5rem_6rem_1fr_auto] sm:gap-x-8">
                  <div className="text-center">
                    <p className="eyebrow text-ink/60">{d.weekday}</p>
                    <p className="font-subheading text-4xl font-extrabold leading-none tracking-tight">{d.day}</p>
                    <p className="eyebrow mt-1 text-wine">{d.month}</p>
                  </div>

                  <Link href={`/eventos/${e.slug}`} className="hidden overflow-hidden sm:block" tabIndex={-1} aria-hidden>
                    <PosterArt event={e} sizes="6rem" className="transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                  </Link>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded-sm border px-2 py-0.5 font-subheading text-[10px] font-bold uppercase tracking-[0.16em] ${STATUS_STYLE[e.status]}`}>
                        {STATUS_LABEL[e.status]}
                      </span>
                      <span className="eyebrow text-ink/50">{e.genre}</span>
                    </div>
                    <Link href={`/eventos/${e.slug}`} className="mt-2 block">
                      <h3 className="font-subheading text-xl font-extrabold uppercase leading-tight tracking-tight decoration-2 underline-offset-4 group-hover:underline md:text-2xl">
                        {e.headliners.join(" / ")}
                      </h3>
                      <p className="mt-1 text-ink/70">
                        {eventName(e)}
                        {e.support?.length ? ` · con ${e.support.join(", ")}` : ""}
                      </p>
                    </Link>
                    <p className="mt-2 text-sm text-ink/60">
                      {v?.name}
                      {v?.city ? `, ${v.city}` : ""} · {d.time}
                      {price ? ` · desde ${price}` : ""}
                    </p>
                  </div>

                  <div className="col-span-2 flex gap-2 sm:col-span-1 sm:justify-end">
                    <TicketButton event={e} compact />
                    <Link href={`/eventos/${e.slug}`} className="btn !px-4 !py-2.5 text-ink/70 hover:text-ink">
                      Info
                    </Link>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="mt-4 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {filtered.map((e) => {
              const d = dateParts(e.date);
              const v = getVenue(e.venue);
              return (
                <li key={e.slug} className="group flex flex-col">
                  <Link href={`/eventos/${e.slug}`} className="relative block overflow-hidden">
                    <PosterArt event={e} sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                    <span className="absolute left-3 top-3 bg-paper px-2.5 py-1.5 text-center text-ink">
                      <span className="block font-subheading text-xl font-extrabold leading-none">{d.day}</span>
                      <span className="eyebrow block !tracking-[0.18em] text-wine">{d.month}</span>
                    </span>
                  </Link>
                  <p className="eyebrow mt-4 text-ink/50">
                    {d.weekday} · {d.time} · {STATUS_LABEL[e.status]}
                  </p>
                  <Link href={`/eventos/${e.slug}`}>
                    <h3 className="mt-2 font-subheading text-lg font-extrabold uppercase leading-tight group-hover:underline">
                      {e.headliners.join(" / ")}
                    </h3>
                  </Link>
                  <p className="text-sm text-ink/70">{eventName(e)}</p>
                  <p className="mt-1 text-sm text-ink/50">
                    {v?.name}
                    {v?.city ? `, ${v.city}` : ""}
                  </p>
                  <div className="mt-4">
                    <TicketButton event={e} compact />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
