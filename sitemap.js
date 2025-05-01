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

// Generate robots.txt
const sitemapName = 'sitemap.xml';
const robotsContent = `User-agent: *
Allow: /
Sitemap: ${baseUrl}/${sitemapName}
`;

// Function to save files in multiple locations
async function saveFile(fileName, content) {
  const locations = ['dist/client', 'dist/server'];
  
  for (const location of locations) {
    const outputPath = path.join(__dirname, location, fileName);
    await fs.mkdir(path.dirname(outputPath), { recursive: true }); // Buat folder jika belum ada
    await fs.writeFile(outputPath, content);
    console.log(`${fileName} generated at ${outputPath}`);
  }
}

// Save files to both locations
await saveFile(sitemapName, sitemapContent);
await saveFile('robots.txt', robotsContent);
