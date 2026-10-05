import { ArrowUpRight, Check, MessageCircle, Rocket } from "lucide-react";
import Reveal from "../components/Reveal";

const steps = [
  {
    number: "01",
    title: "Tell me what you need",
    description: "Share your idea, goals, and what you want your website or app to do.",
    icon: MessageCircle,
  },
  {
    number: "02",
    title: "Get a clear plan",
    description: "We’ll agree on the right approach, key features, and next steps before work begins.",
    icon: Check,
  },
  {
    number: "03",
    title: "Build and launch",
    description: "See progress as we go, share feedback, and get ready to put your project online.",
    icon: Rocket,
  },
];

export default function About() {
  return (
    <section id="process">
      <div className="shell">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">The process</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>A straightforward process.</Reveal>
          <Reveal as="p" className="lead" delay={0.1}>
            You’ll work directly with me, with clear communication from the first conversation through launch.
          </Reveal>
        </div>

        <div className="process-grid">
          {steps.map(({ number, title, description, icon: Icon }, i) => (
            <Reveal key={number} delay={0.06 * i}>
              <article className="process-card">
                <div className="process-card-top">
                  <span>{number}</span>
                  <Icon aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.15}>
          <a className="process-cta" href="#contact">
            Share your idea <ArrowUpRight size={17} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
