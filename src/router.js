import { createMemoryHistory, createRouter as _createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('./pages/HomePage.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('./pages/NotFoundPage.vue'),
  },
  {
    path: '/',
    component: () => import('./components/Section.vue'),
    children: [
      {
        path: '/about',
        name: 'about',
        component: () => import('./pages/AboutPage.vue'),
      }
    ],
  }
]

export function createRouter() {
  return _createRouter({
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
}