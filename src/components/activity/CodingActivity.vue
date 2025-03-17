<script setup>
import { onMounted, computed } from "vue";
import LanguageChart from "./TopLanguage.vue";
import { useActivityStore } from "@/stores/activity";

const activityStore = useActivityStore();

// Cek cache sebelum fetch data
onMounted(() => {
  activityStore.getActivity();
});

// Format data untuk tampilan
const formattedRange = computed(() => {
  return activityStore.codingStats?.human_readable_range?.replace(/since\s+/i, '') || '';
});
</script>

<template>
  <h1 class="font-semibold md:text-[18px] mt-6">
    Coding Activity
  </h1>
  <p class="dark:text-gray-400 text-gray-700 mt-1.5 text-[15px]">
    This is my coding activity on <a href="https://wakatime.com/" target="_blank" class="text-primary">WakaTime</a>.
  </p>

  <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
    <div class="box">
      <h1>Since</h1>
      <!-- Skeleton Loading hanya muncul pertama kali -->
      <div v-if="activityStore.loading" class="animate-pulse bg-gray-300 dark:bg-zinc-900 rounded h-4 mt-1"></div>

      <!-- Data setelah selesai loading -->
      <div v-else class="text-[15px] md:text-[13.5px] lg:text-[15px]">
        {{ formattedRange }}
        <span class="dark:text-gray-400 text-gray-600">
          ({{ activityStore.codingStats?.human_readable_total }})
        </span>
      </div>
    </div>
    
    <div class="box">
      <h1>Code Editor</h1>
      <!-- Skeleton Loading hanya muncul pertama kali -->
      <div v-if="activityStore.loading" class="animate-pulse bg-gray-300 dark:bg-zinc-900 rounded h-4 mt-1"></div>

      <!-- Data setelah selesai loading -->
      <div v-else class="text-[15px] md:text-[13.5px] lg:text-[15px]">
        Visual Studio Code
      </div>
    </div>
  </div>

  <div class="languages">
    <h1 class="font-medium">
      Top Languages
    </h1>

    <p class="my-4 mt-1 text-[15px] dark:text-gray-400 text-gray-600">
      This is my top 10 languages based on coding time.
    </p>

    <div v-if="activityStore.loading" class="animate-pulse bg-gray-300 dark:bg-zinc-900 rounded h-7 mt-1"></div>

    <LanguageChart v-if="!activityStore.loading && activityStore.codingStats" :codingStats="activityStore.codingStats" :key="activityStore.codingStats" />
  </div>
</template>

<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  .box {
    @apply dark:bg-dark-surface/60 bg-white/60 rounded-xl p-4 backdrop-blur-xl
    border border-solid dark:border-zinc-900 border-gray-300
  }

  .box h1 {
    @apply font-semibold mb-1.5;
  }

  .box p {
    @apply text-[15px];
  }

  .languages {
    @apply dark:bg-dark-surface/60 bg-white/60 rounded-xl p-4 mt-4 backdrop-blur-xl
    border border-solid dark:border-zinc-900 border-gray-300
  }
</style>