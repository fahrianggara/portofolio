<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-surface dark:bg-dark-surface dark:text-white border-gray-300 dark:border-dark-border2">
    <div class="max-w-5xl mx-auto px-4 pb-4">
      <div class="footer-box">
        <ul class="footer-links">
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">About Me</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Education</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Experience</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Projects</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Resume</a></li>
          <li><a href="#" class="dark:text-gray-300 ease-in hover:text-blue-500 footer-link">Contact</a></li>
        </ul>
        <p class="dark:text-white pt-[10px] sm:pt-0 text-[14px] sm:text-[16px]">&copy; {{ year }} Fahri Anggara. Made with ❤️</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  @reference "tailwindcss";

  footer {
    @apply mt-auto border-t border-solid z-[999] relative h-auto;
  }

  .footer-box {
    @apply flex flex-col gap-5 sm:flex-row sm:gap-0 items-center sm:items-start justify-between max-w-7xl mx-auto py-[30px] pt-[35px];
  }

  .footer-links {
    @apply flex flex-wrap items-center justify-center sm:grid grid-flow-col sm:grid-rows-2 sm:grid-cols-2 sm:auto-rows-max gap-y-4 gap-x-6 sm:pr-[30px];
  }

  .footer-link {
    @apply text-[13.5px] sm:text-[15px] hover:underline;
  }
</style>