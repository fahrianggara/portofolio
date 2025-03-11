import { defineStore } from "pinia";
import { ref } from "vue";
import apiService from "@/utils/apiService";

export const useExperienceStore = defineStore("experienceStore", () => {
  const experiences = ref([]);
  const loading = ref(true);

  const fetchExperiences = async () => {
    try {
      const { data } = await apiService.get("/experiences");
      experiences.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return { experiences, loading, fetchExperiences };
});
