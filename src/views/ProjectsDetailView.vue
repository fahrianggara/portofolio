<script setup>
import { useScreenSize } from "@/utils/screenResize.js";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "@/components/Sidebar.vue";
import Thumbnail from "@/components/projects/Thumbnail.vue";
import axios from "axios";
import NotFoundSvg from "@/components/icon/NotFound.vue";
import MarkdownViewer from "@/components/MarkdownViewer.vue";

const { resizeScreen } = useScreenSize();

const route = useRoute();
const loading = ref(true);
const project = ref(null);
const notFound = ref(false);

const getProject = async () => {
  try {
    const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/projects/${route.params.slug}`);
    project.value = data.data;
  } catch (err) {
    if (err.response.status === 404) {
      notFound.value = true;
    }
    console.log(err);
  } finally {
    loading.value = false;
  }
};

watch(() => route.params.slug, getProject, { immediate: true });

onMounted(() => {
  getProject();
});

// Change the page title
const pageTitle = computed(() => {
  return `${project.value?.title || "Loading..."} - Fahri Anggara`;
});

watch(pageTitle, (newTitle) => {
  document.title = newTitle;
}, { immediate: true });
</script>

<template>
  <section>
    <div class="container">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-6 relative">
        <div class="dark:text-white hidden md:block relative mb-6" v-if="!resizeScreen">
          <Sidebar :class="'sticky top-26'" />
        </div>
        <div class="dark:text-white col-span-2 mb-[23px]">

          <div v-if="notFound" class="flex flex-col gap-3 items-center justify-center mx-auto">
            <NotFoundSvg class="w-[250px] h-[250px]" />

            <div class="transform -translate-y-5 text-center">
              <h1 class="dark:text-white text-[17px] font-bold text-center mb-2">Project Not Found</h1>
              <p class="dark:text-gray-500 text-gray-700 text-center text-base/relaxed text-[15px] sm:text-[16px] mb-2">
                The project you are looking for is not available or has been removed.
              </p>
              <router-link to="/projects" class="text-primary text-[16px] font-medium cursor-pointer hover:underline ease-in-out duration-75">
                Back to Projects
              </router-link>
            </div>
          </div>

          <div v-else>
            <router-link to="/projects" class="back" v-if="!loading">
              <i class="fi fi-rr-angle-small-left"></i> Back to Projects
            </router-link>

            <!-- Thumbnail Component -->
            <div v-if="loading">
              <div class="h-[200px] md:h-[250px] animate-pulse bg-gray-400 
                dark:bg-zinc-800 rounded-xl w-full" :class="{'mt-0': loading, 'mt-5': !loading}"></div>
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
              <h1 v-if="project">{{ project.title }}</h1>

              <MarkdownViewer class="content" v-if="project" :content="project.description" v-prism />
              
              <div class="project-info">
                <h1>Project Information</h1>
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
                        : {{ project.until_date }}
                      </td>
                    </tr>
                    <tr class="last:rounded-b-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-lg border border-solid dark:border-zinc-900 border-gray-300">
                      <th scope="row" class="px-4 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                        Link to Project
                      </th>
                      <td class="px-4 py-4">
                        : <a v-if="project.links" :href="project.links" target="_blank" class="text-primary hover:underline">
                          Go to Project
                          </a>

                          <span v-else>Not Available</span>
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
  @apply text-[20px] md:text-[25px] font-bold;
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
  @apply text-[18px] md:text-[20px] font-semibold mb-3 before:content-['#'] before:mr-2;
}
</style>
