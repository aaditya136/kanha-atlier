// Shared SEO helpers. Used by the website AND by scripts/prerender.mjs at build time.
// IMPORTANT: this file must NOT import anything (the build script loads it directly).

export const SITE_URL = "https://www.kanhaatelier.in";
export const BRAND = "Kanha Atelier";

export const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const productSlug = (p) => slugify(p.name);
export const productPath = (p) => `/carpets/${productSlug(p)}`;
export const absUrl = (u) => (/^https?:/.test(u) ? u : SITE_URL + u);

export function productSeo(p) {
  const url = SITE_URL + productPath(p);
  const prices = p.sizes ? p.sizes.map((s) => s.priceUSD) : null;
  const extra = p.sizes
    ? `Choose from ${p.sizes.length} sizes, from $${Math.min(...prices)}.`
    : `Priced from ₹${Number(p.priceINR).toLocaleString("en-IN")}.`;
  const description = `${p.description || p.name} ${extra} Handcrafted by ${BRAND}, Bhadohi, India. Order via WhatsApp.`
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);
  const title = `${p.name} – Handcrafted Carpet | ${BRAND}`;
  const images = (p.images || [p.image]).slice(0, 6).map(absUrl);

  const offers = p.sizes
    ? {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        offerCount: p.sizes.length,
        availability: "https://schema.org/InStock",
        url,
      }
    : {
        "@type": "Offer",
        priceCurrency: "INR",
        price: p.priceINR,
        availability: "https://schema.org/InStock",
        url,
      };

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Product",
      name: p.name,
      description,
      image: images,
      sku: p.id,
      material: p.material,
      brand: { "@type": "Brand", name: BRAND },
      offers,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL + "/" },
        { "@type": "ListItem", position: 2, name: "Carpets", item: SITE_URL + "/#collections" },
        { "@type": "ListItem", position: 3, name: p.name, item: url },
      ],
    },
  ];
  return { title, description, url, image: images[0], images, jsonLd };
}
