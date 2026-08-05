<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageBreadcrumb title="Produits Boutique GoWash" subtitle="Ecommerce" />

  <BAlert v-if="successMessage" variant="success" dismissible show @closed="successMessage = null">
    {{ successMessage }}
  </BAlert>

  <BAlert v-if="showSupplierIdNotice && productsWithoutSupplierCount > 0" variant="warning" dismissible show
    @closed="showSupplierIdNotice = false">
    Note : {{ productsWithoutSupplierCount }} ancien(s) produit(s) n'ont pas encore de fournisseur. Lors de leur
    prochaine modification, il sera nécessaire de sélectionner un fournisseur avant de sauvegarder afin de garantir un
    calcul fiable du taux de transport.
  </BAlert>

  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <input type="search" class="form-control" placeholder="Rechercher un produit..." v-model="searchQuery" />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton v-if="selected.length" variant="danger" :disabled="deletingSelected" @click="handleDeleteSelected">
              <BSpinner v-if="deletingSelected" small class="me-1" />
              Supprimer
            </BButton>
          </div>

          <div class="d-flex align-items-center gap-2">
            <span class="me-2 fw-semibold">Filtrer par:</span>

            <div class="app-search">
              <BFormSelect v-model="category" class="form-control my-1 my-md-0">
                <option value="All">Catégorie</option>
                <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
              </BFormSelect>
              <Icon icon="tag" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="brand" class="form-control my-1 my-md-0">
                <option value="All">Marque</option>
                <option v-for="item in brands" :key="item" :value="item">{{ item }}</option>
              </BFormSelect>
              <Icon icon="award" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">

              <BFormSelect v-model="status" class="form-control my-1 my-md-0">
                <option value="Tout">Tous</option>
                <option value="published">Publié</option>
                <option value="pending">En attente</option>
                <option value="outOfStock">Rupture de stock</option>
              </BFormSelect>
              <Icon icon="activity" class="app-search-icon text-muted" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="priceRange" class="form-control my-1 my-md-0">
                <option value="Tous">Plage de prix</option>
                <option value="0-50">0 - 50</option>
                <option value="51-150">51 - 150</option>
                <option value="151-500">151 - 500</option>
                <option value="500+">500+</option>
              </BFormSelect>
              <Icon icon="euro-sign" class="app-search-icon text-muted" />
            </div>

            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>

            <BButton variant="light" class="my-1 my-md-0" @click="resetFilters">
              <Icon icon="x" class="fs-sm me-1" />
              Effacer les filtres
            </BButton>
          </div>

          <div class="d-flex gap-1">
            <RouterLink to="/apps/ecommerce/products-grid" class="btn btn-soft-primary btn-icon">
              <Icon icon="layout-grid" class="fs-lg" />
            </RouterLink>
            <RouterLink to="/apps/products/list" class="btn btn-primary btn-icon">
              <Icon icon="list-check" class="fs-lg" />
            </RouterLink>
            <RouterLink to="/apps/ecommerce/product-add" class="btn btn-danger ms-1">
              <Icon icon="plus" class="fs-sm me-2" /> Ajouter Produit
            </RouterLink>
            <input ref="csvInput" class="d-none" type="file" accept=".csv,text/csv" @change="handleImportCsv" />
            <BButton variant="warning" class="ms-1" :disabled="importing" @click="csvInput?.click()">
              <BSpinner v-if="importing" small class="me-2" />
              <Icon v-else icon="upload" class="fs-sm me-2" />
              Importer CSV
            </BButton>
            <BButton variant="success" class="ms-1" :disabled="exporting" @click="handleExportProducts">
              <BSpinner v-if="exporting" small class="me-2" />
              <Icon v-else icon="download" class="fs-sm me-2" />
              Exporter les produits
            </BButton>
            <!-- <BButton variant="info" class="ms-1" :disabled="assigningSuppliers" @click="handleAssignSuppliersByBrand">
              <BSpinner v-if="assigningSuppliers" small class="me-2" />
              <Icon v-else icon="truck" class="fs-sm me-2" />
              Attribuer les fournisseurs
            </BButton> -->
          </div>
        </BCardHeader>

        <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

        <BTable show-empty :busy="loading" empty-text="Aucun produit trouvé." v-model:selected-rows="selected"
          thead-class="bg-light align-middle bg-opacity-25 thead-sm" hover :fields="fields" :items="filteredProducts"
          :per-page="perPage" :current-page="currentPage" responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100">
          <template #table-busy>
            <div class="text-center text-muted my-4">
              <BSpinner small class="me-2" />
              Chargement des produits...
            </div>
          </template>

          <template #head()="data">
            <span class="text-uppercase fs-xxs">{{ data.label }}</span>
          </template>
          <template #head(id)>
            <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" id="select-all-products"
              value="option" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
          </template>
          <template #head(action)>
            <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
          </template>
          <template #cell(id)="data">
            <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox"
              :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
          </template>
          <template #cell(name)="data">
            <div class="d-flex">
              <div class="avatar-md me-3">
                <img :src="data.item.image" alt="Produit" class="img-fluid rounded" />
              </div>
              <div>
                <h5 class="mb-1">
                  <RouterLink :to="`/apps/ecommerce/product-details/${data.item.id}`" class="link-reset">{{ data.item.name }} </RouterLink>
                </h5>
                <p v-if="data.item.color" class="text-muted mb-0 fs-xxs d-flex align-items-center gap-1">
                  <span class="product-color-swatch" :style="{ backgroundColor: data.item.color }" />
                  {{ data.item.color }}
                </p>
                <p v-else class="text-muted mb-0 fs-xxs">Couleur non définie</p>
              </div>
            </div>
          </template>

          <template #cell(supplier)="{ item }">
            <span v-if="item.supplierId">{{ supplierNamesById[item.supplierId] || 'Fournisseur introuvable' }}</span>
            <span v-else class="text-muted">-</span>
          </template>

          <template #cell(stock)="data">
            <h5 class="fs-base mb-0 fw-medium">{{ data.item.stock }}</h5>
          </template>

          <template #cell(price)="data"> {{ data.item.price }} </template>

          <template #cell(priceExcludingTax)="data"> {{ data.item.priceExcludingTax }} </template>

          <template #cell(tvaRate)="data">
            <span v-if="data.item.tvaRate > 0" class="badge badge-soft-info fs-xxs">{{ data.item.tvaRate }} %</span>
            <span v-else class="text-muted">-</span>
          </template>

          <template #cell(basePrice)="data"> {{ data.item.basePrice }} </template>

          <template #cell(rating)="data">
            <Rating :rating="data.item.rating" class="d-inline-flex justify-content-start gap-1" />
            <RouterLink to="/apps/ecommerce/reviews" class="link-reset ms-1 fw-semibold"> ({{ data.item.reviews }})
            </RouterLink>
          </template>

          <template #cell(status)="data">
            <span class="badge fs-xxs"
              :class="data.item.status == 'published' ? 'badge-soft-success' : data.item.status == 'pending' ? 'badge-soft-warning' : 'badge-soft-danger'">{{
                toPascalCase(data.item.status) }}</span>
          </template>

          <template #cell(publishDate)="data">
            {{ data.item.date }} <small class="text-muted">{{ data.item.time }}</small>
          </template>

          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <BButton size="sm" class="btn-default btn-icon rounded-circle" @click="router.push(`/apps/ecommerce/product-details/${item.id}`)">
                <Icon icon="eye" class="fs-lg" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle" @click="router.push(`/apps/ecommerce/product-edit/${item.id}`)">
                <Icon icon="square-pen" class="fs-lg" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle" aria-label="Supprimer" :disabled="deletingId === item.id" @click="handleDeleteItem(item)">
                <BSpinner v-if="deletingId === item.id" small />
                <Icon v-else icon="trash-2" class="fs-lg" />
              </BButton>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows"
            label="products" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { useRoute, useRouter } from 'vue-router'
