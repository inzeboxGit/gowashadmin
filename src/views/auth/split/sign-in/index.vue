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
              <p class="text-muted text-center auth-sub-text mx-auto">
                <!-- en francais -->
                <!-- Connectez-vous. Entrez votre email et mot de passe pour continuer. -->
                Connectez-vous. Entrez votre email et mot de passe pour continuer.
              </p>
              <form class="mt-4">
                <div class="mb-3">
                  <label for="userEmail" class="form-label">
                    <!-- en francais -->
                    <!--  Email address -->
                    Email address
                    <span class="text-danger">*</span>
                  </label>
                  <div class="app-search">
                    <BFormInput type="email" placeholder="you@example.com" required />
                    <Icon icon="mail" class="app-search-icon text-muted" />
                  </div>
                </div>

                <div class="mb-3">
                  <label for="userPassword" class="form-label">
                    <!-- en francais -->
                    <!-- Password -->
                    Mot de passe
                    <span class="text-danger">*</span>
                  </label>
                  <div class="app-search">
                    <BFormInput type="password" placeholder="••••••••" required />
                    <Icon icon="lock-keyhole" class="app-search-icon text-muted" />
                  </div>
                </div>

                <div class="d-flex justify-content-between align-items-center mb-3">
                  <BFormCheckbox name="keep"> Keep me signed in </BFormCheckbox>

                  <RouterLink to="/auth/split/reset-pass" class="text-decoration-underline link-offset-3 text-muted">
                    Forgot Password? </RouterLink>
                </div>

                <div class="d-grid">
                  <BButton variant="primary" type="submit" class="fw-bold py-2">Sign In</BButton>
                </div>
              </form>
            </div>

            <p class="text-muted text-center mt-4 mb-0">
              New here?
              <RouterLink to="/auth/split/sign-up" class="text-decoration-underline link-offset-3 fw-semibold"> Create
                an account </RouterLink>
            </p>

            <p class="text-center text-muted mt-auto mb-0">
              © {{ currentYear }} {{ META_DATA.name }} — by
              <span class="fw-bold">{{ META_DATA.author }}</span>
            </p>
          </BCardBody>
        </BCard>
      </BCol>
      <BCol>
        <div class="h-100 position-relative card-side-img rounded-0 overflow-hidden"
          style="background-image: url(/images/auth.jpg)">
          <div class="p-4 card-img-overlay auth-overlay d-flex align-items-end justify-content-center" />
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCol, BRow } from 'bootstrap-vue-next'
import AuthLogo from '~/components/AuthLogo.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { currentYear, META_DATA } from '~/config/constants'

</script>
