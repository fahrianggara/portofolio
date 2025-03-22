import '@/assets/style.css'
import { createApp } from './main'
import { createHead } from '@unhead/vue/client'
import { createPinia } from 'pinia'

const { app } = createApp()
const head = createHead()
const pinia = createPinia()

app.use(head)
app.use(pinia)
app.mount('#app')