import { BAlert, BButton, BCard, BCardFooter, BCardHeader, BCol, BFormSelect, BRow, BSpinner, BTable } from 'bootstrap-vue-next'
import { computed, onMounted, ref, watch } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Rating from '~/components/Rating.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { getBrands } from '~/services/brands.service'
import { getCategories } from '~/services/categories.service'
import { assignSuppliersByBrand, bulkImportProducts, deleteProduct, deleteProducts, getProducts } from '~/services/products.service'
import { getSuppliers } from '~/services/suppliers.service'
import { toPascalCase } from '~/utils/helpers'
import type { Product } from '~/types/product'

type ProductTableItem = {
  id: string
  image: string
  name: string
  brand: string
  color: string
  sku: string
  category: string
  stock: number
  price: string
  priceExcludingTax: string
  basePrice: string
  numericPrice: number
  orders: number
  rating: number
  reviews: number
  status: 'published' | 'pending' | 'out-of-stock'
  tvaRate: number
  supplierId: string
  date: string
  time: string
}

const category = ref('All')
const brand = ref('All')
const status = ref('All')
const priceRange = ref('All')

const fields = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Produit', sortable: true },
  { key: 'brand', label: 'Marque', sortable: true },
  { key: 'supplier', label: 'Fournisseur', sortable: false },
  { key: 'sku', label: 'SKU' },
  { key: 'category', label: 'Catégorie' },
  { key: 'stock', label: 'Stock', sortable: true },
  { key: 'priceExcludingTax', label: 'Prix HT', sortable: true },
  { key: 'price', label: 'Prix TTC', sortable: true },
  { key: 'tvaRate', label: 'Taux TVA', sortable: true },
  { key: 'basePrice', label: 'Prix TTC', sortable: true },
  { key: 'orders', label: 'Commandes', sortable: true },
  { key: 'rating', label: 'Évaluation', sortable: true },
  { key: 'status', label: 'Statut', sortable: true },
  { key: 'publishDate', label: 'Published', sortable: true },
  { key: 'action', label: 'Action', sortable: false },
]

