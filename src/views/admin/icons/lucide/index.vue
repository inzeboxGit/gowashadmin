<template>
  <PageBreadcrumb title="Lucide" subtitle="Icons" />

  <BRow class="justify-content-center">
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader class="d-block">
          <BCardTitle as="h4" class="mb-1 d-flex align-items-center gap-2">
            <IconifyIcon icon="lucide:layout-dashboard" class="fs-xl" />
            Overview
          </BCardTitle>
          <p class="mb-0 text-muted">Lucide is an open-source library of clean, scalable SVG icons for web and app development, offering easy integration and customization.</p>
        </BCardHeader>

        <BCardBody>
          <h4 class="mt-0 fs-base mb-1">Usage</h4>

          <div class="d-flex align-items-center gap-2 mt-3">
            <IconifyIcon icon="lucide:camera" class="fs-3" />
            <IconifyIcon icon="lucide:heart" class="fs-3" />
            <IconifyIcon icon="lucide:star" class="fs-3" />
            <IconifyIcon icon="lucide:check" class="fs-3" />
            <IconifyIcon icon="lucide:bell" class="fs-3" />
            <IconifyIcon icon="lucide:cloud" class="fs-3" />
            <IconifyIcon icon="lucide:user" class="fs-3" />
          </div>
        </BCardBody>

        <BCardBody class="border-top border-dashed">
          <h4 class="mt-0 fs-base mb-1">Colors</h4>

          <div class="d-flex align-items-center gap-2 mt-3">
            <IconifyIcon icon="lucide:home" class="fs-3 text-primary" />
            <IconifyIcon icon="lucide:settings" class="fs-3 text-secondary" />
            <IconifyIcon icon="lucide:calendar" class="fs-3 text-success" />
            <IconifyIcon icon="lucide:message-circle" class="fs-3 text-info" />
            <IconifyIcon icon="lucide:flag" class="fs-3 text-warning" />
            <IconifyIcon icon="lucide:folder" class="fs-3 text-danger" />
            <IconifyIcon icon="lucide:globe" class="fs-3 text-light" />
            <IconifyIcon icon="lucide:key" class="fs-3 text-dark" />
            <IconifyIcon icon="lucide:layers" class="fs-3 text-purple" />
          </div>
        </BCardBody>

        <BCardBody class="border-top border-dashed">
          <h4 class="mt-0 fs-base mb-1">Fill Colors</h4>

          <div class="d-flex align-items-center gap-2 mt-3">
            <IconifyIcon icon="lucide:star" class="fs-3 text-primary fill-primary" />
            <IconifyIcon icon="lucide:user" class="fs-3 text-secondary fill-secondary" />
            <IconifyIcon icon="lucide:check-circle" class="fs-3 text-success fill-success" />
            <IconifyIcon icon="lucide:bell" class="fs-3 text-info fill-info" />
            <IconifyIcon icon="lucide:alert-triangle" class="fs-3 text-warning fill-warning" />
            <IconifyIcon icon="lucide:file-text" class="fs-3 text-danger fill-danger" />
            <IconifyIcon icon="lucide:airplay" class="fs-3 text-light fill-light" />
            <IconifyIcon icon="lucide:lock" class="fs-3 text-dark fill-dark" />
            <IconifyIcon icon="lucide:database" class="fs-3 text-purple fill-purple" />
          </div>
        </BCardBody>

        <BCardBody class="border-top border-dashed">
          <h4 class="mt-0 fs-base mb-1">Sizes</h4>

          <div class="d-flex align-items-center gap-2 mt-3">
            <IconifyIcon icon="lucide:phone" class="fs-1" />
            <IconifyIcon icon="lucide:badge-dollar-sign" class="fs-2" />
            <IconifyIcon icon="lucide:monitor" class="fs-3" />
            <IconifyIcon icon="lucide:tablet" class="fs-4" />
            <IconifyIcon icon="lucide:gamepad-2" class="fs-5" />
            <IconifyIcon icon="lucide:watch" class="fs-6" />
          </div>

          <div class="d-flex align-items-center gap-2 mt-3">
            <IconifyIcon icon="lucide:watch" />
            <IconifyIcon icon="lucide:watch" class="fs-sm" />
            <IconifyIcon icon="lucide:watch" class="fs-lg" />
            <IconifyIcon icon="lucide:watch" class="fs-xl" />
            <IconifyIcon icon="lucide:watch" class="fs-xxl" />
            <IconifyIcon icon="lucide:watch" class="fs-24" />
            <IconifyIcon icon="lucide:watch" class="fs-32" />
            <IconifyIcon icon="lucide:watch" class="fs-36" />
            <IconifyIcon icon="lucide:watch" class="fs-42" />
            <IconifyIcon icon="lucide:watch" class="fs-60" />
          </div>
        </BCardBody>

        <BCardBody class="border-top border-dashed">
          <h4 class="mt-0 mb-3">Icons</h4>

          <div class="d-flex flex-wrap align-items-center text-center gap-2">
            <div v-for="(item, idx) in lucideIconData" :key="idx" class="avatar-xxl">
              <span class="avatar-title flex-column gap-1 border border-dashed rounded-3 overflow-hidden text-truncate text-center p-1">
                <IconifyIcon :icon="`lucide:${item.iconName}`" class="fs-xxl" />
                <span class="fw-semibold d-block w-100 text-truncate">{{ item.name }}</span>
              </span>
            </div>
          </div>

          <div class="text-center mt-3">
            <RouterLink to="https://lucide.dev/icons/" target="_blank" class="btn btn-danger">View All Icons</RouterLink>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'

