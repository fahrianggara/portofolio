import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useEducationStore = defineStore("educationStore", () => {
  const loading = ref(true);
  const educations = ref([]);

  const getEducations = async () => {
    try {
      const { data } = await axios.get("api/educations");
      educations.value = data.data;
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