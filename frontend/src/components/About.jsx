import { LOGOS } from "../data/products";

export default function About() {
  return (
    <section
      id="about"
      data-testid="about-section"
      className="relative py-28 px-6 lg:px-16 bg-[var(--ka-navy-950)]"
    >
      <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-14">
        <div className="lg:col-span-5">
          <div className="relative aspect-square border border-[rgba(212,175,55,0.35)] p-10 flex items-center justify-center bg-[var(--ka-navy-900)]">
            <div className="absolute -top-4 -left-4 w-20 h-20 border-t border-l border-[var(--ka-gold-400)]" />
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b border-r border-[var(--ka-gold-400)]" />
            <img
              src={LOGOS.emblem}
              alt="Kanha Atelier emblem"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-10 h-px bg-[var(--ka-gold-400)]" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-[var(--ka-gold-300)]">
              The Atelier
            </span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl text-[var(--ka-ivory)] leading-[1.05]">
            A family of weavers,
            <br />
            <span className="font-serif-italic text-[var(--ka-gold-300)]">
              now answering the world.
            </span>
          </h2>

          <div className="mt-8 space-y-5 text-[var(--ka-ivory)]/75 font-serif text-lg leading-relaxed">
            <p>
              Kanha Atelier began three generations ago in the carpet town of
              Bhadohi — quiet streets where every other doorway hides a loom,
              and where a single rug can mean a year of patient work.
            </p>
            <p>
              Today we work with thirty-eight master weavers across Bhadohi,
              Mirzapur and a small Kashmiri silk studio. Our craft hasn&apos;t
              changed; our reach has. From private clients in Mumbai and Delhi,
              we now ship our heirlooms to homes across the United States,
              Europe and the Gulf.
            </p>
            <p>
              Every Kanha piece carries the hands that made it — and a
              numbered certificate that travels with it for life.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              ["1962", "Atelier founded"],
              ["38", "Master weavers"],
              ["12+", "Countries served"],
            ].map(([k, v]) => (
              <div key={v} className="border-t border-[rgba(212,175,55,0.3)] pt-4">
                <div className="font-display text-3xl text-[var(--ka-gold-300)]">{k}</div>
                <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/55 mt-2">
                  {v}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
