<template>
  <BCard no-body>
    <BCardBody class="text-center">
      <img :src="user.image" alt="avatar" class="rounded-circle" width="72" height="72" />

      <h5 class="mb-0 mt-2 d-flex align-items-center justify-content-center">
        <RouterLink to="/apps/users/profile" class="link-reset">{{ user.name }}</RouterLink>
        <img :src="flag" alt="flag" class="ms-1 rounded" height="16" />
      </h5>

      <span class="text-muted fs-xs">{{ role }}</span
      ><br />
      <BBadge :variant="badge.variant" class="my-1">{{ badge.label }}</BBadge
      ><br />
      <span class="text-muted">
        {{ user.username }} |
        <RouterLink to="" class="text-decoration-none text-danger">{{ website }}</RouterLink>
      </span>

      <div class="mt-3">
        <BButton variant="primary" size="sm" class="me-1">Message</BButton>
        <BButton variant="outline-secondary" size="sm">Follow</BButton>
      </div>

      <hr class="my-3 border-dashed" />

      <div class="d-flex justify-content-between text-center">
        <div>
          <h5 class="mb-0">{{ stats.posts }}</h5>
          <span class="text-muted">Posts</span>
        </div>
        <div>
          <h5 class="mb-0">{{ stats.followers }}</h5>
          <span class="text-muted">Followers</span>
        </div>
        <div>
          <h5 class="mb-0">{{ stats.followings }}</h5>
          <span class="text-muted">Followings</span>
        </div>
      </div>

      <hr class="mt-3 border-dashed" />

      <div class="text-end text-muted fs-xs"><Icon icon="refresh-ccw" class="me-1" /> Updated {{ updatedTime }}</div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BBadge, BButton, BCard, BCardBody } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import type { ContactType } from './data'
const props = defineProps<{
  contact: ContactType
}>()

const { flag, role, badge, updatedTime, stats, user, website } = props.contact
</script>
