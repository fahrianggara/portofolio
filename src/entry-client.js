import '@/assets/style.css'
import { createApp } from './main'
import { createHead } from '@unhead/vue/client'
import { setupPinia  } from '@/stores'

const { app } = createApp()
const head = createHead()
const pinia = setupPinia()

if (window.__PINIA_STATE__) {
  pinia.state.value = window.__PINIA_STATE__;
}

app.use(head)
app.use(pinia)
app.mount('#app')