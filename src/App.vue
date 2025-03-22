<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Background from './components/Background.vue';
import Cursor from './components/Cursor.vue';
import { useRoute } from 'vue-router';
import { useIsMobile } from './composables/screen';
import { useSmoothScroll } from './composables/smoothScroll';
import { useDarkMode } from './composables/theme';

const isMobile = useIsMobile();
const route = useRoute();

const theme = useDarkMode();
const isDark = theme.isDark;
const toggleTheme = theme.toggle;

// Smooth scroll
useSmoothScroll();
</script>

<template>
  <!-- Cursor -->
  <Cursor v-if="!isMobile" />

  <!-- Navbar -->
  <Navbar v-if="route.name !== 'home'" 
    :isDark="isDark" 
    @toggleTheme="toggleTheme" />

  <!-- Main content -->
  <main class="flex flex-col min-h-screen font-inter relative z-9">
    <router-view />
    <Footer v-if="route.name !== 'home'" />
  </main>

  <!-- Background -->
  <Background />
</template>
