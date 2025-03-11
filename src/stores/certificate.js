import apiService from "@/utils/apiService";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCertificateStore = defineStore("certificateStore", () => {
  const certificates = ref([]);
  const loading = ref(true);

  const fetchCertificates = async () => {
    try {
      const { data } = await apiService.get("/certifications");
      certificates.value = data;
    } catch (error) {
      console.error(error);
    } finally {
      loading.value = false;
    }
  };

  return { certificates, loading, fetchCertificates };
})