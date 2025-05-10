<script setup>
import { useMeta } from '../composables/meta';
import { useExperienceStore } from '../stores/experiences';
import Markdown from '../components/Markdown.vue';

const experiences = useExperienceStore();

useMeta({
  title: 'Experience',
  description: 'Discover my professional experience and work history.',
  keywords: "fahri anggara, angga, pengalaman kerja, web developer, pengembang aplikasi, front-end developer, back-end developer, freelance developer, pengalaman profesional, pekerjaan pengembangan web, pengalaman pemrograman, aplikasi web, pengalaman teknis, pengembangan software, pekerjaan IT, pengalaman developer di jakarta"
})
</script>

<template>
  <h2 class="mb-1 font-medium text-lg">
    Work Experience
  </h2>

  <p class="mb-5 text-gray-700 dark:text-gray-400 text-[15px] md:text-[16px]">
    These are some of the work experiences that I've had.
  </p>

  <div v-if="!experiences.data || !experiences.data.length" class="card">
    Plot twist: no experience, but unlimited potential.
  </div>

  <ol class="parent" :class="{ 'not-loading': !experiences.loading }">
    
    <li class="mb-5 ms-6" v-for="(experience) in experiences.data" :key="experience.id">
      <div class="bullet"></div>

      <div>
        <div class="flex flex-wrap gap-2 mb-1">
          <span class="text-sm text-primary"># {{ experience.position }}</span>
          <span class="text-sm text-primary"># {{ experience.format_type }}</span>
        </div>

        <a href="#" class="font-semibold text-lg block">
          {{ experience.title }}
        </a>

        <time class="mb-2 text-[14px] font-normal leading-none text-gray-700 dark:text-gray-400">
          {{ experience.until_date }}
        </time>
      </div>

      <Markdown :content="experience.description" v-if="experience.description" />
    </li>
  </ol>
</template>

<style scoped>
  @import '@/assets/style.css';

  .parent.not-loading {
    @apply relative border-s ml-2 border-gray-300 dark:border-zinc-900;
  }

  .parent > li {
    @apply bg-white/60 dark:bg-dark-surface/60
    relative p-4 px-5 rounded-2xl border border-solid dark:border-zinc-900 border-gray-300;
  }

  .bullet {
    @apply absolute w-3 h-3 rounded-full mt-1.5 -start-[31px] border border-primary bg-primary;
  }

</style>