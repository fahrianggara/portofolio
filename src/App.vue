<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Background from './components/Background.vue';
import Cursor from './components/Cursor.vue';
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { useIsMobile } from './composables/screen';
import { useSmoothScroll } from './composables/smoothScroll';

const isMobile = useIsMobile();
const route = useRoute();

// Smooth scroll
useSmoothScroll();

onMounted(() => {
  // Add dark:bg-dark-background when first loaded
  const bodyClasses = [
    'dark:bg-dark-background','bg-background','relative','before:content-[""]','before:absolute',
    'before:inset-0','before:backdrop-blur-3xl','before:z-[1]',
  ];
  document.body.classList.add(...bodyClasses);
});
</script>

<template>
  <!-- Cursor -->
  <Cursor v-if="!isMobile" />

  <!-- Navbar -->
  <Navbar v-if="route.name !== 'Home'" />

  <!-- Main content -->
  <main class="flex flex-col min-h-screen font-inter relative z-9">
    <router-view />
    <Footer v-if="route.name !== 'Home'" />
  </main>

  <!-- Background -->
  <Background />
</template>
