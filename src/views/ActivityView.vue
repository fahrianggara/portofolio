<script setup>
import { ref, onMounted } from "vue";
import Sidebar from "@/components/Sidebar.vue";
import { useScreenSize } from "@/utils/screenResize.js";
import axios from "axios";

const { resizeScreen } = useScreenSize();
const codingStats = ref(null);
const loading = ref(true);
const errorMessage = ref("");

const getActivity = async () => {
  try {
    const apiKey = import.meta.env.VITE_WAKATIME_API_KEY;
    const response = await axios.get("/wakatime-api", { // from proxy in vite.config.js
      headers: {
        Authorization: `Basic ${btoa(apiKey)}`,
        "Content-Type": "application/json"
      }
    });

    codingStats.value = response.data.data;
    console.log(codingStats.value);
  } catch (error) {
    errorMessage.value = "Failed fetching data";
    console.error("Error fetching data:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  getActivity();
});
</script>


<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white mb-3 hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2">
          <h1 class="font-semibold md:text-[18px]">Current Activity</h1>
          <p class="dark:text-gray-500 text-gray-600 mt-1.5">
            This is my current activity on Discord.
          </p>
          <div class="activity">
            <i class="fi fi-rr-info text-primary inline-block relative top-[2.5px] mr-1.5"></i>
            <span class="dark:text-gray-300 text-gray-600 italic">
              Hmm.. It seems that Angga has not performed any activities yet.
            </span>
          </div>
          <h1 class="font-semibold md:text-[18px] mt-6">
            Coding Activity
          </h1>
          <p class="dark:text-gray-500 text-gray-600 mt-1.5">
            This is my coding activity on WakaTime.
          </p>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  .activity {
    @apply dark:bg-dark-surface/60 bg-white/60 rounded-xl p-4 mt-4 backdrop-blur-xl
    border border-solid dark:border-zinc-900 border-gray-300
    text-[15px];
  }
</style>
