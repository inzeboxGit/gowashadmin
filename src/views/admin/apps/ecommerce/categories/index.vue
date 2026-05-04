<template>
  <PageBreadcrumb title="Categories" subtitle="Ecommerce" />

  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput type="search" placeholder="Search category..." v-model="searchQuery" />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton v-if="selected.length" variant="danger" @click="handleDeleteSelected"> Delete </BButton>
          </div>

          <div class="d-flex align-items-center gap-1">
            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="status" class="form-control my-1 my-md-0">
                <option value="All">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </BFormSelect>
              <Icon icon="circle-small" class="app-search-icon text-muted" />
            </div>

            <BButton variant="primary" class="ms-1" v-b-modal.addCategoryModal>
              <Icon icon="plus" class="fs-sm me-2" /> Add Category
            </BButton>
          </div>
        </BCardHeader>

        <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

        <BTable show-empty :busy="loading" empty-text="Nothing found." v-model:selected-rows="selected"
          thead-class="bg-light align-middle bg-opacity-25 thead-sm" hover :fields="fields" :items="filteredCategories"
          :per-page="perPage" :current-page="currentPage" responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100">
          <template #table-busy>
            <div class="text-center text-muted my-4">
              <BSpinner small class="me-2" />
              Chargement des categories...
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
          <template #cell(name)="{ item }">
            <div class="d-flex align-items-center">
              <div class="avatar-md me-3">
                <img :src="item.image" alt="Product" class="img-fluid rounded" />
              </div>
              <div>
                <h5 class="mb-0">
                  <RouterLink to="/apps/ecommerce/product-details" class="link-reset">{{ item.name }}</RouterLink>
                </h5>
              </div>
            </div>
          </template>
          <template #cell(products)="{ item }">
            <h5 class="fs-base mb-0 fw-medium">{{ item.products }}</h5>
          </template>
          <template #cell(lastModified)="{ item }">
            {{ item.lastModifiedDate }} <small class="text-muted">{{ item.lastModifiedTime }}</small>
          </template>
          <template #cell(status)="{ item }">
            <span class="badge fs-xxs" :class="item.status == 'active' ? 'badge-soft-success' : 'badge-soft-danger'">{{
              toPascalCase(item.status) }}</span>
          </template>
          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="eye" class="fs-lg" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="square-pen" class="fs-lg" @click="openEditCategoryModal(item)" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="trash-2" class="fs-lg" @click="handleDeleteItem(item)" />
              </BButton>
            </div>
          </template>
        </BTable>
        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows"
            label="categories" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <BModal id="addCategoryModal" v-model="showAddCategoryModal" centered size="lg" :title="modalTitle"
    :ok-title="modalOkTitle" cancel-variant="light" :ok-disabled="addCategoryLoading" @ok="handleSubmitCategory">
    <BAlert v-if="addCategoryError" variant="danger" show>{{ addCategoryError }}</BAlert>

    <BRow class="g-3">
      <BCol md="6">
        <BFormGroup label="Category Name" label-for="categoryName" label-class="form-label">
          <BFormInput id="categoryName" v-model="categoryForm.categoryName" class="form-control" placeholder="e.g. Electronics" required />
        </BFormGroup>
      </BCol>

      <BCol md="6">
        <BFormGroup label="Slug" label-for="categorySlug" label-class="form-label">
          <BFormInput id="categorySlug" v-model="categoryForm.slug" class="form-control" placeholder="e.g. electronics" required />
        </BFormGroup>
      </BCol>

      <BCol md="12">
        <BFormGroup label="Category Image" label-for="categoryImage" label-class="form-label">
          <BFormFile id="categoryImage" v-model="categoryForm.imageFile" class="form-control" accept="image/*" />
        </BFormGroup>
      </BCol>

      <BCol md="6">
        <BFormGroup label="Status" label-for="categoryStatus" label-class="form-label">
          <BFormSelect id="categoryStatus" v-model="categoryForm.status" class="form-select" required :options="[
            { value: '', text: 'Select Status' },
            { value: 'active', text: 'Active' },
            { value: 'inactive', text: 'Inactive' },
          ]" />
        </BFormGroup>
      </BCol>

      <BCol md="12">
        <BFormGroup label="Description (Optional)" label-for="categoryDescription" label-class="form-label">
          <BFormTextarea id="categoryDescription" v-model="categoryForm.description" class="form-control" rows="3"
            placeholder="Brief description of the category..." />
        </BFormGroup>
      </BCol>
    </BRow>
  </BModal>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BAlert, BCard, BCardFooter, BCardHeader, BCol, BFormFile, BFormGroup, BFormSelect, BFormTextarea, BModal, BRow, BSpinner, type TableFieldRaw } from 'bootstrap-vue-next'
