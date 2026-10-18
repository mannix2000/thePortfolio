import { useEffect, useRef, useState } from "react";

import { prefersReducedMotion } from "./useMotion";

/** Types out each word, pauses, deletes it, then moves to the next. */
export function RotatingText({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(() =>
    prefersReducedMotion() ? words[0] ?? "" : "",
  );
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || words.length === 0) return;
    const word = words[index % words.length];
    let delay = deleting ? 40 : 85;
    if (!deleting && text === word) delay = 1600;
    if (deleting && text === "") delay = 300;

    const timer = window.setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => (i + 1) % words.length);
      } else {
        setText(
          deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1),
        );
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [text, deleting, index, words]);

  return (
    <span className="typer" aria-label={words.join(", ")}>
      <span aria-hidden="true">{text}</span>
      <span className="typer-caret" aria-hidden="true"></span>
    </span>
  );
}

/** Counts from 0 up to the number in `value` once it scrolls into view. */
export function Counter({ value }: { value: string }) {
  const target = Number.parseInt(value, 10);
  const suffix = value.replace(/^\d+/, "");
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(() =>
    Number.isNaN(target) || prefersReducedMotion() ? target : 0,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node || Number.isNaN(target) || prefersReducedMotion()) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1100);
        setShown(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });
    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <span ref={ref}>
      {Number.isNaN(target) ? value : `${shown}${suffix}`}
    </span>
  );
}
