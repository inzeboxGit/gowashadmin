<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Render Columns Table</BCardTitle>
      <a href="https://datatables.net/examples/data_sources/js_array.html" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      
        <component :is="DataTableComponent" :columns="columns" :options="options" class="table table-striped dt-responsive align-middle mb-0">
          <thead class="thead-sm text-uppercase fs-xxs">
            <tr>
              <th>Company</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Change</th>
              <th>Volume</th>
              <th>Market Cap</th>
              <th>Rating</th>
              <th>Status</th>
            </tr>
          </thead>
        </component>
      
    </BCardBody>
  </BCard>
</template>
<script setup lang="ts">
import type { Config } from 'datatables.net'
import { onMounted, shallowRef, type Component } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { paginationIcons } from '../../components/data'
import { dataSet } from './data'

const DataTableComponent = shallowRef<Component | null>(null)

onMounted(async () => {
  const [{ default: DataTable }, { default: DataTablesCore }] = await Promise.all([import('datatables.net-vue3'), import('datatables.net-bs5')])

  DataTable.use(DataTablesCore)

  DataTableComponent.value = DataTable
})

const columns = [
  { title: 'company' },
  { title: 'symbol' },
  {
    title: 'price',
    className: 'text-start',
    render: (data: number) => `${'$'}${data}`,
  },
  {
    title: 'change',
    className: 'text-start',
  },
  {
    title: 'volume',
    className: 'text-start',
  },
  {
    title: 'market cap',
    render: (data: string) => `${'$'}${data}`,
  },
  { title: 'rating' },
  {
    title: 'status',
    render: (data: string) => {
      const badgeClass = data === 'Bullish' ? 'success' : 'danger'
      return `<span class="badge badge-label badge-soft-${badgeClass}">${data}</span>`
    },
  },
]

const options: Config = {
  data: dataSet,
  responsive: true,
  language: {
    paginate: paginationIcons,
  },
}
</script>
