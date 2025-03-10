<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
const repos = ref([]);
const loading = ref(true);

async function getPinnedRepos() {
  const query = `
    query {
      viewer {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await axios.post(
      "/github-api/graphql",
      { query }, // Perbaiki dari `params` menjadi `data`
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GITHUB_ACCESS_TOKEN}`,
        },
      }
    );

    repos.value = response.data.data.viewer.pinnedItems.nodes; // Ambil data dengan benar
  } catch (error) {
    console.error("Error fetching repositories:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(getPinnedRepos);
</script>

<template>
  <h1 class="text-lg font-medium mb-1 mt-6">My Repositories</h1>
  <p class="dark:text-gray-400 text-gray-600 mb-5 text-[15px] md:text-[16px]">
    These are some of my pinned repositories on GitHub.
  </p>

  <ol class="repos">
    <li v-if="loading" v-for="n in 2" :key="n">
      <a href="#">
        <div class="w-8 h-8 bg-gray-300 dark:bg-dark-surface rounded-lg animate-pulse"></div>
        <div class="w-full h-4 bg-gray-300 dark:bg-dark-surface rounded-lg animate-pulse mt-3"></div>
        <div class="w-full h-3 bg-gray-300 dark:bg-dark-surface rounded-lg animate-pulse mt-3"></div>
        <div class="w-full h-3 bg-gray-300 dark:bg-dark-surface rounded-lg animate-pulse mt-2"></div>
        <div class="w-[100px] h-3 bg-gray-300 dark:bg-dark-surface rounded-lg animate-pulse mt-4"></div>
      </a>
    </li>

    <li v-else v-for="(repo, index) in repos" :key="index">
      <a :href="repo.url" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" width="512" height="512">
          <path d="M19,3H12.472a1.019,1.019,0,0,1-.447-.1L8.869,1.316A3.014,3.014,0,0,0,7.528,1H5A5.006,5.006,0,0,0,0,6V18a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V8A5.006,5.006,0,0,0,19,3ZM5,3H7.528a1.019,1.019,0,0,1,.447.1l3.156,1.579A3.014,3.014,0,0,0,12.472,5H19a3,3,0,0,1,2.779,1.882L2,6.994V6A3,3,0,0,1,5,3ZM19,21H5a3,3,0,0,1-3-3V8.994l20-.113V18A3,3,0,0,1,19,21Z"/>
        </svg>

        <div class="content">
          <h3 class="text-[16px] font-semibold mb-1">
            {{ repo.name }}
          </h3>
          <p class="text-base/relaxed text-[14.5px] text-gray-600 dark:text-gray-400">
            {{ repo.description }}
          </p>
        </div>

        <div class="mt-auto">
          <div class="flex items-center gap-2">
            <div class="rounded-full w-3 h-3" :style="{ backgroundColor: repo.primaryLanguage.color }"></div>
            <span class="dark:text-gray-400 text-gray-600 text-[15px]">
              {{ repo.primaryLanguage.name }}
            </span>
          </div>
        </div>
      </a>
    </li>
  </ol>
</template>

<style scoped>
  @reference 'tailwindcss';
  @import '@/assets/main.css';

  .repos {
    @apply grid sm:grid-cols-2 grid-cols-1 gap-4;
  }

  .repos li {
    @apply relative p-4 rounded-2xl bg-white/60 dark:bg-dark-surface/60 backdrop-blur-2xl 
    border border-solid dark:border-zinc-900 border-gray-300 ease-in-out duration-300 
    transform hover:-translate-y-[2px] dark:hover:bg-dark-surface/80 hover:bg-white/70 ;
  }

  .repos li a {
    @apply flex flex-col items-start h-full;
  }

  .repos svg {
    @apply w-6 h-6 fill-primary mb-3;
  }

  .content {
    @apply mb-4;
  }
</style>