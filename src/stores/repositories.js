import { defineStore } from "pinia";
import apiClient from "@/utils/axios";

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
        const response = await apiClient.post(`github`, {query});
        this.repos = response.data.data.viewer.pinnedItems.nodes;
      } catch (error) {
        // 
      } finally {
        this.loading = false;
      }
    },
  },
});
