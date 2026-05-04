<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Export Data with Dropdowns</BCardTitle>
      <a href="https://datatables.net/examples/styling/bootstrap5" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      
        <component :is="DataTableComponent" :data="tableData.body" :columns="columns" :options="options" class="table table-striped dt-responsive align-middle mb-0">
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
import { type Component, onMounted, shallowRef } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { columns, paginationIcons, tableData } from '../../components/data'

const DataTableComponent = shallowRef<Component | null>(null)

onMounted(async () => {
  const [{ default: DataTable }, { default: DataTablesCore }, { default: jszip }, { default: pdfmake }] = await Promise.all([
    import('datatables.net-vue3'),
    import('datatables.net'),
    import('datatables.net-buttons'),
    import('datatables.net-buttons/js/buttons.html5'),
    import('datatables.net-buttons-bs5'),
    import('jszip'),
    import('pdfmake'),
  ])

  DataTable.use(DataTablesCore)
  DataTablesCore.Buttons.jszip(jszip)
  DataTablesCore.Buttons.pdfMake(pdfmake)

  DataTableComponent.value = DataTable
})

const options: Config = {
  responsive: true,
  dom: "<'d-md-flex justify-content-between align-items-center my-2'<'dropdown'B>f>" + 'rt' + "<'d-md-flex justify-content-between align-items-center mt-2'ip>",
  buttons: [
    {
      extend: 'collection',
      text: 'Export',
      buttons: ['copy', 'csv', 'excel', 'pdf'],
      className: 'btn btn-sm btn-secondary dropdown-toggle',
    },
  ],
  language: {
    paginate: paginationIcons,
  },
}
</script>
