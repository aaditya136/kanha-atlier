import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND}/api`;

const LS_KEY = "ka_currency_override"; // "INR" | "USD" | null

const FALLBACK_USD = {
  country_code: "US",
  country_name: "United States",
  currency: "USD",
  symbol: "$",
};
const FALLBACK_INR = {
  country_code: "IN",
  country_name: "India",
  currency: "INR",
  symbol: "₹",
};
const FALLBACK_RATE = 83.0;

function timezoneIsIndia() {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    return tz === "Asia/Kolkata" || tz === "Asia/Calcutta";
  } catch {
    return false;
  }
}

function applyOverride(geo) {
  const override = readOverride();
  if (!override) return geo;
  return override === "INR" ? { ...FALLBACK_INR, country_name: "Manual (₹ INR)" }
                            : { ...FALLBACK_USD, country_name: "Manual ($ USD)" };
}

export function readOverride() {
  try {
    return localStorage.getItem(LS_KEY);
  } catch {
    return null;
  }
}

export function writeOverride(value) {
  try {
    if (value) localStorage.setItem(LS_KEY, value);
    else localStorage.removeItem(LS_KEY);
  } catch {
    /* ignore */
  }
}

export async function detectCurrency() {
  // 1) Try backend (gives both currency + live exchange rate)
  let geo = null;
  let rate = FALLBACK_RATE;
  try {
    const [geoRes, rateRes] = await Promise.all([
      axios.get(`${API}/geo`, { timeout: 5000 }),
      axios.get(`${API}/exchange-rate`, { timeout: 5000 }),
    ]);
    geo = geoRes.data;
    if (rateRes?.data?.rate_usd_to_inr) {
      rate = rateRes.data.rate_usd_to_inr;
    }
  } catch (e) {
    console.warn("[currency] backend detection failed:", e?.message);
  }

  // 2) If backend said US/USD but the browser timezone is Indian,
  //    correct it (covers the case where the visitor's real IP isn't
  //    forwarded through the ingress).
  if ((!geo || geo.currency === "USD") && timezoneIsIndia()) {
    geo = { ...FALLBACK_INR, country_name: "India (via timezone)" };
  }

  // 3) Hard fallback
  if (!geo) geo = FALLBACK_USD;

  // 4) Apply manual override if user has toggled
  geo = applyOverride(geo);

  return { geo, rate };
}

export function formatPrice(priceINR, ctx) {
  if (!ctx) {
    return `₹${priceINR.toLocaleString("en-IN")}`;
  }
  const { geo, rate } = ctx;
  if (geo.currency === "INR") {
    return `₹${priceINR.toLocaleString("en-IN")}`;
  }
  const usd = priceINR / (rate || FALLBACK_RATE);
  const rounded = Math.round(usd);
  return `$${rounded.toLocaleString("en-US")}`;
}

// Size-priced carpets: show the exact USD/INR price from the size chart
export function formatSizePrice(entry, ctx) {
  if (ctx && ctx.geo && ctx.geo.currency !== "INR") {
    return `$${entry.priceUSD.toLocaleString("en-US")}`;
  }
  return `₹${entry.priceINR.toLocaleString("en-IN")}`;
}
