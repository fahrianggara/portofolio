<script setup>
import { onMounted, ref, watch } from 'vue';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';
import Background from './components/Background.vue';
import Cursor from './components/Cursor.vue';
import LightboxImage from './components/LightboxImage.vue';
import ToastContainer from './components/ToastContainer.vue';
import { useRoute } from 'vue-router';
import { useIsMobile } from './composables/screen';
import { useSmoothScroll } from './composables/smoothScroll';
import { useDarkMode } from './composables/theme';
import { useLightbox } from './composables/lightbox';

const isMobile = useIsMobile();
const route = useRoute();
const hydrated = ref(false); // Tambahkan ini

const theme = useDarkMode();
const isDark = ref(false);
const toggleTheme = theme.toggle;

onMounted(() => {
  isDark.value = theme.isDark.value;
  watch(theme.isDark, (value) => isDark.value = value);
  hydrated.value = true; // Client siap, baru render konten
});

// Smooth scroll
useSmoothScroll();

// Lightbox
const { showLightbox, imagesLightbox, indexLightbox, openLightbox, closeLightbox, nextImage, prevImage } = useLightbox();
</script>

<template>
  <!-- Cursor -->
  <Cursor v-if="hydrated && !isMobile" />

  <!-- Navbar -->
  <Navbar v-if="hydrated && route.name !== 'home' && route.name !== 'notFound'" 
    :isDark="isDark" @toggleTheme="toggleTheme" />

  <!-- Main content -->
  <main v-if="hydrated" class="flex flex-col min-h-screen relative z-9">
    <router-view :key="$route.fullPath" />
    <Footer v-if="route.name !== 'home' && route.name !== 'notFound'" />
  </main>

  <!-- Background -->
  <Background v-if="hydrated" />

  <!-- Toast -->
  <ToastContainer v-if="hydrated" />

  <!-- Lightbox -->
  <LightboxImage 
    v-if="hydrated"
    :showLightbox="showLightbox" 
    :imagesLightbox="imagesLightbox" 
    :indexLightbox="indexLightbox"
    @close="closeLightbox"
    @next="nextImage"
    @prev="prevImage"
  />
</template>
