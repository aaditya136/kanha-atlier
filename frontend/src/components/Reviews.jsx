import { useState } from "react";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "../data/products";
import { REVIEWS } from "../data/reviews";
import { buildWhatsAppText } from "../lib/whatsapp";

// Optional: free key from web3forms.com (sends each review to your email).
// Without it, the review opens as a ready-to-send WhatsApp message instead.
const WEB3FORMS_KEY = process.env.REACT_APP_WEB3FORMS_KEY;

const field =
  "w-full bg-[var(--ka-navy-800)] border border-[var(--ka-line)] text-[var(--ka-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--ka-gold-400)] placeholder:text-[var(--ka-ivory)]/40";

function Stars({ value, size = 16 }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star
          key={n}
          size={size}
          className={n <= value ? "text-[var(--ka-gold-400)]" : "text-[var(--ka-ivory)]/25"}
          fill={n <= value ? "currentColor" : "none"}
        />
      ))}
    </span>
  );
}

export default function Reviews() {
  const [form, setForm] = useState({
    name: "",
    city: "",
    rating: 5,
    product: "",
    text: "",
    genuine: false,
    botcheck: "",
  });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const avg = REVIEWS.length
    ? (REVIEWS.reduce((s, r) => s + r.rating, 0) / REVIEWS.length).toFixed(1)
    : null;

  const submit = async (e) => {
    e.preventDefault();
    if (form.botcheck) return; // spam bots fill this hidden field
    if (form.name.trim().length < 2) return toast.error("Please enter your name.");
    if (form.text.trim().length < 20) return toast.error("Please write at least 20 characters.");
    if (!form.genuine) return toast.error("Please confirm you are a genuine customer or visitor.");

    const lines = [
      "New review for Kanha Atelier website",
      `Name: ${form.name.trim()}`,
      form.city.trim() && `City: ${form.city.trim()}`,
      `Rating: ${form.rating}/5`,
      form.product && `Product: ${form.product}`,
      `Review: ${form.text.trim()}`,
    ].filter(Boolean);
    const message = lines.join("\n");

    setBusy(true);
    try {
      if (WEB3FORMS_KEY) {
        const res = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: WEB3FORMS_KEY,
            subject: "New customer review - Kanha Atelier",
            from_name: form.name.trim(),
            message,
          }),
        });
        const data = await res.json();
        if (!data.success) throw new Error("send failed");
      } else {
        window.open(buildWhatsAppText(message), "_blank", "noopener,noreferrer");
      }
      setSent(true);
      setForm((f) => ({ ...f, name: "", city: "", rating: 5, product: "", text: "", genuine: false }));
      toast.success("Thank you! Your review will appear after we verify it.");
    } catch (err) {
      toast.error("Could not send right now. Please try again or message us on WhatsApp.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <section
      id="reviews"
      data-testid="reviews-section"
      className="relative py-28 px-6 lg:px-16 bg-[var(--ka-navy-950)]"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-[var(--ka-gold-400)]" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-[var(--ka-gold-300)]">
              Patron Reviews
            </span>
            <span className="w-10 h-px bg-[var(--ka-gold-400)]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--ka-ivory)]">
            Words from our patrons.
          </h2>
          <p className="font-serif-italic text-[var(--ka-ivory)]/75 text-xl mt-4">
            Share your experience with Kanha Atelier. Every review is checked
            before it appears here.
          </p>
          {avg && (
            <div className="mt-6 inline-flex items-center gap-3 text-[var(--ka-ivory)]">
              <Stars value={Math.round(Number(avg))} size={20} />
              <span className="font-display text-2xl">{avg}</span>
              <span className="text-sm text-[var(--ka-ivory)]/60">
                from {REVIEWS.length} review{REVIEWS.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Review list */}
          <div className="lg:col-span-3">
            {REVIEWS.length === 0 ? (
              <div
                className="border border-[var(--ka-line)] p-10 text-center text-[var(--ka-ivory)]/70"
                data-testid="reviews-empty"
              >
                <p className="font-serif-italic text-xl">No reviews yet.</p>
                <p className="text-sm mt-2">Be the first to share your experience.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" data-testid="reviews-list">
                {REVIEWS.map((r) => (
                  <article key={r.id} className="border border-[var(--ka-line)] bg-[var(--ka-navy-900)] p-6">
                    <Stars value={r.rating} />
                    <p className="text-sm text-[var(--ka-ivory)]/85 mt-4 font-serif leading-relaxed">
                      “{r.text}”
                    </p>
                    <div className="mt-5 text-[11px] tracking-[0.2em] uppercase text-[var(--ka-gold-300)]">
                      {r.name}
                      {r.city ? ` · ${r.city}` : ""}
                    </div>
                    {r.product && (
                      <div className="text-[11px] text-[var(--ka-ivory)]/50 mt-1">{r.product}</div>
                    )}
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Review form */}
          <form
            onSubmit={submit}
            className="lg:col-span-2 border border-[var(--ka-line)] bg-[var(--ka-navy-900)] p-6 sm:p-8 space-y-4"
            data-testid="review-form"
          >
            <h3 className="font-display text-2xl text-[var(--ka-ivory)]">Write a review</h3>

            <input className={field} placeholder="Your name *" value={form.name} onChange={set("name")} maxLength={60} />
            <input className={field} placeholder="City (optional)" value={form.city} onChange={set("city")} maxLength={60} />

            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/55 mb-2">Your rating</div>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    type="button"
                    key={n}
                    onClick={() => setForm((f) => ({ ...f, rating: n }))}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                    className="p-1"
                  >
                    <Star
                      size={26}
                      className={n <= form.rating ? "text-[var(--ka-gold-400)]" : "text-[var(--ka-ivory)]/25"}
                      fill={n <= form.rating ? "currentColor" : "none"}
                    />
                  </button>
                ))}
              </div>
            </div>

            <select className={field} value={form.product} onChange={set("product")}>
              <option value="">Which carpet? (optional)</option>
              {PRODUCTS.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>

            <textarea
              className={`${field} min-h-[130px]`}
              placeholder="Tell us about your experience *"
              value={form.text}
              onChange={set("text")}
              maxLength={800}
            />

            {/* hidden spam trap */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.botcheck}
              onChange={set("botcheck")}
              className="hidden"
              aria-hidden="true"
            />

            <label className="flex items-start gap-3 text-[12px] text-[var(--ka-ivory)]/75 cursor-pointer">
              <input type="checkbox" checked={form.genuine} onChange={set("genuine")} className="mt-0.5" />
              <span>I am a genuine customer / visitor of Kanha Atelier and this review is my own honest experience.</span>
            </label>

            <button
              type="submit"
              disabled={busy}
              className="btn-gold inline-flex items-center gap-2 disabled:opacity-60"
              data-testid="review-submit"
            >
              <Send size={14} />
              {busy ? "Sending…" : "Submit review"}
            </button>
            {sent && (
              <p className="text-[12px] text-[var(--ka-gold-300)]">
                Thank you! Your review will appear here after we verify it.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
