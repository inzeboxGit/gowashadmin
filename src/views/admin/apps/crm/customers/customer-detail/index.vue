<template>
  <PageBreadcrumb title="Fiche Client" subtitle="CRM Go Wash" />

  <!-- Loading state -->
  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Chargement...</span>
    </div>
    <p class="mt-2 text-muted">Chargement de la fiche client...</p>
  </div>

  <!-- Not found -->
  <div v-else-if="!client" class="text-center py-5">
    <Icon icon="user-x" class="fs-1 text-muted mb-3" />
    <h5 class="text-muted">Client introuvable</h5>
    <RouterLink to="/apps/crm/customers" class="btn btn-primary mt-2">
      <Icon icon="arrow-left" class="me-1" /> Retour à la liste
    </RouterLink>
  </div>

  <!-- Content -->
  <div v-else class="client-detail-wrapper pb-5">
    <!-- Top bar -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <RouterLink to="/apps/crm/customers" class="btn btn-link text-decoration-none p-0 d-flex align-items-center text-muted">
        <Icon icon="arrow-left" class="me-2 fs-sm" /> Retour aux clients
      </RouterLink>

      <div class="d-flex gap-2">
        <button 
          class="btn d-flex align-items-center gap-2" 
          :class="client.isVerified ? 'btn-soft-warning' : 'btn-soft-success'" 
          @click="toggleVerification"
        >
          <Icon :icon="client.isVerified ? 'shield-alert' : 'shield-check'" class="fs-sm" />
          {{ client.isVerified ? 'Désactiver Vérification' : 'Marquer comme Vérifié' }}
        </button>
        
        <button class="btn btn-outline-danger d-flex align-items-center gap-2" @click="deleteCustomer">
          <Icon icon="trash-2" class="fs-sm" /> Supprimer
        </button>
      </div>
    </div>

    <!-- Hero Banner Minimalist -->
    <div class="minimal-hero mb-4">
      <div class="hero-cover rounded-4 overflow-hidden position-relative bg-gradient-primary">
        <div class="hero-gradient-overlay"></div>
      </div>
      
      <div class="hero-content d-flex flex-column flex-md-row align-items-md-end px-4">
        <div class="hero-avatar shadow-sm bg-white rounded-circle p-1 flex-shrink-0">
          <div class="w-100 h-100 bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fs-1 fw-bold">
            {{ client.fullName?.charAt(0) || client.name?.charAt(0) || 'C' }}
          </div>
        </div>
        
        <div class="hero-text pt-3 pt-md-0 ms-md-4 flex-grow-1 pb-1">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
            <div>
              <h3 class="fw-bold mb-1 d-flex align-items-center gap-2 text-dark">
                {{ client.fullName || client.name || 'Client sans nom' }}
                <span v-if="client.isVerified || client.emailVerified" class="text-success fs-sm" title="Vérifié">
                  <Icon icon="badge-check" />
                </span>
              </h3>
              <p class="text-muted mb-2 mb-md-0">{{ client.email || 'Aucune adresse email' }}</p>
            </div>
            
            <div class="d-flex gap-2 align-items-center">
               <span class="badge" :class="client.isVerified || client.emailVerified ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'">
                 {{ client.isVerified || client.emailVerified ? 'Compte Vérifié' : 'En attente de vérification' }}
               </span>
            </div>
          </div>
          
          <!-- Key Stats inline -->
          <div class="d-flex align-items-center gap-4 mt-3 pt-2 border-top border-light-subtle">
             <div class="d-flex align-items-center gap-2">
               <Icon icon="shopping-bag" class="text-primary fs-5" />
               <div class="lh-sm">
                 <div class="fw-bold fs-6">{{ reservations.length }}</div>
                 <div class="text-muted fs-xs text-uppercase letter-spacing-1">Commandes</div>
               </div>
             </div>
             <div class="d-flex align-items-center gap-2">
               <Icon icon="banknote" class="text-success fs-5" />
               <div class="lh-sm">
                 <div class="fw-bold fs-6">{{ totalSpent.toFixed(2) }} MAD</div>
                 <div class="text-muted fs-xs text-uppercase letter-spacing-1">Total Dépensé</div>
               </div>
             </div>
             <div class="d-flex align-items-center gap-2">
               <Icon icon="message-square" class="text-info fs-5" />
               <div class="lh-sm">
                 <div class="fw-bold fs-6">{{ reviews.length }}</div>
                 <div class="text-muted fs-xs text-uppercase letter-spacing-1">Avis laissés</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <BRow class="g-4">
      <!-- Info Card Sidebar -->
      <BCol lg="4">
        <div class="minimal-card mb-4 bg-white p-4 rounded-4 shadow-sm">
          <h6 class="fw-bold mb-4 d-flex align-items-center text-dark"><Icon icon="user" class="me-2 text-muted" /> Informations personnelles</h6>
          <div class="info-list-minimal">
            <div class="info-item mb-3 d-flex flex-column pb-2 border-bottom border-light">
              <span class="info-lbl text-muted fs-xs fw-semibold text-uppercase mb-1">Nom complet</span>
              <span class="info-val fw-bold text-dark">{{ client.fullName || '—' }}</span>
            </div>
            <div class="info-item mb-3 d-flex flex-column pb-2 border-bottom border-light">
              <span class="info-lbl text-muted fs-xs fw-semibold text-uppercase mb-1">Email</span>
              <span class="info-val fw-bold text-dark">{{ client.email || '—' }}</span>
            </div>
            <div class="info-item mb-3 d-flex flex-column pb-2 border-bottom border-light">
              <span class="info-lbl text-muted fs-xs fw-semibold text-uppercase mb-1">Téléphone</span>
              <span class="info-val fw-bold text-dark">{{ client.phoneNumber || '—' }}</span>
            </div>
            <div class="info-item mb-3 d-flex flex-column pb-2 border-bottom border-light">
              <span class="info-lbl text-muted fs-xs fw-semibold text-uppercase mb-1">Ville</span>
              <span class="info-val fw-bold text-dark">
                <Icon icon="map-pin" class="me-1 text-muted" />
                {{ client.city || '—' }}
              </span>
            </div>
            <div class="info-item mb-3 d-flex flex-column pb-2 border-bottom border-light">
              <span class="info-lbl text-muted fs-xs fw-semibold text-uppercase mb-1">Genre</span>
              <span class="info-val fw-bold text-dark">{{ client.gender || '—' }}</span>
            </div>
            <div class="info-item mb-3 d-flex flex-column pb-2 border-bottom border-light">
              <span class="info-lbl text-muted fs-xs fw-semibold text-uppercase mb-1">Date d'inscription</span>
              <span class="info-val text-dark">{{ formatDate(client.createdAt) }}</span>
            </div>
            <div class="info-item d-flex flex-column">
              <span class="info-lbl text-muted fs-xs fw-semibold text-uppercase mb-1">Dernière Connexion</span>
              <span class="info-val text-dark">{{ formatDate(client.lastLogin) }}</span>
            </div>
          </div>
        </div>
      </BCol>

      <!-- Main Tabs Content -->
      <BCol lg="8">
        <div class="minimal-card p-0 overflow-hidden mb-4 bg-white rounded-4 shadow-sm">
          <!-- Custom Tabs Header -->
          <div class="d-flex border-bottom bg-light bg-opacity-50 px-4 pt-3 gap-4 custom-tabs">
            <button 
              class="btn-tab pb-3 fw-bold d-flex align-items-center bg-transparent border-0" 
              :class="{ 'active text-primary border-bottom border-2 border-primary': activeTab === 'commandes' }"
              @click="activeTab = 'commandes'"
            >
              <Icon icon="shopping-bag" class="me-2" /> Commandes 
              <span class="badge rounded-pill bg-info text-white ms-2">{{ reservations.length }}</span>
            </button>
            <button 
              class="btn-tab pb-3 fw-bold d-flex align-items-center bg-transparent border-0" 
              :class="{ 'active text-primary border-bottom border-2 border-primary': activeTab === 'avis' }"
              @click="activeTab = 'avis'"
            >
              <Icon icon="message-square" class="me-2" /> Avis laissés 
              <span class="badge rounded-pill bg-warning text-white ms-2">{{ reviews.length }}</span>
            </button>
          </div>
          
          <div class="p-4">
            <!-- Commandes Tab -->
            <div v-show="activeTab === 'commandes'">
              <div v-if="loadingReservations" class="text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
                <div class="text-muted mt-2 fs-sm">Chargement des commandes...</div>
              </div>
              
              <div v-else-if="reservations.length" class="table-responsive">
                <table class="table table-hover table-custom table-nowrap table-centered mb-0 align-middle">
                  <thead class="bg-light bg-opacity-50 text-uppercase fs-xxs fw-bold text-muted border-bottom">
                    <tr>
                      <th class="ps-3 py-3">Référence</th>
                      <th class="py-3">Date</th>
                      <th class="py-3">Forfait / Service</th>
                      <th class="py-3">Laveur</th>
                      <th class="py-3">Total</th>
                      <th class="py-3">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="res in reservations" :key="res.id" class="fs-sm">
                      <td class="ps-3 py-3 fw-medium text-dark">
                        {{ res.referenceCode || '#' + res.id.substring(0, 6) }}
                      </td>
                      <td class="py-3">
                        <div class="fw-semibold text-dark">{{ formatDate(res.scheduledAt || res.createdAt) }}</div>
                        <div class="text-muted fs-xxs">{{ formatTime(res.scheduledAt || res.createdAt) }}</div>
                      </td>
                      <td class="py-3">
                        <div class="fw-medium text-dark">{{ res.packageName || res.serviceSnapshot?.name || '—' }}</div>
                        <div class="text-muted fs-xs" v-if="res.addonNames?.length">
                          + {{ res.addonNames.join(', ') }}
                        </div>
                      </td>
                      <td class="py-3 text-muted">
                        {{ res.serviceSnapshot?.washerName || res.washerSnapshot?.name || '—' }}
                      </td>
                      <td class="py-3 fw-bold text-dark">
                        {{ res.serviceSnapshot?.totalPrice || res.serviceSnapshot?.price || 0 }} MAD
                      </td>
                      <td class="py-3">
                        <span class="badge fs-xxs" :class="getReservationStatusBadgeClass(res.serviceSnapshot?.status || res.status)">
                          {{ translateReservationStatus(res.serviceSnapshot?.status || res.status) }}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div v-else class="text-center py-5">
                <Icon icon="shopping-bag" class="fs-1 text-muted mb-3 opacity-25" />
                <h5 class="fw-bold text-dark">Aucune commande</h5>
                <p class="text-muted fs-sm mx-auto" style="max-width: 400px;">Aucune réservation ou commande n'a été enregistrée pour ce client pour le moment.</p>
              </div>
            </div>

            <!-- Avis Tab -->
            <div v-show="activeTab === 'avis'">
              <div v-if="loadingReviews" class="text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
                <div class="text-muted mt-2 fs-sm">Chargement des avis...</div>
              </div>
              
              <div v-else-if="reviews.length" class="review-list-minimal">
                <div v-for="(review, i) in reviews" :key="i" class="review-item-minimal pb-3 mb-3 border-bottom border-light">
                  <div class="d-flex align-items-start gap-3">
                    <div class="w-32 h-32 rounded-circle bg-light d-flex align-items-center justify-content-center text-muted fs-xs fw-bold flex-shrink-0">
                      <Icon icon="message-square" class="fs-xs" />
                    </div>
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <div class="fw-semibold fs-sm text-dark">
                          Avis pour: <span class="text-primary">{{ review.washerName || 'Laveur' }}</span>
                        </div>
                        <div class="d-flex gap-1">
                          <Icon v-for="n in 5" :key="n" icon="star" class="fs-xs" :class="n <= (review.rating || 0) ? 'text-warning' : 'text-muted opacity-25'" />
                        </div>
                      </div>
                      <div class="text-muted fs-xs mb-2">{{ formatDate(review.createdAt) }}</div>
                      <p class="mb-2 fs-sm text-dark" :class="{ 'text-decoration-line-through opacity-50': review.isVisible === false }">{{ review.comment }}</p>
                      
                      <div class="d-flex justify-content-end gap-2 mt-1">
                        <button 
                          class="btn btn-sm fs-xs py-1" 
                          :class="review.isVisible !== false ? 'btn-outline-warning' : 'btn-outline-success'" 
                          @click="toggleReviewVisibility(review)"
                        >
                          <Icon :icon="review.isVisible !== false ? 'eye-off' : 'eye'" class="me-1" />
                          {{ review.isVisible !== false ? 'Masquer' : 'Afficher' }}
                        </button>
                        <button class="btn btn-sm btn-outline-danger fs-xs py-1" @click="handleDeleteReview(review)">
                          <Icon icon="trash-2" class="me-1" /> Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div v-else class="text-center py-5">
                <Icon icon="message-square" class="fs-1 text-muted mb-3 opacity-25" />
                <h5 class="fw-bold text-dark">Aucun avis</h5>
                <p class="text-muted fs-sm mx-auto" style="max-width: 400px;">Ce client n'a encore laissé aucun avis sur la plateforme.</p>
              </div>
            </div>
          </div>
        </div>
      </BCol>
    </BRow>
  </div>

  <!-- Modern Confirm Modal -->
  <BModal
    v-model="confirmModal.show"
    hide-header
    hide-footer
    centered
    content-class="border-0 shadow-lg confirm-modal-content"
  >
    <div class="text-center p-4">
      <div class="mb-4 d-flex justify-content-center">
        <div class="confirm-icon-wrapper" :class="`bg-${confirmModal.variant}-subtle text-${confirmModal.variant}`">
          <Icon :icon="confirmModal.icon" class="fs-1" />
        </div>
      </div>
      <h4 class="fw-bold mb-3 text-dark">{{ confirmModal.title }}</h4>
      <p class="text-muted mb-4 fs-sm">{{ confirmModal.message }}</p>
      
      <div class="d-flex justify-content-center gap-3">
        <button class="btn btn-light px-4 fw-medium" @click="confirmModal.show = false">{{ confirmModal.cancelText }}</button>
        <button class="btn px-4 fw-medium" :class="`btn-${confirmModal.variant}`" @click="confirmModal.onConfirm">{{ confirmModal.confirmText }}</button>
      </div>
    </div>
  </BModal>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { BCol, BRow, BModal } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { getClientById, getClientReviews, updateClient, deleteClient } from '~/services/clients.service'
