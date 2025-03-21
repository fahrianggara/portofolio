import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../composables/axios";

export const useGreetingStore = defineStore('greetingStore', () => {
  const loading = ref(true);
  const greeting = ref(null);

  const fetchData = async () => {
    try {
      const { data } = await apiClient.get(`api/greeting`);
      greeting.value = data.data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    greeting,
    fetchData
  };
});