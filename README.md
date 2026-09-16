# Drakkars Producciones — Landing Page

Landing page (single-page) para Drakkars Producciones, productora de eventos y conciertos en México. Construida con Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** — dark mode por defecto, acentos dorados/neón
- **Framer Motion** — animaciones de entrada y micro-interacciones

## Empezar

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Estructura

```
app/
  layout.tsx        # Metadata, fuentes, wrapper raíz
  page.tsx           # Ensambla las secciones de la landing
  globals.css         # Tailwind + utilidades de marca (glass-card, text-gradient-gold, etc.)
components/
  Navbar.tsx           # Header fijo con CTA
  Hero.tsx              # Primer impacto: video de fondo, titular, CTA
  Manifesto.tsx           # 3 pilares: transparencia, seguridad, sin fricciones
  FlexPass.tsx              # Cómo funciona (3 pasos) + tarjetas de precios
  EventsLineup.tsx            # Cartelera / próximos eventos
  Footer.tsx                    # Soporte, legal (reembolsos, privacidad), newsletter
public/media/
  hero-concierto.mp4          # (pendiente) video de fondo del Hero
  hero-poster.jpg              # (pendiente) poster de respaldo
public/fonts/
  Livingstone.ttf                # Tipografía de títulos (H1/H2)
public/brand/
  drakkars-logo.png                # Logo recortado y con fondo transparente
app/
  icon.png / apple-icon.png          # Favicon generado a partir del logo
```

## Tipografía

- **Livingstone** (`public/fonts/Livingstone.ttf`, `next/font/local`, variable `--font-display` / clase `font-display`) — para H1 y H2 de sección. Fuente decorativa de un solo peso (Regular): no usar `font-bold`/`font-extrabold` sobre ella (negrita sintética se ve mal). Se usa bajo **licencia comercial propia** de Drakkars Producciones (Stringlabs) — mantener este repositorio privado y no redistribuir el archivo `.ttf` fuera del proyecto.
- **Sora** (`--font-subheading` / clase `font-subheading`) — subtítulos de tarjetas (h3), cifras de precios y contadores, donde una gótica pierde legibilidad a tamaños pequeños.
- **Manrope** (`--font-body`) — texto de cuerpo.

## Logo

`public/brand/drakkars-logo.png` es el logo original (`Logo--Drakkars-Producciones.jpeg`, fondo negro sólido) recortado a su bounding box real y con el negro convertido a transparencia (script en el historial de esta sesión, usando Pillow: umbral de luminancia con rampa antialiaseada). Se usa en `Navbar.tsx` y `Footer.tsx` vía `next/image`. El favicon (`app/icon.png`, `app/apple-icon.png`) se generó centrando el mismo logo sobre un cuadro con el color `obsidian` de la marca.

La resolución fuente es modesta (626×273 px) porque así llegó el `.jpeg` original — se ve nítido en navbar/footer pero convendría pedir al diseñador un archivo vectorial (SVG/AI) o un PNG de mayor resolución si en el futuro se usa a tamaños más grandes (p. ej. como watermark en el Hero).

## Puntos de integración pendientes (backend / pagos)

Buscar el comentario `TODO` o `BACKEND` / `PAGOS` en el código:

- `components/FlexPass.tsx` — botón "Solicitar Acceso Anticipado" de cada plan: conectar con la pasarela de pagos (Stripe, Conekta, Mercado Pago) para iniciar el checkout/suscripción recurrente.
- `components/EventsLineup.tsx` — arreglo `EVENTS` estático: reemplazar por `fetch` a tu API/CMS (`GET /api/events`), y el botón "Ver detalles" debe enlazar a la página de evento (`/eventos/[id]`) validando membresía Flex Pass para acceso anticipado.
- `components/Footer.tsx` — formulario de newsletter: conectar a tu servicio de email marketing o endpoint propio (`POST /api/newsletter/subscribe`).
- `components/Hero.tsx` — reemplazar `public/media/hero-concierto.mp4` y `hero-poster.jpg` por los assets finales.

## Notas de seguridad de dependencias

`npm audit` reporta advisories heredados de `eslint-config-next` (dependencia de desarrollo, no afecta el bundle de producción). El paquete `next` está fijado en la última versión parcheada de la línea 14 (`14.2.35`). Antes de producción, evalúa migrar a Next 15/16 y correr `npm audit` nuevamente.
