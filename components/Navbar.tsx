"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import drakkarsLogo from "@/public/brand/drakkars-logo.png";
import { useScrolled } from "@/hooks/useScrolled";
import { NAV_LINKS, PROMISES, SITE } from "@/lib/site";

export default function Navbar() {
  const scrolled = useScrolled();
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  // Bloquea el scroll del fondo y permite cerrar con Escape mientras el menú está abierto.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-out ${
        scrolled ? "md:-translate-y-9" : ""
      }`}
    >
      {/* Barra de servicio */}
      <div className="hidden border-b border-paper/10 bg-ink md:block">
        <div className="container-x flex h-9 items-center justify-between text-[11px] text-paper/60">
          <p className="eyebrow !tracking-[0.2em]">{PROMISES.slice(0, 3).join("  ·  ")}</p>
          <div className="flex items-center gap-5">
            {SITE.socials.slice(0, 2).map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
                {s.label}
              </a>
            ))}
            <a href={`mailto:${SITE.email}`} className="hover:text-paper">
              {SITE.email}
            </a>
          </div>
        </div>
      </div>

      <div
        className={`border-b transition-colors duration-300 ease-out ${
          solid ? "border-paper/10 bg-ink/95 backdrop-blur-md" : "border-transparent bg-gradient-to-b from-ink/80 to-transparent"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label={`${SITE.name} — inicio`} className="shrink-0" onClick={() => setOpen(false)}>
            <Image src={drakkarsLogo} alt={SITE.name} priority className="h-9 w-auto md:h-11" />
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-subheading text-xs font-semibold uppercase tracking-[0.18em] text-paper/75 transition-colors hover:text-gold-bright"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a href="/#eventos" className="btn-gold hidden sm:inline-flex">
              Comprar boletos
            </a>
            <button
              type="button"
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={open}
              aria-controls="menu-movil"
              onClick={() => setOpen((v) => !v)}
              className="relative flex h-11 w-11 items-center justify-center rounded-sm border border-paper/20 transition-transform duration-150 ease-out active:scale-[0.97] lg:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-paper transition-transform duration-200 ease-out ${
                  open ? "rotate-45" : "-translate-y-[4px]"
                }`}
              />
              <span
                className={`absolute h-px w-5 bg-paper transition-transform duration-200 ease-out ${
                  open ? "-rotate-45" : "translate-y-[4px]"
                }`}
              />
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            key="menu"
            initial={{ opacity: 0, transform: reduce ? "none" : "translateY(-8px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-ink lg:hidden"
          >
            <ul className="container-x divide-y divide-paper/10 pt-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 font-display text-3xl"
                  >
                    {l.label}
                    <span aria-hidden className="text-gold">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="container-x mt-8 pb-10">
              <a href="/#eventos" onClick={() => setOpen(false)} className="btn-gold w-full">
                Comprar boletos
              </a>
              <p className="eyebrow mt-8 text-paper/50">{PROMISES.slice(0, 3).join(" · ")}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