const searchQuery = ref('')

const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(0)
const products = ref<ProductTableItem[]>([])
const categories = ref<string[]>([])
const brands = ref<string[]>([])
const supplierNamesById = ref<Record<string, string>>({})
const loading = ref(false)
const importing = ref(false)
const exporting = ref(false)
const assigningSuppliers = ref(false)
const deletingId = ref<string | null>(null)
const deletingSelected = ref(false)
const csvInput = ref<HTMLInputElement | null>(null)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const showSupplierIdNotice = ref(true)
const route = useRoute()
const router = useRouter()

const productCategories = computed(() => {
  return [...new Set(products.value.map((product) => product.category).filter(Boolean))].sort()
})

const productBrands = computed(() => {
  return [...new Set(products.value.map((product) => product.brand).filter(Boolean))].sort()
})

const productsWithoutSupplierCount = computed(() => products.value.filter((product) => !product.supplierId).length)

const normalizeBrandForFilter = (value: string) => value.trim().toLowerCase().replace(/\s+/g, '_')

// Les anciennes données peuvent utiliser « Lavage », « Lavages » ou des variantes
// de casse. Le filtre les considère comme une même catégorie.
const normalizeCategoryForFilter = (value: string) => value
  .trim()
  .toLocaleLowerCase('fr-FR')
  .replace(/s$/, '')

const resetFilters = () => {
  searchQuery.value = ''
  category.value = 'All'
  brand.value = 'All'
  status.value = 'All'
  priceRange.value = 'All'
  currentPage.value = 1
}

const loadCategories = async () => {
  try {
    const firestoreCategories = await getCategories()
    categories.value = firestoreCategories
      .map((categoryItem) => categoryItem.categoryName || categoryItem.name || categoryItem.slug || categoryItem.id)
      .filter((categoryName): categoryName is string => Boolean(categoryName))
      .sort((a, b) => a.localeCompare(b, 'fr'))
  } catch (err) {
    console.error('[products] Failed to load categories', err)
    categories.value = []
  }
}

