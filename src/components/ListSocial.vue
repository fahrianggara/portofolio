<script setup>
  import { onMounted } from 'vue';
  import { useSocialsStore } from '@/stores/socials';

  const socialStore = useSocialsStore();

  onMounted(() => {
    socialStore.getSocials();
  });
</script>

<template>
  <ul>
    <li v-for="(social, index) in socialStore.socials" :key="index">
      <a :href="social.link" class="link" target="_blank" rel="noopener noreferrer">
        <i :class="social.icon"></i>
      </a>
    </li>
  </ul>
</template>

<style scoped>

</style>