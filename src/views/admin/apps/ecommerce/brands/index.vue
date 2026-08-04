<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageBreadcrumb title="Marques" subtitle="Ecommerce" />

  <BAlert v-if="successMessage" variant="success" dismissible show class="mb-3" @closed="successMessage = null">
    {{ successMessage }}
  </BAlert>

  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="d-flex gap-2">
            <div class="app-search">
              <BFormInput type="search" placeholder="Rechercher une marque..." v-model="searchQuery" />
              <Icon icon="search" class="app-search-icon text-muted" />
            </div>

            <BButton v-if="selected.length" variant="danger" :disabled="deletingSelected" @click="handleDeleteSelected">
              <BSpinner v-if="deletingSelected" small class="me-1" />
              Supprimer
            </BButton>
          </div>

          <div class="d-flex align-items-center gap-1">
            <div>
              <BFormSelect v-model="perPage" :options="perPageOptions" class="form-control my-1 my-md-0" />
            </div>

            <div class="app-search">
              <BFormSelect v-model="status" class="form-control my-1 my-md-0">
                <option value="All">Tous</option>
                <option value="Active">Actif</option>
                <option value="Inactive">Inactif</option>
              </BFormSelect>
              <Icon icon="circle-small" class="app-search-icon text-muted" />
            </div>

            <BButton variant="primary" class="ms-1" v-b-modal.addBrandModal>
              <Icon icon="plus" class="fs-sm me-2" /> Ajouter une marque
            </BButton>
          </div>
        </BCardHeader>

        <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

        <BTable
          show-empty
          :busy="loading"
          empty-text="Nothing found."
          v-model:selected-rows="selected"
          thead-class="bg-light align-middle bg-opacity-25 thead-sm"
          hover
          :fields="fields"
          :items="filteredBrands"
          :per-page="perPage"
          :current-page="currentPage"
          responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100"
        >
          <template #table-busy>
            <div class="text-center text-muted my-4">
              <BSpinner small class="me-2" />
              Chargement des marques...
            </div>
          </template>

          <template #head()="data">
            <span class="text-uppercase fs-xxs">{{ data.label }}</span>
          </template>
          <template #head(id)>
            <input class="form-check-input form-check-input-light fs-14 mt-0" type="checkbox" id="select-all-brands" value="option" :checked="allSelected" :indeterminate="isIndeterminate" @change="toggleSelectAll" />
          </template>
          <template #head(action)>
            <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
          </template>
          <template #cell(id)="data">
            <input class="form-check-input form-check-input-light fs-14 product-item-check mt-0" type="checkbox" :value="data.item" :checked="selected.includes(data.item)" @change="onToggleRow(data.item, $event)" />
          </template>
          <template #cell(name)="{ item }">
            <div class="d-flex align-items-center">
              <div class="avatar-md me-3">
                <img :src="item.logo || '/images/products/1.png'" alt="Brand" class="img-fluid rounded" />
              </div>
              <div>
                <h5 class="mb-0">{{ item.name }}</h5>
                <p class="text-muted mb-0 fs-xxs">{{ item.description || '-' }}</p>
              </div>
            </div>
          </template>
          <template #cell(lastModified)="{ item }">
            {{ item.lastModifiedDate }} <small class="text-muted">{{ item.lastModifiedTime }}</small>
          </template>
          <template #cell(status)="{ item }">
            <span class="badge fs-xxs" :class="item.isActive ? 'badge-soft-success' : 'badge-soft-danger'">
              {{ item.isActive ? 'Active' : 'Inactive' }}
            </span>
          </template>
          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="eye" class="fs-lg" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle">
                <Icon icon="square-pen" class="fs-lg" @click="openEditBrandModal(item)" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle" aria-label="Supprimer" :disabled="deletingId === item.id" @click="handleDeleteItem(item)">
                <BSpinner v-if="deletingId === item.id" small />
                <Icon v-else icon="trash-2" class="fs-lg" />
              </BButton>
            </div>
          </template>
        </BTable>

        <BCardFooter class="border-0">
          <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="brands" />
        </BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <BModal id="addBrandModal" v-model="showBrandModal" centered size="lg" :title="modalTitle" :ok-title="modalOkTitle" cancel-variant="light" :ok-disabled="brandLoading" @ok="handleSubmitBrand">
    <BAlert v-if="brandError" variant="danger" show>{{ brandError }}</BAlert>

    <BRow class="g-3">
      <BCol md="6">
        <BFormGroup label="Nom de la marque" label-for="brandName" label-class="form-label">
          <BFormInput id="brandName" v-model="brandForm.name" class="form-control" placeholder="ex: Toyota" required />
        </BFormGroup>
      </BCol>

      <BCol md="6">
        <BFormGroup label="Slug" label-for="brandSlug" label-class="form-label">
          <BFormInput id="brandSlug" v-model="brandForm.slug" class="form-control bg-light" placeholder="Généré automatiquement" readonly required />
        </BFormGroup>
      </BCol>

      <BCol md="12">
        <BFormGroup label="Logo de la marque" label-for="brandLogo" label-class="form-label">
          <BFormFile id="brandLogo" v-model="brandForm.logoFile" class="form-control" accept="image/*" />
        </BFormGroup>
      </BCol>

      <BCol md="6">
        <BFormGroup label="Status" label-for="brandStatus" label-class="form-label">
          <BFormSelect
            id="brandStatus"
            v-model="brandForm.isActive"
            class="form-select"
            required
            :options="[
              { value: true, text: 'Active' },
              { value: false, text: 'Inactive' },
            ]"
          />
        </BFormGroup>
      </BCol>

      <BCol md="12">
        <BFormGroup label="Description" label-for="brandDescription" label-class="form-label">
          <BFormTextarea id="brandDescription" v-model="brandForm.description" class="form-control" rows="3" placeholder="Marque automobile japonaise" />
        </BFormGroup>
      </BCol>
    </BRow>
  </BModal>
