import { defineStore } from "pinia";
import { ref } from "vue";
import apiClient from "../composables/axios.js";

export const useContributionStore = defineStore("contributionStore", () => {
  const loading = ref(true);
  const data = ref([]);
  const total = ref(0);
  const username = "fahrianggara";

  // Ambil hari ini (secara otomatis berubah setiap hari)
  const today = new Date();
  const endDate = today.toISOString().split("T")[0] + "T23:59:59Z";

  // Fetch data untuk mendapatkan tanggal kontribusi pertama
  const getFirstContributionDate = async () => {
    const query = {
      query: `
        {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
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
      `,
    };

    try {
      const response = await apiClient.post("github/graphql", query);

      // Ambil semua tanggal kontribusi dari API
      const contributionDays = response.data.data.user.contributionsCollection.contributionCalendar.weeks.flatMap(
        (week) => week.contributionDays
      );

      // Cari tanggal pertama yang ada kontribusinya
      const firstContribution = contributionDays.find(
        (day) => day.contributionCount > 0
      );

      // Jika ditemukan, return tanggal tersebut
      return firstContribution ? firstContribution.date : null;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // Generate semua hari antara `startDate` dan `endDate`
  const generateFullYearDays = (startDate) => {
    const days = [];
    const start = new Date(startDate);
    const end = new Date(today);

    while (start <= end) {
      days.push(start.toISOString().split("T")[0]);
      start.setDate(start.getDate() + 1);
    }

    return days;
  };

  // Fungsi untuk fetch data kontribusi dari GitHub
  const fetchData = async () => {
    loading.value = true;

    // Ambil tanggal kontribusi pertama
    const startDate = await getFirstContributionDate();
    if (!startDate) {
      console.error("Tidak ada kontribusi ditemukan.");
      loading.value = false;
      return;
    }

    const query = {
      query: `
        {
          user(login: "${username}") {
            contributionsCollection(from: "${startDate}T00:00:00Z", to: "${endDate}") {
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
      `,
    };

    try {
      const response = await apiClient.post("github/graphql", query);

      const calendar =
        response.data.data.user.contributionsCollection.contributionCalendar;

      total.value = calendar.totalContributions;

      // Ambil data dari API
      const apiData = calendar.weeks.flatMap((week) =>
        week.contributionDays.map((day) => ({
          date: day.date,
          count: day.contributionCount,
        }))
      );

      // Dapatkan semua hari dalam rentang waktu tersebut
      const fullYearDays = generateFullYearDays(startDate);
      const existingDays = apiData.map((d) => d.date);

      // Loop semua hari, jika tidak ada kontribusi, tambahkan 1 kontribusi
      fullYearDays.forEach((day) => {
        if (!existingDays.includes(day)) {
          apiData.push({
            date: day,
            count: 1, // Atur kontribusi default
          });
        }
      });

      // Urutkan kembali berdasarkan tanggal
      apiData.sort((a, b) => new Date(a.date) - new Date(b.date));

      // Set nilai ke `data`
      data.value = apiData;
    } catch (error) {
      data.value = null;
    } finally {
      loading.value = false;
    }
  };

  return { data, loading, fetchData, total };
});
