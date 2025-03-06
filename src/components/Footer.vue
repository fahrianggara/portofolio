<script setup>
  import ListSocial from './ListSocial.vue';
  import ListMenu from './ListMenu.vue';
  const year = new Date().getFullYear();
</script>

<template>
  <footer class="font-inter">
    <div class="footer-body max-w-5xl mx-auto px-4 pb-12 sm:pb-0 lg:pb-4">
      <div class="footer-box">
        <div class="footer-links">
          <ListMenu :showIcon="false" :hideResume="true" />
        </div>
        <div class="footer-bottom">
          <ListSocial />
          <p class="copyright">
            &copy; {{ year }} Fahri Anggara. Made with ❤️
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>
  @reference "tailwindcss";
  @import "@/assets/main.css";

  footer {
    @apply w-full relative z-10 h-auto block mt-auto;
  }

  .footer-body {
    @apply bg-surface/50 dark:bg-dark-surface/60 dark:text-white border-gray-300 
    dark:border-zinc-900 border-solid border-t lg:border rounded-t-none lg:rounded-t-4xl backdrop-blur-lg;
  }

  .footer-box {
    @apply flex flex-col gap-6 sm:flex-row sm:gap-0 items-center h-full
    sm:items-start justify-between max-w-7xl mx-auto pt-[30px] md:pt-[40px] px-[20px]
    sm:pb-[30px] lg:pb-0;
  }

  .footer-links ul {
    @apply sm:grid sm:grid-rows-3  lg:grid-cols-4 md:grid-cols-3 gap-x-6 gap-y-4 sm:grid-cols-2
    justify-center sm:justify-start flex flex-wrap md:pb-4 sm:pb-6 lg:pb-0;
  }

  .footer-links ul a {
    @apply text-[15px] hover:underline text-gray-600 dark:text-gray-400 ease-in hover:text-primary hover:underline;
  }

  .footer-links ul a.active {
    @apply text-primary;
  }

  .footer-bottom {
    @apply pt-[10px] relative sm:pt-0 gap-3 sm:gap-0 flex flex-col justify-between items-end min-h-[65px] h-full;
  }

  .footer-bottom ul {
    @apply flex flex-row gap-4 items-center justify-center sm:justify-end w-full h-auto;
  }

  .footer-bottom ul a {
    @apply text-[20px]  ease-in-out duration-75 hover:text-primary;
  }

  .copyright {
    @apply dark:text-white text-[15px] md:text-[15px] text-nowrap;
  }
</style>