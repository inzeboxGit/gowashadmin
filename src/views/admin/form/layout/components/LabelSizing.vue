<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle as="h4">Horizontal Form Label Sizing</BCardTitle>
    </BCardHeader>

    <BCardBody>
      <BForm>
        <BRow class="mb-2">
          <label for="colFormLabelSm" class="col-sm-2 col-form-label col-form-label-sm">Email</label>
          <BCol sm="10">
            <BFormInput type="email" class="form-control-sm" placeholder="col-form-label-sm" />
          </BCol>
        </BRow>
        <div class="mb-2 row">
          <label for="colFormLabel" class="col-sm-2 col-form-label">Email</label>
          <BCol sm="10">
            <BFormInput type="email" placeholder="col-form-label" />
          </BCol>
        </div>
        <BRow>
          <label for="colFormLabelLg" class="col-sm-2 col-form-label col-form-label-lg">Email</label>
          <BCol sm="10">
            <BFormInput type="email" class="form-control-lg" placeholder="col-form-label-lg" />
          </BCol>
        </BRow>
      </BForm>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BForm, BFormInput, BRow } from 'bootstrap-vue-next'
</script>

<style scoped></style>
