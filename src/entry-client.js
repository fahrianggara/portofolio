import './assets/style.css'
import { createApp } from './main'
import { createHead } from '@unhead/vue/client'
import { piniaSetup } from './stores/piniaSetup'
import { piniaFetch } from './stores/piniaFetch'

const { app, router } = createApp()
const pinia = piniaSetup()
const head = createHead()

app.use(pinia)
app.use(head)

// Pastikan data sudah tersedia sebelum mounting
router.isReady().then(async () => {
  app.mount('#app')
})
