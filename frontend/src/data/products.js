// Kanha Atelier — curated catalog
// Material tiers (per user spec, in INR):
//   Budget (Polyester): 2,500–5,000
//   Standard (Cotton): 4,000–8,000
//   Premium (Wool): 8,000–20,000
//   Luxury (Wool + Silk + Handmade): 20,000–1,00,000+

const A = "https://customer-assets.emergentagent.com/job_kanha-atelier/artifacts";
const B = "https://customer-assets.emergentagent.com/job_187a559b-e45e-40a1-9602-f51fecfdbe85/artifacts";

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
