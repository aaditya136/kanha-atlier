import { LOGOS } from "../data/products";

export default function Footer() {
  return (
    <footer
      data-testid="footer"
      className="bg-[var(--ka-navy-950)] border-t border-[rgba(212,175,55,0.25)] px-6 lg:px-16 pt-16 pb-10"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="flex items-center gap-4">
          <img
            src={LOGOS.monogram}
            alt="KA monogram"
            className="w-14 h-14 object-cover border border-[rgba(212,175,55,0.5)]"
          />
          <div>
            <div className="font-display text-[var(--ka-gold-300)] tracking-[0.35em]">
              KANHA ATELIER
            </div>
            <div className="font-serif-italic text-[var(--ka-ivory)]/60 text-sm">
              Woven Heritage, Elevated Living
            </div>
          </div>
        </div>

        <div className="text-center">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--ka-gold-300)]/80">
            Visit us on
          </div>
          <a
            href="https://www.instagram.com/kanha_enterprises_carpet"
            target="_blank"
            rel="noreferrer"
            data-testid="footer-instagram"
            className="font-display text-lg text-[var(--ka-ivory)] hover:text-[var(--ka-gold-300)] transition-colors"
          >
            @kanha_enterprises_carpet
          </a>
        </div>

        <div className="md:text-right">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[var(--ka-gold-300)]/80">
            Worldwide shipping
          </div>
          <div className="font-display text-lg text-[var(--ka-ivory)] mt-1">
            India · USA · Europe · GCC
          </div>
        </div>
      </div>

      <div className="gold-rule my-10" />

      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] tracking-[0.3em] uppercase text-[var(--ka-ivory)]/45">
        <div>© {new Date().getFullYear()} Kanha Atelier — All hand-knotted, all heart.</div>
        <div>Designed for those who choose the slow road.</div>
      </div>
    </footer>
  );
}
