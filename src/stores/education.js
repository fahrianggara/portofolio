import { ref } from "vue";
import apiService from "@/utils/apiService";
import { defineStore } from "pinia";

export const useEducationStore = defineStore("educationStore", () => {
  const loading = ref(true);
  const educations = ref([]);

  const getEducations = async () => {
    try {
      const { data } = await apiService.get("/educations");
      educations.value = data;
    } catch (error) {
      console.error(error);
      educations.value = [];
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    educations,
    getEducations,
  };
});