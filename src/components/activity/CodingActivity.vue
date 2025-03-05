<script setup>
import { ref, onMounted, computed } from "vue";
import axios from "axios";
import { encryptData, decryptData, setWithExpiry, getWithExpiry } from "@/utils/helpers.js"; // Import helpers
import LanguageChart from "./TopLanguage.vue";

const codingStats = ref(null);
const loading = ref(true);
const errorMessage = ref("");
const SECRET_KEY = import.meta.env.VITE_WAKATIME_API_KEY;
const CACHE_KEY = "coding-activity";
const CACHE_EXPIRY = 24 * 60 * 60 * 1000; // 1 hari dalam milidetik

// Ambil data dari API atau cache
const getActivity = async () => {
  try {
    const response = await axios.get("/wakatime-api", {
      headers: {
        Authorization: `Basic ${btoa(SECRET_KEY)}`,
        "Content-Type": "application/json"
      }
    });

    codingStats.value = response.data.data;
    setWithExpiry(CACHE_KEY, codingStats.value, SECRET_KEY, CACHE_EXPIRY);
  } catch (error) {
    errorMessage.value = "Failed fetching data";
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

// Cek cache sebelum fetch data
onMounted(() => {
  const cachedData = getWithExpiry(CACHE_KEY, SECRET_KEY);
  
  if (cachedData) {
    codingStats.value = cachedData;
    loading.value = false; // Tidak perlu skeleton
  } else {
    getActivity();
  }
});

// Format data untuk tampilan
const formattedRange = computed(() => {
  return codingStats.value?.human_readable_range?.replace(/since\s+/i, '') || '';
});
</script>

<template>
  <h1 class="font-semibold md:text-[18px] mt-6">
    Coding Activity
  </h1>
  <p class="dark:text-gray-500 text-gray-600 mt-1.5">
    This is my coding activity on <a href="https://wakatime.com/" target="_blank" class="text-primary">WakaTime</a>.
  </p>

  <div class="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 gap-4 mt-4">
    <div class="box">
      <h1>Since</h1>
      <!-- Skeleton Loading hanya muncul pertama kali -->
      <div v-if="loading" class="animate-pulse bg-border dark:bg-dark-background3 rounded h-4 mt-1"></div>

      <!-- Data setelah selesai loading -->
      <div v-else>
        {{ formattedRange }}
        <span class="dark:text-gray-400 text-gray-600">
          ({{ codingStats?.human_readable_total }})
        </span>
      </div>
    </div>
    
    <div class="box">
      <h1>Code Editor</h1>
      <!-- Skeleton Loading hanya muncul pertama kali -->
      <div v-if="loading" class="animate-pulse bg-border dark:bg-dark-background3 rounded h-4 mt-1"></div>

      <!-- Data setelah selesai loading -->
      <p v-else>
        Visual Studio Code
      </p>
    </div>
  </div>

  <div class="languages">
    <h1 class="font-medium">
      Top Languages
    </h1>

    <p class="my-4 mt-1 text-[15px] dark:text-gray-400 text-gray-600">
      This is my top 10 languages based on coding time.
    </p>

    <div v-if="loading" class="animate-pulse bg-border dark:bg-dark-background3 rounded h-7 mt-1"></div>

    <LanguageChart v-if="!loading && codingStats" :codingStats="codingStats" />
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