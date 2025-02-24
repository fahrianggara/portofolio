import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import EducationView from '@/views/EducationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { 
        showNavbarAndFooter: false,
        title: null
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { 
        showNavbarAndFooter: true,
        title: 'About Me'
      }
    },
    {
      path: '/edu',
      name: 'edu',
      component: EducationView,
      meta: { 
        showNavbarAndFooter: true,
        title: 'Education'
      }
    }
  ],
})

router.beforeEach((to, from, next) => {
  let appName = 'Fahri Anggara'
  document.title = to.meta.title ? `${to.meta.title} - ${appName}` : appName
  next()
})

export default router
