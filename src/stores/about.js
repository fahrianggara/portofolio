import apiService from "@/utils/apiService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAboutStore = defineStore("aboutStore", () => {
  const about = ref(null);
  const loading = ref(true);
  const skills = ref([]);
  const greeting = ref(null);

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
    }
  };

  const getGreeting = async () => {
    try {
      const { data } = await apiService.get("/greeting");
      greeting.value = data;
    } catch (error) {
      // error
    }
  };

  return { about, loading, getAbout, getGreeting, greeting, getSkills, skills };
})