<template>
  <div class="topbar-item" id="notification-dropdown-people">
    
      <BDropdown placement="bottom-end" :variant="null" no-caret toggle-class="topbar-link" menu-class="dropdown-menu-lg p-0 my-0" offset="5">
        <template #button-content>
          <span class="topbar-link-icon">
            <Icon icon="bell" class="animate-ring" />
          </span>
          <BBadge v-if="notificationData.length" class="text-bg-danger badge-circle topbar-badge">{{ notificationData.length }}</BBadge>
        </template>

        <div class="px-3 py-2 border-bottom">
          <BRow class="align-items-center">
            <BCol>
              <h6 class="m-0 fs-md fw-semibold">Notifications</h6>
            </BCol>
            <BCol class="text-end">
              <button type="button" class="badge badge-soft-success badge-label py-1 border-0" @click="loadNotifications">
                {{ notificationData.length }} Notifications
              </button>
            </BCol>
          </BRow>
        </div>

        <simplebar style="max-height: 300px">
          <div v-if="loading" class="text-center text-muted py-4">Chargement...</div>
          <div v-else-if="error" class="text-danger px-3 py-3">{{ error }}</div>
          <div v-else-if="!notificationData.length" class="text-center text-muted py-4">Aucune notification</div>

          <BDropdownItem v-for="notification in notificationData" v-else :key="notification.id" class="notification-item py-2 text-wrap">
            <span class="d-flex align-items-center gap-3 text-wrap">
              <span class="flex-shrink-0 position-relative">
                <span class="avatar-md rounded-circle bg-light d-flex align-items-center justify-content-center">
                  <Icon :icon="notification.icon" class="fs-4" />
                </span>
                <span :class="['position-absolute rounded-pill  notification-badge', notification.badge.className]">
                  <Icon :icon="notification.badge.icon" class="align-middle" />
                  <span class="visually-hidden">upload notification</span>
                </span>
              </span>
              <span class="flex-grow-1 text-muted">
                <span class="fw-medium text-body">{{ notification.context }}</span>
                {{ notification.action }}
                <br />
                <span class="fs-xs">{{ notification.time }}</span>
              </span>
              <button type="button" class="flex-shrink-0 text-muted btn btn-link p-0 position-absolute end-0 me-2 d-none noti-close-btn">
                <Icon icon="x-square" class="fs-xxl" />
              </button>
            </span>
          </BDropdownItem>
        </simplebar>

        <button type="button" class="dropdown-item text-center text-reset text-decoration-underline link-offset-2 fw-bold notify-item border-top border-light py-2" @click="loadNotifications">Refresh Notifications</button>
      </BDropdown>
    
  </div>
</template>

<script setup lang="ts">
import simplebar from 'simplebar-vue'
import { onMounted, ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { getDashboardNotifications } from '~/services/notifications.service'
import type { DashboardNotification } from '~/types/notification'

const notificationData = ref<DashboardNotification[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const loadNotifications = async () => {
  try {
    loading.value = true
    error.value = null
    notificationData.value = await getDashboardNotifications()
  } catch (err) {
    console.error('[notifications] Failed to load notifications', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger les notifications.'
  } finally {
    loading.value = false
  }
}

onMounted(loadNotifications)
</script>
