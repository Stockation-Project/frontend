import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NAV_LINKS = [
  { label: "Cara Kerja", href: "#cara-kerja" },
  { label: "Fitur", href: "#fitur" },
  { label: "Profil Risiko", href: "#profil-risiko" },
  { label: "FAQ", href: "#faq" },
];

const LandingNavbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-primary/90 backdrop-blur-md border-b border-border-primary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-12">
        {/* Logo */}
        <div className="flex items-center gap-2 font-bold text-text-primary">
          <div className="w-7 h-7 bg-brand rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          Stockation
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6 text-sm text-text-muted">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="hover:text-text-primary transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => navigate("/login")}
            className="text-sm text-text-secondary hover:text-text-primary px-3 py-1.5 transition-colors cursor-pointer"
          >
            Masuk
          </button>
          <button
            onClick={() => navigate("/register")}
            className="text-sm font-regular bg-brand hover:bg-brand-950 text-white px-4 py-1 rounded-lg transition-colors cursor-pointer"
          >
            Daftar
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 rounded-lg hover:bg-background-secondary" onClick={() => setOpen(!open)}>
          <svg className="w-5 h-5 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border-primary bg-background-primary px-4 py-3 flex flex-col gap-3">
          {NAV_LINKS.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setOpen(false)} className="text-sm text-text-secondary py-1">
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 pt-2 border-t border-border-primary">
            <button onClick={() => navigate("/login")} className="flex-1 text-sm border border-border-primary rounded-lg py-2 text-text-secondary">
              Masuk
            </button>
            <button onClick={() => navigate("/register")} className="flex-1 text-sm bg-yellow-400 text-white rounded-lg py-2 font-regular">
              Daftar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default LandingNavbar;
