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
              <h4 class="card-title mb-1">Image produit</h4>
              <p class="text-muted mb-0">Laissez vide pour conserver l'image actuelle.</p>
            </BCardHeader>

            <BCardBody>
              <div v-if="currentImageUrl" class="mb-3">
                <img :src="currentImageUrl" alt="Image actuelle" class="img-thumbnail" style="max-height: 150px;" />
                <p class="text-muted mt-1 mb-0 fs-xs">Image actuelle</p>
              </div>
              <FileUploader v-model="form.images" />
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
                <label for="basePrice" class="form-label">Prix de base <span class="text-danger">*</span></label>
                <div class="app-search">
                  <BFormInput id="basePrice" v-model.number="form.price" type="number" placeholder="Ex: 19.99" />
                  <Icon icon="euro" class="app-search-icon text-muted" />
                </div>
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
                <div class="app-search">
                  <input v-model="form.brandName" type="text" class="form-control" id="brand" placeholder="Nom de la marque" />
                  <Icon icon="layers" class="app-search-icon text-muted" />
                </div>
              </div>

              <div class="mb-3">
                <label for="category" class="form-label">Catégorie <span class="text-danger">*</span></label>
                <div class="app-search">
                  <BFormSelect v-model="category" class="form-control my-1 my-md-0" id="category">
                    <option value="">Choisir une catégorie</option>
                    <option v-for="item in categories" :key="item.slug" :value="item.name">{{ item.name }}</option>
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
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FileUploader from '~/components/FileUploader.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { getCategories } from '~/services/categories.service'
import { getProductById, updateProduct } from '~/services/products.service'

const route = useRoute()
const router = useRouter()

const categories = ref<{ name: string; slug: string }[]>([])
const category = ref('')
const loading = ref(false)
const loadingProduct = ref(true)
const fetchError = ref<string | null>(null)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const currentImageUrl = ref('')

const form = ref({
  title: '',
  reference: '',
  stock: 0,
  condition: '',
  size: '',
  productUrl: '',
  description: '',
  images: [] as File[],
  price: 0,
  oldPrice: 0,
  discount: 0,
  brandName: '',
  published: false,
})

const goBack = () => router.push(`/apps/ecommerce/product-details/${route.params.id}`)

const loadCategories = async () => {
  categories.value = (await getCategories()).map((item) => ({
    name: item.categoryName || item.name || item.slug,
    slug: item.slug,
  }))
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
      brandName: form.value.brandName.trim(),
      category: category.value,
      condition: form.value.condition.trim() || undefined,
      description: form.value.description,
      discount: Number(form.value.discount || 0),
      imageFile: form.value.images[0] || null,
      imageUrl: currentImageUrl.value,
      oldPrice: Number(form.value.oldPrice || 0),
      price: Number(form.value.price),
      productUrl: form.value.productUrl.trim() || undefined,
      published: form.value.published,
      reference: form.value.reference.trim() || undefined,
      size: form.value.size.trim() || undefined,
      stock: Number(form.value.stock || 0),
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
  await loadCategories()
  try {
    const product = await getProductById(route.params.id as string)
    if (!product) { fetchError.value = 'Produit introuvable.'; return }

    currentImageUrl.value = product.imageUrl
    category.value = product.category
    form.value = {
      title: product.title,
      reference: product.reference || '',
      stock: product.stock ?? 0,
      condition: product.condition || '',
      size: product.size || '',
      productUrl: product.productUrl || '',
      description: product.description,
      images: [],
      price: product.price,
      oldPrice: product.oldPrice,
      discount: product.discount,
      brandName: product.brandName,
      published: product.published,
    }
  } catch {
    fetchError.value = 'Erreur lors du chargement du produit.'
  } finally {
    loadingProduct.value = false
  }
})
</script>

<style scoped></style>