const loadBrands = async () => {
  try {
    const firestoreBrands = await getBrands()
    brands.value = firestoreBrands
      .map((brandItem) => brandItem.name || brandItem.slug || brandItem.id)
      .filter((brandName): brandName is string => Boolean(brandName))
      .sort((a, b) => a.localeCompare(b, 'fr'))
  } catch (err) {
    console.error('[products] Failed to load brands', err)
    brands.value = []
  }
}

const loadSupplierNames = async () => {
  try {
    const suppliers = await getSuppliers()
    supplierNamesById.value = Object.fromEntries(suppliers.map((supplier) => [supplier.id, supplier.name]))
  } catch (err) {
    console.error('[products] Failed to load suppliers', err)
    supplierNamesById.value = {}
  }
}

const filteredProducts = computed(() => {
  const normalizedSearch = searchQuery.value.trim().toLowerCase()

  return products.value.filter((product) => {
    const matchesSearch =
      !normalizedSearch ||
      product.name.toLowerCase().includes(normalizedSearch) ||
      product.brand.toLowerCase().includes(normalizedSearch) ||
      product.category.toLowerCase().includes(normalizedSearch) ||
      product.id.toLowerCase().includes(normalizedSearch)

    const matchesCategory = category.value === 'All' ||
      normalizeCategoryForFilter(product.category) === normalizeCategoryForFilter(category.value)
    const matchesBrand = brand.value === 'All' || normalizeBrandForFilter(product.brand) === normalizeBrandForFilter(brand.value)
    const matchesStatus = status.value === 'All' || toPascalCase(product.status) === status.value
    const matchesPriceRange =
      priceRange.value === 'All' ||
      (priceRange.value === '0-50' && product.numericPrice <= 50) ||
      (priceRange.value === '51-150' && product.numericPrice >= 51 && product.numericPrice <= 150) ||
      (priceRange.value === '151-500' && product.numericPrice >= 151 && product.numericPrice <= 500) ||
      (priceRange.value === '500+' && product.numericPrice > 500)

    return matchesSearch && matchesCategory && matchesBrand && matchesStatus && matchesPriceRange
  })
})

const formatDateParts = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return {
      date: value.split('T')[0] || '-',
      time: '',
    }
  }

  return {
    date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  }
}

const mapProductToTableItem = (product: Product): ProductTableItem => {
  const publishedDate = formatDateParts(product.createdAt)

  return {
    id: product.id,
    image: product.imageUrl || '/images/products/1.png',
    name: product.title,
    brand: product.brandName,
    color: product.color || '',
    sku: product.id,
    category: product.category,
    stock: product.stock ?? 0,
    price: `${product.price}`,
    priceExcludingTax: `${product.priceExcludingTax ?? product.price}`,
    basePrice: `${product.basePrice ?? product.price}`,
    numericPrice: product.price,
    orders: 0,
    rating: 0,
    reviews: 0,
    status: product.published ? 'published' : 'pending',
    tvaRate: product.tvaRate ?? product.taxRate ?? 0,
    supplierId: product.supplierId || '',
    date: publishedDate.date,
    time: publishedDate.time,
  }
}

const csvColumns = ['title', 'brandName', 'category', 'color', 'reference', 'stock', 'condition', 'size', 'description', 'price', 'oldPrice', 'discount', 'productUrl', 'imageUrl', 'published', 'laveurId']
const exportCsvColumns = [
  'id', 'title', 'brandName', 'category', 'color', 'reference', 'stock', 'condition', 'size', 'description',
  'price', 'priceExcludingTax', 'basePrice', 'oldPrice', 'discount', 'productUrl', 'imageUrl', 'galleryUrls',
  'published', 'laveurId', 'supplierId', 'taxAmount', 'taxRate', 'taxRateId', 'taxRateName', 'tvaRate', 'weightKg',
  'createdAt', 'updatedAt',
] as const

