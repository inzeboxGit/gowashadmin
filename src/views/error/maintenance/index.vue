<template>
  <div class="auth-box d-flex align-items-center">
    <BContainer fluid="xxl">
      <BRow class="align-items-center justify-content-center">
        <BCol xl="6">
          <BCard class="mb-0" no-body>
            <div class="position-absolute top-0 end-0" style="width: 280px">
              <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
            </div>
            <BCardBody>
              <div class="auth-brand text-center mb-0">
                <AuthLogo />
              </div>

              <div class="p-2 text-center">
                <div class="w-md-50 mx-auto">
                  <img src="/images/maintenance.svg" alt="Maintenance" class="img-fluid" />
                </div>

                <h3 class="fw-bold text-uppercase">Site Under Maintenance</h3>
                <p class="text-muted">
                  We’re currently performing scheduled maintenance.
                  <br />
                  Please check back soon.
                </p>

                <button class="btn btn-primary mt-3 me-1">Call Now</button>
                <button class="btn btn-info mt-3">Email Us</button>
              </div>

              <p class="text-center text-muted mt-5 mb-0">
                © {{ currentYear }} {{ META_DATA.name }} — by <span class="fw-semibold">{{ META_DATA.author }}</span>
              </p>
            </BCardBody>
          </BCard>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCol, BContainer, BRow } from 'bootstrap-vue-next'
import AuthLogo from '~/components/AuthLogo.vue'
import { currentYear, META_DATA } from '~/config/constants'

</script>
