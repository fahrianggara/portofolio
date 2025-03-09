<script setup>

import Sidebar from "@/components/Sidebar.vue";
import { useScreenSize } from "@/utils/screenResize.js";
import Thumbnail from "@/components/projects/Thumbnail.vue";
import apiService from "@/utils/apiService";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import VueMarkdown from "vue-markdown-render";
const { resizeScreen } = useScreenSize();

const route = useRoute();
const loading = ref(true);
const project = ref(null);

const getProject = async () => {
  try {
    const res = await apiService.get(`/projects/${route.params.slug}`);
    project.value = res.data;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getProject();
});

</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white hidden md:block relative mb-6" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 mb-[23px]">
          <router-link to="/projects" class="back">
            <i class="fi fi-rr-angle-small-left"></i> Back to Projects
          </router-link>

          <!-- Thumbnail Component -->
          <div v-if="loading">
            <div class="h-[200px] md:h-[250px] animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-xl w-full mt-5"></div>
          </div>

          <Thumbnail :project="project" v-else />

          <div class="content-wrapper" v-if="loading">
            <div class="h-3 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-[260px]"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-5"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-3"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-3"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-3"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-5"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-3"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-3"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-3"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-5"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-3"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-3"></div>
            <div class="h-2 animate-pulse bg-gray-400 dark:bg-zinc-800 rounded-lg w-full mt-3"></div>
          </div>

          <!-- Content -->
          <div class="content-wrapper" v-else>
            <h1>{{ project.title }}</h1>

            <!-- <div class="content" v-html="sanitizedBody"></div> -->
            <VueMarkdown class="content" :source="project.description" v-prism />
            
            <div class="project-info">
              <!-- <h1>Project Info</h1> -->
              <div class="relative overflow-x-auto">
                <table class="w-full text-sm text-left rounded-2xl overflow-hidden border-collapse">
                <tbody>
                  <tr class="first:rounded-t-2xl last:rounded-b-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-lg border border-solid dark:border-zinc-900 border-gray-300">
                    <th scope="row" class="px-4 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                      Category
                    </th>
                    <td class="px-4 py-4">
                      : {{ project.category.name }}
                    </td>
                  </tr>
                  <tr class="bg-white/60 dark:bg-dark-surface/60 backdrop-blur-lg border border-solid dark:border-zinc-900 border-gray-300">
                    <th scope="row" class="px-4 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                      Project Date
                    </th>
                    <td class="px-4 py-4">
                      : Jan 2021 - Mar 2021
                    </td>
                  </tr>
                  <tr class="last:rounded-b-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-lg border border-solid dark:border-zinc-900 border-gray-300">
                    <th scope="row" class="px-4 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                      Link
                    </th>
                    <td class="px-4 py-4">
                      : <a :href="project.links" class="text-primary hover:underline">{{ project.links }}</a>
                    </td>
                  </tr>
                </tbody>
              </table>

              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@reference "tailwindcss";
@import "@/assets/main.css";

.back {
  @apply dark:bg-dark-bg-primary/70 bg-bg-primary/90 backdrop-blur-lg
  inline-flex items-center px-4 py-3 pr-5 rounded-full text-sm font-medium cursor-pointer
  text-primary hover:bg-primary/80 hover:text-white ease-in-out duration-300;
}

.back i {
  @apply relative top-0.5 mr-1;
}

.content-wrapper {
  @apply block mt-5 md:mt-8;
}

.content-wrapper h1 {
  @apply text-[20px] font-bold;
}

.category {
  @apply text-[14px] text-primary font-medium mb-1.5;
}

.content {
  @apply mt-2 text-[15px] text-gray-800 dark:text-gray-200 leading-6
  md:leading-7 md:text-[16px];
}

.project-info {
  @apply mt-5 md:mt-7;
}

.project-info h1 {
  @apply text-[16px] md:text-[18px] font-semibold mb-3;
}
</style>
