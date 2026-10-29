import { useEffect, useState } from "react";
import { Star, Send } from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS } from "../data/products";
import { fetchReviews, addReview } from "../lib/supabase";

const field =
  "w-full bg-[var(--ka-navy-800)] border border-[var(--ka-line)] text-[var(--ka-ivory)] px-4 py-3 text-sm outline-none focus:border-[var(--ka-gold-400)] placeholder:text-[var(--ka-ivory)]/40";

const COOLDOWN_MS = 10 * 60 * 1000; // one review per device every 10 minutes
const LINK_RE = /(https?:\/\/|www\.)/i;

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

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
  } catch (e) {
    return "";
  }
};

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ready | error
  const [form, setForm] = useState({
    name: "",
    city: "",
    rating: 5,
    product: "",
    body: "",
    genuine: false,
    botcheck: "",
  });
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let alive = true;
    fetchReviews()
      .then((rows) => {
        if (!alive) return;
        setReviews(Array.isArray(rows) ? rows : []);
        setStatus("ready");
      })
      .catch(() => alive && setStatus("error"));
    return () => {
      alive = false;
    };
  }, []);

  const set = (k) => (e) =>
    setForm((f) => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const avg = reviews.length ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1) : null;

  const submit = async (e) => {
    e.preventDefault();
    if (form.botcheck) return; // spam bots fill this hidden field
    const name = form.name.trim();
    const body = form.body.trim();
    if (name.length < 2) return toast.error("Please enter your name.");
    if (body.length < 20) return toast.error("Please write at least 20 characters.");
    if (LINK_RE.test(body)) return toast.error("Links are not allowed in reviews.");
    if (!form.genuine) return toast.error("Please confirm this is your own honest experience.");

    try {
      const last = Number(localStorage.getItem("ka_last_review") || 0);
      if (Date.now() - last < COOLDOWN_MS) {
        return toast.error("You have just posted a review. Please try again a little later.");
      }
    } catch (err) {
      /* storage blocked - ignore */
    }

    const row = {
      name,
      city: form.city.trim() || null,
      rating: form.rating,
      product: form.product || null,
      body,
    };

    setBusy(true);
    try {
      await addReview(row);
      try {
        localStorage.setItem("ka_last_review", String(Date.now()));
      } catch (err) {
        /* ignore */
      }
      setReviews((list) => [{ id: `new-${Date.now()}`, created_at: new Date().toISOString(), ...row }, ...list]);
      setStatus("ready");
      setForm({ name: "", city: "", rating: 5, product: "", body: "", genuine: false, botcheck: "" });
      toast.success("Thank you! Your review is now live.");
    } catch (err) {
      toast.error("Could not post your review right now. Please try again.");
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
            Share your experience with Kanha Atelier. Reviews are written by our visitors and appear instantly.
          </p>
          {avg && (
            <div className="mt-6 inline-flex items-center gap-3 text-[var(--ka-ivory)]">
              <Stars value={Math.round(Number(avg))} size={20} />
              <span className="font-display text-2xl">{avg}</span>
              <span className="text-sm text-[var(--ka-ivory)]/60">
                from {reviews.length} review{reviews.length > 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Review list */}
          <div className="lg:col-span-3">
            {status === "loading" && (
              <div className="border border-[var(--ka-line)] p-10 text-center text-[var(--ka-ivory)]/60 text-sm">
                Loading reviews…
              </div>
            )}
            {status === "error" && (
              <div className="border border-[var(--ka-line)] p-10 text-center text-[var(--ka-ivory)]/70">
                <p className="font-serif-italic text-xl">Reviews could not be loaded right now.</p>
                <p className="text-sm mt-2">Please refresh in a moment. You can still write a review.</p>
              </div>
            )}
            {status === "ready" && reviews.length === 0 && (
              <div
                className="border border-[var(--ka-line)] p-10 text-center text-[var(--ka-ivory)]/70"
                data-testid="reviews-empty"
              >
                <p className="font-serif-italic text-xl">No reviews yet.</p>
                <p className="text-sm mt-2">Be the first to share your experience.</p>
              </div>
            )}
            {status === "ready" && reviews.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5" data-testid="reviews-list">
                {reviews.map((r) => (
                  <article key={r.id} className="border border-[var(--ka-line)] bg-[var(--ka-navy-900)] p-6">
                    <Stars value={r.rating} />
                    <p className="text-sm text-[var(--ka-ivory)]/85 mt-4 font-serif leading-relaxed break-words">
                      “{r.body}”
                    </p>
                    <div className="mt-5 text-[11px] tracking-[0.2em] uppercase text-[var(--ka-gold-300)]">
                      {r.name}
                      {r.city ? ` · ${r.city}` : ""}
                    </div>
                    <div className="text-[11px] text-[var(--ka-ivory)]/50 mt-1">
                      {[r.product, fmtDate(r.created_at)].filter(Boolean).join(" · ")}
                    </div>
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
              value={form.body}
              onChange={set("body")}
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
              <span>This review is my own honest experience.</span>
            </label>

            <button
              type="submit"
              disabled={busy}
              className="btn-gold inline-flex items-center gap-2 disabled:opacity-60"
              data-testid="review-submit"
            >
              <Send size={14} />
              {busy ? "Posting…" : "Post review"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
