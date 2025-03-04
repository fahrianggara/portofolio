<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { useScreenSize } from "@/utils/screenResize.js";
  import Repositories from "@/components/projects/Repositories.vue";
  import Pagination from "@/components/projects/Pagination.vue";
  const { resizeScreen } = useScreenSize();
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 mb-5">
          <h1 class="text-lg font-medium mb-4">My Projects</h1>
          <ol class="projects">
            <li v-for="project in [1, 2, 3]" :key="project">
              <router-link to="/projects/1" class="flex items-start gap-4">
                <img src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg" alt="" class="" />
                <div class="w-full h-full flex flex-col justify-between">
                  <div>
                    <span class="text-[12px] sm:text-[13px] dark:text-gray-600 text-gray-400 font-medium mb-1 block">
                      UI/UX Design
                    </span>
                    <h3 class="text-[15px] sm:text-[16px] md:text-lg font-semibold mb-1 
                      line-clamp-1 duration-300 ease-in-out">
                      Sistem Aplikasi Penjualan Online Berbasis Web aaaaaaaa
                    </h3>
                  </div>
                  <p class="text-base/relaxed text-[13px] sm:text-[15px] text-gray-600 dark:text-gray-400 
                    line-clamp-2 mt-auto">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Impedit enim blanditiis, eum vel culpa, facere suscipit aliquid quae quos molestiae quod, nostrum quisquam soluta. Laudantium porro in aspernatur aliquid enim.
                  </p>
                </div>
              </router-link>
            </li>
          </ol>
          <Pagination />

          <Repositories />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  .projects {
    @apply flex flex-col gap-4;
  }

  .projects li a  {
    @apply relative p-4 rounded-2xl bg-white/40 dark:bg-dark-surface/60 backdrop-blur-2xl border border-solid dark:border-zinc-900 border-gray-300 ease-in-out duration-300 transform hover:-translate-y-[2px]
    dark:hover:bg-dark-surface/80 hover:bg-white/70;
  }
  .projects li a img {
    @apply w-20 h-20 md:w-28 md:h-28 object-cover rounded-xl;
  }
  
  .projects li a:hover h3 {
    @apply text-primary;
  }
</style>
