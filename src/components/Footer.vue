<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="">
    <div class="footer-body max-w-5xl mx-auto px-4 pb-4">
      <div class="footer-box">
        <ul class="footer-links">
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">About Me</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Education</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Experience</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Projects</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Contact</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Activity</a></li>
        </ul>
        <p class="dark:text-white pt-[10px] sm:pt-0 text-[14px] sm:text-[16px]">&copy; {{ year }} Fahri Anggara. Made with ❤️</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  @reference "tailwindcss";
  @import "@/assets/main.css";

  footer {
    @apply mt-auto z-[998] relative h-auto;
  }

  .footer-body {
    @apply bg-surface/30 dark:bg-dark-surface/60 dark:text-white border-gray-300 
      dark:border-dark-border2 border-solid border-t lg:border rounded-t-none lg:rounded-t-4xl;
  }

  .footer-box {
    @apply flex flex-col gap-5 sm:flex-row sm:gap-0 items-center sm:items-start justify-between max-w-7xl mx-auto pt-[40px] pb-[30px] px-[20px];
  }

  .footer-links {
    @apply flex flex-wrap items-center justify-center sm:grid grid-flow-col sm:grid-rows-2 sm:grid-cols-2 sm:auto-rows-max gap-y-4 gap-x-6 sm:pr-[30px];
  }

  .footer-link {
    @apply text-[13.5px] sm:text-[15px] hover:underline;
  }
</style>