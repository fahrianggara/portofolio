import { createHead } from '@unhead/vue/server'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { createPinia } from 'pinia'

export async function render(url) {
  const { app, router } = createApp()
  const head = createHead({
    init: [
      {
        bodyAttrs: {
          class: 'dark:bg-dark-background bg-background relative before:content-[""] before:absolute before:inset-0 before:backdrop-blur-3xl before:z-[1]'
        }
      }
    ]
  })
  const pinia = createPinia()

  app.use(head)
  app.use(pinia)

  await router.push(url)
  await router.isReady()

  const ctx = {}
  const html = await renderToString(app, ctx)

  return { 
    html, 
    head,
  }
}
