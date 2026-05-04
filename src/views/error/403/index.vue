<template>
  <div class="auth-box overflow-hidden align-items-center d-flex">
    <BContainer>
      <BRow class="justify-content-center">
        <BCol xxl="4" md="6" sm="8">
          <BCard class="p-4" no-body>
            <div class="position-absolute top-0 end-0" style="width: 180px">
              <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
            </div>
            <div class="auth-brand text-center mb-2">
              <AuthLogo />
            </div>
            <div class="p-4 text-center">
              <div class="error-text-alt fs-72 text-danger">403</div>
              <h3 class="fw-bold text-uppercase">Access Denied</h3>
              <p class="text-muted fs-5">
                You don't have permission to access this page or perform the requested action.
                <br />
                This may be due to insufficient privileges or restricted access settings.
              </p>
              <div class="mt-4 d-flex justify-content-center gap-1">
                <RouterLink to="/" class="btn btn-primary">Go Home</RouterLink>
                <RouterLink to="/" class="btn btn-outline-secondary">Go Back</RouterLink>
              </div>
            </div>
          </BCard>
          <p class="text-center text-muted mt-4 mb-0">
            © {{ currentYear }} {{ META_DATA.name }} — by <span class="fw-semibold">{{ META_DATA.author }}</span>
          </p>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCol, BContainer, BRow } from 'bootstrap-vue-next'
import AuthLogo from '~/components/AuthLogo.vue'
import { META_DATA, currentYear } from '~/config/constants'

</script>
