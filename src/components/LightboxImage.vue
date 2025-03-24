<script setup>
// Props untuk menerima data dari parent
const props = defineProps({
  showLightbox: Boolean, // Status tampilan lightbox
  imagesLightbox: Array,  // Daftar gambar
  indexLightbox: Number,  // Indeks gambar aktif
});

// Emit events untuk komunikasi dengan parent
const emit = defineEmits(['close', 'next', 'prev']);

// Tutup lightbox
const closeLightbox = () => emit('close');

// Navigasi ke gambar berikutnya
const nextImage = () => emit('next');

// Navigasi ke gambar sebelumnya
const prevImage = () => emit('prev');
</script>

<template>
  <div v-show="showLightbox" class="lightbox-body">
    <div class="lightbox-overlay" @click="closeLightbox"></div>

    <div class="lightbox-container">
      <button class="lightbox-close" @click="closeLightbox">
        <i class="fi fi-rr-cross"></i>
      </button>

      <!-- Tambahkan key agar transisi berjalan dengan baik -->
      <Transition name="zoom" mode="out-in">
        <img
          v-if="showLightbox"
          :key="indexLightbox"
          :src="imagesLightbox[indexLightbox].src" 
          :alt="imagesLightbox[indexLightbox].title" 
          class="lightbox-image"
        />
      </Transition>
      
      <button class="lightbox-nav lightbox-prev" @click.stop="prevImage" 
        :disabled="indexLightbox === 0">
        <i class="fi fi-rr-angle-left"></i>
      </button>

      <button class="lightbox-nav lightbox-next" @click.stop="nextImage" 
        :disabled="indexLightbox === imagesLightbox.length - 1">
        <i class="fi fi-rr-angle-right"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.zoom-enter-active, .zoom-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.zoom-enter-from {
  opacity: 0;
  transform: scale(0.8);
}

.zoom-leave-to {
  opacity: 0;
  transform: scale(0.8);
}

.lightbox-body {
  @apply fixed top-0 left-0 w-full h-full z-[1200] flex justify-center items-center;
}

.lightbox-overlay {
  @apply absolute top-0 left-0 w-full h-full dark:bg-black bg-white dark:opacity-100 opacity-80;
}

.lightbox-container {
  @apply relative z-[1300] max-w-full max-h-full rounded-lg;
}

.lightbox-image {
  @apply max-w-full max-h-[95vh] block m-auto;
}

.lightbox-close {
  @apply fixed top-[16px] right-[20px] bg-transparent border-none dark:text-white 
  text-[18px] cursor-pointer;
}

.lightbox-nav {
  @apply text-[16px] md:text-[24px] p-[10px] cursor-pointer border-none text-white fixed top-1/2;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
}

.lightbox-nav i {
  @apply relative top-[1.5px];
}

.lightbox-nav:disabled {
  @apply opacity-[0.1] cursor-default;
}

.lightbox-prev {
  @apply left-[10px];
}

.lightbox-next {
  @apply right-[10px];
}
</style>
