import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useProjectStore = defineStore("projectStore", () => {
  const projects = ref([]);
  const loading = ref(true);
  const currentPage = ref(1);
  const lastPage = ref(1);

  const getProjects = async (page = 1) => {
    try {
      const { data, current_page, last_page } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/projects?page=${page}`);
      projects.value = Array.isArray(data.data.data) ? data.data.data : [];
      currentPage.value = current_page;
      lastPage.value = last_page;
    } catch (err) {
      projects.value = [];
    } finally {
      loading.value = false;
    }
  };

  return { projects, loading, currentPage, lastPage, getProjects };
});
