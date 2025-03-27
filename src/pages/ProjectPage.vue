<script setup>
import { ref, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useMeta } from "../composables/meta";
import { useProjectStore } from "../stores/projects";
import ProjectThumbnail from "../components/ProjectThumbnail.vue";
import Markdown from "../components/Markdown.vue";

const route = useRoute();
const router = useRouter();
const projects = useProjectStore();
const project = ref(null);

watchEffect(() => {
  const foundProject = projects.getDataWithSlug(route.params.slug);
  
  if (!foundProject) {
    router.replace({ name: "notFound" });
  } else {
    project.value = foundProject;
    useMeta(`Project - ${project.value.title}`, project.value.body, project.value.image_link);
  }
});
</script>

<template>
  <router-link to="/projects" class="back">
    <i class="fi fi-rr-angle-small-left"></i> Back to Projects
  </router-link>

  <ProjectThumbnail :project="project" />

  <div class="content-wrapper">
    <h1>{{ project.title }}</h1>

    <Markdown :content="project.description" class="content" />

    <div class="project-info">
      <h1>Project Information</h1>
      <div class="relative overflow-x-auto">
        <table class="w-full text-sm text-left rounded-2xl overflow-hidden border-collapse">
          <tbody>
            <tr class="first:rounded-t-2xl last:rounded-b-2xl bg-white/70 dark:bg-dark-surface/60 border border-solid dark:border-zinc-900 border-gray-300">
              <th scope="row" class="px-4 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                Category
              </th>
              <td class="px-4 py-4">
                : {{ project.category.name }}
              </td>
            </tr>
            <tr class="bg-white/70 dark:bg-dark-surface/60 border border-solid dark:border-zinc-900 border-gray-300">
              <th scope="row" class="px-4 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                Project Date
              </th>
              <td class="px-4 py-4">
                : {{ project.until_date }}
              </td>
            </tr>
            <tr class="last:rounded-b-2xl bg-white/70 dark:bg-dark-surface/60 border border-solid dark:border-zinc-900 border-gray-300">
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
</template>

<style scoped>
@import "@/assets/style.css";

.back {
  @apply dark:bg-dark-surface/70 bg-white/90
  inline-flex items-center px-4 py-3 pr-5 rounded-full text-sm font-medium cursor-pointer
  text-primary hover:bg-primary/80 hover:text-white ease-in-out duration-300
  border dark:border-zinc-900 border-gray-300;
}

.back i {
  @apply relative top-0.5 mr-1;
}

.content-wrapper {
  @apply block mt-5 md:mt-5;
}

.content-wrapper h1 {
  @apply text-[20px] md:text-[25px] font-bold;
}

.category {
  @apply text-[14px] text-primary font-medium mb-1.5;
}

.content {
  @apply mt-2 text-[15px] text-gray-700 dark:text-gray-400 leading-6
  md:leading-7 md:text-[16px];
}

.project-info {
  @apply mt-5 md:mt-7;
}

.project-info h1 {
  @apply text-[18px] font-semibold mb-3;
}
</style>