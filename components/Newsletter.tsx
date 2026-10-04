"use client";

import { useState } from "react";

export default function Newsletter() {
  const [sent, setSent] = useState(false);
  return (
    <section className="bg-gold text-ink">
      <div className="container-x grid gap-8 py-14 md:grid-cols-[1.2fr_1fr] md:items-center md:py-16">
        <div>
          <h2 className="font-display text-4xl leading-none md:text-5xl">No te pierdas ninguna noche</h2>
          <p className="mt-3 max-w-md text-ink/75">
            Anuncios, preventas y beneficios Flex Pass directo en tu correo. Sin spam.
          </p>
        </div>
        {/*
          BACKEND: conectar a tu servicio de email marketing
          (ej. POST /api/newsletter/subscribe { email }).
        */}
        {sent ? (
          <p className="font-subheading text-lg font-bold" role="status">
            ¡Listo! Te avisaremos primero.
          </p>
        ) : (
          <form
            className="flex flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Correo electrónico
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              autoComplete="email"
              placeholder="tu@correo.com"
              className="h-12 flex-1 rounded-sm border border-ink/30 bg-paper/60 px-4 text-base text-ink placeholder:text-ink/45 focus:border-ink focus:outline-none"
            />
            <button type="submit" className="btn h-12 bg-ink text-paper hover:bg-wine">
              Suscribirme
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
