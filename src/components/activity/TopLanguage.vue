<script setup>
import { ref, onMounted, onUnmounted, watch, defineProps, defineExpose } from "vue";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables); // Register all chart types

const props = defineProps(["codingStats"]);
const chartCanvas = ref(null);
const chartInstance = ref(null);

// Warna spesifik untuk bahasa pemrograman
const languageColors = {
  "PHP": "#777BB4",
  "Laravel": "#F05138",
  "Dart": "#00B4AB",
  "Vue.js": "#42B883",
  "HTML": "#E34F26",
  "CSS": "#1572B6",
  "Python": "#3776AB",
  "Bash": "#4EAA25",
  "JavaScript": "#F7DF1E",
  "YAML": "#A0CECB",
  "JSON": "#292929",
  "Other": "#A0A0A0",
  "XML": "#0060AC"
};

// Fungsi untuk mengubah "198:21" jadi "198 hrs 21 mins"
const formatDigitalTime = (digitalTime) => {
  const [hours, minutes] = digitalTime.split(":").map(Number);
  return `${hours} hrs ${minutes} mins`;
};

// **Render Chart**
const renderChart = () => {
  if (!chartCanvas.value || !props.codingStats?.languages) return;

  // Ambil **10 bahasa teratas** dan ubah "Blade Template" menjadi "Laravel"
  const languageData = props.codingStats.languages
    .slice(0, 10)
    .map(lang => ({
      label: lang.name === "Blade Template" ? "Laravel" : lang.name,
      value: lang.percent,
      color: languageColors[lang.name === "Blade Template" ? "Laravel" : lang.name] || "#CCCCCC",
      digital: lang.digital
    }));

  // Hapus chart lama (jika ada)
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }

  // Buat chart baru
  chartInstance.value = new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels: languageData.map(l => l.label),
      datasets: [{
        label: "Coding Time (%)",
        data: languageData.map(l => l.value),
        backgroundColor: languageData.map(l => l.color)
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false, // Tambahkan ini agar chart menyesuaikan ukuran container
      scales: {
        x: { beginAtZero: true },
        y: { beginAtZero: true }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: function (tooltipItem) {
              let lang = languageData[tooltipItem.dataIndex];
              return `${tooltipItem.raw}% (${formatDigitalTime(lang.digital)})`;
            }
          }
        },
        legend: { display: false }
      },
    },
  });
};

// **Fungsi untuk Mendapatkan Orientasi Chart**
const updateChartOrientation = () => {
  if (chartInstance.value) {
    chartInstance.value.resize();
  }
};

// **Expose untuk bisa dipanggil dari luar**
defineExpose({ updateChartOrientation });

onMounted(() => {
  renderChart();
  window.addEventListener("resize", updateChartOrientation);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateChartOrientation);
  if (chartInstance.value) {
    chartInstance.value.destroy();
  }
});
</script>

<template>
  <div style="position: relative; height: 300px;">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>