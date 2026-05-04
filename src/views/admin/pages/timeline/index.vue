<template>
  <PageBreadcrumb title="Timeline" subtitle="Pages" />

  <BRow>
    <BCol xxl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Basic Timeline</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="timeline">
            <div v-for="(item, idx) in basicTimelineData" :key="idx" class="timeline-item d-flex align-items-stretch">
              <div v-if="item.time" class="timeline-time pe-3 text-muted">
                {{ item.time }}
              </div>
              <div v-if="item.className" :class="`timeline-dot ${item.className}`" />

              <div :class="['timeline-content ps-3', idx !== basicTimelineData.length - 1 ? 'pb-4' : '']">
                <h5 class="mb-1">{{ item.title }}</h5>
                <p class="mb-1 text-muted">{{ item.description }}</p>
                <span class="text-primary fw-semibold">By {{ item.name }}</span>
              </div>
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xxl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Timeline with Icons</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="timeline timeline-icon-based">
            <div v-for="(item, idx) in iconTimelineData" :key="idx" class="timeline-item d-flex align-items-stretch">
              <div v-if="item.time" class="timeline-time pe-3 text-muted">
                {{ item.time }}
              </div>

              <div v-if="item.className && item.icon" :class="`timeline-dot ${item.className}`">
                <Icon :icon="item.icon" class="fs-xl" />
              </div>

              <div :class="['timeline-content ps-3', idx !== iconTimelineData.length - 1 ? 'pb-4' : '']">
                <h5 class="mb-1">{{ item.title }}</h5>
                <p class="mb-1 text-muted">{{ item.description }}</p>
                <span class="text-primary fw-semibold">By {{ item.name }}</span>
              </div>
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xxl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Timeline with Border</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="timeline timeline-icon-bordered">
            <div v-for="(item, idx) in borderTimelineData" :key="idx" class="timeline-item d-flex align-items-stretch">
              <div v-if="item.time" class="timeline-time pe-3 text-muted">
                {{ item.time }}
              </div>

              <div v-if="item.icon" class="timeline-dot">
                <Icon :icon="item.icon" class="fs-xl text-muted" />
              </div>

              <div :class="['timeline-content ps-3', idx !== borderTimelineData.length - 1 ? 'pb-4' : '']">
                <h5 class="mb-1">{{ item.title }}</h5>
                <p class="mb-1 text-muted">{{ item.description }}</p>
                <span class="text-primary fw-semibold">By {{ item.name }}</span>
              </div>
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xxl="6">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Timeline with Users</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <div class="timeline timeline-users">
            <div v-for="(item, idx) in userTimelineData" :key="idx" class="timeline-item d-flex align-items-stretch">
              <div v-if="item.image" class="timeline-dot">
                <img :src="item.image" width="30" height="30" alt="avatar" class="img-fluid rounded-circle" />
              </div>

              <div :class="['timeline-content ps-3', idx !== userTimelineData.length - 1 ? 'pb-4' : '']">
                <h5 class="mb-1">{{ item.title }}</h5>
                <p class="mb-1 text-muted">{{ item.description }}</p>
                <span class="text-primary fw-semibold">By {{ item.name }}</span>
              </div>
            </div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { basicTimelineData, borderTimelineData, iconTimelineData, userTimelineData } from './components/data'
</script>
