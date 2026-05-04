import type { ChartData, ChartOptions } from 'chart.js'
import { getColor, getDefaultFontFamily } from '~/utils/helpers'

export type ChartJSOptionsType = { data: ChartData; options: ChartOptions }

export const getBasicAreaChart: () => ChartJSOptionsType = () => ({
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    datasets: [
      {
        label: 'User Signups',
        data: [120, 150, 180, 210, 190, 230, 250, 270, 300],
        backgroundColor: getColor('chart-primary-rgb', 0.3),
        borderColor: getColor('chart-primary'),
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  },
  options: {
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
  },
})

export const getStackedChart: () => ChartJSOptionsType = () => ({
  data: {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      // Wave A - Primary High
      {
        label: 'Wave A1',
        data: [69, 80, 78, 82, 64, 85, 78, 86],
        fill: true,
        borderColor: getColor('chart-gray'),
        backgroundColor: getColor('chart-gray-rgb', 0.2),
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 2,
      },
      // Wave A - Primary Low
      {
        label: 'Wave A2',
        data: [63, 52, 44, 52, 48, 42, 53, 46],
        fill: true,
        borderColor: getColor('chart-secondary'),
        backgroundColor: getColor('chart-secondary-rgb', 0.1),
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 1,
      },
      // Wave B - Secondary High
      {
        label: 'Wave B1',
        data: [52, 50, 43, 36, 42, 40, 53, 51],
        fill: true,
        borderColor: getColor('chart-primary'),
        backgroundColor: getColor('chart-primary-rgb', 0.2),
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 2,
      },
      // Wave B - Secondary Low
      {
        label: 'Wave B2',
        data: [26, 20, 32, 34, 25, 15, 35, 17],
        fill: true,
        borderColor: getColor('chart-beta'),
        backgroundColor: getColor('chart-beta-rgb', 0.1),
        tension: 0.5,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  },
  options: {
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { family: getDefaultFontFamily },
          color: getColor('secondary-color'),
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 8,
          boxHeight: 8,
          padding: 15,
        },
      },
      tooltip: {
        enabled: true,
        titleFont: { family: getDefaultFontFamily },
        bodyFont: { family: getDefaultFontFamily },
      },
    },
  },
})

export const getDiffDatasetAreaChart: () => ChartJSOptionsType = () => ({
  data: {
    labels: ['0', '1', '2', '3', '4', '5', '6', '7'],
    datasets: [
      {
        label: 'Current Month',
        data: [50, 42, 38, 35, 40, 50, 48, 47],
        fill: true,
        borderColor: getColor('chart-secondary'),
        backgroundColor: getColor('chart-secondary-rgb', 0.2),
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 1,
      },
      {
        label: 'Past Month',
        data: [60, 55, 50, 45, 50, 58, 55, 53],
        fill: true,
        borderColor: getColor('chart-gray'),
        backgroundColor: getColor('chart-gray-rgb', 0.2),
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 1,
      },
    ],
  },
  options: {
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          font: { family: getDefaultFontFamily },
          color: getColor('secondary-color'),
          usePointStyle: true, // Show circles instead of default box
          pointStyle: 'circle', // Circle shape
          boxWidth: 8, // Circle size
          boxHeight: 8, // (optional) same as width by default
          padding: 15, // Space between legend items
        },
      },
      tooltip: {
        enabled: true,
        titleFont: { family: getDefaultFontFamily },
        bodyFont: { family: getDefaultFontFamily },
      },
    },
  },
})

export const getBoundariesAreaChart: () => ChartJSOptionsType = () => ({
  data: {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Fully Rounded',
        data: [12.5, -19.4, 14.3, -15.0, 10.8, -10.5],
        borderColor: getColor('chart-primary'),
        fill: false,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
  },
})

export const getDrawTimeAreaChart: () => ChartJSOptionsType = () => ({
  data: {
    labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Fully Rounded',
        data: [10, 20, 15, 35, 38, 24],
        borderColor: getColor('chart-gray'),
        backgroundColor: getColor('chart-gray-rgb', 0.3),
        fill: true,
        borderWidth: 2,
      },
      {
        label: 'Small Radius',
        data: [24, 38, 35, 15, 20, 10],
        borderColor: getColor('chart-beta'),
        backgroundColor: getColor('chart-beta-rgb', 0.3),
        borderWidth: 2,
        tension: 0.2,
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
      },
    },
  },
})
