<template>
  <div class="d-flex align-items-center gap-1">
    <button class="btn-icon btn btn-default" @click="videoCallModal = !videoCallModal">
      <Icon icon="video" class="fs-lg" />
    </button>

    <button class="btn btn-icon btn-default" @click="audioCallModal = !audioCallModal">
      <Icon icon="phone-call" class="fs-lg" />
    </button>

    <BDropdown end toggle-class="btn btn-default btn-icon drop-arrow-none">
      <template #button-content>
        <Icon icon="ellipsis-vertical" class="fs-lg" />
      </template>
      <BDropdownItem>
        <Icon icon="user" class="me-2" />
        View Profile
      </BDropdownItem>
      <BDropdownItem>
        <Icon icon="bell-off" class="me-2" />
        Mute Notifications
      </BDropdownItem>
      <BDropdownItem>
        <Icon icon="trash-2" class="me-2" />
        Delete Chat
      </BDropdownItem>
    </BDropdown>
  </div>

  <BModal centered no-footer header-class="border-0" content-class="bg-dark text-white" no-body size="xl" class="fade" v-model="videoCallModal" title="Starting Video Call" cancel-variant="light" tabindex="-1" ok-title="Send Message" cancel-title="Cancel" body-class="p-0">
    <span class="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div class="mb-4">
        <img src="/images/users/user-3.jpg" class="rounded-circle shadow" alt="User Photo" width="150" height="150" />
      </div>

      <h3 class="fw-semibold mb-1">Alex Johnson</h3>
      <p class="text-muted mb-4">Connecting to call...</p>

      <div class="d-flex gap-2">
        <BButton variant="light" type="button" class="d-flex align-items-center gap-2">
          <Icon icon="video" />
          Camera On
        </BButton>

        <BButton variant="light" type="button" class="d-flex align-items-center gap-2">
          <Icon icon="mic" />
          Mic On
        </BButton>

        <BButton variant="danger" type="button" class="d-flex align-items-center gap-2" @click="videoCallModal = !videoCallModal">
          <Icon icon="phone-call" />
          End Call
        </BButton>
      </div>
    </span>
    <div class="modal-footer border-0 justify-content-center">
      <span class="text-muted fst-italic">Make sure your devices are connected before starting the call</span>
    </div>
  </BModal>

  <BModal centered no-footer header-class="border-0" content-class="bg-dark text-white" no-body class="fade" v-model="audioCallModal" title="Starting Audio Call" cancel-variant="light" tabindex="-1" ok-title="Send Message" cancel-title="Cancel" side="md" body-class="p-0">
    <span class="d-flex flex-column align-items-center justify-content-center text-center py-5">
      <div class="mb-4">
        <img src="/images/users/user-3.jpg" class="rounded-circle shadow" alt="User Photo" width="120" height="120" />
      </div>

      <h4 class="fw-semibold mb-1">Alex Johnson</h4>
      <p class="text-muted mb-4">Calling...</p>

      <div class="d-flex gap-2">
        <BButton variant="light" type="button" class="d-flex align-items-center gap-2">
          <Icon icon="mic" />
          Mic On
        </BButton>

        <BButton variant="light" type="button" class="d-flex align-items-center gap-2">
          <Icon icon="volume-2" />
          Speaker On
        </BButton>

        <BButton variant="danger" type="button" class="d-flex align-items-center gap-2" @click="audioCallModal = !audioCallModal">
          <Icon icon="phone-call" />
          End Call
        </BButton>
      </div>
    </span>
    <div class="modal-footer border-0 justify-content-center">
      <span class="text-muted fst-italic">Ensure your microphone is working properly</span>
    </div>
  </BModal>
</template>

<script setup lang="ts">
import { BDropdown, BDropdownItem, BModal } from 'bootstrap-vue-next'
import { ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'

const videoCallModal = ref(false)
const audioCallModal = ref(false)
</script>
