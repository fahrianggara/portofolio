import { defineStore } from "pinia";
import axios from "axios";

export const useRepoStore = defineStore("repo", {
  state: () => ({
    repos: [],
    loading: true,
    error: null,
  }),

  actions: {
    async getPinnedRepos() {
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
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/github`, {query});
        this.repos = response.data.data.viewer.pinnedItems.nodes;
      } catch (error) {
        // 
      } finally {
        this.loading = false;
      }
    },
  },
});
