<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";

const userId = import.meta.env.VITE_DISCORD_USER_ID;
const discordData = ref(null);
const loading = ref(true);
const elapsedTime = ref("00:00:00");

let socket = null;
let interval = null;

/** Menghubungkan ke WebSocket Lanyard */
function connectWebSocket() {
  if (socket) return;

  socket = new WebSocket("wss://api.lanyard.rest/socket");

  socket.onopen = () => {
    socket.send(JSON.stringify({ op: 2, d: { subscribe_to_id: userId } }));
  };

  socket.onmessage = (e) => {
    const response = JSON.parse(e.data);
    if (["INIT_STATE", "PRESENCE_UPDATE"].includes(response.t)) {
      discordData.value = response.d;
      loading.value = false;
      console.log("WebSocket Data:", discordData.value);
    }
  };

  socket.onerror = (error) => {
    console.error("WebSocket Error:", error);
  };
}

/** Mendapatkan aktivitas terkini */
const currentActivity = computed(() => discordData.value?.activities?.[0] || null);

/** Perbarui waktu yang telah berlalu */
function updateElapsedTime() {
  const startTime = currentActivity.value?.timestamps?.start;
  if (!startTime) {
    elapsedTime.value = "00:00:00";
    return;
  }

  const diff = Date.now() - startTime;
  const hours = String(Math.floor(diff / 3600000)).padStart(2, "0");
  const minutes = String(Math.floor((diff % 3600000) / 60000)).padStart(2, "0");
  const seconds = String(Math.floor((diff % 60000) / 1000)).padStart(2, "0");

  elapsedTime.value = `${hours}:${minutes}:${seconds}`;
}

/** Pantau perubahan aktivitas dan jalankan timer jika diperlukan */
watch(currentActivity, (newActivity) => {
  clearInterval(interval);
  if (newActivity?.timestamps?.start) {
    updateElapsedTime();
    interval = setInterval(updateElapsedTime, 1000);
  }
});

onMounted(() => connectWebSocket());

onUnmounted(() => {
  if (socket) {
    socket.close();
    socket = null;
  }
  clearInterval(interval);
});
</script>

<template>
  <h1 class="font-semibold md:text-[18px]">Current Activity</h1>
  <p class="dark:text-gray-500 text-gray-600 mt-1.5">
    This is my current activity on Discord. Btw I'm using <a href="https://github.com/Phineas/lanyard" target="_blank" class="text-primary">Lanyard API</a> for this feature.
  </p>

  <div class="activity">
    <div v-if="loading" class="animate-pulse bg-border dark:bg-dark-background3 rounded-lg h-10 mt-1"></div>

    <div v-else-if="currentActivity">
      <p class="dark:text-gray-400 text-gray-600 uppercase mb-3.5">Playing</p>
      <div class="flex items-start" :class="{ 'gap-2' : currentActivity.assets, 'gap-0' : !currentActivity.assets }">
        <div class="relative inline-block">
          <img
            v-if="currentActivity.assets?.large_image"
            :src="`https://cdn.discordapp.com/app-assets/${currentActivity.application_id}/${currentActivity.assets.large_image}.png`"
            alt="Large Image"
            class="w-20 h-20 rounded-lg mr-3"
          />
          <img
            v-if="currentActivity.assets?.small_image"
            :src="`https://cdn.discordapp.com/app-assets/${currentActivity.application_id}/${currentActivity.assets.small_image}.png`"
            alt="Small Image"
            class="absolute w-8 h-8 rounded-full right-1 -bottom-2"
          />
        </div>
        <div class="flex flex-col gap-0.5">
          <h2 class="text-[16px] font-semibold">{{ currentActivity.name }}</h2>
          <div class="desc">
            <p class="dark:text-gray-400 text-gray-600 text-sm">{{ currentActivity.details }}</p>
            <p class="dark:text-gray-400 text-gray-600 text-sm">{{ currentActivity.state }}</p>
            <p class="dark:text-green-400 text-green-600 text-sm font-semibold mt-2">{{ elapsedTime }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <i class="fi fi-rr-info text-primary inline-block relative top-[2.5px] mr-1.5"></i>
      <span class="dark:text-gray-300 text-gray-600 italic">
        Hmm.. It seems that Angga has not performed any activities yet.
      </span>
    </div>
  </div>
</template>

<style scoped>
@reference 'tailwindcss';
@import '@/assets/main.css';

.activity {
  @apply dark:bg-dark-surface/60 bg-white/60 rounded-xl p-4 px-5 mt-4 backdrop-blur-xl
  border border-solid dark:border-zinc-900 border-gray-300 text-[15px];
}
</style>
