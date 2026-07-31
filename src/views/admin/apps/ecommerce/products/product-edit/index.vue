<template>
  <PageBreadcrumb title="Modifier le produit" subtitle="Ecommerce" />
  <div v-if="loadingProduct" class="text-center py-5"><BSpinner /></div>
  <div v-else-if="fetchError" class="alert alert-danger">{{ fetchError }}</div>
  <BRow v-else class="justify-content-center">
    <BCol xs="12">
      <BRow>
        <BCol xxl="8">
          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Informations produit</h4>
              <p class="text-muted mb-0">Modifiez les informations du produit ci-dessous.</p>
            </BCardHeader>

            <BCardBody>
              <BAlert v-if="error" variant="danger" show>{{ error }}</BAlert>
              <BAlert v-if="successMessage" variant="success" show>{{ successMessage }}</BAlert>

              <BRow>
                <BCol cols="12">
                  <div class="mb-3">
                    <label for="productName" class="form-label"> Nom du produit <span class="text-danger">*</span> </label>
                    <BFormInput id="productName" v-model="form.title" type="text" placeholder="Nom du produit" required />
                  </div>
                </BCol>

                <BCol lg="6">
                  <div class="mb-3">
                    <label for="reference" class="form-label"> Référence </label>
                    <BFormInput id="reference" v-model="form.reference" type="text" placeholder="Ex: DW-001" />
                  </div>
                </BCol>

                <BCol lg="6">
                  <div class="mb-3">
                    <label for="stockNumber" class="form-label"> Stock <span class="text-danger">*</span> </label>
                    <BFormInput id="stockNumber" v-model.number="form.stock" type="number" placeholder="250" />
                  </div>
                </BCol>

                <BCol lg="6">
                  <div class="mb-3">
                    <label for="condition" class="form-label"> État / Condition </label>
                    <BFormInput id="condition" v-model="form.condition" type="text" placeholder="Ex: Neuf, Reconditionné" />
                  </div>
                </BCol>

                <BCol lg="6">
                  <div class="mb-3">
                    <label for="color" class="form-label"> Couleur </label>
                    <BFormInput id="color" v-model="form.color" list="product-color-options" type="text" placeholder="Ex: Bleu marine" autocomplete="off" />
                    <datalist id="product-color-options">
                      <option v-for="color in colorOptions" :key="color.value" :value="color.value" :label="color.label" />
                    </datalist>
                  </div>
                </BCol>

                <BCol lg="6">
                  <div class="mb-3">
                    <label for="size" class="form-label"> Taille / Contenance </label>
                    <BFormInput id="size" v-model="form.size" type="text" placeholder="Ex: 1L, 5kg" />
                  </div>
                </BCol>

                <BCol cols="12">
                  <div class="mb-3">
                    <label for="productUrl" class="form-label"> Lien produit </label>
                    <BFormInput id="productUrl" v-model="form.productUrl" type="url" placeholder="https://..." />
                  </div>
                </BCol>

                <BCol cols="12">
                  <div>
                    <label for="description" class="form-label"> Description <span class="text-muted">(Optionnel)</span> </label>
                    <QuillEditor v-model:content="form.description" content-type="html" :options="{ toolbar: [['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', { list: 'ordered' }, 'link', 'image']] }" theme="snow" />
                  </div>
                </BCol>
              </BRow>
            </BCardBody>
          </BCard>

          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Photos du produit</h4>
              <p class="text-muted mb-0">Laissez l'image de présentation vide pour conserver l'image actuelle.</p>
            </BCardHeader>

            <BCardBody>
              <div v-if="currentImageUrl" class="mb-3">
                <img :src="currentImageUrl" alt="Image actuelle" class="img-thumbnail" style="max-height: 150px;" />
                <p class="text-muted mt-1 mb-0 fs-xs">Image actuelle</p>
              </div>
              <label class="form-label fw-semibold">Nouvelle image de présentation</label>
              <FileUploader v-model="form.presentationImages" />

              <div class="border-top mt-4 pt-4">
                <label class="form-label fw-semibold">Galerie photos</label>
                <p class="text-muted fs-sm">Les nouvelles images seront ajoutées au tableau <code>galleryUrls</code>.</p>
                <div v-if="galleryUrls.length" class="d-flex flex-wrap gap-2 mb-3">
                  <div v-for="(url, index) in galleryUrls" :key="url" class="position-relative">
                    <img :src="url" alt="Photo de galerie" class="img-thumbnail" style="height: 100px; width: 100px; object-fit: cover;" />
                    <button type="button" class="btn btn-danger btn-sm position-absolute top-0 end-0 m-1" title="Retirer la photo" @click="removeGalleryImage(index)">
                      <Icon icon="x" />
                    </button>
                  </div>
                </div>
                <FileUploader v-model="form.galleryImages" />
              </div>
            </BCardBody>
          </BCard>
        </BCol>

        <BCol xxl="4">
          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Prix</h4>
              <p class="text-muted mb-0">Prix de base et remise.</p>
            </BCardHeader>

            <BCardBody>
              <div class="mb-3">
                <label for="basePrice" class="form-label">Prix de base (HT) <span class="text-danger">*</span></label>
                <div class="app-search">
                  <BFormInput id="basePrice" v-model.number="form.price" type="number" placeholder="Ex: 19.99" />
                  <Icon icon="euro" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-3">
                <label for="taxRate" class="form-label">TVA appliquée</label>
                <div class="app-search">
                  <BFormSelect id="taxRate" v-model="selectedTaxRateId" class="form-control my-1 my-md-0" :disabled="taxRatesLoading">
                    <option value="">Sans TVA</option>
                    <option v-for="taxRate in availableTaxRates" :key="taxRate.id" :value="taxRate.id">
                      {{ taxRate.name }} ({{ formatTaxRate(taxRate.rate) }})
                    </option>
                  </BFormSelect>
                  <Icon icon="receipt-text" class="app-search-icon text-muted" />
                </div>
                <small v-if="taxRatesLoading" class="text-muted">Chargement des taux de TVA...</small>
                <small v-else-if="taxRatesError" class="text-danger">{{ taxRatesError }}</small>
              </div>

              <div class="rounded border bg-light p-3 mb-3">
                <div class="d-flex justify-content-between text-muted fs-sm"><span>Montant TVA</span><span>{{ formatAmount(taxAmount) }}</span></div>
                <div class="d-flex justify-content-between fw-semibold mt-1"><span>Prix TTC</span><span>{{ formatAmount(priceTaxIncluded) }}</span></div>
              </div>

              <div class="mb-3">
                <label for="oldPrice" class="form-label">Ancien prix <span class="text-muted">(Optionnel)</span></label>
                <div class="app-search">
                  <BFormInput id="oldPrice" v-model.number="form.oldPrice" type="number" placeholder="Ex: 24.99" />
                  <Icon icon="euro" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-0">
                <label for="discountValue" class="form-label">Remise % <span class="text-muted">(Optionnel)</span></label>
                <div class="app-search">
                  <BFormInput id="discountValue" v-model.number="form.discount" type="number" placeholder="Ex: 10" />
                  <Icon icon="badge-percent" class="app-search-icon text-muted" />
                </div>
              </div>
            </BCardBody>
          </BCard>

          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Organisation</h4>
            </BCardHeader>

            <div class="card-body">
              <div class="mb-3">
                <label for="brand" class="form-label">Marque</label>
                <div class="app-search position-relative">
                  <BFormInput
                    id="brand"
                    v-model="form.brandName"
                    placeholder="Rechercher ou saisir une marque"
                    autocomplete="off"
                    @focus="showBrandSuggestions = true"
                    @input="showBrandSuggestions = true"
                    @blur="hideBrandSuggestions"
                  />
                  <Icon icon="layers" class="app-search-icon text-muted" />
                  <div v-if="showBrandSuggestions" class="brand-suggestions shadow-sm">
                    <button v-for="brand in filteredBrands" :key="brand.id" type="button" class="brand-suggestion" @mousedown.prevent="selectBrand(brand.name)">
                      {{ brand.name }}
                    </button>
                    <p v-if="!filteredBrands.length" class="mb-0 px-3 py-2 text-muted fs-sm">Aucune marque trouvée. Vous pouvez conserver votre saisie.</p>
                  </div>
                </div>
                <small v-if="brandsLoading" class="text-muted">Chargement des marques...</small>
                <small v-else-if="brandsError" class="text-danger">{{ brandsError }}</small>
              </div>

              <div class="mb-3">
                <label for="category" class="form-label">Catégorie <span class="text-danger">*</span></label>
                <div class="app-search">
                  <BFormSelect v-model="category" class="form-control my-1 my-md-0" id="category">
                    <option value="">Choisir une catégorie</option>
                    <option v-for="item in categories" :key="item.slug" :value="item.slug">{{ item.name }}</option>
                  </BFormSelect>
                  <Icon icon="layout-grid" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-0">
                <label class="form-label">Statut</label>
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" id="publishedSwitch" v-model="form.published" />
                  <label class="form-check-label" for="publishedSwitch">{{ form.published ? 'Publié' : 'Non publié' }}</label>
                </div>
              </div>
            </div>
          </BCard>
        </BCol>
      </BRow>

      <div class="mt-2 mb-4 d-flex gap-2 justify-content-center">
        <BButton variant="danger" class="fw-semibold" @click="goBack"> Annuler </BButton>
        <BButton variant="success" :disabled="loading" @click="handleUpdate">
          <BSpinner v-if="loading" small class="me-2" />
          Enregistrer les modifications
        </BButton>
      </div>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BAlert, BButton, BCard, BCardBody, BCardHeader, BCol, BFormInput, BFormSelect, BRow, BSpinner } from 'bootstrap-vue-next'
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FileUploader from '~/components/FileUploader.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { getBrands } from '~/services/brands.service'
import { getCategories } from '~/services/categories.service'
import { getProductById, updateProduct } from '~/services/products.service'
import { getTaxRates } from '~/services/tax-rates.service'
import type { TaxRate } from '~/types/tax-rate'

