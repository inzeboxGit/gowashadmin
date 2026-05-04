<template>
  <BCard no-body class="h-100 w-100 mb-0 border-end-0 rounded-end-0">
    <BCardHeader class="p-3 border-light card-bg d-block">
      <div class="d-flex gap-2">
        <div class="app-search flex-grow-1 position-relative">
          <BFormInput type="text" class="bg-light-subtle border-light" placeholder="Search here..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>

        <BButton variant="dark" class="btn-icon" @click="chatEditModal = !chatEditModal">
          <Icon icon="pencil" class="fs-xl" />
        </BButton>
      </div>
    </BCardHeader>

    <simplebar class="card-body p-2" style="height: calc(100% - 100px)" data-simplebar data-simplebar-md>
      <BListGroup flush class="chat-list">
        <BListGroupItem v-for="contact in props.contacts" :key="contact.id" action :class="['d-flex gap-2 justify-content-between', contact.id === currentContact.id ? 'active' : '']" @click="handleSelect(contact)">
          <span class="d-flex justify-content-start align-items-center gap-2 overflow-hidden">
            <span class="avatar avatar-sm flex-shrink-0">
              <img v-if="contact.image" :src="contact.image" alt="" height="36" width="36" class="img-fluid rounded-circle" />
              <span v-else class="avatar-title text-bg-primary fw-bold rounded-circle">
                {{ generateInitials(contact.name) }}
              </span>
            </span>

            <span class="overflow-hidden">
              <span class="text-nowrap fw-semibold fs-base mb-0 lh-base">
                {{ contact.name }}
              </span>
              <span v-if="contact.lastMessage" class="text-muted d-block fs-xs mb-0 text-truncate">
                {{ contact.lastMessage }}
              </span>
            </span>
          </span>

          <span class="d-flex flex-column gap-1 justify-content-center flex-shrink-0 align-items-end">
            <span v-if="contact.timestamp" class="text-muted fs-xs">
              {{ contact.timestamp }}
            </span>
            <span v-if="contact.unreadMessages" class="badge text-bg-primary fs-xxs">
              {{ contact.unreadMessages }}
            </span>
          </span>
        </BListGroupItem>
      </BListGroup>
    </simplebar>
  </BCard>

  <BModal class="fade" v-model="chatEditModal" title="Start New Chat" cancel-variant="light" tabindex="-1" ok-title="Send Message" cancel-title="Cancel">
    <form id="createSingleChatForm">
      <div class="mb-3">
        <label for="recipientUser" class="form-label">Recipient</label>
        <input type="text" class="form-control" id="recipientUser" placeholder="Enter username or email" required />
      </div>

      <div class="mb-0">
        <label for="initialMessage" class="form-label">Message</label>
        <textarea class="form-control" id="initialMessage" rows="3" placeholder="Type your message here..." required></textarea>
      </div>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import simplebar from 'simplebar-vue'
import { ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { generateInitials } from '~/utils/helpers'
import type { ContactType } from './data'

type PropsType = {
  contacts: ContactType[]
  setContact: (contact: ContactType) => void
}

const props = defineProps<PropsType>()

const chatEditModal = ref(false)

const currentContact = ref<ContactType>(
  props.contacts[0] || {
    id: 'u1',
    name: '',
    image: '',
    lastMessage: '',
    timestamp: '',
    unreadMessages: 0,
    isOnline: false,
  }
)

const handleSelect = (contact: ContactType) => {
  props.setContact(contact)
  currentContact.value = contact
}
</script>
