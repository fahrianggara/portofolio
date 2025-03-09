import './assets/main.css'
import './assets/custom.css'
import 'glightbox/dist/css/glightbox.min.css'
import 'prismjs/themes/prism.min.css'
import Prism from 'prismjs'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GLightbox from 'glightbox'

const app = createApp(App)

app.directive('glightbox', {
    mounted(el) {
        el.lightbox = GLightbox({
            selector: ".glightbox",
        });

        el.lightbox.on('open', () => {
            document.body.classList.remove('glightbox-open');
        });
    },
    unmounted(el) {
        el.lightbox.destroy();
    }
})

app.directive('prism', {
    mounted(el) {
        Prism.highlightAllUnder(el)
    },
    updated(el) {
        Prism.highlightAllUnder(el)
    }
})

app.use(router)

app.mount('#app')
