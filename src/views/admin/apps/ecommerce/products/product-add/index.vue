<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageBreadcrumb title="Ajouter un produit" subtitle="Ecommerce" />
  <BRow class="justify-content-center">
    <BCol xs="12">
      <BRow>
        <BCol xxl="8">
          <BCard no-body>

            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Informations sur le produit</h4>
              <p class="text-muted mb-0">Pour ajouter un nouveau produit, veuillez fournir les informations nécessaires
                dans les champs ci-dessous.</p>
            </BCardHeader>

            <BCardBody>
              <BAlert v-if="error" variant="danger" show>{{ error }}</BAlert>
              <BAlert v-if="successMessage" variant="success" show>{{ successMessage }}</BAlert>

              <BRow>
                <BCol cols="12">
                  <div class="mb-3">
                    <label for="productName" class="form-label"> Nom du produit <span class="text-danger">*</span>
                    </label>
                    <BFormInput id="productName" v-model="form.title" type="text" placeholder="Entrez le nom du produit"
                      required />
                  </div>
                </BCol>

                <BCol lg="6">
                  <div class="mb-3">
                    <label for="skuId" class="form-label"> SKU <span class="text-muted">(Auto)</span> </label>
                    <BFormInput id="skuId" :model-value="generatedSku" type="text" placeholder="Generated automatically" readonly />
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
                    <BFormInput id="condition" v-model="form.condition" type="text" placeholder="Ex: Neuf, Reconditionnée" />
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

                <BCol lg="6">
                  <div class="mb-3">
                    <label for="productUrl" class="form-label"> Lien produit </label>
                    <BFormInput id="productUrl" v-model="form.productUrl" type="url" placeholder="https://..." />
                  </div>
                </BCol>

                <BCol cols="12">
                  <div>
                    <label for="description" class="form-label"> Description du produit <span
                        class="text-muted">(Optionnel)</span> </label>
                    
                      <QuillEditor v-model:content="form.description" content-type="html" :options="{ toolbar: [['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', { list: 'ordered' }, 'link', 'image']] }" theme="snow" />
                    
                  </div>
                </BCol>
              </BRow>
            </BCardBody>
          </BCard>

          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Image du produit</h4>
              <p class="text-muted mb-0">Pour télécharger une image du produit, veuillez utiliser l'option ci-dessous
                pour sélectionner et télécharger le fichier pertinent.</p>
            </BCardHeader>

            <BCardBody>
              <BRow>
                <BCol cols="12">
                  <FileUploader v-model="form.images" />
                </BCol>
              </BRow>
            </BCardBody>
          </BCard>
        </BCol>

        <BCol xxl="4">
          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Tarification</h4>
              <p class="text-muted mb-0">Définissez le prix de base et la remise applicable pour le produit en utilisant
                les options ci-dessous.</p>
            </BCardHeader>

            <BCardBody>
              <div class="mb-3">
                <label for="basePrice" class="form-label"
