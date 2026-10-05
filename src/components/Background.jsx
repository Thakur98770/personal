import { useEffect, useRef } from "react";
import { useIsTouch, useReducedMotion } from "../hooks";

/** Grid, two colour blobs, film grain, and a glow that follows the pointer. */
export default function Background() {
  const spot = useRef(null);
  const touch = useIsTouch();
  const reduced = useReducedMotion();

  useEffect(() => {
    if (touch || reduced) return;
    const el = spot.current;
    let x = 0, y = 0, cx = 0, cy = 0, raf;
    const move = (e) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.06;
      cy += (y - cy) * 0.06;
      el.style.left = `${cx}px`;
      el.style.top = `${cy}px`;
      raf = requestAnimationFrame(loop);
    };
    addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, [touch, reduced]);

  return (
    <>
      <div className="bg-field" aria-hidden="true">
        <div className="bg-grid" />
        <div className="blob blob-a" />
        <div className="blob blob-b" />
        {!touch && !reduced && <div className="spot" ref={spot} />}
      </div>
      <div className="grain" aria-hidden="true" />
    </>
  );
}
