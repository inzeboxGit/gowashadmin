<template>
  <PageBreadcrumb title="eCommerce" subtitle="Dashboard" />

  <div class="d-flex flex-wrap align-items-center justify-content-between gap-2 mb-3">
    <h5 class="mb-0">Vue globale</h5>
    <BButtonGroup>
      <BButton v-for="period in overviewPeriods" :key="period.value"
        :variant="selectedPeriod === period.value ? 'primary' : 'outline-primary'" :disabled="loadingStats"
        @click="selectedPeriod = period.value">
        {{ period.label }}
      </BButton>
    </BButtonGroup>
  </div>

  <BAlert v-if="statsError" variant="danger" show>{{ statsError }}</BAlert>

  <BRow class="row-cols-xxl-4 row-cols-md-2 row-cols-1">
    <BCol v-for="(item, idx) in dashboardStatistics" :key="idx">
      <StatisticWidget :item="item" />
    </BCol>
  </BRow>

  <BRow>
    <BCol cols="12">
      <BCard no-body>
        <BCardBody class="p-0">
          <BRow class="g-0">
            <BCol xxl="3" xl="6" class="order-xl-1 order-xxl-0">
              <TotalSales />
            </BCol>
            <BCol xxl="9" class="order-xl-3 order-xxl-1">
              <SalesAnalytics />
            </BCol>
          </BRow>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xxl="6">
      <ProductInventory />
    </BCol>
    <BCol xxl="6">
      <RecentOrders />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { BAlert, BButton, BButtonGroup, BCard, BCardBody, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { statistics } from './components/data'
import ProductInventory from './components/ProductInventory.vue'
import RecentOrders from './components/RecentOrders.vue'
import SalesAnalytics from './components/SalesAnalytics.vue'
import StatisticWidget from './components/StatisticWidget.vue'
import TotalSales from './components/TotalSales.vue'
import { getDashboardStats, type DashboardPeriod, type DashboardStats } from '~/services/dashboard.service'

const selectedPeriod = ref<DashboardPeriod>('day')
const stats = ref<DashboardStats>({
  revenue: 0,
  completedOrders: 0,
  clients: 0,
  washers: 0,
  products: 0,
  categories: 0,
  brands: 0,
  paidPayments: 0,
})
const loadingStats = ref(false)
const statsError = ref<string | null>(null)

const overviewPeriods: { label: string; value: DashboardPeriod }[] = [
  { label: 'Jour', value: 'day' },
  { label: 'Semaine', value: 'week' },
  { label: 'Mois', value: 'month' },
]

const dashboardStatistics = computed(() => [
  { ...statistics[0]!, value: stats.value.revenue },
  { ...statistics[1]!, value: stats.value.completedOrders },
  { ...statistics[2]!, value: stats.value.clients },
  { ...statistics[3]!, value: stats.value.washers },
  { ...statistics[4]!, value: stats.value.products },
  { ...statistics[5]!, value: stats.value.categories },
  { ...statistics[6]!, value: stats.value.brands },
  { ...statistics[7]!, value: stats.value.paidPayments },
])

const loadDashboardStats = async () => {
  try {
    loadingStats.value = true
    statsError.value = null
    stats.value = await getDashboardStats(selectedPeriod.value)
  } catch (err) {
    console.error('[dashboard] Failed to load dashboard stats', err)
    statsError.value = err instanceof Error ? err.message : 'Impossible de charger les statistiques du dashboard.'
  } finally {
    loadingStats.value = false
  }
}

watch(selectedPeriod, loadDashboardStats)

onMounted(loadDashboardStats)
</script>
