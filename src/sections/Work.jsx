import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects } from "../data/projects";
import ProjectCard from "../components/ProjectCard";
import Reveal from "../components/Reveal";

export default function Work() {
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? projects : projects.filter((p) => p.category === cat);

  return (
    <section id="work">
      <div className="shell">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">Selected work</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>Projects</Reveal>
          <Reveal as="p" className="lead" delay={0.1}>
            A selection of recent work will appear here.
          </Reveal>
        </div>

        {projects.length > 0 ? (
          <>
            <Reveal className="filters" delay={0.05}>
              {["All", ...new Set(projects.map((project) => project.category))].map((category) => (
                <button
                  key={category}
                  className={`filter${cat === category ? " on" : ""}`}
                  onClick={() => setCat(category)}
                  aria-pressed={cat === category}
                >
                  {category}
                </button>
              ))}
            </Reveal>

            <motion.div className="work-grid" layout>
              <AnimatePresence mode="popLayout">
                {shown.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <ProjectCard project={project} index={index} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        ) : (
          <Reveal className="work-empty" delay={0.05}>
            <p>New work is on the way.</p>
            <a className="process-cta" href="#contact">Have a project in mind? Get in touch <span aria-hidden="true">↗</span></a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
