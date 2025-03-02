<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref, watch } from 'vue';
import { useToggle } from '@vueuse/shared';
import Parallax from './components/Parallax.vue';
import { useDark } from '@vueuse/core';
import Lenis from "@studio-freight/lenis";
import GlowCursor from "./components/GlowCursor.vue";

const route = useRoute();

// Dark Mode
const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
});
const toggleDark = useToggle(isDark);

const lenis = new Lenis();


onMounted(() => {
  // Tambahkan dark:bg-dark-background saat pertama kali dimuat
  const bodyClasses = [
    'dark:bg-dark-background',
    'bg-background',
    'relative', // Tambahkan relative agar before muncul
    'before:content-[""]',
    'before:absolute',
    'before:inset-0',
    'before:backdrop-blur-2xl',
    'before:z-[1]', // Pastikan before ada di belakang konten
  ];

  document.body.classList.add(...bodyClasses);

  // Smooth Scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});

// Scroll ke atas saat route berubah
watch(route, () => {
  lenis.scrollTo(0, { behavior: "smooth" });
});
</script>

<template>
  <GlowCursor />
  <Navbar v-if="route.meta.showNavbarAndFooter" :isDark="isDark"  @toggleDark="toggleDark" />
  
  <main class="flex flex-col min-h-screen font-inter relative z-9">
    <router-view />
    <Footer v-if="route.meta.showNavbarAndFooter" />
  </main>

  <Parallax />
</template>

<style scoped>

</style>
