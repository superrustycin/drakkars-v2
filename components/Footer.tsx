"use client";

import Image from "next/image";
import drakkarsLogo from "@/public/brand/drakkars-logo.png";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "TikTok", href: "https://tiktok.com" },
  { label: "X", href: "https://x.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

const SUPPORT_LINKS = [
  { label: "Centro de ayuda", href: "#" },
  { label: "Preguntas frecuentes", href: "#" },
  { label: "Contacto y soporte 24/7", href: "#" },
  { label: "Reporta un problema de seguridad", href: "#" },
];

const LEGAL_LINKS = [
  { label: "Políticas de Reembolso Justas", href: "#", emphasized: true },
  { label: "Términos de Privacidad", href: "#", emphasized: true },
  { label: "Términos y Condiciones", href: "#" },
  { label: "Aviso PROFECO", href: "#" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-obsidian-soft/40">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <a href="#" className="inline-flex">
              <Image
                src={drakkarsLogo}
                alt="Drakkars Producciones"
                className="h-16 w-auto"
              />
            </a>
            <p className="mt-4 text-sm text-white/50">
              La productora que nace para devolverle al público mexicano una
              experiencia en vivo justa, segura y mágica.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-bold text-white/70 transition-colors hover:border-gold/50 hover:text-gold-bright"
                >
                  {social.label.slice(0, 2).toUpperCase()}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white/40">
              Soporte
            </h4>
            <ul className="mt-4 space-y-3">
              {SUPPORT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white/40">
              Legal y transparencia
            </h4>
            <ul className="mt-4 space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={
                      link.emphasized
                        ? "inline-flex items-center gap-1.5 text-sm font-semibold text-gold-bright transition-colors hover:text-gold"
                        : "text-sm text-white/60 transition-colors hover:text-white"
                    }
                  >
                    {link.emphasized && "🛡️"} {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-white/40">
              Newsletter
            </h4>
            <p className="mt-4 text-sm text-white/60">
              Entérate primero de nuevos eventos y preventas Flex Pass.
            </p>
            {/*
              BACKEND: conectar este formulario a tu servicio de email marketing
              o endpoint propio, ej. POST /api/newsletter/subscribe { email }.
            */}
            <form
              className="mt-4 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                // TODO: integrar con API de backend / servicio de email marketing
              }}
            >
              <input
                type="email"
                required
                placeholder="tu@email.com"
                className="w-full rounded-full border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-gold/50 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-gold-gradient px-5 py-2.5 text-sm font-bold text-obsidian"
              >
                Unirme
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 sm:flex-row">
          <p>© {new Date().getFullYear()} Drakkars Producciones. Todos los derechos reservados.</p>
          <p>Hecho con 🖤 en México.</p>
        </div>
      </div>
    </footer>
  );
}
