<template>
  <div class="auth-box p-0 w-100">
    <BRow class="w-100 g-0">
      <BCol md="auto">
        <BCard no-body class="auth-box-form border-0 mb-0">
          <div class="position-absolute top-0 end-0" style="width: 180px">
            <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
          </div>
          <BCardBody class="min-vh-100 position-relative d-flex flex-column justify-content-center">
            <div class="auth-brand mb-0 text-center">
              <AuthLogo />
            </div>

            <div class="mt-auto">
              <p class="text-muted text-center auth-sub-text mx-auto">Create your account by entering the form below.</p>

              <BForm class="mt-4">
                <div class="mb-3">
                  <label for="userName" class="form-label">
                    Full Name
                    <span class="text-danger">*</span>
                  </label>
                  <div class="app-search">
                    <BFormInput type="text" :placeholder="META_DATA.username" required />
                    <Icon icon="circle-user-round" class="app-search-icon text-muted" />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="userEmail" class="form-label">
                    Email address
                    <span class="text-danger">*</span>
                  </label>
                  <div class="app-search">
                    <BFormInput type="email" placeholder="you@example.com" required />
                    <Icon icon="mail" class="app-search-icon text-muted" />
                  </div>
                </div>

                <div class="mb-3" data-password="bar">
                  <label for="userPassword" class="form-label">
                    Password
                    <span class="text-danger">*</span>
                  </label>
                  <div class="app-search">
                    <BFormInput v-model="password" type="password" placeholder="••••••••" required />
                    <Icon icon="lock-keyhole" class="app-search-icon text-muted" />
                  </div>
                  <PasswordStrengthBar :password="password" />
                </div>

                <div class="d-flex justify-content-between align-items-center mb-3">
                  <BFormCheckbox name="termAndPolicy"> Agree the Terms & Policy </BFormCheckbox>
                </div>

                <div class="d-grid">
                  <BButton variant="primary" type="submit" class="fw-semibold py-2"> Create Account </BButton>
                </div>
              </BForm>
            </div>

            <p class="text-muted text-center mt-4 mb-0">
              Already have an account?
              <RouterLink to="/auth/split/sign-in" class="text-decoration-underline link-offset-3 fw-semibold"> Login </RouterLink>
            </p>

            <p class="text-center text-muted mt-auto mb-0">
              © {{ currentYear }} {{ META_DATA.name }} - by
              <span class="fw-bold">{{ META_DATA.author }}</span>
            </p>
          </BCardBody>
        </BCard>
      </BCol>
      <BCol>
        <div class="h-100 position-relative card-side-img rounded-0 overflow-hidden" style="background-image: url(/images/auth.jpg)">
          <div class="p-4 card-img-overlay auth-overlay d-flex align-items-end justify-content-center" />
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BCard, BCol, BForm, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import AuthLogo from '~/components/AuthLogo.vue'
import PasswordStrengthBar from '~/components/PasswordStrengthBar.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { currentYear, META_DATA } from '~/config/constants'

const password = ref('')

</script>
