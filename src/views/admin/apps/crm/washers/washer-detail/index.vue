<template>
  <PageBreadcrumb title="Fiche Laveur" subtitle="CRM Go Wash" />

  <!-- Loading state -->
  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="visually-hidden">Chargement...</span>
    </div>
    <p class="mt-2 text-muted">Chargement de la fiche...</p>
  </div>

  <!-- Not found -->
  <div v-else-if="!washer" class="text-center py-5">
    <Icon icon="user-x" class="fs-1 text-muted mb-3" />
    <h5 class="text-muted">Laveur introuvable</h5>
    <RouterLink to="/apps/crm/washers" class="btn btn-primary mt-2">
      <Icon icon="arrow-left" class="me-1" /> Retour à la liste
    </RouterLink>
  </div>

  <!-- Content -->
  <div v-else class="washer-detail-wrapper pb-5">
    <!-- Top bar -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <RouterLink to="/apps/crm/washers" class="btn-back">
        <Icon icon="arrow-left" class="me-2 fs-sm" /> Retour aux laveurs
      </RouterLink>

      <div class="d-flex gap-2">
        <button 
          v-if="washer.isVerified !== false" 
          class="btn btn-danger d-flex align-items-center gap-2" 
          @click="suspendWasher"
        >
          <Icon icon="ban" class="fs-sm" /> Suspendre
        </button>
        <button 
          v-else 
          class="btn btn-success d-flex align-items-center gap-2" 
          @click="reactivateWasher"
        >
          <Icon icon="check-circle" class="fs-sm" /> Réactiver
        </button>
        
        <button class="btn btn-warning d-flex align-items-center gap-2" @click="showModerationModal = true">
          <Icon icon="shield-check" class="fs-sm" /> Modération
        </button>
        
        <button class="btn btn-outline-danger d-flex align-items-center gap-2 ms-2" @click="deleteWasher">
          <Icon icon="trash-2" class="fs-sm" /> Supprimer
        </button>
      </div>
    </div>

    <!-- Hero Banner Minimalist -->
    <div class="minimal-hero mb-4">
      <div class="hero-cover rounded-4 overflow-hidden position-relative bg-light">
        <img
          v-if="washer.laveurProfile?.bannerUrl"
          :src="washer.laveurProfile.bannerUrl"
          class="w-100 h-100 object-fit-cover"
          alt="banner"
        />
        <div class="hero-gradient-overlay"></div>
      </div>
      
      <div class="hero-content d-flex flex-column flex-md-row align-items-md-end px-4">
        <div class="hero-avatar shadow-sm bg-white rounded-circle p-1 flex-shrink-0">
          <img
            v-if="washer.laveurProfile?.logoUrl"
            :src="washer.laveurProfile.logoUrl"
            class="rounded-circle w-100 h-100 object-fit-cover"
            alt="logo"
          />
          <div v-else class="w-100 h-100 bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center fs-1 fw-bold">
            {{ washer.fullName?.charAt(0) || 'L' }}
          </div>
        </div>
        
        <div class="hero-text pt-3 pt-md-0 ms-md-4 flex-grow-1 pb-1">
          <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-start gap-3">
            <div>
              <h3 class="fw-bold mb-1 d-flex align-items-center gap-2">
                {{ washer.laveurProfile?.businessName || washer.fullName }}
                <span v-if="washer.isVerified && !washer.isBanned" class="text-success fs-sm" title="Vérifié">
                  <Icon icon="badge-check" />
                </span>
                <span v-if="washer.isBanned" class="text-danger fs-sm" title="Banni">
                  <Icon icon="ban" />
                </span>
              </h3>
              <p class="text-muted mb-2 mb-md-0 max-w-600">{{ washer.laveurProfile?.description || 'Aucune description disponible.' }}</p>
            </div>
            
            <div class="d-flex gap-2 align-items-center">
               <span class="badge" :class="washer.laveurData?.isAvailable === 'On' ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'">
                 <span class="availability-dot me-1" :class="washer.laveurData?.isAvailable === 'On' ? 'dot-on' : 'dot-off'"></span>
                 {{ washer.laveurData?.isAvailable === 'On' ? 'Disponible' : 'Indisponible' }}
               </span>
               <span v-if="washer.platform" class="badge bg-light text-dark text-capitalize border">{{ washer.platform }}</span>
            </div>
          </div>
          
          <!-- Key Stats inline -->
          <div class="d-flex align-items-center gap-4 mt-3 pt-2 border-top border-light-subtle">
             <div class="d-flex align-items-center gap-2">
               <Icon icon="star" class="text-warning fs-5" />
               <div class="lh-sm">
                 <div class="fw-bold fs-6">{{ washer.laveurData?.rating?.toFixed(1) || '0.0' }}</div>
                 <div class="text-muted fs-xs text-uppercase letter-spacing-1">Note</div>
               </div>
             </div>
             <div class="d-flex align-items-center gap-2">
               <Icon icon="check-circle" class="text-success fs-5" />
               <div class="lh-sm">
                 <div class="fw-bold fs-6">{{ washer.laveurData?.completedJobs || 0 }}</div>
                 <div class="text-muted fs-xs text-uppercase letter-spacing-1">Jobs</div>
               </div>
             </div>
             <div class="d-flex align-items-center gap-2">
               <Icon icon="eye" class="text-info fs-5" />
               <div class="lh-sm">
                 <div class="fw-bold fs-6">{{ washer.laveurData?.profileViews || 0 }}</div>
                 <div class="text-muted fs-xs text-uppercase letter-spacing-1">Vues</div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>

    <BRow class="g-4">
      <BCol lg="4">
        <!-- Contact & Info -->
        <div class="minimal-card mb-4">
          <h6 class="fw-bold mb-4 d-flex align-items-center"><Icon icon="user" class="me-2 text-muted" /> Informations</h6>
          <div class="info-list-minimal">
            <div class="info-item">
              <span class="info-lbl fw-bold">Email</span>
              <span class="info-val fw-medium">{{ washer.email || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-lbl fw-bold">Téléphone</span>
              <span class="info-val fw-medium">{{ washer.phoneNumber || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-lbl fw-bold">Zone d'intervention</span>
              <span class="info-val fw-medium">{{ washer.location?.address || '—' }}</span>
            </div>
            <div class="info-item">
              <span class="info-lbl fw-bold">Date d'inscription</span>
              <span class="info-val text-muted">{{ formatDate(washer.createdAt) }}</span>
            </div>
            <div class="info-item border-0 pb-0">
              <span class="info-lbl mb-2 fw-bold">Types d'interventions (Services proposés)</span>
              <div class="d-flex gap-2 flex-wrap">
                <span v-for="t in washer.laveurData?.businessTypes" :key="t" class="badge bg-light text-dark border px-2 py-1">
                  <Icon :icon="t === 'car' ? 'car' : 'home'" class="me-1 text-muted" />
                  {{ t === 'car' ? 'Véhicule' : 'Domicile' }}
                </span>
                <span v-if="!washer.laveurData?.businessTypes?.length" class="text-muted fs-sm">—</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Services checklist (Tags) -->
        <div class="minimal-card mb-4">
          <h6 class="fw-bold mb-4 d-flex align-items-center"><Icon icon="check-square" class="me-2 text-muted" /> Compétences</h6>
          <div v-if="washer.laveurData?.services?.length" class="d-flex flex-wrap gap-2">
             <div v-for="s in washer.laveurData.services" :key="s" class="skill-tag">
               {{ s }}
             </div>
          </div>
          <p v-else class="text-muted fs-sm mb-0">Aucune compétence listée.</p>
        </div>
      </BCol>

      <BCol lg="8">
        <!-- Gallery Horizontal Scroll -->
        <div class="minimal-card mb-4">
          <h6 class="fw-bold mb-4 d-flex align-items-center justify-content-between">
            <span class="d-flex align-items-center"><Icon icon="image" class="me-2 text-muted" /> Galerie</span>
            <span class="text-muted fs-sm fw-normal">{{ washer.laveurProfile?.galleryUrls?.length || 0 }} photos</span>
          </h6>
          
          <div v-if="washer.laveurProfile?.galleryUrls?.length" class="gallery-scroll">
            <div v-for="(img, i) in washer.laveurProfile.galleryUrls" :key="i" class="gallery-img-wrap">
              <img :src="img" class="gallery-img" @click="openImage(img)" />
              <div class="gallery-hover" @click="openImage(img)"><Icon icon="zoom-in" class="fs-4 text-white" /></div>
              <button class="btn btn-danger gallery-delete-btn shadow-sm" @click.stop="handleDeletePhoto(img, i)" title="Supprimer la photo">
                <Icon icon="trash-2" class="fs-xs" />
              </button>
            </div>
          </div>
          <p v-else class="text-muted fs-sm mb-0">Aucune photo dans la galerie.</p>
        </div>

        <!-- Addons & Services Harmonized -->
        <div class="minimal-card mb-4">
          <h6 class="fw-bold mb-4 d-flex align-items-center justify-content-between">
            <span class="d-flex align-items-center"><Icon icon="layers" class="me-2 text-muted" /> Offres & Options</span>
          </h6>

          <div v-if="loadingServices || loadingAddons" class="text-center py-4">
            <div class="spinner-border spinner-border-sm text-primary"></div>
          </div>

          <div v-else-if="services.length || addons.length">
            <!-- Services / Forfaits -->
            <div v-if="services.length" class="mb-5">
              <div class="text-muted text-uppercase fs-xs fw-bold letter-spacing-1 mb-3">Forfaits Principaux</div>
              <div class="sa-grid-minimal">
                <div v-for="item in services" :key="item.id" class="sa-card-minimal">
                  <div class="sa-card-top">
                    <div class="sa-icon-minimal bg-success-subtle text-success"><Icon icon="package" /></div>
                    <span class="badge" :class="item.published ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'">
                      {{ item.published ? 'Actif' : 'Inactif' }}
                    </span>
                  </div>
                  <div class="sa-card-body">
                    <div class="fw-bold fs-sm text-truncate mb-1">{{ item.name }}</div>
                    <div class="text-muted fs-xs">{{ item.features?.length || 0 }} option(s) incluses</div>
                  </div>
                  <div class="sa-card-footer mt-auto pt-3">
                    <div class="sa-price-minimal mb-3">
                      {{ item.prices && Object.keys(item.prices).length ? Math.min(...Object.values(item.prices)) + ' MAD' : '— MAD' }}
                    </div>
                    <div class="mt-auto d-flex gap-2">
                      <button class="btn btn-sm btn-light flex-grow-1" @click="openDetail('service', item)">
                        Voir détail
                      </button>
                      <button class="btn btn-sm btn-outline-danger px-3" @click="handleDeleteService(item)" title="Supprimer ce service">
                        <Icon icon="trash-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Addons -->
            <div v-if="addons.length">
              <div class="text-muted text-uppercase fs-xs fw-bold letter-spacing-1 mb-3">Options Supplémentaires</div>
              <div class="sa-grid-minimal">
                <div v-for="item in addons" :key="item.id" class="sa-card-minimal">
                  <div class="sa-card-top">
                    <div class="sa-icon-minimal bg-primary-subtle text-primary"><Icon icon="plus" /></div>
                    <span class="badge" :class="item.published ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'">
                      {{ item.published ? 'Actif' : 'Inactif' }}
                    </span>
                  </div>
                  <div class="sa-card-body">
                    <div class="fw-bold fs-sm text-truncate mb-1">{{ item.name }}</div>
                    <div class="text-muted fs-xs">{{ item.vehicleCategory || 'Toutes catégories' }}</div>
                  </div>
                  <div class="sa-card-footer mt-auto pt-3">
                    <div class="sa-price-minimal mb-3">{{ item.basePrice || 0 }} MAD</div>
                    <div class="mt-auto d-flex gap-2">
                      <button class="btn btn-sm btn-light flex-grow-1" @click="openDetail('addon', item)">
                        Voir détail
                      </button>
                      <button class="btn btn-sm btn-outline-danger px-3" @click="handleDeleteAddon(item)" title="Supprimer cet addon">
                        <Icon icon="trash-2" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <p v-else class="text-muted fs-sm mb-0">Aucun forfait ou option configuré.</p>
        </div>

      </BCol>
    </BRow>

    <!-- Full Width Tabs Section -->
    <BRow class="mt-2">
      <BCol cols="12">
        <div class="minimal-card p-0 overflow-hidden mb-4">
          <!-- Custom Tabs Header -->
          <div class="d-flex border-bottom bg-light-subtle px-4 pt-3 gap-4 custom-tabs">
            <button 
              class="btn-tab pb-3 fw-bold d-flex align-items-center" 
              :class="{ 'active': activeTab === 'avis' }"
              @click="activeTab = 'avis'"
            >
              <Icon icon="message-square" class="me-2" /> Avis Clients 
              <span class="badge rounded-pill bg-warning text-white ms-2">{{ reviews.length }}</span>
            </button>
            <button 
              class="btn-tab pb-3 fw-bold d-flex align-items-center" 
              :class="{ 'active': activeTab === 'commandes' }"
              @click="activeTab = 'commandes'"
            >
              <Icon icon="shopping-bag" class="me-2" /> Commandes 
              <span class="badge rounded-pill bg-info text-white ms-2">{{ reservations.length }}</span>
            </button>
          </div>
          
          <div class="p-4">
            <!-- Avis Tab -->
            <div v-show="activeTab === 'avis'">
              <div v-if="reviews.length" class="d-flex align-items-center gap-2 mb-4">
                <div class="bg-warning-subtle text-warning p-2 rounded">
                  <Icon icon="star-fill" class="fs-5" />
                </div>
                <div>
                  <div class="fw-bold fs-5 lh-1">{{ avgRating.toFixed(1) }} / 5</div>
                  <div class="text-muted fs-xs">Note moyenne globale</div>
                </div>
              </div>

              <div v-if="loadingReviews" class="text-center py-3"><div class="spinner-border spinner-border-sm text-primary"></div></div>
              
              <div v-else-if="reviews.length" class="review-list-minimal">
                <div v-for="(review, i) in reviews" :key="i" class="review-item-minimal pb-3 mb-3 border-bottom">
                  <div class="d-flex align-items-start gap-3">
                    <img v-if="review.clientPhoto" :src="review.clientPhoto" class="rounded-circle w-32 h-32 object-fit-cover flex-shrink-0" />
                    <div v-else class="w-32 h-32 rounded-circle bg-light d-flex align-items-center justify-content-center text-muted fs-xs fw-bold flex-shrink-0">
                      {{ review.clientName?.charAt(0) || 'C' }}
                    </div>
                    <div class="flex-grow-1">
                      <div class="d-flex justify-content-between align-items-center mb-1">
                        <div class="fw-semibold fs-sm">{{ review.clientName || 'Client' }}</div>
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
              <p v-else class="text-muted fs-sm mb-0">Aucun avis laissé pour le moment.</p>
            </div>
            
            <!-- Commandes Tab -->
            <div v-show="activeTab === 'commandes'">
              <div v-if="loadingReservations" class="text-center py-5">
                <div class="spinner-border text-primary" role="status"></div>
                <div class="text-muted mt-2 fs-sm">Chargement des commandes...</div>
              </div>
              
              <div v-else-if="reservations.length" class="table-responsive">
                <table class="table table-hover table-custom table-nowrap table-centered mb-0 align-middle">
                  <thead class="bg-light-subtle text-uppercase fs-xxs fw-bold text-muted border-bottom">
                    <tr>
                      <th class="ps-3 py-3">Référence</th>
                      <th class="py-3">Date</th>
                      <th class="py-3">Client</th>
                      <th class="py-3">Forfait</th>
                      <th class="py-3">Total</th>
                      <th class="py-3">Paiement</th>
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
                        <div class="d-flex align-items-center gap-2">
                          <div class="w-32 h-32 rounded-circle bg-primary-subtle text-primary d-flex align-items-center justify-content-center fw-bold fs-xs">
                            {{ res.clientSnapshot?.fullName?.charAt(0) || 'C' }}
                          </div>
                          <div>
                            <div class="fw-semibold text-dark">{{ res.clientSnapshot?.fullName || 'Client' }}</div>
                            <div class="text-muted fs-xs">{{ res.clientSnapshot?.phoneNumber || res.clientSnapshot?.email || '—' }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="py-3">
                        <div class="fw-medium text-dark">{{ res.packageName || res.serviceSnapshot?.name || '—' }}</div>
                      </td>
                      <td class="py-3 fw-bold text-dark">
                        {{ res.serviceSnapshot?.totalPrice || res.serviceSnapshot?.price || 0 }} MAD
                      </td>
                      <td class="py-3">
                        <span class="fw-semibold text-success">
                          <Icon icon="circle" class="fs-xs text-success me-1" /> Payé
                        </span>
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
                <p class="text-muted fs-sm mx-auto" style="max-width: 400px;">Aucune réservation ou commande n'a été enregistrée pour ce laveur pour le moment.</p>
              </div>
            </div>
          </div>
        </div>
      </BCol>
    </BRow>
  </div>

  <!-- Detail Modal (Addon or Service) -->
  <BModal
    v-model="showDetailModal"
    :title="detailModalType === 'addon' ? 'Détail Option' : 'Détail Forfait'"
    size="lg"
    ok-only
    ok-title="Fermer"
    ok-variant="light"
    centered
  >
    <div v-if="detailModal" class="detail-modal-minimal">
      <div class="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
        <div class="detail-modal-icon" :class="detailModalType === 'addon' ? 'bg-primary-subtle text-primary' : 'bg-success-subtle text-success'">
          <Icon :icon="detailModalType === 'addon' ? 'plus' : 'package'" class="fs-3" />
        </div>
        <div>
          <h4 class="mb-1 fw-bold">{{ detailModal.name }}</h4>
          <div class="d-flex gap-2">
            <span class="badge" :class="detailModal.published ? 'bg-success-subtle text-success' : 'bg-secondary-subtle text-secondary'">
              {{ detailModal.published ? 'Actif' : 'Inactif' }}
            </span>
            <span v-if="detailModalType === 'service' && (detailModal as any).isBestOffer" class="badge bg-warning-subtle text-warning">
              <Icon icon="star" class="fs-xxs me-1" /> Best Offer
            </span>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <h6 class="fw-bold mb-3 text-uppercase fs-xs letter-spacing-1 text-muted">Tarification</h6>
        
        <template v-if="detailModalType === 'addon'">
          <div class="d-flex align-items-baseline gap-2 mb-3">
            <span class="fs-2 fw-bold text-dark">{{ (detailModal as any).basePrice || 0 }}</span>
            <span class="text-muted fw-medium">MAD</span>
          </div>
          <div v-if="(detailModal as any).categoryPrices && Object.keys((detailModal as any).categoryPrices).length">
            <div class="text-muted fs-xs mb-2">Prix spécifiques :</div>
            <div class="d-flex gap-2 flex-wrap">
              <div v-for="(price, cat) in (detailModal as any).categoryPrices" :key="cat" class="price-chip-minimal">
                <span class="text-muted fs-xs text-capitalize mb-1">{{ cat }}</span>
                <span class="fw-bold">{{ price }} MAD</span>
              </div>
            </div>
          </div>
          <div v-if="(detailModal as any).vehicleCategory" class="mt-3 badge bg-light text-dark border">
            Catégorie: {{ (detailModal as any).vehicleCategory }}
          </div>
        </template>
        
        <template v-else>
          <div v-if="(detailModal as any).prices && Object.keys((detailModal as any).prices).length" class="d-flex gap-2 flex-wrap">
            <div v-for="(price, cat) in (detailModal as any).prices" :key="cat" class="price-chip-minimal">
              <span class="text-muted fs-xs text-capitalize mb-1">{{ cat }}</span>
              <span class="fw-bold fs-6">{{ price }} MAD</span>
            </div>
          </div>
          <p v-else class="text-muted fs-sm">Aucun prix défini.</p>
        </template>
      </div>

      <div v-if="detailModalType === 'service' && (detailModal as any).features?.length" class="mb-4">
        <h6 class="fw-bold mb-3 text-uppercase fs-xs letter-spacing-1 text-muted">Inclus dans ce forfait</h6>
        <div class="row g-2">
          <div v-for="(f, i) in (detailModal as any).features" :key="i" class="col-md-6">
            <div class="d-flex align-items-start gap-2">
              <Icon icon="check" class="text-success mt-1 fs-sm flex-shrink-0" />
              <span class="fs-sm text-dark">{{ f }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BModal>

  <!-- Moderation Modal -->
  <BModal
    v-model="showModerationModal"
    title="Modération des documents"
    size="lg"
    ok-title="Enregistrer"
    cancel-title="Annuler"
    ok-variant="primary"
    centered
    @ok="handleModerationSave"
  >
    <div class="moderation-body">
      <p class="text-muted mb-4 fs-sm">Vérifiez les documents d'identité et professionnels du laveur. Si vous rejetez un document, veuillez fournir une raison.</p>

      <div class="row g-4">
        <!-- ID Card -->
        <div class="col-12 border-bottom pb-4 mb-1">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 class="fw-bold mb-1 d-flex align-items-center"><Icon icon="file-text" class="me-2 text-primary" /> Pièce d'identité (ID)</h6>
              <span class="badge bg-light text-dark fs-xxs">CIN ou Passeport</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary" @click="openDoc('ID')" :disabled="!washer?.documents?.ID">
              <Icon icon="eye" class="me-1" /> Voir le doc
            </button>
          </div>
          <div class="d-flex gap-2 mb-3">
            <button class="btn btn-sm flex-grow-1" :class="modStatus.ID.status === 'approved' ? 'btn-success' : 'btn-outline-success'" @click="setModStatus('ID', 'approved')">
              <Icon icon="check" class="me-1" /> Approuver
            </button>
            <button class="btn btn-sm flex-grow-1" :class="modStatus.ID.status === 'rejected' ? 'btn-danger' : 'btn-outline-danger'" @click="setModStatus('ID', 'rejected')">
              <Icon icon="x" class="me-1" /> Rejeter
            </button>
          </div>
        </div>

        <!-- RIB -->
        <div class="col-12 border-bottom pb-4 mb-1">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 class="fw-bold mb-1 d-flex align-items-center"><Icon icon="file-text" class="me-2 text-primary" /> RIB Bancaire</h6>
              <span class="badge bg-light text-dark fs-xxs">Relevé d'identité bancaire</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary" @click="openDoc('RIB')" :disabled="!washer?.documents?.RIB">
              <Icon icon="eye" class="me-1" /> Voir le doc
            </button>
          </div>
          <div class="d-flex gap-2 mb-3">
            <button class="btn btn-sm flex-grow-1" :class="modStatus.RIB.status === 'approved' ? 'btn-success' : 'btn-outline-success'" @click="setModStatus('RIB', 'approved')">
              <Icon icon="check" class="me-1" /> Approuver
            </button>
            <button class="btn btn-sm flex-grow-1" :class="modStatus.RIB.status === 'rejected' ? 'btn-danger' : 'btn-outline-danger'" @click="setModStatus('RIB', 'rejected')">
              <Icon icon="x" class="me-1" /> Rejeter
            </button>
          </div>
        </div>

        <!-- SIRET -->
        <div class="col-12 border-bottom pb-4 mb-1">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 class="fw-bold mb-1 d-flex align-items-center"><Icon icon="file-text" class="me-2 text-primary" /> SIRET</h6>
              <span class="badge bg-light text-dark fs-xxs">Justificatif professionnel</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary" @click="openDoc('SIRET')" :disabled="!washer?.documents?.SIRET">
              <Icon icon="eye" class="me-1" /> Voir le doc
            </button>
          </div>
          <div class="d-flex gap-2 mb-3">
            <button class="btn btn-sm flex-grow-1" :class="modStatus.SIRET.status === 'approved' ? 'btn-success' : 'btn-outline-success'" @click="setModStatus('SIRET', 'approved')">
              <Icon icon="check" class="me-1" /> Approuver
            </button>
            <button class="btn btn-sm flex-grow-1" :class="modStatus.SIRET.status === 'rejected' ? 'btn-danger' : 'btn-outline-danger'" @click="setModStatus('SIRET', 'rejected')">
              <Icon icon="x" class="me-1" /> Rejeter
            </button>
          </div>
        </div>

        <!-- KABIS -->
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
              <h6 class="fw-bold mb-1 d-flex align-items-center"><Icon icon="file-text" class="me-2 text-primary" /> KABIS</h6>
              <span class="badge bg-light text-dark fs-xxs">Extrait Kbis</span>
            </div>
            <button class="btn btn-sm btn-outline-secondary" @click="openDoc('KABIS')" :disabled="!washer?.documents?.KABIS">
              <Icon icon="eye" class="me-1" /> Voir le doc
            </button>
          </div>
          <div class="d-flex gap-2 mb-3">
            <button class="btn btn-sm flex-grow-1" :class="modStatus.KABIS.status === 'approved' ? 'btn-success' : 'btn-outline-success'" @click="setModStatus('KABIS', 'approved')">
              <Icon icon="check" class="me-1" /> Approuver
            </button>
            <button class="btn btn-sm flex-grow-1" :class="modStatus.KABIS.status === 'rejected' ? 'btn-danger' : 'btn-outline-danger'" @click="setModStatus('KABIS', 'rejected')">
              <Icon icon="x" class="me-1" /> Rejeter
            </button>
          </div>
        </div>
      </div>

      <!-- Global Reason -->
      <div class="mt-4 border-top pt-4">
        <label class="form-label fw-bold d-flex align-items-center gap-2" :class="hasAnyRejection ? 'text-danger' : 'text-dark'">
          <Icon icon="message-square" class="fs-5" /> Raison / Motif Global
          <span class="badge bg-light text-muted fw-normal ms-auto" v-if="!hasAnyRejection">Facultatif</span>
          <span class="badge bg-danger-subtle text-danger fw-normal ms-auto" v-else>Obligatoire</span>
        </label>
        <p class="text-muted fs-xs mb-2">Un seul motif pour l'ensemble des documents vérifiés.</p>
        <textarea v-model="globalReason" class="form-control" rows="3" placeholder="Saisissez un motif (ex: Pièce d'identité floue et Kbis de plus de 3 mois)"></textarea>
      </div>
    </div>
  </BModal>

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
      <h4 class="fw-bold mb-3">{{ confirmModal.title }}</h4>
      <p class="text-muted mb-4 fs-sm">{{ confirmModal.message }}</p>
      
      <div class="d-flex justify-content-center gap-3">
        <button class="btn btn-light px-4 fw-medium" @click="confirmModal.show = false">{{ confirmModal.cancelText }}</button>
        <button class="btn px-4 fw-medium" :class="`btn-${confirmModal.variant}`" @click="confirmModal.onConfirm">{{ confirmModal.confirmText }}</button>
      </div>
    </div>
  </BModal>

  <!-- Lightbox -->
  <div v-if="lightboxImage" class="lightbox-overlay" @click="lightboxImage = null">
    <div class="lightbox-content" @click.stop>
      <button class="lightbox-close" @click="lightboxImage = null">
        <Icon icon="x" />
      </button>
      <img :src="lightboxImage" class="lightbox-img" alt="preview" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { BCard, BCardHeader, BCol, BRow, BModal } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { 
  getWasherById, getWasherReviews, getWasherAddons, getWasherServices, 
  updateWasher, deleteWasher as apiDeleteWasher,
  deleteWasherAddon, deleteWasherService, updateWasherReview, deleteWasherReview 
} from '~/services/washers.service'
import { getReservationsByWasherId } from '~/services/reservations.service'
import type { Washer, WasherReview, WasherAddon, WasherService } from '~/types/washer'
import type { Reservation } from '~/types/reservation'

const route = useRoute()
const loading = ref(true)
const loadingReviews = ref(false)
const loadingAddons = ref(false)
const loadingServices = ref(false)
const washer = ref<Washer | null>(null)
const reviews = ref<WasherReview[]>([])
const addons = ref<WasherAddon[]>([])
const services = ref<WasherService[]>([])
const reservations = ref<Reservation[]>([])
const lightboxImage = ref<string | null>(null)
const loadingReservations = ref(false)

// Tabs State
const activeTab = ref<'avis' | 'commandes'>('avis')

// Moderation modal
const showModerationModal = ref(false)
const globalReason = ref('')

const modStatus = ref({
  ID: { status: 'pending' },
  RIB: { status: 'pending' },
  SIRET: { status: 'pending' },
  KABIS: { status: 'pending' },
})

const hasAnyRejection = computed(() => Object.values(modStatus.value).some(doc => doc.status === 'rejected'))

const setModStatus = (doc: 'ID' | 'RIB' | 'SIRET' | 'KABIS', status: 'approved' | 'rejected') => {
  modStatus.value[doc].status = status
}

// Modern Confirm Logic
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

const suspendWasher = () => {
  showConfirm({
    title: 'Suspendre le laveur',
    message: 'Êtes-vous sûr de vouloir suspendre ce laveur ? Il ne pourra plus accepter de commandes.',
    variant: 'danger',
    icon: 'ban',
    confirmText: 'Oui, suspendre',
    onConfirm: async () => {
      if (washer.value) {
        try {
          await updateWasher(washer.value.id, { isVerified: false })
          washer.value.isVerified = false
          console.log('Washer suspended in Firebase:', washer.value.id)
        } catch (e) {
          console.error('Error suspending washer:', e)
          alert('Erreur lors de la suspension du laveur.')
        }
      }
    }
  })
}

const reactivateWasher = () => {
  showConfirm({
    title: 'Réactiver le laveur',
    message: 'Voulez-vous réactiver ce laveur ? Il pourra de nouveau opérer sur la plateforme.',
    variant: 'success',
    icon: 'check-circle',
    confirmText: 'Oui, réactiver',
    onConfirm: async () => {
      if (washer.value) {
        try {
          await updateWasher(washer.value.id, { isVerified: true })
          washer.value.isVerified = true
          console.log('Washer reactivated in Firebase:', washer.value.id)
        } catch (e) {
          console.error('Error reactivating washer:', e)
          alert('Erreur lors de la réactivation du laveur.')
        }
      }
    }
  })
}

const deleteWasher = () => {
  showConfirm({
    title: 'Supprimer le laveur',
    message: 'Êtes-vous sûr de vouloir supprimer définitivement ce laveur ? Cette action est irréversible.',
    variant: 'danger',
    icon: 'trash-2',
    confirmText: 'Continuer',
    onConfirm: () => {
      // Second confirmation (small delay to allow the first modal to close smoothly)
      setTimeout(() => {
        showConfirm({
          title: 'Confirmation Définitive',
          message: 'ATTENTION : Cette suppression est totale et définitive (base de données incluse). Êtes-vous absolument certain ?',
          variant: 'danger',
          icon: 'alert-triangle',
          confirmText: 'Supprimer définitivement',
          onConfirm: async () => {
            if (washer.value) {
              try {
                await apiDeleteWasher(washer.value.id)
                console.log('Washer deleted from Firebase definitively:', washer.value.id)
                import('vue-router').then(({ useRouter }) => {
                  window.location.href = '/apps/crm/washers'
                })
              } catch (e) {
                console.error('Error deleting washer:', e)
                alert('Erreur lors de la suppression du laveur.')
              }
            }
          }
        })
      }, 300)
    }
  })
}

// Addon Actions
const handleDeleteAddon = (addon: WasherAddon) => {
  showConfirm({
    title: 'Supprimer l\'addon',
    message: `Êtes-vous sûr de vouloir supprimer l'option "${addon.name}" ?`,
    variant: 'danger',
    icon: 'trash-2',
    confirmText: 'Supprimer',
    onConfirm: async () => {
      if (!washer.value || !addon.id) return
      try {
        await deleteWasherAddon(washer.value.id, addon.id)
        addons.value = addons.value.filter(a => a.id !== addon.id)
        console.log('Addon deleted:', addon.id)
      } catch (e) {
        console.error('Error deleting addon:', e)
        alert('Erreur lors de la suppression de l\'addon.')
      }
    }
  })
}

// Service Actions
const handleDeleteService = (service: WasherService) => {
  showConfirm({
    title: 'Supprimer le service',
    message: `Êtes-vous sûr de vouloir supprimer le service "${service.name}" ?`,
    variant: 'danger',
    icon: 'trash-2',
    confirmText: 'Supprimer',
    onConfirm: async () => {
      if (!washer.value || !service.id) return
      try {
        await deleteWasherService(washer.value.id, service.id)
        services.value = services.value.filter(s => s.id !== service.id)
        console.log('Service deleted:', service.id)
      } catch (e) {
        console.error('Error deleting service:', e)
        alert('Erreur lors de la suppression du service.')
      }
    }
  })
}

// Review Actions
const toggleReviewVisibility = async (review: WasherReview) => {
  if (!washer.value || !review.id) return
  const newVisibility = review.isVisible === false ? true : false
  try {
    await updateWasherReview(washer.value.id, review.id, { isVisible: newVisibility })
    review.isVisible = newVisibility
    console.log('Review visibility toggled:', review.id, newVisibility)
  } catch (e) {
    console.error('Error toggling review:', e)
    alert('Erreur lors de la mise à jour de l\'avis.')
  }
}

const handleDeleteReview = (review: WasherReview) => {
  showConfirm({
    title: 'Supprimer l\'avis',
    message: 'Êtes-vous sûr de vouloir supprimer définitivement cet avis ?',
    variant: 'danger',
    icon: 'trash-2',
    confirmText: 'Supprimer',
    onConfirm: async () => {
      if (!washer.value || !review.id) return
      try {
        await deleteWasherReview(washer.value.id, review.id)
        reviews.value = reviews.value.filter(r => r.id !== review.id)
        console.log('Review deleted:', review.id)
      } catch (e) {
        console.error('Error deleting review:', e)
        alert('Erreur lors de la suppression de l\'avis.')
      }
    }
  })
}

// Photo Actions
const handleDeletePhoto = (img: string, index: number) => {
  showConfirm({
    title: 'Supprimer la photo',
    message: 'Êtes-vous sûr de vouloir supprimer cette photo de la galerie du laveur ?',
    variant: 'danger',
    icon: 'trash-2',
    confirmText: 'Supprimer',
    onConfirm: async () => {
      if (!washer.value || !washer.value.laveurProfile?.galleryUrls) return
      
      const newGallery = [...washer.value.laveurProfile.galleryUrls]
      newGallery.splice(index, 1)

      try {
        await updateWasher(washer.value.id, { 
          laveurProfile: { ...washer.value.laveurProfile, galleryUrls: newGallery }
        })
        washer.value.laveurProfile.galleryUrls = newGallery
        console.log('Photo deleted from gallery')
      } catch (e) {
        console.error('Error deleting photo:', e)
        alert('Erreur lors de la suppression de la photo.')
      }
    }
  })
}

const openDoc = (doc: 'ID' | 'RIB' | 'SIRET' | 'KABIS') => {
  const url = washer.value?.documents?.[doc]
  if (url) window.open(url, '_blank')
}

const handleModerationSave = async (e: Event) => {
  // Save takes effect only here
  if (hasAnyRejection.value && !globalReason.value.trim()) {
    e.preventDefault()
    alert('Veuillez fournir un motif global, car au moins un document a été rejeté.')
    return
  }
  
  const getStatusBool = (status: string) => status === 'approved' ? true : (status === 'rejected' ? false : undefined)

  const updates = {
    approvedID: getStatusBool(modStatus.value.ID.status),
    approvedRIB: getStatusBool(modStatus.value.RIB.status),
    approvedSIRET: getStatusBool(modStatus.value.SIRET.status),
    approvedKABIS: getStatusBool(modStatus.value.KABIS.status),
    motive: globalReason.value,
  }

  if (washer.value) {
    try {
      await updateWasher(washer.value.id, { documents: { ...washer.value.documents, ...updates } })
      washer.value.documents = { ...washer.value.documents, ...updates }
      console.log('Saved moderation to documents map in Firebase:', updates)
    } catch (err) {
      console.error('Error saving moderation:', err)
      alert('Erreur lors de la sauvegarde de la modération.')
    }
  }
}

// Detail modal
const showDetailModal = ref(false)
const detailModalType = ref<'addon' | 'service'>('addon')
const detailModal = ref<WasherAddon | WasherService | null>(null)

const openDetail = (type: 'addon' | 'service', item: WasherAddon | WasherService) => {
  detailModalType.value = type
  detailModal.value = item
  showDetailModal.value = true
}

onMounted(async () => {
  const id = route.params.id as string
  washer.value = await getWasherById(id)
  loading.value = false

  if (washer.value) {
    // Populate moderation status from documents map if present
    const docs = washer.value.documents
    if (docs) {
      if (docs.approvedID !== undefined) modStatus.value.ID.status = docs.approvedID ? 'approved' : 'rejected'
      if (docs.approvedRIB !== undefined) modStatus.value.RIB.status = docs.approvedRIB ? 'approved' : 'rejected'
      if (docs.approvedSIRET !== undefined) modStatus.value.SIRET.status = docs.approvedSIRET ? 'approved' : 'rejected'
      if (docs.approvedKABIS !== undefined) modStatus.value.KABIS.status = docs.approvedKABIS ? 'approved' : 'rejected'
      globalReason.value = docs.motive || ''
    }

    loadingReviews.value = true
    loadingAddons.value = true
    loadingServices.value = true
    loadingReservations.value = true
    const [fetchedReviews, fetchedAddons, fetchedServices, fetchedReservations] = await Promise.all([
      getWasherReviews(id),
      getWasherAddons(id),
      getWasherServices(id),
      getReservationsByWasherId(id),
    ])
    reviews.value = fetchedReviews
    addons.value = fetchedAddons.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    services.value = fetchedServices.sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    reservations.value = fetchedReservations
    loadingReviews.value = false
    loadingAddons.value = false
    loadingServices.value = false
    loadingReservations.value = false
  }
})

const avgRating = computed(() => {
  if (!reviews.value.length) return 0
  return reviews.value.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.value.length
})

const formatDate = (dateVal: any) => {
  if (!dateVal) return '—'
  let d: Date
  if (typeof dateVal === 'string') d = new Date(dateVal)
  else if (dateVal instanceof Date) d = dateVal
  else if (typeof dateVal === 'object' && 'toDate' in dateVal) d = dateVal.toDate()
  else return '—'
  return isNaN(d.getTime()) ? '—' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
}

const formatTime = (dateVal: any) => {
  if (!dateVal) return ''
  let d: Date
  if (typeof dateVal === 'string') d = new Date(dateVal)
  else if (dateVal instanceof Date) d = dateVal
  else if (typeof dateVal === 'object' && 'toDate' in dateVal) d = dateVal.toDate()
  else return ''
  return isNaN(d.getTime()) ? '' : d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
}

const translateReservationStatus = (status?: string) => {
  const s = (status || '').toLowerCase()
  if (s === 'completed') return 'Complétée'
  if (s === 'cancelled' || s === 'canceled') return 'Annulée'
  if (s === 'pending') return 'En attente'
  if (s === 'accepted') return 'Acceptée'
  if (s === 'rejected') return 'Rejetée'
  if (s === 'in_progress' || s === 'en_cours') return 'En cours'
  return status || 'En cours'
}

const getReservationStatusBadgeClass = (status?: string) => {
  const s = (status || '').toLowerCase()
  if (s === 'completed') return 'badge-soft-success'
  if (s === 'cancelled' || s === 'canceled') return 'badge-soft-danger'
  if (s === 'pending') return 'badge-soft-warning'
  if (s === 'accepted') return 'badge-soft-info'
  if (s === 'rejected') return 'badge-soft-primary'
  if (s === 'in_progress' || s === 'en_cours') return 'badge-soft-warning'
  return 'badge-soft-secondary'
}

const openImage = (url: string) => {
  lightboxImage.value = url
}
</script>

<style scoped>
/* Utility */
.letter-spacing-1 { letter-spacing: 0.5px; }
.max-w-600 { max-width: 600px; }
.w-32 { width: 32px; }
.h-32 { height: 32px; }

/* Minimalist Core */
.minimal-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.03);
  border: 1px solid rgba(0,0,0,0.02);
}

.btn-back {
  display: inline-flex;
  align-items: center;
  color: var(--bs-secondary);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  padding: 8px 16px;
  border-radius: 8px;
  background: white;
  border: 1px solid rgba(0,0,0,0.05);
  box-shadow: 0 2px 8px rgba(0,0,0,0.02);
  transition: all 0.2s;
}
.btn-back:hover {
  background: var(--bs-light);
  color: var(--bs-dark);
}

/* Hero Banner */
.minimal-hero {
  position: relative;
}
.hero-cover {
  height: 220px;
}
.hero-gradient-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%);
  pointer-events: none;
}
.hero-content {
  margin-top: -60px;
  position: relative;
  z-index: 2;
}
.hero-avatar {
  width: 120px;
  height: 120px;
  border: 4px solid white;
}

/* Info List */
.info-list-minimal {
  display: flex;
  flex-direction: column;
}
.info-item {
  display: flex;
  flex-direction: column;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px dashed var(--bs-border-color);
}
.info-item:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}
.info-lbl {
  font-size: 12px;
  text-transform: uppercase;
  color: var(--bs-secondary);
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.info-val {
  font-size: 14px;
  color: var(--bs-dark);
}

/* Skill tags */
.skill-tag {
  background: var(--bs-light);
  color: var(--bs-dark);
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.04);
}

/* Gallery Horizontal Scroll */
.gallery-scroll {
  display: flex;
  overflow-x: auto;
  gap: 16px;
  padding-bottom: 12px;
  scrollbar-width: thin;
}
.gallery-scroll::-webkit-scrollbar {
  height: 6px;
}
.gallery-scroll::-webkit-scrollbar-thumb {
  background: rgba(0,0,0,0.15);
  border-radius: 10px;
}
.gallery-img-wrap {
  width: 180px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}
.gallery-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}
.gallery-hover {
  position: absolute; inset: 0; background: rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.2s; pointer-events: none;
}
.gallery-img-wrap:hover .gallery-hover { opacity: 1; pointer-events: auto; }
.gallery-delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  width: 28px;
  height: 28px;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.2s;
}
.gallery-img-wrap:hover .gallery-delete-btn {
  opacity: 1;
  transform: scale(1);
}

