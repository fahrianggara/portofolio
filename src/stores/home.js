import { defineStore } from "pinia";
import apiService from "@/utils/apiService";
import { ref } from "vue";

export const useHomeStore = defineStore('homeStore', () => {
  const loading = ref(true);
  const greeting = ref(null);

  const getGreeting = async () => {
    try {
      const { data } = await apiService.get("/greeting");
      greeting.value = data;
    } catch (error) {
      
    } finally {
      loading.value = false;
    }
  };

  return {
    loading,
    greeting,
    getGreeting
  };
});