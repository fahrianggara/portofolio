<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { 
  DISCORD_CDN_URL,
  UPDATE_INTERVAL_MS,
  createLanyardWebSocket,
  calculateActivityElapsedTime,
  calculateSongProgress
} from "@/utils/activity";

const userId = import.meta.env.VITE_DISCORD_USER_ID;

// State
const discordData = ref(null);
const loading = ref(true);
const elapsedTime = ref("00:00:00");
const songProgress = ref({ elapsed: "00:00", total: "00:00", percent: 0 });

// Intervals
let activityInterval = null;
let songProgressInterval = null;

// Computed properties
const currentActivity = computed(() => discordData.value?.activities?.[0] || null);
const isListeningToSpotify = computed(() => Boolean(discordData.value?.spotify));
const spotifyData = computed(() => discordData.value?.spotify);

// Activity time tracking
function updateActivityElapsedTime() {
  elapsedTime.value = calculateActivityElapsedTime(currentActivity.value);
}

// Spotify progress tracking
function updateSongProgress() {
  if (isListeningToSpotify.value) { // listening to Spotify
    songProgress.value = calculateSongProgress(spotifyData.value);
  } else { // not listening to Spotify
    songProgress.value = { elapsed: "00:00", total: "00:00", percent: 0 };
  }
}

// Watch for activity changes and manage timers
watch(currentActivity, (newActivity) => {
  clearActivityTimers();
  
  // Activity with timestamps
  if (newActivity?.timestamps?.start) {
    updateActivityElapsedTime();
    activityInterval = setInterval(updateActivityElapsedTime, UPDATE_INTERVAL_MS);
  }
  
  // Spotify activity
  if (isListeningToSpotify.value) {
    updateSongProgress();
    songProgressInterval = setInterval(updateSongProgress, UPDATE_INTERVAL_MS);
  }
});

// Clear all timers
function clearActivityTimers() {
  clearInterval(activityInterval);
  clearInterval(songProgressInterval);
}

// Handle data updates from WebSocket
function handleDiscordDataUpdate(data) {
  discordData.value = data;
  loading.value = false;
  updateSongProgress();
}

// WebSocket instance
const lanyardSocket = createLanyardWebSocket(userId, handleDiscordDataUpdate);

// Lifecycle hooks
onMounted(() => {
  lanyardSocket.connect();
});

onUnmounted(() => {
  lanyardSocket.disconnect();
  clearActivityTimers();
});
</script>

<template>
  <section class="discord-activity">
    <h1 class="font-semibold md:text-[18px]">Current Activity</h1>
    <p class="dark:text-gray-500 text-gray-600 mt-1.5">
      This is my current activity on Discord. Btw I'm using <a href="https://github.com/Phineas/lanyard" target="_blank" class="text-primary">Lanyard API</a> for this feature.
    </p>

    <div class="activity">
      <!-- Loading state -->
      <div v-if="loading" class="animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg h-10 mt-1"></div>

      <!-- Activity is available -->
      <div v-else-if="currentActivity">
        <!-- Spotify activity -->
        <div v-if="isListeningToSpotify">
          <p class="dark:text-gray-400 text-gray-600 mb-3.5">Listening to Spotify</p>
          <div class="flex items-start md:gap-2 gap-4">
            <div class="relative inline-block">
              <img
                :src="spotifyData.album_art_url"
                alt="Album Cover"
                class="w-20 h-20 rounded-lg mr-4"
              />
            </div>
            <div class="flex flex-col w-[calc(100%-5rem)]">
              <h2 class="text-[15.5px] leading-6 font-semibold">{{ spotifyData.song }} - {{ spotifyData.artist }}</h2>
              <p class="dark:text-gray-400 text-gray-600 text-sm">
                {{ spotifyData.album }}
              </p>
              
              <!-- Progress Bar -->
              <div class="mt-3">
                <div class="h-1 dark:bg-gray-600 bg-gray-400 rounded-full">
                  <div class="h-1 bg-green-500 rounded-full" :style="{ width: songProgress.percent + '%' }"></div>
                </div>
                <div class="flex justify-between text-gray-400 text-xs mt-1">
                  <span>{{ songProgress.elapsed }}</span>
                  <span>{{ songProgress.total }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Other activity -->
        <div v-else>
          <p class="dark:text-gray-400 text-gray-600 mb-3.5">Playing</p>
          <div class="flex items-start" :class="{ 'gap-2': currentActivity.assets, 'gap-0': !currentActivity.assets }">
            <div class="relative inline-block">
              <img
                v-if="currentActivity.assets?.large_image"
                :src="`${DISCORD_CDN_URL}/${currentActivity.application_id}/${currentActivity.assets.large_image}.png`"
                alt="Large Image"
                class="w-20 h-20 rounded-lg mr-3"
              />
              <img
                v-if="currentActivity.assets?.small_image"
                :src="`${DISCORD_CDN_URL}/${currentActivity.application_id}/${currentActivity.assets.small_image}.png`"
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
      </div>

      <!-- No activity -->
      <div v-else>
        <i class="fi fi-rr-info text-primary inline-block relative top-[2.5px] mr-1.5"></i>
        <span class="dark:text-gray-300 text-gray-600 italic">
          Hmm.. It seems that Angga has not performed any activities yet.
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';
@import '@/assets/main.css';

.activity {
  @apply dark:bg-dark-surface/60 bg-white/60 rounded-xl p-4 px-5 mt-4 backdrop-blur-xl
  border border-solid dark:border-zinc-900 border-gray-300 text-[15px];
}
</style>