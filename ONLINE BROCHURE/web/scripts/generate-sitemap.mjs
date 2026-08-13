// Regenerates public/sitemap.xml from the category labels in
// src/lib/productGroups.ts. Uses a plain regex extraction (not a TS
// import) so it can run with zero extra dependencies via `node`.
// Run manually after changing the category list: `node scripts/generate-sitemap.mjs`
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const SITE_URL = 'https://gomatisanitary.vercel.app';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const source = readFileSync(path.join(__dirname, '..', 'src', 'lib', 'productGroups.ts'), 'utf8');
const labels = [...source.matchAll(/label:\s*'([^']+)'/g)].map((m) => m[1]);

function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-+|-+$)/g, '');
}

const staticPaths = ['/', '/about', '/catalogue', '/contact'];
const categoryPaths = labels.map((l) => `/products/${slugify(l)}`);
const allPaths = [...staticPaths, ...categoryPaths];

const today = new Date().toISOString().slice(0, 10);
const urls = allPaths
  .map(
    (p) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(path.join(__dirname, '..', 'public', 'sitemap.xml'), xml);
console.log(`Wrote sitemap.xml with ${allPaths.length} URLs (${categoryPaths.length} categories).`);
