import { createHead } from '@unhead/vue/server'
import { useColorMode } from '@vueuse/core'

export function setupHead() {
  return createHead({
    init: [
      {
        bodyAttrs: {
          class: 'dark:bg-dark-background bg-background relative before:content-[""] before:absolute before:inset-0 before:backdrop-blur-3xl before:z-[1]'
        },
        htmlAttrs: {
          'data-theme':  useColorMode().value
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
        ]
      }
    ]
  })
}
