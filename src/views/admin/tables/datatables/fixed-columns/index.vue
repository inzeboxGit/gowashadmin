<template>
  <PageBreadcrumb title="Fixed Columns" subtitle="Datatables" />
  <BRow>
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader class="justify-content-between">
          <h4 class="card-title">Example</h4>
          <a href="https://datatables.net/extensions/fixedcolumns/examples/initialisation/left_right_columns.html" target="_blank" class="icon-link icon-link-hover link-primary fw-semibold">
            View Docs
            <Icon icon="arrow-right" class="bi align-middle fs-lg"></Icon>
          </a>
        </BCardHeader>
        <BCardBody>
          <ColumnTable />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import ColumnTable from './components/ColumnTable.vue'
</script>
