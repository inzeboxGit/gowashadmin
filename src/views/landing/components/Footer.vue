<template>
  <footer class="section-custom section-footer pb-2">
    <BContainer>
      <BRow class="g-4 justify-content-between">
        <BCol lg="3">
          <img src="/images/logo.png" alt="logo" height="24" />
          <p class="mt-3 fs-sm">UBold is a best-selling admin dashboard template on ThemeForest, recognized for its clean design, versatility, and robust features. Create modern, responsive web applications effortlessly with this top-tier solution!</p>

          <div class="d-flex gap-2 mt-4 mb-2">
            <RouterLink v-for="(link, i) in socialLinks" :key="i" :to="link.url" class="btn btn-sm btn-icon rounded-circle btn-dark" :title="link.title">
              <IconifyIcon :icon="link.icon" class="fs-sm" />
            </RouterLink>
          </div>
        </BCol>

        <BCol lg="8" xxl="7">
          <BRow class="g-4">
            <BCol cols="6" md="4" v-for="(section, i) in footerLinks" :key="i">
              <h5 class="text-white mb-4 ps-2">{{ section.title }}</h5>
              <ul class="nav flex-column">
                <li class="nav-item" v-for="(link, index) in section.links" :key="index">
                  <RouterLink class="nav-link" :class="{ 'pt-0': index === 0 }" :to="link.url">
                    {{ link.name }}
                    <span v-if="link.badge" class="ms-2" :class="`badge text-bg-${link.badge.variant}`">
                      {{ link.badge.title }}
                    </span>
                  </RouterLink>
                </li>
              </ul>
            </BCol>
          </BRow>
        </BCol>
      </BRow>

      <BRow class="mt-5">
        <BCol xs="12" class="text-center">
          <p class="mb-4">
            © {{ currentYear }} {{ META_DATA.name }} By
            <span class="fw-semibold">{{ META_DATA.author }}</span>
          </p>
        </BCol>
      </BRow>
    </BContainer>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCol } from 'bootstrap-vue-next'
import { META_DATA, currentYear } from '~/config/constants'

const socialLinks = [
  { title: 'Facebook', icon: 'lucide:facebook', url: '#' },
  { title: 'Twitter-x', icon: 'tabler:brand-x', url: '#' },
  { title: 'Instagram', icon: 'lucide:instagram', url: '#' },
  { title: 'WhatsApp', icon: 'lucide:dribbble', url: '#' },
]

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'Our Story', url: '#' },
      { name: 'Leadership Team', url: '#' },
      {
        name: 'Careers',
        url: '#',
        badge: { title: "We're Hiring", variant: 'warning' },
      },
      { name: 'Press & Media', url: '#' },
      { name: 'Investor Relations', url: '#' },
      { name: 'Sustainability', url: '#' },
    ],
  },
  {
    title: 'Community',
    links: [
      { name: 'Community Forum', url: '#' },
      { name: 'Events & Meetups', url: '#' },
      { name: 'Ambassadors', url: '#' },
      { name: 'Customer Stories', url: '#' },
      { name: 'Open Source', url: '#' },
      { name: 'Code of Conduct', url: '#' },
    ],
  },
  {
    title: 'Admin',
    links: [
      { name: 'Dashboard', url: '#' },
      { name: 'User Management', url: '#' },
      { name: 'Roles & Permissions', url: '#' },
      { name: 'System Logs', url: '#' },
      { name: 'Settings', url: '#' },
      { name: 'API Access', url: '#' },
    ],
  },
]
</script>
