import type { Metadata } from "next";
import { Sora, Manrope } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Fuente de marca para títulos grandes (H1 / H2 de sección / wordmark).
// Licencia comercial adquirida — archivo en public/fonts/Livingstone.ttf.
const display = localFont({
  src: "../public/fonts/Livingstone.ttf",
  variable: "--font-display",
  weight: "400",
  style: "normal",
  display: "swap",
});

// Sora se conserva para subtítulos de tarjetas y cifras, donde una
// decorativa gótica pierde legibilidad a tamaños pequeños.
const subheading = Sora({
  subsets: ["latin"],
  variable: "--font-subheading",
  weight: ["600", "700", "800"],
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Drakkars Producciones | La nueva era del entretenimiento en vivo en México",
  description:
    "Productora de eventos y conciertos sin cargos ocultos, sin colapsos y sin inseguridad. Únete al Flex Pass y vive la experiencia mágica.",
  keywords: [
    "conciertos México",
    "boletos sin cargos",
    "Flex Pass",
    "eventos en vivo",
    "membresía conciertos",
  ],
  openGraph: {
    title: "Drakkars Producciones | La nueva era del entretenimiento en vivo en México",
    description:
      "Cero cargos ocultos. Cero colapsos. Cero inseguridad. Bienvenido a la experiencia mágica.",
    locale: "es_MX",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" className="dark scroll-smooth">
      <body
        className={`${display.variable} ${subheading.variable} ${body.variable} font-body`}
      >
        {children}
      </body>
    </html>
  );
}
