import { createRouter, createWebHistory } from 'vue-router'
import { useHead } from '@vueuse/head'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import EducationView from '@/views/EducationView.vue'
import PageNotFound from '@/views/PageNotFoundView.vue'

const defaultDescription = "Hi, I'm Fahri Anggara. Experienced Web Developer and UI/UX Designer skilled in creating responsive websites and intuitive interfaces. Strong problem-solving, communication, and adaptability."

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { 
        showNavbarAndFooter: false,
        title: null,
        description: defaultDescription
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { 
        showNavbarAndFooter: true,
        title: 'About Me',
        description: "Learn more about me, an experienced Web Developer & UI/UX Designer."
      }
    },
    {
      path: '/edu',
      name: 'edu',
      component: EducationView,
      meta: { 
        showNavbarAndFooter: true,
        title: 'Education',
        description: "Discover my educational background and learning journey."
      }
    },
    {
      path: '/experience',
      name: 'experience',
      component: () => import('@/views/ExperienceView.vue'),
      meta: { 
        showNavbarAndFooter: true,
        title: 'Experience',
        description: "Explore my work experiences and projects."
      }
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('@/views/ProjectsView.vue'),
      meta: { 
        showNavbarAndFooter: true,
        title: 'Projects',
        description: "View my web development projects and UI/UX designs."
      },
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: () => import('@/views/ProjectsDetailView.vue'),
      meta: { 
        showNavbarAndFooter: true,
        title: 'Project Detail'
      },
    },
    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
      meta: { 
        showNavbarAndFooter: true,
        title: 'Contact',
        description: "Get in touch with me to discuss potential projects or collaborations."
      }
    },
    {
      path: '/activity',
      name: 'activity',
      component: () => import('@/views/ActivityView.vue'),
      meta: { 
        showNavbarAndFooter: true,
        title: 'Activity',
        description: "View my recent activities."
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: PageNotFound,
      meta: { 
        showNavbarAndFooter: false,
        title: '404'
      }
    }
  ],
  
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: 'smooth' };
    }
  }
})

// Menggunakan VueUse Head untuk meta tags
router.beforeEach((to, from, next) => {
  let appName = 'Fahri Anggara'
  let title = to.meta.title ? `${to.meta.title} - ${appName}` : appName
  let description = to.meta.description || defaultDescription

  useHead({
    title,
    meta: [
      { name: 'description', content: description },
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: 'website' }
    ]
  })

  next()
})

export default router
