import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useHomeStore = defineStore('homeStore', () => {
  const loading = ref(true);
  const greeting = ref(null);

  const getGreeting = async () => {
    try {
      const { data } = await axios.get("api/greeting");
      greeting.value = data.data;
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