import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../composables/axios.js";

export const useContributionStore = defineStore("contributionStore", () => {
  const loading = ref(true);
  const data = ref([]);
  const total = ref(0);
  const username = "fahrianggara";

  const currentYear = new Date().getFullYear();
  const startDate = `${currentYear}-01-01T00:00:00Z`;
  const endDate = `${currentYear}-12-31T23:59:59Z`;

  const fetchData = async () => {
    const query = {
      query: `
        {
          user(login: "${username}") {
            contributionsCollection(from: "${startDate}", to: "${endDate}") {
              contributionCalendar {
                totalContributions,
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `
    };

    try {
      const response = await apiClient.post("github/graphql", query);
      const calendar = response.data.data.user.contributionsCollection.contributionCalendar;

      total.value = calendar.totalContributions;
      data.value = calendar.weeks
        .flatMap(week => week.contributionDays) // Ambil array contributionDays dari setiap minggu
        .map(day => ({
          date: day.date,
          count: day.contributionCount
        }));
    } catch (error) {
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, fetchData, total, endDate };
});