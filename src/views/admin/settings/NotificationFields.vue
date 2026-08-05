<template>
  <section class="form-section">
    <header class="section-heading">
      <div class="section-icon bg-success-subtle text-success"><Icon icon="bell-ring" /></div>
      <div><h5 class="mb-1">{{ title }}</h5><p class="text-muted mb-0">Parametres de diffusion OneSignal.</p></div>
    </header>
    <BRow class="g-3">
      <BCol md="6"><BFormGroup label="OneSignal App ID"><BFormInput v-model="config.oneSignalAppId" /></BFormGroup></BCol>
      <BCol md="6"><BFormGroup label="API Key"><BFormInput v-model="config.oneSignalApiKey" type="password" placeholder="****************" autocomplete="new-password" /></BFormGroup></BCol>
      <BCol md="6"><BFormGroup label="URL de base"><BFormInput v-model="config.oneSignalBaseUrl" type="url" /></BFormGroup></BCol>
      <BCol md="6"><BFormGroup label="Icone Android"><BFormInput v-model="config.oneSignalAndroidIcon" /></BFormGroup></BCol>
      <BCol md="6"><BFormGroup label="Son Android"><BFormInput v-model="config.oneSignalAndroidSound" /></BFormGroup></BCol>
      <BCol md="6"><BFormGroup label="Son iOS"><BFormInput v-model="config.oneSignalIosSound" /></BFormGroup></BCol>
      <BCol md="6"><BFormGroup label="Lien logo 1"><BFormInput v-model="config.oneSignalLogoLink1" type="url" /></BFormGroup></BCol>
      <BCol md="6"><BFormGroup label="Lien logo 2"><BFormInput v-model="config.oneSignalLogoLink2" type="url" /></BFormGroup></BCol>
    </BRow>
    <div class="mt-4 text-end">
      <BButton variant="primary" :disabled="isLoading || isSaving" @click="emit('save')">
        <Icon icon="save" class="me-1" />
        {{ isSaving ? 'Sauvegarde...' : 'Sauvegarder' }}
      </BButton>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { BButton, BCol, BFormGroup, BFormInput, BRow } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import type { OneSignalNotifConfig } from '~/types/notif-config'

const props = defineProps<{
  modelValue: OneSignalNotifConfig
  title: string
  isSaving?: boolean
  isLoading?: boolean
}>()

const emit = defineEmits<{
  'update:modelValue': [value: OneSignalNotifConfig]
  save: []
}>()

const config = computed({
  get: () => props.modelValue,
  set: (value: OneSignalNotifConfig) => emit('update:modelValue', value)
})
</script>

<style scoped>
.form-section { max-width: 980px; }
.section-heading { display: flex; align-items: center; gap: .875rem; margin-bottom: 1.75rem; }
.section-icon { width: 2.5rem; height: 2.5rem; display: grid; place-items: center; border-radius: .375rem; font-size: 1.2rem; }
</style>
