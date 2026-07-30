<!-- eslint-disable -->
<template>
  <BCard no-body>
    <BCardHeader class="border-light">
      <h5 class="card-title mb-0 d-flex align-items-center gap-2">
        <Icon icon="user" class="text-info" />
        Envoi client
      </h5>
    </BCardHeader>
    <BCardBody>
      <BForm @submit.prevent="handleSend">
        <BRow class="mb-3">
          <BCol md="12">
            <div class="mb-3">
              <label class="form-label d-block">Mode d'envoi</label>
              <BFormRadioGroup
                v-model="sendMode"
                :options="sendModeOptions"
                name="clientSendMode"
                inline
                class="d-flex gap-4"
              />
            </div>
          </BCol>
        </BRow>

        <BRow class="mb-3">
          <BCol md="12">
            <div class="mb-3">
              <label class="form-label">Titre <span class="text-danger">*</span></label>
              <BFormInput v-model="form.title" placeholder="Titre de la notification" required />
            </div>
          </BCol>
        </BRow>

        <BRow v-if="sendMode === 'custom'" class="mb-3">
          <BCol md="12">
            <div class="mb-3">
              <label class="form-label">Client(s) spécifique(s) <span class="text-danger">*</span></label>
              <Multiselect
                v-model="selectedRecipients"
                :options="recipients"
                track-by="value"
                label="label"
                placeholder="Sélectionner un ou plusieurs clients..."
                :searchable="true"
                :allow-empty="false"
                :multiple="true"
                select-label=""
                deselect-label=""
                selected-label="✓"
              />
            </div>
          </BCol>
        </BRow>

        <BRow class="mb-3">
          <BCol md="12">
            <div class="mb-3">
              <label class="form-label">Message <span class="text-danger">*</span></label>
              <BFormTextarea
                v-model="form.message"
                rows="3"
                placeholder="Contenu de la notification client..."
                required
              />
            </div>
          </BCol>
        </BRow>

        <BRow class="mb-3">
          <BCol md="6">
            <div class="mb-3">
              <label class="form-label">Type</label>
              <BFormSelect v-model="form.type" :options="typeOptions" />
            </div>
          </BCol>
          <BCol md="6">
            <div class="mb-3">
              <label class="form-label">URL Image (optionnel)</label>
              <BFormInput v-model="form.imageUrl" placeholder="https://..." />
            </div>
          </BCol>
        </BRow>

        <div class="d-flex justify-content-end">
          <BButton type="submit" variant="info" :disabled="sending">
            <BSpinner v-if="sending" small class="me-2" />
            <Icon v-else icon="send" class="me-2" />
            Envoyer aux clients
          </BButton>
        </div>
      </BForm>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Multiselect from 'vue-multiselect'
import { sendClientNotification } from '~/services/push-notifications-client.service'

type RecipientOption = {
  value: string
  label: string
}

defineProps<{
  recipients: RecipientOption[]
}>()

const emit = defineEmits<{
  (event: 'sent', message: string): void
  (event: 'error', message: string): void
}>()

const sending = ref(false)
const sendMode = ref<'broadcast' | 'custom'>('broadcast')
const selectedRecipients = ref<RecipientOption[]>([])

const sendModeOptions = [
  { text: 'Tous les clients', value: 'broadcast' },
  { text: 'Clients spécifiques', value: 'custom' },
]

const typeOptions = [
  { value: '', text: 'Général' },
  { value: 'promo', text: 'Promotion' },
  { value: 'info', text: 'Information' },
  { value: 'alert', text: 'Alerte' },
  { value: 'update', text: 'Mise à jour' },
]

const form = ref({
  title: '',
  message: '',
  type: '',
  imageUrl: '',
})

const resetForm = () => {
  form.value = { title: '', message: '', type: '', imageUrl: '' }
  selectedRecipients.value = []
  sendMode.value = 'broadcast'
}

const handleSend = async () => {
  if (sendMode.value === 'custom' && !selectedRecipients.value.length) {
    emit('error', 'Veuillez sélectionner au moins un client.')
    return
  }

  sending.value = true
  try {
    await sendClientNotification({
      title: form.value.title,
      message: form.value.message,
      sentBy: 'admin',
      sentTo:
        sendMode.value === 'custom'
          ? selectedRecipients.value.map((recipient) => recipient.value).join(',')
          : 'all',
      type: form.value.type,
      imageUrl: form.value.imageUrl || undefined,
      forUsers: 'client',
    })

    resetForm()
    emit('sent', 'Notification client envoyée avec succès !')
  } catch (e) {
    emit(
      'error',
      e instanceof Error && e.message
        ? e.message
        : "Erreur lors de l'envoi de la notification client.",
    )
    console.error(e)
  } finally {
    sending.value = false
  }
}
</script>
