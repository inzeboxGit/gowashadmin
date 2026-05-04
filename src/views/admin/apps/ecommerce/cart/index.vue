<template>
  <PageBreadcrumb title="Cart" subtitle="Ecommerce" />

  <BRow>
    <BCol cols="12">
      <BAlert variant="info" show class="border border-info border-opacity-25" body-class="w-100">
        <h6 class="mb-2">
          Buy
          <span class="fw-bold text-warning">$250</span>
          more to get
          <span class="fw-semibold">Free Shipping</span>
        </h6>
        <BProgress :value="70" variant="warning" style="height: 4px" />
      </BAlert>
    </BCol>
  </BRow>

  <BRow>
    <BCol lg="8">
      <ShoppingCart />
    </BCol>

    <BCol lg="4">
      <OrderSummary />

      <BCard no-body>
        <BCardHeader>
          <BCardTitle tag="h4">Apply Coupon Code</BCardTitle>
        </BCardHeader>

        <BCardBody>
          <BAlert variant="warning" show class="fs-xs py-2"> Use <span class="fw-bold">ADMINPRO</span> to get 10% off. </BAlert>

          <div class="input-group">
            <BFormInput type="text" placeholder="Enter code" />
            <BButton variant="primary" type="button">Apply</BButton>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import OrderSummary from './components/OrderSummary.vue'
import ShoppingCart from './components/ShoppingCart.vue'
</script>