import { vBModal } from 'bootstrap-vue-next/directives/BModal'
import { computed, onMounted, ref, watch } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { createProductCategory, getCategories, updateProductCategory } from '~/services/categories.service'
import type { ProductCategory } from '~/types/category'
import { toPascalCase } from '~/utils/helpers'
import type { CategoryType } from './components/data'

type CategoryTableItem = CategoryType & {
  id: string
  description?: string
  imageUrl?: string
}

const fields: Exclude<TableFieldRaw<CategoryTableItem>, string>[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Category Name', sortable: true },
  { key: 'slug', label: 'Slug', sortable: true },
  { key: 'products', label: 'Products', sortable: true },
  { key: 'orders', label: 'Orders', sortable: true },
  { key: 'earnings', label: 'Earnings', sortable: true },
  { key: 'lastModified', label: 'Last Modified', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'action', label: 'Action', sortable: false },
]

const status = ref('All')
const searchQuery = ref('')

const perPageOptions = [5, 8, 10, 20, 50]

const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(0)
const categories = ref<CategoryTableItem[]>([])
const loading = ref(false)
const error = ref<string | null>(null)
const showAddCategoryModal = ref(false)
const addCategoryLoading = ref(false)
const addCategoryError = ref<string | null>(null)
const editingCategoryId = ref<string | null>(null)
const categoryForm = ref({
  categoryName: '',
  slug: '',
  description: '',
  status: '' as ProductCategory['status'] | '',
  imageFile: null as File | null,
  currentImageUrl: '',
})

const modalTitle = computed(() => (editingCategoryId.value ? 'Edit Category' : 'Add New Category'))
const modalOkTitle = computed(() => (editingCategoryId.value ? 'Update Category' : 'Add Category'))

const filteredCategories = computed(() => {
  const normalizedSearch = searchQuery.value.trim().toLowerCase()

  return categories.value.filter((categoryItem) => {
    const matchesSearch =
      !normalizedSearch ||
      categoryItem.name.toLowerCase().includes(normalizedSearch) ||
      categoryItem.slug.toLowerCase().includes(normalizedSearch) ||
      categoryItem.id.toLowerCase().includes(normalizedSearch)

    const matchesStatus = status.value === 'All' || toPascalCase(categoryItem.status) === status.value

    return matchesSearch && matchesStatus
  })
})

const normalizeDateValue = (value?: ProductCategory['createdAt']) => {
  if (!value) {
    return null
  }

  if (typeof value === 'string') {
    return value
  }

  if (value instanceof Date) {
    return value
  }

  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') {
    return value.toDate()
  }

  return String(value)
}

const formatDateParts = (value?: ProductCategory['createdAt']) => {
  const normalizedValue = normalizeDateValue(value)

  if (!normalizedValue) {
    return {
      date: '-',
      time: '',
    }
  }

  const date = normalizedValue instanceof Date ? normalizedValue : new Date(normalizedValue)

  if (Number.isNaN(date.getTime())) {
    const fallbackValue = String(normalizedValue)

    return {
      date: fallbackValue.split('T')[0] || fallbackValue,
      time: '',
    }
  }

  return {
    date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  }
}

