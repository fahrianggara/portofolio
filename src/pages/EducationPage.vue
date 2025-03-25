<script setup>
import Markdown from '../components/Markdown.vue';
import { inject } from 'vue';
import { useMeta } from '../composables/meta';
import { useCertificateStore } from '../stores/certificates';
import { useEducationStore } from '../stores/educations';

const educations = useEducationStore();
const certificates = useCertificateStore();
const openLightbox = inject('openLightbox');

useMeta("Education", "Discover my educational background and learning journey.");
</script>

<template>
  <div class="educations">
    <h2 class="mb-1 font-medium text-lg">My Educations</h2>
    <p class="text-base/relaxed font-normal text-gray-700 dark:text-gray-400 mb-4">
      These are the educations that I have taken so far.
    </p>

    <div v-if="!educations.data.length" class="card">
      Whoops, I haven't added any work experience yet.
    </div>

    <template v-else>
      <ol class="edu" :class="{ 'not-loading': !educations.loading }">
        <li v-for="(education, i) in educations.data" :key="i">
          <div class="bullet"></div>
          <time class="!text-primary">{{ education.major }}</time>
          <h3 class="title mt-1">{{ education.title }}</h3>
          <time>{{ education.until_date }}</time>

          <Markdown v-if="education.description" :content="education.description" />

          <ol class="achievement" v-if="education.achievements.length">
            <li v-for="(achievement, j) in education.achievements" :key="j">
              <p class="font-medium text-base/relaxed">
                {{ achievement.name }}
              </p>
              <Markdown :content="achievement.description" />
            </li>
          </ol>
        </li>
      </ol>
    </template>
  </div>

  <div class="certificates mt-8">
    <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-1">
      My Certificates
    </h2>
    <p class="mb-5 text-gray-700 dark:text-gray-400 text-[15px] md:text-[16px]">
      Here are some certificates that I have achieved during my studies.
    </p>

    <div v-if="certificates.data.length < 0" class="card">
      Whoops, I haven't added any certificates yet.
    </div>

    <div v-else class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <img v-for="(certificate, i) in certificates.data" :key="certificate.id" :src="certificate.image_link" 
        @click="openLightbox(i, certificates.data.map(c => ({ src: c.image_link })))">
    </div>
  </div>
</template>

<style scoped>
@import '@/assets/style.css';

.glightbox img {
  @apply h-auto max-w-full rounded-lg cursor-pointer transform ease-in-out duration-300 
  translate-y-0 hover:-translate-y-1;
}

.title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.edu.not-loading {
  @apply relative border-s ml-1 dark:border-zinc-900 border-gray-300 ;
}

.edu.not-loading > li {
  @apply ms-6;
}

.edu > li {
  @apply mb-4 bg-white/60 dark:bg-dark-surface/60 
  relative p-4 px-5 rounded-2xl 
  border border-solid dark:border-zinc-900 border-gray-300;
}

time {
  @apply mb-1 text-sm font-normal leading-none text-gray-700 dark:text-gray-400;
}

.bullet {
  @apply absolute w-3 h-3 rounded-full mt-1.5 -start-[31px] border border-primary bg-primary;
}

.achievement {
  @apply list-disc list-outside pl-4 mt-3 mb-2;
}

.achievement li {
  @apply pl-1.5;
}

.achievement li:not(:last-child) {
  @apply mb-3.5;
}

.certificates img {
  @apply h-auto max-w-full rounded-xl cursor-pointer transform ease-in-out duration-300 
  translate-y-0 hover:-translate-y-1 border-2 border-solid dark:border-zinc-900 border-gray-300; 
}
</style>