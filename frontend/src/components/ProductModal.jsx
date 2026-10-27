import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, MessageCircle, X } from "lucide-react";
import { formatPrice, formatSizePrice } from "../lib/currency";
import { buildWhatsAppLink } from "../lib/whatsapp";

export default function ProductModal({ product: p, currencyCtx, onClose }) {
  const [active, setActive] = useState(0);
  const [sizeIdx, setSizeIdx] = useState(0);
  const [colorIdx, setColorIdx] = useState(0);

  const color = p.colors ? p.colors[colorIdx] : null;
  const images = color ? color.images : p.images;
  const count = images.length;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + count) % count);
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [count, onClose]);

  const pickColor = (i) => {
    setColorIdx(i);
    setActive(0);
  };

  const sizeLabel = p.sizes ? p.sizes[sizeIdx].size : p.size;
  const priceLabel = p.sizes
    ? formatSizePrice(p.sizes[sizeIdx], currencyCtx)
    : formatPrice(p.priceINR, currencyCtx);
  const link = buildWhatsAppLink({
    productName: p.name,
    productId: p.id,
    priceLabel,
    size: sizeLabel,
    color: color ? color.name : undefined,
  });

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start sm:items-center justify-center bg-black/80 p-0 sm:p-6 overflow-y-auto"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={p.name}
      data-testid="product-modal"
    >
      <div
        className="relative w-full max-w-[1100px] bg-[var(--ka-navy-900)] border border-[rgba(212,175,55,0.35)] grid grid-cols-1 md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 p-2 bg-black/50 text-[var(--ka-ivory)] hover:text-[var(--ka-gold-300)]"
          data-testid="product-modal-close"
        >
          <X size={20} />
        </button>

        {/* Gallery */}
        <div className="p-4 sm:p-6">
          <div className="relative aspect-square bg-[var(--ka-navy-800)] overflow-hidden">
            <img
              src={images[active]}
              alt={`${p.name} – photo ${active + 1}`}
              className="absolute inset-0 w-full h-full object-contain"
            />
            {count > 1 && (
              <>
                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() => setActive((i) => (i - 1 + count) % count)}
                  className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-[var(--ka-ivory)] hover:text-[var(--ka-gold-300)]"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() => setActive((i) => (i + 1) % count)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 text-[var(--ka-ivory)] hover:text-[var(--ka-gold-300)]"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div className="flex gap-2 mt-3 overflow-x-auto pb-1" data-testid="product-thumbs">
              {images.map((src, i) => (
                <button
                  type="button"
                  key={src}
                  onClick={() => setActive(i)}
                  aria-label={`Show photo ${i + 1}`}
                  className={`flex-none w-16 h-16 overflow-hidden border-2 ${
                    i === active
                      ? "border-[var(--ka-gold-400)]"
                      : "border-transparent opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 md:pt-12 flex flex-col">
          <span className="tier-chip self-start">{p.tier}</span>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/55 mt-4">
            {p.id}
          </div>
          <h3 className="font-display text-3xl text-[var(--ka-ivory)] mt-1">{p.name}</h3>
          <p className="text-sm text-[var(--ka-ivory)]/70 mt-4 font-serif leading-relaxed">
            {p.description}
          </p>

          <div className="grid grid-cols-2 gap-3 text-[11px] text-[var(--ka-ivory)]/65 mt-6">
            <div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-[var(--ka-gold-300)]/80">Material</div>
              <div className="mt-1">{p.material}</div>
            </div>
            <div>
              <div className="text-[9px] tracking-[0.25em] uppercase text-[var(--ka-gold-300)]/80">Origin</div>
              <div className="mt-1">{p.origin}</div>
            </div>
          </div>

          {p.colors && (
            <div className="mt-6" data-testid="color-options">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/55 mb-2">
                Colour · <span className="text-[var(--ka-gold-300)]">{color.name}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {p.colors.map((c, i) => (
                  <button
                    type="button"
                    key={c.name}
                    onClick={() => pickColor(i)}
                    aria-label={`Colour ${c.name}`}
                    title={c.name}
                    className={`flex items-center gap-2 px-3 py-2 text-[11px] border transition-all ${
                      i === colorIdx
                        ? "border-[var(--ka-gold-400)] bg-[rgba(231,198,106,0.12)] text-[var(--ka-ivory)]"
                        : "border-[rgba(212,175,55,0.35)] text-[var(--ka-ivory)]/75 hover:border-[var(--ka-gold-400)]"
                    }`}
                  >
                    <span
                      className="inline-block w-4 h-4 rounded-full border border-white/30"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {p.sizes ? (
            <div className="mt-6">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/55 mb-2">
                Choose size (feet)
              </div>
              <div className="flex flex-wrap gap-2" data-testid="size-options">
                {p.sizes.map((s, i) => (
                  <button
                    type="button"
                    key={s.size}
                    onClick={() => setSizeIdx(i)}
                    className={`px-3 py-2 text-[11px] tracking-[0.1em] border transition-all ${
                      i === sizeIdx
                        ? "border-[var(--ka-gold-400)] bg-[var(--ka-gold-400)] text-[var(--ka-navy-900)]"
                        : "border-[rgba(212,175,55,0.35)] text-[var(--ka-ivory)]/80 hover:border-[var(--ka-gold-400)]"
                    }`}
                  >
                    {s.size.replace(/ ft/g, "")}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-6 text-[12px] text-[var(--ka-ivory)]/70">Size: {p.size}</div>
          )}

          <div className="mt-8 flex items-center justify-between gap-4 flex-wrap">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/55">
                {p.sizes ? `Price · ${sizeLabel}` : "From"}
              </div>
              <div className="font-display text-3xl text-[var(--ka-gold-300)]" data-testid="product-modal-price">
                {priceLabel}
              </div>
            </div>
            <a
              href={link}
              target="_blank"
              rel="noreferrer"
              className="btn-gold inline-flex items-center gap-2"
              data-testid="product-modal-whatsapp"
            >
              <MessageCircle size={14} />
              Order via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
