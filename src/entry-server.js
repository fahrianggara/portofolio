import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { createHead } from '@unhead/vue/server'
import { piniaSetup } from '@/stores/piniaSetup'
import { piniaFetch } from '@/stores/piniaFetch'

export async function render(url) 
{
  const { app, router } = createApp()
  const pinia = piniaSetup()
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
  await piniaFetch(pinia)

  app.use(pinia)
  app.use(head)

  const ctx = {}
  const html = await renderToString(app, ctx)

  return { 
    html,
    head,
    state: pinia.state.value
  }
}
