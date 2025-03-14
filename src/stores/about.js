import apiService from "@/utils/apiService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAboutStore = defineStore("aboutStore", () => {
  const about = ref(null);
  const loading = ref(true);
  const skills = ref([]);
  const config = ref(null);

  const getAbout = async () => {
    try {
      const { data } = await apiService.get("/about");
      about.value = data;
    } catch (error) {
      // error
    } finally {
      loading.value = false;
    }
  };

  const getSkills = async () => {
    try {
      const { data } = await apiService.get("/skills");
      skills.value = data;
    } catch (error) {
      // error
    } finally {
      loading.value = false;
    }
  };

  const getConfig = async () => {
    try {
      const { data } = await apiService.get("/configuration");
      config.value = data;
    } catch (error) {
      // error
    } finally {
      loading.value = false;
    }
  };

  return { about, loading, getAbout, getConfig, config, getSkills, skills };
})