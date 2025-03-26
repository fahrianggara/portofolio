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
      },
      {
        path: '/education',
        name: 'education',
        component: () => import('./pages/EducationPage.vue'),
      },
      {
        path: '/experience',
        name: 'experience',
        component: () => import('./pages/ExperiencePage.vue'),
      },
      {
        path: '/projects',
        name: 'projects',
        component: () => import('./pages/ProjectsPage.vue'),
      },
      {
        path: '/projects/:slug',
        name: 'project',
        component: () => import('./pages/ProjectPage.vue'),
      },
      {
        path: '/contact',
        name: 'contact',
        component: () => import('./pages/ContactPage.vue'),
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