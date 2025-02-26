<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { onMounted, onUnmounted, ref, watchEffect } from 'vue';
import { useToggle } from '@vueuse/shared';
import Parallax from './components/Parallax.vue';
import { useDark } from '@vueuse/core';

const route = useRoute();

// Dark Mode
const isDark = useDark({
  selector: 'html',
  attribute: 'data-theme',
  valueDark: 'dark',
  valueLight: 'light',
});
const toggleDark = useToggle(isDark);

onMounted(() => {
  // Tambahkan dark:bg-dark-background saat pertama kali dimuat
  const bodyClasses = [
    'dark:bg-dark-background',
    'bg-background',
    'min-h-screen',
    'relative', // Tambahkan relative agar before muncul
    'before:content-[""]',
    'before:absolute',
    'before:inset-0',
    'before:backdrop-blur-2xl',
    'before:z-[1]', // Pastikan before ada di belakang konten
  ];

  document.body.classList.add(...bodyClasses);
});
</script>

<template>
  <Navbar v-if="route.meta.showNavbarAndFooter" :isDark="isDark"  @toggleDark="toggleDark" />
  
  <main class="flex flex-col font-inter relative z-10">
    <router-view />
    <Footer v-if="route.meta.showNavbarAndFooter" />
  </main>
  
  <Parallax />
</template>

<style scoped>

</style>
