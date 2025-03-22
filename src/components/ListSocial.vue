<script setup>
  defineProps({
    socials: {
      type: Array,
      required: true,
    },
  });
</script>

<template>
  <ul>
    <li v-for="(social, index) in socials" :key="index">
      <a :href="social.link" class="link" target="_blank" rel="noopener noreferrer">
        <i :class="social.icon"></i>
      </a>
    </li>
  </ul>
</template>

<style scoped>

</style>