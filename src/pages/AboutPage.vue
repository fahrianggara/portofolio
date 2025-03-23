<script setup>
import Markdown from '../components/Markdown.vue';
import { useAboutStore } from '../stores/about';

const about = useAboutStore();
</script>

<template>
  <div v-if="about.loading" class="clearfix relative">
    <div class="h-38 w-38 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-2xl float-right ml-4 mb-4"></div>
  </div>

  <template v-else>
    <div class="about">
      <img :src="about.data.photo_link" alt="test" :key="about.data.photo_link"
        class="float-right sm:w-1/3 w-[145px] ml-4 mb-4 rounded-2xl rotate-0 ease-in-out duration-300 hover:rotate-2" />

      <h1 class="text-[22px] sm:text-[32px] font-bold mb-3 text-wrap leading-8 sm:leading-11">
        {{ about.data.title }}
      </h1>

      <Markdown :content="about.data.description" />
    </div>
  </template>
</template>

<style scoped>
  @import '@/assets/style.css';

  .links {
    @apply grid grid-cols-2 gap-2.5 w-full;
  }

  .links .link {
    @apply flex items-center justify-between gap-2.5 bg-surface/60 dark:bg-dark-surface/50 
    border-gray-300 dark:border-zinc-900 border py-3 px-3 font-medium
    rounded-xl backdrop-blur-2xl ease-in-out hover:dark:bg-dark-surface/40 
    hover:dark:border-dark-surface hover:bg-surface/40 overflow-hidden text-[14.5px];
  }

  .links .link img {
    @apply aspect-square w-7 h-7 object-contain;
  }

  .links .link i {
    @apply text-lg sm:text-xl translate-x-10 translate-y-[1.5px]
    transition-transform ease-in-out duration-200;
  }

  .links .link:hover i {
    @apply -translate-x-1;
  }

  @media (max-width: 499.99px) {
    .items .links,
    .load {
      @apply grid-cols-1 gap-3.5;
    }
  }
</style>