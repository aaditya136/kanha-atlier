import { productSeo, SITE_URL } from "./seoData";

// Keeps the browser tab title, description, canonical link and structured data
// in sync when a visitor opens / closes a carpet (so every carpet has its own SEO).

const q = (sel) => document.head.querySelector(sel);
let defaults = null;

function remember() {
  if (defaults) return;
  const get = (sel, attr) => (q(sel) ? q(sel).getAttribute(attr) : "");
  defaults = {
    title: document.title,
    description: get('meta[name="description"]', "content"),
    ogTitle: get('meta[property="og:title"]', "content"),
    ogDescription: get('meta[property="og:description"]', "content"),
    ogUrl: get('meta[property="og:url"]', "content"),
    ogImage: get('meta[property="og:image"]', "content"),
    canonical: get('link[rel="canonical"]', "href"),
  };
}

function setAttr(sel, attr, value) {
  const el = q(sel);
  if (el && value != null) el.setAttribute(attr, value);
}

function paint(v) {
  document.title = v.title;
  setAttr('meta[name="description"]', "content", v.description);
  setAttr('meta[property="og:title"]', "content", v.ogTitle);
  setAttr('meta[property="og:description"]', "content", v.ogDescription);
  setAttr('meta[property="og:url"]', "content", v.ogUrl);
  setAttr('meta[property="og:image"]', "content", v.ogImage);
  setAttr('meta[name="twitter:title"]', "content", v.ogTitle);
  setAttr('meta[name="twitter:description"]', "content", v.ogDescription);
  setAttr('meta[name="twitter:image"]', "content", v.ogImage);
  setAttr('link[rel="canonical"]', "href", v.canonical);
}

function clearLd() {
  document.querySelectorAll("script[data-ka-ld]").forEach((n) => n.remove());
}

export function applyProductSeo(p) {
  remember();
  const s = productSeo(p);
  paint({
    title: s.title,
    description: s.description,
    ogTitle: s.title,
    ogDescription: s.description,
    ogUrl: s.url,
    ogImage: s.image,
    canonical: s.url,
  });
  clearLd();
  s.jsonLd.forEach((obj) => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-ka-ld", "1");
    el.text = JSON.stringify(obj);
    document.head.appendChild(el);
  });
}

export function resetSeo() {
  remember();
  clearLd();
  paint({
    title: defaults.title,
    description: defaults.description,
    ogTitle: defaults.ogTitle,
    ogDescription: defaults.ogDescription,
    ogUrl: defaults.ogUrl || SITE_URL + "/",
    ogImage: defaults.ogImage,
    canonical: defaults.canonical || SITE_URL + "/",
  });
}
