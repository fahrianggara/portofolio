import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../composables/axios.js";

export const useAboutStore = defineStore('aboutStore', () => {
  const loading = ref(true);
  const data = ref(null);

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`api/about`);
      data.value = response.data.data;
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