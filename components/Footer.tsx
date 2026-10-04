import Image from "next/image";
import Link from "next/link";
import drakkarsLogo from "@/public/brand/drakkars-logo.png";
import { SITE } from "@/lib/site";

const COLUMNS = [
  {
    title: "Eventos",
    links: [
      { label: "Próximos eventos", href: "/#eventos" },
      { label: "Recintos", href: "/#recintos" },
      { label: "Flex Pass", href: "/#flex-pass" },
    ],
  },
  {
    title: "Compañía",
    links: [
      { label: "Nosotros", href: "/#nosotros" },
      { label: "Artistas y recintos", href: "/#contacto" },
      { label: "Contacto", href: `mailto:${SITE.email}` },
    ],
  },
  {
    title: "Ayuda",
    links: [
      { label: "Preguntas frecuentes", href: "#" },
      { label: "Políticas de reembolso", href: "#" },
      { label: "Reporta un problema de seguridad", href: "#" },
    ],
  },
];

const LEGAL = [
  { label: "Términos y condiciones", href: "#" },
  { label: "Aviso de privacidad", href: "#" },
  { label: "Aviso PROFECO", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-paper/10 bg-ink">
      <div className="container-x py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <Link href="/" aria-label={`${SITE.name} — inicio`} className="inline-flex">
              <Image src={drakkarsLogo} alt={SITE.name} className="h-14 w-auto" />
            </Link>
            <p className="mt-5 max-w-xs text-sm text-paper/55">
              La productora que nace para devolverle al público mexicano una experiencia en vivo justa, segura y mágica.
            </p>
            <ul className="mt-6 flex gap-2">
              {SITE.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-sm border border-paper/15 font-subheading text-[11px] font-bold text-paper/70 transition-colors hover:border-gold hover:text-gold"
                  >
                    {s.short}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          {COLUMNS.map((c) => (
            <nav key={c.title} aria-label={c.title}>
              <h2 className="eyebrow text-paper/40">{c.title}</h2>
              <ul className="mt-5 space-y-3">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-paper/70 transition-colors hover:text-paper">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 text-xs text-paper/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE.name}. Todos los derechos reservados. Hecho en México.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <li key={l.label}>
                <a href={l.href} className="hover:text-paper">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
