import { siteConfig } from "../config/site";

/** Duplicated once so the loop is seamless at -50%. */
export default function Marquee() {
  const row = [...siteConfig.marquee, ...siteConfig.marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div className="marquee-item" key={k}>
            {row.map((word, i) => (
              <span key={`${word}-${i}`} style={{ display: "inline-flex", alignItems: "center", gap: "2.5rem" }}>
                {word} <i />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
