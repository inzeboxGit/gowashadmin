<template>
  <BCard no-body>
    <BCardHeader>
      <div class="flex-grow-1">
        <BCardTitle as="h4">Input Touchspin</BCardTitle>
      </div>
      <span class="badge badge-soft-success badge-label py-1 fs-xxs">Exclusive</span>
    </BCardHeader>

    <BCardBody>
      <BRow class="g-3">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Default Touchspin</h5>
        </BCol>
        <BCol lg="6">
          <TouchSpinInput v-model="value1" button-class-name="floating" input-class-name="border-0" size="sm" :max="800000" />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-3">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Sizes</h5>
        </BCol>
        <BCol lg="6">
          <TouchSpinInput v-model="value2" button-class-name="floating" input-class-name="border-0" class-name="input-group-sm" size="sm" />

          <TouchSpinInput v-model="value2" button-class-name="floating" input-class-name="border-0" class-name="input-group-lg mt-2" size="lg" />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-3">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Colors</h5>
        </BCol>
        <BCol lg="6">
          <TouchSpinInput v-for="(color, index) in colors" :key="color" v-model="colorValues[index]" button-class-name="floating" input-class-name="border-0" :variant="color" class="mt-2" />
          <TouchSpinInput v-model="value3" button-class-name="floating btn-soft-primary" input-class-name="border-0" class="mt-2" size="sm" :max="800000" />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-3">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Readonly</h5>
        </BCol>
        <BCol lg="6">
          <TouchSpinInput v-model="readonlyValue" input-class-name="border-0" read-only />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-3">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Disabled</h5>
        </BCol>
        <BCol lg="6">
          <TouchSpinInput v-model="disabledValue" input-class-name="border-0" disabled />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-3">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Style</h5>
        </BCol>
        <BCol lg="6">
          <TouchSpinInput v-model="value4" variant="primary" button-class-name="rounded-circle floating" input-class-name="border-0" class="mt-2" size="sm" :max="800000" />
          <TouchSpinInput v-model="value5" variant="primary" button-class-name="rounded-circle floating" input-class-name="border-0" class="mt-2" size="sm" :max="800000" />
          <TouchSpinInput v-model="value6" variant="outline-secondary" input-class-name="border-secondary" class="mt-2 border-0" size="sm" :max="800000" />
          <TouchSpinInput v-model="value7" variant="soft-success" input-class-name="border-success-subtle" class="mt-2 border-0" size="sm" :max="800000" />
        </BCol>
      </BRow>
      <div class="my-4 border-top border-dashed" />

      <BRow class="g-3">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Vertical Style</h5>
        </BCol>
        <BCol lg="6">
          <TouchSpinInput v-model="value8" :min="0" :max="10" vertical class="input-group-sm" input-class-name="border-0" button-class-name="btn-soft-success" button-class-name2="btn-soft-danger" />

          <TouchSpinInput v-model="value9" vertical class="mt-2" input-class-name="border-0" button-class-name="btn-success" button-class-name2="btn-danger" />

          <TouchSpinInput v-model="value10" vertical class="mt-2" input-class-name="border-0" button-class-name="btn-dark" button-class-name2="btn-dark" />
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader } from 'bootstrap-vue-next'
import { ref } from 'vue'
import TouchSpinInput from '~/components/TouchSpinInput.vue'

const colors = ['primary', 'secondary', 'info', 'success', 'warning', 'danger', 'dark']
const colorValues = ref(colors.map(() => 100))

const value1 = ref(1)
const value2 = ref(0)
const value3 = ref(100)
const value4 = ref(100)
const value5 = ref(100)
const value6 = ref(2)
const value7 = ref(2)
const value8 = ref(1)
const value9 = ref(1)
const value10 = ref(1)
const readonlyValue = ref(1)
const disabledValue = ref(1)
</script>
