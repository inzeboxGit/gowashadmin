<template>
  <BCard no-body class="card-top-sticky">
    <BCardBody>
      <div class="d-flex align-items-center mb-3">
        <div class="me-2 position-relative">
          <img :src="user3" alt="avatar" class="rounded" width="42" height="42" />
        </div>

        <div>
          <h5 class="mb-0 d-flex align-items-center">
            <RouterLink to="/apps/users/profile" class="link-reset">
              {{ META_DATA.username }}
            </RouterLink>
            <img :src="usFlag" alt="US" class="ms-2 rounded-circle" height="16" />
          </h5>
          <p class="text-muted mb-0">Content Creator</p>
        </div>

        <div class="ms-auto">
          <BDropdown placement="bottom-end" variant="link" toggle-class="btn btn-icon btn-ghost-light text-muted drop-arrow-none">
            <template #button-content>
              <Icon icon="ellipsis-vertical" class="fs-24" />
            </template>

            <BDropdownItem href="">View Profile</BDropdownItem>
            <BDropdownItem href="">Send Message</BDropdownItem>
            <BDropdownItem href="">Copy Profile Link</BDropdownItem>
            <BDropdownDivider />
            <BDropdownItem href="">Edit Profile</BDropdownItem>
            <BDropdownItem href="#" class="text-danger">Block User</BDropdownItem>
            <BDropdownItem href="#" class="text-danger">Report User</BDropdownItem>
          </BDropdown>
        </div>
      </div>

      <div class="list-group list-group-flush list-custom mt-3">
        <RouterLink v-for="(item, idx) in profileMainMenuData" :key="idx" :to="item.href" :class="['list-group-item', 'list-group-item-action', { active: idx === 0 }]">
          <Icon :icon="`${item.icon}`" class="me-1 opacity-75 fs-lg align-middle" />
          <span class="align-middle">{{ item.label }}</span>
          <span v-if="item.badge" :class="['badge align-middle fs-xxs float-end', item.badge.className]">
            {{ item.badge.label }}
          </span>
        </RouterLink>

        <div class="list-group-item mt-2">
          <span class="align-middle">Categories</span>
        </div>

        <RouterLink v-for="(category, idx) in categories" :key="idx" :to="category.href" class="list-group-item list-group-item-action">
          <Icon icon="tag" :class="['me-1 align-middle fs-lg', `text-${category.variant}`]" />
          <span class="align-middle">{{ category.label }}</span>
        </RouterLink>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BDropdown, BDropdownDivider, BDropdownItem } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import { META_DATA } from '~/config/constants'
import { profileMainMenuData } from './data'
import usFlag from '/images/flags/us.svg'
import user3 from '/images/users/user-3.jpg'

type CategoryType = {
  label: string
  href: string
  variant: string
}

const categories: CategoryType[] = [
  { label: 'Technology', href: '', variant: 'primary' },
  { label: 'Travel', href: '', variant: 'success' },
  { label: 'Lifestyle', href: '', variant: 'danger' },
  { label: 'Photography', href: '', variant: 'info' },
]
</script>
