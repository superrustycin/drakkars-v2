"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the page has scrolled past `threshold`.
 * Shared by Hero and Navbar so both flip in the same render pass —
 * that's what lets the logo's layoutId animation hand off cleanly.
 */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
