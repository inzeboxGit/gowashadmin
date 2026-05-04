import type { ApexOptions } from 'apexcharts'
import { ref } from 'vue'
import { getColor } from '~/utils/helpers'

import user2 from '/images/users/user-2.jpg'
import user5 from '/images/users/user-5.jpg'

import auFlag from '/images/flags/au.svg'
import caFlag from '/images/flags/ca.svg'
import deFlag from '/images/flags/de.svg'
import frFlag from '/images/flags/fr.svg'
import gbFlag from '/images/flags/gb.svg'
import inFlag from '/images/flags/in.svg'
import jpFlag from '/images/flags/jp.svg'
import usFlag from '/images/flags/us.svg'

export type StatType = {
  title: string
  value: number
  icon: string
  bgClass: string
  progressLabel: string
  progress: number
  progressBgClass: string
}

export const statItem: StatType[] = [
  {
    title: 'Active Projects',
    value: 28,
    icon: 'tabler:clipboard-list',
    bgClass: 'bg-info-subtle text-info',
    progressLabel: 'PROGRESS',
    progress: 75,
    progressBgClass: 'bg-info',
  },
  {
    title: 'Tasks Completed',
    value: 124,
    icon: 'tabler:checklist',
    bgClass: 'bg-success-subtle text-success',
    progressLabel: 'TARGET',
    progress: 88,
    progressBgClass: 'bg-success',
  },
  {
    title: 'Pending Tasks',
    value: 16,
    icon: 'tabler:clock-hour-4',
    bgClass: 'bg-warning-subtle text-warning',
    progressLabel: 'DEADLINES',
    progress: 42,
    progressBgClass: 'bg-warning',
  },
  {
    title: 'Project Managers',
    value: 9,
    icon: 'tabler:user-cog',
    bgClass: 'bg-danger-subtle text-danger',
    progressLabel: 'ALLOCATED',
    progress: 100,
    progressBgClass: 'bg-danger',
  },
]

type ChatMessageType = {
  content: string
  time: string
  avatar: string
  sent: boolean
}

export const messagesData = ref<ChatMessageType[]>([
  {
    content: 'Hey! Are you available for a quick call? 📞',
    time: '08:55 am',
    avatar: user5,
    sent: false,
  },
  {
    content: 'Sure, give me 5 minutes. Just wrapping something up.',
    time: '08:57 am',
    avatar: user2,
    sent: true,
  },
  {
    content: "Perfect. Let me know when you're ready 👍",
    time: '08:58 am',
    avatar: user5,
    sent: false,
  },
  {
    content: 'Ready now. Calling you!',
    time: '09:00 am',
    avatar: user2,
    sent: true,
  },
  {
    content: 'Thanks for your time earlier!',
    time: '09:45 am',
    avatar: user5,
    sent: false,
  },
  {
    content: 'Of course! It was a productive discussion.',
    time: '09:46 am',
    avatar: user2,
    sent: true,
  },
  {
    content: 'I’ll send over the updated files by noon.',
    time: '09:50 am',
    avatar: user5,
    sent: false,
  },
])

export type TrafficType = {
  pageLink: string
  views: number
  unique: string
}

export const trafficData: TrafficType[] = [
  {
    pageLink: 'E-Commerce Redesign',
    views: 45 / 60,
    unique: '15 Aug 2025',
  },
  {
    pageLink: 'Mobile Banking App',
    views: 8.2,
    unique: '20 Sep 2025',
  },
  {
    pageLink: 'Corporate Website',
    views: 7.6,
    unique: '05 Aug 2025',
  },
  {
    pageLink: 'POS System Upgrade',
    views: 5.9,
    unique: '01 Oct 2025',
  },
  {
    pageLink: 'Inventory Management Tool',
    views: 5.2,
    unique: '12 Aug 2025',
  },
]

export type TopCountryType = {
  name: string
  image: string
  population: string
  visitors: string
  change: number
}

