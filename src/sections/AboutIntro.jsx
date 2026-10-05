import { ArrowUpRight, MapPin } from "lucide-react";
import { siteConfig } from "../config/site";
import Reveal from "../components/Reveal";

const technologies = ["React", "JavaScript", "Node.js", "Express", "MongoDB"];

export default function AboutIntro() {
  return (
    <section id="about">
      <div className="shell about-intro">
        <div className="about-intro-copy">
          <Reveal as="p" className="eyebrow">About me</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            A developer who cares about the details.
          </Reveal>
          <Reveal as="p" className="lead" delay={0.1}>
            I’m Abhishek Thakur, a frontend and full-stack developer based in India. I turn ideas into responsive websites and web apps, from polished interfaces to the APIs and data behind them.
          </Reveal>
          <Reveal as="p" className="muted" delay={0.15}>
            I enjoy solving practical problems with clear, easy-to-use software. I work directly with you, keep communication straightforward, and focus on what your users actually need.
          </Reveal>
        </div>

        <Reveal className="about-profile" delay={0.1}>
          <div className="about-profile-heading">
            <span className="about-avatar" aria-hidden="true">AT</span>
            <div>
              <h3>{siteConfig.name}</h3>
              <p>{siteConfig.role}</p>
            </div>
          </div>
          <p className="muted"><MapPin size={16} aria-hidden="true" /> {siteConfig.location} · Available for remote work</p>
          <div className="about-stack" aria-label="Technologies">
            {technologies.map((technology) => <span className="chip" key={technology}>{technology}</span>)}
          </div>
          <a className="about-contact" href="#contact">Let’s talk <ArrowUpRight size={17} /></a>
        </Reveal>
      </div>
    </section>
  );
}