>Prix de base (HT) <span class="text-danger"><span
                      class="text-danger">*</span></span></label
                >
                <div class="app-search">
                  <BFormInput id="basePrice" v-model.number="form.price" type="number"
                    placeholder="Entrez le prix de base (par ex., 199.99)" />
                  <Icon icon="dollar-sign" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-3">
                <label for="taxRate" class="form-label">TVA appliquée</label>
                <div class="app-search">
                  <BFormSelect id="taxRate" v-model="selectedTaxRateId" class="form-control my-1 my-md-0"
                    :disabled="taxRatesLoading">
                    <option value="">Sans TVA</option>
                    <option v-for="taxRate in activeTaxRates" :key="taxRate.id" :value="taxRate.id">
                      {{ taxRate.name }} ({{ formatTaxRate(taxRate.rate) }})
                    </option>
                  </BFormSelect>
                  <Icon icon="receipt-text" class="app-search-icon text-muted" />
                </div>
                <small v-if="taxRatesLoading" class="text-muted">Chargement des taux de TVA...</small>
                <small v-else-if="taxRatesError" class="text-danger">{{ taxRatesError }}</small>
              </div>

              <div class="rounded border bg-light p-3 mb-3">
                <div class="d-flex justify-content-between text-muted fs-sm"><span>Montant TVA</span><span>{{
                  formatAmount(taxAmount) }}</span></div>
                <div class="d-flex justify-content-between fw-semibold mt-1"><span>Prix TTC</span><span>{{
                  formatAmount(priceTaxIncluded) }}</span></div>
              </div>

              <div class="mb-3">
                <label for="discount" class="form-label">Type de remise <span
                    class="text-muted">(Optionnel)</span></label>
                <div class="app-search">
                  <BFormSelect v-model="discountType" id="discount" placeholder="Choose Discount" class="form-control my-1 my-md-0">
                    <option value="All">Choisir la remise</option>
                    <option value="none">Pas de remise</option>
                    <option value="flat">Remise forfaitaire</option>
                    <option value="percentage">Remise en pourcentage</option>
                  </BFormSelect>
                  <Icon icon="badge-percent" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-0">
                <label for="discountValue" class="form-label">Valeur de la remise <span
                    class="text-muted">(Optionnel)</span></label>
                <div class="app-search">
                  <BFormInput id="discountValue" v-model.number="form.discount" type="number"
                    placeholder="Entrez le montant ou le pourcentage de la remise" />
                  <Icon icon="tag" class="app-search-icon text-muted" />
                </div>
              </div>
            </BCardBody>
          </BCard>

          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Organisation</h4>
              <p class="text-muted mb-0">Organisez votre produit en sélectionnant la marque, la catégorie, le statut et
                les tags appropriés.</p>
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
                <label for="category" class="form-label">Categorie <span class="text-danger">*</span></label>
                <div class="app-search">
                  <BFormSelect v-model="category" class="form-control my-1 my-md-0" id="category">
                    <option value="All">Choisir la catégorie</option>
                    <option v-for="item in categories" :key="item.slug" :value="item.name">{{ item.name }}</option>
                  </BFormSelect>
                  <Icon icon="layout-grid" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-3">
                <label for="statusOne" class="form-label">Status <span class="text-danger">*</span></label>
                <div class="app-search">
                  <BFormSelect v-model="status" class="form-control my-1 my-md-0" id="statusOne">
                    <option value="All">Choisir le statut</option>
                    <option value="Published">Publié</option>
                    <option value="Inactive">Inactif</option>
                    <option value="Schedule">Programmé</option>
                    <option value="Draft">Brouillon</option>
                  </BFormSelect>
                  <Icon icon="wand-sparkles" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-0">
                <label for="tags" class="form-label">Tags</label>
                <div class="app-search">
                  <BFormInput type="text" id="tags" placeholder="Enter tags separated by commas" />
                  <Icon icon="tag" class="app-search-icon text-muted" />
                </div>
              </div>
            </div>
          </BCard>
        </BCol>
      </BRow>

      <div class="mt-2 mb-4 d-flex gap-2 justify-content-center">
        <BButton variant="danger" class="fw-semibold" :disabled="loading" @click="resetForm"> Discard </BButton>
        <BButton variant="secondary" :disabled="loading" @click="handleCreateProduct(false)"> Save as Draft</BButton>
        <BButton variant="success" :disabled="loading" @click="handleCreateProduct(true)"> Publish </BButton>
      </div>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BAlert, BButton, BCard, BCardBody, BCardHeader, BCol, BFormInput, BFormSelect, BRow } from 'bootstrap-vue-next'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import FileUploader from '~/components/FileUploader.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { getBrands } from '~/services/brands.service'
import { getCategories } from '~/services/categories.service'
import { createProduct } from '~/services/products.service'
import { getTaxRates } from '~/services/tax-rates.service'
import type { TaxRate } from '~/types/tax-rate'
import { useAuth } from '~/composables/useAuth'

const category = ref('All')
const status = ref('All')
const discountType = ref('All')
const categories = ref<{ name: string; slug: string }[]>([])
const brands = ref<{ id: string; name: string }[]>([])
const brandsLoading = ref(false)
const brandsError = ref<string | null>(null)
const taxRates = ref<TaxRate[]>([])
const taxRatesLoading = ref(false)
const taxRatesError = ref<string | null>(null)
const selectedTaxRateId = ref('')
const showBrandSuggestions = ref(false)
const loading = ref(false)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)

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

const { user } = useAuth()
const router = useRouter()

const initialDescription =
  `<p>Introducing the <strong><em>Azure Comfort Single Sofa</em></strong>, a perfect blend of modern design and luxurious comfort.</p><p>This premium blue single sofa is designed to elevate any living space with its sleek profile and rich, durable fabric. It’s the perfect seating option for your living room, lounge area, or cozy reading nook.</p><ul><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Crafted with a solid mahogany frame for enhanced durability.</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Upholstered in a high-quality blue fabric that offers both style and comfort.</li></ul>`

