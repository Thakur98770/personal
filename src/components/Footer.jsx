import { useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { siteConfig } from "../config/site";
import Brand from "./Brand";

export default function Footer() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const scrollTo = (id) => (event) => {
    event.preventDefault();
    if (pathname !== "/") {
      navigate("/");
      window.setTimeout(() => {
        document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
      return;
    }
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div>
            <p className="logo" style={{ marginBottom: ".5rem" }}><Brand /></p>
            <p className="muted footer-tagline">Websites and web apps, built around your business.</p>
          </div>

          <nav className="footer-links" aria-label="Footer">
            <a href="#services" onClick={scrollTo("#services")}>Services</a>
            <a href="#work" onClick={scrollTo("#work")}>Projects</a>
            <a href="#about" onClick={scrollTo("#about")}>About</a>
            <a href="#process" onClick={scrollTo("#process")}>Process</a>
            <a href="#contact" onClick={scrollTo("#contact")}>Contact</a>
          </nav>

          <div className="footer-contact">
            <a href={`mailto:${siteConfig.email}`}><Mail size={16} /> {siteConfig.email} <ArrowUpRight size={14} /></a>
            <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}><Phone size={16} /> {siteConfig.phone} <ArrowUpRight size={14} /></a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
          <a href="#contact" onClick={scrollTo("#contact")}>Have a project in mind? Get in touch <ArrowUpRight size={14} /></a>
        </div>
      </div>
    </footer>
  );
}
