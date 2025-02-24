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

// Toggle menu visibility
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Close menu
const closeMenu = () => {
  isMenuOpen.value = false;
};

// Handle clicks outside menu
const handleClickOutside = (e) => {
  if (!e.target.closest('.mobile-menu') && !e.target.closest('.btn-menu')) {
    isMenuOpen.value = false;
  }
};

// Handle window resize
const handleResize = () => {
  if (window.innerWidth >= 768) {
    isMenuOpen.value = false;
  }
};

// Add event listeners on mount, remove on unmount
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
});

// State untuk animasi lingkaran
const isAnimating = ref(false);
const circleStyle = ref({});
const buttonRef = ref(null); // Untuk referensi tombol

// Tambahkan animasi lingkaran sebelum dark mode aktif
const handleDarkMode = () => {
  if (!buttonRef.value) return;

  const rect = buttonRef.value.getBoundingClientRect();
  const radius = Math.hypot(window.innerWidth, window.innerHeight);

  circleStyle.value = {
    width: `${radius * 2}px`,
    height: `${radius * 2}px`,
    left: `${rect.left + rect.width / 2 - radius}px`,
    top: `${rect.top + rect.height / 2 - radius}px`,
  };

  isAnimating.value = true;

  requestAnimationFrame(() => {
    toggleDark(); // Toggle dark mode setelah animasi selesai
    isAnimating.value = false;
  });
};
</script>

<template>
  <header id="header" class="font-inter">
    <nav>
      <router-link to="/" class="nav-brand">
        <img src="@/assets/img/logo.png" alt="Logo" />
      </router-link>
      <div class="nav-menu">
        <button class="btn-cv">Resume CV</button>
        <button @click="toggleMenu" :aria-expanded="isMenuOpen" class="btn-menu">
          Menu <i :class="['fi', isMenuOpen ? 'fi-rr-angle-small-up' : 'fi-rr-angle-small-down']"></i>
        </button>
        <button @click="handleDarkMode" ref="buttonRef" class="btn-theme">
          <component :is="isDark ? SunIcon : MoonIcon" class="w-[23px] h-[23px]" />
        </button>
      </div>
    </nav>
  </header>

  <!-- Animasi Lingkaran -->
  <Transition name="circle">
    <div v-if="isAnimating" :style="circleStyle" class="circle-effect"></div>
  </Transition>

  <!-- Transition effect for mobile menu -->
  <Transition name="fade-bottom">
    <div v-if="isMenuOpen" class="mobile-menu">
      <ListMenu @close-menu="closeMenu" />
    </div>
  </Transition>
</template>


<style scoped>
@reference "tailwindcss";
@import "@/assets/main.css";

header {
  @apply fixed top-0 left-0 right-0 w-[95%] lg:w-full z-[1000] mt-4 mx-auto;
}

nav {
  @apply flex items-center justify-between h-[60px] max-w-5xl mx-auto px-3 backdrop-blur-lg 
  border border-solid rounded-4xl border-gray-300 dark:border-zinc-900 bg-surface/50 
  dark:bg-dark-surface/60;
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
  @apply bg-background dark:bg-dark-surface px-4 py-2 dark:text-white 
  h-[45px] text-[14px] font-semibold cursor-pointer hover:text-primary 
  ease-in-out duration-75 hidden md:block;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
}

.btn-menu {
  @apply bg-background dark:bg-dark-surface px-4 py-2 dark:text-white h-[45px] 
  text-[14px] font-semibold cursor-pointer hover:text-primary ease-in-out duration-75 
  block md:hidden flex items-center gap-1;
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
}

.btn-menu[aria-expanded="true"] {
  @apply text-primary;
}

.btn-menu i {
  @apply relative top-0.5;
}

.nav-menu {
  @apply flex items-center;
}

/* Animasi Lingkaran */
.circle-effect {
  @apply bg-dark-background;
  position: fixed;
  border-radius: 50%;
  transform: scale(0);
  transition: transform 0.7s ease-in-out;
  opacity: 1;
  pointer-events: none;
}

[data-theme="dark"] .circle-effect {
  @apply bg-background;
}

.circle-enter-active {
  transform: scale(1);
}

.circle-leave-active{
  transform: scale(1);
}

.circle-leave-to {
  transform: scale(0);
}
</style>