import { useEffect, useRef, useState } from "react";
import { VIDEOS } from "../data/products";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  const [idx, setIdx] = useState(0);
  const videoRefs = useRef([]);

  // Cycle videos every ~9s with crossfade
  useEffect(() => {
    const t = setInterval(() => {
      setIdx((i) => (i + 1) % VIDEOS.length);
    }, 9000);
    return () => clearInterval(t);
  }, []);

  // Try play whenever active video changes (autoplay sometimes blocks)
  useEffect(() => {
    const v = videoRefs.current[idx];
    if (v) {
      v.play().catch(() => {});
    }
  }, [idx]);

  const scrollNext = () => {
    const el = document.getElementById("collections");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      data-testid="hero-section"
      className="relative min-h-[100vh] w-full overflow-hidden grain gold-frame"
    >
      {/* Video stack */}
      <div className="absolute inset-0">
        {VIDEOS.map((src, i) => (
          <video
            key={src}
            ref={(el) => (videoRefs.current[i] = el)}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-[1600ms] ease-in-out ${
              i === idx ? "opacity-100 video-fade" : "opacity-0"
            }`}
            data-testid={`hero-video-${i}`}
          />
        ))}
        {/* Dark overlays for legibility — softer to let the woven craft videos shine */}
        <div className="absolute inset-0 bg-[rgba(6,14,34,0.38)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(6,14,34,0.25)] via-transparent to-[rgba(6,14,34,0.92)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,14,34,0.6)] via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-16 pt-40 pb-28 min-h-[100vh] flex flex-col justify-center">
        <div className="max-w-3xl fade-rise">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-[var(--ka-gold-400)]" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-[var(--ka-gold-300)]">
              Est. Heritage Atelier — India
            </span>
          </div>

          <h1
            data-testid="hero-heading"
            className="font-display text-[44px] sm:text-[64px] lg:text-[86px] leading-[1.02] text-[var(--ka-ivory)]"
          >
            Woven Heritage,
            <br />
            <span className="text-[var(--ka-gold-300)]">Elevated Living.</span>
          </h1>

          <p className="font-serif-italic text-[var(--ka-ivory)]/80 text-xl sm:text-2xl mt-6">
            Handcrafted Carpets &amp; Home Decor — knotted by hand, finished in gold.
          </p>

          <p className="text-[var(--ka-ivory)]/65 text-sm sm:text-base max-w-xl mt-6 leading-relaxed">
            From the looms of Bhadohi and the silk ateliers of Kashmir, each
            Kanha piece is a quiet rebellion against the ordinary — a slow
            craft of indigo, ivory, and gold for the world&apos;s most particular homes.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                const el = document.getElementById("collections");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-gold"
              data-testid="hero-cta-collections"
            >
              Explore Collections
            </button>
            <a
              href={buildWhatsAppLink({})}
              target="_blank"
              rel="noreferrer"
              className="btn-outline-gold"
              data-testid="hero-cta-whatsapp"
            >
              Speak to the Atelier
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {[
              ["38+", "Master weavers"],
              ["500", "Knots / sq.in"],
              ["6 mo", "Avg. craft time"],
            ].map(([k, v]) => (
              <div key={v}>
                <div className="font-display text-2xl sm:text-3xl text-[var(--ka-gold-300)]">{k}</div>
                <div className="text-[10px] tracking-[0.25em] uppercase text-[var(--ka-ivory)]/55 mt-1">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <button
        onClick={scrollNext}
        className="absolute z-10 left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center text-[var(--ka-ivory)]/60 hover:text-[var(--ka-gold-300)] transition-colors"
        data-testid="hero-scroll-cue"
      >
        <span className="text-[10px] tracking-[0.4em] uppercase">Scroll</span>
        <ChevronDown size={20} className="mt-1 animate-bounce" />
      </button>

      {/* Video pager */}
      <div className="absolute z-10 right-6 lg:right-12 bottom-10 flex flex-col gap-2">
        {VIDEOS.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            data-testid={`hero-video-dot-${i}`}
            className={`h-6 w-px transition-all ${
              i === idx ? "bg-[var(--ka-gold-400)] h-10" : "bg-[var(--ka-ivory)]/30"
            }`}
            aria-label={`video ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
