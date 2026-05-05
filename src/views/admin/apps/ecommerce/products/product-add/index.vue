<template>
  <PageBreadcrumb title="Add Product" subtitle="Ecommerce" />
  <BRow class="justify-content-center">
    <BCol xs="12">
      <BRow>
        <BCol xxl="8">
          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Product Information</h4>
              <p class="text-muted mb-0">To add a new product, please provide the necessary details in the fields below.</p>
            </BCardHeader>

            <BCardBody>
              <BAlert v-if="error" variant="danger" show>{{ error }}</BAlert>
              <BAlert v-if="successMessage" variant="success" show>{{ successMessage }}</BAlert>

              <BRow>
                <BCol cols="12">
                  <div class="mb-3">
                    <label for="productName" class="form-label"> Product Name <span class="text-danger">*</span> </label>
                    <BFormInput id="productName" v-model="form.title" type="text" placeholder="Enter product name" required />
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
                    <label for="description" class="form-label"> Product Description <span class="text-muted">(Optional)</span> </label>
                    
                      <QuillEditor v-model:content="form.description" content-type="html" :options="{ toolbar: [['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block', { list: 'ordered' }, 'link', 'image']] }" theme="snow" />
                    
                  </div>
                </BCol>
              </BRow>
            </BCardBody>
          </BCard>

          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Product Image</h4>
              <p class="text-muted mb-0">To upload a product image, please use the option below to select and upload the relevant file.</p>
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
              <h4 class="card-title mb-1">Pricing</h4>
              <p class="text-muted mb-0">Set the base price and applicable discount for the product using the options below..</p>
            </BCardHeader>

            <BCardBody>
              <div class="mb-3">
                <label for="basePrice" class="form-label"
                  >Base Price <span class="text-danger"><span class="text-danger">*</span></span></label
                >
                <div class="app-search">
                  <BFormInput id="basePrice" v-model.number="form.price" type="number" placeholder="Enter base price (e.g., 199.99)" />
                  <Icon icon="dollar-sign" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-3">
                <label for="discount" class="form-label">Discount Type <span class="text-muted">(Optional)</span></label>
                <div class="app-search">
                  <BFormSelect v-model="discountType" id="discount" placeholder="Choose Discount" class="form-control my-1 my-md-0">
                    <option value="All">Choose Discount</option>
                    <option value="none">No Discount</option>
                    <option value="flat">Flat Discount</option>
                    <option value="percentage">Percentage Discount</option>
                  </BFormSelect>
                  <Icon icon="badge-percent" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-0">
                <label for="discountValue" class="form-label">Discount Value <span class="text-muted">(Optional)</span></label>
                <div class="app-search">
                  <BFormInput id="discountValue" v-model.number="form.discount" type="number" placeholder="Enter discount amount or percentage" />
                  <Icon icon="tag" class="app-search-icon text-muted" />
                </div>
              </div>
            </BCardBody>
          </BCard>

          <BCard no-body>
            <BCardHeader class="d-block p-3">
              <h4 class="card-title mb-1">Organize</h4>
              <p class="text-muted mb-0">Organize your product by selecting the appropriate brand, category, status, and tags.</p>
            </BCardHeader>

            <div class="card-body">
              <div class="mb-3">
                <label for="brand" class="form-label">Brand</label>
                <div class="app-search">
                  <input v-model="form.brandName" type="text" class="form-control" id="brand" placeholder="Enter brand name" />
                  <Icon icon="layers" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-3">
                <label for="category" class="form-label">Category <span class="text-danger">*</span></label>
                <div class="app-search">
                  <BFormSelect v-model="category" class="form-control my-1 my-md-0" id="category">
                    <option value="All">Choose Category</option>
                    <option v-for="item in categories" :key="item.slug" :value="item.name">{{ item.name }}</option>
                  </BFormSelect>
                  <Icon icon="layout-grid" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-3">
                <label for="statusOne" class="form-label">Status <span class="text-danger">*</span></label>
                <div class="app-search">
                  <BFormSelect v-model="status" class="form-control my-1 my-md-0" id="statusOne">
                    <option value="All">Choose Status</option>
                    <option value="Published">Published</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Schedule">Schedule</option>
                    <option value="Draft">Draft</option>
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
import { getCategories } from '~/services/categories.service'
import { createProduct } from '~/services/products.service'
import { useAuth } from '~/composables/useAuth'

const category = ref('All')
const status = ref('All')
const discountType = ref('All')
const categories = ref<{ name: string; slug: string }[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)

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
  condition: '',
  size: '',
  productUrl: '',
})

const selectedCategory = computed(() => (category.value === 'All' ? '' : category.value))

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
    condition: '',
    size: '',
    productUrl: '',
  }
  category.value = 'All'
  status.value = 'All'
  discountType.value = 'All'
  error.value = null
  successMessage.value = null
}

const loadCategories = async () => {
  categories.value = (await getCategories()).map((item) => ({
    name: item.categoryName || item.name || item.slug,
    slug: item.slug,
  }))
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
      price: Number(form.value.price),
      published,
      reference: form.value.reference.trim() || undefined,
      condition: form.value.condition.trim() || undefined,
      size: form.value.size.trim() || undefined,
      productUrl: form.value.productUrl.trim() || undefined,
      stock: Number(form.value.stock || 0),
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

onMounted(loadCategories)
</script>