import { getReservationsByUserId } from '~/services/reservations.service'
import { updateWasherReview, deleteWasherReview } from '~/services/washers.service'
import type { Client } from '~/types/client'
import type { Reservation } from '~/types/reservation'

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const loadingReviews = ref(false)
const loadingReservations = ref(false)

const client = ref<Client | null>(null)
const reviews = ref<any[]>([])
const reservations = ref<Reservation[]>([])

const activeTab = ref<'commandes' | 'avis'>('commandes')

// Confirm Modal logic
const confirmModal = ref({
  show: false,
  title: '',
  message: '',
  variant: 'primary' as 'primary' | 'danger' | 'success',
  icon: '',
  onConfirm: () => {},
  cancelText: 'Annuler',
  confirmText: 'Confirmer'
})

const showConfirm = (options: { title: string, message: string, variant: 'primary' | 'danger' | 'success', icon: string, confirmText?: string, onConfirm: () => void }) => {
  confirmModal.value = {
    show: true,
    title: options.title,
    message: options.message,
    variant: options.variant,
    icon: options.icon,
    confirmText: options.confirmText || 'Confirmer',
    cancelText: 'Annuler',
    onConfirm: () => {
      confirmModal.value.show = false
      options.onConfirm()
    }
  }
}

// Calculate total spent
const totalSpent = computed(() => {
  return reservations.value
    .filter(res => {
      const status = (res.serviceSnapshot?.status || res.status || '').toLowerCase()
      return status === 'completed'
    })
    .reduce((sum, res) => {
      const price = res.serviceSnapshot?.totalPrice || res.serviceSnapshot?.price || 0
      return sum + price
    }, 0)
})

