<template>
  <div class="auth-box overflow-hidden align-items-center d-flex">
    <BContainer>
      <BRow class="justify-content-center">
        <BCol xxl="4" md="6" sm="8">
          <BCard no-body class="p-4">
            <div class="position-absolute top-0 end-0" style="width: 180px">
              <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
            </div>
            <div class="auth-brand text-center mb-4">
              <AuthLogo />

              <p class="text-muted w-lg-75 mt-3 mx-auto">
                <!-- en francais -->
                <!-- Connectez-vous. Entrez votre email et mot de passe pour continuer. -->
                Connectez-vous. Entrez votre email et mot de passe pour continuer.
              </p>
            </div>

            <BForm @submit.prevent="handleSubmit">
              <BAlert v-if="error" variant="danger" show>{{ error }}</BAlert>

              <div class="mb-3">
                <label for="userEmail" class="form-label"> Adresse email <span class="text-danger">*</span> </label>
                <BFormInput id="userEmail" v-model="form.email" type="email" placeholder="you@example.com" required />
              </div>

              <div class="mb-3">
                <label for="userPassword" class="form-label"> Mot de passe <span class="text-danger">*</span> </label>
                <BFormInput id="userPassword" v-model="form.password" type="password" placeholder="••••••••" required />
              </div>

              <div class="d-flex justify-content-between align-items-center mb-3">
                <BFormCheckbox name="keepSignedIn">
                  <!-- en francais -->
                  <!-- Keep me signed in -->
                  Garder la connexion
                </BFormCheckbox>

                <RouterLink to="/auth/reset-pass" class="text-decoration-underline link-offset-3 text-muted">
                  <!-- en francais -->
                  <!-- Forgot Password? -->
                  Mot de passe oublié ?
                </RouterLink>
              </div>

              <div class="d-grid">
                <BButton type="submit" variant="primary" class="fw-semibold py-2" :disabled="loading"> Sign In
                </BButton>
              </div>
            </BForm>

            <p class="text-muted text-center mt-4 mb-0">
              <!-- en francais -->
              <!-- New here? -->
              Nouveau ici?
              <RouterLink to="/auth/sign-up" class="text-decoration-underline link-offset-3 fw-semibold">
                <!-- en francais -->
                <!-- Create an account -->
                Créer un compte
              </RouterLink>
            </p>
          </BCard>

          <p class="text-center text-muted mt-4 mb-0">
            © {{ currentYear }} {{ META_DATA.name }} — by
            <span class="fw-semibold">{{ META_DATA.author }}</span>
          </p>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BAlert, BButton, BCol, BContainer, BForm, BFormInput, BRow } from 'bootstrap-vue-next'
import { reactive } from 'vue'
import AuthLogo from '~/components/AuthLogo.vue'
import { useAuth } from '~/composables/useAuth'
import { currentYear, META_DATA } from '~/config/constants'
const { login, loading, error } = useAuth()

const form = reactive({
  email: '',
  password: '',
})

const handleSubmit = async () => {
  await login(form.email, form.password)
}

</script>
