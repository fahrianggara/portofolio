<script setup>
  import Navbar from './components/Navbar.vue';
  import Footer from './components/Footer.vue';
  import { useRoute } from 'vue-router';
  import { onMounted } from 'vue';
  import { useDark, useToggle } from '@vueuse/core';

  const route = useRoute();

  const isDark = useDark({
    selector: 'html',
    attribute: 'data-theme',
    valueDark: 'dark',
    valueLight: 'light',
  });
  const toggleDark = useToggle(isDark);

  onMounted(() => { // Add dark:bg-dark-background class to body element
    document.body.classList.add('dark:bg-dark-background', 'bg-background');
  });
</script>

<template>
  <main class="flex flex-col min-h-screen">
    <Navbar v-if="route.meta.showNavbarAndFooter" :isDark="isDark" :toggleDark="toggleDark" />
    <router-view />
    <Footer v-if="route.meta.showNavbarAndFooter" />
  </main>
</template>

<style scoped>

</style>
