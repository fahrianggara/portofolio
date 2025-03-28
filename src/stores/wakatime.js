import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../composables/axios";

export const useWakatimeStore = defineStore("wakatimeStore", () => {
  const data = ref(null);
  const loading = ref(true);

  const fetchData = async () => {
    try {
      const res = await apiClient.get(`wakatime`);
      data.value = res.data.data;
    } catch (error) {
      data.value = [];
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, fetchData };
});