import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/server'

export async function render(url) 
{
  const { app, router } = createApp()
  const pinia = createPinia()
  const head = createHead({
    init: [
      {
        bodyAttrs: {
          class: 'dark:bg-dark-background bg-background relative before:content-[""] before:absolute before:inset-0 before:backdrop-blur-3xl before:z-[1]'
        }
      }
    ]
  })


  await router.push(url)
  await router.isReady()

  app.use(pinia)
  app.use(head)

  const ctx = {}
  const html = await renderToString(app, ctx)

  return { 
    html,
    head
  }
}
