import type { ChartData, ChartOptions } from 'chart.js'
import { getColor, getDefaultFontFamily } from '~/utils/helpers'

import product1 from '/images/products/1.png'
import product2 from '/images/products/2.png'
import product3 from '/images/products/3.png'
import product4 from '/images/products/4.png'
import product5 from '/images/products/5.png'
import product6 from '/images/products/6.png'
import product7 from '/images/products/7.png'
import product8 from '/images/products/8.png'
import product9 from '/images/products/9.png'

import user1 from '/images/users/user-1.jpg'
import user10 from '/images/users/user-10.jpg'
import user2 from '/images/users/user-2.jpg'
import user3 from '/images/users/user-3.jpg'
import user4 from '/images/users/user-4.jpg'
import user5 from '/images/users/user-5.jpg'
import user6 from '/images/users/user-6.jpg'
import user7 from '/images/users/user-7.jpg'
import user8 from '/images/users/user-8.jpg'
import user9 from '/images/users/user-9.jpg'

export type StatisticsWidgetType = {
  title: string
  value: number
  prefix?: string
  suffix?: string
  icon: string
  textClass: string
}

export const statistics: StatisticsWidgetType[] = [
  {
    title: 'Chiffre d’affaires.',
    value: 0,
    prefix: '€ ',
    icon: 'tabler:cash-banknote',
    textClass: 'bg-primary-subtle text-primary',
  },
  {
    title: 'Commandes',
    value: 0,
    icon: 'tabler:shopping-cart',
    textClass: 'bg-success-subtle text-success',
  },
  {
    title: 'Clients',
    value: 0,
    icon: 'tabler:users',
    textClass: 'bg-info-subtle text-info',
  },
  {
    title: 'Laveurs',
    value: 0,
    icon: 'tabler:spray',
    textClass: 'bg-warning-subtle text-warning',
  },
  {
    title: 'Produits',
    value: 0,
    icon: 'tabler:package',
    textClass: 'bg-warning-subtle text-warning',
  },
  {
    title: 'Catégories',
    value: 0,
    icon: 'tabler:category-2',
    textClass: 'bg-warning-subtle text-warning',
  },
  {
    title: 'Marques',
    value: 0,
    icon: 'tabler:tag',
    textClass: 'bg-secondary-subtle text-secondary',
  },
  {
    title: 'Paiements',
    value: 0,
    icon: 'tabler:credit-card-pay',
    textClass: 'bg-success-subtle text-success',
  },
]

// Sales Analytics

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Generate random data
const generateRandomData = (min: number, max: number) => Array.from({ length: 12 }, () => Math.floor(Math.random() * (max - min + 1)) + min)

const onlineSales = generateRandomData(1000, 1250)
const inStoreSales = generateRandomData(800, 1250)

// Make total sales independent (i.e. float higher, not sum)
const totalSales = generateRandomData(2500, 3500)

export const salesAnalyticsChartOptions = (): { data: ChartData; options: ChartOptions } => ({
  data: {
    labels: months,
    datasets: [
      {
        type: 'bar' as const,
        label: 'Online Sales',
        data: onlineSales,
        borderColor: getColor('chart-primary'),
        backgroundColor: getColor('chart-primary'),
        stack: 'sales',
        barThickness: 20,
        borderRadius: 6,
      },
      {
        type: 'bar' as const,
        label: 'In-store Sales',
        data: inStoreSales,
        borderColor: getColor('chart-gray'),
        backgroundColor: getColor('chart-gray'),
        stack: 'sales',
        barThickness: 20,
        borderRadius: 6,
      },
      {
        type: 'line' as const,
        label: 'Projected Sales',
        data: totalSales,
        borderColor: getColor('chart-alpha'),
        backgroundColor: getColor('chart-alpha-rgb', 0.2),
        borderWidth: 2,
        borderDash: [5, 5], // dashed line
        tension: 0.4,
        fill: false,
        yAxisID: 'y',
      },
    ],
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
        grid: { display: false },
      },
      y: {
        stacked: true,
        position: 'left',
        grid: {
          color: getColor('chart-border-color'),
          lineWidth: 1,
        },
      },
    },
  },
})

export type ProductType = {
  id: number
  image: string
  name: string
  category: string
  stock: number
  price: number
  ratings: number
  reviews: number
  status: 'active' | 'low-stock' | 'out-of-stock' | 'limited'
  href: string
  published: boolean
}

export const productData: ProductType[] = [
  {
    id: 1,
    image: product1,
    name: 'Wireless Earbuds',
    category: 'Audio',
    stock: 180,
    price: 59.9,
    ratings: 4,
    reviews: 52,
    status: 'active',
    href: '',
    published: true,
  },
  {
    id: 2,
    image: product2,
    name: 'Laptop Stand',
    category: 'Accessories',
    stock: 42,
    price: 29.0,
    ratings: 3,
    reviews: 11,
    status: 'low-stock',
    href: '',
    published: true,
  },
  {
    id: 3,
    image: product3,
    name: 'Drone Camera',
    category: 'Gadgets',
    stock: 0,
    price: 199.99,
    ratings: 4.5,
    reviews: 8,
    status: 'out-of-stock',
    href: '',
    published: true,
  },
  {
    id: 4,
    image: product4,
    name: 'Portable Projector',
    category: 'Electronics',
    stock: 32,
    price: 120,
    ratings: 3,
    reviews: 16,
    status: 'limited',
    href: '',
    published: false,
  },
  {
    id: 5,
    image: product5,
    name: 'Smartphone G12',
    category: 'Mobiles',
    stock: 85,
    price: 499.0,
    ratings: 4,
    reviews: 112,
    status: 'active',
    href: '',
    published: true,
  },
  {
    id: 6,
    image: product6,
    name: 'Noise Cancelling Headphones',
    category: 'Audio',
    stock: 25,
    price: 129.95,
    ratings: 4.5,
    reviews: 78,
    status: 'low-stock',
    href: '',
    published: true,
  },
  {
    id: 7,
    image: product7,
    name: 'Mini Air Purifier',
    category: 'Home Tech',
    stock: 0,
    price: 49.95,
    ratings: 4.5,
    reviews: 34,
    status: 'out-of-stock',
    href: '',
    published: true,
  },
  {
    id: 8,
    image: product8,
    name: 'USB-C Docking Station',
    category: 'Accessories',
    stock: 142,
    price: 89.0,
    ratings: 5,
    reviews: 64,
    status: 'active',
    href: '',
    published: true,
  },
  {
    id: 9,
    image: product9,
    name: 'Digital Photo Frame',
    category: 'Gadgets',
    stock: 58,
    price: 74.95,
    ratings: 4.5,
    reviews: 40,
    status: 'active',
    href: '',
    published: true,
  },
]

