<script setup>
import { onMounted, computed, ref, watch, onUnmounted } from "vue";
import { useContributionStore } from "../stores/contributions";
import { useGithubStore } from "../stores/github";
import { useWakatimeStore } from "../stores/wakatime";
import { useDark } from "@vueuse/core";
import { CalendarHeatmap } from "vue3-calendar-heatmap";
import { formatDate } from "../composables/helpers";
import StatsChart from "./ActivityCodingStats.vue";
import "vue3-calendar-heatmap/dist/style.css";

const contributions = useContributionStore();
const user = useGithubStore();
const wakatime = useWakatimeStore();
const isDarkMode = useDark();
const heatmapContainer = ref(null);

const scrollToRight = () => {
  if (heatmapContainer.value) {
    heatmapContainer.value.scrollLeft = heatmapContainer.value.scrollWidth;
  }
};

watch(() => contributions.data, (newContributions) => {
  if (newContributions.length > 0) {
    setTimeout(scrollToRight, 100);
  }
}, { immediate: true });

onMounted(() => {
  if (typeof window !== "undefined") {
    scrollToRight(); // Jalankan saat halaman dimuat
    window.addEventListener("resize", scrollToRight);
  }
});

onUnmounted(() => {
  if (typeof window !== "undefined") {
    window.removeEventListener("resize", scrollToRight);
  }
});

const githubJoinDate = computed(() => {
  if (!user.data || !user.data.created_at) return null;
  return formatDate(user.data.created_at);
});

const formattedRange = computed(() => {
  return wakatime.data.human_readable_range?.replace(/since\s+/i, '') || '';
});
</script>


<template>
  <div class="hp:px-0 px-5 mt-6">
    <h1 class="font-semibold md:text-[18px]">Coding Activity</h1>
    <p class="dark:text-gray-300 text-gray-700 mt-1.5 text-[15px]">
      This is my coding activity on GitHub & 
      <a href="https://wakatime.com/" target="_blank" class="text-primary">WakaTime</a>.
    </p>
  </div>

  <div class="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
    <div class="card">
      <h1 class="font-medium mb-1.5">
        Since <span class="text-[14px] dark:text-gray-400 text-gray-700 font-normal">(GitHub)</span>
      </h1>

      <!-- Data setelah selesai loading -->
      <div class="text-[15px] md:text-[13.5px] lg:text-[15px]">
        {{ githubJoinDate.formattedDate }}
        <span class="dark:text-gray-400 text-gray-600">
          ({{ githubJoinDate.diffHours }} hrs {{ githubJoinDate.diffMinutes }} mins)
        </span>
      </div>
    </div>

    <div class="card">
      <h1 class="font-medium mb-1.5">
        Since <span class="text-[14px] dark:text-gray-400 text-gray-700 font-normal">(WakaTime)</span>
      </h1>

      <!-- Data setelah selesai loading -->
      <div class="text-[15px] md:text-[13.5px] lg:text-[15px]">
        {{ formattedRange }}
        <span class="dark:text-gray-400 text-gray-600">
          ({{ wakatime.data.human_readable_total }})
        </span>
      </div>
    </div>
  </div>

  <div class="card mt-4">
    <h1 class="font-medium">
      Contributions <span class="text-[14px] dark:text-gray-400 text-gray-700 font-normal">(GitHub)</span>
    </h1>

    <p class="my-4 mt-1 text-[15px] dark:text-gray-400 text-gray-600">
      {{ contributions.total }} contributions in the last year.
    </p>

    <div ref="heatmapContainer" class="heatmap-container">
      <CalendarHeatmap 
        :values="contributions.data" 
        :end-date="new Date()" 
        :dark-mode="isDarkMode" 
        :round="2"
        class="w-[670px] lg:w-full"
      />
    </div>
  </div>

  <div class="card mt-4">
    <h1 class="font-medium mb-1.5">
      Top Languages <span class="text-[14px] dark:text-gray-400 text-gray-700 font-normal">(WakaTime)</span>
    </h1>

    <p class="my-4 mt-1 text-[15px] dark:text-gray-400 text-gray-600">
      This is my top 10 languages based on coding time.
    </p>

    <StatsChart v-if="!wakatime.loading && wakatime.data" 
      :codingStats="wakatime.data" 
      :key="wakatime.data" />
  </div>

</template>

<style scoped>
@import '@/assets/style.css';

.heatmap-container {
  @apply overflow-auto;
}

.heatmap-container::-webkit-scrollbar {
  @apply w-0;
}
</style>