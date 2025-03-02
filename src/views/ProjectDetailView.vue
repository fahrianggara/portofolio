<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { useScreenSize } from "@/utils/screenResize.js";
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

          <div class="thumbnail-container">
            <img src="https://picsum.photos/1080/720" alt="Project Thumbnail" class="thumbnail" />
            <ul class="thumbnails" data-lenis-prevent>
              <li class="thumbnail-item">
                <img src="https://picsum.photos/1080/721" alt="Project Thumbnail" class="thumbnail" />
              </li>
              <li class="thumbnail-item">
                <img src="https://picsum.photos/1080/722" alt="Project Thumbnail" class="thumbnail" />
              </li>
              <li class="thumbnail-item">
                <img src="https://picsum.photos/1080/723" alt="Project Thumbnail" class="thumbnail" />
              </li>
              <li class="thumbnail-item">
                <img src="https://picsum.photos/1080/718" alt="Project Thumbnail" class="thumbnail" />
              </li>
              <li class="thumbnail-item">
                <img src="https://picsum.photos/1080/719" alt="Project Thumbnail" class="thumbnail" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  .back {
    @apply dark:bg-dark-bg-primary bg-bg-primary
    inline-flex items-center px-4 py-3 pr-5 rounded-full text-sm font-medium cursor-pointer
    text-primary hover:bg-primary hover:text-white ease-in-out duration-300;
  }

  .back i {
    @apply relative top-0.5 mr-1;
  }

  /* Membuat thumbnail utama dan thumbnails kecil sejajar */
  .thumbnail-container {
    @apply flex flex-col md:flex-row items-stretch gap-2 mt-5 md:w-[calc(100%-7rem)] w-full;
  }

  /* Gambar utama */
  .thumbnail {
    @apply w-full object-cover rounded-xl md:h-[370px] h-full;
  }

  /* Daftar thumbnails menyesuaikan tinggi gambar utama */
  .thumbnails {
    @apply flex flex-row md:flex-col gap-2 flex-shrink-0 
    overflow-x-auto md:overflow-y-auto md:overflow-x-hidden 
    md:max-h-[370px];
  }

  .thumbnails::-webkit-scrollbar {
    @apply w-1;
  }

  /* Gambar kecil */
  .thumbnail-item img {
    @apply w-[100px] h-[75px] object-cover rounded-lg cursor-pointer shadow-md;
  }
</style>