import { techWall } from "../config/site";
import Reveal from "../components/Reveal";

export default function TechWall() {
  return (
    <section id="stack" style={{ paddingBlock: "clamp(3rem,7vw,6rem)" }}>
      <div className="shell">
        <Reveal as="p" className="eyebrow" style={{ marginBottom: "1.5rem" }}>
          The stack, day to day
        </Reveal>
        <div className="tech-wall">
          {techWall.map((t, i) => (
            <Reveal key={t} delay={0.03 * i}>
              <span className="tech" style={{ animationDelay: `${(i % 6) * 0.4}s` }}>
                <i aria-hidden="true" /> {t}
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
