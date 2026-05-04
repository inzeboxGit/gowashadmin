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

export type FolderType = {
  name: string
  size: number
}

export type SideBarItemType = {
  name: string
  icon: string
  badge?: {
    label: string
    className: string
  }
}

export const sidebarMenuItemData: SideBarItemType[] = [
  { name: 'My Files', icon: 'folder', badge: { label: '12', className: 'bg-danger-subtle text-danger' } },
  { name: 'Shared with Me', icon: 'share-2' },
  { name: 'Recent', icon: 'clock' },
  { name: 'Favourites', icon: 'star' },
  { name: 'Downloads', icon: 'download' },
  { name: 'Trash', icon: 'trash-2' },
]

export type CategoryType = {
  name: string
  icon: string
  iconClassName?: string
  badge?: {
    label: string
    className: string
  }
}

export const categoryData: CategoryType[] = [
  { name: 'Work', icon: 'chart-pie', iconClassName: 'text-primary' },
  { name: 'Projects', icon: 'chart-pie', iconClassName: 'text-secondary' },
  { name: 'Media', icon: 'chart-pie', iconClassName: 'text-info' },
  { name: 'Documents', icon: 'chart-pie', iconClassName: 'text-warning' },
]
export type FileRecordType = {
  id: string
  name: string
  icon: string
  size: number
  type: string
  modified: string
  image: string
  email: string
  sharedWith: {
    image: string
    email?: string
    name?: string
  }[]
  isFavorite: boolean
  starred?: boolean
}

export const fileRecordData: FileRecordType[] = [
  {
    id: '1',
    name: 'Project Overview Video',
    icon: 'video',
    size: 120000000,
    type: 'MP4',
    modified: 'April 2, 2025',
    image: user3,
    email: 'john@techgroup.com',
    sharedWith: [{ image: user5 }, { image: user7 }, { image: user6 }, { image: user4 }],
    isFavorite: false,
  },
  {
    id: '2',
    name: 'Team Meeting Video',
    icon: 'video',
    size: 200000000,
    type: 'MP4',
    modified: 'April 15, 2025',
    image: user4,
    email: 'michael@devteam.com',
    sharedWith: [{ image: user2 }, { image: user3 }, { image: user5 }],
    isFavorite: false,
  },
  {
    id: '3',
    name: 'Marketing Strategy Design',
    icon: 'figma',
    size: 150000000,
    type: 'Figma',
    modified: 'April 20, 2025',
    image: user2,
    email: 'susan@marketing.com',
    sharedWith: [{ image: user1 }, { image: user3 }, { image: user6 }, { image: user9 }],
    isFavorite: false,
  },
  {
    id: '4',
    name: 'Client Proposal PDF',
    icon: 'file-text',
    size: 45000000,
    type: 'PDF',
    modified: 'May 5, 2025',
    image: user8,
    email: 'mark@clientservices.com',
    sharedWith: [{ image: user2 }, { image: user4 }, { image: user7 }],
    isFavorite: false,
  },
  {
    id: '5',
    name: 'Database Schema',
    icon: 'database',
    size: 30000000,
    type: 'MySQL',
    modified: 'April 1, 2025',
    image: user2,
    email: 'alex@creatix.io',
    sharedWith: [{ image: user4 }, { image: user8 }],
    isFavorite: false,
  },
  {
    id: '6',
    name: 'Website Script',
    icon: 'code',
    size: 15000000,
    type: 'JS',
    modified: 'April 2, 2025',
    image: user3,
    email: 'john@techgroup.com',
    sharedWith: [{ image: user5 }, { image: user7 }, { image: user6 }, { image: user4 }],
    isFavorite: false,
  },
  {
    id: '7',
    name: 'Dependency Package',
    icon: 'package',
    size: 5000000,
    type: 'DEP',
    modified: 'April 15, 2025',
    image: user4,
    email: 'michael@devteam.com',
    sharedWith: [{ image: user2 }, { image: user3 }, { image: user5 }],
    isFavorite: false,
  },
  {
    id: '8',
    name: 'Internet Portal',
    icon: 'folder',
    size: 87000000,
    type: 'Folder',
    modified: 'March 10, 2025',
    image: user6,
    email: 'emma@devcore.com',
    sharedWith: [{ image: user7 }, { image: user9 }, { image: user10 }, { image: user3 }, { image: user8 }],
    isFavorite: false,
  },
  {
    id: '9',
    name: 'Podcast Episode 12',
    icon: 'music',
    size: 55000000,
    type: 'Audio',
    modified: 'March 10, 2025',
    image: user2,
    email: 'alex@creatix.io',
    sharedWith: [{ image: user4 }, { image: user8 }],
    isFavorite: false,
  },
]
