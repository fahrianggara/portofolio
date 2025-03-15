<script setup>
import Sidebar from "@/components/Sidebar.vue";
import { useScreenSize } from "@/utils/screenResize.js";
import Certificates from "@/components/education/Certificates.vue";
import { useEducationStore } from "@/stores/education";
import { onMounted } from "vue";
import MarkdownViewer from "@/components/MarkdownViewer.vue";

const { resizeScreen } = useScreenSize();
const educationStore = useEducationStore();

onMounted(() => {
  if (!educationStore.educations.length) {
    educationStore.getEducations();
  }
});
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white hidden md:block relative" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 mb-5">
          <h1 class="mb-1 font-medium text-lg">My Educations</h1>
          <p class="text-base/relaxed font-normal text-gray-700 dark:text-gray-400 mb-4">
            These are the educations that I have taken so far.
          </p>

          <div v-if="!educationStore.educations.length && !educationStore.loading" class="card">
            Whoops, I haven't added any work experience yet.
          </div>


          <div v-else>
            <ol class="edu" :class="{ 'not-loading': !educationStore.loading }">
              <li v-if="educationStore.loading" v-for="n in 2" :key="n">
                <div class="h-2 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg w-[260px]"></div>
                <div class="h-3 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-4 w-[200px]"></div>

                <div class="h-2.5 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-4"></div>
                <div class="h-2.5 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-3"></div>
                <div class="h-2.5 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-3"></div>
                <div class="h-2.5 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-3"></div>
              </li>

              <li v-for="(education, i) in educationStore.educations" :key="i">
                <div class="bullet"></div>
                <time class="!text-primary">{{ education.major }}</time>
                <h3 class="title mt-1">{{ education.title }}</h3>
                <time>{{ education.until_date }}</time>

                <MarkdownViewer v-if="education.description" :content="education.description" />

                <ol class="achievement" v-if="education.achievements.length">
                  <li v-for="(achievement, j) in education.achievements" :key="j">
                    <p class="font-medium text-base/relaxed">
                      {{ achievement.name }}
                    </p>
                    <MarkdownViewer :content="achievement.description" />
                  </li>
                </ol>
              </li>
            </ol>
          </div>

          <Certificates />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference 'tailwindcss';
@import '@/assets/main.css';

.glightbox img {
  @apply h-auto max-w-full rounded-lg cursor-pointer transform ease-in-out duration-300 
  translate-y-0 hover:-translate-y-1;
}

.title {
  @apply text-lg font-semibold text-gray-900 dark:text-white;
}

.edu.not-loading {
  @apply relative border-s ml-1 border-gray-300 dark:border-zinc-800;
  
}

.edu.not-loading > li {
  @apply ms-7;
}

.edu > li {
  @apply mb-4 
bg-white/60 dark:bg-dark-surface/60 backdrop-blur-2xl 
  relative p-4 px-5 rounded-2xl 
  border border-solid dark:border-zinc-900 border-gray-300;
}

time {
  @apply mb-1 text-sm font-normal leading-none text-gray-700 dark:text-gray-400;
}

.bullet {
  @apply absolute w-3 h-3 rounded-full mt-1.5 -start-[35px] border border-primary bg-primary;
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

</style>
