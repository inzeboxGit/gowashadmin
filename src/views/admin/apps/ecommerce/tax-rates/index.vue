<template>
  <PageBreadcrumb title="Gestion de TVA" subtitle="Market Place" />

  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <div class="app-search">
            <BFormInput v-model="searchQuery" type="search" placeholder="Rechercher un taux de TVA..." />
            <Icon icon="search" class="app-search-icon text-muted" />
          </div>

          <BButton variant="primary" v-b-modal.taxRateModal @click="resetForm">
            <Icon icon="plus" class="fs-sm me-2" /> Ajouter un taux
          </BButton>
        </BCardHeader>

        <BAlert v-if="error" variant="danger" show class="m-3 mb-0">{{ error }}</BAlert>

        <BTable
          show-empty
          :busy="loading"
          empty-text="Aucun taux de TVA trouvé."
          thead-class="bg-light align-middle bg-opacity-25 thead-sm"
          hover
          :fields="fields"
          :items="filteredTaxRates"
          responsive
          class="table table-custom table-nowrap table-centered mb-0 w-100"
        >
          <template #table-busy>
            <div class="text-center text-muted my-4"><BSpinner small class="me-2" /> Chargement des taux de TVA...</div>
          </template>
          <template #head()="data"><span class="text-uppercase fs-xxs">{{ data.label }}</span></template>
          <template #head(action)><span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span></template>
          <template #cell(rate)="{ item }"><strong>{{ formatRate(item.rate) }}</strong></template>
          <template #cell(lastModified)="{ item }">{{ formatDate(item.updatedAt || item.createdAt) }}</template>
          <template #cell(status)="{ item }">
            <span class="badge fs-xxs" :class="item.isActive ? 'badge-soft-success' : 'badge-soft-danger'">
              {{ item.isActive ? 'Actif' : 'Inactif' }}
            </span>
          </template>
          <template #cell(action)="{ item }">
            <div class="d-flex justify-content-center gap-1">
              <BButton size="sm" class="btn-default btn-icon rounded-circle" aria-label="Modifier" @click="openEditModal(item)">
                <Icon icon="square-pen" class="fs-lg" />
              </BButton>
              <BButton size="sm" class="btn-default btn-icon rounded-circle" aria-label="Supprimer" :disabled="deletingId === item.id" @click="removeTaxRate(item)">
                <Icon icon="trash-2" class="fs-lg" />
              </BButton>
            </div>
          </template>
        </BTable>
      </BCard>
    </BCol>
  </BRow>

  <BModal id="taxRateModal" v-model="showModal" centered :title="modalTitle" :ok-title="modalOkTitle" cancel-variant="light" :ok-disabled="saving" @ok="saveTaxRate">
    <BAlert v-if="formError" variant="danger" show>{{ formError }}</BAlert>
    <BRow class="g-3">
      <BCol md="7">
        <BFormGroup label="Libellé" label-for="taxRateName" label-class="form-label">
          <BFormInput id="taxRateName" v-model="form.name" placeholder="Ex. TVA standard" required />
        </BFormGroup>
      </BCol>
      <BCol md="5">
        <BFormGroup label="Taux (%)" label-for="taxRateValue" label-class="form-label">
          <BFormInput id="taxRateValue" v-model.number="form.rate" type="number" min="0" max="100" step="0.01" required />
        </BFormGroup>
      </BCol>
      <BCol md="12">
        <BFormGroup label="Statut" label-for="taxRateStatus" label-class="form-label">
          <BFormSelect id="taxRateStatus" v-model="form.isActive" :options="statusOptions" />
        </BFormGroup>
      </BCol>
    </BRow>
  </BModal>
</template>

