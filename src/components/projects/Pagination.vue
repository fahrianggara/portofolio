<script setup>
import LeftAngel from '../icon/LeftAngel.vue';
import RightAngel from '../icon/RightAngel.vue';

const props = defineProps({
  currentPage: Number,
  lastPage: Number,
  loading: Boolean,
});

const emit = defineEmits(['page-change']);

const goToPage = (page) => {
  if (page >= 1 && page <= props.lastPage) {
    emit('page-change', page);
  }
};
</script>

<template>
  <nav aria-label="Page navigation Projects" class="mt-4 ml-auto w-max">
    <div v-if="loading" class="w-[150px] h-8 animate-pulse bg-gray-300 dark:bg-dark-surface rounded-lg">
    </div>
    <ul v-else class="inline-flex -space-x-px text-sm">
      <!-- Tombol Previous -->
      <li>
        <a href="#" class="rounded-s-lg" @click.prevent="goToPage(currentPage - 1)"
          :class="{ 'pointer-events-none opacity-50': currentPage === 1 }">
          <LeftAngel />
        </a>
      </li>

      <!-- Angka Halaman -->
      <li v-for="page in lastPage" :key="page">
        <a href="#" @click.prevent="goToPage(page)"
          :aria-current="page === currentPage ? 'page' : null">
          {{ page }}
        </a>
      </li>

      <!-- Tombol Next -->
      <li>
        <a href="#" class="rounded-e-lg" @click.prevent="goToPage(currentPage + 1)"
          :class="{ 'pointer-events-none opacity-50': currentPage === lastPage }">
          <RightAngel />
        </a>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  li a:not([aria-current]) {
    @apply flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-dark-surface/70 dark:border-zinc-900 dark:text-gray-400 dark:hover:bg-dark-background2 dark:hover:text-white;
  }

  li a[aria-current] {
    @apply flex items-center justify-center px-3 h-8 border border-transparent bg-primary dark:border-zinc-900 text-white;
  }
</style>