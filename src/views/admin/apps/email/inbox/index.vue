<template>
  <PageBreadcrumb title="Email" subtitle="Apps" />

  <div class="outlook-box email-app gap-1">
    <BOffcanvas no-header body-class="p-0 h-100" v-model="show" placement="start" responsive="lg" class="outlook-left-menu outlook-left-menu-sm" tabindex="-1">
      <EmailSidebar />
    </BOffcanvas>

    <BCard no-body class="h-100 mb-0 rounded-start-0 flex-grow-1 border-start-0">
      <BCardHeader class="d-lg-none d-flex gap-2">
        <button class="btn btn-default btn-icon" type="button" aria-controls="emailSidebaroffcanvas" @click="toggleSidebar">
          <Icon icon="menu-2" class="fs-lg" />
        </button>

        <div class="app-search">
          <input type="text" class="form-control" placeholder="Search mails..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>
      </BCardHeader>

      <BCardHeader class="card-bg justify-content-between">
        <div class="d-flex flex-wrap align-items-center gap-1">
          <input class="form-check-input form-check-input-light fs-14 mt-0 me-3" type="checkbox" id="select-all-email" :checked="isAllSelected" @change="handleSelectAll" />

          <div v-for="({ label, icon }, idx) in actionData" :key="idx">
            <BTooltip :target="`action-btn-${idx}`" placement="top">{{ label }}</BTooltip>
            <button :id="`action-btn-${idx}`" type="button" class="btn btn-default btn-icon btn-sm">
              <Icon :icon="icon" class="fs-lg" />
            </button>
          </div>
        </div>

        <div class="app-search d-none d-lg-inline-flex">
          <input v-model="search" type="text" class="form-control" placeholder="Search mails..." />
          <Icon icon="search" class="app-search-icon text-muted" />
        </div>
      </BCardHeader>

      <simplebar class="card-body p-0" style="height: calc(100% - 100px)" data-simplebar data-simplebar-md>
        <div class="table-responsive">
          <table class="table table-hover table-select mb-0">
            <tbody>
              <tr v-if="filteredEmails.length === 0" class="no-results">
                <td colspan="5" class="text-center text-muted py-3">Nothing found.</td>
              </tr>
              <tr v-for="email in filteredEmails" :key="email.id" :class="['position-relative', { 'mark-as-read': email.isRead }]">
                <td class="ps-3" style="width: 1%">
                  <div class="d-flex gap-3">
                    <input class="form-check-input form-check-input-light fs-14 position-relative z-2 mt-0 email-item-check" type="checkbox" :checked="selected.includes(email.id)" @change="handleSelect(email.id)" />
                    <button class="btn p-0 fs-xl">
                      <Icon icon="star" v-if="email.isStarred" class="text-warning" />
                      <Icon icon="star" v-else class="text-muted" />
                    </button>
                  </div>
                </td>

                <td>
                  <div class="d-flex align-items-center gap-2">
                    <img v-if="email.image" :src="email.image" alt="user avatar" class="avatar-xs rounded-circle" />
                    <div v-else class="avatar-xs">
                      <span class="avatar-title rounded-circle" :class="email.variant">
                        {{ email.name.charAt(0) }}
                      </span>
                    </div>
                    <h5 class="fs-base mb-0 fw-medium">{{ email.name }}</h5>
                  </div>
                </td>

                <td>
                  <RouterLink :to="`/apps/email/details`" class="link-reset fs-base fw-medium stretched-link"> {{ email.subject }} </RouterLink>&nbsp; <span class="d-xl-inline-block d-none"> — </span>&nbsp;
                  <span class="fs-base text-muted d-xl-inline-block d-none mb-0">
                    {{ email.snippet }}
                  </span>
                </td>

                <td style="width: 1%">
                  <div class="d-flex align-items-center gap-1" :class="{ 'opacity-25': email.attachments === 0 }">
                    <Icon icon="paperclip" />
                    <span class="fw-semibold">{{ email.attachments }}</span>
                  </div>
                </td>

                <td>
                  <p class="fs-xs text-muted mb-0 text-end pe-2">{{ email.date }}, {{ email.time }}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="d-flex align-items-center justify-content-center gap-2 p-3">
          <strong>Loading...</strong>
          <div class="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></div>
        </div>
      </simplebar>
    </BCard>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardHeader, BOffcanvas } from 'bootstrap-vue-next'
import simplebar from 'simplebar-vue'
import { computed, ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import EmailSidebar from '../components/EmailSidebar.vue'
import { actionData, emailData, type EmailType } from './components/data'

const show = ref(false)

const toggleSidebar = () => {
  show.value = !show.value
}

const search = ref('')

const filteredEmails = computed(() => emailData.filter((e: EmailType) => e.name.toLowerCase().includes(search.value.toLowerCase()) || e.subject.toLowerCase().includes(search.value.toLowerCase()) || e.snippet.toLowerCase().includes(search.value.toLowerCase())))

const selected = ref<number[]>([])
const isAllSelected = computed(() => filteredEmails.value.length > 0 && selected.value.length === filteredEmails.value.length)

const handleSelectAll = () => {
  selected.value = isAllSelected.value ? [] : filteredEmails.value.map((e: EmailType) => e.id)
}

const handleSelect = (id: number) => {
  if (selected.value.includes(id)) {
    selected.value = selected.value.filter((x: number) => x !== id)
  } else {
    selected.value.push(id)
  }
}
</script>

<style lang="scss" scoped></style>
