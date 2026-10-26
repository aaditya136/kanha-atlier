// Kanha Atelier — Curated Catalog with Multi-Size USD-to-INR Matrix
// Exchange Rate: 1 USD ≈ 83.50 INR

export const SIZE_PRICE_MAP = [
  { size: "2 ft × 4 ft", priceUSD: 170, priceINR: 14195 },
  { size: "2 ft × 6 ft", priceUSD: 199, priceINR: 16617 },
  { size: "2 ft × 8 ft", priceUSD: 299, priceINR: 24967 },
  { size: "2 ft × 10 ft", priceUSD: 450, priceINR: 37575 },
  { size: "2 ft × 14 ft", priceUSD: 699, priceINR: 58367 },
  { size: "3 ft × 5 ft", priceUSD: 399, priceINR: 33317 },
  { size: "3 ft × 7 ft", priceUSD: 499, priceINR: 41667 },
  { size: "4 ft × 4 ft", priceUSD: 450, priceINR: 37575 },
  { size: "4 ft × 6 ft", priceUSD: 550, priceINR: 45925 },
  { size: "4 ft × 8 ft", priceUSD: 700, priceINR: 58450 },
  { size: "4 ft × 10 ft", priceUSD: 999, priceINR: 83417 },
  { size: "4 ft × 12 ft", priceUSD: 1400, priceINR: 116900 },
  { size: "5 ft × 5 ft", priceUSD: 500, priceINR: 41750 },
  { size: "5 ft × 7 ft", priceUSD: 550, priceINR: 45925 },
];

const A = "https://customer-assets.emergentagent.com/job_kanha-atelier/artifacts";
const B = "https://customer-assets.emergentagent.com/job_187a559b-e45e-40a1-9602-f51fecfdbe85/artifacts";
const U = "https://images.unsplash.com/photo"; 

// ---------------------------------------------------------------
// Each carpet DESIGN is ONE product with many photos (gallery).
// Price depends only on SIZE (see SIZE_PRICE_MAP above), not on design.
// Photos live in: public/images/carpets/<design-folder>/1.jpg, 2.jpg ...
// ---------------------------------------------------------------
const gallery = (slug, count) =>
  Array.from({ length: count }, (_, i) => `/images/carpets/${slug}/${i + 1}.jpg`);

const sizePriced = (slug, count) => {
  const images = gallery(slug, count);
  return {
    availability: "24/7 Available",
    sizes: SIZE_PRICE_MAP,
    size: `${SIZE_PRICE_MAP.length} sizes available`,
    priceINR: SIZE_PRICE_MAP[0].priceINR, // "From" price = smallest size
    image: images[0],
    images,
  };
};

const NEW_PRODUCTS = [
  {
    id: "KA-NEW-001",
    name: "Heritage Border Rug",
    tier: "Premium",
    material: "Pure Hand-Knotted Wool & Cotton",
    origin: "Bhadohi / Mirzapur Atelier",
    knotCount: "350 knots / sq. inch",
    ...sizePriced("heritage-border-carpet", 8),
    description: "Handwoven beige carpet with a bold green, cream and black geometric border.",
  },
  {
    id: "KA-NEW-002",
    name: "Sunburst Round Rug",
    tier: "Luxury",
    material: "Pure Hand-Knotted Wool & Cotton",
    origin: "Bhadohi / Mirzapur Atelier",
    knotCount: "350 knots / sq. inch",
    ...sizePriced("sunburst-round-carpet", 8),
    description: "Round handwoven carpet in concentric rings of mustard, teal, navy and rust.",
  },
  {
    id: "KA-NEW-003",
    name: "Fish Motif Runner",
    tier: "Premium",
    material: "Pure Hand-Knotted Wool & Cotton",
    origin: "Bhadohi / Mirzapur Atelier",
    knotCount: "350 knots / sq. inch",
    ...sizePriced("fish-motif-runner", 6),
    description: "Long runner with hand-drawn fish motifs, a navy border and fringed ends.",
  },
  {
    id: "KA-NEW-004",
    name: "Rose Ripple Round Rug",
    tier: "Luxury",
    material: "Pure Hand-Knotted Wool & Cotton",
    origin: "Bhadohi / Mirzapur Atelier",
    knotCount: "350 knots / sq. inch",
    ...sizePriced("rose-ripple-round-carpet", 6),
    description: "Round carpet in layered shades of rose pink and crimson.",
  },
  {
    id: "KA-NEW-005",
    name: "Lavender Scallop Rug",
    tier: "Premium",
    material: "Pure Hand-Knotted Wool & Cotton",
    origin: "Bhadohi / Mirzapur Atelier",
    knotCount: "350 knots / sq. inch",
    ...sizePriced("lavender-scallop-carpet", 6),
    description: "Scalloped-edge round carpet in plum, lilac and cream rings.",
  },
  {
    id: "KA-NEW-006",
    name: "Crimson Bloom Scallop Rug",
    tier: "Luxury",
    material: "Pure Hand-Knotted Wool & Cotton",
    origin: "Bhadohi / Mirzapur Atelier",
    knotCount: "350 knots / sq. inch",
    ...sizePriced("crimson-bloom-scallop-carpet", 7),
    description: "Flower-edged round carpet in crimson, blush, tan and black.",
  },
  {
    id: "KA-NEW-007",
    name: "Earth Tone Rings Rug",
    tier: "Premium",
    material: "Pure Hand-Knotted Wool & Cotton",
    origin: "Bhadohi / Mirzapur Atelier",
    knotCount: "350 knots / sq. inch",
    ...sizePriced("earth-tone-rings-carpet", 5),
    description: "Round carpet in concentric rings of black, brown, tan and cream.",
  },
];