const parseCsv = (content: string) => {
  const firstLine = content.split(/\r?\n/, 1)[0] || ''
  const delimiter = firstLine.includes('\t') ? '\t' : firstLine.split(';').length > firstLine.split(',').length ? ';' : ','
  const rows: string[][] = []
  let row: string[] = []
  let value = ''
  let quoted = false

  for (let index = 0; index < content.length; index += 1) {
    const character = content[index]
    if (character === '"') {
      if (quoted && content[index + 1] === '"') { value += '"'; index += 1 } else quoted = !quoted
    } else if (character === delimiter && !quoted) {
      row.push(value.trim()); value = ''
    } else if ((character === '\n' || character === '\r') && !quoted) {
      if (character === '\r' && content[index + 1] === '\n') index += 1
      row.push(value.trim())
      if (row.some(Boolean)) rows.push(row)
      row = []; value = ''
    } else value += character
  }
  row.push(value.trim())
  if (row.some(Boolean)) rows.push(row)
  return rows
}

const parseNumber = (value: string, fallback = 0) => {
  const number = Number(value.replace(',', '.'))
  return Number.isFinite(number) ? number : fallback
}

const parseOptionalNumber = (value: string) => value.trim() === '' ? null : parseNumber(value)

const parsePublished = (value: string) => {
  const normalizedValue = value.trim().toLowerCase()
  return normalizedValue === '' ? null : ['true', '1', 'oui', 'yes'].includes(normalizedValue)
}

const escapeCsvValue = (value: unknown) => {
  const stringValue = Array.isArray(value) ? JSON.stringify(value) : String(value ?? '')
  return `"${stringValue.replaceAll('"', '""')}"`
}

