import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../composables/axios.js";

export const useGithubStore = defineStore("githubStore", () => {
  const loading = ref(true);
  const data = ref(null);

  const fetchData = async () => {
    try {
      const res = await apiClient.get(`github/users/fahrianggara`);
      data.value = res.data;
    } catch (error) {
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, fetchData };
})