# Drakkar — Landing Page

Landing page (single-page) para Drakkar, productora de eventos y conciertos en México. Construida con Next.js (App Router) + TypeScript + Tailwind CSS + Framer Motion.

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
```

## Puntos de integración pendientes (backend / pagos)

Buscar el comentario `TODO` o `BACKEND` / `PAGOS` en el código:

- `components/FlexPass.tsx` — botón "Solicitar Acceso Anticipado" de cada plan: conectar con la pasarela de pagos (Stripe, Conekta, Mercado Pago) para iniciar el checkout/suscripción recurrente.
- `components/EventsLineup.tsx` — arreglo `EVENTS` estático: reemplazar por `fetch` a tu API/CMS (`GET /api/events`), y el botón "Ver detalles" debe enlazar a la página de evento (`/eventos/[id]`) validando membresía Flex Pass para acceso anticipado.
- `components/Footer.tsx` — formulario de newsletter: conectar a tu servicio de email marketing o endpoint propio (`POST /api/newsletter/subscribe`).
- `components/Hero.tsx` — reemplazar `public/media/hero-concierto.mp4` y `hero-poster.jpg` por los assets finales.

## Notas de seguridad de dependencias

`npm audit` reporta advisories heredados de `eslint-config-next` (dependencia de desarrollo, no afecta el bundle de producción). El paquete `next` está fijado en la última versión parcheada de la línea 14 (`14.2.35`). Antes de producción, evalúa migrar a Next 15/16 y correr `npm audit` nuevamente.
