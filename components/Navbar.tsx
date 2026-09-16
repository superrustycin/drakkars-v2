"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import drakkarsLogo from "@/public/brand/drakkars-logo.png";
import { useScrolled } from "@/hooks/useScrolled";

const NAV_LINKS = [
  { label: "Manifiesto", href: "#manifiesto" },
  { label: "Flex Pass", href: "#flex-pass" },
  { label: "Cartelera", href: "#cartelera" },
];

export default function Navbar() {
  const scrolled = useScrolled();

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-obsidian/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <div className="flex h-10 w-[92px] items-center sm:h-12 sm:w-[110px]">
          <AnimatePresence>
            {scrolled && (
              <motion.a
                key="navbar-logo"
                href="#"
                layoutId="brand-logo"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                  opacity: { duration: 0.25 },
                }}
              >
                <Image
                  src={drakkarsLogo}
                  alt="Drakkars Producciones"
                  priority
                  className="h-10 w-auto sm:h-12"
                />
              </motion.a>
            )}
          </AnimatePresence>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 transition-colors hover:text-gold-bright"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#flex-pass"
          className="rounded-full bg-gold-gradient px-5 py-2 text-sm font-bold text-obsidian shadow-gold transition-transform hover:scale-[1.03] active:scale-95"
        >
          Únete al Flex Pass
        </a>
      </nav>
    </motion.header>
  );
}
