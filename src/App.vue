<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { computed, onMounted, ref, watch, watchEffect } from 'vue';
import { useToggle } from '@vueuse/shared';
import Partials from './components/Partials.vue';
import { useDark } from '@vueuse/core';
import Cursor from "./components/Cursor.vue";
import ToastContainer from './components/ToastContainer.vue';

const route = useRoute(); // Vue Router's route

// Ambil title dari meta
const title = computed(() => route.meta.title);

// Pantau perubahan title dan perbarui document.title
watch(title, (newTitle) => {
  const appName = import.meta.env.VITE_APP_NAME;
  document.title = newTitle ? `${newTitle} - ${appName}` : appName;
}, { immediate: true });

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

// Update saat ukuran layar berubah
const updateIsMobile = () => {
  isMobile.value = window.innerWidth <= 768 || /Mobi|Android/i.test(navigator.userAgent);
};

// Pantau perubahan ukuran layar
watchEffect(() => {
  window.addEventListener('resize', updateIsMobile);
  return () => window.removeEventListener('resize', updateIsMobile);
});

onMounted(() => {
  // Add dark:bg-dark-background when first loaded
  const bodyClasses = [
    'dark:bg-dark-background',
    'bg-background',
    'relative',
    'before:content-[""]',
    'before:absolute',
    'before:inset-0',
    'before:backdrop-blur-3xl',
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
});
</script> 

<template>
  <Cursor />

  <Navbar v-if="route.meta.showNavbarAndFooter" :isDark="isDark" @toggleDark="toggleDark" />
  
  <main class="flex flex-col min-h-screen font-inter relative z-9">
    <router-view :key="$route.fullPath" />
    <Footer v-if="route.meta.showNavbarAndFooter" />
  </main>

  <Partials />

  <ToastContainer />
</template>

<style scoped>

</style>