const route = useRoute()
const router = useRouter()

const categories = ref<{ name: string; slug: string }[]>([])
const brands = ref<{ id: string; name: string }[]>([])
const category = ref('')
const brandsLoading = ref(false)
const brandsError = ref<string | null>(null)
const taxRates = ref<TaxRate[]>([])
const taxRatesLoading = ref(false)
const taxRatesError = ref<string | null>(null)
const selectedTaxRateId = ref('')
const showBrandSuggestions = ref(false)
const loading = ref(false)
const loadingProduct = ref(true)
const fetchError = ref<string | null>(null)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const currentImageUrl = ref('')
const galleryUrls = ref<string[]>([])

const colorOptions = [
  { label: 'Noir', value: 'black' },
  { label: 'Blanc', value: 'white' },
  { label: 'Gris', value: 'gray' },
  { label: 'Rouge', value: 'red' },
  { label: 'Bleu', value: 'blue' },
  { label: 'Vert', value: 'green' },
  { label: 'Jaune', value: 'yellow' },
  { label: 'Orange', value: 'orange' },
  { label: 'Marron', value: 'brown' },
  { label: 'Rose', value: 'pink' },
]

const form = ref({
  title: '',
  reference: '',
  stock: 0,
  color: '',
  condition: '',
  size: '',
  productUrl: '',
  description: '',
  presentationImages: [] as File[],
  galleryImages: [] as File[],
  price: 0,
  oldPrice: 0,
  discount: 0,
  brandName: '',
  published: false,
})

