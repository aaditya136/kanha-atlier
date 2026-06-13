import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { LOGOS } from "../data/products";
import { readOverride, writeOverride } from "../lib/currency";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "collections", label: "Collections" },
  { id: "craftsmanship", label: "Craftsmanship" },
  { id: "atelier-gram", label: "Instagram" },
  { id: "about", label: "Atelier" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ currencyCtx, onCurrencyChange }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [curOpen, setCurOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e) => {
      if (!e.target.closest("[data-currency-menu]")) setCurOpen(false);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const scrollTo = (id) => {
    setOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const curLabel = currencyCtx?.geo
    ? `${currencyCtx.geo.symbol} ${currencyCtx.geo.currency}`
    : "—";

  const setCurrency = (mode) => {
    // mode: "AUTO" | "INR" | "USD"
    writeOverride(mode === "AUTO" ? null : mode);
    setCurOpen(false);
    onCurrencyChange?.();
  };

  const override = readOverride();

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

        <nav className="hidden lg:flex items-center gap-8">
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
          {/* Currency toggle */}
          <div className="relative hidden md:block" data-currency-menu>
            <button
              onClick={() => setCurOpen((v) => !v)}
              className="tier-chip cursor-pointer inline-flex items-center gap-2"
              data-testid="currency-indicator"
              title={currencyCtx?.geo?.country_name || ""}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--ka-gold-400)]" />
              {curLabel}
              <ChevronDown size={12} />
            </button>
            {curOpen && (
              <div
                className="absolute right-0 mt-2 w-56 bg-[#060e22] border border-[rgba(212,175,55,0.35)] shadow-2xl z-50"
                data-testid="currency-menu"
              >
                <div className="px-4 py-3 border-b border-[rgba(212,175,55,0.2)] text-[10px] tracking-[0.3em] uppercase text-[var(--ka-gold-300)]/80">
                  Select Currency
                </div>
                {[
                  { k: "AUTO", label: "Auto (by location)", hint: !override ? "active" : "" },
                  { k: "INR", label: "₹ Indian Rupee", hint: override === "INR" ? "active" : "" },
                  { k: "USD", label: "$ US Dollar", hint: override === "USD" ? "active" : "" },
                ].map((opt) => (
                  <button
                    key={opt.k}
                    onClick={() => setCurrency(opt.k)}
                    data-testid={`currency-option-${opt.k.toLowerCase()}`}
                    className="w-full flex items-center justify-between px-4 py-3 text-left text-sm text-[var(--ka-ivory)]/85 hover:bg-[rgba(212,175,55,0.08)] hover:text-[var(--ka-gold-300)] transition-colors"
                  >
                    <span>{opt.label}</span>
                    {opt.hint && (
                      <span className="text-[9px] tracking-[0.3em] uppercase text-[var(--ka-gold-400)]">
                        {opt.hint}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

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
            <div className="flex flex-wrap gap-2">
              {["AUTO", "INR", "USD"].map((k) => (
                <button
                  key={k}
                  onClick={() => setCurrency(k)}
                  data-testid={`mobile-currency-${k.toLowerCase()}`}
                  className={`px-3 py-1.5 text-[10px] tracking-[0.25em] uppercase border ${
                    (k === "AUTO" && !override) || override === k
                      ? "border-[var(--ka-gold-400)] text-[var(--ka-gold-300)]"
                      : "border-[rgba(212,175,55,0.3)] text-[var(--ka-ivory)]/70"
                  }`}
                >
                  {k === "AUTO" ? "Auto" : k === "INR" ? "₹ INR" : "$ USD"}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