</template>

<script setup lang="ts">
import { BAlert, BButton, BCard, BCardFooter, BCardHeader, BCol, BFormFile, BFormGroup, BFormSelect, BFormTextarea, BModal, BRow, BSpinner, type TableFieldRaw } from 'bootstrap-vue-next'
import { vBModal } from 'bootstrap-vue-next/directives/BModal'
import { computed, onMounted, ref, watch } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { useTableActions } from '~/composables/useTableActions'
import { createBrand, deleteBrand, deleteBrands, getBrands, updateBrand } from '~/services/brands.service'
import type { Brand } from '~/types/brand'

type BrandTableItem = {
  id: string
  name: string
  slug: string
  logo: string
  description: string
  isActive: boolean
  lastModifiedDate: string
  lastModifiedTime: string
}

const fields: Exclude<TableFieldRaw<BrandTableItem>, string>[] = [
  { key: 'id', label: 'Id' },
  { key: 'name', label: 'Nom de la marque', sortable: true },
  { key: 'slug', label: 'Slug', sortable: true },
  { key: 'lastModified', label: 'Date de modification', sortable: true },
  { key: 'status', label: 'Statut', sortable: true },
  { key: 'action', label: 'Actions', sortable: false },
]

const status = ref('All')
const searchQuery = ref('')
const perPageOptions = [5, 8, 10, 20, 50]
const currentPage = ref(1)
const perPage = ref(8)
const totalRows = ref(0)
const brands = ref<BrandTableItem[]>([])
const loading = ref(false)
const deletingId = ref<string | null>(null)
const deletingSelected = ref(false)
const error = ref<string | null>(null)
const successMessage = ref<string | null>(null)
const showBrandModal = ref(false)
const brandLoading = ref(false)
const brandError = ref<string | null>(null)
const editingBrandId = ref<string | null>(null)
const brandForm = ref({
  name: '',
  slug: '',
  description: '',
  isActive: true,
  logoFile: null as File | null,
  currentLogo: '',
})

const modalTitle = computed(() => (editingBrandId.value ? 'Modifier la marque' : 'Ajouter une marque'))
const modalOkTitle = computed(() => (editingBrandId.value ? 'Mettre à jour la marque' : 'Ajouter une marque'))

const filteredBrands = computed(() => {
  const normalizedSearch = searchQuery.value.trim().toLowerCase()

  return brands.value.filter((brand) => {
    const matchesSearch = !normalizedSearch || brand.name.toLowerCase().includes(normalizedSearch) || brand.slug.toLowerCase().includes(normalizedSearch) || brand.id.toLowerCase().includes(normalizedSearch)
    const matchesStatus = status.value === 'All' || (status.value === 'Active' ? brand.isActive : !brand.isActive)

    return matchesSearch && matchesStatus
  })
})

