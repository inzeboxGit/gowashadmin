<template>
  <PageBreadcrumb title="Products Grid" subtitle="Ecommerce" />

  <BRow class="mb-2">
    <BCol lg="12">
      <form class="bg-light-subtle rounded border p-3">
        <div class="d-flex flex-wrap justify align-items-center gap-3">
          <div class="d-lg-none d-flex gap-2">
            <button class="btn btn-default btn-icon" type="button" @click="click">
              <Icon icon="menu" class="fs-lg" />
            </button>
          </div>
          <h3 class="mb-0 fs-xl flex-grow-1">{{ totalRows }} Products</h3>

          <div class="d-flex gap-1">
            <RouterLink to="/apps/ecommerce/products-grid" class="btn btn-primary btn-icon">
              <Icon icon="layout-grid" class="fs-lg" />
            </RouterLink>
            <RouterLink to="/apps/ecommerce/products" class="btn btn-soft-primary btn-icon">
              <Icon icon="list-check" class="fs-lg" />
            </RouterLink>
            <RouterLink to="/apps/ecommerce/product-add" class="btn btn-danger ms-1"> <Icon icon="plus" class="fs-sm me-2" /> Add Product </RouterLink>
          </div>
        </div>
      </form>
    </BCol>
  </BRow>

  <BRow class="g-2">
    <BCol xl="3">
      <ProductFilter v-model:show="showFilter" />
    </BCol>

    <BCol xl="9">
      <BAlert v-if="error" variant="danger" show>{{ error }}</BAlert>

      <div v-if="loading" class="text-center text-muted py-5">
        <BSpinner small class="me-2" />
        Chargement des produits...
      </div>

      <BRow class="row-cols-xxl-4 row-cols-lg-3 row-cols-sm-2 row-col-1 g-2">
        <BCol v-for="product of paginatedProducts" :key="product.id">
          <ProductCard :product="product" />
        </BCol>
      </BRow>

      <div class="d-flex justify-content-between align-items-center mb-4 mt-3">
        <span class="text-muted fst-italic">Last modification: <Icon icon="clock" /> {{ lastModification }} </span>
        <BPagination v-model="currentPage" first-number last-number hide-ellipsis :total-rows="totalRows" :per-page="perPage" class="pagination-boxed">
          <template #prev-text>
            <Icon icon="chevron-left" />
          </template>
          <template #next-text>
            <Icon icon="chevron-right" />
          </template>
        </BPagination>
      </div>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BAlert, BCol, BPagination, BRow, BSpinner } from 'bootstrap-vue-next'
import { computed, onMounted, ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { getProducts } from '~/services/products.service'
import type { Product } from '~/types/product'
import ProductCard from './components/ProductCard.vue'
import ProductFilter from './components/ProductFilter.vue'
import type { ProductType } from './components/data'

const showFilter = ref(false)

const products = ref<ProductType[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const perPage = ref(8)
const currentPage = ref(1)

const totalRows = computed(() => products.value.length)

const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * perPage.value
  return products.value.slice(start, start + perPage.value)
})

const formatDateTime = (value?: string) => {
  if (!value) return '-'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const lastModification = computed(() => {
  return products.value[0]?.updatedAt ? formatDateTime(products.value[0].updatedAt) : '-'
})

const mapProductToCard = (product: Product): ProductType => ({
  id: product.id,
  name: product.title,
  image: product.imageUrl || '/images/products/1.png',
  price: product.price,
  discount: product.discount || undefined,
  rating: 0,
  reviews: 0,
  updatedAt: product.updatedAt,
})

const loadProducts = async () => {
  try {
    loading.value = true
    error.value = null
    products.value = (await getProducts()).map(mapProductToCard)
  } catch (err) {
    console.error('[products-grid] Failed to load products', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger les produits.'
  } finally {
    loading.value = false
  }
}

const click = () => {
  showFilter.value = !showFilter.value
}

onMounted(loadProducts)
</script>

<style scoped></style>
