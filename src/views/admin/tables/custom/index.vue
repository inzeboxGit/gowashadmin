<template>
  <PageBreadcrumb title="Custom Table" subtitle="Tables" />
  <BRow>
    <BCol xs="12">
      <TableWithSearch />
    </BCol>
  </BRow>
  <BRow>
    <BCol xs="12">
      <TableWithCheckBoxSelect />
    </BCol>
  </BRow>
  <BRow>
    <BCol xs="12">
      <TableWithDeleteButton />
    </BCol>
  </BRow>
  <BRow>
    <BCol xs="12">
      <TableWithPagination />
    </BCol>
  </BRow>
  <BRow>
    <BCol xs="12">
      <TableWithPaginationInfo />
    </BCol>
  </BRow>
  <BRow>
    <BCol xs="12">
      <TableWithFilters />
    </BCol>
  </BRow>
  <BRow>
    <BCol xs="12">
      <TableWithRangeFilters />
    </BCol>
  </BRow>
  <BRow>
    <BCol xs="12">
      <TableWithSort />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import TableWithCheckBoxSelect from './components/TableWithCheckBoxSelect.vue'
import TableWithDeleteButton from './components/TableWithDeleteButton.vue'
import TableWithFilters from './components/TableWithFilters.vue'
import TableWithPagination from './components/TableWithPagination.vue'
import TableWithPaginationInfo from './components/TableWithPaginationInfo.vue'
import TableWithRangeFilters from './components/TableWithRangeFilters.vue'
import TableWithSearch from './components/TableWithSearch.vue'
import TableWithSort from './components/TableWithSort.vue'
</script>
