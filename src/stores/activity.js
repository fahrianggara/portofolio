import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useActivityStore = defineStore("activityStore", () => {
  const codingStats = ref(null);
  const loading = ref(true);

  const getActivity = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/wakatime`);
      codingStats.value = data.data;
    } catch (error) {
      codingStats.value = [];
    } finally {
      loading.value = false;
    }
  };

  return { codingStats, loading, getActivity };
})