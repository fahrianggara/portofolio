import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'
import { piniaSetup } from './stores/piniaSetup';
import { piniaFetch } from './stores/piniaFetch';

const isSSR = import.meta.env?.SSR ?? process.env.VITE_SSR === 'true';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
    meta: { priority: 0.9 },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: { priority: 0.1 },
  },
  {
    path: '/',
    component: () => import('./components/Section.vue'),
    children: [
      {
        path: 'about',
        name: 'about',
        component: () => import('./pages/AboutPage.vue'),
        meta: { priority: 0.8 },
      },
      {
        path: 'education',
        name: 'education',
        component: () => import('./pages/EducationPage.vue'),
        meta: { priority: 0.7 },
      },
      {
        path: 'experience',
        name: 'experience',
        component: () => import('./pages/ExperiencePage.vue'),
        meta: { priority: 0.7 },
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('./pages/ProjectsPage.vue'),
        meta: { priority: 0.8 },
      },
      {
        path: 'projects/:slug',
        name: 'project',
        component: () => import('./pages/ProjectPage.vue'),
        meta: { priority: 0.5 },
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('./pages/ContactPage.vue'),
        meta: { priority: 0.6 },
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('./pages/ActivityPage.vue'),
        meta: { priority: 0.6 },
      }
    ],
  }
]

export function createRouter() {
  const router = _createRouter({
    history: isSSR ? createMemoryHistory() : createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      } else {
        return { top: 0, behavior: 'smooth' };
      }
    }
  });

  // Tambahkan beforeResolve untuk fetch data sebelum masuk ke halaman baru
  router.beforeResolve(async (to, from, next) => {
    const pinia = piniaSetup();
    try {
      await piniaFetch(pinia, to); // Fetch data sebelum halaman berpindah
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
    next(); // Lanjutkan navigasi
  });

  return router;
}
