import { defineStore } from "pinia";
import apiClient from "@/utils/axios";
import { ref } from "vue";

export const useGithubContribution = defineStore("githubContribution", () => {
  const loading = ref(true);
  const contributions = ref([]);
  const totalContributions = ref(0);
  const username = "fahrianggara";

  const currentYear = new Date().getFullYear();
  const startDate = `${currentYear}-01-01T00:00:00Z`;
  const endDate = `${currentYear}-12-31T23:59:59Z`;
  
  const getContributions = async () => {
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
      const { data } = await apiClient.post("github/graphql", query);
      const calendar = data.data.user.contributionsCollection.contributionCalendar;

      totalContributions.value = calendar.totalContributions;
      contributions.value = calendar.weeks
        .flatMap(week => week.contributionDays) // Ambil array contributionDays dari setiap minggu
        .map(day => ({
          date: day.date,
          count: day.contributionCount
        }));

      console.log(contributions.value);
    } catch (error) {
      contributions.value = null;
    } finally {
      loading.value = false;
    }
  };

  return { contributions, loading, getContributions, totalContributions, endDate };
});