<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import GLightbox from "glightbox";

const thumbnails = ref([
  "/img/thumb.jpg",
  "/img/thumb-2.jpg",
  "/img/thumb-3.jpg",
  "/img/thumb-4.jpg",
  "/img/thumb-5.jpg",
]);

const currentThumbnail = ref(thumbnails.value[0]);
const filteredThumbnails = computed(() => thumbnails.value.slice(1));

let carouselInterval;
let lightbox = null;
let isLightboxOpen = false;

const startCarousel = () => {
  carouselInterval = setInterval(() => {
    if (!isLightboxOpen && thumbnails.value.length > 1) {
      const firstThumbnail = thumbnails.value.shift();
      thumbnails.value.push(firstThumbnail);
      currentThumbnail.value = thumbnails.value[0];

      updateGLightbox();
    }
  }, 4000);
};

const stopCarousel = () => {
  clearInterval(carouselInterval);
};

const updateGLightbox = async () => {
  await nextTick();
  if (lightbox) lightbox.destroy();
  lightbox = GLightbox({
    selector: ".glightbox",
    touchNavigation: true,
    loop: true,
    onOpen: () => {
      isLightboxOpen = true;
      stopCarousel(); // Hentikan carousel saat lightbox terbuka
    },
    onClose: () => {
      isLightboxOpen = false;
      startCarousel(); // Lanjutkan carousel setelah lightbox ditutup
    },
  });
};

onMounted(() => {
  startCarousel();
  updateGLightbox();
});

onUnmounted(() => {
  stopCarousel();
  if (lightbox) lightbox.destroy();
});
</script>

<template>
  <div class="thumbnail-container" :class="{
    'w-full': !filteredThumbnails.length, 
    'md:w-[calc(100%-7rem)]': filteredThumbnails.length 
    }">
    <!-- Gambar utama -->
    <a 
      :href="currentThumbnail" 
      class="glightbox contents" 
      data-gallery="gallery" 
      :key="currentThumbnail" 
    >
      <img :src="currentThumbnail" alt="Project Thumbnail" class="thumbnail" />
    </a>

    <!-- Thumbnail kecil -->
    <ul v-if="filteredThumbnails.length" class="thumbnails" data-lenis-prevent>
      <li v-for="(thumb, index) in filteredThumbnails" :key="index" class="thumbnail-item">
        <a 
          :href="thumb" 
          class="glightbox" 
          data-gallery="gallery" 
          :key="thumb"
        >
          <img :src="thumb" alt="Project Thumbnail" class="thumbnail" />
        </a>
      </li>
    </ul>
    <div class="clear-both"></div>
  </div>
</template>

<style scoped>
@reference "tailwindcss";
@import "@/assets/main.css";

.thumbnail-container {
  @apply flex flex-col md:flex-row md:items-stretch gap-2 mt-5 md:h-[320px] sm:h-fit;
}

.thumbnail {
  @apply w-full object-cover rounded-xl;
}

.thumbnails {
  @apply flex flex-row-reverse md:flex-col gap-2 flex-shrink-0 
  overflow-x-auto md:overflow-y-auto md:overflow-x-hidden 
  md:max-h-[370px] mr-auto;
}

.thumbnails::-webkit-scrollbar {
  @apply w-1;
}

.thumbnail-item img {
  @apply w-[100px] h-[75px] object-cover rounded-lg cursor-pointer shadow-md;
}
</style>