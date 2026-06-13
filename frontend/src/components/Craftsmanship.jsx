import { CRAFT_VIDEO } from "../data/products";

const PILLARS = [
  {
    n: "01",
    title: "The Loom",
    body:
      "Master weavers from Bhadohi and Mirzapur set warp and weft on traditional pit looms — the rhythm unchanged for five generations.",
  },
  {
    n: "02",
    title: "The Knot",
    body:
      "Each piece is hand-knotted, never machine-tufted. Premium rugs reach 300 KPSI; Luxury silk-blended editions exceed 500.",
  },
  {
    n: "03",
    title: "The Finish",
    body:
      "Hand-washed in spring water, then carved, clipped and bound — a final week of slow ritual before a rug ever ships.",
  },
];

export default function Craftsmanship() {
  return (
    <section
      id="craftsmanship"
      data-testid="craftsmanship-section"
      className="relative py-28 px-6 lg:px-16 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, var(--ka-navy-900) 0%, var(--ka-navy-950) 100%)",
      }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        {/* Video */}
        <div className="relative aspect-[4/5] lg:aspect-auto lg:h-[640px] overflow-hidden border border-[rgba(212,175,55,0.3)] grain">
          <video
            src={CRAFT_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover"
            data-testid="craftsmanship-video"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(6,14,34,0.55)] to-transparent" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="tier-chip mb-3">Our Atelier</div>
            <div className="font-display text-2xl sm:text-3xl text-[var(--ka-ivory)] leading-tight">
              Where threads become heirlooms.
            </div>
          </div>
        </div>

        {/* Text */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[var(--ka-gold-400)]" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-[var(--ka-gold-300)]">
              Craftsmanship
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl text-[var(--ka-ivory)] leading-[1.05]">
            Slow craft, by intention.
          </h2>
          <p className="font-serif-italic text-[var(--ka-ivory)]/75 text-xl mt-4">
            A Kanha carpet is never made — it is grown, knot by knot, over months.
          </p>

          <div className="mt-10 space-y-7">
            {PILLARS.map((p) => (
              <div key={p.n} className="flex gap-6">
                <div className="font-display text-3xl text-[var(--ka-gold-300)] w-16 shrink-0">
                  {p.n}
                </div>
                <div className="border-l border-[rgba(212,175,55,0.3)] pl-6">
                  <div className="font-display text-lg text-[var(--ka-ivory)] tracking-[0.2em] uppercase">
                    {p.title}
                  </div>
                  <p className="text-sm text-[var(--ka-ivory)]/70 mt-2 leading-relaxed max-w-md">
                    {p.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
