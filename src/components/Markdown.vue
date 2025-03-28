<script setup>
import { renderMarkdown } from '../entry-server';
import { computed } from 'vue';

defineProps({
  content: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div v-html="renderMarkdown(content)" 
    class="content mt-2 leading-7 text-gray-800 dark:text-gray-300"></div>
</template>