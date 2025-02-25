<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import SunIcon from './icon/SunIcon.vue';
import MoonIcon from './icon/MoonIcon.vue';
import ListMenu from './ListMenu.vue';

// Props
const { isDark, toggleDark } = defineProps({
  isDark: Boolean,
  toggleDark: Function,
});

// State for menu visibility
const isMenuOpen = ref(false);

const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value;
const closeMenu = () => isMenuOpen.value = false;

const handleOutsideInteraction = (event) => {
  const clickedOutside = 
    !event.target.closest('.mobile-menu') && 
    !event.target.closest('.btn-menu') &&
    !event.target.closest('.btn-theme');
    
  if (clickedOutside) closeMenu();
};

const handleResize = () => { if (window.innerWidth >= 768) closeMenu() };

onMounted(() => {
  document.addEventListener('click', handleOutsideInteraction);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideInteraction);
  window.removeEventListener('resize', handleResize);
});
</script>

<template>
  <header id="header">
    <nav>
      <router-link to="/" class="nav-brand">
        <img src="@/assets/img/logo.png" alt="Logo" />
      </router-link>
      <div class="nav-menu">
        <button class="btn-cv">Resume CV</button>
        <button @click="toggleMenu" :aria-expanded="isMenuOpen" class="btn-menu">
          Menu <i :class="['fi', isMenuOpen ? 'fi-rr-angle-small-up' : 'fi-rr-angle-small-down']"></i>
        </button>
        <button @click="toggleDark()" class="btn-theme">
          <component :is="isDark ? SunIcon : MoonIcon" class="w-[23px] h-[23px]" />
        </button>
      </div>
    </nav>
  </header>

  <!-- Transition effect for mobile menu -->
  <Transition name="fade-bottom">
    <div v-if="isMenuOpen" class="mobile-menu">
      <ListMenu @close-menu="closeMenu" />
    </div>
  </Transition>
</template>

<style scoped>
  @import "@/assets/main.css";

  header {
    @apply fixed top-0 left-0 right-0 w-[calc(100%-30px)] max-w-5xl z-[1000] mt-4 mx-auto;
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
    @apply w-[45px] h-[45px] bg-background dark:bg-dark-surface p-[12px] flex 
    items-center justify-center cursor-pointer dark:fill-white;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
  }

  .btn-cv {
    @apply bg-background dark:bg-dark-surface px-4 py-2 dark:text-white h-[45px] 
    text-[14px] font-semibold cursor-pointer hover:text-primary ease-in-out duration-75 hidden md:block;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }

  .btn-menu {
    @apply bg-background dark:bg-dark-surface px-4 py-2 dark:text-white h-[45px] text-[14px] 
    font-semibold cursor-pointer hover:text-primary ease-in-out duration-75 md:hidden flex items-center gap-1;
    border-top-left-radius: 2rem;
    border-bottom-left-radius: 2rem;
  }

  .btn-menu i {
    @apply relative top-0.5;
  }

  .btn-menu[aria-expanded="true"] {
    @apply text-primary;
  }

  .nav-menu {
    @apply flex items-center;
  }
</style>
