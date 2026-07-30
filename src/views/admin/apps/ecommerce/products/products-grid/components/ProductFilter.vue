<template>
  <BOffcanvas body-class="p-0" no-header v-model="localShow" responsive="lg" size="lg" placement="start" tabindex="-1" id="productFillterOffcanvas">
    <BCard no-body class="h-100 w-100" data-simplebar>
      <BCardBody class="p-0 w-100">
        <div class="p-3 border-bottom border-dashed">
          <div class="app-search">
            <BFormInput type="search" placeholder="Rechercher un produit..." />
            <Icon icon="search" class="app-search-icon text-muted" />
          </div>
        </div>

        <div class="p-3 border-bottom border-dashed">
          <div class="d-flex mb-2 justify-content-between align-items-center">
            <h5 class="mb-0">Catégorie:</h5>
            <BButton variant="link" size="sm" class="px-0 fw-semibold">Voir tout</BButton>
          </div>

          <div v-if="categoriesLoading" class="text-muted py-1">Chargement des catégories...</div>
          <div v-else-if="categoriesError" class="text-danger py-1">{{ categoriesError }}</div>
          <div v-else-if="categories.length === 0" class="text-muted py-1">Aucune catégorie disponible.</div>
          <div v-for="category in categories" :key="category.id" class="d-flex align-items-center gap-2 text-muted py-1">
            <BFormCheckbox v-model="selectedCategories" :value="category.id" class="flex-grow-1">
              {{ category.name }}
            </BFormCheckbox>
          </div>
        </div>

        <div class="p-3 border-bottom border-dashed">
          <div class="d-flex mb-2 justify-content-between align-items-center">
            <h5 class="mb-0">Marques:</h5>
            <BButton variant="link" size="sm" class="px-0 fw-semibold">Voir tout.</BButton>
          </div>

          <div v-if="brandsLoading" class="text-muted py-1">Chargement des marques...</div>
          <div v-else-if="brandsError" class="text-danger py-1">{{ brandsError }}</div>
          <div v-else-if="brands.length === 0" class="text-muted py-1">Aucune marque disponible.</div>
          <div v-for="brand in brands" :key="brand.id" class="d-flex align-items-center gap-2 text-muted py-1">
            <BFormCheckbox v-model="selectedBrands" :value="brand.id" class="flex-grow-1">
              {{ brand.name }}
            </BFormCheckbox>
          </div>
        </div>

        <div class="p-3 border-bottom border-dashed">
          <h5 class="mb-3">Prix:</h5>
          <span data-slider-size="sm">
            <VueSlider v-model="range" tooltip="none" :min="1" :max="9999" style="padding: 0" />
          </span>
          <div class="d-flex gap-2 align-items-center mt-3">
            <BFormInput v-model="range[0]" type="number" size="sm" class="text-center" />
            <span class="fw-semibold text-muted">to</span>
            <BFormInput v-model="range[1]" type="number" size="sm" class="text-center" />
          </div>
        </div>

        <!-- <div class="p-3">
          <div class="d-flex mb-3 justify-content-between align-items-center">
            <h5 class="mb-0">Évaluations:</h5>
          </div>

          <div v-for="rate in ratings" :key="rate.id" class="form-check py-1 px-0">
            <span class="d-flex align-items-center justify-content-between">
              <BFormCheckbox v-model="selectedRatings" :value="rate.id" class="d-block">
                <span class="flex-grow-1 d-inline-flex align-items-center">
                  <Icon icon="star" v-for="(i, idx) in 5" :key="idx" :class="i <= rate.stars ? 'text-warning' : 'text-muted'" />
                  <span class="text-muted ms-1">{{ rate.label }}</span>
                </span>
              </BFormCheckbox>
              <span class="flex-shrink-0">
                <BBadge variant="light">{{ rate.count }}</BBadge>
              </span>
            </span>
          </div>
        </div> -->
      </BCardBody>
    </BCard>
  </BOffcanvas>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BFormCheckbox, BFormInput, BOffcanvas } from 'bootstrap-vue-next'
import { onMounted, ref, watch } from 'vue'
import VueSlider from 'vue-3-slider-component'
import Icon from '~/components/wrappers/Icon.vue'
import { getBrands } from '~/services/brands.service'
import { getCategories } from '~/services/categories.service'

const selectedCategories = ref<string[]>([])
const selectedBrands = ref<string[]>([])
const selectedRatings = ref<string[]>([])

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ (e: 'update:show', value: boolean): void }>()
const localShow = ref(props.show)
watch(
  () => props.show,
  (val) => {
    localShow.value = val
  }
)

// Emit changes to parent
watch(localShow, (val) => {
  emit('update:show', val)
})

const range = ref([1000, 2500])

const categories = ref<{ id: string; name: string }[]>([])
const categoriesLoading = ref(false)
const categoriesError = ref<string | null>(null)

const brands = ref<{ id: string; name: string }[]>([])
const brandsLoading = ref(false)
const brandsError = ref<string | null>(null)

const loadBrands = async () => {
  try {
    brandsLoading.value = true
    brandsError.value = null
    const shopBrands = await getBrands()
    brands.value = shopBrands.map(({ id, name }) => ({ id, name }))
  } catch (err) {
    console.error('[product-filter] Failed to load brands', err)
    brandsError.value = 'Impossible de charger les marques.'
  } finally {
    brandsLoading.value = false
  }
}

const loadCategories = async () => {
  try {
    categoriesLoading.value = true
    categoriesError.value = null
    const shopCategories = await getCategories()
    categories.value = shopCategories.map((category) => ({
      id: category.id,
      name: category.categoryName || category.name || category.slug,
    }))
  } catch (err) {
    console.error('[product-filter] Failed to load categories', err)
    categoriesError.value = 'Impossible de charger les catégories.'
  } finally {
    categoriesLoading.value = false
  }
}

const ratings = ref([
  { id: '5-star', stars: 5, label: '5 Stars & Up', count: 120 },
  { id: '4-star', stars: 4, label: '4 Stars & Up', count: 210 },
  { id: '3-star', stars: 3, label: '3 Stars & Up', count: 325 },
  { id: '2-star', stars: 2, label: '2 Stars & Up', count: 145 },
  { id: '1-star', stars: 1, label: '1 Star & Up', count: 58 },
])

onMounted(() => {
  loadCategories()
  loadBrands()
})
</script>

<style scoped></style>
