<template>
  <div v-if="progress > 0" class="progress-bar" :style="{ width: progress + '%' }"></div>
</template>

<script setup>
import { ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useProgressStore } from "../stores/progress.js"; // Import store progress

const router = useRouter();
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

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 2px;
  border-radius: 50px;
  background: linear-gradient(to right, #2a86ff, #39a6ff);
  transition: width 0.3s ease-in-out;
  z-index: 9999;
}
</style>
