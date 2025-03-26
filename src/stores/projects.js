import { defineStore } from "pinia";
import { computed, ref } from "vue";
import apiClient from "../composables/axios";
import { useRouter } from "vue-router";

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

  const getDataWithSlug = computed(() => (slug) => {
    if (!data.value.data || !Array.isArray(data.value.data)) return null; // Cek jika data kosong
  
    return data.value.data.find((project) => project.slug === slug) || null;
  });
  

  return {
    loading,
    data,
    currentPage,
    lastPage,
    fetchData,
    getDataWithSlug,
  };
});