export default function Brand() {
  return (
    <>
      <svg className="brand-mark" viewBox="0 0 40 40" aria-hidden="true">
        <rect width="40" height="40" rx="12" fill="currentColor" />
        <text x="20" y="24" textAnchor="middle" fill="#fff" fontFamily="Arial, sans-serif" fontSize="12" fontWeight="700" letterSpacing="-1">CWA</text>
        <path d="M12 29h16" stroke="#68dbc1" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <span className="logo-name">
        <span className="brand-code">CodeWith</span><span className="brand-name">Abhiii</span>
      </span>
    </>
  );
}
