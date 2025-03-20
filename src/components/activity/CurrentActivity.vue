<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from "vue";
import { 
  DISCORD_CDN_URL,
  UPDATE_INTERVAL_MS,
  createLanyardWebSocket,
  calculateActivityElapsedTime,
  calculateSongProgress
} from "@/utils/activity";
import { replaceText } from "@/utils/helpers";

const userId = import.meta.env.VITE_DISCORD_USER_ID;

// State
const discordData = ref(null);
const loading = ref(true);
const elapsedTimeCode = ref("00:00:00");
const elapsedTimeGame = ref("00:00:00");
const songProgress = ref({ elapsed: "00:00", total: "00:00", percent: 0 });

// Intervals
let activityInterval = null;
let songProgressInterval = null;

// Computed properties
const currActivities = computed(() => discordData.value?.activities || null);
const isListeningToSpotify = computed(() => Boolean(discordData.value?.spotify));
const spotifyData = computed(() => discordData.value?.spotify);
const isOffline = computed(() => Boolean(discordData.value?.discord_status === "offline"));

// WebSocket instance
const lanyardSocket = createLanyardWebSocket(userId, handleDiscordDataUpdate);

// Activity time tracking
function updateActivityElapsedTime() {
  const activityCode = currActivities.value?.filter(a => a.name == 'Visual Studio Code').find(a => a.timestamps?.start);
  const activityGame = currActivities.value?.filter(a => !a.state && !a.flags).find(a => a.timestamps?.start);

  if (activityCode) {
    elapsedTimeCode.value = calculateActivityElapsedTime(activityCode);
  }

  if (activityGame) {
    elapsedTimeGame.value = calculateActivityElapsedTime(activityGame);
  }
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
watch(currActivities, (newActivities) => {
  clearActivityTimers();

  const activityCode = newActivities?.filter(a => a.name == 'Visual Studio Code').find(a => a.timestamps?.start);
  const activityGame = newActivities?.filter(a => !a.flags && !a.state).find(a => a.timestamps?.start);
  
  if (activityCode) {
    updateActivityElapsedTime(activityCode);
    activityInterval = setInterval(() => updateActivityElapsedTime(activityCode), UPDATE_INTERVAL_MS);
  }

  if (activityGame) {
    updateActivityElapsedTime(activityGame);
    activityInterval = setInterval(() => updateActivityElapsedTime(activityGame), UPDATE_INTERVAL_MS);
  }

  if (isListeningToSpotify.value) {
    updateSongProgress();
    songProgressInterval = setInterval(updateSongProgress, UPDATE_INTERVAL_MS);
  }
}, { deep: true });

// watch for Spotify data changes
watch(spotifyData, () => {
  updateSongProgress();
  clearInterval(songProgressInterval);
  songProgressInterval = setInterval(updateSongProgress, UPDATE_INTERVAL_MS);
}, { deep: true });

// Clear all timers
function clearActivityTimers() {
  clearInterval(activityInterval);
  clearInterval(songProgressInterval);
}

// Handle data updates from WebSocket (real-time)
function handleDiscordDataUpdate(data) {
  discordData.value = data;
  loading.value = false;
  updateSongProgress();
}

// Lifecycle hooks
onMounted(() => {
  lanyardSocket.connect();
});

// cleanup
onUnmounted(() => {
  lanyardSocket.disconnect();
  clearActivityTimers();
});

</script>

<template>
  <section class="discord-activity">
    <h1 class="font-semibold md:text-[18px]">Current Activity</h1>
    <p class="dark:text-gray-400 text-gray-700 mt-1.5 text-[15px]">
      This is my current activity on Discord. Btw I'm using <a href="https://github.com/Phineas/lanyard" target="_blank" class="text-primary">Lanyard API</a> for this feature.
    </p>

    <ul class="activities">
      <li class="activity" v-if="loading" key="loading">
        <div class="w-[150px] h-2.5 bg-gray-300 dark:bg-zinc-900 rounded-lg mb-5"></div>
        <a href="#" class="flex items-start gap-4">
          <div class="w-20 h-20 md:w-28 md:h-28 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-xl"></div>
          <div class="w-full h-full flex flex-col justify-between">
            <div class="h-4 bg-gray-300 dark:bg-zinc-900 rounded-lg mt-1"></div>
            <div class="h-2 bg-gray-300 dark:bg-zinc-900 rounded-lg mt-4"></div>
            <div class="h-2 bg-gray-300 dark:bg-zinc-900 rounded-lg mt-2"></div>
            <div class="h-2 bg-gray-300 dark:bg-zinc-900 rounded-lg mt-6"></div>
          </div>
        </a>
      </li>

      <li class="activity offline" v-if="!currActivities?.length && !loading" key="no-activity">
        <i class="fi fi-rr-info inline-block relative top-[2px] mr-2" 
          :class="{'text-red-500': isOffline, 'text-primary': !isOffline}"></i>
        <span class="dark:text-gray-300 text-gray-700">
          {{ isOffline ? "Currently on sleep mode, try again later 😴" : "Just existing, no tasks running 😁" }}
        </span>
      </li>

      <li class="activity" v-else v-for="(activity, index) in currActivities" :key="index">
        <div v-if="activity.flags">
          <p class="dark:text-gray-400 font-medium text-gray-600 mb-3.5">Listening to Spotify</p>

          <div class="flex items-start md:gap-2 gap-4">
            <div class="relative inline-block">
              <img v-lazy="spotifyData.album_art_url" alt="Album Cover" class="w-20 h-20 rounded-lg mr-4 object-cover"/>
            </div>
            <div class="flex flex-col w-[calc(100%-5rem)]">
              <h2 class="text-[15.5px] leading-6 font-semibold">{{ spotifyData.song }} - {{ spotifyData.artist }}</h2>
              <p class="dark:text-gray-400 text-gray-600 text-sm">
                {{ spotifyData.album }}
              </p>
              
              <!-- Progress Bar -->
              <div class="mt-3">
                <div class="h-1 dark:bg-gray-600 bg-gray-400 rounded-full">
                  <div class="h-1 bg-primary rounded-full" :style="{ width: songProgress.percent + '%' }"></div>
                </div>
                <div class="flex justify-between dark:text-gray-400 text-gray-600 text-xs mt-1">
                  <span>{{ songProgress.elapsed }}</span>
                  <span>{{ songProgress.total }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if="activity.name === 'Visual Studio Code'">
          <p class="dark:text-gray-400 font-medium text-gray-600 mb-3.5">
            Developing Code
          </p>

          <div class="flex items-start md:gap-2 gap-4">
            <div class="relative inline-block">
              <img
                v-if="activity.assets?.large_image"
                v-lazy="`${DISCORD_CDN_URL}/${activity.application_id}/${activity.assets.large_image}.png`"
                alt="Large Image" class="w-20 h-20 rounded-lg mr-3 object-cover"
              />
              <img
                v-if="activity.assets?.small_image"
                v-lazy="`${DISCORD_CDN_URL}/${activity.application_id}/${activity.assets.small_image}.png`"
                alt="Small Image" class="absolute w-8 h-8 rounded-full right-1 -bottom-2 object-cover"
              />
            </div>

            <div class="flex flex-col w-[calc(100%-5rem)]">
              <h2 class="text-[16px] font-semibold">{{ activity.name }}</h2>
              <div class="desc">
                <p class="dark:text-gray-400 text-gray-600 text-sm">
                  {{ replaceText(activity.details, 'Editing', 'Currently editing ') }}
                  {{ activity.state ? replaceText(activity.state, 'Workspace:', 'in ') : "" }}
                </p>
                <p class="text-primary text-sm font-semibold mt-2">{{ elapsedTimeCode }}</p>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <p class="dark:text-gray-400 font-medium text-gray-600 mb-3.5">
            Playing Game
          </p>

          <div class="flex items-start md:gap-2 gap-4">
            <div class="relative inline-block">
              <img
                v-lazy="`https://dcdn.dstn.to/app-icons/${activity.application_id}.webp?size=512`"
                alt="Large Image" class="w-20 h-20 rounded-lg mr-3 object-cover"
              />
            </div>

            <div class="flex flex-col w-[calc(100%-5rem)]">
              <h2 class="text-[16px] font-semibold">{{ activity.name }}</h2>
              <div class="desc">
                <p class="text-primary text-sm font-semibold mt-1">{{ elapsedTimeGame }}</p>
              </div>
            </div>
          </div>
        </div>
      </li>
    </ul>

  </section>
</template>

<style scoped>
@reference 'tailwindcss';
@import '@/assets/main.css';

.activities {
  @apply flex flex-col gap-4 mt-4;
}

.activity {
  @apply dark:bg-dark-surface/60 bg-white/60 rounded-xl p-4 px-5 backdrop-blur-xl
  border border-solid dark:border-zinc-900 border-gray-300 text-[15px];
}

.activity.offline {
  @apply flex items-start gap-1;
}
</style>