<script setup lang="ts">
import { BAlert, BButton, BCard, BCardHeader, BCol, BFormGroup, BFormInput, BFormSelect, BModal, BRow, BSpinner, BTable, type TableFieldRaw } from 'bootstrap-vue-next'
import { vBModal } from 'bootstrap-vue-next/directives/BModal'
import { computed, onMounted, ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { createTaxRate, deleteTaxRate, getTaxRates, updateTaxRate } from '~/services/tax-rates.service'
import type { TaxRate } from '~/types/tax-rate'

const fields: Exclude<TableFieldRaw<TaxRate>, string>[] = [
  { key: 'name', label: 'Libellé', sortable: true },
  { key: 'rate', label: 'Taux de TVA', sortable: true },
  { key: 'lastModified', label: 'Dernière modification', sortable: true },
  { key: 'status', label: 'Statut', sortable: true },
  { key: 'action', label: 'Actions', sortable: false },
]

const taxRates = ref<TaxRate[]>([])
const searchQuery = ref('')
const loading = ref(false)
const saving = ref(false)
const deletingId = ref<string | null>(null)
const error = ref<string | null>(null)
const formError = ref<string | null>(null)
const showModal = ref(false)
const editingId = ref<string | null>(null)
const form = ref({ name: '', rate: 20, isActive: true })
const statusOptions = [{ value: true, text: 'Actif' }, { value: false, text: 'Inactif' }]

const modalTitle = computed(() => editingId.value ? 'Modifier le taux de TVA' : 'Ajouter un taux de TVA')
const modalOkTitle = computed(() => editingId.value ? 'Mettre à jour' : 'Ajouter')
const filteredTaxRates = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  return !query ? taxRates.value : taxRates.value.filter((item) => item.name.toLowerCase().includes(query) || String(item.rate).includes(query))
})

const formatRate = (rate: number) => `${new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 2 }).format(rate)} %`
const formatDate = (value?: TaxRate['createdAt']) => {
  if (!value) return '-'
  const date = value instanceof Date ? value : typeof value === 'object' && 'toDate' in value && typeof value.toDate === 'function' ? value.toDate() : new Date(value as string)
  return Number.isNaN(date.getTime()) ? '-' : date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
}

const loadTaxRates = async () => {
  try {
    loading.value = true
    error.value = null
    taxRates.value = await getTaxRates()
  } catch (err) {
    console.error('[tax-rates] Failed to load tax rates', err)
    error.value = err instanceof Error ? err.message : 'Impossible de charger les taux de TVA.'
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  editingId.value = null
  form.value = { name: '', rate: 20, isActive: true }
  formError.value = null
}

const openEditModal = (item: TaxRate) => {
  editingId.value = item.id
  form.value = { name: item.name, rate: item.rate, isActive: item.isActive }
  formError.value = null
  showModal.value = true
}

const saveTaxRate = async (event: Event) => {
  event.preventDefault()
  const name = form.value.name.trim()
  const rate = Number(form.value.rate)
  if (!name || !Number.isFinite(rate) || rate < 0 || rate > 100) {
    formError.value = 'Saisissez un libellé et un taux compris entre 0 et 100 %.'
    return
  }

  try {
    saving.value = true
    formError.value = null
    const input = { name, rate, isActive: form.value.isActive }
    if (editingId.value) await updateTaxRate(editingId.value, input)
    else await createTaxRate(input)
    showModal.value = false
    await loadTaxRates()
  } catch (err) {
    console.error('[tax-rates] Failed to save tax rate', err)
    formError.value = err instanceof Error ? err.message : 'Impossible d’enregistrer le taux de TVA.'
  } finally {
    saving.value = false
  }
}

const removeTaxRate = async (item: TaxRate) => {
  if (!window.confirm(`Supprimer le taux « ${item.name} » ?`)) return
  try {
    deletingId.value = item.id
    error.value = null
    await deleteTaxRate(item.id)
    taxRates.value = taxRates.value.filter((taxRate) => taxRate.id !== item.id)
  } catch (err) {
    console.error('[tax-rates] Failed to delete tax rate', err)
    error.value = err instanceof Error ? err.message : 'Impossible de supprimer le taux de TVA.'
  } finally {
    deletingId.value = null
  }
}

onMounted(loadTaxRates)
</script>
