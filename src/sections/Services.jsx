import { Layout, PenTool, Server, ShoppingBag, Sparkles } from "lucide-react";
import { services } from "../config/site";
import Reveal from "../components/Reveal";

const ICONS = { Layout, Server, PenTool, ShoppingBag, Sparkles };

export default function Services() {
  return (
    <section id="services">
      <div className="shell">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">Services</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>What can I help you build?</Reveal>
          <Reveal as="p" className="lead" delay={0.1}>
            Start with a clear goal. I’ll help you find the right solution, then build it to work beautifully on every screen.
          </Reveal>
        </div>

        <div className="services">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] || Sparkles;
            return (
              <Reveal key={s.title} delay={0.05 * i} className="service">
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3><Icon aria-hidden="true" /> {s.title}</h3>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
