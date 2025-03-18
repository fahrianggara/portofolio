<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { useToggle } from '@vueuse/shared';
import Parallax from './components/Parallax.vue';
import { useDark } from '@vueuse/core';
import GlowCursor from "./components/GlowCursor.vue";
import ToastContainer from './components/ToastContainer.vue';

const route = useRoute();

// Dark Mode
const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
});

// Dark Mode Toggle
const toggleDark = useToggle(isDark);

// Function to check if the device is mobile
const isMobile = () => window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);

onMounted(() => {
  // Add dark:bg-dark-background when first loaded
  const bodyClasses = [
    'dark:bg-dark-background',
    'bg-background',
    'relative',
    'before:content-[""]',
    'before:absolute',
    'before:inset-0',
    'before:backdrop-blur-2xl',
    'before:z-[1]',
  ];
  document.body.classList.add(...bodyClasses);

  // Smooth Scroll with Lenis (only if not mobile)
  if (!isMobile()) {
    import("lenis").then(({ default: Lenis }) => {
      const lenis = new Lenis();

      function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      // Scroll to top when route changes
      watch(route, () => {
        lenis.scrollTo(0, { behavior: "smooth" });
      });
    });
  }

  console.log(`BASE_URL: ${import.meta.env.VITE_BASE_URL}`, `API_URL: ${import.meta.env.VITE_API_URL}`);
});
</script>


<template>
  <GlowCursor />
  <Navbar v-if="route.meta.showNavbarAndFooter" :isDark="isDark" @toggleDark="toggleDark" />
  
  <main class="flex flex-col min-h-screen font-inter relative z-9">
    <router-view :key="$route.fullPath" />
    <Footer v-if="route.meta.showNavbarAndFooter" />
  </main>

  <Parallax />

  <ToastContainer />
</template>

<style scoped>

</style>
