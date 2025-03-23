import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { piniaSetup } from '@/stores/piniaSetup'
import { piniaFetch } from '@/stores/piniaFetch'
import { setupHead } from './headSetup'
import { renderMarkdown } from './composables/markdown'

export async function render(url) 
{
  const { app, router } = createApp()
  const pinia = piniaSetup()
  const head = setupHead()

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

export { renderMarkdown }
