import { createHead } from '@unhead/vue/server'
import { renderToString } from 'vue/server-renderer'
import { createApp } from './main'
import { setupPinia } from '@/stores'
import { fetchStoresData } from '@/stores/ssrPinia' // Import auto-fetch

export async function render(url) {
  const { app, router } = createApp()
  const head = createHead()
  const pinia = setupPinia()

  app.use(head)
  app.use(pinia)

  await router.push(url)
  await router.isReady()
  await fetchStoresData(pinia) // Fetch data dari store

  const ctx = {}
  const html = await renderToString(app, ctx)

  return { 
    html, 
    head,
    state: pinia.state.value // State sudah berisi data
  }
}
