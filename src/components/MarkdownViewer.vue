<script setup>
import { computed } from "vue";
import { marked } from "marked";
import DOMPurify from "dompurify";

// Buat renderer baru
const renderer = new marked.Renderer();

renderer.link = function (href) {
  return `[<a href="${href.href}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${href.text}</a>]`;
};

// Konfigurasi marked dengan renderer baru
marked.setOptions({
  gfm: true,
  breaks: true,
  renderer, // Pastikan renderer digunakan di sini
});

const props = defineProps({
  content: {
    type: String,
    required: true,
  },
});

// Compile Markdown ke HTML yang aman
const compiled = computed(() => DOMPurify.sanitize(marked(props.content), { ADD_ATTR: ['target'] }));
</script>

<template>
  <div v-html="compiled" class="content mt-2 text-base/relaxed font-normal text-gray-800 dark:text-gray-300"></div>
</template>
