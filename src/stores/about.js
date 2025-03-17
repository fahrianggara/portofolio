import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAboutStore = defineStore("aboutStore", () => {
  const about = ref(null);
  const loading = ref(true);
  const skills = ref([]);
  const greeting = ref(null);

  const getAbout = async () => {
    try {
      const { data } = await axios.get("api/about");
      about.value = data.data;
    } catch (error) {
      // error
    } finally {
      loading.value = false;
    }
  };

  const getSkills = async () => {
    try {
      const { data } = await axios.get("api/skills");
      skills.value = data.data;
    } catch (error) {
      // error
    }
  };

  const getGreeting = async () => {
    try {
      const { data } = await axios.get("api/greeting");
      greeting.value = data.data;
    } catch (error) {
      // error
    }
  };

  return { about, loading, getAbout, getGreeting, greeting, getSkills, skills };
})