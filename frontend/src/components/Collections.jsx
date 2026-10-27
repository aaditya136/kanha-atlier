import { useMemo, useState } from "react";
import { PRODUCTS } from "../data/products";
import { formatPrice, formatSizePrice } from "../lib/currency";
import ProductModal from "./ProductModal";
import { buildWhatsAppLink } from "../lib/whatsapp";
import { MessageCircle } from "lucide-react";

const TIERS = ["All", "Luxury", "Premium", "Standard", "Budget"];

export default function Collections({ currencyCtx }) {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState(null);

  const items = useMemo(
    () =>
      filter === "All"
        ? PRODUCTS
        : PRODUCTS.filter((p) => p.tier === filter),
    [filter]
  );

  return (
    <section
      id="collections"
      data-testid="collections-section"
      className="relative py-28 px-6 lg:px-16 bg-[var(--ka-navy-900)]"
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-10 h-px bg-[var(--ka-gold-400)]" />
              <span className="text-[11px] tracking-[0.4em] uppercase text-[var(--ka-gold-300)]">
                The Collections
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--ka-ivory)] leading-[1.05]">
              Carpets &amp; Heirlooms,
              <br />
              <span className="text-[var(--ka-gold-300)] font-serif-italic">
                woven slowly.
              </span>
            </h2>
            <p className="mt-5 text-[var(--ka-ivory)]/65 max-w-xl">
              Filter by craftsmanship tier. Every order is bespoke — confirm
              dimensions, palette and timelines directly with the atelier.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3" data-testid="tier-filter">
            {TIERS.map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                data-testid={`tier-filter-${t.toLowerCase()}`}
                className={`px-4 py-2 text-[11px] tracking-[0.25em] uppercase border transition-all ${
                  filter === t
                    ? "border-[var(--ka-gold-400)] text-[var(--ka-navy-900)] bg-[var(--ka-gold-400)]"
                    : "border-[rgba(212,175,55,0.35)] text-[var(--ka-ivory)]/80 hover:border-[var(--ka-gold-400)] hover:text-[var(--ka-gold-300)]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="gold-rule mb-12" />

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="product-grid">
          {items.map((p) => {
            const priceLabel = p.sizes
              ? formatSizePrice(p.sizes[0], currencyCtx)
              : formatPrice(p.priceINR, currencyCtx);
            const link = buildWhatsAppLink({
              productName: p.name,
              productId: p.id,
              priceLabel,
            });
            return (
              <article
                key={p.id}
                className="ka-card group flex flex-col"
                data-testid={`product-card-${p.id}`}
              >
                <div
                  className="relative aspect-[4/5] overflow-hidden bg-[var(--ka-navy-800)] cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label={`View ${p.name} photos and sizes`}
                  onClick={() => setSelected(p)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelected(p);
                    }
                  }}
                  data-testid={`product-open-${p.id}`}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(6,14,34,0.85)] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="tier-chip" data-testid={`product-tier-${p.id}`}>
                      {p.tier}
                    </span>
                  </div>
                  {p.images.length > 1 && (
                    <div className="absolute top-4 right-4">
                      <span className="tier-chip">
                        {p.colors ? `${p.colors.length} colours` : `${p.images.length} photos`}
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/55">
                        {p.id}
                      </div>
                      <div className="font-display text-xl sm:text-2xl text-[var(--ka-ivory)] mt-1">
                        {p.name}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="grid grid-cols-2 gap-3 text-[11px] text-[var(--ka-ivory)]/65">
                    <div>
                      <div className="text-[9px] tracking-[0.25em] uppercase text-[var(--ka-gold-300)]/80">
                        Material
                      </div>
                      <div className="mt-1">{p.material}</div>
                    </div>
                    <div>
                      <div className="text-[9px] tracking-[0.25em] uppercase text-[var(--ka-gold-300)]/80">
                        Origin
                      </div>
                      <div className="mt-1">{p.origin}</div>
                    </div>
                    <div>
                      <div className="text-[9px] tracking-[0.25em] uppercase text-[var(--ka-gold-300)]/80">
                        Knot density
                      </div>
                      <div className="mt-1">{p.knotCount}</div>
                    </div>
                    <div>
                      <div className="text-[9px] tracking-[0.25em] uppercase text-[var(--ka-gold-300)]/80">
                        Size
                      </div>
                      <div className="mt-1">{p.size}</div>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--ka-ivory)]/70 mt-5 font-serif leading-relaxed">
                    {p.description}
                  </p>

                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className="mt-4 self-start text-[11px] tracking-[0.25em] uppercase text-[var(--ka-gold-300)] hover:text-[var(--ka-gold-400)] underline underline-offset-4"
                    data-testid={`product-details-${p.id}`}
                  >
                    {p.sizes ? "View photos, colours & sizes" : "View details"}
                  </button>

                  <div className="mt-6 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/55">
                        From
                      </div>
                      <div
                        className="font-display text-2xl text-[var(--ka-gold-300)]"
                        data-testid={`product-price-${p.id}`}
                      >
                        {priceLabel}
                      </div>
                    </div>

                    <a
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-gold inline-flex items-center gap-2"
                      data-testid={`product-whatsapp-${p.id}`}
                    >
                      <MessageCircle size={14} />
                      Order via WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selected && (
        <ProductModal
          key={selected.id}
          product={selected}
          currencyCtx={currencyCtx}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
