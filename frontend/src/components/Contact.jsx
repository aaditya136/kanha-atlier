import { MessageCircle, Mail, MapPin, Phone } from "lucide-react";
import { WHATSAPP_DISPLAY } from "../data/products";
import { buildWhatsAppLink } from "../lib/whatsapp";

export default function Contact() {
  return (
    <section
      id="contact"
      data-testid="contact-section"
      className="relative py-28 px-6 lg:px-16 bg-[var(--ka-navy-900)]"
    >
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="w-10 h-px bg-[var(--ka-gold-400)]" />
            <span className="text-[11px] tracking-[0.4em] uppercase text-[var(--ka-gold-300)]">
              Bespoke Enquiries
            </span>
            <span className="w-10 h-px bg-[var(--ka-gold-400)]" />
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-[var(--ka-ivory)]">
            Commission a piece.
          </h2>
          <p className="font-serif-italic text-[var(--ka-ivory)]/75 text-xl mt-4">
            Every Kanha order — from a single hearth-rug to a 12-foot
            heirloom — begins with a quiet conversation on WhatsApp.
          </p>

          <a
            href={buildWhatsAppLink({})}
            target="_blank"
            rel="noreferrer"
            className="btn-gold inline-flex items-center gap-2 mt-10"
            data-testid="contact-whatsapp-cta"
          >
            <MessageCircle size={16} />
            Message the Atelier
          </a>
        </div>

        <div className="gold-rule my-16" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Phone size={18} />,
              label: "WhatsApp / Phone",
              value: WHATSAPP_DISPLAY,
              testid: "contact-phone",
            },
            {
              icon: <Mail size={18} />,
              label: "Studio Email",
              value: "atelier@kanha-carpets.com",
              testid: "contact-email",
            },
            {
              icon: <MapPin size={18} />,
              label: "Atelier",
              value: "Bhadohi · Uttar Pradesh · India",
              testid: "contact-address",
            },
          ].map((b) => (
            <div
              key={b.label}
              className="border border-[rgba(212,175,55,0.25)] p-8 bg-[var(--ka-navy-800)]/40"
              data-testid={b.testid}
            >
              <div className="text-[var(--ka-gold-400)]">{b.icon}</div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/55 mt-4">
                {b.label}
              </div>
              <div className="font-display text-lg text-[var(--ka-ivory)] mt-2">
                {b.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
