import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowDown, ArrowUpRight, Check, Phone } from "lucide-react";
import { siteConfig } from "../config/site";
import Magnetic from "../components/Magnetic";
import { useReducedMotion } from "../hooks";

export default function Hero({ ready }) {
  const root = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!ready) return;
    root.current.classList.add("armed");
    if (reduced) {
      gsap.set(root.current.querySelectorAll("[data-anim]"), { opacity: 1, y: 0 });
      return;
    }
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from("[data-anim='badge']", { opacity: 0, y: 14, duration: 0.8 })
        .from("[data-anim='line'] span", { yPercent: 115, duration: 1.15, stagger: 0.09 }, "-=0.5")
        .from("[data-anim='lead']", { opacity: 0, y: 18, duration: 0.9 }, "-=0.75")
        .from("[data-anim='cta'] > *", { opacity: 0, y: 16, duration: 0.7, stagger: 0.08 }, "-=0.65")
        .from("[data-anim='canvas']", { opacity: 0, y: 18, duration: 0.9 }, "-=0.7")
        .from("[data-anim='cue']", { opacity: 0, duration: 0.6 }, "-=0.4");
    }, root);
    return () => ctx.revert();
  }, [ready, reduced]);

  const scrollTo = (sel) => (e) => {
    e.preventDefault();
    document.querySelector(sel)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className={`hero${reduced ? " armed" : ""}`} ref={root}>
      <div className="shell hero-grid">
        <div className="hero-copy">
          <span className="badge" data-anim="badge">
            <i className="dot" aria-hidden="true" />
            {siteConfig.availabilityNote}
          </span>

          <h1 className="display">
            <span className="line" data-anim="line"><span>I build websites</span></span>
            <span className="line" data-anim="line"><span>and web apps that</span></span>
            <span className="line" data-anim="line"><span><em>work for you.</em></span></span>
          </h1>

          <p className="lead" data-anim="lead">{siteConfig.bio}</p>

          <div className="hero-ctas" data-anim="cta">
            <Magnetic>
              <a className="btn btn-solid" href="#contact" onClick={scrollTo("#contact")}>
                Tell me about your project <ArrowUpRight />
              </a>
            </Magnetic>
            <Magnetic>
              <a className="btn btn-ghost" href="#about" onClick={scrollTo("#about")}>
                About me
              </a>
            </Magnetic>
          </div>

          <div className="hero-contact" data-anim="cue">
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}><Phone size={15} /> {siteConfig.phone}</a>
            <span><Check size={15} /> Direct contact from first chat to launch</span>
          </div>
          <a className="scrollcue" href="#services" onClick={scrollTo("#services")}>
            See how I can help <ArrowDown size={14} />
          </a>
        </div>

        <div className="hero-canvas" data-anim="canvas" aria-label="Web design and development services">
          <div className="hero-note">
            <span className="hero-note-label">A good place to start</span>
            <h2>Tell me what your business needs.</h2>
            <p>We’ll shape the idea into a useful, polished experience your customers can use on any device.</p>
            <a href="#contact" onClick={scrollTo("#contact")}>Start with a conversation <ArrowUpRight size={17} /></a>
          </div>
          <div className="hero-stamp" aria-hidden="true">MADE<br />FOR YOU</div>
        </div>
      </div>
    </section>
  );
}
