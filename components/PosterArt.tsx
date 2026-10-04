import Image from "next/image";
import type { Accent, DrakkarsEvent } from "@/lib/events";

/*
  Arte 4:5 del evento. Si el evento tiene `poster` se usa la imagen;
  si no, se genera un póster tipográfico con el color del evento para
  que la cartelera nunca muestre huecos grises.
*/

const ACCENT_BG: Record<Accent, string> = {
  gold: "radial-gradient(90% 70% at 50% 30%, #6b5417 0%, #2a2108 55%, #0b0a0d 100%)",
  wine: "radial-gradient(90% 70% at 50% 30%, #8a1a2e 0%, #3a0710 55%, #0b0a0d 100%)",
  violet: "radial-gradient(90% 70% at 50% 30%, #4b2b8f 0%, #1d1238 55%, #0b0a0d 100%)",
  cyan: "radial-gradient(90% 70% at 50% 30%, #155e5b 0%, #0b2928 55%, #0b0a0d 100%)",
};

export default function PosterArt({
  event,
  sizes,
  priority,
  className = "",
}: {
  event: DrakkarsEvent;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`relative aspect-[4/5] overflow-hidden bg-ink-soft [container-type:inline-size] ${className}`}>
      {event.poster ? (
        <Image
          src={event.poster}
          alt={`${[event.kicker, event.title].filter(Boolean).join(" ")} — ${event.headliners.join(", ")}`}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="grain absolute inset-0 flex flex-col justify-between p-[8%] text-paper"
          style={{ background: ACCENT_BG[event.accent] }}
        >
          <span className="font-subheading text-[clamp(5px,3.4cqw,11px)] font-semibold uppercase tracking-[0.28em] text-paper/70">
            {event.genre}
          </span>
          <div>
            <p className="font-display text-[clamp(0.6rem,13cqw,4rem)] leading-[0.95]">
              {event.headliners[0]}
            </p>
            <p className="mt-[4cqw] font-subheading text-[clamp(5px,3.2cqw,11px)] font-semibold uppercase tracking-[0.22em] text-paper/60">
              {event.title}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
