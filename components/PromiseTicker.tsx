import { PROMISES } from "@/lib/site";

// Franja de promesas de marca. Movimiento lineal constante; se detiene con "reducir movimiento".
export default function PromiseTicker() {
  const items = [...PROMISES, ...PROMISES];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-gold text-ink" aria-label="Nuestras promesas">
      <ul className="flex w-max animate-marquee motion-reduce:animate-none">
        {items.map((p, i) => (
          <li key={i} aria-hidden={i >= PROMISES.length} className="flex items-center gap-6 px-6 py-3.5">
            <span className="font-subheading text-xs font-bold uppercase tracking-[0.22em]">{p}</span>
            <span aria-hidden className="h-1.5 w-1.5 rotate-45 bg-ink" />
          </li>
        ))}
      </ul>
    </div>
  );
}
