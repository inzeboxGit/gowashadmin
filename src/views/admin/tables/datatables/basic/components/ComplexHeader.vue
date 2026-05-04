<template>
  <BCard no-body>
    <BCardHeader class="d-flex justify-content-between align-items-center">
      <BCardTitle class="mb-0">Complex Header</BCardTitle>
      <a href="https://datatables.net/examples/styling/bootstrap5" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      
        <component :is="DataTableComponent" :data="tableData.body" :columns="columns" :options="options" class="table table-bordered dt-responsive align-middle mb-0 nowrap w-100">
          <thead class="thead-sm text-uppercase fs-xxs">
            <tr>
              <th colspan="2">Company Info</th>
              <th colspan="2">Rate</th>
              <th colspan="2">More</th>
              <th colspan="2">Other</th>
            </tr>
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
  const [{ default: DataTableVue }, { default: DataTablesCore }] = await Promise.all([import('datatables.net-vue3'), import('datatables.net-bs5')])

  DataTableVue.use(DataTablesCore)
  DataTableComponent.value = DataTableVue
})

const options: Config = {
  responsive: true,
  language: {
    paginate: paginationIcons,
  },
}
</script>