// Toggle Verification Status
const toggleVerification = async () => {
  if (!client.value) return
  const currentStatus = client.value.isVerified || client.value.emailVerified
  const newStatus = !currentStatus
  
  showConfirm({
    title: newStatus ? 'Vérifier le compte' : 'Retirer la vérification',
    message: newStatus 
      ? 'Voulez-vous marquer ce client comme vérifié ?' 
      : 'Êtes-vous sûr de vouloir retirer le statut vérifié de ce client ?',
    variant: newStatus ? 'success' : 'warning',
    icon: newStatus ? 'shield-check' : 'shield-alert',
    confirmText: newStatus ? 'Oui, vérifier' : 'Oui, désactiver',
    onConfirm: async () => {
      if (client.value) {
        try {
          await updateClient(client.value.id, { isVerified: newStatus, emailVerified: newStatus })
          client.value.isVerified = newStatus
          client.value.emailVerified = newStatus
        } catch (e) {
          console.error('Error updating client verification status:', e)
          alert('Erreur lors de la mise à jour du statut.')
        }
      }
    }
  })
}

// Delete Client
const deleteCustomer = () => {
  showConfirm({
    title: 'Supprimer le client',
    message: 'Êtes-vous sûr de vouloir supprimer définitivement ce client ? Cette action est irréversible.',
    variant: 'danger',
    icon: 'trash-2',
    confirmText: 'Continuer',
    onConfirm: () => {
      setTimeout(() => {
        showConfirm({
          title: 'Confirmation Définitive',
          message: 'ATTENTION : Cette suppression est totale et définitive (base de données incluse). Êtes-vous absolument certain ?',
          variant: 'danger',
          icon: 'alert-triangle',
          confirmText: 'Supprimer définitivement',
          onConfirm: async () => {
            if (client.value) {
              try {
                await deleteClient(client.value.id)
                router.push('/apps/crm/customers')
              } catch (e) {
                console.error('Error deleting client:', e)
                alert('Erreur lors de la suppression du client.')
              }
            }
          }
        })
      }, 150)
    }
  })
}

