import user1 from '/images/users/user-1.jpg'
import user2 from '/images/users/user-2.jpg'
import user3 from '/images/users/user-3.jpg'
import user4 from '/images/users/user-4.jpg'
import user5 from '/images/users/user-5.jpg'
import user6 from '/images/users/user-6.jpg'
import user7 from '/images/users/user-7.jpg'
import user8 from '/images/users/user-8.jpg'
import user9 from '/images/users/user-9.jpg'

export type PipelineType = {
  user: {
    title: string
    name: string
    image: string
  }
  company: string
  date: string
  messages?: number
  tasks?: number
  amount: string
  status: 'lead' | 'negotiation' | 'won' | 'lost'
  className: string
}

export const pipelineData: PipelineType[] = [
  {
    user: {
      title: 'AI Analytics Dashboard',
      name: 'Mark Allen',
      image: user4,
    },
    company: 'Amazon Web Services',
    date: '30 May, 2025',
    messages: 2,
    tasks: 3,
    amount: '$95,000',
    status: 'lead',
    className: 'bg-warning',
  },
  {
    user: {
      title: 'Mobile App Redesign',
      name: 'Alex Carter',
      image: user2,
    },
    company: 'ByteCraft Studios',
    date: '12 Jun, 2025',
    messages: 1,
    tasks: 5,
    amount: '$72,000',
    status: 'lead',
    className: 'bg-warning',
  },

  {
    user: {
      title: 'Website Revamp',
      name: 'Emily Rose',
      image: user5,
    },
    company: 'NextGen UI.',
    date: '18 Jun, 2025',
    messages: 4,
    tasks: 2,
    amount: '$45,500',
    status: 'lead',
    className: 'bg-warning',
  },
  {
    user: {
      title: 'Campaign Strategy',
      name: 'Ryan King',
      image: user6,
    },
    company: 'Visionary Labs',
    date: '5 Jul, 2025',
    messages: 0,
    tasks: 1,
    amount: '$23,000',
    status: 'lead',
    className: 'bg-warning',
  },
  {
    user: {
      title: 'Product Demo Scheduling',
      name: 'Nina White',
      image: user8,
    },
    company: 'Innovexa',
    date: '15 Jul, 2025',
    messages: 3,
    tasks: 4,
    amount: '$18,750',
    status: 'negotiation',
    className: 'bg-info',
  },
  {
    user: {
      title: 'CRM Integration Task',
      name: 'Amit Rao',
      image: user9,
    },
    company: 'CoreSync Ltd.',
    date: '22 Jul, 2025',
    messages: 1,
    tasks: 2,
    amount: '$39,900',
    status: 'negotiation',
    className: 'bg-info',
  },
  {
    user: {
      title: 'Enterprise License Upgrade',
      name: 'Sophia Lee',
      image: user1,
    },
    company: 'Zentrix Corp',
    date: '01 Jul, 2025',
    amount: '$120,000',
    status: 'won',
    className: 'bg-success',
  },
  {
    user: {
      title: 'Custom CRM Implementation',
      name: 'Mark J.',
      image: user2,
    },
    company: 'DeltaSoft',
    date: '28 Jun, 2025',
    amount: '$89,500',
    status: 'won',
    className: 'bg-success',
  },
  {
    user: {
      title: 'API Subscription Expansion',
      name: 'Raj Patel',
      image: user3,
    },
    company: 'Netwise Solutions',
    date: '25 Jun, 2025',
    amount: '$58,000',
    status: 'won',
    className: 'bg-success',
  },
  {
    user: {
      title: 'Annual Cloud Retainer',
      name: 'Tina Ray',
      image: user5,
    },
    company: 'SkyVault Inc.',
    date: '21 Jun, 2025',
    amount: '$135,000',
    status: 'won',
    className: 'bg-success',
  },
  {
    user: {
      title: 'Marketing Automation Deal',
      name: 'Mohit Chauhan',
      image: user6,
    },
    company: 'CloudReach',
    date: '18 Jun, 2025',
    amount: '$62,500',
    status: 'won',
    className: 'bg-success',
  },
  {
    user: {
      title: 'E-commerce Platform Proposal',
      name: 'Julia Mason',
      image: user7,
    },
    company: 'QuickCart',
    date: '14 Jul, 2025',
    amount: '$55,000',
    status: 'lost',
    className: 'bg-danger',
  },
  {
    user: {
      title: 'Social Media Integration Deal',
      name: 'Ethan Cruz',
      image: user8,
    },
    company: 'BuzzPro Media',
    date: '10 Jul, 2025',
    amount: '$18,750',
    status: 'lost',
    className: 'bg-danger',
  },
]
