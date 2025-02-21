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

  onMounted(() => { // Add dark:bg-black class to body element
    document.body.classList.add('dark:bg-black');
  });
</script>

<template>
  <Navbar v-if="route.meta.showNavbarAndFooter" :class="'font-inter'" :isDark="isDark" :toggleDark="toggleDark" />
  <router-view :class="'font-inter'" />
  <Footer v-if="route.meta.showNavbarAndFooter" :class="'font-inter'" />
</template>

<style scoped>

</style>
