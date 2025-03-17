import { defineStore } from "pinia";
import { useToast } from "@/utils/useToast";
import axios from "axios";

const toast = useToast();

export const useCvStore = defineStore("cv", {
  state: () => ({
    data: null,
  }),
  actions: {
    async fetchConfig() {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/configuration`);
        this.data = data.data;
      } catch (error) {
        
      }
    },
    async downloadCV() {
      if (!this.data?.resume_link) {
        toast.info("Wait a moment, it's still loading...");
        return;
      }

      const link = document.createElement("a");
      link.href = this.data.resume_link;
      link.setAttribute("download", "CV - Fahri Anggara.pdf");
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
});