"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import drakkarsLogo from "@/public/brand/drakkars-logo.png";
import { useScrolled } from "@/hooks/useScrolled";

const STATS = [
  { value: "0%", label: "Cargos ocultos" },
  { value: "100%", label: "Boletos asegurados" },
  { value: "24/7", label: "Soporte real" },
];

export default function Hero() {
  const scrolled = useScrolled();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24">
      {/*
        Fondo inmersivo: video de un concierto en loop.
        BACKEND/ASSETS: reemplaza el <source src="..."> por el video final (mp4/webm,
        idealmente comprimido y servido desde un CDN). El poster se muestra mientras carga.
      */}
      <div className="absolute inset-0 -z-20">
        <video
          className="h-full w-full object-cover opacity-40"
          autoPlay
          loop
          muted
          playsInline
          poster="/media/hero-poster.jpg"
        >
          <source src="/media/hero-concierto.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/70 to-obsidian/30" />
        <div className="absolute inset-0 bg-aurora opacity-80" />
      </div>

      {/* Glow decorativo */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-neon-violet/20 blur-[120px]" />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <AnimatePresence>
            {!scrolled && (
              <motion.a
                key="hero-logo"
                href="#"
                layoutId="brand-logo"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.3 },
                  y: { duration: 0.6 },
                }}
                className="mb-8 inline-flex"
              >
                <Image
                  src={drakkarsLogo}
                  alt="Drakkars Producciones"
                  priority
                  className="h-24 w-auto sm:h-32 md:h-40 lg:h-48"
                />
              </motion.a>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-eyebrow mb-8 inline-flex"
          >
            ✨ Nace una nueva forma de vivir la música en México
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl leading-[1.2] sm:text-6xl md:text-7xl"
          >
            La nueva era del{" "}
            <span className="text-gradient-gold">entretenimiento en vivo</span>{" "}
            llegó a México
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-white/70 md:text-xl"
          >
            Sin cargos ocultos. Sin plataformas que colapsan. Sin precios que
            suben mientras compras. Solo boletos justos, recintos seguros y
            experiencias inolvidables.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <a
              href="#flex-pass"
              className="group relative w-full overflow-hidden rounded-full bg-gold-gradient px-8 py-4 text-base font-bold text-obsidian shadow-gold transition-transform hover:scale-[1.03] active:scale-95 sm:w-auto"
            >
              Únete a la Membresía
            </a>
            <a
              href="#cartelera"
              className="w-full rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white backdrop-blur-md transition-colors hover:border-gold/50 hover:bg-white/10 sm:w-auto"
            >
              Ver próximos eventos
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mx-auto mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="font-subheading text-2xl font-bold text-gold-bright sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-white/50 sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="h-10 w-6 rounded-full border-2 border-white/20 p-1">
          <div className="h-2 w-full rounded-full bg-gold" />
        </div>
      </motion.div>
    </section>
  );
}
