<template>
  <section class="section-custom pb-5" id="services">
    <BContainer>
      <BRow>
        <BCol cols="12" class="text-center">
          <span class="text-muted rounded-3 d-inline-block">💼 Tailored Solutions for Every Need</span>
          <h2 class="mt-3 fw-bold mb-5">Explore Our Professional <span class="text-primary">Services</span> and Expertise</h2>
        </BCol>
      </BRow>

      <BRow class="text-center">
        <BCol v-for="(service, index) in serviceData" :key="index" xl="4" md="6">
          <BCard no-body class="border-0 shadow-none p-2 card-h-100">
            <BCardBody class="pb-0">
              <div class="avatar-xl mx-auto mb-3">
                <span class="avatar-title bg-secondary-subtle text-secondary rounded-circle fs-22">
                  <IconifyIcon :icon="service.icon" />
                </span>
              </div>
              <h4 class="mb-2">{{ service.title }}</h4>
              <p class="text-muted mb-3">{{ service.description }}</p>
            </BCardBody>
            <BCardFooter class="border-0 pt-0">
              <RouterLink to="#" class="link-primary fw-semibold">
                Know more
                <IconifyIcon icon="tabler:arrow-right" class="ms-1 align-middle" />
              </RouterLink>
            </BCardFooter>
          </BCard>
        </BCol>
      </BRow>
    </BContainer>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCard, BCardBody, BCardFooter, BCol, BContainer, BRow } from 'bootstrap-vue-next'
import { serviceData } from './data'
</script>
