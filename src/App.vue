<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import { useRoute } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useDark, useToggle } from '@vueuse/core';

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
  document.body.classList.add('dark:bg-dark-background', 'bg-background');
});
</script>

<template>
  <Navbar v-if="route.meta.showNavbarAndFooter" :isDark="isDark" :toggleDark="toggleDark" />
  <main class="flex flex-col min-h-screen font-inter">
    <router-view />
    <Footer v-if="route.meta.showNavbarAndFooter" />
  </main>
</template>

<style scoped>

</style>
