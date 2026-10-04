"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/*
  Aparición sutil al entrar en pantalla (una sola vez).
  Con "reducir movimiento" solo hace fade, sin desplazamiento.
*/
export default function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, transform: reduce ? "none" : "translateY(16px)" }}
      whileInView={{ opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </Comp>
  );
}
