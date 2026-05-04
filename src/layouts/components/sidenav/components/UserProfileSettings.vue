<template>
  <div class="sidenav-user" style="background: url(/images/user-bg-pattern.svg)">
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <RouterLink to="" class="link-reset">
          <img :src="avatarUrl" alt="user-image" class="rounded-circle mb-2 avatar-md" />
          <span class="sidenav-user-name fw-bold">{{ displayName }}</span>
          <span class="fs-12 fw-semibold text-capitalize">{{ role }}</span>
        </RouterLink>
      </div>


      <BDropdown :variant="null" no-caret placement="bottom-end"
        toggle-class="link-reset sidenav-user-set-icon border-0 p-0" offset="7">
        <template #button-content>
          <Icon icon="settings" class="fs-24 align-middle ms-1" />
        </template>

        <BDropdownHeader class="noti-title">
          <h6 class="text-overflow m-0">Welcome back!</h6>
        </BDropdownHeader>

        <RouterLink to="" class="dropdown-item">
          <Icon icon="circle-user-round" class="me-1 fs-lg align-middle" />
          <span class="align-middle">Profile</span>
        </RouterLink>

        <!-- <RouterLink to="" class="dropdown-item">
          <Icon icon="bolt" class="me-1 fs-lg align-middle" />
          <span class="align-middle">Account Settings</span>
        </RouterLink> -->

        <!-- <RouterLink to="/auth/lock-screen" class="dropdown-item">
          <Icon icon="lock-keyhole" class="me-1 fs-lg align-middle" />
          <span class="align-middle">Lock Screen</span>
        </RouterLink> -->

        <button type="button" class="dropdown-item text-danger fw-semibold" @click="logout">
          <Icon icon="log-out" class="me-1 fs-lg align-middle" />
          <span class="align-middle">Log Out</span>
        </button>
      </BDropdown>

    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useAuth } from '~/composables/useAuth'

const { logout, profile, user } = useAuth()

const displayName = computed(() => {
  return profile.value?.displayName || user.value?.displayName || user.value?.email || 'Utilisateur'
})

const avatarUrl = computed(() => {
  return profile.value?.photoURL || user.value?.photoURL || '/images/users/user-6.jpg'
})

const role = computed(() => profile.value?.role || '')
</script>
