// Kanha Atelier — curated catalog
// Material tiers (per user spec, in INR):
//   Budget (Polyester): 2,500–5,000
//   Standard (Cotton): 4,000–8,000
//   Premium (Wool): 8,000–20,000
//   Luxury (Wool + Silk + Handmade): 20,000–1,00,000+

const A = "https://customer-assets.emergentagent.com/job_kanha-atelier/artifacts";
const B = "https://customer-assets.emergentagent.com/job_187a559b-e45e-40a1-9602-f51fecfdbe85/artifacts";
const U = "https://images.unsplash.com/photo"; // hand-curated public images

export const PRODUCTS = [
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
    description:
      "A regal medallion design hand-knotted in pure New Zealand wool. Deep indigo field, ivory border.",
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
    description:
      "Hand-knotted Aubusson with silk-highlighted florals on midnight onyx — a heritage statement piece.",
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
    description:
      "A sapphire-blue mandala of meditative geometry, accented in silk — months in the making.",
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
    description:
      "Classic crimson Kashan with ivory florals — a timeless heirloom for grand interiors.",
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
    description:
      "Soft cotton weave bearing a flourish of moonlit gold florals on navy.",
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
    description:
      "An indigo bouquet hand-knotted in heritage wool — soft underfoot, regal in feel.",
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
    description:
      "A timeless garnet medallion bordered with cream paisley — versatile and elegant.",
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
    description:
      "An everyday luxury — polyester-blend rug bringing the Kanha aesthetic to compact spaces.",
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
    description:
      "An emerald star-medallion crowning a midnight field, framed by a coral paisley border — the kind of rug a room is designed around.",
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
    description:
      "A sky-blue Tabriz medallion in a garden of paisley — soft, regal, and effortless to live with.",
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
    description:
      "A statement silk masterpiece — gilded baroque scrolls orbiting a central cameo. Limited edition, numbered.",
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
    description:
      "A densely-knotted Kashan with thousands of micro-florals on midnight — old-world detail at heirloom scale.",
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
    description:
      "A ruby-toned Sarouk weave with classical floral fill — looks museum, lives at home.",
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
    description:
      "Vintage-washed cotton with soft russet and indigo tones — modern interiors, heritage soul.",
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
    description:
      "A crimson Mughal-court inspired floral field — drama, anchored by ivory border serenity.",
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
    description:
      "Soft ivory ground with navy medallion — built for sunlit rooms and slow afternoons.",
  },
];

export const VIDEOS = [
  `${B}/qrlqoh1i_From%20Klickpin.com-%20Clear%20leadership%20reflections%20for%20beginners%20designed%20for%20beautiful%20Pinterest%20saves%20that%20keep%20things%20g-pin-id-9710955443756416.mp4`,
  `${B}/2rs48lg7_From%20Klickpin.com-%20Clear%20leadership%20reflections%20for%20beginners%20designed%20for%20beautiful%20Pinterest%20saves%20that%20keep%20things%20g-pin-id-84583299244506318.mp4`,
  `${B}/mhs35ry4_From%20Klickpin.com-%20Clear%20leadership%20reflections%20for%20beginners%20designed%20for%20beautiful%20Pinterest%20saves%20that%20keep%20things%20g-pin-id-1151091986036399293.mp4`,
];

// The weaving / fabric-detail video gets reused for the Craftsmanship section
export const CRAFT_VIDEO = VIDEOS[1];

export const LOGOS = {
  emblem: `${B}/kuah5sdo_WhatsApp%20Image%202026-06-13%20at%2012.03.24%20PM.jpeg`,
  monogram: `${B}/sdiqjjal_WhatsApp%20Image%202026-06-13%20at%2012.03.23%20PM.jpeg`,
};

export const WHATSAPP_NUMBER = "919369921454"; // international format, no +
export const WHATSAPP_DISPLAY = "+91 93699 21454";