const normalizeDateValue = (value?: Brand['createdAt']) => {
  if (!value) return null
  if (typeof value === 'string') return value
  if (value instanceof Date) return value
  if (typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function') return value.toDate()

  return String(value)
}

const formatDateParts = (value?: Brand['createdAt']) => {
  const normalizedValue = normalizeDateValue(value)
  if (!normalizedValue) return { date: '-', time: '' }

  const date = normalizedValue instanceof Date ? normalizedValue : new Date(normalizedValue)
  if (Number.isNaN(date.getTime())) {
    const fallbackValue = String(normalizedValue)
    return { date: fallbackValue.split('T')[0] || fallbackValue, time: '' }
  }

  return {
    date: date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' }),
    time: date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
  }
}

const mapBrandToTableItem = (brand: Brand): BrandTableItem => {
  const lastModified = formatDateParts(brand.updatedAt || brand.createdAt)

  return {
    id: brand.id,
    name: brand.name,
    slug: brand.slug,
    logo: brand.logo,
    description: brand.description,
    isActive: brand.isActive,
    lastModifiedDate: lastModified.date,
    lastModifiedTime: lastModified.time,
  }
}

const loadBrands = async () => {
  try {
    loading.value = true
    error.value = null
    brands.value = (await getBrands()).map(mapBrandToTableItem)
    totalRows.value = filteredBrands.value.length
  } catch (err) {
    console.error('[brands] Failed to load brands', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger les marques.'
  } finally {
    loading.value = false
  }
}

const resetBrandForm = () => {
  brandForm.value = {
    name: '',
    slug: '',
    description: '',
    isActive: true,
    logoFile: null,
    currentLogo: '',
  }
  editingBrandId.value = null
  brandError.value = null
}

const slugify = (value: string) => {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

const openEditBrandModal = (item: BrandTableItem) => {
  editingBrandId.value = item.id
  brandForm.value = {
    name: item.name,
    slug: item.slug,
    description: item.description,
    isActive: item.isActive,
    logoFile: null,
    currentLogo: item.logo,
  }
  brandError.value = null
  showBrandModal.value = true
}

const handleSubmitBrand = async (event: Event) => {
  event.preventDefault()

  try {
    brandLoading.value = true
    brandError.value = null

    const name = brandForm.value.name.trim()
    const slug = brandForm.value.slug.trim() || slugify(name)

    if (!name || !slug) {
      brandError.value = 'Brand name et slug sont obligatoires.'
      return
    }

    if (editingBrandId.value) {
      await updateBrand({
        id: editingBrandId.value,
        name,
        slug,
        description: brandForm.value.description.trim(),
        isActive: brandForm.value.isActive,
        logoFile: brandForm.value.logoFile,
        currentLogo: brandForm.value.currentLogo,
      })
    } else {
      await createBrand({
        name,
        slug,
        description: brandForm.value.description.trim(),
        isActive: brandForm.value.isActive,
        logoFile: brandForm.value.logoFile,
      })
    }

    resetBrandForm()
    showBrandModal.value = false
    await loadBrands()
  } catch (err) {
    console.error('[brands] Failed to save brand', err)
    brandError.value = err instanceof Error ? err.message : 'Impossible d enregistrer la marque.'
  } finally {
    brandLoading.value = false
  }
}

function adjustPage() {
  const totalPages = Math.ceil(filteredBrands.value.length / perPage.value)
  if (currentPage.value > totalPages) currentPage.value = totalPages || 1
}

const handleDeleteItem = async (item: BrandTableItem) => {
  if (!window.confirm(`Supprimer définitivement la marque « ${item.name} » ?`)) return

  try {
    deletingId.value = item.id
    error.value = null
    await deleteBrand(item.id)
    deleteItem(item)
    successMessage.value = 'Marque supprimée définitivement.'
    totalRows.value = filteredBrands.value.length
    adjustPage()
  } catch (err) {
    console.error('[brands] Failed to delete brand', err)
    error.value = err instanceof Error ? err.message : 'Impossible de supprimer la marque.'
  } finally {
    deletingId.value = null
  }
}

const handleDeleteSelected = async () => {
  const items = [...selected.value]
  if (!items.length || !window.confirm(`Supprimer définitivement les ${items.length} marque(s) sélectionnée(s) ?`)) return

  try {
    deletingSelected.value = true
    error.value = null
    await deleteBrands(items.map((item) => item.id))
    deleteSelected()
    successMessage.value = `${items.length} marque(s) supprimée(s) définitivement.`
    totalRows.value = filteredBrands.value.length
    adjustPage()
  } catch (err) {
    console.error('[brands] Failed to delete selected brands', err)
    error.value = err instanceof Error ? err.message : 'Impossible de supprimer les marques sélectionnées.'
  } finally {
    deletingSelected.value = false
  }
}

const { selected, toggleSelectAll, onToggleRow, deleteSelected, deleteItem, allSelected, isIndeterminate } = useTableActions(brands)

watch([filteredBrands, perPage], () => {
  totalRows.value = filteredBrands.value.length
  currentPage.value = 1
})

watch(() => brandForm.value.name, (name) => {
  brandForm.value.slug = slugify(name)
})

onMounted(loadBrands)
</script>