export type OrderType = {
  id: string
  user: {
    image: string
    name: string
  }
  product: string
  date: string
  amount: number
  status: 'delivered' | 'pending' | 'completed' | 'cancelled'
  href: string
}

export const orderData: OrderType[] = [
  {
    id: 'ORD-2001',
    user: {
      image: user1,
      name: 'Alice Cooper',
    },
    product: 'Noise Cancelling Headphones',
    date: '2025-05-01',
    amount: 199.99,
    status: 'delivered',
    href: '',
  },
  {
    id: 'ORD-2002',
    user: {
      image: user2,
      name: 'David Lee',
    },
    product: '4K Monitor',
    date: '2025-04-30',
    amount: 349.0,
    status: 'pending',
    href: '',
  },
  {
    id: 'ORD-2003',
    user: {
      image: user3,
      name: 'Sophia Turner',
    },
    product: 'Mechanical Keyboard',
    date: '2025-04-27',
    amount: 89.49,
    status: 'completed',
    href: '',
  },
  {
    id: 'ORD-2004',
    user: {
      image: user4,
      name: 'James Wilson',
    },
    product: 'Drone Camera',
    date: '2025-04-28',
    amount: 450.0,
    status: 'cancelled',
    href: '',
  },
  {
    id: 'ORD-2005',
    user: {
      image: user5,
      name: 'Ava Carter',
    },
    product: 'Wireless Earbuds',
    date: '2025-04-27',
    amount: 129.99,
    status: 'completed',
    href: '',
  },
  {
    id: 'ORD-2011',
    user: {
      image: user6,
      name: 'Ethan Brooks',
    },
    product: 'VR Headset',
    date: '2025-05-02',
    amount: 299.0,
    status: 'completed',
    href: '',
  },
  {
    id: 'ORD-2012',
    user: {
      image: user7,
      name: 'Mia Clarke',
    },
    product: 'Portable Charger',
    date: '2025-05-01',
    amount: 59.99,
    status: 'completed',
    href: '',
  },
  {
    id: 'ORD-2013',
    user: {
      image: user8,
      name: 'Lucas Perry',
    },
    product: 'Smartphone Gimbal',
    date: '2025-04-30',
    amount: 149.99,
    status: 'pending',
    href: '',
  },
  {
    id: 'ORD-2014',
    user: {
      image: user9,
      name: 'Chloe Adams',
    },
    product: 'LED Desk Lamp',
    date: '2025-04-29',
    amount: 45.0,
    status: 'delivered',
    href: '',
  },
  {
    id: 'ORD-2015',
    user: {
      image: user10,
      name: 'Benjamin Gray',
    },
    product: 'Noise Meter',
    date: '2025-04-28',
    amount: 75.49,
    status: 'delivered',
    href: '',
  },
]

export type ChartJSOptionsType = { data: ChartData; options: ChartOptions }

export const getMultiPieChart: () => ChartJSOptionsType = () => ({
  data: {
    labels: ['Online Store', 'Retail Stores', 'B2B Revenue', 'Marketplace Revenue'],
    datasets: [
      {
        label: '2024',
        data: [300, 150, 100, 80],
        backgroundColor: [getColor('chart-primary'), getColor('chart-secondary'), getColor('chart-alpha'), getColor('chart-gray')],
        borderColor: 'transparent',
        borderWidth: 1,
        weight: 1, // Outer ring
        cutout: '30%',
        radius: '90%',
      },
      {
        label: '2023',
        data: [270, 135, 90, 72],
        backgroundColor: [getColor('chart-primary-rgb', 0.3), getColor('chart-secondary-rgb', 0.3), getColor('chart-alpha-rgb', 0.3), getColor('chart-gray-rgb', 0.3)],
        borderColor: 'transparent',
        borderWidth: 3,
        weight: 0.8, // Inner ring
        cutout: '30%',
        radius: '60%', // smaller to create spacing
      },
    ],
  },
  options: {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          font: { family: getDefaultFontFamily() },
          color: getColor('secondary-color'),
          usePointStyle: true, // Show circles instead of default box
          pointStyle: 'circle', // Circle shape
          boxWidth: 8, // Circle size
          boxHeight: 8, // (optional) same as width by default
          padding: 15, // Space between legend items
        },
      },
      tooltip: {
        callbacks: {
          label: function (ctx) {
            return `${ctx.dataset.label} - ${ctx.label}: ${ctx.parsed}`
          },
        },
      },
    },
    scales: {
      x: { display: false },
      y: { display: false },
    },
  },
})
