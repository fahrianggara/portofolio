<script setup>
import { ref } from 'vue';

// Props untuk menerima data dari parent
const props = defineProps({
  showLightbox: Boolean, // Status tampilan lightbox
  imagesLightbox: Array,  // Daftar gambar
  indexLightbox: Number,  // Indeks gambar aktif
});

// Emit events untuk komunikasi dengan parent
const emit = defineEmits(['close', 'next', 'prev']);

// Tutup lightbox
const closeLightbox = () => {
  emit('close');
};

// Navigasi ke gambar berikutnya
const nextImage = () => {
  emit('next');
};

// Navigasi ke gambar sebelumnya
const prevImage = () => {
  emit('prev');
};
</script>

<template>
  <transition name="fade">
    <div v-if="showLightbox" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-container" @click.stop>
        <!-- Tombol tutup -->
        <button class="lightbox-close" @click="closeLightbox">&times;</button>

        <!-- Gambar -->
        <img 
          :src="imagesLightbox[indexLightbox].src" 
          :alt="imagesLightbox[indexLightbox].title" 
          class="lightbox-image"
        />

        <!-- Tombol navigasi -->
        
        <button class="lightbox-nav lightbox-prev" @click.stop="prevImage" v-if="indexLightbox > 0">
          &#10094;
        </button>
        <button class="lightbox-nav lightbox-next" @click.stop="nextImage" v-if="indexLightbox < imagesLightbox.length - 1">
          &#10095;
        </button>
      </div>
    </div>
  </transition>
</template>

<style scoped>
/* Animasi fade in dan fade out */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease-in-out, transform 0.3s ease-in-out;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.80);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1200;
}

.lightbox-container {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  border-radius: 8px;
}

.lightbox-image {
  max-width: 100%;
  max-height: 90vh;
  display: block;
  margin: 0 auto;
}

.lightbox-close {
  position: fixed;
  top: 10px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 30px;
  cursor: pointer;
  color: white;
}

.lightbox-nav {
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  font-size: 24px;
}

.lightbox-prev {
  left: 10px;
}

.lightbox-next {
  right: 10px;
}
</style>
