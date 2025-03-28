import 'dotenv/config';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRouter } from './src/router.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseUrl = process.env.VITE_BASE_URL;
const router = createRouter();
const routes = router.getRoutes()
  .filter(route => !route.path.includes(':') && route.path !== '/*') // Hapus wildcard
  .map(route => ({
    path: route.path,
    priority: route.meta?.priority || 0.5, // Default priority 0.5
  }));

// Generate sitemap.xml
const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes.map(({ path, priority }) => `
      <url>
        <loc>${baseUrl}${path}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>${priority}</priority>
      </url>
    `).join('')}
  </urlset>`;

const outputPath = path.join(__dirname, 'public', 'sitemap.xml');
await fs.writeFile(outputPath, sitemapContent);
console.log(`Sitemap generated at ${outputPath}`);

// Generate robots.txt
const robotsContent = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;

const robotsPath = path.join(__dirname, 'public', 'robots.txt');
await fs.writeFile(robotsPath, robotsContent);
console.log(`Robots.txt generated at ${robotsPath}`);