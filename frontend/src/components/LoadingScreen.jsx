import { useEffect, useState } from "react";
import { LOGOS } from "../data/products";

export default function LoadingScreen({ onDone, ready }) {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Minimum graceful viewing of the loader; if currency context resolves
    // before this, dismiss right after the min-show. If it takes longer,
    // wait for it (capped at 4.5s hard ceiling so we never block forever).
    const minShow = 2200;
    const hardCap = 4500;
    const startedAt = Date.now();

    let t2;
    const t1 = setTimeout(function tryLeave() {
      const elapsed = Date.now() - startedAt;
      if (ready || elapsed >= hardCap) {
        setLeaving(true);
        t2 = setTimeout(() => onDone?.(), 600);
      } else {
        // poll until ready or hard cap reached
        const poll = setInterval(() => {
          if (ready || Date.now() - startedAt >= hardCap) {
            clearInterval(poll);
            setLeaving(true);
            t2 = setTimeout(() => onDone?.(), 600);
          }
        }, 150);
      }
    }, minShow);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [onDone, ready]);

  return (
    <div
      data-testid="loading-screen"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 ${
        leaving ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "radial-gradient(1200px 600px at 50% 50%, #142347 0%, #0a1733 60%, #060e22 100%)",
      }}
    >
      <div className="relative">
        <div className="absolute -inset-10 rounded-full border border-[rgba(212,175,55,0.18)] spin-slow" />
        <div className="absolute -inset-16 rounded-full border border-[rgba(212,175,55,0.08)]" />
        <img
          src={LOGOS.monogram}
          alt="Kanha Atelier KA monogram"
          className="relative w-32 h-32 sm:w-40 sm:h-40 object-cover rounded-sm border border-[rgba(212,175,55,0.45)]"
          data-testid="loading-monogram"
        />
      </div>

      <div className="mt-10 font-display text-2xl sm:text-3xl tracking-[0.45em] text-[var(--ka-gold-300)]">
        <span className="shimmer-gold">KANHA&nbsp;ATELIER</span>
      </div>
      <div className="mt-3 font-serif-italic text-[var(--ka-ivory)]/70 text-sm sm:text-base">
        Woven Heritage, Elevated Living
      </div>

      <div className="mt-10 w-44 h-[2px] bg-[rgba(212,175,55,0.18)] overflow-hidden">
        <div className="h-full bg-[var(--ka-gold-400)] loadbar" />
      </div>
    </div>
  );
}
