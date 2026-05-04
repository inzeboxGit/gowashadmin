<template>
  <div class="auth-box overflow-hidden align-items-center d-flex">
    <BContainer>
      <BRow class="justify-content-center">
        <BCol xxl="4" md="6" sm="8">
          <BCard class="p-4" no-body>
            <div class="position-absolute top-0 end-0" style="width: 180px">
              <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
            </div>
            <div class="auth-brand text-center mb-4">
              <AuthLogo />
              <p class="text-muted w-lg-75 mt-3 mx-auto">Let’s get you started. Create your account by entering your details below.</p>
            </div>

            <BForm @submit.prevent="handleSubmit">
              <BAlert v-if="error" variant="danger" show>{{ error }}</BAlert>

              <div class="mb-3">
                <label for="userName" class="form-label"> Name <span class="text-danger">*</span> </label>
                <div class="input-group">
                  <BFormInput v-model="form.name" type="text" id="userName" placeholder="Damian D." required />
                </div>
              </div>

              <div class="mb-3">
                <label for="userEmail" class="form-label"> Email address <span class="text-danger">*</span> </label>
                <div class="input-group">
                  <BFormInput v-model="form.email" type="email" id="userEmail" placeholder="you@example.com" required />
                </div>
              </div>

              <div class="mb-3">
                <label for="userPassword" class="form-label"> Password <span class="text-danger">*</span> </label>
                <div class="input-group">
                  <BFormInput type="password" v-model="form.password" id="userPassword" placeholder="••••••••" required />
                </div>
                <PasswordStrengthBar :password="form.password" />
              </div>

              <div class="mb-3">
                <BFormCheckbox name="termAndPolicy"> Agree the Terms & Policy </BFormCheckbox>
              </div>

              <div class="d-grid">
                <BButton variant="primary" type="submit" class="fw-semibold py-2" :disabled="loading">Create Account </BButton>
              </div>
            </BForm>

            <p class="text-muted text-center mt-4 mb-0">
              Already have an account?
              <RouterLink to="/auth/sign-in" class="text-decoration-underline link-offset-3 fw-semibold"> Login </RouterLink>
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
import { BAlert, BButton, BCard, BCol, BContainer, BForm, BFormInput, BRow } from 'bootstrap-vue-next'
import { reactive } from 'vue'
import AuthLogo from '~/components/AuthLogo.vue'
import PasswordStrengthBar from '~/components/PasswordStrengthBar.vue'
import { currentYear, META_DATA } from '~/config/constants'
import { useAuth } from '~/composables/useAuth'

const { register, loading, error } = useAuth()

const form = reactive({
  name: '',
  email: '',
  password: '',
})

const handleSubmit = async () => {
  await register(form.name, form.email, form.password)
}

</script>
