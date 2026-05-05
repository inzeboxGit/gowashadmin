<template>
  <BCard no-body class="card-top-sticky border-0">
    <BCardBody class="p-0">
      <BCarousel id="product-carousel" v-model="activeSlide" fade class="bg-opacity-25 rounded-3">
        <BCarouselSlide :img-src="product.imageUrl" class="text-center bg-transparent" />
      </BCarousel>

      <div class="text-center my-3">
        <BButton variant="light" class="me-1" @click="router.push(`/apps/ecommerce/product-edit/${product.id}`)">
          <Icon icon="pencil" class="fs-lg me-1" /> Modifier
        </BButton>
        <BButton :variant="product.published ? 'danger' : 'success'" :disabled="toggling" @click="handleTogglePublished">
          <BSpinner v-if="toggling" small class="me-1" />
          <Icon v-else :icon="product.published ? 'circle-x' : 'circle-check'" class="fs-lg me-1" />
          {{ product.published ? 'Dépublier' : 'Publier' }}
        </BButton>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BButton, BCard, BCardBody, BCarousel, BCarouselSlide, BSpinner } from 'bootstrap-vue-next'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { setProductPublished } from '~/services/products.service'
import type { Product } from '~/types/product'
import Icon from '~/components/wrappers/Icon.vue'

const props = defineProps<{ product: Product }>()
const emit = defineEmits<{ (e: 'updated'): void }>()

const router = useRouter()
const activeSlide = ref(0)
const toggling = ref(false)

const handleTogglePublished = async () => {
  toggling.value = true
  try {
    await setProductPublished(props.product.id, !props.product.published)
    emit('updated')
  } finally {
    toggling.value = false
  }
}
</script>