export const PRODUCTS = [
  // --- NEW GALLERY DESIGNS (many photos per product) ---
  ...NEW_PRODUCTS,

  // --- PDF CATALOG DESIGNS (old details kept, real photos now used) ---
  {
    id: "KA-PDF-001",
    name: "Royal Peacock Heritage Rug",
    tier: "Luxury",
    material: "Hand-Knotted Pure Wool & Silk Blend",
    origin: "Mirzapur / Bhadohi Atelier",
    knotCount: "450 knots / sq. inch",
    ...sizePriced("royal-peacock-carpet", 3),
    description: "Intricate Royal Peacock design featuring vivid turquoise and emerald hues with fine fringe finishing.",
  },
  {
    id: "KA-PDF-002",
    name: "Celestial Starlight Moon Rug",
    tier: "Premium",
    material: "Plush Soft Microfiber Wool",
    origin: "Bhadohi Looms",
    knotCount: "320 knots / sq. inch",
    ...sizePriced("crescent-moon-night-carpet", 6),
    description: "Deep midnight blue organic curved rug featuring golden crescent moon and glittering star accents.",
  },
  {
    id: "KA-PDF-003",
    name: "Artisan Painter Palette Rug",
    tier: "Standard",
    material: "High-Density Premium Cotton Weave",
    origin: "Mirzapur",
    knotCount: "250 knots / sq. inch",
    ...sizePriced("artist-palette-carpet", 5),
    description: "Creative wooden painter palette design with rich multi-color swatch spots and detailed paintbrush motif.",
  },

  // --- ORIGINAL CATALOG ITEMS ---
  {
    id: "KA-PRM-001",
    name: "Royal Tabriz Medallion",
    tier: "Premium",
    material: "Pure Wool",
    origin: "Bhadohi, Uttar Pradesh",
    knotCount: "320 knots / sq. inch",
    size: "8 ft × 10 ft",
    priceINR: 18500,
    image: `${A}/lt3wafb7_WhatsApp%20Image%202026-06-13%20at%201.32.33%20PM.jpeg`,
    images: [`${A}/lt3wafb7_WhatsApp%20Image%202026-06-13%20at%201.32.33%20PM.jpeg`],
    description: "A regal medallion design hand-knotted in pure New Zealand wool. Deep indigo field, ivory border."
  },
  {
    id: "KA-LUX-002",
    name: "Persian Aubusson Floral",
    tier: "Luxury",
    material: "Wool + Silk, Handmade",
    origin: "Kashmir Atelier",
    knotCount: "500 knots / sq. inch",
    size: "9 ft × 12 ft",
    priceINR: 45000,
    image: `${A}/j9ssge0z_WhatsApp%20Image%202026-06-13%20at%201.32.34%20PM.jpeg`,
    images: [`${A}/j9ssge0z_WhatsApp%20Image%202026-06-13%20at%201.32.34%20PM.jpeg`],
    description: "Hand-knotted Aubusson with silk-highlighted florals on midnight onyx — a heritage statement piece."
  },
  {
    id: "KA-LUX-003",
    name: "Sapphire Mandala",
    tier: "Luxury",
    material: "Wool + Silk, Handmade",
    origin: "Kashmir Atelier",
    knotCount: "600 knots / sq. inch",
    size: "8 ft × 11 ft",
    priceINR: 68000,
    image: `${A}/845bd0rh_WhatsApp%20Image%202026-06-13%20at%201.32.35%20PM.jpeg`,
    images: [`${A}/845bd0rh_WhatsApp%20Image%202026-06-13%20at%201.32.35%20PM.jpeg`],
    description: "A sapphire-blue mandala of meditative geometry, accented in silk — months in the making."
  },
  {
    id: "KA-PRM-004",
    name: "Crimson Heritage Kashan",
    tier: "Premium",
    material: "Pure Wool",
    origin: "Bhadohi, Uttar Pradesh",
    knotCount: "280 knots / sq. inch",
    size: "7 ft × 10 ft",
    priceINR: 16200,
    image: `${A}/nmbj16ci_WhatsApp%20Image%202026-06-13%20at%201.32.36%20.jpeg`,
    images: [`${A}/nmbj16ci_WhatsApp%20Image%202026-06-13%20at%201.32.36%20.jpeg`],
    description: "Classic crimson Kashan with ivory florals — a timeless heirloom for grand interiors."
  },
  {
    id: "KA-STD-005",
    name: "Midnight Garden",
    tier: "Standard",
    material: "Premium Cotton",
    origin: "Bhadohi Looms",
    knotCount: "180 knots / sq. inch",
    size: "6 ft × 9 ft",
    priceINR: 6500,
    image: `${A}/ul8wtsau_WhatsAp.jpeg`,
    images: [`${A}/ul8wtsau_WhatsAp.jpeg`],
    description: "Soft cotton weave bearing a flourish of moonlit gold florals on navy."
  },
  {
    id: "KA-PRM-006",
    name: "Royal Indigo Bouquet",
    tier: "Premium",
    material: "Pure Wool",
    origin: "Bhadohi, Uttar Pradesh",
    knotCount: "300 knots / sq. inch",
    size: "8 ft × 10 ft",
    priceINR: 14800,
    image: `${A}/kjrxu9kd_ykigy.jpeg`,
    images: [`${A}/kjrxu9kd_ykigy.jpeg`],
    description: "An indigo bouquet hand-knotted in heritage wool — soft underfoot, regal in feel."
  },
  {
    id: "KA-STD-007",
    name: "Emerald Court Classic",
    tier: "Standard",
    material: "Premium Cotton",
    origin: "Bhadohi Looms",
    knotCount: "200 knots / sq. inch",
    size: "7 ft × 9 ft",
    priceINR: 7800,
    image: `${A}/k6tzlpfv_trg.jpeg`,
    images: [`${A}/k6tzlpfv_trg.jpeg`],
    description: "A timeless garnet medallion bordered with cream paisley — versatile and elegant."
  },
  {
    id: "KA-BGT-008",
    name: "Heritage Court (Compact)",
    tier: "Budget",
    material: "Soft Polyester",
    origin: "Mirzapur",
    knotCount: "120 knots / sq. inch",
    size: "5 ft × 7 ft",
    priceINR: 4200,
    image: `${B}/kuah5sdo_WhatsApp%20Image%202026-06-13%20at%2012.03.24%20PM.jpeg`,
    images: [`${B}/kuah5sdo_WhatsApp%20Image%202026-06-13%20at%2012.03.24%20PM.jpeg`],
    description: "An everyday luxury — polyester-blend rug bringing the Kanha aesthetic to compact spaces."
  },
  {
    id: "KA-LUX-009",
    name: "Emerald Court Heritage",
    tier: "Luxury",
    material: "Wool + Silk, Handmade",
    origin: "Kashmir Atelier",
    knotCount: "560 knots / sq. inch",
    size: "9 ft × 12 ft",
    priceINR: 52000,
    image: `${A}/xv2mvqmo_WhatsApp%20Image%202026-06-13%20at%209.51.10%20PM%20%286%29.jpeg`,
    images: [`${A}/xv2mvqmo_WhatsApp%20Image%202026-06-13%20at%209.51.10%20PM%20%286%29.jpeg`],
    description: "An emerald star-medallion crowning a midnight field, framed by a coral paisley border."
  },
  {
    id: "KA-PRM-010",
    name: "Indigo Garden Tabriz",
    tier: "Premium",
    material: "Pure Wool",
    origin: "Bhadohi, Uttar Pradesh",
    knotCount: "320 knots / sq. inch",
    size: "8 ft × 10 ft",
    priceINR: 19500,
    image: `${A}/xeayc93l_WhatsApp%20Image%202026-06-13%20at%209.51.10%20PM.jpeg`,
    images: [`${A}/xeayc93l_WhatsApp%20Image%202026-06-13%20at%209.51.10%20PM.jpeg`],
    description: "A sky-blue Tabriz medallion in a garden of paisley — soft, regal, and effortless."
  },
  {
    id: "KA-LUX-011",
    name: "Onyx Versailles Medusa",
    tier: "Luxury",
    material: "Pure Silk, Handmade",
    origin: "Kashmir Atelier",
    knotCount: "700 knots / sq. inch",
    size: "6 ft × 9 ft",
    priceINR: 78000,
    image: `${A}/agopd0lk_WhatsApp%20Image%202026-06-13%20at%206.23.26%20PM.jpeg`,
    images: [`${A}/agopd0lk_WhatsApp%20Image%202026-06-13%20at%206.23.26%20PM.jpeg`],
    description: "A statement silk masterpiece — gilded baroque scrolls orbiting a central cameo."
  },
  {
    id: "KA-LUX-012",
    name: "Midnight Floral Kashan",
    tier: "Luxury",
    material: "Wool + Silk, Handmade",
    origin: "Kashmir Atelier",
    knotCount: "540 knots / sq. inch",
    size: "9 ft × 12 ft",
    priceINR: 38000,
    image: `${U}-1600166898405-da9535204843?w=900&h=1125&fit=crop&auto=format&q=80`,
    images: [`${U}-1600166898405-da9535204843?w=900&h=1125&fit=crop&auto=format&q=80`],
    description: "A densely-knotted Kashan with thousands of micro-florals on midnight."
  },
  {
    id: "KA-PRM-013",
    name: "Antique Ruby Sarouk",
    tier: "Premium",
    material: "Pure Wool",
    origin: "Bhadohi, Uttar Pradesh",
    knotCount: "300 knots / sq. inch",
    size: "8 ft × 10 ft",
    priceINR: 17500,
    image: `${U}-1567225557594-88d73e55f2cb?w=900&h=1125&fit=crop&auto=format&q=80`,
    images: [`${U}-1567225557594-88d73e55f2cb?w=900&h=1125&fit=crop&auto=format&q=80`],
    description: "A ruby-toned Sarouk weave with classical floral fill — looks museum, lives at home."
  },
  {
    id: "KA-STD-014",
    name: "Vintage Heritage Weave",
    tier: "Standard",
    material: "Premium Cotton",
    origin: "Bhadohi Looms",
    knotCount: "210 knots / sq. inch",
    size: "7 ft × 10 ft",
    priceINR: 7200,
    image: `${U}-1615874959474-d609969a20ed?w=900&h=1125&fit=crop&auto=format&q=80`,
    images: [`${U}-1615874959474-d609969a20ed?w=900&h=1125&fit=crop&auto=format&q=80`],
    description: "Vintage-washed cotton with soft russet and indigo tones — modern interiors."
  },
  {
    id: "KA-PRM-015",
    name: "Crimson Mughal Court",
    tier: "Premium",
    material: "Pure Wool",
    origin: "Bhadohi, Uttar Pradesh",
    knotCount: "310 knots / sq. inch",
    size: "8 ft × 11 ft",
    priceINR: 15800,
    image: `${U}-1631679706909-1844bbd07221?w=900&h=1125&fit=crop&auto=format&q=80`,
    images: [`${U}-1631679706909-1844bbd07221?w=900&h=1125&fit=crop&auto=format&q=80`],
    description: "A crimson Mughal-court inspired floral field — drama, anchored by ivory border."
  },
  {
    id: "KA-STD-016",
    name: "Ivory Garden Manor",
    tier: "Standard",
    material: "Premium Cotton",
    origin: "Bhadohi Looms",
    knotCount: "190 knots / sq. inch",
    size: "6 ft × 9 ft",
    priceINR: 6800,
    image: `${U}-1583845112203-29329902332e?w=900&h=1125&fit=crop&auto=format&q=80`,
    images: [`${U}-1583845112203-29329902332e?w=900&h=1125&fit=crop&auto=format&q=80`],
    description: "Soft ivory ground with navy medallion — built for sunlit rooms."
  },
  {
    id: "KA-PRM-017",
    name: "Kashmir Walnut Garden",
    tier: "Premium",
    material: "Pure Wool",
    origin: "Kashmir Atelier",
    knotCount: "350 knots / sq. inch",
    size: "8 ft × 10 ft",
    priceINR: 18900,
    image: `${U}-1579656592043-a20e25a4aa4b?w=900&h=1125&fit=crop&auto=format&q=80`,
    images: [`${U}-1579656592043-a20e25a4aa4b?w=900&h=1125&fit=crop&auto=format&q=80`],
    description: "Rich warm walnut hues interwoven with subtle cream foliage."
  },
  {
    id: "KA-LUX-018",
    name: "Emerald Lotus Sultanate",
    tier: "Luxury",
    material: "Wool + Silk, Handmade",
    origin: "Bhadohi, Uttar Pradesh",
    knotCount: "520 knots / sq. inch",
    size: "9 ft × 12 ft",
    priceINR: 42500,
    image: `${U}-1600585154340-be6161a56a0c?w=900&h=1125&fit=crop&auto=format&q=80`,
    images: [`${U}-1600585154340-be6161a56a0c?w=900&h=1125&fit=crop&auto=format&q=80`],
    description: "Deep emerald field featuring shimmering silk lotus motifs."
  },
  {
    id: "KA-STD-019",
    name: "Terracotta Heritage Runner",
    tier: "Standard",
    material: "Premium Cotton",
    origin: "Bhadohi Looms",
    knotCount: "220 knots / sq. inch",
    size: "4 ft × 8 ft",
    priceINR: 5400,
    image: `${U}-1584100936595-c0654b55a2e2?w=900&h=1125&fit=crop&auto=format&q=80`,
    images: [`${U}-1584100936595-c0654b55a2e2?w=900&h=1125&fit=crop&auto=format&q=80`],
    description: "A versatile corridor runner in earthy terracotta tones."
  }
];

