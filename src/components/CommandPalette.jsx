import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Home, User, Braces, FolderGit2, Mail, Github, Linkedin,
  FileText, Sun, Moon, CornerDownLeft,
} from "lucide-react";
import { siteConfig } from "../config/site";

/** Ctrl/⌘ + K. Jumps around the site and opens the obvious links. */
export default function CommandPalette({ open, setOpen, theme, toggleTheme }) {
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const input = useRef(null);

  const go = (hash) => () => {
    if (location.hash.startsWith("#/")) location.hash = "#/";
    setTimeout(() => {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    }, 60);
  };
  const openUrl = (url) => () => window.open(url, "_blank", "noopener");

  const commands = useMemo(
    () => [
      { label: "Go to top", icon: Home, run: go("#home") },
      { label: "About", icon: User, run: go("#about") },
      { label: "Skills", icon: Braces, run: go("#skills") },
      { label: "Selected work", icon: FolderGit2, run: go("#work") },
      { label: "Contact", icon: Mail, run: go("#contact") },
      {
        label: "Email Abhishek",
        icon: Mail,
        run: () => { window.location.href = `mailto:${siteConfig.email}`; },
      },
      ...(siteConfig.socials.github
        ? [{ label: "Open GitHub", icon: Github, run: openUrl(siteConfig.socials.github) }]
        : []),
      ...(siteConfig.socials.linkedin
        ? [{ label: "Open LinkedIn", icon: Linkedin, run: openUrl(siteConfig.socials.linkedin) }]
        : []),
      ...(siteConfig.resume
        ? [{ label: "View resume", icon: FileText, run: openUrl(siteConfig.resume) }]
        : []),
      {
        label: theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
        icon: theme === "dark" ? Sun : Moon,
        run: toggleTheme,
      },
    ],
    [theme, toggleTheme]
  );

  const list = commands.filter((c) => c.label.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => input.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", open);
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  if (!open) return null;

  const onKey = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setI((n) => (n + 1) % Math.max(list.length, 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setI((n) => (n - 1 + list.length) % Math.max(list.length, 1)); }
    if (e.key === "Enter") { e.preventDefault(); list[i]?.run(); setOpen(false); }
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <div
      className="palette-wrap"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
    >
      <motion.div
        className="palette glass"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        initial={{ opacity: 0, y: -14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <input
          ref={input}
          value={q}
          onChange={(e) => { setQ(e.target.value); setI(0); }}
          onKeyDown={onKey}
          placeholder="Where to?"
          aria-label="Search commands"
        />
        {list.length ? (
          <ul role="listbox">
            {list.map((c, n) => (
              <li key={c.label} role="option" aria-selected={n === i}>
                <button onMouseEnter={() => setI(n)} onClick={() => { c.run(); setOpen(false); }}>
                  <c.icon aria-hidden="true" />
                  {c.label}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="empty">Nothing matches “{q}”. Try “work” or “resume”.</p>
        )}
        <div className="pal-foot">
          <span>↑↓ move</span>
          <span><CornerDownLeft size={11} style={{ display: "inline" }} /> open</span>
          <span>esc close</span>
        </div>
      </motion.div>
    </div>
  );
}