/* Custom Tabs */
.custom-tabs {
  border-bottom: 1px solid var(--bs-border-color);
}
.btn-tab {
  background: none;
  border: none;
  color: var(--bs-secondary);
  position: relative;
  transition: all 0.2s ease-in-out;
}
.btn-tab:hover {
  color: var(--bs-primary);
}
.btn-tab.active {
  color: var(--bs-primary);
}
.btn-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: var(--bs-primary);
  border-radius: 3px 3px 0 0;
}

/* Service / Addon Cards (Harmonized) */
.sa-grid-minimal {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;
}
.sa-card-minimal {
  background: white;
  border: 1px solid var(--bs-border-color);
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 100%;
  transition: all 0.2s ease;
}
.sa-card-minimal:hover {
  border-color: rgba(0,0,0,0.15);
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  transform: translateY(-2px);
}
.sa-icon-minimal {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.sa-price-minimal {
  font-size: 18px;
  font-weight: 700;
  color: var(--bs-dark);
}

/* Detail Modal */
.detail-modal-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.price-chip-minimal {
  border: 1px solid rgba(0,0,0,0.08);
  border-radius: 8px;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

/* Reviews */
.review-list-minimal { display: flex; flex-direction: column; }
.review-item-minimal:last-child {
  border-bottom: none !important;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}

/* Availability dot */
.availability-dot {
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
}
.dot-on { background: #22c55e; animation: pulse-green 1.5s infinite; }
.dot-off { background: #94a3b8; }
@keyframes pulse-green {
  0%, 100% { box-shadow: 0 0 0 2px rgba(34,197,94,0.25); }
  50% { box-shadow: 0 0 0 5px rgba(34,197,94,0.1); }
}

/* Lightbox */
.lightbox-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.9);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fade-in 0.2s;
}
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.lightbox-content { position: relative; max-width: 90vw; max-height: 90vh; }
.lightbox-img {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

/* Modern Confirm Modal */
.confirm-modal-content {
  border-radius: 24px !important;
}
.confirm-icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-close {
  position: absolute;
  top: -20px; right: -20px;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: white;
  border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1;
  transition: transform 0.2s;
}
.lightbox-close:hover { transform: scale(1.1); }
</style>
