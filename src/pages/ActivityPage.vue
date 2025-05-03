<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useMeta } from '../composables/meta';
import ActivityCurrent from '../components/ActivityCurrent.vue';
import ActivityCoding from '../components/ActivityCoding.vue';

const emit = defineEmits(["no-padding"]);
onMounted(() => { emit("no-padding", true) });
onUnmounted(() => { emit("no-padding", false) });

useMeta({
  title: 'Activity',
  description: 'Explore the activities I have done in the past and the ones I am currently doing.',
  keywords: "fahri anggara, angga, current activity, Discord status, Wakatime, coding hours, productivity, developer activity, programming tracking, coding stats, work in progress, software development, developer time tracking"
})
</script>

<template>
  <ActivityCurrent />
  <ActivityCoding />
</template>