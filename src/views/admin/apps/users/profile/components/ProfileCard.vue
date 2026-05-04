<template>
  <BCard no-body class="card-top-sticky">
    <BCardBody>
      <div class="d-flex align-items-center mb-4">
        <div class="me-3 position-relative">
          <img src="/images/users/user-1.jpg" alt="avatar" class="rounded-circle" width="72" height="72" />
        </div>
        <div>
          <h5 class="mb-0 d-flex align-items-center">
            <RouterLink to="" class="link-reset">{{ META_DATA.username }}</RouterLink>
            <img src="/images/flags/us.svg" alt="US" class="ms-2 rounded-circle" height="16" />
          </h5>
          <p class="text-muted mb-2">Senior Developer</p>
          <span class="badge text-bg-light badge-label">Team Lead</span>
        </div>
        <div class="ms-auto">
          
            <BDropdown toggle-class="btn btn-icon drop-arrow-none btn-ghost-light text-muted" placement="bottom-end">
              <template #button-content>
                <Icon icon="ellipsis-vertical" class="fs-xl" />
              </template>
              <BDropdownItem href="#">Edit Profile</BDropdownItem>
              <BDropdownItem class="text-danger" href="#">Report</BDropdownItem>
            </BDropdown>
          
        </div>
      </div>

      <div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
            <Icon icon="briefcase" class="fs-xl" />
          </div>
          <p class="mb-0 fs-sm">UI/UX Designer & Full-Stack Developer</p>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
            <Icon icon="graduation-cap" class="fs-xl" />
          </div>
          <p class="mb-0 fs-sm">Studied at <span class="text-dark fw-semibold">Stanford University</span></p>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
            <Icon icon="map-pin" class="fs-xl" />
          </div>
          <p class="mb-0 fs-sm">Lives in <span class="text-dark fw-semibold">San Francisco, CA</span></p>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
            <Icon icon="users" class="fs-xl" />
          </div>
          <p class="mb-0 fs-sm">Followed by <span class="text-dark fw-semibold">25.3k People</span></p>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
            <Icon icon="mail" class="fs-xl" />
          </div>
          <p class="mb-0 fs-sm">
            Email
            <RouterLink to="mailto:hello@example.com" class="text-primary fw-semibold">hello@example.com</RouterLink>
          </p>
        </div>
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
            <Icon icon="link" class="fs-xl" />
          </div>
          <p class="mb-0 fs-sm">
            Website
            <RouterLink to="https://www.example.dev" class="text-primary fw-semibold">www.example.dev</RouterLink>
          </p>
        </div>
        <div class="d-flex align-items-center gap-2">
          <div class="avatar-sm text-bg-light bg-opacity-75 d-flex align-items-center justify-content-center rounded-circle">
            <Icon icon="earth" class="fs-xl" />
          </div>
          <p class="mb-0 fs-sm">Languages <span class="text-dark fw-semibold">English, Japanese</span></p>
        </div>

        <div class="d-flex justify-content-center gap-2 mt-4 mb-2">
          <BButton variant="primary" class="btn-icon rounded-circle" title="Facebook">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
            </svg>
          </BButton>
          <BButton variant="info" class="btn-icon rounded-circle" title="Twitter-x">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
              <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
            </svg>
          </BButton>
          <BButton variant="danger" class="btn-icon rounded-circle" title="Instagram">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
              <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              <path d="M16.5 7.5v.01" />
            </svg>
          </BButton>
          <BButton variant="success" class="btn-icon rounded-circle" title="Dribbble">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-dribbble">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
              <path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
              <path d="M6.4 19c3.5 -3.5 6 -6.5 14.5 -6.4" />
              <path d="M3.1 10.75c5 0 9.814 -.38 15.314 -5" />
            </svg>
          </BButton>
          <BButton variant="secondary" class="btn-icon rounded-circle" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M8 11v5" />
              <path d="M8 8v.01" />
              <path d="M12 16v-5" />
              <path d="M16 16v-3a2 2 0 1 0 -4 0" />
              <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
            </svg>
          </BButton>
          <BButton variant="danger" class="btn-icon rounded-circle" title="YouTube">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-youtube">
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" />
              <path d="M10 9l5 3l-5 3z" />
            </svg>
          </BButton>
        </div>
      </div>

      <h4 class="card-title mb-3 mt-4">Skills</h4>
      <div class="d-flex flex-wrap gap-1">
        <RouterLink v-for="(skill, idx) in skills" :key="idx" class="btn btn-light btn-sm" to="">
          {{ skill }}
        </RouterLink>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import Icon from '~/components/wrappers/Icon.vue'
import { META_DATA } from '~/config/constants'

const skills: string[] = ['Product Design', 'UI/UX', 'Tailwind CSS', 'Bootstrap', 'React.js', 'Next.js', 'Vue.js', 'Figma', 'Design Systems', 'Template Authoring', 'Responsive Design', 'Component Libraries']
</script>

<style scoped></style>
