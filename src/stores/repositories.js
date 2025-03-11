import { defineStore } from "pinia";
import axios from "axios";

export const useRepoStore = defineStore("repo", {
  state: () => ({
    repos: [],
    loading: true,
    error: null,
  }),

  actions: {
    async fetchPinnedRepos() {
      const GITHUB_ACCESS_TOKEN = import.meta.env.VITE_GITHUB_ACCESS_TOKEN;
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
          "https://api.github.com/graphql",
          { query },
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${GITHUB_ACCESS_TOKEN}`,
            },
          }
        );
        this.repos = response.data.data.viewer.pinnedItems.nodes;
      } catch (error) {
        this.error = "Failed to load repositories.";
        console.error("Error fetching repositories:", error);
      } finally {
        this.loading = false;
      }
    },
  },
});