const handleExportProducts = async () => {
  try {
    exporting.value = true
    error.value = null
    successMessage.value = null
    const productsToExport = await getProducts()
    const rows = productsToExport.map((product) => exportCsvColumns.map((column) => escapeCsvValue(product[column])).join(';'))
    const csv = `\uFEFF${exportCsvColumns.join(';')}\n${rows.join('\n')}`
    const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }))
    const link = document.createElement('a')

    link.href = url
    link.download = `produits-${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
    URL.revokeObjectURL(url)
    successMessage.value = `${productsToExport.length} produit(s) exporté(s) dans le fichier CSV.`
  } catch (err) {
    console.error('[products] CSV export failed', err)
    error.value = err instanceof Error ? err.message : 'Impossible d exporter les produits.'
  } finally {
    exporting.value = false
  }
}

const handleImportCsv = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return

  try {
    importing.value = true
    error.value = null
    successMessage.value = null
    const rows = parseCsv(await file.text())
    if (rows.length < 2) throw new Error('Le fichier CSV ne contient aucune ligne de produit.')

    const headers = rows[0].map((header) => header.replace(/^\uFEFF/, '').trim())
    const missingColumns = csvColumns.filter((column) => !headers.includes(column))
    if (missingColumns.length) throw new Error(`Colonnes manquantes : ${missingColumns.join(', ')}.`)

    const headerIndex = Object.fromEntries(headers.map((header, index) => [header, index])) as Record<string, number>
    const productsToImport = rows.slice(1).map((row, index) => {
      const value = (column: string) => row[headerIndex[column]] || ''
      const title = value('title').trim()
      const category = value('category').trim()
      const price = parseNumber(value('price'), Number.NaN)
      if (!title || !Number.isFinite(price)) throw new Error(`Ligne ${index + 2} : title et price sont obligatoires.`)

      return {
        title,
        brandName: value('brandName').trim(),
        category,
        color: value('color').trim(),
        reference: value('reference').trim(),
        stock: parseOptionalNumber(value('stock')),
        condition: value('condition').trim(),
        size: value('size').trim(),
        description: value('description'),
        price,
        priceExcludingTax: price,
        basePrice: price,
        oldPrice: parseOptionalNumber(value('oldPrice')),
        discount: parseOptionalNumber(value('discount')),
        productUrl: value('productUrl').trim(),
        imageUrl: value('imageUrl').trim(),
        published: parsePublished(value('published')),
        laveurId: value('laveurId').trim(),
      }
    })

    await bulkImportProducts(productsToImport)
    successMessage.value = `${productsToImport.length} produits importés avec succès.`
    await loadProducts()
  } catch (err) {
    console.error('[products] CSV import failed', err)
    error.value = err instanceof Error ? err.message : "Erreur lors de l'import du fichier CSV."
  } finally {
    importing.value = false
    input.value = ''
  }
}

const handleAssignSuppliersByBrand = async () => {
  const confirmed = window.confirm(
    'Attribuer les fournisseurs aux produits des marques de_witte, starc et virtus ? Les supplierId existants pour ces marques seront remplacés.',
  )
  if (!confirmed) return

  try {
    assigningSuppliers.value = true
    error.value = null
    successMessage.value = null
    const updatedCount = await assignSuppliersByBrand()
    successMessage.value = `${updatedCount} produit(s) mis à jour avec leur fournisseur.`
    await loadProducts()
  } catch (err) {
    console.error('[products] Failed to assign suppliers by brand', err)
    error.value = err instanceof Error ? err.message : 'Impossible d attribuer les fournisseurs aux produits.'
  } finally {
    assigningSuppliers.value = false
  }
}

const loadProducts = async () => {
  try {
    loading.value = true
    error.value = null
    const productItems = await getProducts()
    products.value = productItems.map(mapProductToTableItem)
    await Promise.all([loadCategories(), loadBrands(), loadSupplierNames()])
    if (!categories.value.length) {
      categories.value = productCategories.value
    }
    if (!brands.value.length) {
      brands.value = productBrands.value
    }
    totalRows.value = filteredProducts.value.length
  } catch (err) {
    console.error('[products] Failed to load products', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger les produits.'
  } finally {
    loading.value = false
  }
}

function adjustPage() {
  const totalPages = Math.ceil(filteredProducts.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

const handleDeleteItem = async (item: ProductTableItem) => {
  if (!window.confirm(`Supprimer définitivement le produit « ${item.name} » ?`)) return

  try {
    deletingId.value = item.id
    error.value = null
    await deleteProduct(item.id)
    deleteItem(item)
    successMessage.value = 'Produit supprimé définitivement.'
    totalRows.value = filteredProducts.value.length
    adjustPage()
  } catch (err) {
    console.error('[products] Failed to delete product', err)
    error.value = err instanceof Error ? err.message : 'Impossible de supprimer le produit.'
  } finally {
    deletingId.value = null
  }
}

const handleDeleteSelected = async () => {
  const items = [...selected.value]
  if (!items.length || !window.confirm(`Supprimer définitivement les ${items.length} produit(s) sélectionné(s) ?`)) return

  try {
    deletingSelected.value = true
    error.value = null
    await deleteProducts(items.map((item) => item.id))
    deleteSelected()
    successMessage.value = `${items.length} produit(s) supprimé(s) définitivement.`
    totalRows.value = filteredProducts.value.length
    adjustPage()
  } catch (err) {
    console.error('[products] Failed to delete selected products', err)
    error.value = err instanceof Error ? err.message : 'Impossible de supprimer les produits sélectionnés.'
  } finally {
    deletingSelected.value = false
  }
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(products)

watch([filteredProducts, perPage], () => {
  totalRows.value = filteredProducts.value.length
  currentPage.value = 1
})

onMounted(() => {
  const success = route.query.success

  if (typeof success === 'string') {
    successMessage.value = success
    router.replace({ path: route.path, query: { ...route.query, success: undefined } })
  }

  loadProducts()
})
</script>

<style scoped>
.product-color-swatch {
  width: 0.75rem;
  height: 0.75rem;
  border: 1px solid var(--bs-border-color);
  border-radius: 50%;
}
</style>
