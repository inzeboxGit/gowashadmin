import user1 from '/images/users/user-1.jpg'
import user2 from '/images/users/user-2.jpg'
import user3 from '/images/users/user-3.jpg'
import user4 from '/images/users/user-4.jpg'
import user5 from '/images/users/user-5.jpg'

export type TimelineItemType = {
  time?: string
  title: string
  description: string
  name: string
  className?: string
  icon?: string
  image?: string
}

export const basicTimelineData: TimelineItemType[] = [
  {
    time: 'Just Now',
    title: 'Weekly Stand-Up Meeting',
    description: 'Team members shared updates, discussed blockers, and aligned on weekly goals.',
    name: 'Olivia Rodriguez',
    className: 'bg-primary',
  },
  {
    time: '10:00 AM, Tuesday',
    title: 'Project Kickoff',
    description: 'Introduced project scope, goals, and assigned initial roles to team members.',
    name: 'Isabella Cooper',
    className: 'bg-danger',
  },
  {
    time: 'Yesterday, 3:15 PM',
    title: 'Design Review',
    description: 'Reviewed initial UI mockups and gathered feedback for the next design iteration.',
    name: 'Ethan Murphy',
    className: 'bg-warning',
  },
  {
    time: 'Monday, 1:00 PM',
    title: 'Client Feedback Session',
    description: 'Discussed client feedback and agreed on key changes for the next sprint.',
    name: 'Liam Chen',
    className: 'bg-info',
  },
  {
    time: 'Last Friday, 4:30 PM',
    title: 'Code Deployment',
    description: 'Successfully deployed the latest build to the staging environment.',
    name: 'Ava Thompson',
    className: 'bg-secondary',
  },
]

export const iconTimelineData: TimelineItemType[] = [
  {
    time: '5 mins ago',
    title: 'Bug Fix Deployed',
    description: 'Resolved a critical login issue affecting mobile users.',
    name: 'Marcus Bell',
    icon: 'bug',
    className: 'text-bg-primary',
  },
  {
    time: 'Today, 9:00 AM',
    title: 'Marketing Strategy Call',
    description: 'Outlined Q2 goals and content plan for the product launch campaign.',
    name: 'Emily Davis',
    icon: 'phone-call',
    className: 'bg-danger-subtle',
  },
  {
    time: 'Yesterday, 4:45 PM',
    title: 'Feature Planning Session',
    description: 'Prioritized new features for the upcoming release based on user feedback.',
    name: 'Daniel Kim',
    icon: 'copy',
    className: 'text-bg-warning',
  },
  {
    time: 'Tuesday, 11:30 AM',
    title: 'UI Enhancements Pushed',
    description: 'Improved dashboard responsiveness and added dark mode support.',
    name: 'Sofia Martinez',
    icon: 'layout-dashboard',
    className: 'bg-info-subtle',
  },
  {
    time: 'Last Thursday, 2:20 PM',
    title: 'Security Audit Completed',
    description: 'Reviewed backend API endpoints and applied new encryption standards.',
    name: 'Jonathan Lee',
    icon: 'shield-half',
    className: 'text-bg-secondary',
  },
]

export const borderTimelineData: TimelineItemType[] = [
  {
    time: '10 mins ago',
    icon: 'rocket',
    title: 'New Feature Released',
    description: 'Launched the real-time chat feature across all user accounts.',
    name: 'Natalie Brooks',
  },
  {
    time: 'Today, 11:15 AM',
    icon: 'calendar-check',
    title: 'Team Sync-Up',
    description: 'Reviewed sprint progress and discussed remaining tasks.',
    name: 'Oliver Grant',
  },
  {
    time: 'Yesterday, 2:40 PM',
    icon: 'palette',
    title: 'UI Design Review',
    description: 'Refined component spacing and color scheme for better accessibility.',
    name: 'Clara Jensen',
  },
  {
    time: 'Tuesday, 3:30 PM',
    icon: 'database',
    title: 'Database Optimization',
    description: 'Refactored queries to reduce API response times by 35%.',
    name: 'Leo Armstrong',
  },
  {
    time: 'Last Thursday, 5:00 PM',
    icon: 'lock-keyhole',
    title: 'Compliance Check Passed',
    description: 'Successfully passed GDPR compliance audit with zero violations.',
    name: 'Mia Thompson',
  },
]

export const userTimelineData: TimelineItemType[] = [
  {
    image: user1,
    title: 'Dashboard Revamp Completed',
    description: 'The new layout and theme for the analytics dashboard have been deployed.',
    name: 'Emma Carter',
  },
  {
    image: user2,
    title: 'Onboarding Guide Published',
    description: 'Uploaded the latest documentation to help new users get started quickly.',
    name: 'Noah Mitchell',
  },
  {
    image: user3,
    title: 'Performance Improvements',
    description: 'Reduced page load time by optimizing image assets and scripts.',
    name: 'Ava Morgan',
  },
  {
    image: user4,
    title: 'Security Patch Released',
    description: 'Patched a vulnerability related to token expiration in the API.',
    name: 'James Parker',
  },
  {
    image: user5,
    title: 'Client Training Session',
    description: 'Hosted a live training session with 30+ clients on the new reporting tools.',
    name: 'Sophia Bennett',
  },
]
