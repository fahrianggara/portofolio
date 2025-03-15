<script setup>
  import { onMounted } from 'vue';
  import { useCertificateStore } from '@/stores/certificate';

  const certificateStore = useCertificateStore();

  onMounted(() => {
    if (!certificateStore.certificates.length) {
      certificateStore.getCertificates();
    }
  });
</script>

<template>
  <div class="certificates mt-6">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
      My Certificates
    </h2>
    <p class="mb-5 text-gray-700 dark:text-gray-400 text-[15px] md:text-[16px]">
      Here are some certificates that I have achieved during my studies.
    </p>

    <div v-if="certificateStore.certificates.length < 0" class="card">
      Whoops, I haven't added any certificates yet.
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <span v-if="certificateStore.loading" v-for="n in 2" :key="n" class="animate-pulse bg-gray-300 
        dark:bg-zinc-900 rounded-lg w-full h-30"></span>
        
      <a v-else v-for="(certificate, index) in certificateStore.certificates" :key="index" :href="certificate.image_link" 
        class="glightbox drop-shadow-2xl" data-gallery="certificates" data-type="image" v-glightbox>
        <img :src="certificate.image_link">
      </a>
    </div>
  </div>
</template>

<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  .glightbox img {
    @apply h-auto max-w-full rounded-xl cursor-pointer transform ease-in-out duration-300 
    translate-y-0 hover:-translate-y-1; 
  }
</style>