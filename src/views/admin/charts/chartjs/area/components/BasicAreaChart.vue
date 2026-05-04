<template>
  
    <div dir="ltr">
      <div class="mt-3" style="height: 300px">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>
  
</template>

<script setup lang="ts">
import { CategoryScale, Chart, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from 'chart.js'
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Register Chart.js components globally
Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale, Filler, Tooltip, Legend)

const chartCanvas = ref<HTMLCanvasElement | null>(null)
let chartInstance: Chart | null = null

onMounted(() => {
  if (!chartCanvas.value) return

  const ctx = chartCanvas.value.getContext('2d')
  if (!ctx) return

  // Create the chart
  chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      datasets: [
        {
          label: 'User Signups',
          data: [120, 150, 180, 210, 190, 230, 250, 270, 300],
          backgroundColor: 'rgba(59, 130, 246, 0.3)', // blue-500 with opacity
          borderColor: 'rgb(59, 130, 246)',
          fill: true,
          tension: 0.3,
          pointRadius: 0,
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(0, 0, 0, 0.05)',
          },
        },
        x: {
          grid: {
            display: false,
          },
        },
      },
    },
  })
})

onBeforeUnmount(() => {
  // Destroy chart to prevent memory leaks
  if (chartInstance) {
    chartInstance.destroy()
    chartInstance = null
  }
})
</script>
