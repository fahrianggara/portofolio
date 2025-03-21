import fs from 'fs';
import path from 'path';
import express from 'express';

const isProd = process.env.NODE_ENV === 'production';
const app = express();

let template, render, port;

// Production Mode dengan SSR
if (isProd) {
  port = 3002;
  template = fs.readFileSync(path.resolve('./dist/client/index.html'), 'utf-8');
  render = (await import('./dist/server/entry-server.js')).render;

  // Pastikan file statis bisa diakses
  app.use('/assets', express.static(path.resolve('./dist/client/assets'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css'); // ✅ Set content-type untuk CSS
      }
    }
  }));

  // Middleware untuk menyajikan file statis lainnya
  app.use(express.static(path.resolve('dist/client'), { index: false }));
}

// Development Mode dengan Vite
else {
  port = 3001;
  const { createServer } = await import('vite'); // Import createServer dari Vite
  const vite = await createServer({ // Inisialisasi Vite
    server: { middlewareMode: true },
    appType: 'custom',
    base: '/',
  });
  app.use(vite.middlewares); // Gunakan middleware Vite

  template = fs.readFileSync('index.html', 'utf-8'); // Baca template index.html
  render = (await vite.ssrLoadModule('/src/entry-server.js')).render; // Load entry-server.js
}

app.use('*', async (req, res) => { // Middleware untuk SSR
  try {
    const url = req.originalUrl || req.url;
    const { html } = await render(url);
    const finalHtml = template.replace('<!--app-html-->', html);
    
    res.status(200).set({ 'Content-Type': 'text/html' }).end(finalHtml);
  } catch (err) {
    console.error(err);
    res.status(500).end('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
