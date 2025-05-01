import { useSeoMeta, useHead } from "@unhead/vue";
import { useGreetingStore } from "../stores/greeting";
import { useAboutStore } from "../stores/about";
import { useConfigStore } from "../stores/configuration";
import { useRouter } from "vue-router";

export function useMeta(customTitle = null, customDescription = null, customOgImage = null) {
  const greeting = useGreetingStore();
  const about = useAboutStore();
  const config = useConfigStore();
  const router = useRouter();

  const baseUrl = import.meta.env.VITE_BASE_URL;
  const appName = import.meta.env.VITE_APP_NAME;
  const finalTitle = customTitle ? `${customTitle} - ${appName}` : appName;
  const finalDescription = customDescription || greeting.data.subtitle;
  const finalOgImage = customOgImage || `${baseUrl}/og.png`;
  const socials = greeting.data.socials.filter(social => !social.link.includes("@"));

  const navigationSchema = router.options.routes
    .flatMap(route => {
      if (route.path === '/:pathMatch(.*)*' || route.name === 'notFound' || route.name === 'home') return [];
      if (route.children) {
        return route.children.map(child => ({
          "@type": "SiteNavigationElement",
          name: child.name,
          url: `${baseUrl}/${child.path}`
        }));
      }
      return {
        "@type": "SiteNavigationElement",
        name: route.name,
        url: `${baseUrl}${route.path}`
      };
    });

  useSeoMeta({
    title: finalTitle,
    description: finalDescription,
    author: appName,
    robots: "index, follow",
    ogTitle: finalTitle,
    ogDescription: finalDescription,
    ogType: "website",
    ogUrl: `${baseUrl}${router.currentRoute.value.path}`,
    ogImage: finalOgImage,
    ogImageAlt: `${appName} Logo`,
    ogImageType: 'image/png',
    ogSiteName: appName,
    twitterCard: 'summary_large_image',
    twitterTitle: finalTitle,
    twitterDescription: finalDescription,
    twitterImage: finalOgImage,
    twitterImageAlt: `${appName} Logo`,
    keywords: 'fahri anggara, anggara, angga, fahri, indonesia, web developer, web, developer'
  });

  useHead({
    link: [
      { rel: 'canonical', href: `${baseUrl}${router.currentRoute.value.path}` },
    ],
    script: [
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          "name": appName,
          "jobTitle": greeting.data.title,
          "email": `mailto:${config.data.email}`,
          "image": about.data.photo_link,
          "url": baseUrl,
          "sameAs": socials.map(social => social.link),
        })
      },
      {
        type: 'application/ld+json',
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            ...navigationSchema,
          ]
          
        })
      }
    ]
  });
}
