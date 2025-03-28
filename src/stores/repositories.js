import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../composables/axios";

export const useRepoStore = defineStore('repoStore', () => {
  const loading = ref(true);
  const data = ref([]);

  const fetchData = async () => {
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
      const response = await apiClient.post('github/graphql', { query });
      data.value = response.data.data.viewer.pinnedItems.nodes;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    fetchData
  };
});