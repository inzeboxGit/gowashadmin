<template>
  <PageBreadcrumb title="Product Details" subtitle="Ecommerce" />
  <div v-if="loading" class="text-center py-5">
    <BSpinner />
  </div>
  <div v-else-if="error" class="alert alert-danger">{{ error }}</div>
  <BRow v-else-if="product">
    <BCol xs="12">
      <BCard no-body>
        <BCardBody>
          <BRow>
            <BCol xl="4">
              <ProductDisplay :product="product" @updated="reload" />
            </BCol>

            <BCol xl="8">
              <div class="p-4">
              <ProductDetails :product="product" :supplier-name="supplierName" />
              </div>
            </BCol>
          </BRow>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCol, BRow, BSpinner } from 'bootstrap-vue-next'
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { getProductById } from '~/services/products.service'
import { getSuppliers } from '~/services/suppliers.service'
import type { Product } from '~/types/product'
import type { Supplier } from '~/types/supplier'
import ProductDetails from './components/ProductDetails.vue'
import ProductDisplay from './components/ProductDisplay.vue'

const route = useRoute()
const product = ref<Product | null>(null)
const suppliers = ref<Supplier[]>([])
const loading = ref(true)
const error = ref<string | null>(null)
const supplierName = computed(() => suppliers.value.find((supplier) => supplier.id === product.value?.supplierId)?.name || '')

const loadProduct = async () => {
  try {
    const id = route.params.id as string
    product.value = await getProductById(id)
    if (!product.value) error.value = 'Produit introuvable.'
  } catch (e) {
    error.value = 'Erreur lors du chargement du produit.'
  } finally {
    loading.value = false
  }
}

const reload = async () => {
  product.value = await getProductById(route.params.id as string)
}

const loadSuppliers = async () => {
  try {
    suppliers.value = await getSuppliers()
  } catch (error) {
    console.error('[product-details] Failed to load suppliers', error)
  }
}

onMounted(() => {
  loadProduct()
  loadSuppliers()
})
</script>

<style scoped></style>
