<template>
  <BCard no-body>
    <BCardHeader class="align-items-start p-4 d-flex">
      <div>
        <h3 class="mb-1 d-flex fs-xl align-items-center">Order #WB20100</h3>
        <p class="text-muted mb-3">
          <Icon icon="calendar" /> 24 Apr, 2025
          <small class="text-muted">10:10 AM</small>
        </p>
        <span class="badge badge-soft-success fs-xxs badge-label me-1"> <Icon icon="circle" class="align-middle fs-sm" /> Paid </span>
        <span class="badge badge-soft-info fs-xxs badge-label"> <Icon icon="truck" class="align-middle fs-sm" /> Shipped </span>
      </div>
      <div class="ms-auto">
        <BButton variant="light" class="me-1"> <Icon icon="pencil" class="me-1" /> Modify </BButton>
        <BButton variant="danger"> <Icon icon="trash-2" class="me-1" /> Delete </BButton>
      </div>
    </BCardHeader>

    <BCardBody class="px-4">
      <h4 class="fs-sm mb-3">Order Summary</h4>
      <BTableSimple responsive bordered class="table-custom table-nowrap align-middle mb-1">
        <thead class="bg-light align-middle bg-opacity-25 thead-sm">
          <tr class="text-uppercase fs-xxs">
            <th>Product</th>
            <th>Price</th>
            <th>QTY</th>
            <th class="text-end">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <div class="d-flex">
                <div class="avatar-md me-3">
                  <img :src="product1" width="36" height="36" alt="Wireless Earbuds" class="img-fluid rounded" />
                </div>
                <div>
                  <h5 class="mb-1">
                    <RouterLink to="" class="link-reset">Wireless Earbuds</RouterLink>
                  </h5>
                  <p class="text-muted mb-0 fs-xxs">by: My Furniture</p>
                </div>
              </div>
            </td>
            <td>$79.99</td>
            <td>2</td>
            <td class="text-end">$159.98</td>
          </tr>

          <tr>
            <td>
              <div class="d-flex">
                <div class="avatar-md me-3">
                  <img :src="product2" width="36" height="36" alt="Smart Watch" class="img-fluid rounded" />
                </div>
                <div>
                  <h5 class="mb-1">
                    <RouterLink to="" class="link-reset">Smart Watch</RouterLink>
                  </h5>
                  <p class="text-muted mb-0 fs-xxs">by: Tech World</p>
                </div>
              </div>
            </td>
            <td>$199.00</td>
            <td>1</td>
            <td class="text-end">$199.00</td>
          </tr>

          <tr>
            <td>
              <div class="d-flex">
                <div class="avatar-md me-3">
                  <img :src="product3" width="36" height="36" alt="Gaming Mouse" class="img-fluid rounded" />
                </div>
                <div>
                  <h5 class="mb-1">
                    <RouterLink to="" class="link-reset">Gaming Mouse</RouterLink>
                  </h5>
                  <p class="text-muted mb-0 fs-xxs">by: Pro Gamerz</p>
                </div>
              </div>
            </td>
            <td>$49.50</td>
            <td>3</td>
            <td class="text-end">$148.50</td>
          </tr>

          <tr class="border-top">
            <td colspan="3" class="text-end fw-semibold">Subtotal</td>
            <td class="text-end">$507.48</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end fw-semibold">Tax (10%)</td>
            <td class="text-end">$50.75</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end fw-semibold">Discount (5%)</td>
            <td class="text-end text-danger fw-semibold">-$25.37</td>
          </tr>
          <tr>
            <td colspan="3" class="text-end fw-semibold">Shipping fee</td>
            <td class="text-end">$10.00</td>
          </tr>
          <tr class="border-top">
            <td colspan="3" class="text-end fw-bold text-uppercase">Grand Total</td>
            <td class="fw-bold text-end table-active">$543.86</td>
          </tr>
        </tbody>
      </BTableSimple>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BCard, BCardBody, BCardHeader, BTableSimple } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import product1 from '/images/products/1.png'
import product2 from '/images/products/2.png'
import product3 from '/images/products/3.png'
</script>
