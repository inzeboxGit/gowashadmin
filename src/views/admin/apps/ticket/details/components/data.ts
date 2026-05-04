import { ref } from 'vue'
import user2 from '/images/users/user-2.jpg'
import user5 from '/images/users/user-5.jpg'

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
