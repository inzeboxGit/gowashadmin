<template>
  <BCard no-body>
    <BCardBody>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="mb-0">Activity</h5>
        <RouterLink to="#" class="link-reset fs-sm">See all</RouterLink>
      </div>

      <div class="mb-3">
        <small class="text-muted text-uppercase">Stories About You</small>
        <div class="d-flex align-items-center mt-2">
          <img src="/images/users/user-7.jpg" class="rounded-circle me-2" width="32" height="32" alt="mention" />
          <div>
            <strong>Mentions</strong><br />
            <span class="text-muted fs-xs">3 stories mention you</span>
          </div>
        </div>
      </div>

      <span class="text-muted fs-xs fw-bold text-uppercase">New</span>
      <ul class="list-unstyled mt-2 mb-0">
        <li v-for="(item, idx) in activityData" :key="idx" class="d-flex align-items-center py-1">
          <img :src="item.user.image" class="rounded-circle me-2" width="36" height="36" :alt="item.user.name" />
          <div class="flex-grow-1">
            <strong>{{ item.user.name }}</strong> {{ item.message }}<br />
            <span class="text-muted fs-xs">{{ item.time }}</span>
          </div>
          <div v-if="item.image">
            <img :src="item.image" class="rounded" width="32" height="32" alt="commented" />
          </div>
          <div v-else class="text-primary">
            <Icon icon="user-plus" class="fs-lg" />
          </div>
        </li>
      </ul>
    </BCardBody>
  </BCard>

  <BCard class="mt-3" no-body>
    <BCardHeader class="justify-content-between align-items-center border-dashed">
      <BCardTitle class="mb-0">Trending</BCardTitle>
      <BDropdown placement="bottom-end" toggle-class="bg-transparent border-0 text-muted drop-arrow-none card-drop p-0">
        <template #button-content>
          <Icon icon="ellipsis-vertical" class="fs-lg" />
        </template>
        <BDropdownItem href="#"><Icon icon="refresh-ccw" class="me-2" /> Refresh Feed</BDropdownItem>
        <BDropdownItem href="#"><Icon icon="settings" class="me-2" /> Manage Topics</BDropdownItem>
        <BDropdownItem href="#"><Icon icon="circle-alert" class="me-2" /> Report Issue</BDropdownItem>
      </BDropdown>
    </BCardHeader>

    <BCardBody>
      <div v-for="(item, idx) in trendingData" :key="idx" :class="['d-flex', { 'mb-3': idx !== trendingData.length - 1 }]">
        <span><Icon icon="trending-up" class="text-primary me-2 mt-1" /></span>
        <RouterLink :to="item.href || '#'" class="link-reset text-decoration-none">
          <strong>{{ item.title }}:</strong> {{ item.description }}
        </RouterLink>
      </div>
    </BCardBody>
  </BCard>

  <BCard class="mt-3" no-body>
    <BCardHeader class="justify-content-between align-items-center border-dashed">
      <BCardTitle class="mb-0">Requests</BCardTitle>
      <BDropdown placement="bottom-end" toggle-class="bg-transparent border-0 text-muted drop-arrow-none card-drop p-0">
        <template #button-content>
          <Icon icon="ellipsis-vertical" class="fs-lg" />
        </template>
        <BDropdownItem href="#"><Icon icon="check" class="me-2" /> Mark All as Read</BDropdownItem>
        <BDropdownItem href="#"><Icon icon="trash-2" class="me-2" /> Clear All</BDropdownItem>
      </BDropdown>
    </BCardHeader>

    <BCardBody>
      <div v-for="(item, idx) in requestData" :key="idx" :class="['d-flex justify-content-between align-items-center', { 'mb-3': idx !== requestData.length - 1 }]">
        <div class="d-flex align-items-start" :class="item.iconClassName ? 'gap-2' : ''">
          <template v-if="item.image">
            <img :src="item.image" alt="avatar" width="32" height="32" class="avatar-xs rounded-circle me-2" />
          </template>
          <template v-else>
            <div class="avatar-xs flex-shrink-0">
              <span v-if="item.icon" class="avatar-title rounded-circle" :class="item.iconClassName">
                <Icon :icon="item.icon" />
              </span>
            </div>
          </template>

          <div>
            <p class="mb-1">
              <strong>{{ item.title }}</strong> {{ item.description }}<span class="badge ms-1" :class="item.badge.className">{{ item.badge.label }}</span>
            </p>
            <small class="text-muted">{{ item.time }}</small>
          </div>
        </div>

        <button class="btn btn-sm py-0 px-1 btn-default">{{ item.action }}</button>
      </div>
    </BCardBody>
  </BCard>

  <BCard class="mt-3" no-body>
    <BCardHeader class="justify-content-between align-items-center border-dashed">
      <BCardTitle class="mb-0">Featured Video For You</BCardTitle>
      <BDropdown placement="bottom-end" toggle-class="bg-transparent border-0 text-muted drop-arrow-none card-drop p-0">
        <template #button-content>
          <Icon icon="ellipsis-vertical" class="fs-lg" />
        </template>
        <BDropdownItem href="#">Watch Later</BDropdownItem>
        <BDropdownItem href="#">Report Video</BDropdownItem>
      </BDropdown>
    </BCardHeader>
    <BCardBody>
      <div class="ratio ratio-16x9 rounded overflow-hidden">
        <iframe src="https://player.vimeo.com/video/357274789" allowfullscreen></iframe>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import Icon from '~/components/wrappers/Icon.vue'
import { activityData, requestData, trendingData } from './data'
</script>
