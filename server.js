import fs from 'fs'
import path from 'path'
import express from 'express'
import { transformHtmlTemplate } from '@unhead/vue/server'

const isProd = process.env.NODE_ENV === 'production'
const app = express()

let template, render, port

// Production Mode dengan SSR
if (isProd) {
  port = 5174
  template = fs.readFileSync(path.resolve('./dist/client/index.html'), 'utf-8')
  render = (await import('./dist/server/entry-server.js')).render

  // Pastikan file statis bisa diakses
  app.use('/assets', express.static(path.resolve('./dist/client/assets'), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css') // ✅ Set content-type untuk CSS
      }
    }
  }))

  // Middleware untuk menyajikan file statis lainnya
  app.use(express.static(path.resolve('dist/client'), { index: false }))
}

// Development Mode dengan Vite
else {
  port = 5173
  
  const { createServer } = await import('vite') // Import createServer dari Vite
  const vite = await createServer({ // Inisialisasi Vite
    server: { middlewareMode: true },
    appType: 'custom',
    base: '/',
  })

  app.use(vite.middlewares) // Gunakan middleware Vite

  template = fs.readFileSync('index.html', 'utf-8') // Baca template index.html
  render = (await vite.ssrLoadModule('/src/entry-server.js')).render // Load entry-server.js
}

// SSR Middleware
app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl || req.url
    const rendered = await render(url)
    
    const html = await transformHtmlTemplate(
      rendered.head,
      template.replace(`<!--app-html-->`, rendered.html ?? '')
    )
    
    res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
  } 
  
  catch (err) {
    console.error(err)
    res.status(500).end('Internal Server Error')
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})
