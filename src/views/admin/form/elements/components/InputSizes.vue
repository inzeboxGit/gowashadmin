<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle as="h4">Input Sizes</BCardTitle>
    </BCardHeader>
    <BCardBody>
      <BRow>
        <BCol lg="6">
          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="example-input-small" class="col-form-label">Small</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-input-small" name="example-input-small" type="text" size="sm" placeholder=".input-sm" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="example-input-large" class="col-form-label">Large</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-input-large" name="example-input-large" type="text" size="lg" placeholder=".input-lg" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Large Select</label>
            </BCol>
            <BCol lg="8">
              <BFormSelect size="lg">
                <BFormSelectOption value="">Open this select menu</BFormSelectOption>
                <BFormSelectOption value="1">One</BFormSelectOption>
                <BFormSelectOption value="2">Two</BFormSelectOption>
                <BFormSelectOption value="3">Three</BFormSelectOption>
              </BFormSelect>
            </BCol>
          </BRow>
        </BCol>

        <BCol lg="6">
          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="example-input-normal" class="col-form-label">Normal</label>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-input-normal" name="example-input-normal" type="text" placeholder="Normal" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="example-gridsize" class="col-form-label">Grid Sizes</label>
            </BCol>
            <BCol lg="8">
              <BRow>
                <BCol sm="4">
                  <BFormInput id="example-gridsize" type="text" placeholder=".col-sm-4" />
                </BCol>
              </BRow>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Small Select</label>
            </BCol>
            <BCol lg="8">
              <BFormSelect size="sm">
                <BFormSelectOption value="">Open this select menu</BFormSelectOption>
                <BFormSelectOption value="1">One</BFormSelectOption>
                <BFormSelectOption value="2">Two</BFormSelectOption>
                <BFormSelectOption value="3">Three</BFormSelectOption>
              </BFormSelect>
            </BCol>
          </BRow>
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>
<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
</script>
