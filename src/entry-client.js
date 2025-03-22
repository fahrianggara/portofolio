import '@/assets/style.css'
import { createApp } from './main'
import { createHead } from '@unhead/vue/client'
import { piniaSetup } from '@/stores/piniaSetup'

const { app, router } = createApp()
const pinia = piniaSetup()
const head = createHead()

if (window.__PINIA_STATE__) {
  pinia.state.value = window.__PINIA_STATE__;
}

app.use(pinia)
app.use(head)

router.isReady().then(() => {
  app.mount('#app')
})