export const topCountryData: TopCountryType[] = [
  {
    name: 'India',
    image: inFlag,
    population: '8 Active Projects',
    visitors: 'E-Commerce Revamp',
    change: 3.2,
  },
  {
    name: 'Germany',
    image: deFlag,
    population: '5 Active Projects',
    visitors: 'POS Upgrade',
    change: 1.5,
  },
  {
    name: 'France',
    image: frFlag,
    population: '4 Active Projects',
    visitors: 'Mobile App',
    change: -0.8,
  },
  {
    name: 'United States',
    image: usFlag,
    population: '10 Active Projects',
    visitors: 'SaaS Dashboard',
    change: 2.1,
  },
  {
    name: 'United Kingdom',
    image: gbFlag,
    population: '3 Active Projects',
    visitors: 'CRM System',
    change: -1.2,
  },
  {
    name: 'Canada',
    image: caFlag,
    population: '4 Active Projects',
    visitors: 'Inventory Tool',
    change: 0.9,
  },
  {
    name: 'Japan',
    image: jpFlag,
    population: '6 Active Projects',
    visitors: 'Retail App',
    change: 0.0,
  },
  {
    name: 'Australia',
    image: auFlag,
    population: '2 Active Projects',
    visitors: 'HR Platform',
    change: 1.1,
  },
]

function generateRandomData(count: number, min: number, max: number) {
  return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

function generateSessionAndPageViewData(count: number) {
  const sessions = generateRandomData(count, 250, 450)
  const pageViews = sessions.map(
    (session) => Math.floor(session * (2 + Math.random() * 0.1)) // Page Views are 2x to 2.5x of Sessions
  )
  return { sessions, pageViews }
}

const { sessions, pageViews } = generateSessionAndPageViewData(19)

export const getProjectOverviewChart = (): ApexOptions => ({
  chart: {
    height: 330,
    type: 'area',
    toolbar: { show: false },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    width: 2,
    curve: 'smooth',
  },
  colors: [getColor('chart-primary'), getColor('secondary')],
  series: [
    {
      name: 'Sessions',
      data: sessions,
    },
    {
      name: 'Page Views',
      data: pageViews,
    },
  ],
  legend: {
    offsetY: 5,
  },
  xaxis: {
    categories: ['', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM', '8 PM', '9 PM', '10 PM', '11 PM', '12 AM', ''],
    axisBorder: { show: false },
    axisTicks: { show: false },
    tickAmount: 6,
    labels: {
      style: {
        fontSize: '12px',
      },
    },
  },
  tooltip: {
    shared: true,
    y: {
      formatter: function (val, { seriesIndex }) {
        if (seriesIndex === 0) {
          return val + ' Sessions'
        } else if (seriesIndex === 1) {
          return val + ' Page Views'
        }
        return String(val)
      },
    },
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      opacityFrom: 0.4,
      opacityTo: 0.2,
      stops: [15, 120, 100],
    },
  },
  grid: {
    borderColor: getColor('chart-border-color'),
    padding: {
      bottom: 0,
    },
  },
})

function generateData(baseval: number, count: number, yrange: { min: number; max: number }) {
  let i = 0
  const series = []
  while (i < count) {
    const x = Math.floor(Math.random() * (750 - 1 + 1)) + 1
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    const z = Math.floor(Math.random() * (75 - 15 + 1)) + 15

    series.push([x, y, z])
    baseval += 86400000
    i++
  }
  return series
}

export const getTaskProgressChart = (): ApexOptions => ({
  chart: {
    height: 330, // Increased height for spacing
    type: 'bubble',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: 'Bubble 1',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 10, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'Bubble 2',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 10, {
        min: 10,
        max: 60,
      }),
    },
    {
      name: 'Bubble 3',
      data: generateData(new Date('11 Feb 2017 GMT').getTime(), 10, {
        min: 10,
        max: 60,
      }),
    },
  ],
  fill: {
    opacity: 0.8,
    gradient: {
      // enabled: false
    },
  },
  colors: [getColor('chart-primary'), getColor('secondary'), getColor('danger')],
  xaxis: {
    tickAmount: 12,
    type: 'category',
  },
  yaxis: {
    max: 70,
  },
  grid: {
    borderColor: getColor('chart-border-color'),
    padding: {
      top: -20,
      right: 0,
      bottom: -5,
      left: 10,
    },
  },
  legend: {
    offsetY: 7,
  },
})
