<script setup>

import Sidebar from "@/components/Sidebar.vue";
import { useScreenSize } from "@/utils/screenResize.js";
import Thumbnail from "@/components/projects/Thumbnail.vue";
const { resizeScreen } = useScreenSize();
</script>


<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 lg:gap-8 relative">
        <div class="dark:text-white hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 mb-5">
          <router-link to="/projects" class="back">
            <i class="fi fi-rr-angle-small-left"></i> Back to Projects
          </router-link>

          <Thumbnail />

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
@import "@/assets/main.css";

.back {
  @apply dark:bg-dark-bg-primary/50 bg-bg-primary/60 backdrop-blur-lg
    inline-flex items-center px-4 py-3 pr-5 rounded-full text-sm font-medium cursor-pointer
    text-primary hover:bg-primary/80 hover:text-white ease-in-out duration-300;
}

.back i {
  @apply relative top-0.5 mr-1;
}

.thumbnail-container {
  @apply flex flex-col md:flex-row items-stretch gap-2 mt-5 md:h-[315px] h-full;
}

.thumbnail {
  @apply w-full object-cover rounded-xl;
}

.thumbnails {
  @apply flex flex-row md:flex-col gap-2 flex-shrink-0 
    overflow-x-auto md:overflow-y-auto md:overflow-x-hidden 
    md:max-h-[370px];
}

.thumbnails::-webkit-scrollbar {
  @apply w-1;
}

.thumbnail-item img {
  @apply w-[100px] h-[75px] object-cover rounded-lg cursor-pointer shadow-md;
}
</style>
