<template>
  <BCard no-body>
    <BCardHeader>
      <div class="flex-grow-1">
        <BCardTitle as="h4">Input Type</BCardTitle>
      </div>
    </BCardHeader>
    <BCardBody>
      <BRow>
        <BCol lg="6">
          <BRow class="g-lg-4 g-2 mb-3">
            <BCol lg="4">
              <label for="example-email" class="col-form-label">Email</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-email" type="email" name="example-email" placeholder="Email" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2 mb-3">
            <BCol lg="4">
              <label for="password" class="col-form-label">Show/Hide Password</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup data-password>
                <BFormInput id="password" :type="showPassword ? 'text' : 'password'" placeholder="Enter your password" />
                <BInputGroupText class="password-eye" @click="togglePassword" style="cursor: pointer">
                  <Icon icon="eye" :class="showPassword ? 'd-block' : 'd-none'" data-pass="show" />
                  <Icon icon="eye-off" :class="showPassword ? 'd-none' : 'd-block'" data-pass="hide" />
                </BInputGroupText>
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2 mb-3">
            <BCol lg="4">
              <label for="example-time" class="col-form-label">Time</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-time" type="time" name="time" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2 mb-3">
            <BCol lg="4">
              <label for="example-number" class="col-form-label">Number</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-number" type="number" name="number" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="example-range" class="col-form-label">Range</label>
            </BCol>
            <BCol lg="8">
              <input type="range" id="example-range" class="form-range" min="0" max="100" v-model="range" />
            </BCol>
          </BRow>
        </BCol>

        <BCol lg="6">
          <BRow class="g-lg-4 g-2 mb-3">
            <BCol lg="4">
              <label for="example-password" class="col-form-label">Password</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-password" type="password" value="password" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2 mb-3">
            <BCol lg="4">
              <label for="example-month" class="col-form-label">Month</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-month" type="month" name="month" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2 mb-3">
            <BCol lg="4">
              <label for="example-week" class="col-form-label">Week</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-week" type="week" name="week" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2 mb-3">
            <BCol lg="4">
              <label for="example-color" class="col-form-label">Color</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-color" type="color" class="w-100" name="color" v-model="color" />
            </BCol>
          </BRow>
          <div class="border-top border-dashed my-3" />
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BFormInput, BInputGroup, BInputGroupText, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'

const color = ref('#3a6c8f')
const range = ref(50)
const showPassword = ref(false)

const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>
