<script setup>
import { ref, computed, watch, inject } from "vue";

const openLightbox = inject("openLightbox");

const thumbnails = ref([]);
const props = defineProps({
  project: Object,
});

watch(() => props.project,
  (value) => {
    if (value) {
      thumbnails.value = value.images_link
        ? [value.image_link, ...value.images_link]
        : [value.image_link];
    }
  },
  { immediate: true }
);

const currentThumbnail = ref(thumbnails.value[0]);
const filteredThumbnails = computed(() => thumbnails.value.slice(1));

// Buka lightbox
const openImageLightbox = (index) => {
  openLightbox(index, thumbnails.value.map((src) => ({ src })));
};

// Ekspos fungsi jika diperlukan
defineExpose({
  openImageLightbox
});
</script>

<template>
  <div class="thumbnail-wrapper" :class="{
      'w-full': !filteredThumbnails.length,
      'md:w-[calc(100%-7rem)]': filteredThumbnails.length,
    }">
    
    <img :src="currentThumbnail" class="thumbnail" @click="openImageLightbox(0)"/>

    <ul v-if="filteredThumbnails.length" class="thumbnails" data-lenis-prevent>
      <li v-for="(thumbnail, i) in filteredThumbnails" :key="i" class="thumbnail-item">
        <img 
          :src="thumbnail" 
          alt="Project Thumbnail" 
          class="thumbnail" 
          @click="openImageLightbox(i + 1)"
        />
      </li>
    </ul>

    <div class="clear-both"></div>
  </div>
</template>

<style scoped>
@import "@/assets/style.css";

.thumbnail-wrapper {
  @apply flex flex-col md:flex-row md:items-stretch gap-2 mt-5 md:h-[320px] sm:h-fit;
}

.thumbnail {
  @apply w-full object-cover rounded-xl border border-solid 
  border-gray-300 dark:border-zinc-900 cursor-pointer;
}

.thumbnails {
  @apply flex flex-row md:flex-col gap-2 flex-shrink-0 
  overflow-x-auto md:overflow-y-auto md:overflow-x-hidden 
  md:max-h-[370px] mr-auto;
}

.thumbnails::-webkit-scrollbar {
  @apply w-1;
}

.thumbnail-item img {
  @apply w-[100px] h-[75px] object-cover rounded-lg cursor-pointer border 
  border-solid border-gray-300 dark:border-zinc-800;
}
</style>