// Toggle Review Visibility
const toggleReviewVisibility = async (review: any) => {
  if (!review.washerId || !review.id) return
  const newVisibility = review.isVisible === false ? true : false
  try {
    await updateWasherReview(review.washerId, review.id, { isVisible: newVisibility })
    review.isVisible = newVisibility
  } catch (e) {
    console.error('Error toggling review visibility:', e)
    alert('Erreur lors du changement de visibilité de l\'avis.')
  }
}

// Delete Review
const handleDeleteReview = (review: any) => {
  showConfirm({
    title: 'Supprimer l\'avis',
    message: 'Êtes-vous sûr de vouloir supprimer définitivement cet avis ?',
    variant: 'danger',
    icon: 'trash-2',
    confirmText: 'Supprimer',
    onConfirm: async () => {
      if (!review.washerId || !review.id) return
      try {
        await deleteWasherReview(review.washerId, review.id)
        reviews.value = reviews.value.filter(r => r.id !== review.id)
      } catch (e) {
        console.error('Error deleting review:', e)
        alert('Erreur lors de la suppression de l\'avis.')
      }
    }
  })
}

// Helpers
const formatDate = (dateVal: unknown) => {
  if (!dateVal) return '-'
  let d: Date
  if (typeof dateVal === 'string') {
    d = new Date(dateVal)
  } else if (dateVal instanceof Date) {
    d = dateVal
  } else if (typeof dateVal === 'object' && 'toDate' in dateVal && typeof dateVal.toDate === 'function') {
    d = dateVal.toDate()
  } else {
    return '-'
  }
  return isNaN(d.getTime()) ? '-' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const formatTime = (dateVal: unknown) => {
  if (!dateVal) return ''
  let d: Date
  if (typeof dateVal === 'string') {
    d = new Date(dateVal)
  } else if (dateVal instanceof Date) {
    d = dateVal
  } else if (typeof dateVal === 'object' && 'toDate' in dateVal && typeof dateVal.toDate === 'function') {
    d = dateVal.toDate()
  } else {
    return ''
  }
  return isNaN(d.getTime()) ? '' : d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const getReservationStatusBadgeClass = (status?: string) => {
  const s = (status || '').toLowerCase()
  if (s === 'completed') return 'bg-success-subtle text-success'
  if (s === 'cancelled' || s === 'canceled') return 'bg-danger-subtle text-danger'
  if (s === 'pending') return 'bg-warning-subtle text-warning'
  if (s === 'accepted') return 'bg-info-subtle text-info'
  if (s === 'rejected') return 'bg-primary-subtle text-primary'
  return 'bg-secondary-subtle text-secondary'
}

const translateReservationStatus = (status?: string) => {
  const s = (status || '').toLowerCase()
  if (s === 'completed') return 'Complétée'
  if (s === 'cancelled' || s === 'canceled') return 'Annulée'
  if (s === 'pending') return 'En attente'
  if (s === 'accepted') return 'En cours'
  if (s === 'rejected') return 'Rejetée'
  return status || 'Inconnu'
}

// Data Fetching
onMounted(async () => {
  const clientId = route.params.id as string
  try {
    const fetchedClient = await getClientById(clientId)
    if (fetchedClient) {
      client.value = fetchedClient
      
      // Load Reservations
      loadingReservations.value = true
      try {
        reservations.value = await getReservationsByUserId(clientId)
      } catch (err) {
        console.error('Error fetching reservations:', err)
      } finally {
        loadingReservations.value = false
      }

      // Load Reviews
      loadingReviews.value = true
      try {
        reviews.value = await getClientReviews(clientId)
      } catch (err) {
        console.error('Error fetching client reviews:', err)
      } finally {
        loadingReviews.value = false
      }
    }
  } catch (err) {
    console.error('Error loading client detail:', err)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.minimal-hero {
  position: relative;
}

.hero-cover {
  height: 180px;
}

.bg-gradient-primary {
  background: linear-gradient(135deg, var(--tb-primary, #4b58e2) 0%, #3080e2 100%);
}

.hero-gradient-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.15) 100%);
}

.hero-content {
  margin-top: -60px;
  position: relative;
  z-index: 2;
}

.hero-avatar {
  width: 120px;
  height: 120px;
}

.hero-text {
  min-height: 60px;
}

.custom-tabs .btn-tab {
  border-bottom: 2px solid transparent;
  color: #6c757d;
  transition: all 0.2s ease;
  font-size: 0.875rem;
}

.custom-tabs .btn-tab:hover {
  color: var(--tb-primary, #4b58e2);
}

.custom-tabs .btn-tab.active {
  color: var(--tb-primary, #4b58e2) !important;
  border-bottom: 2px solid var(--tb-primary, #4b58e2) !important;
}

.info-list-minimal .info-item:last-child {
  border-bottom: none !important;
  padding-bottom: 0 !important;
  margin-bottom: 0 !important;
}

.confirm-icon-wrapper {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.w-32 {
  width: 32px;
}
.h-32 {
  height: 32px;
}
</style>
