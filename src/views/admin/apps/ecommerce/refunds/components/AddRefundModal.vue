<template>
  <BModal id="createRefundModal" centered class="fade" cancel-variant="light" ok-title="Confirm Refund">
    <template #title>
      <span class="fw-semibold" id="createRefundModalLabel">
        <Icon icon="credit-card" class="me-2 text-primary" />
        Create Refund
      </span>
    </template>
    <BForm method="post">
      <div class="mb-3">
        <label for="refundOrderId" class="form-label fw-semibold">Order ID</label>
        <select id="refundOrderId" class="form-select">
          <option selected disabled>Select Order</option>
          <option>#INV-10423</option>
          <option>#INV-10424</option>
          <option>#INV-10425</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="refundCustomer" class="form-label fw-semibold">Customer</label>
        <input id="refundCustomer" type="text" class="form-control" value="Mason Carter" readonly />
      </div>

      <div class="mb-3">
        <label for="refundReason" class="form-label fw-semibold">Reason</label>
        <textarea id="refundReason" class="form-control" rows="2" placeholder="Enter refund reason (e.g., damaged item, wrong product, etc.)"></textarea>
      </div>

      <div class="mb-3">
        <label for="refundMethod" class="form-label fw-semibold">Refund Method</label>
        <select id="refundMethod" class="form-select">
          <option selected>Original Payment Method (Visa ****7832)</option>
          <option>Store Credit</option>
          <option>Bank Transfer</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="refundAmount" class="form-label fw-semibold">Refund Amount</label>
        <div class="input-group">
          <span class="input-group-text">$</span>
          <input id="refundAmount" type="number" class="form-control" placeholder="129.45" value="129.45" />
        </div>
      </div>

      <BFormGroup label="Refund Date" label-for="refundDate" label-class="fw-semibold">
        <FlatPickr v-model="refundDate" id="refundDate" class="form-control" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
      </BFormGroup>
    </BForm>
  </BModal>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import Icon from '~/components/wrappers/Icon.vue'

const refundDate = ref('')
</script>
