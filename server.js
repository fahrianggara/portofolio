import fs from 'node:fs/promises';
import express from 'express';
import { transformHtmlTemplate } from '@unhead/vue/server';

// Constants
const isProduction = process.env.NODE_ENV === 'production';
const base = process.env.BASE || '/';

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/index.html', 'utf-8')
  : '';

// Create HTTP server
const app = express();

let vite, port;

if (!isProduction) {
  const { createServer } = await import('vite');

  port = 5173;
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  });

  app.use(vite.middlewares);
} 

else {
  port = 5174;
  const [compression, sirv] = await Promise.all([
    import('compression').then(m => m.default),
    import('sirv').then(m => m.default),
  ]);

  app.use(compression());
  app.use(base, sirv('./dist', { extensions: [] }));
}

// Serve HTML
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl.replace(base, '');

    let template, render

    if (!isProduction) {
      template = await fs.readFile('./index.html', 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      render = (await vite.ssrLoadModule('/src/entry-server.js')).render;
    } 
    
    else {
      template = templateHtml;
      render = (await import('./dist/server/entry-server.js')).render;
    }

    const rendered = await render(url);

    const html = await transformHtmlTemplate(
      rendered.head,
      template.replace('<!--app-html-->', rendered.html ?? '')
    );

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } 
  
  catch (e) {
    console.error(e.stack);
    if (!isProduction) vite?.ssrFixStacktrace(e);
    res.status(500).end(e.stack);
  }
});

// Start HTTP server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
