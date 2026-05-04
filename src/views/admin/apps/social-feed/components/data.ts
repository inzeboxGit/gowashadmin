import gallery2 from '/images/gallery/2.jpg'
import gallery3 from '/images/gallery/3.jpg'
import user10 from '/images/users/user-10.jpg'
import user3 from '/images/users/user-3.jpg'
import user5 from '/images/users/user-5.jpg'
import user6 from '/images/users/user-6.jpg'
import user8 from '/images/users/user-8.jpg'
import user9 from '/images/users/user-9.jpg'

export type TrendingType = {
  title: string
  description: string
  href: string
}

type ProfileMenuItemType = {
  label: string
  href: string
  icon: string
  badge?: { label: string; className: string }
}

export type ActivityType = {
  user: {
    image: string
    name: string
  }
  message: string
  time: string
  image?: string
}

export const activityData: ActivityType[] = [
  {
    user: {
      image: user8,
      name: 'jenny.w',
    },
    message: 'started following you',
    time: '2m ago',
  },
  {
    user: {
      image: user9,
      name: 'daniel92',
    },
    message: 'commented on your post',
    time: '3m ago',
    image: gallery2,
  },
  {
    user: {
      image: user10,
      name: 'amelie.design',
    },
    message: 'liked your story',
    time: '4m ago',
    image: gallery3,
  },
  {
    user: {
      image: user5,
      name: 'johnny_dev',
    },
    message: 'started following you',
    time: '6m ago',
  },
  {
    user: {
      image: user6,
      name: 'art.gal',
    },
    message: 'liked your post',
    time: '8m ago',
    image: gallery2,
  },
]

export type RequestType = {
  image?: string
  icon?: string
  iconClassName?: string
  title: string
  description: string
  badge: { label: string; className: string }
  time: string
  action: string
}

export const requestData: RequestType[] = [
  {
    image: user3,
    title: 'Emily Zhang',
    description: 'requested to collaborate on your design project.',
    badge: { label: 'New', className: 'bg-primary' },
    time: '2 minutes ago',
    action: 'Accept',
  },
  {
    icon: 'rocket',
    iconClassName: 'text-bg-info',
    title: 'New Feature:',
    description: 'Suggestion for dark mode support.',
    badge: { label: 'Pending', className: 'bg-warning text-dark' },
    time: '10 minutes ago',
    action: 'Review',
  },
  {
    image: user6,
    title: 'Client Feedback:',
    description: 'John Doe left a review on your dashboard.',
    badge: { label: 'Feedback', className: 'bg-secondary' },
    time: '30 minutes ago',
    action: 'Respond',
  },
  {
    icon: 'bug',
    iconClassName: 'text-bg-primary',
    title: 'Bug Report:',
    description: 'Login form issue on Safari mobile.',
    badge: { label: 'Urgent', className: 'bg-danger' },
    time: '1 hour ago',
    action: 'View',
  },
]

export const trendingData: TrendingType[] = [
  {
    title: 'Golden Globes:',
    description: 'The 27 Best moments from the Golden Globe Awards',
    href: '',
  },
  {
    title: 'World Cricket:',
    description: 'India has won ICC T20 World Cup Yesterday',
    href: '',
  },
  {
    title: 'Antarctica:',
    description: 'Melting of Totten Glacier could cause high risk to areas near by sea',
    href: '',
  },
  {
    title: 'Global Tournament:',
    description: 'America has won Football match Yesterday',
    href: '',
  },
]

export const profileMainMenuData: ProfileMenuItemType[] = [
  { label: 'News Feed', href: '', icon: 'house-wifi' },
  { label: 'Messages', href: '', icon: 'message-circle', badge: { label: '5', className: 'bg-danger-subtle text-danger' } },
  { label: 'Friends', href: '', icon: 'users' },
  { label: 'Notifications', href: '', icon: 'bell', badge: { label: '12', className: 'bg-warning-subtle text-warning' } },
  { label: 'Groups', href: '', icon: 'layout-grid' },
  { label: 'Pages', href: '', icon: 'book-open' },
  { label: 'Events', href: '', icon: 'calendar-check' },
  { label: 'Settings', href: '', icon: 'settings' },
]
