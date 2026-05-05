<template>
  <div class="d-flex align-items-center justify-content-between">
    <div>
      <span :class="['badge px-2 py-1 fs-base rounded-pill', product.published ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary']">
        {{ product.published ? 'Publié' : 'Non publié' }}
      </span>
    </div>
    <div class="flex-grow-1 d-inline-flex align-items-center justify-content-end fs-lg">
      <Icon icon="star" class="text-warning" />
      <Icon icon="star" class="text-warning" />
      <Icon icon="star" class="text-warning" />
      <Icon icon="star" class="text-warning" />
      <Icon icon="star" class="text-warning" />
      <span class="ms-1 fs-base fw-medium">(0 avis)</span>
    </div>
  </div>
  <div class="mt-3 mb-4">
    <h4 class="fs-xl">{{ product.title }}</h4>
  </div>

  <BRow class="mb-4">
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Référence :</h6>
      <p class="fw-medium mb-0">{{ product.reference || '—' }}</p>
    </BCol>
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Catégorie :</h6>
      <p class="fw-medium mb-0">{{ product.category }}</p>
    </BCol>
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Stock :</h6>
      <p class="fw-medium mb-0">{{ product.stock ?? '—' }}</p>
    </BCol>
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Publié le :</h6>
      <p class="fw-medium mb-0">{{ new Date(product.createdAt).toLocaleDateString('fr-FR') }}</p>
    </BCol>
  </BRow>

  <BRow class="mb-4">
    <BCol md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Marque :</h6>
      <p class="fw-medium mb-0">{{ product.brandName }}</p>
    </BCol>
    <BCol v-if="product.condition" md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">État :</h6>
      <p class="fw-medium mb-0">{{ product.condition }}</p>
    </BCol>
    <BCol v-if="product.size" md="4" xl="3">
      <h6 class="mb-1 text-muted text-uppercase">Taille :</h6>
      <p class="fw-medium mb-0">{{ product.size }}</p>
    </BCol>
  </BRow>

  <h3 class="text-muted d-flex align-items-center gap-2 mb-4">
    <small v-if="product.oldPrice" class="text-decoration-line-through">{{ product.oldPrice.toFixed(2) }} €</small>
    <span class="fw-bold text-danger">{{ product.price.toFixed(2) }} €</span>
    <small v-if="product.discount">({{ product.discount }}%)</small>
  </h3>

  <h5 class="text-uppercase text-muted fs-xs mb-2">Description :</h5>
  <p>{{ product.description }}</p>

  <a v-if="product.productUrl" :href="product.productUrl" target="_blank" rel="noopener noreferrer" class="link-primary fw-semibold">Voir sur le site...</a>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import type { Product } from '~/types/product'
import Icon from '~/components/wrappers/Icon.vue'

defineProps<{ product: Product }>()
</script>

<style scoped></style>
