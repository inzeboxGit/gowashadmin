export type ToolbarButtonType = {
  title: string
  icon: string
}

type ActionType = {
  icon: string
  label: string
}

export const actionButtonData: ActionType[] = [
  {
    icon: 'trash-2',
    label: 'Delete',
  },
  {
    icon: 'mail-open',
    label: 'Mark as Read',
  },
  {
    icon: 'archive',
    label: 'Archive',
  },
  {
    icon: 'folder',
    label: 'Move to Folder',
  },
]

export const replyToolbarButtonData: ToolbarButtonType[] = [
  { title: 'Bold', icon: 'bold' },
  { title: 'Italic', icon: 'italic' },
  { title: 'Attach files', icon: 'paperclip' },
  { title: 'Insert link', icon: 'link' },
  { title: 'Insert photo', icon: 'image-up' },
]
