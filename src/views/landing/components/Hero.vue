<template>
  <section class="bg-light bg-opacity-50 border-top border-light position-relative" id="home">
    <BContainer class="pt-5 position-relative">
      <BRow>
        <BCol lg="8" class="mx-auto text-center">
          <h1 class="my-4 fs-36 fw-bold lh-base">
            Modern, Powerful & Flexible <span class="text-primary">Admin & Dashboard</span> Template –
            <span class="text-muted">Built for Serious Web Applications</span>
          </h1>
          <p class="mb-4 fs-md text-muted lh-lg">Build fast, modern, and scalable web apps with our best-selling Admin Dashboard Template. Engineered for performance, flexibility, and easy customization — ideal for startups, agencies, and enterprise teams.</p>
          <div class="d-flex gap-1 gap-sm-2 flex-wrap justify-content-center">
            <RouterLink class="btn btn-primary py-2 fw-semibold" to=""> <IconifyIcon icon="tabler:basket" class="fs-xl me-2"></IconifyIcon>Buy UBold Now! </RouterLink>
          </div>
        </BCol>
      </BRow>

      <BContainer class="position-relative">
        <BRow>
          <BCol md="10" class="mx-auto position-relative">
            <img src="/images/dashboard.png" class="rounded-top-4 mt-5" alt="saas-img" width="1055px" />
          </BCol>
        </BRow>
      </BContainer>
    </BContainer>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { Icon as IconifyIcon } from '@iconify/vue'
import { BCol, BContainer, BRow } from 'bootstrap-vue-next'
</script>
