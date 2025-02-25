<script setup>
const year = new Date().getFullYear()
</script>

<template>
  <footer class="font-inter">
    <div class="footer-body max-w-5xl mx-auto px-4 pb-4">
      <div class="footer-box">
        <ul class="footer-links">
          <li><a href="#">About Me</a></li>
          <li><a href="#">Education</a></li>
          <li><a href="#">Experience</a></li>
          <li><a href="#">Projects</a></li>
          <li><a href="#">Contact</a></li>
          <li><a href="#">Activity</a></li>
        </ul>
        <div class="footer-bottom">
          <ul class="social-links">
            <li>
              <a href="#">
                <i class="fi fi-brands-linkedin"></i>
              </a>
            </li>
              <li>
              <a href="#">
                <i class="fi fi-brands-instagram"></i>
              </a>
            </li>
              <li>
              <a href="#">
                <i class="fi fi-brands-github"></i>
              </a>
            </li>
              <li>
              <a href="#">
                <i class="fi fi-rr-envelope"></i>
              </a>
            </li>
          </ul>
          <p class="copyright">
            &copy; {{ year }} Fahri Anggara. Made with ❤️
          </p>
        </div>
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
    @apply bg-surface/50 dark:bg-dark-surface/60 dark:text-white border-gray-300 
    dark:border-zinc-900 border-solid border-t lg:border rounded-t-none lg:rounded-t-4xl;
  }

  .footer-box {
    @apply flex flex-col gap-6 sm:flex-row sm:gap-0 items-center h-full
    sm:items-start justify-between max-w-7xl mx-auto pt-[30px] md:pt-[40px] pb-[30px] px-[20px];
  }

  .footer-links {
    @apply flex flex-wrap items-center justify-center sm:grid grid-flow-col 
    sm:grid-rows-2 sm:grid-cols-2 sm:auto-rows-max sm:gap-y-4 sm:gap-x-6 gap-x-5 gap-y-2 pr-0 sm:pr-[40px];
  }

  .footer-links a {
    @apply text-[14px] sm:text-[15px] hover:underline text-gray-600 dark:text-gray-400 ease-in;
  }

  .footer-bottom {
    @apply pt-[10px] sm:pt-0 gap-3 sm:gap-0 flex flex-col justify-between items-end min-h-[65px] h-full;
  }

  .social-links {
    @apply flex flex-row gap-4 items-center justify-center sm:justify-end w-full h-full;
  }

  .social-links a {
    @apply text-[20px]  ease-in-out duration-75 hover:text-primary;
  }

  .copyright {
    @apply dark:text-white text-[14px] sm:text-[15px] text-nowrap;
  }
</style>