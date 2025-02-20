import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  let title = to.name.charAt(0).toUpperCase() + to.name.slice(1)
  let appName = 'Fahri Anggara'
  document.title = to.name === 'home' ? appName : `${title} - ${appName}`
  next()
})

export default router
