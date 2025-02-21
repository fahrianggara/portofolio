<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-white dark:bg-black dark:text-white border-gray-300 dark:border-zinc-900">
    <div class="max-w-4xl mx-auto px-4 pb-4">
      <div class="footer-box">
        <ul class="footer-links">
          <li><a href="#" class="dark:text-gray-400 ease-in dark:hover:text-blue-500">About Me</a></li>
          <li><a href="#" class="dark:text-gray-400 ease-in dark:hover:text-blue-500">Education</a></li>
          <li><a href="#" class="dark:text-gray-400 ease-in dark:hover:text-blue-500">Experience</a></li>
          <li><a href="#" class="dark:text-gray-400 ease-in dark:hover:text-blue-500">Projects</a></li>
          <li><a href="#" class="dark:text-gray-400 ease-in dark:hover:text-blue-500">Resume</a></li>
          <li><a href="#" class="dark:text-gray-400 ease-in dark:hover:text-blue-500">Contact</a></li>
        </ul>
        <p class="dark:text-white pt-[10px] md:pt-0">&copy; {{ year }} Fahri Anggara. Made with ❤️</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
  @reference "tailwindcss";

  footer {
    @apply mt-auto border-t border-solid z-[1000] relative h-[70px];
  }

  .footer-box {
    @apply flex flex-col gap-5 sm:flex-row sm:gap-0 items-center sm:items-start justify-between max-w-4xl mx-auto py-[30px] pt-[35px];
  }

  .footer-links {
    @apply grid grid-flow-col grid-rows-2 grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 pr-[30px];
  }

  .footer-links a {
    @apply text-[15px] hover:underline;
  }
</style>