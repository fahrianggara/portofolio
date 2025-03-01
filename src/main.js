import './assets/main.css'
import './assets/custom.css'
import 'glightbox/dist/css/glightbox.min.css'

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

app.use(router).mount('#app')
