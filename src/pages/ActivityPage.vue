<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useMeta } from '../composables/meta';
import ActivityCurrent from '../components/ActivityCurrent.vue';

const emit = defineEmits(["no-padding"]);
onMounted(() => { emit("no-padding", true) });
onUnmounted(() => { emit("no-padding", false) });

useMeta("Activity", "Explore the activities I have done in the past and the ones I am currently doing.");
</script>

<template>
  <ActivityCurrent />
</template>