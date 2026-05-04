<template>
  <BCard no-body>
    <BCardHeader>
      <h4 class="card-title">Chat</h4>
    </BCardHeader>

    <Simplebar class="card-body py-0 overflow-auto" style="height: 380px">
      <div v-for="(message, idx) in chatMessages" :key="idx" class="d-flex align-items-start gap-2 my-3 chat-item" :class="{ 'text-end justify-content-end': message.fromUser }">
        <img v-if="!message.fromUser" :src="message.image" class="avatar-md rounded-circle" alt="User" />
        <div>
          <div class="chat-message py-2 px-3 rounded" :class="message.fromUser ? 'bg-info-subtle' : 'bg-warning-subtle'">
            {{ message.message }}
          </div>
          <div class="text-muted fs-xs mt-1 d-inline-flex align-items-center gap-1"><IconifyIcon icon="tabler:clock" /> {{ message.time }}</div>
        </div>
        <img v-if="message.fromUser" :src="message.image" class="avatar-md rounded-circle" alt="User" />
      </div>
    </Simplebar>

    <BCardFooter class="bg-body-secondary border-top border-dashed border-bottom-0">
      <form class="d-flex gap-2" @submit="handleSend">
        <div class="app-search flex-grow-1">
          <input type="text" v-model="input" class="form-control bg-light-subtle border-light" placeholder="Enter message..." />
          <IconifyIcon icon="lucide:message-square" class="app-search-icon text-muted" />
        </div>
        <button type="submit" class="btn btn-primary btn-icon">
          <IconifyIcon icon="tabler:send-2" class="fs-xl" />
        </button>
      </form>
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardFooter, BCardHeader } from 'bootstrap-vue-next'
import Simplebar from 'simplebar-vue'
import { ref } from 'vue'
import { chatMessageData as initialMessages } from './data'
import user2 from '/images/users/user-2.jpg'
import user5 from '/images/users/user-5.jpg'

const chatMessages = ref([...initialMessages])
const input = ref('')

const handleSend = (e: Event) => {
  e.preventDefault()
  const text = input.value.trim()
  if (!text) return

  const now = new Date()
  const h = now.getHours()
  const m = now.getMinutes()
  const ampm = h >= 12 ? 'pm' : 'am'
  const hour = h % 12 || 12
  const min = m < 10 ? `0${m}` : m
  const timeStr = `${hour}:${min} ${ampm}`

  chatMessages.value.push({
    message: text,
    time: timeStr,
    fromUser: true,
    image: user2,
  })

  input.value = ''

  setTimeout(() => {
    chatMessages.value.push({
      message: text,
      time: timeStr,
      fromUser: false,
      image: user5,
    })
  }, 1000)
}
</script>
