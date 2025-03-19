import { defineStore } from "pinia";
import apiClient from "@/utils/axios";
import { ref } from "vue";

export const useGithubUserStore = defineStore("githubUser", () => {
  const loading = ref(true);
  const user = ref(null);

  const getUser = async () => {
    try {
      const { data } = await apiClient.get(`github/users/fahrianggara`);
      user.value = data;
    } catch (error) {
      user.value = null;
    } finally {
      loading.value = false;
    }
  };

  return { user, loading, getUser };
});