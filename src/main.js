import './assets/main.css'
import './assets/custom.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueEasyLightbox from 'vue-easy-lightbox'

const app = createApp(App)

app.use(router)
app.use(VueEasyLightbox)
app.mount('#app')
