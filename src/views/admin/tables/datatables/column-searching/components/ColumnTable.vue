<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Example</BCardTitle>
      <a href="https://datatables.net/examples/api/multi_filter.html" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      
        <component :is="DataTableComponent" :data="tableData.body" :columns="columns" :options="options" class="table table-striped dt-responsive align-middle mb-0">
          <thead class="thead-sm text-uppercase fs-xxs">
            <tr>
              <th v-for="(label, idx) in tableData.header" :key="idx">{{ label }}</th>
            </tr>

            <tr id="column-search-inputs" class="column-search-input-bar">
              <th v-for="(label, index) in tableData.header" :key="'search-' + index">
                <input :placeholder="label" type="text" class="form-control form-control-sm bg-light-subtle border-light" />
              </th>
            </tr>
          </thead>
        </component>
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import type { Config } from 'datatables.net'
import type { Component } from 'vue'
import { onMounted, shallowRef } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { columns, paginationIcons, tableData } from '../../components/data'

const DataTableComponent = shallowRef<Component | null>(null)

onMounted(async () => {
  const [{ default: DataTable }, { default: DataTablesCore }] = await Promise.all([import('datatables.net-vue3'), import('datatables.net-bs5')])

  DataTable.use(DataTablesCore)

  DataTableComponent.value = DataTable
})

const options: Config = {
  responsive: true,

  language: {
    paginate: paginationIcons,
  },

  initComplete: function () {
    const api = this.api()

    document.querySelectorAll('#column-search-inputs th').forEach((th) => {
      th.addEventListener('click', (e) => e.stopPropagation())
    })

    document.querySelectorAll('#column-search-inputs th input').forEach((input, index) => {
      input.addEventListener('click', (e) => e.stopPropagation())

      input.addEventListener('keyup', function (this: HTMLInputElement) {
        if (api.column(index).search() !== this.value) {
          api.column(index).search(this.value).draw()
        }
      })
    })
  },
}
</script>
