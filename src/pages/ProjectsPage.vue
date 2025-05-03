<script setup>
import { useMeta } from '../composables/meta';
import { useProjectStore } from '../stores/projects';
import { useRepoStore } from '../stores/repositories';

const repositories = useRepoStore();
const projectStore = useProjectStore();
const projects = projectStore.data.data;

useMeta({
  title: 'Projects',
  description: "Let's take a look at some of the projects that I have worked on.",
  keywords: "fahri anggara, angga, projects, project, fahri anggara projects, fahri anggara project, project fahri anggara, project portfolio, web developer projects, mobile app developer projects, frontend developer projects, coding projects, programming projects, software development projects, projek web, pengembangan aplikasi, front-end development, back-end development, Vue.js, Laravel, React, pengembangan mobile, desain UI/UX, aplikasi web, proyek coding, proyek teknologi, pengalaman proyek, project development, aplikasi berbasis web, pengembangan software, repository github, open source"
}); 
</script>

<template>
  <div class="projects">
    <h1 class="text-lg font-medium mb-1">My Projects</h1>
    <p class="text-gray-700 dark:text-gray-400 mb-5 text-[15px] md:text-[16px]">
      These are some of my projects that I've worked on.
    </p>

    <div v-if="!projects || !projects.length" class="card">
      Still dreaming them up... stay tuned!
    </div>

    <template v-else>
      <ol>
        <li v-for="(project) in projects" :key="project.id">
          <router-link class="flex items-start gap-4" :to="{ name: 'project', params: { slug: project.slug } }">
            <img :src="project.image_link" alt="thumbnail" loading="lazy" 
              class="w-20 h-20 md:w-28 md:h-28 object-cover rounded-lg border border-solid 
              border-gray-300 dark:border-zinc-800" />
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
              <p class="text-base/relaxed text-[14px] sm:text-[15px] text-gray-700 dark:text-gray-500 
                line-clamp-2 mt-auto">
                {{ project.body }}
              </p>
            </div>
          </router-link>
        </li>
      </ol>
    </template>
  </div>

  <div class="repositories">
    <h1 class="text-lg font-medium mb-1 mt-8">My Repositories</h1>
    <p class="text-gray-700 dark:text-gray-400 mb-5 text-[15px] md:text-[16px]">
      These are some of my pinned repositories on GitHub.
    </p>
    <ol>
      <li v-for="(repository, i) in repositories.data" :key="i">
        <a :href="repository.url" target="_blank" rel="noopener noreferrer">
          <svg class="w-6 h-6 fill-primary mb-3" xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
            <path d="M19,3H12.472a1.019,1.019,0,0,1-.447-.1L8.869,1.316A3.014,3.014,0,0,0,7.528,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,3H7.528a1.019,1.019,0,0,1,.447.1l3.156,1.579A3.014,3.014,0,0,0,12.472,5H19a3,3,0,0,1,2.779,1.882L2,6.994V6A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V8.994l20-.113V18A3,3,0,0,1,19,21Z"/>
          </svg>

          <div class="content">
            <h3 class="text-[16px] font-semibold mb-1">
              {{ repository.name }}
            </h3>
            <p class="text-base/relaxed text-[14.5px] text-gray-600 dark:text-gray-400">
              {{ repository.description }}
            </p>
          </div>

          <div class="mt-auto">
            <div class="flex items-center gap-2">
              <div class="rounded-full w-3 h-3" :style="{ backgroundColor: repository.primaryLanguage.color }"></div>
              <span class="dark:text-gray-400 text-gray-600 text-[15px]">
                {{ repository.primaryLanguage.name }}
              </span>
            </div>
          </div>
        </a>
      </li>
    </ol>
  </div>
</template>