<template>
  <PageBreadcrumb title="Product Details" subtitle="Ecommerce" />
  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardBody>
          <BRow>
            <BCol xl="4">
              <ProductDisplay />
            </BCol>

            <BCol xl="8">
              <div class="p-4">
                <ProductDetails />
                <ProductReviews />
              </div>
            </BCol>
          </BRow>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ProductDetails from './components/ProductDetails.vue'
import ProductDisplay from './components/ProductDisplay.vue'
import ProductReviews from './components/ProductReviews.vue'
</script>

<style scoped></style>
