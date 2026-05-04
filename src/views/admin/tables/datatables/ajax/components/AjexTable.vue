<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>AJAX DataTable</BCardTitle>
      <a href="https://datatables.net/examples/ajax/" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      
        <component :is="DataTableComponent" ajax="/data/datatables.json" :columns="columns" :options="options" class="table table-striped dt-responsive align-middle mb-0">
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
  const [{ default: DataTable }, { default: DataTablesCore }] = await Promise.all([import('datatables.net-vue3'), import('datatables.net-bs5')])

  DataTable.use(DataTablesCore)

  DataTableComponent.value = DataTable
})

const options: Config = {
  processing: true,
  responsive: true,
  language: {
    paginate: paginationIcons,
  },
}
</script>
