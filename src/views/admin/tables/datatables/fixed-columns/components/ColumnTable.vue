<template>
  <div class="dt-b-none">
    
      <component :is="DataTableComponent" :data="companies" :columns="columns" :options="options" class="table table-striped align-middle mb-0 w-100"> </component>
    
  </div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { columns, companies } from './data'

const DataTableComponent: any = shallowRef(null)

onMounted(async () => {
  const [{ default: DataTable }, { default: DataTablesCore }, { default: FixedColumns }, { default: Responsive }] = await Promise.all([import('datatables.net-vue3'), import('datatables.net-bs5'), import('datatables.net-fixedcolumns-bs5'), import('datatables.net-responsive-bs5')])

  DataTable.use(DataTablesCore)
  DataTable.use(FixedColumns)
  DataTable.use(Responsive)

  DataTableComponent.value = DataTable

  setTimeout(() => {
    const tables = document.querySelectorAll('.dataTable')
    tables.forEach((tbl: any) => {
      if (tbl.api) tbl.api().columns.adjust().draw(false)
    })
  }, 300)
})

const options = {
  scrollX: true,
  paging: false,
  scrollY: '300px',
  scrollCollapse: true,
  pageLength: 10,
  ordering: true,
  responsive: false,
  fixedColumns: {
    leftColumns: 1,
    rightColumns: 1,
  },
  lengthChange: false,
}
</script>
