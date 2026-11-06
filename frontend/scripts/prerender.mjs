// Runs AFTER "craco build". Creates a real HTML page for every carpet
// (own title, description, canonical, structured data, text + links) and
// writes sitemap.xml - so Google can read every page without running JavaScript.
import fs from "fs";
import os from "os";
import path from "path";
import { fileURLToPath, pathToFileURL } from "url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const build = path.join(root, "build");

// load the website's own ES-module files (they have no imports)
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ka-seo-"));
for (const [src, name] of [
  ["src/data/products.js", "products.mjs"],
  ["src/lib/seoData.js", "seoData.mjs"],
]) {
  fs.copyFileSync(path.join(root, src), path.join(tmp, name));
}
const { PRODUCTS } = await import(pathToFileURL(path.join(tmp, "products.mjs")).href);
const { SITE_URL, BRAND, productSeo, productSlug, productPath, absUrl } = await import(
  pathToFileURL(path.join(tmp, "seoData.mjs")).href
);

const baseHtml = fs.readFileSync(path.join(build, "index.html"), "utf8");
if (!baseHtml.includes('<div id="root"></div>')) {
  throw new Error('prerender: could not find <div id="root"></div> in build/index.html');
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function setMeta(html, attr, name, content) {
  const re = new RegExp(`<meta[^>]*${attr}="${name}"[^>]*>`);
  const tag = `<meta ${attr}="${name}" content="${esc(content)}"/>`;
  return re.test(html) ? html.replace(re, tag) : html.replace("</head>", `${tag}</head>`);
}

function render({ title, description, url, image, jsonLd = [], body }) {
  let h = baseHtml;
  h = h.replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(title)}</title>`);
  h = setMeta(h, "name", "description", description);
  h = setMeta(h, "property", "og:title", title);
  h = setMeta(h, "property", "og:description", description);
  h = setMeta(h, "property", "og:url", url);
  h = setMeta(h, "property", "og:image", image);
  h = setMeta(h, "name", "twitter:title", title);
  h = setMeta(h, "name", "twitter:description", description);
  h = setMeta(h, "name", "twitter:image", image);
  h = h.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}"/>`);
  const ld = jsonLd
    .map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`)
    .join("");
  h = h.replace("</head>", `${ld}</head>`);
  h = h.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  return h;
}

const money = (p) =>
  p.sizes
    ? `From $${Math.min(...p.sizes.map((s) => s.priceUSD))} (size-based pricing)`
    : `From ₹${Number(p.priceINR).toLocaleString("en-IN")}`;

// ---------- one page per carpet ----------
const seen = new Set();
for (const p of PRODUCTS) {
  const slug = productSlug(p);
  if (seen.has(slug)) throw new Error(`prerender: duplicate carpet page name "${p.name}"`);
  seen.add(slug);
  const s = productSeo(p);
  const sizes = p.sizes
    ? `<h2>Sizes &amp; prices</h2><ul>${p.sizes
        .map((z) => `<li>${esc(z.size)} – $${z.priceUSD}</li>`)
        .join("")}</ul>`
    : p.size
    ? `<p>Size: ${esc(p.size)}</p>`
    : "";
  const colors = p.colors
    ? `<p>Colours: ${p.colors.map((c) => esc(c.name)).join(", ")}</p>`
    : "";
  const body =
    `<main style="max-width:900px;margin:0 auto;padding:24px;font-family:Georgia,serif">` +
    `<p><a href="/">${BRAND}</a> › <a href="/#collections">Carpets</a></p>` +
    `<h1>${esc(p.name)}</h1><p>${esc(p.description || "")}</p>` +
    `<img src="${esc(absUrl(p.image))}" alt="${esc(p.name)} – handcrafted carpet by ${BRAND}" width="600"/>` +
    `<p>${esc(p.material || "")} · ${esc(p.origin || "")}</p>${colors}<p>${esc(money(p))}</p>${sizes}` +
    `<p><a href="/">Explore all ${BRAND} carpets</a></p></main>`;
  const html = render({ ...s, body });
  fs.mkdirSync(path.join(build, "carpets", slug), { recursive: true });
  fs.writeFileSync(path.join(build, "carpets", `${slug}.html`), html);
  fs.writeFileSync(path.join(build, "carpets", slug, "index.html"), html);
}

// ---------- home page: same page, plus crawlable text + links to every carpet ----------
const homeTitle = /<title>([\s\S]*?)<\/title>/.exec(baseHtml)[1];
const homeDesc = /<meta[^>]*name="description"[^>]*content="([^"]*)"/.exec(baseHtml)?.[1] || "";
const homeImg = /<meta[^>]*property="og:image"[^>]*content="([^"]*)"/.exec(baseHtml)?.[1] || "";
const homeBody =
  `<main style="max-width:900px;margin:0 auto;padding:24px;font-family:Georgia,serif">` +
  `<h1>${BRAND} – Handcrafted Carpets &amp; Home Decor from Bhadohi, India</h1>` +
  `<p>${esc(homeDesc)}</p><h2>Our carpets</h2><ul>` +
  PRODUCTS.map((p) => `<li><a href="${productPath(p)}">${esc(p.name)}</a></li>`).join("") +
  `</ul></main>`;
const home = baseHtml
  .replace('<div id="root"></div>', `<div id="root">${homeBody}</div>`);
fs.writeFileSync(path.join(build, "index.html"), home);

// ---------- sitemap ----------
const today = new Date().toISOString().slice(0, 10);
const urls = [`${SITE_URL}/`, ...PRODUCTS.map((p) => SITE_URL + productPath(p))];
fs.writeFileSync(
  path.join(build, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    urls
      .map(
        (u, i) =>
          `  <url><loc>${u}</loc><lastmod>${today}</lastmod><priority>${i === 0 ? "1.0" : "0.8"}</priority></url>`
      )
      .join("\n") +
    `\n</urlset>\n`
);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`prerender: ${PRODUCTS.length} carpet pages + home + sitemap.xml (${urls.length} urls)`);
