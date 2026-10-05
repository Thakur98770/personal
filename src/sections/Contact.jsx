import { useState } from "react";
import { ArrowUpRight, CheckCircle2, Loader2, Mail, Phone, AlertCircle } from "lucide-react";
import { siteConfig } from "../config/site";
import Reveal from "../components/Reveal";
import Magnetic from "../components/Magnetic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Front-end only. Point `sendMessage` at your own endpoint
 * (e.g. POST /api/contact) — never put an email API key in here.
 */
async function sendMessage(payload, endpoint) {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Request failed");
  return { ok: true };
}

const mailtoFor = ({ name, email, subject, message }) => {
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState("idle"); // idle | sending | sent | draft | error

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    setErrors((x) => ({ ...x, [k]: null }));
  };

  const validate = () => {
    const e = {};
    if (values.name.trim().length < 2) e.name = "Tell me what to call you.";
    if (!EMAIL.test(values.email)) e.email = "That address doesn't look right.";
    if (values.subject.trim().length < 3) e.subject = "A few words about the subject.";
    if (values.message.trim().length < 12) e.message = "A little more detail helps.";
    setErrors(e);
    return !Object.keys(e).length;
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (!endpoint) {
      window.location.href = mailtoFor(values);
      setState("draft");
      return;
    }

    setState("sending");
    try {
      await sendMessage(values, endpoint);
      setState("sent");
      setValues({ name: "", email: "", subject: "", message: "" });
    } catch {
      setState("error");
    }
  };

  const field = (key, label, type = "text") => (
    <div className={`field${errors[key] ? " bad" : ""}`}>
      <label htmlFor={key}>{label}</label>
      <input
        id={key}
        name={key}
        type={type}
        value={values[key]}
        onChange={set(key)}
        required
        aria-invalid={!!errors[key]}
        aria-describedby={errors[key] ? `${key}-err` : undefined}
        autoComplete={key === "email" ? "email" : key === "name" ? "name" : "off"}
      />
      {errors[key] && <span className="err" id={`${key}-err`}>{errors[key]}</span>}
    </div>
  );

  return (
    <section id="contact">
      <div className="shell">
        <div className="section-head">
          <Reveal as="p" className="eyebrow">Contact</Reveal>
          <Reveal as="h2" className="section-title" delay={0.05}>
            Tell me about your project.
          </Reveal>
          <Reveal as="p" className="lead" delay={0.1}>
            Share a few details and I’ll get back to you. Or reach me directly by email or phone.
          </Reveal>
        </div>

        <div className="contact-grid">
          <Reveal>
            <form className="form" onSubmit={submit} noValidate>
              {field("name", "Your name")}
              {field("email", "Email", "email")}
              {field("subject", "Subject")}
              <div className={`field${errors.message ? " bad" : ""}`}>
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={values.message}
                  onChange={set("message")}
                  required
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-err" : undefined}
                />
                {errors.message && <span className="err" id="message-err">{errors.message}</span>}
              </div>

              <Magnetic>
                <button className="btn btn-solid contact-submit" type="submit" disabled={state === "sending"}>
                  {state === "sending" ? (
                    <><Loader2 className="spin" /> Sending</>
                  ) : (
                    <>{import.meta.env.VITE_CONTACT_ENDPOINT ? "Send message" : "Email Me"} <ArrowUpRight /></>
                  )}
                </button>
              </Magnetic>

              <div aria-live="polite">
                {state === "sent" && (
                  <p className="form-status ok"><CheckCircle2 size={16} /> Message sent. You'll hear back shortly.</p>
                )}
                {state === "draft" && (
                  <p className="form-status ok">
                    <Mail size={16} /> Your email app should open with this message ready. Press Send to deliver it.
                  </p>
                )}
                {state === "error" && (
                  <p className="form-status no">
                    <AlertCircle size={16} /> That didn't go through. Email me directly at{" "}
                    <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
                  </p>
                )}
              </div>

              <p className="form-note">
                {import.meta.env.VITE_CONTACT_ENDPOINT
                  ? "Your message is sent securely through the configured contact endpoint."
                  : <>Email Me opens your email app with the message addressed to <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. Review it there and press Send.</>}
              </p>
            </form>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="lead">Prefer a direct conversation?</p>
            <div className="contact-links">
              <a className="contact-link" href={`mailto:${siteConfig.email}`}>
                <span><Mail size={16} style={{ display: "inline", marginRight: 8 }} />{siteConfig.email}</span>
                <ArrowUpRight size={18} />
              </a>
              <a className="contact-link" href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}>
                <span><Phone size={16} style={{ display: "inline", marginRight: 8 }} />{siteConfig.phone}</span>
                <ArrowUpRight size={18} />
              </a>
              {[
                ["GitHub", siteConfig.socials.github],
                ["LinkedIn", siteConfig.socials.linkedin],
                ["Instagram", siteConfig.socials.instagram],
              ].filter(([, href]) => href).map(([label, href]) => (
                <a key={label} className="contact-link" href={href} target="_blank" rel="noreferrer">
                  <span>{label}</span><ArrowUpRight size={18} />
                </a>
              ))}
              {siteConfig.resume && (
                <a className="contact-link" href={siteConfig.resume} target="_blank" rel="noreferrer">
                  <span>Resume (PDF)</span><ArrowUpRight size={18} />
                </a>
              )}
            </div>
            <p className="muted contact-location" style={{ marginTop: "1.5rem" }}>
              Based in {siteConfig.location}. Comfortable working remote across time zones.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
