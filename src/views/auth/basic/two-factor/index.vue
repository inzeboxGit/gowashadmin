<template>
  <div class="auth-box overflow-hidden align-items-center d-flex">
    <BContainer>
      <BRow class="justify-content-center">
        <BCol xxl="4" md="6" sm="8">
          <BCard no-body class="p-4">
            <div class="position-absolute top-0 end-0" style="width: 180px">
              <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
            </div>
            <div class="auth-brand text-center mb-3">
              <AuthLogo />
              <p class="text-muted w-lg-75 mt-3 mx-auto">We've emailed you a 6-digit verification code we sent to</p>
            </div>

            <div class="text-center mb-4">
              <div class="fw-bold fs-3">******6789</div>
            </div>

            <form>
              <label class="form-label">Enter your 6-digit code <span class="text-danger">*</span></label>

              <VOtpInput v-model:value="otp" :num-inputs="6" separator=" " input-type="tel" :is-input-num="true" :should-auto-focus="true" input-classes="form-control text-center" />

              <div class="d-grid mt-3">
                <BButton type="submit" variant="primary" class="fw-semibold py-2 w-100"> Confirm </BButton>
              </div>
            </form>

            <p class="mt-4 text-muted text-center mb-4">
              Don’t have a code?
              <RouterLink to="#" class="text-decoration-underline link-offset-2 fw-semibold">Resend</RouterLink>
              or
              <RouterLink to="#" class="text-decoration-underline link-offset-2 fw-semibold">Call Us</RouterLink>
            </p>
            <p class="text-muted text-center mb-0">
              Return to
              <RouterLink to="/auth/sign-in" class="text-decoration-underline link-offset-3 fw-semibold"> Sign in </RouterLink>
            </p>
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
import { BButton, BCard, BCol, BContainer, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import VOtpInput from 'vue3-otp-input'
import AuthLogo from '~/components/AuthLogo.vue'
import { currentYear, META_DATA } from '~/config/constants'

const otp = ref('')

</script>
