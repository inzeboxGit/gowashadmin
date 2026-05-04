<template>
  <BCard no-body>
    <BCardHeader class="d-flex justify-content-between align-items-center">
      <BCardTitle tag="h4" class="flex-grow-1 mb-0">Shopping Cart</BCardTitle>
      <RouterLink to="#" class="text-decoration-underline link-offset-2 fw-medium"> Clear cart </RouterLink>
    </BCardHeader>

    <BCardBody>
      <div class="table-responsive">
        <table class="table table-custom align-middle mb-0">
          <thead class="bg-light align-middle bg-opacity-25 thead-sm">
            <tr class="text-uppercase fs-xxs">
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartItems" :key="item.id">
              <td class="d-flex align-items-center">
                <img :src="item.image" :alt="item.alt" class="me-3 rounded" width="60" height="60" />
                <div>
                  <span v-if="item.discount" class="badge bg-danger-subtle text-danger mb-1"> -10% </span>
                  <h6 class="mb-1 fs-sm">{{ item.title }}</h6>
                  <small class="text-muted d-block">Color: {{ item.color }}</small>
                  <small class="text-muted d-block">Model: {{ item.model }}</small>
                </div>
              </td>

              <td>
                <template v-if="item.discount">
                  <span class="fw-semibold">${{ item.price.toFixed(2) }}</span>
                  <br />
                  <small class="text-decoration-line-through text-muted"> ${{ (item.price / (1 - item.discount / 100)).toFixed(2) }} </small>
                </template>
                <template v-else> ${{ item.price.toFixed(2) }} </template>
              </td>

              <td v-if="item.quantity !== undefined">
                <QuantityCounter :id="item.id" v-model:quantity="item.quantity" @change="handleQuantityChange" />
              </td>

              <td class="fw-semibold">${{ (item.price * item.quantity).toFixed(2) }}</td>

              <td>
                <RouterLink to="" class="text-muted" :aria-label="`Remove ${item.title} from cart`" @click.prevent="handleRemove(item.id)">
                  <Icon icon="x" class="fs-lg" />
                </RouterLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-4">
        <RouterLink to="/apps/ecommerce/products-grid" class="fw-medium d-inline-flex align-items-center gap-1"> <Icon icon="arrow-left" /> Continue Shopping </RouterLink>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BCardHeader, BCardTitle } from 'bootstrap-vue-next'
import { ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import QuantityCounter from './QuantityCounter.vue'
import { cartItemData, type CartItemType } from './data'

const cartItems = ref<CartItemType[]>(cartItemData)

const handleQuantityChange = (id: number, newQuantity: number) => {
  cartItems.value = cartItems.value.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
}

const handleRemove = (id: number) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id)
}
</script>
