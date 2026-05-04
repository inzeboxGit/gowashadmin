<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageBreadcrumb title="Contacts" subtitle="CRM GoWash" /> 
  <BRow>
    <BCol md="6" xxl="4" v-for="(item, idx) in contactData" :key="idx">
      <BCard no-body>
        <BCardBody class="d-flex align-items-start">
          <img v-if="item.user.image" :src="item.user.image" alt="avatar" class="rounded-circle me-3" width="64" height="64" />

          <div v-else class="avatar rounded-circle me-3 flex-shrink-0" style="height: 64px; width: 64px">
            <span class="avatar-title text-bg-secondary fw-semibold rounded-circle fs-22"> {{ generateInitials(item.user.name) }}</span>
          </div>

          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-center">
              <h5 class="mb-0">
                <RouterLink to="" class="link-reset">{{ item.user.name }}</RouterLink>
              </h5>
              <span class="badge badge-label" :class="`bg-${item.label.className}`">
                {{ item.label.text }}
              </span>
            </div>
            <p class="mb-3 text-muted fs-xs">{{ item.user.role }}</p>

            <div class="mb-2">
              <div class="d-flex align-items-center gap-2 mb-1">
                <div class="avatar-xs avatar-img-size fs-24">
                  <span class="avatar-title text-bg-light fs-sm rounded-circle">
                    <Icon icon="mail" />
                  </span>
                </div>
                <p class="fs-base mb-0 fw-medium">
                  <RouterLink to="" class="link-reset">{{ item.user.email }}</RouterLink>
                </p>
              </div>
              <div class="d-flex align-items-center gap-2">
                <div class="avatar-xs avatar-img-size fs-24">
                  <span class="avatar-title text-bg-light fs-sm rounded-circle">
                    <Icon icon="phone" />
                  </span>
                </div>
                <p class="fs-base mb-0 fw-medium">
                  <RouterLink to="" class="link-reset">{{ item.user.phone }}</RouterLink>
                </p>
              </div>
            </div>

            <div>
              <span v-for="(cat, index) in item.categories" :key="index" class="badge me-2" :class="cat.className">
                {{ cat.tag }}
              </span>
            </div>
          </div>
        </BCardBody>

        <BCardFooter class="bg-light-subtle d-flex justify-content-between text-center border-top border-dashed">
          <div v-for="(stat, index) in item.stats" :key="index">
            <h5 class="mb-0">{{ stat.prefix }}{{ stat.value }}{{ stat.suffix }}</h5>
            <span class="text-muted">{{ stat.title }}</span>
          </div>
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <ul class="pagination pagination-rounded pagination-boxed justify-content-center">
    <li class="page-item">
      <RouterLink class="page-link" to="" aria-label="Previous">
        <span aria-hidden="true">«</span>
      </RouterLink>
    </li>
    <li class="page-item active">
      <RouterLink class="page-link" to="">1</RouterLink>
    </li>
    <li class="page-item">
      <RouterLink class="page-link" to="">2</RouterLink>
    </li>
    <li class="page-item">
      <RouterLink class="page-link" to="">3</RouterLink>
    </li>
    <li class="page-item">
      <RouterLink class="page-link" to="">4</RouterLink>
    </li>
    <li class="page-item">
      <RouterLink class="page-link" to="">5</RouterLink>
    </li>
    <li class="page-item">
      <RouterLink class="page-link" to="" aria-label="Next">
        <span aria-hidden="true">»</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BCardFooter, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { generateInitials } from '~/utils/helpers'
import { contactData } from './components/data'
</script>
