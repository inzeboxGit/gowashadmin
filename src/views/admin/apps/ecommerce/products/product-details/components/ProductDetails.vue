<template>
  <div class="d-flex align-items-center justify-content-between">
    <div>
      <span class="badge bg-success-subtle text-success px-2 py-1 fs-base rounded-pill">In Stock</span>
    </div>
    <div class="flex-grow-1 d-inline-flex align-items-center justify-content-end fs-lg">
      <Icon icon="star" class="text-warning" />
      <Icon icon="star" class="text-warning" />
      <Icon icon="star" class="text-warning" />
      <Icon icon="star" class="text-warning" />
      <Icon icon="star" class="text-warning" />
      <span class="ms-1 fs-base"><RouterLink to="/apps/ecommerce/reviews" class="link-reset fw-medium">(859 Reviews)</RouterLink> </span>
    </div>
  </div>
  <div class="mt-3 mb-4">
    <h4 class="fs-xl">Apple iMac 24” M3 Chip – 4.5K Retina Display</h4>
  </div>

  <BRow class="mb-4">
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">SKU:</h6>
      <p class="fw-medium mb-0">IMAC-M3-24</p>
    </BCol>
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Category:</h6>
      <p class="fw-medium mb-0">Computers</p>
    </BCol>
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Stock:</h6>
      <p class="fw-medium mb-0">67</p>
    </BCol>
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Published:</h6>
      <p class="fw-medium mb-0">12 Jul, 2025 <small class="text-muted">09:00 AM</small></p>
    </BCol>
  </BRow>

  <BRow class="mb-4">
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Orders:</h6>
      <p class="fw-medium mb-0">1,428</p>
    </BCol>
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Revenue:</h6>
      <p class="fw-medium mb-0">$2,350,120.00</p>
    </BCol>
  </BRow>

  <h3 class="text-muted d-flex align-items-center gap-2 mb-4">
    <small class="text-decoration-line-through">$1,499.00</small>
    <span class="fw-bold text-danger">$1,299.00</span>
    <small>(13%)</small>
  </h3>

  <h5 class="text-uppercase text-muted fs-xs mb-2">Product Info:</h5>

  <p>The Apple iMac 24” with the M3 chip redefines performance and design. Featuring a stunning 4.5K Retina display, ultra-fast processing, and a sleek aluminum chassis in multiple colors, it’s perfect for creatives and professionals alike.</p>
  <p>Enjoy seamless performance with macOS, optimized apps, and powerful memory — all in an all-in-one setup that fits any workspace.</p>

  <h6 class="mt-3 fs-base">Details :</h6>
  <ul class="d-flex flex-column gap-1 mb-3">
    <li>24” 4.5K Retina Display with True Tone.</li>
    <li>Apple M3 chip with 8-core CPU and 10-core GPU.</li>
    <li>8GB unified memory (configurable to 24GB).</li>
    <li>512GB SSD storage (configurable up to 2TB).</li>
    <li>Color-matched Magic Keyboard and Mouse.</li>
  </ul>

  <RouterLink to="" class="link-primary fw-semibold">Read More...</RouterLink>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCol, BRow } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
</script>

<style scoped></style>
