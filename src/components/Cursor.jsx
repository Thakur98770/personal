import { useEffect, useRef } from "react";
import { useIsTouch, useReducedMotion } from "../hooks";

/**
 * Dot + trailing ring. The ring reads "View" over project cards and
 * grows over anything clickable. Disabled on touch and reduced motion.
 */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const touch = useIsTouch();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (touch || reduced) return;
    const d = dot.current;
    const r = ring.current;
    let x = innerWidth / 2, y = innerHeight / 2, rx = x, ry = y, raf;

    const move = (e) => {
      x = e.clientX;
      y = e.clientY;
      d.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
    };

    const loop = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      r.style.transform = `translate(${rx - 20}px, ${ry - 20}px) scale(var(--s, 1))`;
      raf = requestAnimationFrame(loop);
    };

    const over = (e) => {
      const t = e.target.closest("a, button, input, textarea, [data-cursor]");
      if (!t) {
        r.style.setProperty("--s", 1);
        r.textContent = "";
        return;
      }
      const label = t.dataset.cursor;
      r.style.setProperty("--s", label ? 2.1 : 1.55);
      r.textContent = label || "";
    };

    addEventListener("mousemove", move, { passive: true });
    addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("mousemove", move);
      removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
    };
  }, [touch, reduced]);

  if (touch || reduced) return null;
  return (
    <>
      <div className="cursor" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true" />
    </>
  );
}
