<template>
  <div id="megamenu-pages" class="topbar-item d-none d-md-flex">
    <BDropdown :variant="null" toggle-class="topbar-link btn fw-medium btn-link drop-arrow-none" menu-class="dropdown-menu-xxl p-0">
      <template #button-content>
        Pages
        <Icon icon="chevron-down" class="ms-1" />
      </template>

      <simplebar class="h-100" style="max-height: 380px">
        <BRow class="g-0">
          <BCol v-for="(item, idx) in megaMenuData" :key="idx" md="4">
            <div class="p-2">
              <h5 class="mb-1 fw-semibold fs-sm dropdown-header">{{ item.title }}</h5>
              <ul class="list-unstyled megamenu-list">
                <li v-for="link in item.links" :key="link.href">
                  <RouterLink :to="link.href" class="dropdown-item">
                    <Icon :icon="link.icon" class="align-middle me-2 fs-16" />
                    {{ link.label }}
                  </RouterLink>
                </li>
              </ul>
            </div>
          </BCol>
        </BRow>
      </simplebar>
    </BDropdown>
  </div>
</template>

<script setup lang="ts">
import simplebar from 'simplebar-vue'
import Icon from '~/components/wrappers/Icon.vue'

type MegaMenuType = {
  title: string
  links: {
    icon: string
    label: string
    href: string
  }[]
}

const megaMenuData: MegaMenuType[] = [
  {
    title: 'Dashboard & Analytics',
    links: [
      { icon: 'chart-line', label: 'Sales Dashboard', href: '#' },
      { icon: 'lightbulb', label: 'Marketing Dashboard', href: '#' },
      { icon: 'dollar-sign', label: 'Finance Overview', href: '#' },
      { icon: 'users', label: 'User Analytics', href: '#' },
      { icon: 'activity', label: 'Traffic Insights', href: '#' },
    ],
  },

  {
    title: 'Project Management',
    links: [
      { icon: 'kanban', label: 'Kanban Workflow', href: '#' },
      { icon: 'calendar-clock', label: 'Project Timeline', href: '#' },
      { icon: 'list-check', label: 'Task Management', href: '#' },
      { icon: 'users-round', label: 'Team Members', href: '#' },
      { icon: 'clipboard-type', label: 'Assignments', href: '#' },
    ],
  },

  {
    title: 'User Management',
    links: [
      { icon: 'circle-user-round', label: 'User Profiles', href: '#' },
      { icon: 'lock-keyhole', label: 'Access Control', href: '#' },
      { icon: 'settings', label: 'Security Settings', href: '#' },
      { icon: 'users', label: 'User Groups', href: '#' },
      { icon: 'key', label: 'Authentication', href: '#' },
    ],
  },
]
</script>
