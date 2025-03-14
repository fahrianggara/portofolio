<script setup>
import Sidebar from "@/components/Sidebar.vue";
import { useScreenSize } from "@/utils/screenResize.js";
import { useExperienceStore } from "@/stores/experience";
import { onMounted } from "vue";
import MarkdownViewer from "@/components/MarkdownViewer.vue";

const { resizeScreen } = useScreenSize();
const experienceStore = useExperienceStore();

onMounted(() => {
  if (!experienceStore.experiences.length) {
    experienceStore.getExperiences();
  }
});
</script>


<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2">
          <h1 class="mb-1 font-medium text-lg">Work Experience</h1>
          <p class="mb-5 text-gray-700 dark:text-gray-400 text-[15px] md:text-[16px]">
            These are some of the work experiences that I've had.
          </p>

          <div v-if="!experienceStore.experiences.length && !experienceStore.loading" class="card">
            Whoops, I haven't added any work experience yet.
          </div>

          <ol class="parent" :class="{ 'not-loading': !experienceStore.loading }">
            <li v-if="experienceStore.loading" v-for="n in 1" :key="n">
              <div class="flex gap-2">
                <div class="h-2 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg w-[100px]"></div>
                <div class="h-2 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg w-[100px]"></div>
              </div>
              <div class="h-4 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-4 w-[200px]"></div>
              <div class="h-2 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-4 w-[120px]"></div>
              <div class="h-2.5 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-4"></div>
              <div class="h-2.5 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-3"></div>
              <div class="h-2.5 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-3"></div>
              <div class="h-2.5 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-3"></div>
            </li>
            
            <li v-else class="mb-5 ms-7" v-for="(experience, index) in experienceStore.experiences" :key="index">         
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M19 4h-1.1A5.009 5.009 0 0 0 13 0h-2a5.009 5.009 0 0 0-4.9 4H5a5.006 5.006 0 0 0-5 5v3h24V9a5.006 5.006 0 0 0-5-5ZM8.184 4A3 3 0 0 1 11 2h2a3 3 0 0 1 2.816 2ZM13 15a1 1 0 0 1-2 0v-1H0v5a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5v-5H13Z" fill="currentColor"></path></g></svg>
              </span>

              <div>
                <div class="flex flex-wrap gap-2 mb-1">
                  <span class="text-sm text-primary"># {{ experience.position }}</span>
                  <span class="text-sm text-primary"># {{ experience.format_type }}</span>
                </div>

                <a href="#" class="font-semibold text-lg block">
                  {{ experience.title }}
                </a>

                <time class="mb-2 text-[14px] font-normal leading-none text-gray-500 dark:text-gray-600">
                  {{ experience.until_date }}
                </time>
              </div>

              <MarkdownViewer :content="experience.description" v-if="experience.description" />
            </li>
          </ol>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  .parent.not-loading {
    @apply relative border-s ml-2 border-gray-300 dark:border-zinc-900;
  }

  .parent .icon {
    @apply absolute flex items-center justify-center w-6 h-6  
    rounded-full -start-[41px] top-[2px] ring-8 bg-bg-primary dark:bg-dark-bg-primary ring-transparent;
  }

  .parent .icon svg {
    @apply w-2.5 h-2.5 text-primary ;
  }

  .parent > li {
    @apply
    bg-white/60 dark:bg-dark-surface/60 backdrop-blur-2xl 
    relative p-4 px-5 rounded-2xl 
    border border-solid dark:border-zinc-900 border-gray-300;
  }
</style>
