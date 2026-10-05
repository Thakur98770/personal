import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { useIsTouch, useReducedMotion } from "../hooks";

/** Tilts toward the pointer and carries a glow in the project's colour. */
export default function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const touch = useIsTouch();
  const reduced = useReducedMotion();

  const move = (e) => {
    const el = ref.current;
    if (!el || touch || reduced) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
    el.style.transform = `perspective(1100px) rotateY(${(px - 0.5) * 7}deg) rotateX(${(0.5 - py) * 7}deg) translateY(-4px)`;
  };
  const leave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <Link
      to={`/work/${project.slug}`}
      className="card"
      ref={ref}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ "--pa": project.accent, transition: "transform .5s cubic-bezier(.22,1,.36,1), border-color .3s" }}
      data-cursor="View"
      aria-label={`${project.title} — open case study`}
    >
      <div className="card-cover">
        {project.image ? (
          <img src={project.image} alt={`${project.title} interface`} loading="lazy" />
        ) : (
          <div className="cover-gen" aria-hidden="true">
            <span className="cover-mono">{project.title.slice(0, 2).toUpperCase()}</span>
          </div>
        )}
        <span className="card-glow" aria-hidden="true" />
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{project.title}</h3>
          <span className="card-index">
            {String(index + 1).padStart(2, "0")} · {project.year}
          </span>
        </div>
        <p className="muted">{project.summary}</p>
        <div className="chips">
          {project.tech.map((t) => (
            <span className="chip" key={t}>{t}</span>
          ))}
        </div>
        <span className="card-open">
          Read the case study <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