export type LucideIconType = {
  iconName: string
  name: string
}

const lucideIconData: LucideIconType[] = [
  { iconName: 'phone', name: 'Phone' },
  { iconName: 'badge-percent', name: 'Ad 2' },
  { iconName: 'headphones', name: 'Headphones' },
  { iconName: 'camera', name: 'Camera' },
  { iconName: 'watch', name: 'Watch' },
  { iconName: 'mic', name: 'Microphone' },
  { iconName: 'headset', name: 'Headset' },
  { iconName: 'tablet', name: 'Tablet' },
  { iconName: 'gamepad-2', name: 'Gamepad' },
  { iconName: 'printer', name: 'Printer' },
  { iconName: 'speaker', name: 'Speaker' },
  { iconName: 'database', name: 'Database' },
  { iconName: 'cloud', name: 'Cloud' },
  { iconName: 'wifi', name: 'Wi-Fi' },
  { iconName: 'bluetooth', name: 'Bluetooth' },
  { iconName: 'usb', name: 'USB' },
  { iconName: 'folder', name: 'Folder' },
  { iconName: 'lock', name: 'Lock' },
  { iconName: 'key', name: 'Key' },
  { iconName: 'shield', name: 'Shield' },
  { iconName: 'paperclip', name: 'Paperclip' },
  { iconName: 'bell', name: 'Bell' },
  { iconName: 'search', name: 'Search' },
  { iconName: 'briefcase', name: 'Briefcase' },
  { iconName: 'shopping-cart', name: 'Cart' },
  { iconName: 'file', name: 'File' },
  { iconName: 'book', name: 'Book' },
  { iconName: 'mail', name: 'Mail' },
  { iconName: 'user', name: 'User' },
  { iconName: 'user-circle', name: 'User Circle' },
  { iconName: 'phone', name: 'Phone Call' },
  { iconName: 'music', name: 'Music' },
  { iconName: 'film', name: 'Movie' },
  { iconName: 'upload', name: 'Upload' },
  { iconName: 'cloud-upload', name: 'Cloud Upload' },
  { iconName: 'share', name: 'Share' },
  { iconName: 'arrow-right', name: 'Arrow Right' },
  { iconName: 'arrow-left', name: 'Arrow Left' },
  { iconName: 'arrow-up', name: 'Arrow Up' },
  { iconName: 'arrow-down', name: 'Arrow Down' },
  { iconName: 'search', name: 'Search' },
  { iconName: 'refresh-ccw', name: 'Refresh' },
]
</script>
