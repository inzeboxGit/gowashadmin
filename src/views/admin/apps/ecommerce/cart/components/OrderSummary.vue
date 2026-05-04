<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle tag="h4">Order Summary</BCardTitle>
    </BCardHeader>

    <BCardBody>
      <ul class="list-unstyled mb-3">
        <li class="d-flex justify-content-between mb-2">
          <span class="text-muted">Subtotal (3 items):</span>
          <span>$2,427.00</span>
        </li>
        <li class="d-flex justify-content-between mb-2">
          <span class="text-muted">Saving:</span>
          <span class="text-danger">- $110.00</span>
        </li>
        <li class="d-flex justify-content-between mb-2">
          <span class="text-muted">Tax collected:</span>
          <span>$73.40</span>
        </li>
        <li class="d-flex justify-content-between border-bottom pb-3 mb-3">
          <span class="text-muted">Shipping:</span>
          <span>Calculated at checkout</span>
        </li>
        <li class="d-flex justify-content-between">
          <h6 class="text-uppercase text-muted">Estimated total:</h6>
          <h5 class="fw-bold">$2,390.40</h5>
        </li>
      </ul>

      <BButton to="/apps/ecommerce/checkout" variant="danger" size="lg" class="w-100 mb-3"> Proceed to Checkout </BButton>

      <p class="text-muted text-center mb-0">
        <RouterLink to="" class="fw-semibold">Create an account</RouterLink>
        and get 239 bonuses
      </p>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>
