const user1 = '/images/users/user-1.jpg'
const user2 = '/images/users/user-2.jpg'
const user3 = '/images/users/user-3.jpg'
const user4 = '/images/users/user-4.jpg'
const user7 = '/images/users/user-7.jpg'
const user8 = '/images/users/user-8.jpg'
const user9 = '/images/users/user-9.jpg'

const blog4 = '/images/blog/blog-4.jpg'
const blog5 = '/images/blog/blog-5.jpg'
const blog3 = '/images/blog/blog-3.jpg'

export type UserType = {
  image: string
  name: string
}

export const userData: UserType[] = [
  {
    image: user7,
    name: 'Ava Lee',
  },
  {
    image: user8,
    name: 'Ethan King',
  },
  {
    image: user9,
    name: 'Lucas White',
  },
  {
    image: user1,
    name: 'Lucas White',
  },
  {
    image: user2,
    name: 'Lucas White',
  },
]

export type ServiceType = {
  icon: string
  title: string
  description: string
}

export const serviceData: ServiceType[] = [
  {
    icon: 'tabler:bulb',
    title: 'Strategic Consulting',
    description: 'We help businesses define clear digital goals and create custom strategies that align with long-term success. From planning to execution.',
  },
  {
    icon: 'tabler:chart-bar',
    title: 'SEO & Traffic Growth',
    description: 'Boost your search visibility and drive organic traffic with our comprehensive SEO services — including keyword strategy, technical audits, etc.',
  },
  {
    icon: 'tabler:speakerphone',
    title: 'Social Media Management',
    description: "Elevate your brand's presence with targeted content, community engagement, and performance analytics across platforms like Instagram, Facebook, etc.",
  },
  {
    icon: 'tabler:world',
    title: 'Custom Web Development',
    description: 'We build modern, scalable websites and applications tailored to your business needs — optimized for speed, mobile responsiveness.',
  },
  {
    icon: 'tabler:brush',
    title: 'Brand Identity & Design',
    description: 'From logos to full brand systems, we create memorable visual identities that express your values and connect with your target audience.',
  },
  {
    icon: 'tabler:report-analytics',
    title: 'Analytics & Insights',
    description: 'Turn data into decisions with real-time dashboards, performance reports, and analytics solutions that help you measure success.',
  },
]

export type PricingPlanType = {
  name: string
  price: number
  description: string
  title: string
  features: {
    title: string
    included: boolean
  }[]
  btnClass: string
  isPopular?: boolean
}

export const pricingData: PricingPlanType[] = [
  {
    name: 'Starter Plan',
    price: 9,
    description: 'Best for freelancers and personal use',
    title: '1 project included',
    features: [
      { title: '1 active project', included: true },
      { title: 'Access to all components', included: true },
      { title: 'Email support', included: true },
      { title: 'No team collaboration', included: false },
      { title: 'No SaaS rights', included: false },
    ],
    btnClass: 'btn-outline-primary',
  },
  {
    name: 'Professional',
    price: 29,
    description: 'Ideal for small teams and startups',
    title: 'Up to 5 projects',
    features: [
      { title: '5 active projects', included: true },
      { title: 'Component + plugin access', included: true },
      { title: 'Team collaboration', included: true },
      { title: 'Priority email support', included: true },
      { title: 'No resale rights', included: false },
    ],
    btnClass: 'btn-light',
    isPopular: true,
  },
  {
    name: 'Business',
    price: 79,
    description: 'For agencies and large teams',
    title: 'Unlimited projects',
    features: [
      { title: 'Unlimited projects', included: true },
      { title: 'SaaS & client projects allowed', included: true },
      { title: 'All premium components', included: true },
      { title: 'Priority support', included: true },
      { title: 'Team management tools', included: true },
    ],
    btnClass: 'btn-dark',
  },
]

export type TestimonialType = {
  image: string
  name: string
  title: string
  description: string
  rating: number
}

export const testimonialData: TestimonialType[] = [
  {
    image: user1,
    name: 'Emily Carter',
    title: 'Fantastic experience!',
    description: `"The admin dashboard is intuitive, fast, and packed with useful features. Highly recommend it!"`,
    rating: 5,
  },
  {
    image: user2,
    name: 'Michael Zhang',
    title: 'Excellent quality & support',
    description: `"The template’s quality is top-notch and the support team is quick to help. A truly seamless experience!"`,
    rating: 5,
  },
  {
    image: user3,
    name: 'Sara Lopez',
    title: 'Outstanding experience',
    description: `"Everything from setup to customization was smooth and easy. The support team went above and beyond!"`,
    rating: 5,
  },
]

export type BlogType = {
  status: string
  image: string
  name: string
  title: string
  description: string
  date: string
  comments: number
  views: number
  author: {
    name: string
    image: string
  }
}

export const blogData: BlogType[] = [
  {
    status: 'Technology',
    image: blog4,
    name: 'Tech Innovations',
    title: 'The Future of Artificial Intelligence',
    description: 'Discover how AI is transforming industries and what the future holds for this cutting-edge technology.',
    date: 'Jan 12, 2025',
    comments: 89,
    views: 1284,
    author: {
      name: 'Michael Turner',
      image: user4,
    },
  },
  {
    status: 'Data Science',
    image: blog5,
    name: 'Data Science Trends',
    title: 'Top Data Science Trends in 2025',
    description: 'Get ahead in the data science field with the latest trends, technologies, and tools that are reshaping the industry.',
    date: 'Jan 12, 2025',
    comments: 89,
    views: 1284,
    author: {
      name: 'Olivia Brown',
      image: user1,
    },
  },
  {
    status: 'Business',
    image: blog3,
    name: 'Entrepreneur Tips',
    title: '5 Key Tips for New Entrepreneurs',
    description: 'Start your entrepreneurial journey with these 5 essential tips that will guide you through the first year of business.',
    date: 'Jan 12, 2025',
    comments: 89,
    views: 1284,
    author: {
      name: 'David Clark',
      image: user7,
    },
  },
]

export type SocialType = {
  title: string
  icon: string
}

export const socialData: SocialType[] = [
  {
    title: 'Facebook',
    icon: 'lucide:facebook',
  },
  {
    title: 'Twitter-x',
    icon: 'tabler:brand-x',
  },
  {
    title: 'Instagram',
    icon: 'lucide:instagram',
  },
  {
    title: 'WhatsApp',
    icon: 'lucide:dribbble',
  },
]

export type FooterType = {
  title: string
  link: {
    title: string
    href: string
    badge?: {
      title: string
      variant: string
    }
  }[]
}

export const footerData: FooterType[] = [
  {
    title: 'Company',
    link: [
      { title: 'Our Story', href: '' },
      { title: 'Leadership Team', href: '' },
      {
        title: 'Careers',
        href: '',
        badge: { title: "We're Hiring", variant: 'warning' },
      },
      { title: 'Press & Media', href: '' },
      { title: 'Investor Relations', href: '' },
      { title: 'Sustainability', href: '' },
    ],
  },
  {
    title: 'Community',
    link: [
      { title: 'Community Forum', href: '' },
      { title: 'Events & Meetups', href: '' },
      { title: 'Ambassadors', href: '' },
      { title: 'Customer Stories', href: '' },
      { title: 'Open Source', href: '' },
      { title: 'Code of Conduct', href: '' },
    ],
  },
  {
    title: 'Admin',
    link: [
      { title: 'Dashboard', href: '' },
      { title: 'User Management', href: '' },
      { title: 'Roles & Permissions', href: '' },
      { title: 'System Logs', href: '' },
      { title: 'Settings', href: '' },
      { title: 'API Access', href: '' },
    ],
  },
]
