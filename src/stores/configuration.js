import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../composables/axios.js";
import { useToast } from "../composables/toast.js";

export const useConfigStore = defineStore('configurationStore', () => {
  const loading = ref(true);
  const data = ref(null);
  const toast = useToast();

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`api/configuration`);
      data.value = response.data.data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  const downloadCV = async () => {
    if (!data.value?.resume_link) {
      toast.info("Wait a moment, it's still loading...");
      return;
    }

    const link = document.createElement("a");
    link.href = data.value.resume_link;
    link.setAttribute("download", "CV - Fahri Anggara.pdf");
    link.setAttribute("target", "_blank");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    loading,
    data,
    fetchData,
    downloadCV,
  };
});