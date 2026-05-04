<template>
  <PageBreadcrumb title="Flag Icons" subtitle="Icons" />
  <BRow class="justify-content-center">
    <BCol xxl="10">
      <BCard no-body>
        <BCardHeader class="justify-content-between">
          <div>
            <BCardTitle as="h4" class="mb-1 d-flex align-items-center gap-2">Flags Listing (SVG)</BCardTitle>
            <p class="mb-0 text-muted">We offer a set of scalable SVG flags, perfect for language selectors and international content.</p>
          </div>
          <div class="app-search">
            <BFormInput type="search" placeholder="Search country..." id="countrySearch" />
            <Icon icon="search" class="app-search-icon text-muted" />
          </div>
        </BCardHeader>

        <BCardBody>
          <BTable
            bordered
            show-empty
            :filter="searchQuery"
            empty-text="Nothing found."
            thead-class="align-middle"
            hover
            :fields="fields"
            :items="allCountries"
            :per-page="perPage"
            :current-page="currentPage"
            @filtered="onFiltered"
            responsive
            class="align-middle text-center w-100"
          >
            <template #head()="data">
              <span class="fs-xxs">{{ data.label }}</span>
            </template>
            <template #cell(flag)="{ item }">
              <img :src="item.flag" alt="Aruba" height="18" class="rounded" />
            </template>
            <template #cell(path)="{ item }">
              <code>{{ item.flag }}</code>
            </template>
            <template #cell(code)="{ item }">
              {{ item.code.toUpperCase() }}
            </template>
          </BTable>
          <BCardFooter class="border-0">
            <TablePagination v-model:currentPage="currentPage" :per-page="perPage" :total-items="totalRows" label="categories" class="mb-0 pb-0" />
          </BCardFooter>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardFooter, BCardHeader, BCol, BFormInput, BRow, BTable, type TableFieldRaw } from 'bootstrap-vue-next'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TablePagination from '~/components/TablePagination.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { countryData, type CountryType } from './components/data'

const fields: Exclude<TableFieldRaw<CountryType>, string>[] = [
  { key: 'flag', label: 'Flag' },
  { key: 'name', label: 'Country Name' },
  { key: 'path', label: 'Path' },
  { key: 'code', label: 'Code' },
]

const searchQuery = ref('')

const currentPage = ref(1)
const perPage = ref(50)
const totalRows = ref(countryData.length)
const allCountries = ref<CountryType[]>(countryData)

function onFiltered(filteredItems: CountryType[]) {
  totalRows.value = filteredItems.length
  currentPage.value = 1
}
</script>
