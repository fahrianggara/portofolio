import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useExperienceStore = defineStore("experienceStore", () => {
  const experiences = ref([]);
  const loading = ref(true);

  const getExperiences = async () => {    
    try {
      const { data } = await axios.get("api/experiences");
      experiences.value = Array.isArray(data.data) ? data.data : []; // Pastikan selalu array
    } catch (error) {
      experiences.value = []; // Jika error, set kosong agar tidak undefined
    } finally {
      loading.value = false;
    }
  };

  return { experiences, loading, getExperiences };
});
