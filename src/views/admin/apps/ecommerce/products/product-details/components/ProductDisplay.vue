<template>
  <BCard no-body class="card-top-sticky border-0">
    <BCardBody class="p-0">
      <BCarousel id="product-carousel" v-model="activeSlide" fade class="bg-opacity-25 rounded-3">
        <BCarouselSlide v-for="(image, index) in productImages" :key="image" :img-src="image" class="text-center bg-transparent" />
      </BCarousel>

      <div v-if="galleryImages.length" class="px-3 pt-3">
        <p class="text-muted text-uppercase fs-xxs mb-2">Galerie photos</p>
        <div class="d-flex flex-wrap gap-2">
          <button
            v-for="image in galleryImages"
            :key="image"
            type="button"
            class="border rounded p-0 bg-transparent"
            :class="{ 'border-primary border-2': productImages[activeSlide] === image }"
            :aria-label="'Afficher la photo de galerie'"
            @click="activeSlide = productImages.indexOf(image)"
          >
            <img :src="image" alt="Photo de galerie" class="rounded" style="width: 64px; height: 64px; object-fit: cover;" />
          </button>
        </div>
      </div>

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
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { setProductPublished } from '~/services/products.service'
import type { Product } from '~/types/product'
import Icon from '~/components/wrappers/Icon.vue'

const props = defineProps<{ product: Product }>()
const galleryImages = computed(() => (props.product.galleryUrls || []).filter(Boolean))
const productImages = computed(() => [props.product.imageUrl, ...galleryImages.value].filter(Boolean))
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
