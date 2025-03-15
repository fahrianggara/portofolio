<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { useScreenSize } from "@/utils/screenResize.js";
  // import testImg from "@/assets/img/test.jpg";
  import { useAboutStore } from "@/stores/about";
  import { onMounted } from "vue";
  import MarkdownViewer from "@/components/MarkdownViewer.vue";

  const aboutStore = useAboutStore();
  const { resizeScreen } = useScreenSize();

  onMounted(() => {
    aboutStore.getAbout();
    aboutStore.getGreeting();
    aboutStore.getSkills();
  });
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 w-full mb-5">

          <div v-if="aboutStore.loading" class="clearfix relative">
            <div class="h-38 w-38 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-2xl float-right ml-4 mb-4"></div>
            
            <p class="h-3 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-[calc(100%-10.5rem)]"></p>
            <p class="h-3 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-2.5 w-[calc(100%-10.5rem)]"></p>
            <p class="h-3 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-2.5 w-[calc(100%-10.5rem)]"></p>

            <p class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-5 w-[calc(100%-10.5rem)]"></p>
            <p class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-3 w-[calc(100%-10.5rem)]"></p>
            <p class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-3 w-[calc(100%-10.5rem)]"></p>
            <p class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-3 w-[calc(100%-10.5rem)]"></p>

            <p class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-6"></p>
            <p class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-3"></p>
            <p class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-3"></p>
            <p class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-3"></p>

            <div class="grid grid-cols-2 load gap-2.5 w-full mt-6">
              <p class="h-12 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg"></p>
              <p class="h-12 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg"></p>
              <p class="h-12 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg"></p>
              <p class="h-12 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg"></p>
            </div>

            <p class="h-3 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-6 w-[150px]"></p>
            <p class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg mt-3"></p>

            <div class="grid grid-cols-2 load gap-2.5 w-full mt-6">
              <p class="h-12 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg"></p>
              <p class="h-12 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg"></p>
              <p class="h-12 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg"></p>
              <p class="h-12 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg"></p>
            </div>
          </div>

          <div v-else>
            <div class="about" v-glightbox>
              <!-- Gambar dengan float -->
              <a data-gallery="certificates" data-type="image" :href="aboutStore.about?.photo_link" class="glightbox">
                <img :src="aboutStore.about?.photo_link" alt="test" :key="aboutStore.about?.photo_link" loading="lazy"
                  class="float-right w-1/3 ml-4 mb-4 rounded-2xl rotate-0 ease-in-out duration-300 hover:rotate-2" />
              </a>
              
              <!-- Title -->
              <h1 class="text-[22px] sm:text-[32px] font-bold mb-3 text-wrap leading-9 sm:leading-11">
                {{ aboutStore.about?.title }}
              </h1>

              <!-- Desc -->
              <div v-if="aboutStore.about.description">
                <MarkdownViewer :content="aboutStore.about.description" />
              </div>

              <!-- Clear float -->
              <div class="clear-both"></div>
            </div>

            <div class="socials mt-5" v-if="aboutStore.greeting && aboutStore.greeting.socials">
              <ul class="links">
                <li v-for="(social, index) in aboutStore.greeting.socials" :key="index">
                  <a :href="social.link" class="link" target="_blank" rel="noopener noreferrer">
                    <div class="flex items-center gap-3">
                      <img :src="social.image_link">
                      <span>{{ social.platform }}</span>
                    </div>
                    <i class="fi fi-rr-arrow-up-right-from-square"></i>
                  </a>
                </li>
              </ul>
            </div>

            <div class="skills mt-5">
              <h2 class="text-[18px] font-bold mb-1">My Skills</h2>
              <p class="text-base/relaxed font-normal text-gray-800 dark:text-gray-300 mb-4">
                I have experience with the following technologies and tools:
              </p>

              <ul class="links">
                <li v-for="(skill, index) in aboutStore.skills" :key="index">
                  <a :href="skill.website" class="link" target="_blank" rel="noopener noreferrer">
                    <div class="flex items-center gap-3">
                      <img :src="skill.image_url" alt="">
                      <span>{{ skill.name }}</span>
                    </div>
                    <i class="fi fi-rr-arrow-up-right-from-square"></i>
                  </a>
                </li>
              </ul>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
  @import '@/assets/main.css';

  .links {
    @apply grid grid-cols-2 gap-2.5 w-full;
  }

  .links .link {
    @apply flex items-center justify-between gap-2.5 bg-surface/60 dark:bg-dark-surface/50 
    border-gray-300 dark:border-zinc-900 border py-3 px-3 font-medium
    rounded-xl backdrop-blur-2xl ease-in-out duration-300 hover:dark:bg-dark-surface/40 
    hover:dark:border-dark-surface hover:bg-surface/40
    -translate-y-0 hover:-translate-y-[2px] overflow-hidden text-[14.5px];
  }

  .links .link img {
    @apply aspect-square w-7 h-7 object-contain;
  }

  .links .link i {
    @apply text-lg sm:text-xl translate-x-10 translate-y-[1.5px]
    transition-transform ease-in-out duration-300;
  }

  .links .link:hover i {
    @apply -translate-x-1;
  }

  .skills ul {
    @apply flex flex-col gap-2.5 w-full sm:grid sm:grid-cols-2 sm:gap-2;
  }

  @media (max-width: 499.99px) {
    .socials .links,
    .skills ul,
    .load {
      @apply grid-cols-1 gap-3.5;
    }
  }
</style>
