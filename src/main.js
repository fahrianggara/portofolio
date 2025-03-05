import './assets/main.css'
import './assets/custom.css'
import 'glightbox/dist/css/glightbox.min.css'
import 'vue3-calendar-heatmap/dist/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import GLightbox from 'glightbox'
import VueCalendarHeatmap from 'vue3-calendar-heatmap'
import axios from 'axios'

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

app.use(router)
app.use(VueCalendarHeatmap)

app.mount('#app')

axios.defaults.headers.get['header-name'] = ''
