<script setup>
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Background from './components/Background.vue';
import Cursor from './components/Cursor.vue';
import LightboxImage from './components/LightboxImage.vue';
import { useRoute } from 'vue-router';
import { useIsMobile } from './composables/screen';
import { useSmoothScroll } from './composables/smoothScroll';
import { useDarkMode } from './composables/theme';
import { useLightbox } from './composables/lightbox';
import { onMounted, ref, watch } from 'vue';

const isMobile = useIsMobile();
const route = useRoute();

const theme = useDarkMode();
const isDark = ref(false);
const toggleTheme = theme.toggle;

onMounted(() => {
  isDark.value = theme.isDark.value;
  watch(theme.isDark, (value) => isDark.value = value);
});

// Smooth scroll
useSmoothScroll();

// Lightbox
const { showLightbox, imagesLightbox, indexLightbox, openLightbox, closeLightbox, nextImage, prevImage } = useLightbox();
</script>

<template>
  <!-- Cursor -->
  <Cursor v-if="!isMobile" />

  <!-- Navbar -->
  <Navbar v-if="route.name !== 'home'" 
    :isDark="isDark" @toggleTheme="toggleTheme" />

  <!-- Main content -->
  <main class="flex flex-col min-h-screen relative z-9" :key="$route.fullPath">
    <router-view />
    <Footer v-if="route.name !== 'home'" />
  </main>

  <!-- Background -->
  <Background />

  <!-- Lightbox -->
  <LightboxImage
    :showLightbox="showLightbox"
    :imagesLightbox="imagesLightbox"
    :indexLightbox="indexLightbox"
    @close="closeLightbox"
    @next="nextImage"
    @prev="prevImage"
  />
</template>
