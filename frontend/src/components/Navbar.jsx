import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LOGOS } from "../data/products";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "collections", label: "Collections" },
  { id: "craftsmanship", label: "Craftsmanship" },
  { id: "about", label: "Atelier" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ currencyCtx }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const curLabel = currencyCtx?.geo
    ? `${currencyCtx.geo.symbol} ${currencyCtx.geo.currency}`
    : "—";

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-[rgba(6,14,34,0.78)] border-b border-[rgba(212,175,55,0.25)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-3 group"
          data-testid="navbar-logo"
        >
          <img
            src={LOGOS.monogram}
            alt="KA"
            className="w-11 h-11 object-cover border border-[rgba(212,175,55,0.5)]"
          />
          <div className="leading-tight hidden sm:block">
            <div className="font-display text-[var(--ka-gold-300)] tracking-[0.35em] text-sm">
              KANHA ATELIER
            </div>
            <div className="font-serif-italic text-[var(--ka-ivory)]/60 text-[10px]">
              Woven Heritage, Elevated Living
            </div>
          </div>
        </button>

        <nav className="hidden lg:flex items-center gap-10">
          {LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              data-testid={`nav-link-${l.id}`}
              className="text-[12px] tracking-[0.28em] uppercase text-[var(--ka-ivory)]/80 hover:text-[var(--ka-gold-300)] transition-colors"
            >
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span
            data-testid="currency-indicator"
            className="hidden md:inline-flex tier-chip"
            title={currencyCtx?.geo?.country_name || ""}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--ka-gold-400)]" />
            {curLabel}
          </span>
          <button
            onClick={() => scrollTo("contact")}
            className="hidden md:inline-block btn-outline-gold"
            data-testid="nav-cta-enquire"
          >
            Enquire
          </button>
          <button
            className="lg:hidden text-[var(--ka-gold-300)]"
            onClick={() => setOpen((v) => !v)}
            data-testid="nav-mobile-toggle"
            aria-label="menu"
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="lg:hidden bg-[#060e22] border-t border-[rgba(212,175,55,0.25)]"
          data-testid="mobile-menu"
        >
          <div className="px-6 py-6 flex flex-col gap-5">
            {LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left text-[13px] tracking-[0.28em] uppercase text-[var(--ka-ivory)]/85"
                data-testid={`mobile-nav-link-${l.id}`}
              >
                {l.label}
              </button>
            ))}
            <div className="gold-rule" />
            <div className="tier-chip self-start">{curLabel}</div>
          </div>
        </div>
      )}
    </header>
  );
}
