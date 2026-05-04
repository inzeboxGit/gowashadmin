import user1 from '/images/users/user-1.jpg'
import user10 from '/images/users/user-10.jpg'
import user2 from '/images/users/user-2.jpg'
import user3 from '/images/users/user-3.jpg'
import user4 from '/images/users/user-4.jpg'
import user5 from '/images/users/user-5.jpg'
import user7 from '/images/users/user-7.jpg'
import user8 from '/images/users/user-8.jpg'
import user9 from '/images/users/user-9.jpg'

export type CampaignType = {
  name: string
  creator: {
    name: string
    image: string
  }
  budget: string
  goal: string
  status: 'in-progress' | 'success' | 'scheduled' | 'failed' | 'ongoing'
  tags: string[]
  createdDate: string
  createdTime: string
}

export const campaignData: CampaignType[] = [
  {
    name: 'Q4 Lead Nurture Campaign',
    creator: { name: 'Jason Miller', image: user5 },
    budget: '$12,500',
    goal: '$80,000',
    status: 'in-progress',
    tags: ['Email', 'Retargeting', 'Automation'],
    createdDate: '21 Aug, 2025',
    createdTime: '2:45 PM',
  },
  {
    name: 'Holiday Flash Sale',
    creator: { name: 'Sandra Walton', image: user7 },
    budget: '$6,000',
    goal: '$30,000',
    status: 'success',
    tags: ['Seasonal', 'SMS'],
    createdDate: '05 Dec, 2024',
    createdTime: '11:00 AM',
  },
  {
    name: 'Product Launch Webinar',
    creator: { name: 'Derek Kim', image: user4 },
    budget: '$10,000',
    goal: '$65,000',
    status: 'scheduled',
    tags: ['Webinar', 'Leads'],
    createdDate: '01 Sep, 2025',
    createdTime: '9:15 AM',
  },
  {
    name: 'Back-to-School Promo',
    creator: { name: 'Ava Nguyen', image: user8 },
    budget: '$4,800',
    goal: '$25,000',
    status: 'failed',
    tags: ['Email', 'Discount'],
    createdDate: '15 Jul, 2025',
    createdTime: '4:30 PM',
  },
  {
    name: 'Spring Email Blast',
    creator: { name: 'Ryan Patel', image: user3 },
    budget: '$7,200',
    goal: '$40,000',
    status: 'success',
    tags: ['Newsletter', 'Organic'],
    createdDate: '18 Mar, 2025',
    createdTime: '1:00 PM',
  },
  {
    name: 'Customer Loyalty Program',
    creator: { name: 'Lily Chen', image: user2 },
    budget: '$9,500',
    goal: '$70,000',
    status: 'ongoing',
    tags: ['Rewards', 'Customer Retention'],
    createdDate: '28 Aug, 2025',
    createdTime: '10:00 AM',
  },
  {
    name: 'Referral Boost Campaign',
    creator: { name: 'Noah Brooks', image: user9 },
    budget: '$5,000',
    goal: '$20,000',
    status: 'success',
    tags: ['Referral', 'Growth'],
    createdDate: '04 Jun, 2025',
    createdTime: '9:00 AM',
  },
  {
    name: 'App Download Drive',
    creator: { name: 'Sophia Lee', image: user10 },
    budget: '$3,200',
    goal: '$15,000',
    status: 'in-progress',
    tags: ['Mobile', 'Ads'],
    createdDate: '12 Aug, 2025',
    createdTime: '3:15 PM',
  },
  {
    name: 'Abandoned Cart Recovery',
    creator: { name: 'Lucas Green', image: user1 },
    budget: '$2,000',
    goal: '$12,000',
    status: 'failed',
    tags: ['Email', 'Recovery'],
    createdDate: '29 Jul, 2025',
    createdTime: '5:50 PM',
  },
  {
    name: 'Local Awareness Campaign',
    creator: { name: 'Isabella Ray', image: user2 },
    budget: '$4,700',
    goal: '$28,000',
    status: 'scheduled',
    tags: ['Geo Targeting', 'Brand'],
    createdDate: '02 Sep, 2025',
    createdTime: '8:10 AM',
  },
  {
    name: 'Video Ad Campaign',
    creator: { name: 'Leo White', image: user3 },
    budget: '$9,900',
    goal: '$55,000',
    status: 'ongoing',
    tags: ['YouTube', 'Video'],
    createdDate: '14 Aug, 2025',
    createdTime: '12:00 PM',
  },
]

export type CampaignStatType = {
  value: number
  change: number
  description: string
  prefix?: string
  suffix?: string
}

export const campaignStatData: CampaignStatType[] = [
  {
    value: 11,
    change: 22.2,
    description: 'Total campaigns launched',
  },
  {
    value: 4,
    change: 36.3,
    description: 'Successful campaigns',
  },
  {
    value: 2,
    change: -18.1,
    description: 'Failed campaigns',
  },
  {
    value: 85000,
    change: 12.1,
    description: 'Highest campaign budget',
    prefix: '$',
  },
  {
    value: 5.7,
    change: 1.4,
    description: 'Avg. campaign duration',
    suffix: 'days',
  },
]
