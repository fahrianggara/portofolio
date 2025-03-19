<script setup>
import { onMounted, computed, defineComponent, ref, watch, onUnmounted } from "vue";
import LanguageChart from "./TopLanguage.vue";
import { useActivityStore } from "@/stores/activity";
import { useGithubUserStore } from "@/stores/githubUser";
import { useGithubContribution } from "@/stores/githubContribution";
import { formatDate } from "@/utils/helpers";
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import { useDark } from "@vueuse/core";

const activityStore = useActivityStore();
const githubUserStore = useGithubUserStore();
const githubContribution = useGithubContribution();
const isDarkMode = useDark();
const heatmapContainer = ref(null);

// Fungsi untuk scroll ke kanan
const scrollToRight = () => {
  if (heatmapContainer.value) {
    heatmapContainer.value.scrollLeft = heatmapContainer.value.scrollWidth;
  }
};

// Pantau perubahan data kontribusi, jika sudah dimuat, scroll ke kanan
watch(() => githubContribution.contributions, (newContributions) => {
  if (newContributions.length > 0) {
    setTimeout(scrollToRight, 100); // Delay agar data benar-benar muncul
  }
}, { immediate: true });

// Cek cache sebelum fetch data
onMounted(() => {
  activityStore.getActivity();
  githubUserStore.getUser();
  githubContribution.getContributions();

  window.addEventListener("resize", scrollToRight);
});

// Hapus event listener saat komponen dihancurkan
onUnmounted(() => {
  window.removeEventListener("resize", scrollToRight);
});

// Gunakan computed untuk format tanggal GitHub user
const githubJoinDate = computed(() => {
  if (!githubUserStore.user || !githubUserStore.user.created_at) return null;
  return formatDate(githubUserStore.user.created_at);
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
    This is my coding activity on GitHub & <a href="https://wakatime.com/" target="_blank" class="text-primary">WakaTime</a>.
  </p>

  <div class="card mt-4">
    <h1 class="font-medium">
      Contributions <span class="text-[14px] dark:text-gray-400 text-gray-700 font-normal">(GitHub)</span>
    </h1>

    <div v-if="githubContribution.loading" 
      class="animate-pulse bg-gray-300 dark:bg-zinc-900 rounded h-4 mt-1 w-[200px]"></div>

    <p v-else class="my-4 mt-1 text-[15px] dark:text-gray-400 text-gray-600">
      {{ githubContribution.totalContributions }} contributions in the last year.
    </p>

    <div v-if="githubContribution.loading" 
      class="animate-pulse bg-gray-300 dark:bg-zinc-900 rounded h-15 mt-3"></div>

    <div v-else ref="heatmapContainer" class="heatmap-container">
      <CalendarHeatmap 
        :values="githubContribution.contributions" 
        :end-date="new Date()" 
        :dark-mode="isDarkMode" 
        :round="2"
        class="w-[670px] lg:w-full"
      />
    </div>
  </div>

  <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
    <div class="box">
      <h1>
        Since <span class="text-[14px] dark:text-gray-400 text-gray-700 font-normal">(GitHub)</span>
      </h1>
      <!-- Skeleton Loading hanya muncul pertama kali -->
      <div v-if="githubUserStore.loading" class="animate-pulse bg-gray-300 dark:bg-zinc-900 rounded h-4 mt-1"></div>

      <!-- Data setelah selesai loading -->
      <div v-else class="text-[15px] md:text-[13.5px] lg:text-[15px]">
        {{ githubJoinDate.formattedDate }}
        <span class="dark:text-gray-400 text-gray-600">
          ({{ githubJoinDate.diffHours }} hrs {{ githubJoinDate.diffMinutes }} mins)
        </span>
      </div>
    </div>
    
    <div class="box">
      <h1>
        Since <span class="text-[14px] dark:text-gray-400 text-gray-700 font-normal">(WakaTime)</span>
      </h1>
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
  </div>

  <div class="card">
    <h1 class="font-medium">
      Top Languages <span class="text-[14px] dark:text-gray-400 text-gray-700 font-normal">(WakaTime)</span>
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

  .card {
    @apply dark:bg-dark-surface/60 bg-white/60 rounded-xl p-4 mt-4 backdrop-blur-xl
    border border-solid dark:border-zinc-900 border-gray-300
  }

  .heatmap-container {
    @apply overflow-auto;
  }

  .heatmap-container::-webkit-scrollbar {
    @apply w-0;
  }
</style>