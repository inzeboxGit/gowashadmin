<template>
  <PageBreadcrumb title="Static Tables" subtitle="Tables" />

  <BasicTable />
  <CustomTable />
  <VariantsTable />
  <StripedRowTable />
  <StripedColumnTable />
  <HoverableRowsTable />
  <ActiveRowTable />
  <BorderedTable />
  <SmallTable />
  <TableGroupDividers />
  <NestedTable />
  <TableHead />
  <TableCaption />
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import ActiveRowTable from './components/ActiveRowTable.vue'
import BasicTable from './components/BasicTable.vue'
import BorderedTable from './components/BorderedTable.vue'
import CustomTable from './components/CustomTable.vue'
import HoverableRowsTable from './components/HoverableRowsTable.vue'
import NestedTable from './components/NestedTable.vue'
import SmallTable from './components/SmallTable.vue'
import StripedColumnTable from './components/StripedColumnTable.vue'
import StripedRowTable from './components/StripedRowTable.vue'
import TableCaption from './components/TableCaption.vue'
import TableGroupDividers from './components/TableGroupDividers.vue'
import TableHead from './components/TableHead.vue'
import VariantsTable from './components/VariantsTable.vue'
</script>
