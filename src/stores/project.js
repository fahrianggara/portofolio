import { defineStore } from "pinia";
import { ref } from "vue";
import apiService from "@/utils/apiService";

export const useProjectStore = defineStore("projectStore", () => {
  const projects = ref([]);
  const loading = ref(true);
  const currentPage = ref(1);
  const lastPage = ref(1);

  const fetchProjects = async (page = 1) => {
    if (projects.value.length && currentPage.value === page) return; // Cegah fetch ulang

    loading.value = true;
    try {
      const response = await apiService.get(`/projects?page=${page}`);
      projects.value = response.data.data;
      currentPage.value = response.data.current_page;
      lastPage.value = response.data.last_page;
    } catch (err) {
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  return { projects, loading, currentPage, lastPage, fetchProjects };
});
