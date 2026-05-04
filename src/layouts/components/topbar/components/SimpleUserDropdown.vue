<template>
  <div id="simple-user-dropdown" class="topbar-item nav-user">

    <BDropdown toggle-class="topbar-link" no-caret placement="bottom-end" offset="5">
      <template #button-content>
        <img :src="avatarUrl" width="32" class="rounded-circle me-lg-2 d-flex" alt="user-image" />
        <div class="d-lg-flex align-items-center gap-1 d-none">
          <h5 class="my-0">{{ displayName }}</h5>
          <Icon icon="chevron-down" class="align-middle" />
        </div>
      </template>
      <BDropdownHeader class="noti-title">
        <h6 class="text-overflow m-0">Welcome back!</h6>
      </BDropdownHeader>

      <template v-for="(item, idx) in userProfileMenuData" :key="idx">
        <button v-if="item.action === 'logout'" type="button" :class="['dropdown-item', item.className]"
          @click="logout">
          <Icon :icon="item.icon" class="me-1 fs-lg align-middle" />
          <span class="align-middle">{{ item.label }}</span>
        </button>

        <RouterLink v-else :to="item.href" :class="['dropdown-item', item.className]">
          <Icon :icon="item.icon" class="me-1 fs-lg align-middle" />
          <span class="align-middle">{{ item.label }}</span>
        </RouterLink>

        <BDropdownDivider v-if="item.isDivider" />
      </template>
    </BDropdown>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BDropdown } from 'bootstrap-vue-next'
import { computed } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useAuth } from '~/composables/useAuth'

type UserProfileMenuType = {
  icon: string
  label: string
  href: string
  action?: 'logout'
  className?: string
  isDivider?: boolean
}

const { logout, profile, user } = useAuth()

const displayName = computed(() => {
  return profile.value?.displayName || user.value?.displayName || user.value?.email || 'Utilisateur'
})

const avatarUrl = computed(() => {
  return profile.value?.photoURL || user.value?.photoURL || '/images/users/user-6.jpg'
})

const userProfileMenuData: UserProfileMenuType[] = [
  {
    icon: 'circle-user-round',
    label: 'Profile',
    href: '',
  },
  {
    icon: 'bell-ring',
    label: 'Notifications',
    href: '',
  },
  {
    icon: 'credit-card',
    label: 'Balance: $985.25',
    href: '',
  },
  {
    icon: 'bolt',
    label: 'Account Settings',
    href: '',
  },
  {
    icon: 'headset',
    label: 'Support Center',
    href: '',
    isDivider: true,
  },
  {
    icon: 'lock-keyhole',
    label: 'Lock Screen',
    href: '/auth/lock-screen',
  },
  {
    icon: 'log-out',
    label: 'Log Out',
    href: '',
    action: 'logout',
    className: 'fw-semibold text-danger',
  },
]
</script>
