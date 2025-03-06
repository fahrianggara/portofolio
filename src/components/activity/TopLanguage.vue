<script setup>
import { defineProps, watch, ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Registrasi komponen yang diperlukan
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const props = defineProps(["codingStats"]);
const chartData = ref({
  labels: [],
  datasets: [
    {
      label: "Coding Time (%)",
      data: [],
      backgroundColor: [],
    },
  ],
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { beginAtZero: true },
    y: { beginAtZero: true },
  },
  plugins: {
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          let lang = props.codingStats.languages[tooltipItem.dataIndex];
          return `${tooltipItem.raw}% (${formatDigitalTime(lang.digital)})`;
        },
      },
    },
    legend: { display: false },
  },
};

// Warna spesifik untuk bahasa pemrograman
const languageColors = {
  PHP: "#777BB4",
  Laravel: "#F05138",
  Dart: "#00B4AB",
  "Vue.js": "#42B883",
  HTML: "#E34F26",
  CSS: "#1572B6",
  Python: "#3776AB",
  Bash: "#4EAA25",
  JavaScript: "#F7DF1E",
  YAML: "#A0CECB",
  JSON: "#292929",
  Other: "#A0A0A0",
  XML: "#0060AC",
};

// Format waktu digital jadi `198 hrs 21 mins`
const formatDigitalTime = (digitalTime) => {
  const [hours, minutes] = digitalTime.split(":").map(Number);
  return `${hours} hrs ${minutes} mins`;
};

// Update data chart saat props berubah
watch(
  () => props.codingStats,
  (newStats) => {
    if (!newStats?.languages) return;

    const languageData = newStats.languages
      .slice(0, 10)
      .map((lang) => ({
        label: lang.name === "Blade Template" ? "Laravel" : lang.name,
        value: lang.percent,
        color: languageColors[lang.name === "Blade Template" ? "Laravel" : lang.name] || "#CCCCCC",
      }));

    chartData.value = {
      labels: languageData.map((l) => l.label),
      datasets: [
        {
          label: "Coding Time (%)",
          data: languageData.map((l) => l.value),
          backgroundColor: languageData.map((l) => l.color),
        },
      ],
    };
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div style="position: relative; height: 300px;">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