const form = ref({
  title: '',
  stock: 0,
  description: initialDescription,
  price: 0,
  discount: 0,
  brandName: '',
  images: [] as File[],
  reference: '',
  color: '',
  condition: '',
  size: '',
  productUrl: '',
})

const selectedCategory = computed(() => (category.value === 'All' ? '' : category.value))
const activeTaxRates = computed(() => taxRates.value.filter((taxRate) => taxRate.isActive))
const selectedTaxRate = computed(() => activeTaxRates.value.find((taxRate) => taxRate.id === selectedTaxRateId.value))
const taxAmount = computed(() => Number((Number(form.value.price || 0) * Number(selectedTaxRate.value?.rate || 0) / 100).toFixed(2)))
const priceTaxIncluded = computed(() => Number((Number(form.value.price || 0) + taxAmount.value).toFixed(2)))
const filteredBrands = computed(() => {
  const search = form.value.brandName.trim().toLocaleLowerCase('fr-FR')
  return brands.value.filter((brand) => brand.name.toLocaleLowerCase('fr-FR').includes(search))
})

const generatedSku = computed(() => {
  const prefix = form.value.title
    .trim()
    .toUpperCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^A-Z0-9]+/)
    .filter(Boolean)
    .map((word) => word[0])
    .join('')
    .slice(0, 3)

  const fallbackPrefix = form.value.title.trim() ? 'PRD' : ''
  const timestamp = Date.now().toString().slice(-6).replace(/(\d{3})(\d{3})/, '$1-$2')

  return prefix || fallbackPrefix ? `${prefix || fallbackPrefix}-${timestamp}` : ''
})

const formatTaxRate = (rate: number) => `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(rate)} %`
const formatAmount = (amount: number) => `${new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'MAD' }).format(amount)}`

const resetForm = () => {
  form.value = {
    title: '',
    stock: 0,
    description: initialDescription,
    price: 0,
    discount: 0,
    brandName: '',
    images: [],
    reference: '',
    color: '',
    condition: '',
    size: '',
    productUrl: '',
  }
  category.value = 'All'
  status.value = 'All'
  discountType.value = 'All'
  selectedTaxRateId.value = ''
  error.value = null
  successMessage.value = null
}

const loadCategories = async () => {
  categories.value = (await getCategories()).map((item) => ({
    name: item.categoryName || item.name || item.slug,
    slug: item.slug,
  }))
}

const loadBrands = async () => {
  try {
    brandsLoading.value = true
    brandsError.value = null
    brands.value = (await getBrands()).map(({ id, name }) => ({ id, name }))
  } catch (err) {
    console.error('[product-add] Failed to load brands', err)
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
    console.error('[product-add] Failed to load tax rates', err)
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

const handleCreateProduct = async (published: boolean) => {
  try {
    loading.value = true
    error.value = null
    successMessage.value = null

    if (!form.value.title.trim() || !generatedSku.value || !selectedCategory.value || !form.value.price) {
      error.value = 'Product name, category et price sont obligatoires.'
      return
    }

    await createProduct({
      id: generatedSku.value,
      title: form.value.title.trim(),
      brandName: form.value.brandName.trim(),
      category: selectedCategory.value,
      description: form.value.description,
      discount: Number(form.value.discount || 0),
      imageFile: form.value.images[0] || null,
      laveurId: user.value?.uid || '',
      oldPrice: Number(form.value.discount || 0) > 0 ? Number(form.value.price) : 0,
      price: priceTaxIncluded.value,
      basePrice: priceTaxIncluded.value,
      priceExcludingTax: Number(form.value.price),
      published,
      reference: form.value.reference.trim() || undefined,
      color: form.value.color.trim() || undefined,
      condition: form.value.condition.trim() || undefined,
      size: form.value.size.trim() || undefined,
      productUrl: form.value.productUrl.trim() || undefined,
      stock: Number(form.value.stock || 0),
      taxAmount: taxAmount.value,
      taxRate: selectedTaxRate.value?.rate || 0,
      taxRateId: selectedTaxRate.value?.id || undefined,
      taxRateName: selectedTaxRate.value?.name || undefined,
      tvaRate: selectedTaxRate.value?.rate || 0,
    })

    const message = published ? 'Produit publie avec succes.' : 'Produit enregistre comme brouillon.'
    successMessage.value = message
    resetForm()
    router.push({
      path: '/apps/ecommerce/products',
      query: { success: message },
    })
  } catch (err) {
    console.error('[products] Failed to create product', err)
    error.value = err instanceof Error ? err.message : 'Impossible de creer le produit.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadCategories()
  loadBrands()
  loadTaxRates()
})
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
