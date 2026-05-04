<template>
  <PageBreadcrumb title="Add/Edit Order" subtitle="Ecommerce" />
  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle class="mb-0">Create Order</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <BForm id="orderForm">
            <BRow class="g-3">
              <BCol md="6">
                <BFormGroup label="Order ID" label-class="form-label">
                  <BFormInput id="orderId" placeholder="#WB20100" disabled />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Order Date" label-class="form-label">
                  <FlatPickr v-model="orderDate" id="orderDate" class="form-control flatpickr-input" type="datetime-local" required :config="{ dateFormat: 'F j, Y', defaultDate: 'today' }" />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Customer Name" label-class="form-label">
                  <BFormInput id="customerName" placeholder="Mason Carter" required />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Customer Email" label-class="form-label">
                  <BFormInput id="customerEmail" type="email" placeholder="mason.carter@shopmail.com" required />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Product Name" label-class="form-label">
                  <BFormSelect
                    id="productName"
                    class="form-select"
                    required
                    :options="[
                      { value: '', text: 'Select Product', disabled: true },
                      { value: 'iPhone 15 Pro', text: 'iPhone 15 Pro' },
                      { value: 'MacBook Air M3', text: 'MacBook Air M3' },
                      { value: 'iPad Pro 13″ (M4)', text: 'iPad Pro 13″ (M4)' },
                      { value: 'Apple Watch Ultra 2', text: 'Apple Watch Ultra 2' },
                      { value: 'AirPods Pro (2nd Gen)', text: 'AirPods Pro (2nd Gen)' },
                    ]"
                  />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Quantity" label-class="form-label">
                  <BFormInput id="quantity" type="number" min="1" value="1" required />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Amount ($)" label-class="form-label">
                  <BFormInput id="amount" type="number" step="0.01" placeholder="129.45" required />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Payment Status" label-class="form-label">
                  <BFormSelect
                    v-model="paymentStatus"
                    id="paymentStatus"
                    class="form-select"
                    required
                    :options="[
                      { value: 'Paid', text: 'Paid' },
                      { value: 'Pending', text: 'Pending' },
                      { value: 'Failed', text: 'Failed' },
                    ]"
                  />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Order Status" label-class="form-label">
                  <BFormSelect
                    id="orderStatus"
                    v-model="orderStatus"
                    required
                    :options="[
                      { value: 'Ordered', text: 'Ordered' },
                      { value: 'Processing', text: 'Processing' },
                      { value: 'Delivered', text: 'Delivered' },
                      { value: 'Cancelled', text: 'Cancelled' },
                      { value: 'Returned', text: 'Returned' },
                    ]"
                  />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Payment Method" label-class="form-label">
                  <BFormSelect
                    id="paymentMethod"
                    v-model="paymentMethod"
                    required
                    :options="[
                      { value: 'Visa', text: 'Visa' },
                      { value: 'Mastercard', text: 'Mastercard' },
                      { value: 'PayPal', text: 'PayPal' },
                      { value: 'COD', text: 'Cash on Delivery' },
                    ]"
                  />
                </BFormGroup>
              </BCol>

              <BCol md="6">
                <BFormGroup label="Card Last 4 Digits" label-class="form-label">
                  <BFormInput id="cardNumber" maxlength="4" placeholder="7832" />
                </BFormGroup>
              </BCol>

              <BCol cols="12" class="text-center">
                <BButton type="button" variant="light" class="me-2"> Cancel </BButton>
                <BButton type="submit" variant="primary"> Save Order </BButton>
              </BCol>
            </BRow>
          </BForm>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'

const orderDate = ref('')

const paymentMethod = ref('Visa')
const orderStatus = ref('Ordered')
const paymentStatus = ref('Paid')
</script>
