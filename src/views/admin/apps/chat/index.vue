<template>
  <PageBreadcrumb title="Chat" subtitle="Apps" />

  <div class="outlook-box gap-1">
    <BOffcanvas teleport-disabled body-class="p-0 h-100" no-header v-model="show" responsive="lg" class="outlook-left-menu outlook-left-menu-lg">
      <ContactList :contacts="contactsData" :setContact="(contact) => (currentContact = contact)" />
    </BOffcanvas>

    <BCard no-body class="h-100 mb-0 rounded-start-0 flex-grow-1">
      <BCardHeader class="card-bg d-flex align-items-center gap-2">
        <div class="d-lg-none d-inline-flex gap-2">
          <button class="btn-icon btn btn-default" @click="show = !show">
            <Icon icon="menu-4" class="fs-lg" />
          </button>
        </div>

        <div class="flex-grow-1">
          <h5 class="mb-1 lh-base fs-lg">
            <RouterLink to="/apps/users/profile" class="link-reset">
              {{ currentContact.name }}
            </RouterLink>
          </h5>
          <p class="mb-0 lh-sm text-muted">
            <Icon icon="circle" class="me-1" :class="currentContact.isOnline ? 'text-success' : 'text-danger'" />
            {{ currentContact.isOnline ? 'Active' : 'Offline' }}
          </p>
        </div>

        <ChatToolbar />
      </BCardHeader>

      <simplebar ref="chatScroll" class="card-body pt-0 mb-5 pb-2" style="max-height: calc(100vh - 317px)">
        <template v-if="currentThread">
          <template v-for="message in currentThread.messages" :key="message.id">
            <div v-if="currentContact.id === message.senderId" class="d-flex align-items-start gap-2 my-3 chat-item">
              <img v-if="currentContact.image" :src="currentContact.image" width="36" height="36" class="avatar-md rounded-circle" alt="User" />
              <span v-else class="avatar-sm flex-shrink-0">
                <span class="avatar-title text-bg-primary fw-bold rounded-circle">
                  {{ currentContact.name.charAt(0).toUpperCase() }}
                </span>
              </span>

              <div>
                <div class="chat-message py-2 px-3 bg-warning-subtle rounded">
                  {{ message.text }}
                </div>
                <div class="text-muted d-inline-flex align-items-center gap-1 fs-xs mt-1"><Icon icon="clock" /> {{ message.time }}</div>
              </div>
            </div>

            <div v-else-if="currentUser.id === message.senderId" class="d-flex align-items-start gap-2 my-3 text-end chat-item justify-content-end">
              <div>
                <div class="chat-message py-2 px-3 bg-info-subtle rounded">
                  {{ message.text }}
                </div>
                <div class="text-muted d-inline-flex align-items-center gap-1 fs-xs mt-1"><Icon icon="clock" /> {{ message.time }}</div>
              </div>

              <img v-if="currentUser.image" :src="currentUser.image" width="36" height="36" class="avatar-md rounded-circle" alt="User" />
              <span v-else class="avatar-sm flex-shrink-0">
                <span class="avatar-title text-bg-primary fw-bold rounded-circle">
                  {{ currentUser.name.charAt(0).toUpperCase() }}
                </span>
              </span>
            </div>
          </template>
        </template>

        <div v-else class="d-flex align-items-center justify-content-center my-5">
          <Icon icon="message-square" size="18" class="text-muted me-1" />
          <span>No messages found.</span>
        </div>
      </simplebar>

      <BCardFooter class="bg-body-secondary border-top border-dashed border-bottom-0 position-absolute bottom-0 w-100">
        <div class="d-flex gap-2">
          <div class="app-search flex-grow-1 position-relative">
            <BFormInput v-model="messageText" type="text" class="py-2 bg-light-subtle border-light" placeholder="Enter message..." @keydown.enter="sendMessage" />
            <Icon icon="message-square" class="app-search-icon text-muted" />
          </div>

          <BButton variant="primary" @click="sendMessage">
            Send
            <Icon icon="send-horizontal" class="ms-1 fs-xl" />
          </BButton>
        </div>
      </BCardFooter>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref, watch } from 'vue'
import type { ChatThreadType, ContactType } from './components/data'
import { contactsData, currentUser, messageThreadsData } from './components/data'

import { RouterLink } from "vue-router"
import { BButton, BCardFooter, BFormInput } from 'bootstrap-vue-next'
import simplebar from 'simplebar-vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import ChatToolbar from './components/ChatToolbar.vue'
import ContactList from './components/ContactList.vue'

const show = ref(false)
const messageText = ref('')

const currentContact = ref<ContactType>(contactsData[0]!)
const currentThread = ref<ChatThreadType | null>(messageThreadsData[0]!)

const chatScroll = ref<any>(null)

const scrollToBottom = async () => {
  await nextTick()

  const el = chatScroll.value?.$el?.querySelector('.simplebar-content-wrapper') as HTMLElement | null

  if (el) {
    el.scrollTop = el.scrollHeight
  }
}

watch(currentContact, async (newContact) => {
  const foundThread = messageThreadsData.find((thread) => thread.participants.some((p) => p.id === newContact.id))
  currentThread.value = foundThread || null
  await scrollToBottom()
})

watch(
  () => currentThread.value?.messages.length,
  async () => {
    await scrollToBottom()
  }
)

onMounted(async () => {
  await scrollToBottom()
})

const sendMessage = async () => {
  if (!messageText.value.trim() || !currentThread.value) return

  const text = messageText.value

  currentThread.value.messages.push({
    id: crypto.randomUUID(),
    senderId: currentUser.id,
    text,
    time: new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    }),
  })

  messageText.value = ''
  await scrollToBottom()

  setTimeout(async () => {
    currentThread.value?.messages.push({
      id: crypto.randomUUID(),
      senderId: currentContact.value.id,
      text,
      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    })
    await scrollToBottom()
  }, 1000)
}
</script>