const formatCurrency = (value: number | string | undefined) => {
  if (typeof value === 'string') return value
  if (typeof value !== 'number') return '0'

  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 2,
  }).format(value)
}

const mapCategoryToTableItem = (categoryItem: ProductCategory): CategoryTableItem => {
  const lastModified = formatDateParts(categoryItem.lastModified || categoryItem.updatedAt || categoryItem.createdAt)

  return {
    id: categoryItem.id,
    name: categoryItem.categoryName || categoryItem.name || categoryItem.slug || categoryItem.id,
    slug: categoryItem.slug || categoryItem.id,
    image: categoryItem.imageUrl || '/images/products/1.png',
    imageUrl: categoryItem.imageUrl || '',
    description: categoryItem.description || '',
    products: categoryItem.products ?? 0,
    orders: `${categoryItem.orders ?? 0}`,
    earnings: formatCurrency(categoryItem.earnings),
    lastModifiedDate: lastModified.date,
    lastModifiedTime: lastModified.time,
    status: categoryItem.status || 'inactive',
  }
}

const loadCategories = async () => {
  try {
    loading.value = true
    error.value = null
    categories.value = (await getCategories()).map(mapCategoryToTableItem)
    totalRows.value = filteredCategories.value.length
  } catch (err) {
    console.error('[categories] Failed to load categories', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger les categories.'
  } finally {
    loading.value = false
  }
}

const resetCategoryForm = () => {
  categoryForm.value = {
    categoryName: '',
    slug: '',
    description: '',
    status: '',
    imageFile: null,
    currentImageUrl: '',
  }
  editingCategoryId.value = null
  addCategoryError.value = null
}

const slugify = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

const openEditCategoryModal = (item: CategoryTableItem) => {
  editingCategoryId.value = item.id
  categoryForm.value = {
    categoryName: item.name,
    slug: item.slug,
    description: item.description || '',
    status: item.status,
    imageFile: null,
    currentImageUrl: item.imageUrl || '',
  }
  addCategoryError.value = null
  showAddCategoryModal.value = true
}

const handleSubmitCategory = async (event: Event) => {
  event.preventDefault()

  try {
    addCategoryLoading.value = true
    addCategoryError.value = null

    const categoryName = categoryForm.value.categoryName.trim()
    const slug = categoryForm.value.slug.trim() || slugify(categoryName)

    if (!categoryName || !slug || !categoryForm.value.status) {
      addCategoryError.value = 'Category name, slug et status sont obligatoires.'
      return
    }

    if (editingCategoryId.value) {
      await updateProductCategory({
        id: editingCategoryId.value,
        categoryName,
        slug,
        description: categoryForm.value.description.trim(),
        status: categoryForm.value.status,
        imageFile: categoryForm.value.imageFile,
        currentImageUrl: categoryForm.value.currentImageUrl,
      })
    } else {
      await createProductCategory({
        categoryName,
        slug,
        description: categoryForm.value.description.trim(),
        status: categoryForm.value.status,
        imageFile: categoryForm.value.imageFile,
      })
    }

    resetCategoryForm()
    showAddCategoryModal.value = false
    await loadCategories()
  } catch (err) {
    console.error('[categories] Failed to create category', err)
    addCategoryError.value = err instanceof Error ? err.message : 'Impossible de creer la categorie.'
  } finally {
    addCategoryLoading.value = false
  }
}

function adjustPage() {
  const totalPages = Math.ceil(filteredCategories.value.length / perPage.value)
  if (currentPage.value > totalPages) {
    currentPage.value = totalPages || 1
  }
}

function handleDeleteItem(item: CategoryTableItem) {
  deleteItem(item)
  totalRows.value = filteredCategories.value.length
  adjustPage()
}

function handleDeleteSelected() {
  deleteSelected()
  totalRows.value = filteredCategories.value.length
  adjustPage()
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(categories)

watch([filteredCategories, perPage], () => {
  totalRows.value = filteredCategories.value.length
  currentPage.value = 1
})

onMounted(loadCategories)
</script>

<style scoped></style>
