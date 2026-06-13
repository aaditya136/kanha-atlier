import { Instagram, ExternalLink } from "lucide-react";
import { PRODUCTS } from "../data/products";

const INSTAGRAM_HANDLE = "kanha_enterprises_carpet";
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_HANDLE}`;

// Lightweight, zero-credit Instagram strip: 6 hand-picked recent posts
// represented via the catalog imagery. Each tile links to the IG profile.
// Switch to live oEmbed only if needed — keeps build cost low.
const TILES = [
  { img: PRODUCTS[10].image, caption: "Onyx Versailles · Silk" },
  { img: PRODUCTS[8].image, caption: "Emerald Court · Kashmir" },
  { img: PRODUCTS[9].image, caption: "Indigo Garden Tabriz" },
  { img: PRODUCTS[11].image, caption: "Midnight Floral Kashan" },
  { img: PRODUCTS[2].image, caption: "Sapphire Mandala" },
  { img: PRODUCTS[14].image, caption: "Crimson Mughal Court" },
];

export default function InstagramStrip() {
  return (
    <section
      id="atelier-gram"
      data-testid="instagram-strip"
      className="relative py-24 px-6 lg:px-16 bg-[var(--ka-navy-900)]"
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-[var(--ka-gold-400)]" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-[var(--ka-gold-300)]">
                The Atelier · On Instagram
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[var(--ka-ivory)] leading-[1.05]">
              From the loom, to your{" "}
              <span className="font-serif-italic text-[var(--ka-gold-300)]">feed.</span>
            </h2>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-[var(--ka-ivory)]/75 hover:text-[var(--ka-gold-300)] transition-colors"
              data-testid="instagram-handle-link"
            >
              <Instagram size={16} />
              <span className="font-display tracking-[0.2em]">
                @{INSTAGRAM_HANDLE}
              </span>
            </a>
          </div>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className="btn-outline-gold inline-flex items-center gap-2 self-start lg:self-auto"
            data-testid="instagram-follow-cta"
          >
            <Instagram size={14} />
            Follow on Instagram
          </a>
        </div>

        <div className="gold-rule mb-10" />

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {TILES.map((t, i) => (
            <a
              key={i}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noreferrer"
              data-testid={`instagram-tile-${i}`}
              className="group relative aspect-square overflow-hidden border border-[rgba(212,175,55,0.25)] bg-[var(--ka-navy-800)]"
              title={`Open @${INSTAGRAM_HANDLE} on Instagram`}
            >
              <img
                src={t.img}
                alt={t.caption}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,14,34,0.95)] via-[rgba(6,14,34,0.25)] to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-2 text-[var(--ka-ivory)] bg-[rgba(6,14,34,0.55)] backdrop-blur-sm px-3 py-2 border border-[rgba(212,175,55,0.5)]">
                  <Instagram size={14} className="text-[var(--ka-gold-300)]" />
                  <span className="text-[10px] tracking-[0.3em] uppercase">View</span>
                  <ExternalLink size={12} />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 right-2 text-[10px] tracking-[0.2em] uppercase text-[var(--ka-ivory)]/85">
                {t.caption}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
