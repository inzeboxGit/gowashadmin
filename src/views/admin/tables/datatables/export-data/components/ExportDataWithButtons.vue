<template>
  <BCard no-body>
    <BCardHeader class="d-flex justify-content-between align-items-center">
      <BCardTitle class="mb-0">Export Data with Buttons</BCardTitle>
      <a href="https://datatables.net/examples/styling/bootstrap5" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      
        <component :is="DataTableComponent" :data="tableData.body" :columns="columns" :options="options" class="table table-striped dt-responsive align-middle mb-0 w-100">
          <thead class="thead-sm text-uppercase fs-xxs">
            <tr>
              <th v-for="(label, idx) in tableData.header" :key="idx">
                {{ label }}
              </th>
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
import { columns, paginationIcons, tableData } from '../../components/data'

const DataTableComponent = shallowRef<Component | null>(null)

onMounted(async () => {
  const [{ default: DataTableVue }, { default: DataTablesCore }, { default: Buttons }, { default: ButtonsHTML5 }, jszip, pdfmake] = await Promise.all([
    import('datatables.net-vue3'),
    import('datatables.net-bs5'),
    import('datatables.net-buttons-bs5'),
    import('datatables.net-buttons/js/buttons.html5'),
    import('jszip'),
    import('pdfmake'),
  ])

  DataTableVue.use(DataTablesCore)
  DataTableVue.use(Buttons)
  DataTableVue.use(ButtonsHTML5)

  DataTablesCore.Buttons.jszip(jszip.default)
  DataTablesCore.Buttons.pdfMake(pdfmake.default)

  DataTableComponent.value = DataTableVue
})

const options: Config = {
  responsive: true,
  layout: {
    topStart: 'buttons',
  },
  buttons: [
    { extend: 'copy', className: 'btn btn-sm btn-secondary' },
    { extend: 'csv', className: 'btn btn-sm btn-secondary active' },
    { extend: 'excel', className: 'btn btn-sm btn-secondary' },
    { extend: 'pdf', className: 'btn btn-sm btn-secondary active' },
  ],
  language: {
    paginate: paginationIcons,
  },
}
</script>
