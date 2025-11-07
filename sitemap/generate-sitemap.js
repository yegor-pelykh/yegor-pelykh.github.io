import { writeFileSync } from 'fs';

const baseUrl = 'https://yegor-pelykh.github.io';
const routes = ['', 'projects', 'resume', 'contacts'];

const now = new Date();
const lastmod = now.toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
  .map(
    (route) => `
  <url>
    <loc>${baseUrl}/${route}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>`,
  )
  .join('')}
</urlset>
`;

writeFileSync('./docs/sitemap.xml', sitemap);
console.log('Sitemap generated.');
