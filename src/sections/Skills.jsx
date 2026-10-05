import { useRef } from "react";
import { skillGroups } from "../config/site";
import Reveal from "../components/Reveal";

function SkillCard({ group, i }) {
  const ref = useRef(null);
  const move = (e) => {
    const el = ref.current;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.transform = `perspective(900px) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 6}deg) rotateX(${(0.5 - (e.clientY - r.top) / r.height) * 6}deg)`;
  };
  const leave = () => { ref.current.style.transform = ""; };

  return (
    <Reveal delay={0.05 * i}>
      <article
        className="skill-card glass"
        ref={ref}
        onMouseMove={move}
        onMouseLeave={leave}
        style={{ transition: "transform .45s cubic-bezier(.22,1,.36,1), border-color .3s" }}
      >
        <span className="sheen" aria-hidden="true" />
        <h3>{group.title}</h3>
        <div className="chips">
          {group.items.map((s) => (
            <span className="chip" key={s}>{s}</span>
          ))}
        </div>
      </article>
    </Reveal>
  );
}

export default function Skills() {
  return (
    <section id="skills">
      <div className="shell">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">Toolkit</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>What I build with</Reveal>
          <Reveal as="p" className="lead" delay={0.1}>
            Not a checklist — these are the tools I reach for without looking things up.
          </Reveal>
        </div>
        <div className="skill-grid">
          {skillGroups.map((g, i) => (
            <SkillCard key={g.title} group={g} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
