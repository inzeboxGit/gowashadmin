<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Cell Selection</BCardTitle>
      <a href="https://datatables.net/reference/option/select" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      
        <component :is="DataTableComponent" :data="tableData.body" :columns="columns" :options="options" class="table dt-responsive align-middle mb-0">
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
  const [{ default: DataTable }, { default: DataTablesCore }, { default: DataTablesSelect }] = await Promise.all([import('datatables.net-vue3'), import('datatables.net-bs5'), import('datatables.net-select')])

  DataTable.use(DataTablesCore)
  DataTable.use(DataTablesSelect)

  DataTableComponent.value = DataTable
})

const options: Config = {
  responsive: true,
  select: {
    style: 'os',
    items: 'cell',
  },
  pageLength: 7,
  lengthMenu: [7, 10, 25, 50, -1],
  language: {
    paginate: paginationIcons,
  },
}
</script>
