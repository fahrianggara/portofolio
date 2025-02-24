<script setup>
  import SunIcon from './icon/SunIcon.vue';
  import MoonIcon from './icon/MoonIcon.vue';  

  // props to be passed to the Navbar component
  const props = defineProps({
    isDark: Boolean,
    toggleDark: Function,
  });
</script>

<template>
  <header id="header" class="">
    <nav class="">
      <router-link to="/" class="nav-brand">
        <img src="@/assets/img/logo.png" alt="Logo" />
      </router-link>
      <div class="nav-menu">
        <button class="cv">
          Resume CV
        </button>
        <button class="menu">
          Menu <i class="fi fi-rr-angle-small-down"></i>
        </button>
        <button @click="toggleDark()" class="btn-theme ">
          <component :class="'w-[23px] h-[23px]'" :is="isDark ? SunIcon : MoonIcon" />
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  @reference "tailwindcss";
  @import "@/assets/main.css";

  header {
    @apply fixed top-0 left-0 right-0 w-[93%] lg:w-full z-[1000] mt-4 mx-auto;
  }

  nav {
    @apply flex items-center justify-between h-[60px] max-w-5xl mx-auto px-3 backdrop-blur-lg 
      border border-solid rounded-4xl border-gray-300 dark:border-zinc-900 bg-surface/50 dark:bg-dark-surface/60;
  }

  .nav-brand {
    @apply flex items-center space-x-3;
  }

  .nav-brand img {
    @apply w-[35px] h-[35px] rounded-[50%];
  }

  .btn-theme {
    @apply w-[45px] h-[45px] bg-background dark:bg-dark-surface p-[12px] flex items-center justify-center cursor-pointer dark:fill-white;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }

  .cv {
    @apply bg-background dark:bg-dark-surface px-4 py-2 dark:text-white h-[45px] text-[14px] font-semibold cursor-pointer
    hover:text-primary ease-in-out duration-75 hidden lg:block;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }

  .menu {
    @apply bg-background dark:bg-dark-surface px-4 py-2 dark:text-white h-[45px] text-[14px] font-semibold cursor-pointer
    hover:text-primary ease-in-out duration-75 block lg:hidden flex items-center gap-1;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }

  .menu i {
    @apply relative top-0.5;
  }

  .nav-menu {
    @apply flex items-center ;
  }
</style>