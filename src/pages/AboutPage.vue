<script setup>
import { useAboutStore } from '../stores/about';

</script>

<template>
<h1>Hello ini about page</h1>
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