# Kanha Atelier — PRD

## Original Problem Statement
Create a sophisticated, luxury e-commerce website for **Kanha Atelier**, a premium
handcrafted carpet and home-decor business transitioning to global sales.
Hero must use uploaded videos (carpet/fabric/weaving) as ambient backgrounds.
Deep navy + gold luxury aesthetic. Tagline: "Woven Heritage, Elevated Living."
IP-based currency (INR for India, USD elsewhere). No traditional cart — every
product has an **Order via WhatsApp** button to +91 93699 21454 with a
pre-filled, product-specific message.

## User Choices (final)
- Catalog: 8 curated carpets across 4 material tiers (Budget/Standard/Premium/Luxury)
- Currency: live USD→INR via free `open.er-api.com`, fallback to 83
- Page: single-page (Hero + Collections + Craftsmanship + About + Contact + Footer)
- Loading screen: KA monogram with gold shimmer
- Videos: all 3 rotate in hero, weaving video reused in Craftsmanship section

## Architecture
- **Backend** (`/app/backend/server.py`, FastAPI on :8001)
  - `GET /api/health`
  - `GET /api/geo` → country + currency from visitor IP (ipapi.co free, no key)
  - `GET /api/exchange-rate` → live USD→INR (open.er-api.com free, no key, fallback 83)
  - existing `GET/POST /api/status` retained
- **Frontend** (`/app/frontend/src`, React + Tailwind + shadcn)
  - `App.js` orchestrates Loading → Navbar → Hero → Collections → Craftsmanship → About → Contact → Footer
  - `lib/currency.js` calls both backend endpoints in parallel, formats price by locale
  - `lib/whatsapp.js` builds `wa.me/919369921454?text=...` with prefilled message
  - `data/products.js` static catalog with image URLs, tier, material, knot density, INR price

## Currently Implemented (2026-06-13)
- [x] Loading screen with KA monogram + gold shimmer (2.4s)
- [x] Sticky navbar w/ smooth-scroll nav + live currency chip
- [x] Hero: 3 rotating videos w/ pager dots + crossfade
- [x] Collections grid w/ tier filter (All/Luxury/Premium/Standard/Budget)
- [x] WhatsApp deep-link per product (prefilled message: name + ID + price)
- [x] Craftsmanship section reusing weaving video + 3-step storytelling
- [x] About / Atelier section w/ emblem + stats
- [x] Contact section + 3-card detail (WhatsApp / Email / Address)
- [x] Footer w/ Instagram link + monogram
- [x] IP-based currency (INR/USD) — auto fallback to USD/83 for local IPs
- [x] Live exchange rate (~95 INR/USD as of build)

## Backlog / Next Action Items
- P1: Quick-view product modal with zoom + full-size image gallery
- P1: Newsletter capture (e.g. ConvertKit / Resend) for global launch list
- P2: SEO meta + Open Graph image (large hero image card for Instagram shares)
- P2: Optional Instagram embed strip showing latest posts (Meta oEmbed)
- P3: Multi-currency selector (manual override) + freight estimator
- P3: Wishlist / "Shortlist via WhatsApp" — combine multiple products into one message
