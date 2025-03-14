import { defineStore } from "pinia";
import apiService from "@/utils/apiService";
import { ref } from "vue";

export const useSocialsStore = defineStore("socialsStore", () => {
  const socials = ref([]);
  const loading = ref(true);

  const getSocials = async () => {
    try {
      // get key social from data > social_media from configuration url
      const { data } = await apiService.get("/configuration");
      socials.value = Array.isArray(data.social_media) ? data.social_media : [];
    } catch (err) {
      socials.value = [];
    } finally {
      loading.value = false;
    }
  };

  return { socials, loading, getSocials };
});