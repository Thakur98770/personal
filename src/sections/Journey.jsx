import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "../config/site";
import Reveal from "../components/Reveal";
import { useReducedMotion } from "../hooks";

gsap.registerPlugin(ScrollTrigger);

export default function Journey() {
  const line = useRef(null);
  const wrap = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || !wrap.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        line.current,
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 70%",
            end: "bottom 65%",
            scrub: 0.5,
          },
        }
      );
    }, wrap);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="journey">
      <div className="shell">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">Journey</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>How I got here</Reveal>
        </div>

        <div className="timeline" ref={wrap}>
          <span className="timeline-fill" ref={line} style={reduced ? { height: "100%" } : undefined} aria-hidden="true" />
          {timeline.map((t, i) => (
            <Reveal key={t.year} delay={0.06 * i}>
              <article className={`tl-item${i === timeline.length - 1 ? " live" : ""}`}>
                <p className="tl-year">{t.year}</p>
                <h3>{t.title}</h3>
                <p className="muted" style={{ maxWidth: "60ch" }}>{t.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
