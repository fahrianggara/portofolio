import { defineStore } from "pinia";
import apiService from "@/utils/apiService";
import { useToast } from "@/utils/useToast";

const toast = useToast();

export const useCvStore = defineStore("cv", {
  state: () => ({
    data: null,
  }),
  actions: {
    async fetchConfig() {
      try {
        const { data } = await apiService.get("/configuration");
        this.data = data;
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