<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle as="h4">Modal Form</BCardTitle>
    </BCardHeader>
    <BCardBody class="text-center">
      <BButton variant="primary" @click="showModal = true">Form in simple modal box</BButton>

      <BModal v-model="showModal" no-header no-footer size="lg" hide-footer>
        <BRow class="g-4 align-items-center">
          <BCol sm="6" class="border-end border-dashed">
            <div class="p-4">
              <h4 class="mb-1 fw-bold text-uppercase">Sign in</h4>
              <p class="text-muted mb-4">Let’s get you signed in. Enter your email and password to continue.</p>

              <BForm>
                <BFormGroup label="Email address" label-for="modalEmail" class="mb-3">
                  <BFormInput id="modalEmail" type="email" placeholder="you@example.com" required />
                </BFormGroup>

                <BFormGroup label="Password" label-for="modalPassword" class="mb-3">
                  <BFormInput id="modalPassword" type="password" placeholder="••••••••" required />
                </BFormGroup>

                <div class="d-flex flex-wrap justify-content-between">
                  <BFormCheckbox id="rememberMeModal" class="fs-sm text-muted fw-semibold fst-italic"> Keep me signed in </BFormCheckbox>
                  <BButton type="submit" variant="primary" class="rounded-pill">
                    <strong>Log in</strong>
                  </BButton>
                </div>
              </BForm>
            </div>
          </BCol>

          <BCol sm="6" class="text-center">
            <div class="avatar avatar-xl mx-auto">
              <span class="avatar-title bg-purple-subtle text-purple rounded-circle fw-bold">
                <Icon icon="shield-user" class="text-purple fs-28 fill-purple" />
              </span>
            </div>
            <h4 class="mt-3">Don't Have an Account Yet?</h4>
            <p class="text-muted mb-3">Join us today and unlock access to personalized features, updates, and more!</p>
            <RouterLink to="/auth/sign-up" class="link-primary text-decoration-underline fw-semibold link-offset-3">Create Your Account</RouterLink>
          </BCol>
        </BRow>
      </BModal>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BCard, BCardBody, BCardHeader, BCardTitle, BCol, BForm, BFormCheckbox, BFormGroup, BFormInput, BModal, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'

const showModal = ref(false)
</script>

<style scoped></style>
