import { useEffect, useState } from "react";

export const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Elements that fade/slide in as they scroll into view. */
const REVEAL_SELECTOR = [
  ".kicker",
  "main h2",
  ".body-text",
  ".card",
  ".strip-item",
  ".timeline > li",
  ".stats > div",
  ".contact-links li",
  ".cta-inner > *",
  ".about-image",
].join(",");

/**
 * Wires up page-wide motion: scroll reveal with stagger, card spotlight that
 * follows the cursor, a scroll progress value, and a "scrolled" header flag.
 * Re-runs whenever the page or content changes so new elements get observed.
 */
export function useMotion(deps: unknown[]) {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(window.scrollY > 8);
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest?.(".card");
      if (!(card instanceof HTMLElement)) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR),
    ).filter((el) => !el.classList.contains("is-visible"));

    if (prefersReducedMotion() || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("reveal", "is-visible"));
      return;
    }

    elements.forEach((el) => {
      const siblings = el.parentElement
        ? Array.from(el.parentElement.children)
        : [];
      const index = Math.max(0, siblings.indexOf(el));
      el.style.setProperty("--reveal-delay", `${(index % 8) * 70}ms`);
      el.classList.add("reveal");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { scrolled, progress };
}
