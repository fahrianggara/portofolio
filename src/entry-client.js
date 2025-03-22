import '@/assets/style.css'
import { createApp } from './main'
import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'

const { app, router } = createApp()
const pinia = createPinia()
const head = createHead()

app.use(pinia)
app.use(head)

router.isReady().then(() => {
  app.mount('#app')
})
