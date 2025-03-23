import { createHead } from '@unhead/vue/server'
import { useColorMode } from '@vueuse/core'


export function setupHead() 
{
  const colorMode = useColorMode()

  return createHead({
    init: [
      {
        bodyAttrs: {
          class: 'font-inter dark:bg-dark-background bg-background relative before:content-[""] before:absolute before:inset-0 before:backdrop-blur-3xl before:z-[1]'
        },
        htmlAttrs: {
          'data-theme': () => colorMode.value
        },
        link: [
          {
            rel: 'stylesheet',
            href: 'https://cdn-uicons.flaticon.com/2.6.0/uicons-brands/css/uicons-brands.css'
          },
          {
            rel: 'stylesheet',
            href: 'https://cdn-uicons.flaticon.com/2.6.0/uicons-regular-rounded/css/uicons-regular-rounded.css'
          },
          {
            rel: 'icon',
            href: '/favicon.ico',
          }
        ],
        script: [
          {
            innerHTML: `
(function () {
  let theme = localStorage.getItem('vueuse-color-scheme');
  if (!theme || theme === 'auto') theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();
            `
          }
        ]
      }
    ]
  })
}
