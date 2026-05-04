<template>
  <simplebar class="card w-100 h-100 mb-0 rounded-end-0">
    <BCardBody class="w-100">
      <RouterLink to="/apps/email/compose" class="btn btn-danger fw-medium w-100"> Compose </RouterLink>

      <div class="list-group list-group-flush list-custom mt-3">
        <RouterLink v-for="({ badge, link, label, icon }, idx) in emailSidebarMenuData" :key="idx" :to="link" :class="clsx('list-group-item list-group-item-action', { active: idx === 0 })">
          <Icon :icon="icon" class="me-2 opacity-75 fs-lg align-middle" />
          <span class="align-middle">{{ label }}</span>
          <span v-if="badge" :class="['badge align-middle  fs-xxs  float-end', badge.className]">
            {{ badge.text }}
          </span>
        </RouterLink>

        <div class="list-group-item mt-2">
          <span class="align-middle">Labels</span>
        </div>

        <RouterLink v-for="({ name, iconClassName }, idx) in labels" :key="idx" to="" class="list-group-item list-group-item-action">
          <Icon icon="chart-pie" :class="['me-2 align-middle fs-sm', iconClassName]" />
          <span class="align-middle">{{ name }}</span>
        </RouterLink>
      </div>
    </BCardBody>
  </simplebar>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCardBody } from 'bootstrap-vue-next'
import clsx from 'clsx'
import simplebar from 'simplebar-vue'
import Icon from '~/components/wrappers/Icon.vue'
import { emailSidebarMenuData } from './data'

const labels: { name: string; iconClassName: string }[] = [
  { name: 'Business', iconClassName: 'text-primary' },
  { name: 'Personal', iconClassName: 'text-secondary' },
  { name: 'Friends', iconClassName: 'text-info' },
  { name: 'Family', iconClassName: 'text-warning' },
]
</script>

<style lang="scss" scoped></style>
