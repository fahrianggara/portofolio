import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const isSSR = import.meta.env?.SSR ?? process.env.VITE_SSR === 'true';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
    meta: { priority: 0.9, showNav: false },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('./pages/NotFoundPage.vue'),
    meta: { priority: 0.1, showNav: false },
  },
  {
    path: '/',
    component: () => import('./components/Section.vue'),
    children: [
      {
        path: 'about',
        name: 'about',
        component: () => import('./pages/AboutPage.vue'),
        meta: { priority: 0.8, showNav: true },
      },
      {
        path: 'education',
        name: 'education',
        component: () => import('./pages/EducationPage.vue'),
        meta: { priority: 0.7, showNav: true },
      },
      {
        path: 'experience',
        name: 'experience',
        component: () => import('./pages/ExperiencePage.vue'),
        meta: { priority: 0.7, showNav: true },
      },
      {
        path: 'projects',
        name: 'projects',
        component: () => import('./pages/ProjectsPage.vue'),
        meta: { priority: 0.8, showNav: true },
      },
      {
        path: 'projects/:slug',
        name: 'project',
        component: () => import('./pages/ProjectPage.vue'),
        meta: { priority: 0.5, showNav: true },
      },
      {
        path: 'contact',
        name: 'contact',
        component: () => import('./pages/ContactPage.vue'),
        meta: { priority: 0.6, showNav: true },
      },
      {
        path: 'activity',
        name: 'activity',
        component: () => import('./pages/ActivityPage.vue'),
        meta: { priority: 0.6, showNav: true },
      }
    ],
  }
]

export function createRouter() {
  return _createRouter({
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
}