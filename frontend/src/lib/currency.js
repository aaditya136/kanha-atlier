import axios from "axios";

const BACKEND = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND}/api`;

const FALLBACK = {
  geo: { country_code: "US", country_name: "United States", currency: "USD", symbol: "$" },
  rate: 83.0,
};

export async function detectCurrency() {
  try {
    const [geoRes, rateRes] = await Promise.all([
      axios.get(`${API}/geo`, { timeout: 6000 }),
      axios.get(`${API}/exchange-rate`, { timeout: 6000 }),
    ]);
    return {
      geo: geoRes.data,
      rate: rateRes.data.rate_usd_to_inr,
    };
  } catch (e) {
    console.warn("Currency detection failed, using fallback.", e?.message);
    return { geo: FALLBACK.geo, rate: FALLBACK.rate };
  }
}

export function formatPrice(priceINR, ctx) {
  if (!ctx) {
    return `₹${priceINR.toLocaleString("en-IN")}`;
  }
  const { geo, rate } = ctx;
  if (geo.currency === "INR") {
    return `₹${priceINR.toLocaleString("en-IN")}`;
  }
  const usd = priceINR / (rate || 83);
  const rounded = usd >= 1000
    ? Math.round(usd)
    : Math.round(usd * 100) / 100;
  return `$${rounded.toLocaleString("en-US", {
    minimumFractionDigits: usd >= 1000 ? 0 : 2,
    maximumFractionDigits: usd >= 1000 ? 0 : 2,
  })}`;
}
