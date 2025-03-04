<script setup>

import Sidebar from "@/components/Sidebar.vue";
import { useScreenSize } from "@/utils/screenResize.js";
import Thumbnail from "@/components/projects/Thumbnail.vue";
const { resizeScreen } = useScreenSize();
</script>


<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white hidden md:block relative mb-6" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 mb-[23px]">
          <router-link to="/projects" class="back">
            <i class="fi fi-rr-angle-small-left"></i> Back to Projects
          </router-link>

          <Thumbnail />

          <!-- Content -->
          <div class="content-wrapper">
            <h1>Lorem ipsum dolor, sit amet</h1>
            <div class="content">
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam adipisci quia fugit facilis ducimus itaque velit ad quidem. Ut dolorem labore eum est, aliquid aperiam rem animi id impedit ex?
              </p>
            </div>
            
            <div class="project-info">
              <h1>Project Info</h1>
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rounded-2xl overflow-hidden border-collapse">
                <tbody>
                  <tr class="first:rounded-t-2xl last:rounded-b-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-lg border border-solid dark:border-zinc-900 border-gray-300">
                    <th scope="row" class="px-4 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                      Category
                    </th>
                    <td class="px-4 py-4">
                      : UI/UX Design
                    </td>
                  </tr>
                  <tr class="bg-white/60 dark:bg-dark-surface/60 backdrop-blur-lg border border-solid dark:border-zinc-900 border-gray-300">
                    <th scope="row" class="px-4 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                      Project Date
                    </th>
                    <td class="px-4 py-4">
                      : Jan 2021 - Mar 2021
                    </td>
                  </tr>
                  <tr class="last:rounded-b-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-lg border border-solid dark:border-zinc-900 border-gray-300">
                    <th scope="row" class="px-4 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                      Link
                    </th>
                    <td class="px-4 py-4">
                      : <a href="#" class="text-primary hover:underline">www.example.com</a>
                    </td>
                  </tr>
                </tbody>
              </table>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
@import "@/assets/main.css";

.back {
  @apply dark:bg-dark-bg-primary/70 bg-bg-primary/90 backdrop-blur-lg
  inline-flex items-center px-4 py-3 pr-5 rounded-full text-sm font-medium cursor-pointer
  text-primary hover:bg-primary/80 hover:text-white ease-in-out duration-300;
}

.back i {
  @apply relative top-0.5 mr-1;
}

.content-wrapper {
  @apply block mt-5 md:mt-8;
}

.content-wrapper h1 {
  @apply text-[20px] font-bold;
}

.category {
  @apply text-[14px] text-primary font-medium mb-1.5;
}

.content {
  @apply mt-2 text-[15px] text-gray-600 dark:text-gray-300 leading-6
  md:leading-7 md:text-[16px];
}

.project-info {
  @apply mt-5 md:mt-8;
}

.project-info h1 {
  @apply text-[16px] md:text-[18px] font-semibold mb-3;
}
</style>
