import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../composables/axios";

export const useProjectStore = defineStore('projectStore', () => {
  const loading = ref(true);
  const data = ref([]);
  const currentPage = ref(1);
  const lastPage = ref(1);

  const fetchData = async (page = 1) => {
    try {
      const response = await apiClient.get(`api/projects?page=${page}`);
      data.value = response.data.data;
      currentPage.value = response.data.current_page;
      lastPage.value = response.data.last_page;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    data,
    currentPage,
    lastPage,
    fetchData
  };
});