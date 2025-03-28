<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useIsMobile } from '../composables/screen'; // Import useIsMobile

// Props dari parent
const props = defineProps({
  showLightbox: Boolean,
  imagesLightbox: Array,
  indexLightbox: Number,
});

// Emit events ke parent
const emit = defineEmits(['close', 'next', 'prev']);

// Gunakan useIsMobile untuk deteksi mobile
const isMobile = useIsMobile();

// Variables untuk swipe gesture
const touchStartX = ref(0);
const touchEndX = ref(0);

// Tutup lightbox
const closeLightbox = () => emit('close');

// Navigasi gambar
const nextImage = () => {
  if (props.indexLightbox < props.imagesLightbox.length - 1) {
    emit('next');
  }
};

const prevImage = () => {
  if (props.indexLightbox > 0) {
    emit('prev');
  }
};

// Simpan posisi awal touch
const handleTouchStart = (e) => {
  touchStartX.value = e.touches[0].clientX;
};

// Simpan posisi akhir touch dan tentukan arah swipe
const handleTouchEnd = (e) => {
  touchEndX.value = e.changedTouches[0].clientX;
  const diffX = touchStartX.value - touchEndX.value;

  if (diffX > 50) {
    nextImage(); // Swipe kiri -> kanan (next)
  } else if (diffX < -50) {
    prevImage(); // Swipe kanan -> kiri (prev)
  }
};

// Keybind untuk navigasi gambar
const handleKeydown = (e) => {
  if (e.key === 'ArrowRight') nextImage();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'Escape') closeLightbox();
};

// Tambahkan event listener di mobile dan keybind di desktop
onMounted(() => {
  if (isMobile.value) {
    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchend', handleTouchEnd);
  }
  window.addEventListener('keydown', handleKeydown);
});

// Hapus event listener saat unmount
onUnmounted(() => {
  if (isMobile.value) {
    document.removeEventListener('touchstart', handleTouchStart);
    document.removeEventListener('touchend', handleTouchEnd);
  }
  window.removeEventListener('keydown', handleKeydown);
});
</script>

<template>
  <div v-show="showLightbox" class="lightbox-body">
    <div class="lightbox-overlay" @click="closeLightbox"></div>

    <div class="lightbox-container">
      <div class="lightbox-counter">
        {{ indexLightbox + 1 }} / {{ imagesLightbox.length }}
      </div>

      <button class="lightbox-close" @click="closeLightbox">
        <i class="fi fi-rr-cross"></i>
      </button>

      <!-- Tambahkan key agar transisi berjalan dengan baik -->
      <Transition name="fade" mode="out-in">
        <img
          v-if="showLightbox"
          :key="indexLightbox"
          :src="imagesLightbox[indexLightbox].src"
          :alt="imagesLightbox[indexLightbox].title"
          class="lightbox-image"
        />
      </Transition>

      <!-- Tampilkan tombol prev & next hanya di desktop -->
      <button v-if="!isMobile" class="lightbox-nav lightbox-prev" @click="prevImage" 
        :disabled="indexLightbox === 0">
        <i class="fi fi-rr-angle-left"></i>
      </button>

      <button v-if="!isMobile" class="lightbox-nav lightbox-next" @click="nextImage" 
        :disabled="indexLightbox === imagesLightbox.length - 1">
        <i class="fi fi-rr-angle-right"></i>
      </button>
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.lightbox-body {
  @apply fixed top-0 left-0 w-full h-full z-[1200] flex justify-center items-center;
}

.lightbox-overlay {
  @apply absolute top-0 left-0 w-full h-full bg-black opacity-95;
}

.lightbox-container {
  @apply relative z-[1300] max-w-full max-h-full rounded-lg;
}

.lightbox-image {
  @apply max-w-full max-h-[95vh] block m-auto;
}

.lightbox-close {
  @apply fixed top-[16px] right-[20px] bg-transparent border-none text-white 
  text-[18px] cursor-pointer;
}

.lightbox-counter {
  @apply text-white fixed top-2 left-2 text-sm bg-black/50 p-2 rounded-lg;
}

/* Tombol navigasi hanya untuk desktop */
.lightbox-nav {
  @apply text-[16px] md:text-[24px] p-[10px] cursor-pointer border-none text-white fixed top-1/2;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
}

.lightbox-nav i {
  @apply relative top-[1.5px];
}

.lightbox-nav:disabled {
  @apply opacity-[0] cursor-default;
}

.lightbox-prev {
  @apply left-[10px];
}

.lightbox-next {
  @apply right-[10px];
}
</style>
