<script setup>
  import { useDark, useToggle } from '@vueuse/core';
  import SunIcon from './icon/SunIcon.vue';
  import MoonIcon from './icon/MoonIcon.vue';

  const isDark = useDark({
    selector: 'html',
    attribute: 'data-theme',
    valueDark: 'dark',
    valueLight: 'light',
  });
  const toggleDark = useToggle(isDark);
</script>

<template>
  <header id="header" class="">
    <nav class="bg-white dark:bg-black">
      <router-link to="/" class="nav-brand">
        <img src="@/assets/img/logo.png" alt="Logo" />
      </router-link>
      <div class="nav-menu">
        <button @click="toggleDark()" class="p-[10px] flex items-center justify-center rounded-full cursor-pointer dark:fill-white ">
          <component :class="'w-[23px] h-[23px]'" :is="isDark ? SunIcon : MoonIcon" />
        </button>
      </div>
    </nav>
  </header>
</template>

<style scoped>
  @reference "tailwindcss";

  header {
    @apply fixed top-0 left-0 w-full z-[1000];
  }

  nav {
    @apply flex items-center justify-between h-[60px] max-w-4xl mx-auto px-4;
  }

  .nav-brand {
    @apply flex items-center space-x-3;
  }

  .nav-brand img {
    @apply w-[35px] h-[35px];
  }

  .nav-menu {
    @apply flex items-center space-x-3;
  }
</style>