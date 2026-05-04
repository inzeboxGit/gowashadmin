<template>
  <PageBreadcrumb title="Order Details" subtitle="Ecommerce" />

  <BRow class="justify-content-center">
    <BCol xxl="12">
      <BRow>
        <BCol xl="9">
          <OrderSummary />

          <ShippingActivity />
        </BCol>

        <BCol xl="3">
          <CustomerDetails />

          <ShippingAddress />

          <BillingDetails />
        </BCol>
      </BRow>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import BillingDetails from './components/BillingDetails.vue'
import CustomerDetails from './components/CustomerDetails.vue'
import OrderSummary from './components/OrderSummary.vue'
import ShippingActivity from './components/ShippingActivity.vue'
import ShippingAddress from './components/ShippingAddress.vue'
</script>

<style scoped></style>
