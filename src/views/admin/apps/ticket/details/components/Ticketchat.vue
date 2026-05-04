<template>
  <BCard no-body>
    <BCardHeader>
      <h4 class="card-title">Chat</h4>
    </BCardHeader>
    <simplebar style="max-height: 380px" class="card-body py-0" id="chat-container">
      <div v-for="(msg, index) in messagesData" :key="index" :class="['d-flex align-items-start gap-2 my-3 chat-item', msg.sent ? 'justify-content-end text-end' : '']">
        <img v-if="!msg.sent" :src="msg.avatar" class="avatar-md rounded-circle" alt="User" />
        <div>
          <div class="chat-message py-2 px-3 rounded" :class="msg.sent ? 'bg-info-subtle' : 'bg-warning-subtle'">
            {{ msg.content }}
          </div>

          <div class="text-muted fs-xs mt-1"><Icon icon="clock" /> {{ msg.time }}</div>
        </div>
        <img v-if="msg.sent" :src="msg.avatar" class="avatar-md rounded-circle" alt="User" />
      </div>
    </simplebar>

    <BCardFooter class="bg-body-secondary border-top border-dashed border-bottom-0">
      <div class="d-flex gap-2">
        <div class="app-search flex-grow-1">
          <BFormInput v-model="newMessage" @keyup.enter="sendMessage" type="text" class="form-control bg-light-subtle border-light" placeholder="Enter message..." />
          <Icon icon="message-square" class="app-search-icon text-muted" />
        </div>
        <RouterLink to="" @click.prevent="sendMessage" class="btn btn-primary btn-icon">
          <Icon icon="send-horizontal" class="fs-xl" />
        </RouterLink>
      </div>
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import simplebar from 'simplebar-vue'
import { ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { messagesData } from './data'

const newMessage = ref('')

const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messagesData.value.push({
    content: newMessage.value,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }),
    avatar: '/images/users/user-2.jpg',
    sent: true,
  })

  newMessage.value = ''

  const container = document.getElementById('chat-container')
  if (container) container.scrollTop = container.scrollHeight
}
</script>
