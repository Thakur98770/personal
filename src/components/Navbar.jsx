import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { navLinks, siteConfig } from "../config/site";
import { useActiveSection } from "../hooks";
import Brand from "./Brand";

const IDS = navLinks.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [stuck, setStuck] = useState(false);
  const [menu, setMenu] = useState(false);
  const active = useActiveSection(IDS);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 40);
    onScroll();
    addEventListener("scroll", onScroll, { passive: true });
    return () => removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("is-locked", menu);
    return () => document.body.classList.remove("is-locked");
  }, [menu]);

  useEffect(() => {
    if (!menu) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setMenu(false);
    };
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, [menu]);

  const jump = (href) => (e) => {
    setMenu(false);
    e.preventDefault();
    if (!onHome) {
      navigate("/");
      window.setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 500);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", location.pathname + location.search);
  };

  return (
    <>
      <header className={`nav${stuck ? " stuck" : ""}`}>
        <div className="shell nav-inner">
          <Link to="/" className="logo" aria-label="CodeWithAbhiii — home">
            <Brand />
          </Link>

          <nav className="nav-links" aria-label="Sections">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={onHome ? l.href : `/${l.href}`}
                className={onHome && active === l.href.slice(1) ? "on" : ""}
                onClick={jump(l.href)}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="nav-actions">
            <a
              className="btn btn-solid btn-sm nav-cta"
              aria-label="Start a project"
              href={onHome ? "#contact" : "/#contact"}
              onClick={jump("#contact")}
            >
              <span>Start a project</span><ArrowUpRight aria-hidden="true" />
            </a>
            <button
              className={`burger${menu ? " x" : ""}`}
              onClick={() => setMenu((m) => !m)}
              aria-label={menu ? "Close menu" : "Open menu"}
              aria-expanded={menu}
              aria-controls="mobile-navigation"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menu && (
          <motion.div
            className="sheet"
            id="mobile-navigation"
            role="navigation"
            aria-label="Mobile sections"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {navLinks.map((l, i) => (
              <motion.a
                key={l.href}
                href={onHome ? l.href : `/${l.href}`}
                onClick={jump(l.href)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.05, duration: 0.45 }}
              >
                {l.label}
              </motion.a>
            ))}
            <div className="sheet-foot">
              <a className="btn btn-ghost btn-sm" href={`mailto:${siteConfig.email}`}>Email Me</a>
              <a className="btn btn-ghost btn-sm" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>Call me</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
