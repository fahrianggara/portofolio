<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { useScreenSize } from "@/utils/screenResize.js";

  const { resizeScreen } = useScreenSize();
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2">
          <h1 class="mb-4 font-medium text-lg">Work Experience</h1>
          <ol class="parent">                  
            <li class="mb-5 ms-7">            
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M19 4h-1.1A5.009 5.009 0 0 0 13 0h-2a5.009 5.009 0 0 0-4.9 4H5a5.006 5.006 0 0 0-5 5v3h24V9a5.006 5.006 0 0 0-5-5ZM8.184 4A3 3 0 0 1 11 2h2a3 3 0 0 1 2.816 2ZM13 15a1 1 0 0 1-2 0v-1H0v5a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5v-5H13Z" fill="currentColor"></path></g></svg>
              </span>

              <div>
                <div class="flex flex-wrap gap-2 mb-1">
                  <span class="text-sm text-primary"># Backend Developer</span>
                  <span class="text-sm text-primary"># Full-time</span>
                </div>

                <h3>
                  <span class="font-semibold text-lg">PT Labsco Arena</span>
                </h3>

                <time class="mb-2 text-[14px] font-normal leading-none text-gray-500 dark:text-gray-600">
                  <span class="">Sep 2024 - Nov 2024</span> 
                </time>
              </div>

              <div class=" mt-3 text-base/relaxed font-normal text-gray-700 dark:text-gray-400">
                <ol class="list-disc list-outside pl-4">
                  <li>Developed and maintained the backend of the website.</li>
                  <li>Collaborated with the front-end developer to integrate user-facing elements with server side logic.</li>
                  <li>Implemented security and data protection.</li>
                  <li>Optimized the application for maximum speed and scalability.</li>
                </ol>
              </div>
            </li>
            <li class="mb-5 ms-7">            
              <span class="icon">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" style="enable-background:new 0 0 512 512" xml:space="preserve" class=""><g><path d="M19 4h-1.1A5.009 5.009 0 0 0 13 0h-2a5.009 5.009 0 0 0-4.9 4H5a5.006 5.006 0 0 0-5 5v3h24V9a5.006 5.006 0 0 0-5-5ZM8.184 4A3 3 0 0 1 11 2h2a3 3 0 0 1 2.816 2ZM13 15a1 1 0 0 1-2 0v-1H0v5a5.006 5.006 0 0 0 5 5h14a5.006 5.006 0 0 0 5-5v-5H13Z" fill="currentColor"></path></g></svg>
              </span>

              <div>
                <div class="flex flex-wrap gap-2 mb-1">
                  <span class="text-sm text-primary"># Backend Developer</span>
                  <span class="text-sm text-primary"># Full-time</span>
                </div>

                <h3>
                  <span class="font-semibold text-lg">PT Labsco Arena</span>
                </h3>

                <time class="mb-2 text-[14px] font-normal leading-none text-gray-500 dark:text-gray-600">
                  <span class="">Sep 2024 - Nov 2024</span> 
                </time>
              </div>

              <div class=" mt-3 text-base/relaxed font-normal text-gray-700 dark:text-gray-400">
                <ol class="list-disc list-outside pl-4">
                  <li>Developed and maintained the backend of the website.</li>
                  <li>Collaborated with the front-end developer to integrate user-facing elements with server side logic.</li>
                  <li>Implemented security and data protection.</li>
                  <li>Optimized the application for maximum speed and scalability.</li>
                </ol>
              </div>
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

  .parent {
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
