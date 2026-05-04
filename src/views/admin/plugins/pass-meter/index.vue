<template>
  <PageBreadcrumb title="Password Meter" subtitle="Plugins" />

  <BRow class="justify-content-center">
    <BCol lg="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Progress Bar</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <BFormInput id="userPassword" class="mb-2" v-model="password" type="password" placeholder="••••••••" required />
          <PasswordStrengthBar :password="password" />
        </BCardBody>
      </BCard>
    </BCol>
    <BCol lg="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Password Condition</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div>
            <label class="form-label" for="password-input">Magic Password ✨ (Click Here)</label>
            <input type="password" class="form-control" placeholder="Enter password" id="password-input" v-model="magicPassword" @focus="showRules = true" @blur="onBlur" />

            <div class="form-text">Use 8 or more characters with a mix of letters, numbers &amp; symbols.</div>

            <BCollapse :show="showRules" class="password-box bg-light-subtle border border-light mt-2 rounded">
              <div class="p-3">
                <h5 class="fs-sm mb-2">Password Recipe:</h5>

                <p :class="{ valid: isLengthValid, invalid: !isLengthValid }" class="fs-xs mb-2">Minimum <b>8 characters</b></p>
                <p :class="{ valid: hasLowercase, invalid: !hasLowercase }" class="fs-xs mb-2">At least <b>lowercase</b> letter (a-z)</p>
                <p :class="{ valid: hasUppercase, invalid: !hasUppercase }" class="fs-xs mb-2">At least <b>uppercase</b> letter (A-Z)</p>
                <p :class="{ valid: hasNumber, invalid: !hasNumber }" class="fs-xs mb-0">At least <b>number</b> (0-9)</p>
              </div>
            </BCollapse>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import PasswordStrengthBar from '~/components/PasswordStrengthBar.vue'

const password = ref('')
const magicPassword = ref('')
const showRules = ref(false)

const isLengthValid = computed(() => magicPassword.value.length >= 8)
const hasLowercase = computed(() => /[a-z]/.test(magicPassword.value))
const hasUppercase = computed(() => /[A-Z]/.test(magicPassword.value))
const hasNumber = computed(() => /[0-9]/.test(magicPassword.value))

const onBlur = () => {
  if (magicPassword.value.length > 0) {
    showRules.value = true
  } else {
    showRules.value = false
  }
}
</script>

<style scoped></style>
