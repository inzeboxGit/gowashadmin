<template>
  <section class="form-section w-100" style="max-width: 1000px;">
    <header class="section-heading mb-4">
      <div class="section-icon bg-info-subtle text-info">
        <Icon icon="file-text" />
      </div>
      <div>
        <h5 class="mb-1">Textes & Libelles Application</h5>
        <p class="text-muted mb-0">Modifier individuellement chaque libelle du document <code>apps</code>. Chaque champ possède son bouton Mettre a jour.</p>
      </div>
    </header>

    <div class="mb-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
      <div class="position-relative flex-grow-1" style="max-width: 400px;">
        <BFormInput
          v-model="searchQuery"
          type="search"
          placeholder="Rechercher un cle ou un texte..."
        />
      </div>
      <span class="badge bg-light text-dark border p-2">
        {{ filteredEntries.length }} texte(s) disponible(s)
      </span>
    </div>

    <div v-if="isLoading" class="py-5 text-center">
      <BSpinner small class="me-2" /> Chargement des textes...
    </div>

    <div v-else-if="filteredEntries.length === 0" class="py-4 text-center text-muted">
      Aucun texte ne correspond a votre recherche.
    </div>

    <div v-else class="text-fields-list">
      <div
        v-for="item in filteredEntries"
        :key="item.key"
        class="card mb-3 shadow-none border"
      >
        <div class="card-body p-3">
          <div class="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2 mb-2">
            <div>
              <span class="badge bg-primary-subtle text-primary font-monospace me-2">{{ item.key }}</span>
              <span v-if="item.isArray" class="badge bg-warning-subtle text-warning fs-xs">Liste (virgules)</span>
            </div>
            <div class="d-flex align-items-center gap-2">
              <span v-if="savedKey === item.key" class="text-success fs-xs fw-semibold">
                <Icon icon="check-circle" class="me-1" /> Mis a jour !
              </span>
              <BButton
                variant="outline-primary"
                size="sm"
                :disabled="savingKey !== null"
                @click="saveSingle(item.key)"
              >
                <Icon icon="save" class="me-1" />
                {{ savingKey === item.key ? 'Mise a jour...' : 'Mettre a jour' }}
              </BButton>
            </div>
          </div>

          <div v-if="item.isArray">
            <BFormInput
              v-model="textValues[item.key]"
              placeholder="Separez les valeurs par une virgule"
            />
          </div>
          <div v-else-if="isLongText(textValues[item.key])">
            <BFormTextarea
              v-model="textValues[item.key]"
              rows="2"
            />
          </div>
          <div v-else>
            <BFormInput
              v-model="textValues[item.key]"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { BButton, BFormInput, BFormTextarea, BSpinner } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import { getAllAppTexts, saveAppTextKey } from '~/services/settings.service'

const textValues = ref<Record<string, any>>({})
const isLoading = ref(true)
const searchQuery = ref('')
const savingKey = ref<string | null>(null)
const savedKey = ref<string | null>(null)

const loadTexts = async () => {
  isLoading.value = true
  try {
    const data = await getAllAppTexts()
    const formatted: Record<string, any> = {}
    for (const [k, v] of Object.entries(data)) {
      if (Array.isArray(v)) {
        formatted[k] = v.join(', ')
      } else {
        formatted[k] = v ?? ''
      }
    }
    textValues.value = formatted
  } catch (error) {
    console.error('Error loading app texts', error)
  } finally {
    isLoading.value = false
  }
}

const entries = computed(() => {
  return Object.keys(textValues.value).map((key) => {
    const isArray = key === 'dailyLabels' || key === 'monthlyLabels'
    return {
      key,
      isArray,
    }
  })
})

const filteredEntries = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()
  if (!query) return entries.value
  return entries.value.filter((item) => {
    const val = String(textValues.value[item.key] || '').toLowerCase()
    return item.key.toLowerCase().includes(query) || val.includes(query)
  })
})

const isLongText = (val: any) => {
  return typeof val === 'string' && val.length > 50
}

const saveSingle = async (key: string) => {
  savingKey.value = key
  savedKey.value = null
  try {
    let valueToSave = textValues.value[key]
    if (key === 'dailyLabels' || key === 'monthlyLabels') {
      valueToSave = String(valueToSave)
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean)
    }
    await saveAppTextKey(key, valueToSave)
    savedKey.value = key
    setTimeout(() => {
      if (savedKey.value === key) {
        savedKey.value = null
      }
    }, 3000)
  } catch (error) {
    console.error(`Error saving ${key}`, error)
  } finally {
    savingKey.value = null
  }
}

onMounted(loadTexts)
</script>

<style scoped>
.text-fields-list {
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 4px;
}
</style>
