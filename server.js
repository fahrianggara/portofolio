import fs from 'fs'
import path from 'node:path'  
import express from 'express'
import { createServer } from 'vite'

const port = 3001
const app = express()
const vite = await createServer({
  root: path.resolve('.'),
  logLevel: 'info',
  appType: 'custom',
  server : {
    middlewareMode: true,
    watch: {
      usePolling: true,
      interval: 100
    }
  }
})

app.use(vite.middlewares)
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl || req.url;
    let template = fs.readFileSync(path.resolve('index.html'), 'utf-8');
    template = await vite.transformIndexHtml(url, template);

    const { render } = await vite.ssrLoadModule('/src/entry-server.js');

    const renderRes = await render(url);

    const html = template.replace(`<!--app-html-->`, renderRes.html);

    res.status(200).set({
      'Content-Type': 'text/html',
    }).end(html);

    console.log(renderRes.html);
  } catch (e) {
    vite && vite.ssrFixStacktrace(e);
    console.error(e.stack);
    res.status(500).end(e.stack);
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
})