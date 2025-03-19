import './assets/main.css'
import './assets/custom.css'
import 'glightbox/dist/css/glightbox.min.css'
import 'prismjs/themes/prism.min.css'
import 'vue3-calendar-heatmap/dist/style.css'

import prismDirective from './directives/prism'
import glightboxDirective from './directives/glightbox'
import VueLazyLoad from 'vue3-lazyload'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createHead } from '@unhead/vue/client';

import App from './App.vue'
import router from './router'

const pinia = createPinia()
const head = createHead();
const app = createApp(App)

app.directive('glightbox', glightboxDirective)
app.directive('prism', prismDirective)

app.use(router)
app.use(pinia)
app.use(head)
app.use(VueLazyLoad)

app.mount('#app')
