<template>
  <BCard no-body class="h-100 mb-2 bg-white">
    <BBadge v-if="product.discount" :variant="product.discount > 20 ? 'success' : 'danger'"
      class="badge-label fs-base rounded position-absolute top-0 start-0 m-3"> {{ product.discount }}% OFF </BBadge>

    <BCardBody class="pb-0 product-card-body-white">
      <div class="p-3">
        <img :src="product.image" :alt="product.name" class="img-fluid" />
      </div>

      <BCardTitle tag="h6" class="fs-sm lh-base mb-2">
        <RouterLink to="/apps/ecommerce/products-details" class="link-reset">
          {{ product.name }}
        </RouterLink>
      </BCardTitle>

      <div class="d-flex align-items-center">
        <Rating :rating="product.rating" class="d-inline-flex gap-1 flex-wrap" />
        <span class="ms-1">
          <RouterLink to="/apps/ecommerce/products-details" class="link-reset fw-semibold"> ({{ product.reviews }})
          </RouterLink>
        </span>
      </div>
    </BCardBody>

    <BCardFooter class="bg-transparent d-flex justify-content-between">
      <div class="d-flex justify-content-start align-items-center gap-2">
        <h5 class="d-flex align-items-center gap-2 mb-0"
          :class="product.discount && product.discount > 20 ? 'text-success' : 'text-danger'">
          <span class="text-muted text-decoration-line-through"> ${{ product.price.toFixed(2) }} </span>
          ${{ (product.price - (product.price * (product.discount ?? 10)) / 100).toFixed(2) }}
        </h5>
      </div>

      <!-- add a button -->
      <!-- <b-button size="sm" variant="primary" class="btn-icon">
        <Icon icon="shopping-basket" class="fs-lg" />
      </b-button> -->
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import Rating from '~/components/Rating.vue'
import Icon from '~/components/wrappers/Icon.vue'
import type { ProductType } from './data'

defineProps<{
  product: ProductType
}>()
</script>

<style scoped>
.product-card-gray {
  background-color: var(--bs-light-bg-subtle);
  border-color: var(--bs-border-color);
}

.product-card-body-white {
  background-color: var(--bs-white);
}
</style>
