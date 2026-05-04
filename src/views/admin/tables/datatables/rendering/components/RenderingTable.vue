<template>
  <BCard no-body>
    <BCardHeader class="d-flex justify-content-between align-items-center">
      <h4 class="card-title mb-0">Employee DataTable</h4>
      <a href="https://datatables.net/examples/basic_init/data_rendering.html" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      
        <table ref="tableRef" class="table table-striped dt-responsive mb-0 w-100">
          <thead class="thead-sm text-uppercase fs-xxs">
            <tr>
              <th>Name</th>
              <th>Position</th>
              <th>Office</th>
              <th>Progress</th>
              <th>Start date</th>
              <th>Salary</th>
            </tr>
          </thead>
        </table>
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'
import { paginationIcons } from '../../components/data'
import arFlag from '/images/flags/ar.svg'
import auFlag from '/images/flags/au.svg'
import deFlag from '/images/flags/de.svg'
import gbFlag from '/images/flags/gb.svg'
import inFlag from '/images/flags/in.svg'
import jpFlag from '/images/flags/jp.svg'
import usFlag from '/images/flags/us.svg'

const tableRef = ref(null)
let dataTable: any = null

onMounted(async () => {
  const DataTable = (await import('datatables.net-bs5')).default

  const flagMap = {
    Argentina: arFlag,
    Gujarat: inFlag,
    Germany: deFlag,
    London: gbFlag,
    'New York': usFlag,
    'San Francisco': usFlag,
    Sydney: auFlag,
    Tokyo: jpFlag,
  }

  type OfficeKey = keyof typeof flagMap

  if (tableRef.value) {
    dataTable = new DataTable(tableRef.value, {
      ajax: (import.meta.env.VITE_BASE_URL || '') + '/data/datatables-rendering.json',
      processing: true,
      responsive: true,

      columns: [
        { data: 'name' },

        {
          data: 'position',
          render(data, type) {
            if (type === 'display') {
              let link = 'https://datatables.net'

              if (data[0] < 'H') link = 'https://cloudtables.com'
              else if (data[0] < 'S') link = 'https://editor.datatables.net'

              return `<a href="${link}" target="_blank">${data}</a>`
            }
            return data
          },
        },

        {
          data: 'office',
          className: 'f32',
          render(data: OfficeKey, type: string) {
            if (type === 'display') {
              const flag = flagMap[data] || ''
              return `
                <span class="flag">
                  <img class="avatar-xs rounded me-2" src="${flag}" alt="${data}" />
                </span> ${data}
              `
            }
            return data
          },
        },

        {
          data: 'extn',
          render(data, type) {
            if (type === 'display') {
              const percent = (data / 9999) * 100
              return `
                <div class="progress" style="height:8px">
                  <div class="progress-bar" style="width:${percent}%"></div>
                </div>
              `
            }
            return data
          },
        },

        { data: 'start_date' },

        {
          data: 'salary',
          render(data, type) {
            const formatted = `${'$'}${data.toLocaleString('en-US', { minimumFractionDigits: 2 })}`

            if (type === 'display') {
              let color = 'green'
              if (data < 250000) color = 'red'
              else if (data < 500000) color = 'orange'

              return `<span style="color:${color}">${formatted}</span>`
            }
            return formatted
          },
        },
      ],

      language: {
        paginate: paginationIcons,
      },
    })
  }
})

onBeforeUnmount(() => {
  if (dataTable) dataTable.destroy(true)
})
</script>