const filteredBrands = computed(() => {
  const search = form.value.brandName.trim().toLocaleLowerCase('fr-FR')
  return brands.value.filter((brand) => brand.name.toLocaleLowerCase('fr-FR').includes(search))
})
const selectedTaxRate = computed(() => taxRates.value.find((taxRate) => taxRate.id === selectedTaxRateId.value))
const availableTaxRates = computed(() => taxRates.value.filter((taxRate) => taxRate.isActive || taxRate.id === selectedTaxRateId.value))
const taxAmount = computed(() => Number((Number(form.value.price || 0) * Number(selectedTaxRate.value?.rate || 0) / 100).toFixed(2)))
const priceTaxIncluded = computed(() => Number((Number(form.value.price || 0) + taxAmount.value).toFixed(2)))

const formatTaxRate = (rate: number) => `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(rate)} %`
const formatAmount = (amount: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(amount)

const goBack = () => router.push(`/apps/ecommerce/product-details/${route.params.id}`)

const removeGalleryImage = (index: number) => {
  galleryUrls.value.splice(index, 1)
}

const loadCategories = async () => {
  categories.value = (await getCategories()).map((item) => ({
    name: item.categoryName || item.name || item.slug,
    slug: item.slug,
  }))
}

const resolveCategorySlug = (value?: string) => {
  const normalizedValue = (value || '').trim().toLocaleLowerCase('fr-FR')
  const categoryMatch = categories.value.find((item) =>
    item.slug.toLocaleLowerCase('fr-FR') === normalizedValue ||
    item.name.toLocaleLowerCase('fr-FR') === normalizedValue
  )

  return categoryMatch?.slug || value || ''
}

const loadBrands = async () => {
  try {
    brandsLoading.value = true
    brandsError.value = null
    brands.value = (await getBrands()).map(({ id, name }) => ({ id, name }))
  } catch (err) {
    console.error('[product-edit] Failed to load brands', err)
    brandsError.value = 'Impossible de charger les marques.'
  } finally {
    brandsLoading.value = false
  }
}

const loadTaxRates = async () => {
  try {
    taxRatesLoading.value = true
    taxRatesError.value = null
    taxRates.value = await getTaxRates()
  } catch (err) {
    console.error('[product-edit] Failed to load tax rates', err)
    taxRatesError.value = 'Impossible de charger les taux de TVA.'
  } finally {
    taxRatesLoading.value = false
  }
}

const selectBrand = (name: string) => {
  form.value.brandName = name
  showBrandSuggestions.value = false
}

const hideBrandSuggestions = () => {
  window.setTimeout(() => {
    showBrandSuggestions.value = false
  }, 150)
}

const handleUpdate = async () => {
  try {
    loading.value = true
    error.value = null
    successMessage.value = null

    if (!form.value.title.trim() || !category.value || !form.value.price) {
      error.value = 'Nom, catégorie et prix sont obligatoires.'
      return
    }

    await updateProduct(route.params.id as string, {
      title: form.value.title.trim(),
      brandName: (form.value.brandName || '').trim(),
      category: category.value,
      color: (form.value.color || '').trim() || undefined,
      condition: (form.value.condition || '').trim() || undefined,
      description: form.value.description || '',
      discount: Number(form.value.discount || 0),
      imageFile: form.value.presentationImages[0] || null,
      imageUrl: currentImageUrl.value || '',
      galleryFiles: form.value.galleryImages,
      galleryUrls: galleryUrls.value,
      oldPrice: Number(form.value.oldPrice || 0),
      price: priceTaxIncluded.value,
      basePrice: priceTaxIncluded.value,
      priceExcludingTax: Number(form.value.price),
      productUrl: (form.value.productUrl || '').trim() || undefined,
      published: Boolean(form.value.published),
      reference: (form.value.reference || '').trim() || undefined,
      size: (form.value.size || '').trim() || undefined,
      stock: Number(form.value.stock || 0),
      taxAmount: taxAmount.value,
      taxRate: selectedTaxRate.value?.rate || 0,
      taxRateId: selectedTaxRate.value?.id || undefined,
      taxRateName: selectedTaxRate.value?.name || undefined,
      tvaRate: selectedTaxRate.value?.rate || 0,
    })

    successMessage.value = 'Produit mis à jour avec succès.'
    setTimeout(() => goBack(), 1200)
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Impossible de mettre à jour le produit.'
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadCategories(), loadBrands(), loadTaxRates()])
  try {
    const product = await getProductById(route.params.id as string)
    if (!product) { fetchError.value = 'Produit introuvable.'; return }

    currentImageUrl.value = product.imageUrl || ''
    galleryUrls.value = [...(product.galleryUrls || [])]
    category.value = resolveCategorySlug(product.category)
    selectedTaxRateId.value = product.taxRateId || taxRates.value.find((taxRate) => taxRate.rate === (product.tvaRate ?? product.taxRate))?.id || ''
    form.value = {
      title: product.title || '',
      reference: product.reference || '',
      stock: product.stock ?? 0,
      color: product.color || '',
      condition: product.condition || '',
      size: product.size || '',
      productUrl: product.productUrl || '',
      description: product.description || '',
      presentationImages: [],
      galleryImages: [],
      price: product.priceExcludingTax ?? getPriceExcludingTax(product),
      oldPrice: product.oldPrice ?? 0,
      discount: product.discount ?? 0,
      brandName: product.brandName || '',
      published: product.published ?? false,
    }
  } catch {
    fetchError.value = 'Erreur lors du chargement du produit.'
  } finally {
    loadingProduct.value = false
  }
})

function getPriceExcludingTax(product: { price?: number; basePrice?: number; tvaRate?: number; taxRate?: number }) {
  const price = product.price ?? 0
  const rate = product.tvaRate ?? product.taxRate ?? 0
  // Les produits créés avant ce changement conservaient le prix HT dans `price`.
  if (product.basePrice !== undefined && product.basePrice !== product.price) return price

  return rate > 0 ? Number((price / (1 + rate / 100)).toFixed(2)) : price
}
</script>

<style scoped>
.brand-suggestions {
  background-color: #fff !important;
  border: 1px solid #dee2e6;
  border-radius: 0.375rem;
  color: #212529;
  left: 0;
  margin-top: 0.25rem;
  max-height: 13.75rem;
  overflow-y: auto;
  position: absolute;
  right: 0;
  top: 100%;
  z-index: 1050;
}

.brand-suggestion {
  background: transparent;
  border: 0;
  display: block;
  padding: 0.5rem 0.75rem;
  text-align: left;
  width: 100%;
}

.brand-suggestion:hover {
  background: var(--bs-tertiary-bg);
}
</style>
