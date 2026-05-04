<template>
  <BCard no-body>
    <div class="position-absolute top-0 end-0" style="width: 180px">
      <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
    </div>
    <BCardBody class="d-flex flex-column justify-content-between">
      <div class="d-flex mb-4">
        <div class="flex-shrink-0">
          <div class="avatar-xl rounded bg-primary-subtle d-flex align-items-center justify-content-center">
            <Icon :icon="member.icon" class="fs-24 text-primary" />
          </div>
        </div>

        <div class="ms-3">
          <h5 class="mb-1">{{ member.title }}</h5>
          <p class="text-muted mb-0 fs-base">{{ member.description }}</p>
        </div>

        <div class="ms-auto">
          <BDropdown placement="bottom-end" variant="link" toggle-class="text-muted px-0 py-0 fs-xl drop-arrow-none">
            <template #button-content>
              <Icon icon="ellipsis-vertical" />
            </template>
            <BDropdownItem> <Icon icon="eye" class="me-2" /> View </BDropdownItem>
            <BDropdownItem> <Icon icon="square-pen" class="me-2" /> Edit </BDropdownItem>
            <BDropdownItem> <Icon icon="trash-2" class="me-2 text-danger" /> Remove </BDropdownItem>
          </BDropdown>
        </div>
      </div>

      <ul class="list-unstyled mb-3">
        <li v-for="(feature, idx) in member.features" :key="idx" class="d-flex align-items-center" :class="{ 'mb-2': idx !== member.features.length - 1 }"><Icon icon="check" class="fs-lg text-success me-2" /> {{ feature }}</li>
      </ul>

      <p class="mb-2 text-muted">Total {{ member.users.length }} users</p>
      <div class="avatar-group avatar-group-sm mb-3">
        <div v-for="(user, idx) in member.users.slice(0, 4)" :key="idx" class="avatar">
          <img :src="user.image" class="rounded-circle avatar-sm" :alt="`user-${idx + 1}`" />
        </div>

        <BTooltip v-if="member.users.length > 4" :title="`${member.users.length - 4} More`" placement="top">
          <template #target>
            <div class="avatar avatar-sm">
              <span class="avatar-title text-bg-primary rounded-circle fw-bold"> +{{ member.users.length - 4 }} </span>
            </div>
          </template>
        </BTooltip>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <span class="text-muted fs-xs">
          <Icon icon="clock" class="me-1" />
          Updated {{ member.time }}
        </span>
        <RouterLink to="/apps/users/role-details" class="btn btn-sm btn-outline-primary rounded-pill"> Details </RouterLink>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BDropdown, BDropdownItem, BTooltip } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import type { MemberRoleType } from './data'

defineProps<{ member: MemberRoleType }>()
</script>

<style scoped></style>
