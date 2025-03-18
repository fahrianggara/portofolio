import apiClient from "@/utils/axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useCertificateStore = defineStore("certificateStore", () => {
  const certificates = ref([]);
  const loading = ref(true);

  const getCertificates = async () => {
    try {
      const { data } = await apiClient.get(`api/certifications`);
      certificates.value = data.data;
    } catch (error) {
      certificates.value = [];
    } finally {
      loading.value = false;
    }
  };

  return { certificates, loading, getCertificates };
})