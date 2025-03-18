<script setup>
  import Sidebar from "@/components/Sidebar.vue";
  import { useScreenSize } from "@/utils/screenResize.js";
  import Repositories from "@/components/projects/Repositories.vue";
  import Pagination from "@/components/projects/Pagination.vue";
  import { onMounted, watchEffect } from "vue";
  import { useProjectStore } from "@/stores/project";

  const { resizeScreen } = useScreenSize();
  const projectStore = useProjectStore();

  const changePage = (page) => {
    if (page >= 1 && page <= projectStore.lastPage) {
      projectStore.getProjects(page);
    }
  };

  onMounted(() => {
    if (!projectStore.projects.length) {
      projectStore.getProjects(projectStore.currentPage);
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
          <h1 class="text-lg font-medium mb-1">My Projects</h1>
          <p class="text-gray-700 dark:text-gray-400 mb-5 text-[15px] md:text-[16px]">
            These are some of my projects that I've worked on.
          </p>

          <div v-if="!projectStore.projects.length && !projectStore.loading" class="card">
            Hmm.. I haven't added any projects yet.
          </div>

          <div v-else>
            <ol class="projects">
              <template v-if="projectStore.loading">
                <li v-for="n in 1" :key="n">
                  <a href="#" class="flex items-start gap-4">
                    <div class="w-20 h-20 md:w-28 md:h-28 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-xl"></div>
                    <div class="w-full h-full flex flex-col justify-between">
                      <div class="h-2 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg w-[120px]"></div>
                      <div class="h-4 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-4"></div>
                      <div class="h-3 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-4"></div>
                      <div class="h-3 animate-pulse bg-gray-300 dark:bg-zinc-900 rounded-lg mt-2"></div>
                    </div>
                  </a>
                </li>
              </template>

              <li v-else v-for="(project, index) in projectStore.projects" :key="index">
                <router-link class="flex items-start gap-4" :to="{
                  name: 'project-detail',
                  params: { slug: project.slug }
                }">
                  <img :src="project.image_link" alt="thumbnail" />
                  <div class="w-full h-full flex flex-col justify-between">
                    <div>
                      <span class="text-[12px] sm:text-[13px] text-primary mb-1 block">
                        {{ project.category.name }}
                      </span>
                      <h3 class="text-[15px] sm:text-[16px] md:text-lg font-semibold mb-1 
                        line-clamp-1 duration-300 ease-in-out">
                        {{ project.title }}
                      </h3>
                    </div>
                    <p class="text-base/relaxed text-[13px] sm:text-[15px] text-gray-600 dark:text-gray-400 
                      line-clamp-2 mt-auto">
                      {{ project.body }}
                    </p>
                  </div>
                </router-link>
              </li>
            </ol>

            <Pagination v-if="projectStore.lastPage > 1"
              :loading="projectStore.loading"
              :current-page="projectStore.currentPage"
              :last-page="projectStore.lastPage"
              @page-change="changePage"
            />
          </div>

          <Repositories />
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  .projects {
    @apply flex flex-col gap-4;
  }

  .projects li a  {
    @apply relative p-4 rounded-2xl bg-white/40 dark:bg-dark-surface/60 backdrop-blur-2xl border border-solid dark:border-zinc-900 border-gray-300 ease-in-out duration-300 transform hover:-translate-y-[2px]
    dark:hover:bg-dark-surface/80 hover:bg-white/70;
  }
  .projects li img {
    @apply w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg border border-solid border-gray-300 dark:border-zinc-800;
  }
</style>
