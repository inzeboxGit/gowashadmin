<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Example</BCardTitle>
      <a href="https://datatables.net/examples/api/add_row.html" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg"></Icon>
      </a>
    </BCardHeader>

    <BCardBody>
      
        <component :is="DataTableComponent" ref="tableRef" :data="tableRows" :columns="columns" :options="options" class="table table-striped dt-responsive align-middle mb-0">
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
import type { Api, Config } from 'datatables.net'
import { onMounted, ref, shallowRef, type Component, type ComponentPublicInstance, type Ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { columns, paginationIcons, tableData } from '../../components/data'

/* ---------------- Types ---------------- */
type DataTableComponentInstance = ComponentPublicInstance & {
  dt(): Api
}

/* ---------------- Refs ---------------- */
const DataTableComponent = shallowRef<Component | null>(null)
const tableRef: Ref<DataTableComponentInstance | null> = ref(null)
const tableRows = ref(tableData.body.slice(0, 5))

/* ---------------- Add Row Logic ---------------- */
const addRow = () => {
  const next = tableData.body[tableRows.value.length]
  if (!next) return

  tableRows.value.push(next)

  const dt = tableRef.value?.dt()
  if (dt) {
    dt.row.add(next).draw(false)
  }
}

/* ---------------- DataTables Top Button ---------------- */
const renderTopStart = () => {
  const container = document.createElement('div')
  container.className = 'd-flex align-items-center gap-2'

  const button = document.createElement('button')
  button.className = 'btn btn-primary btn-sm'
  button.innerText = 'Add Row'

  button.onclick = () => {
    addRow()
  }

  container.appendChild(button)
  return container
}

/* ---------------- DataTable Options ---------------- */
const options: Config = {
  responsive: true,
  lengthChange: false,
  language: {
    paginate: paginationIcons,
  },
  layout: {
    topStart: renderTopStart,
  },
}

/* ---------------- Load DataTables (Client Only) ---------------- */
onMounted(async () => {
  const [{ default: DataTableVue }, { default: DataTableCore }] = await Promise.all([import('datatables.net-vue3'), import('datatables.net-bs5')])

  DataTableVue.use(DataTableCore)
  DataTableComponent.value = DataTableVue
})
</script>
