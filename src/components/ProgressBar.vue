<script setup>
import { ref, watch } from "vue";
import { useProgressStore } from "../stores/progress.js"; // Import store progress

const progress = ref(0);
const progressStore = useProgressStore();

watch(progressStore, (newState) => {
  if (newState.isLoading) {
    startProgress();
  } else {
    completeProgress();
  }
});

function startProgress() {
  progress.value = 10;
  let interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 10;
    }
  }, 200);

  watch(progressStore, (newState) => {
    if (!newState.isLoading) {
      clearInterval(interval);
      completeProgress();
    }
  });
}

function completeProgress() {
  progress.value = 100;
  setTimeout(() => (progress.value = 0), 500);
}
</script>

<template>
  <!-- Container for the progress bar (gray track) -->
  <div v-if="progress > 0" class="progress-container">
    <!-- Blue progress bar -->
    <div class="progress-bar" :style="{ width: progress + '%' }"></div>
  </div>
</template>

<style scoped>
@import "@/assets/style.css";

.progress-container {
  @apply fixed top-0 left-0 w-full h-[3px] rounded-full z-9999 bg-surface dark:bg-dark-surface;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #2a86ff, #39a6ff);
  border-radius: 50px;
  transition: width 0.3s ease-in-out;
}
</style>
