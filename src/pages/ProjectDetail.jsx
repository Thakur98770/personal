import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, Github } from "lucide-react";
import { getProject, projects } from "../data/projects";
import Reveal from "../components/Reveal";
import { siteConfig } from "../config/site";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProject(slug);
  const idx = projects.findIndex((p) => p.slug === slug);
  const next = projects[(idx + 1) % projects.length];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) document.title = `${project.title} — ${siteConfig.name}`;
    return () => { document.title = `${siteConfig.name} | Frontend & Full-Stack Developer`; };
  }, [project]);

  if (!project) return <Navigate to="/" replace />;

  return (
    <article className="detail">
      <div className="shell">
        <Link to="/" className="back"><ArrowLeft size={16} /> All work</Link>

        <header className="detail-hero">
          <Reveal as="p" className="eyebrow">{project.category} · {project.year}</Reveal>
          <Reveal as="h1" className="section-title" delay={0.05}>{project.title}</Reveal>
          <Reveal as="p" className="lead" delay={0.1}>{project.tagline}</Reveal>
        </header>

        <Reveal className="detail-cover" style={{ "--pa": project.accent }} delay={0.12}>
          {project.image ? (
            <img src={project.image} alt={`${project.title} interface`} />
          ) : (
            <div className="cover-gen" aria-hidden="true">
              <span className="cover-mono">{project.title.slice(0, 2).toUpperCase()}</span>
            </div>
          )}
        </Reveal>

        <div className="detail-body">
          <div>
            <Reveal className="detail-block">
              <h2>Overview</h2>
              <p>{project.summary}</p>
            </Reveal>
            <Reveal className="detail-block">
              <h2>The problem</h2>
              <p>{project.problem}</p>
            </Reveal>
            <Reveal className="detail-block">
              <h2>The solution</h2>
              <p>{project.solution}</p>
            </Reveal>
            <Reveal className="detail-block">
              <h2>Features</h2>
              <ul className="detail-list">
                {project.features.map((f) => (
                  <li key={f}><Check aria-hidden="true" /> {f}</li>
                ))}
              </ul>
            </Reveal>
            <Reveal className="detail-block">
              <h2>What was hard</h2>
              <p>{project.challenges}</p>
            </Reveal>
            <Reveal className="detail-block">
              <h2>Result</h2>
              <p>{project.results}</p>
            </Reveal>
            {project.screenshots?.length > 0 && (
              <Reveal className="detail-block">
                <h2>Screens</h2>
                <div className="shots">
                  {project.screenshots.map((src, i) => (
                    <img key={src} src={src} alt={`${project.title} screenshot ${i + 1}`} loading="lazy" />
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          <aside className="detail-aside glass">
            <div className="aside-row">
              <span>Role</span>
              <p>Design and development, end to end</p>
            </div>
            <div className="aside-row">
              <span>Stack</span>
              <div className="chips" style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                {project.tech.map((t) => <span className="chip" key={t}>{t}</span>)}
              </div>
            </div>
            {project.links?.live && (
              <a className="btn btn-solid btn-sm" href={project.links.live} target="_blank" rel="noreferrer">
                Live demo <ArrowUpRight />
              </a>
            )}
            {project.links?.github && (
              <a className="btn btn-ghost btn-sm" href={project.links.github} target="_blank" rel="noreferrer">
                <Github /> Source
              </a>
            )}
            {!project.links?.live && !project.links?.github && (
              <p className="muted project-links-note">Demo and source links will be added soon.</p>
            )}
          </aside>
        </div>

        <Link to={`/work/${next.slug}`} className="next-project" data-cursor="View">
          <div>
            <p className="eyebrow">Next project</p>
            <h3>{next.title}</h3>
          </div>
          <ArrowUpRight size={32} />
        </Link>
      </div>
    </article>
  );
}