export const VIDEOS = [
  `${B}/qrlqoh1i_From%20Klickpin.com-%20Clear%20leadership%20reflections%20for%20beginners%20designed%20for%20beautiful%20Pinterest%20saves%20that%20keep%20things%20g-pin-id-9710955443756416.mp4`,
  `${B}/2rs48lg7_From%20Klickpin.com-%20Clear%20leadership%20reflections%20for%20beginners%20designed%20for%20beautiful%20Pinterest%20saves%20that%20keep%20things%20g-pin-id-84583299244506318.mp4`,
  `${B}/mhs35ry4_From%20Klickpin.com-%20Clear%20leadership%20reflections%20for%20beginners%20designed%20for%20beautiful%20Pinterest%20saves%20that%20keep%20things%20g-pin-id-1151091986036399293.mp4`,
];

export const CRAFT_VIDEO = VIDEOS[1];

export const LOGOS = {
  emblem: `${B}/kuah5sdo_WhatsApp%20Image%202026-06-13%20at%2012.03.24%20PM.jpeg`,
  monogram: `${B}/sdiqjjal_WhatsApp%20Image%202026-06-13%20at%2012.03.23%20PM.jpeg`,
};

export const WHATSAPP_NUMBER = "919369921454"; 
export const WHATSAPP_DISPLAY = "+91 93699 21454";