<template>
  <BCard no-body class="mt-5 shadow-none border border-dashed">
    <BCardHeader class="border-light">
      <h4 class="card-title">Manage Reviews</h4>
    </BCardHeader>

    <BCardHeader class="p-0 d-block">
      <BRow class="align-items-center g-0">
        <BCol xl="7">
          <div class="d-flex align-items-center gap-4 p-4">
            <img src="/images/ratings.svg" alt="Product" height="80" />
            <div>
              <h3 class="text-primary d-flex align-items-center gap-2 mb-2 fw-bold">
                4.92
                <Icon icon="star" />
              </h3>
              <p class="mb-2">Based on 245 verified reviews</p>
              <p class="pe-2 h6 text-muted mb-2 lh-base">Feedback collected from real customers who purchased our templates</p>
              <span class="badge badge-label text-bg-success">+12 new this week</span>
            </div>
          </div>
        </BCol>
        <BCol xl="5">
          <div class="p-3">
            <div class="d-flex align-items-center gap-2 mb-2">
              <div class="flex-shrink-0" style="width: 50px">5 Star</div>
              <div class="progress w-100 bg-label-primary" style="height: 8px">
                <div class="progress-bar bg-primary" role="progressbar" style="width: 85%" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="flex-shrink-0 text-end" style="width: 30px">
                <span class="badge text-bg-light">128</span>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2 mb-2">
              <div class="flex-shrink-0" style="width: 50px">4 Star</div>
              <div class="progress w-100 bg-label-primary" style="height: 8px">
                <div class="progress-bar bg-primary" role="progressbar" style="width: 10%" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="flex-shrink-0 text-end" style="width: 30px">
                <span class="badge text-bg-light">37</span>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2 mb-2">
              <div class="flex-shrink-0" style="width: 50px">3 Star</div>
              <div class="progress w-100 bg-label-primary" style="height: 8px">
                <div class="progress-bar bg-primary" role="progressbar" style="width: 3%" aria-valuenow="3" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="flex-shrink-0 text-end" style="width: 30px">
                <span class="badge text-bg-light">15</span>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2 mb-2">
              <div class="flex-shrink-0" style="width: 50px">2 Star</div>
              <div class="progress w-100 bg-label-primary" style="height: 8px">
                <div class="progress-bar bg-primary" role="progressbar" style="width: 1%" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="flex-shrink-0 text-end" style="width: 30px">
                <span class="badge text-bg-light">7</span>
              </div>
            </div>

            <div class="d-flex align-items-center gap-2">
              <div class="flex-shrink-0" style="width: 50px">1 Star</div>
              <div class="progress w-100 bg-label-primary" style="height: 8px">
                <div class="progress-bar bg-primary" role="progressbar" style="width: 1%" aria-valuenow="1" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="flex-shrink-0 text-end" style="width: 30px">
                <span class="badge text-bg-light">2</span>
              </div>
            </div>
          </div>
        </BCol>
      </BRow>
    </BCardHeader>
    <div class="table-responsive">
      <BTable :per-page="perPage" :current-page="currentPage" thead-class="bg-light align-middle bg-opacity-25" hover :fields="fields" :items="products" responsive class="table table-custom table-nowrap table-centered mb-0 w-100">
        <template #head()="data">
          <span class="text-uppercase fs-xxs">{{ data.label }}</span>
        </template>
        <template #head(action)>
          <span class="text-uppercase d-flex justify-content-center fs-xxs">Actions</span>
        </template>
        <template #cell(reviewer)="data">
          <div class="d-flex justify-content-start align-items-center gap-2">
            <div class="avatar avatar-sm">
              <img :src="data.item.image" alt="avatar-8" class="img-fluid rounded-circle" />
            </div>
            <div>
              <h5 class="text-nowrap fs-sm mb-0 lh-base">{{ data.item.name }}</h5>
              <p class="text-muted fs-xs mb-0">
                {{ data.item.email }}
              </p>
            </div>
          </div>
        </template>
        <template #cell(review)="data">
          <div class="text-wrap" style="width: 18rem">
            <Rating :size="16" :rating="data.item.rating" class="d-inline-flex align-items-center gap-1" />

            <h5 class="mt-2">{{ data.item.title }}</h5>
            <p class="text-muted fst-italic mb-0">"{{ data.item.comment }}"</p>
          </div>
        </template>
        <template #cell(date)="data">
          {{ data.item.date }} <small class="text-muted">{{ data.item.time }}</small>
        </template>
        <template #cell(status)="{ item }">
          <span class="badge fs-xxs" :class="item.status === 'pending' ? 'badge-soft-warning' : 'badge-soft-success'">{{ toPascalCase(item.status) }}</span>
        </template>
        <template #cell(actions)>
          <div class="d-flex justify-content-center gap-1">
            <BButton size="sm" class="btn-default btn-icon rounded-circle">
              <Icon icon="eye" class="fs-lg" />
            </BButton>
            <BButton size="sm" class="btn-default btn-icon rounded-circle">
              <Icon icon="square-pen" class="fs-lg" />
            </BButton>
            <BButton size="sm" class="btn-default btn-icon rounded-circle">
              <Icon icon="trash-2" class="fs-lg" />
            </BButton>
          </div>
        </template>
      </BTable>
    </div>
    <BCardFooter class="border-0">
      <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="reviews" />
    </BCardFooter>
  </BCard>
</template>

<script setup lang="ts">
import { BButton, BCardHeader, BCol, BRow, BTable } from 'bootstrap-vue-next'
import { computed, ref } from 'vue'
import Rating from '~/components/Rating.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { toPascalCase } from '~/utils/helpers'
import { reviewsData, type ReviewType } from './data'

const fields = [
  { key: 'reviewer', label: 'Reviewer' },
  { key: 'review', label: 'Review' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
  { key: 'actions', label: 'Actions' },
]

const currentPage = ref(1)
const perPage = ref(5)
const totalRows = ref(reviewsData.length)

const totalItems = computed(() => products.value.length)

const start = computed(() => (totalItems.value === 0 ? 0 : (currentPage.value - 1) * perPage.value + 1))

const end = computed(() => Math.min(currentPage.value * perPage.value, totalItems.value))

const products = ref<ReviewType[]>(reviewsData)
</script>

<style scoped></style>
