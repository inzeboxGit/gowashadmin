<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Basic Datatable</BCardTitle>
      <a href="https://datatables.net/examples/api/show_hide.html" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg"></Icon>
      </a>
    </BCardHeader>

    <BCardBody>
      
        <component :is="DataTableComponent" ref="tableRef" :data="tableData.body" :columns="columns" :options="options" class="table table-striped dt-responsive align-middle mb-0">
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
import { onMounted, ref, shallowRef, type Component, type ComponentPublicInstance } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { columns, paginationIcons, tableData } from '../../components/data'

/* ---------------- Types ---------------- */
type DataTableInstance = ComponentPublicInstance & {
  dt(): Api
}

/* ---------------- State ---------------- */
const DataTableComponent = shallowRef<Component | null>(null)
const tableRef = ref<DataTableInstance | null>(null)

/* Column labels (UI only) */
const columnLabels = ['Company', 'Symbol', 'Price', 'Change', 'Volume', 'Market Cap', 'Rating', 'Status']

/* ---------------- Column Toggle Dropdown ---------------- */
const renderTopStart = () => {
  const container = document.createElement('div')
  container.className = 'd-flex align-items-center gap-2'

  const dropdown = document.createElement('div')
  dropdown.className = 'dropdown'

  const toggleBtn = document.createElement('button')
  toggleBtn.type = 'button'
  toggleBtn.className = 'btn btn-secondary btn-sm dropdown-toggle content-none'
  toggleBtn.textContent = 'Show / Hide Columns'
  toggleBtn.setAttribute('aria-expanded', 'false')

  const menu = document.createElement('ul')
  menu.className = 'dropdown-menu'

  /* Toggle dropdown manually */
  toggleBtn.onclick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    const open = menu.classList.contains('show')
    menu.classList.toggle('show', !open)
    toggleBtn.setAttribute('aria-expanded', (!open).toString())
  }

  /* Close on outside click */
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target as Node)) {
      menu.classList.remove('show')
      toggleBtn.setAttribute('aria-expanded', 'false')
    }
  })

  /* Create checkboxes */
  columnLabels.forEach((label, index) => {
    const li = document.createElement('li')
    li.className = 'dropdown-item px-2'

    const wrapper = document.createElement('div')
    wrapper.className = 'form-check'

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'form-check-input form-check-input-light fs-14 mt-0'
    checkbox.checked = true

    /* 🔑 FIX: index + 1 because Responsive adds control column */
    checkbox.onchange = () => {
      const dt = tableRef.value?.dt()
      if (!dt) return

      dt.column(index + 1).visible(checkbox.checked)
    }

    const text = document.createElement('label')
    text.className = 'form-check-label fw-medium'
    text.textContent = label

    wrapper.appendChild(checkbox)
    wrapper.appendChild(text)
    li.appendChild(wrapper)
    menu.appendChild(li)
  })

  dropdown.appendChild(toggleBtn)
  dropdown.appendChild(menu)
  container.appendChild(dropdown)

  return container
}

/* ---------------- DataTable Options ---------------- */
const options: Config = {
  responsive: true,
  lengthChange: false,
  layout: {
    topStart: renderTopStart,
    topEnd: 'search',
  },
  language: {
    paginate: paginationIcons,
  },
}

/* ---------------- Load DataTable (Client Only) ---------------- */
onMounted(async () => {
  const [{ default: DataTableVue }, { default: DataTableCore }] = await Promise.all([import('datatables.net-vue3'), import('datatables.net-bs5')])

  DataTableVue.use(DataTableCore)
  DataTableComponent.value = DataTableVue
})
</script>
