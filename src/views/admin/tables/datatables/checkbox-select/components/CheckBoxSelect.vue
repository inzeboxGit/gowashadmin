<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Example</BCardTitle>
      <a href="https://datatables.net/extensions/select/examples/checkbox/checkbox.html" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg"></Icon>
      </a>
    </BCardHeader>

    <BCardBody>
      
        <DataTableComponent v-if="DataTableComponent" :data="tableData.body" :columns="columns" :options="dtOptions" class="table table-striped dt-responsive align-middle w-100" />
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { onMounted, shallowRef, type Component } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { toPascalCase } from '~/utils/helpers'
import { paginationIcons, tableData } from '../../components/data'

const DataTableComponent = shallowRef<Component | null>(null)
const columns = shallowRef<object[]>([])

const dtOptions = {
  responsive: true,
  order: [[1, 'asc']],
  select: {
    style: 'multi',
    items: 'row',
    headerCheckbox: 'select-all',
    className: 'selected',
  },
  language: {
    select: {
      rows: {
        _: '%d rows selected',
        1: '1 row selected',
      },
    },
    paginate: paginationIcons,
  },
  columnDefs: [{ orderable: false, targets: 0 }],
}

onMounted(async () => {
  const [{ default: DataTable }, { default: DataTablesCore }] = await Promise.all([import('datatables.net-vue3'), import('datatables.net-bs5')])

  await import('datatables.net-select')

  DataTable.use(DataTablesCore)

  DataTableComponent.value = DataTable

  columns.value = [
    {
      data: null,
      title: '',
      orderable: false,
      className: 'select-checkbox',
      render: DataTablesCore.render.select(),
    },
    { data: 'company', title: 'Company' },
    { data: 'symbol', title: 'Symbol' },
    {
      data: 'price',
      title: 'Price',
      render: (d: number) => `${d.toLocaleString()}`,
    },
    {
      data: 'change',
      title: 'Change',
      render: (d: number) => `${d}%`,
    },
    { data: 'volume', title: 'Volume' },
    {
      data: 'marketCap',
      title: 'Market Cap',
      render: (d: number) => `${d.toLocaleString()}`,
    },
    {
      data: 'rating',
      title: 'Rating',
      render: (d: number) => `${d.toFixed(1)}★`,
    },
    {
      data: 'status',
      title: 'Status',
      render: (d: string) => `<span class="badge badge-label badge-soft-${d.toLowerCase() === 'bullish' ? 'success' : 'danger'}">${toPascalCase(d)}</span>`,
    },
  ]
})
</script>
