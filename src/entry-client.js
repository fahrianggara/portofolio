import './style.css';
import { createApp } from './main';
import { createHead } from '@unhead/vue/client';

const { app, router } = createApp();
const head = createHead();

router.isReady().then(() => {
  app.use(head);
  app.mount('#app');
});