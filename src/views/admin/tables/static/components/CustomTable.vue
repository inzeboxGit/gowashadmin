<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between d-flex align-items-center">
      <BCardTitle>Custom Table</BCardTitle>
      <span class="badge badge-label badge-soft-success fs-xxs">Exclusive</span>
    </BCardHeader>

    <BCardBody class="p-0">
      <BTableSimple responsive class="table-custom align-middle mb-0">
        <thead class="bg-light align-middle bg-opacity-25 thead-sm">
          <tr class="text-uppercase fs-xxs">
            <th v-for="(header, idx) in staticTableData.header" :key="idx" :style="header === 'Actions' ? { width: '1%' } : { width: 'auto' }">
              {{ header }}
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(product, idx) in staticTableData.data" :key="idx">
            <td>{{ product.name }}</td>
            <td>{{ product.category }}</td>
            <td>{{ product.price }}</td>
            <td>{{ product.stock }}</td>
            <td>{{ product.rating }} ★</td>
            <td>
              <span class="badge badge-label" :class="`badge-soft-${product.status === 'active' ? 'success' : 'warning'}`">
                {{ toPascalCase(product.status) }}
              </span>
            </td>

            <td class="text-end">
              <BDropdown variant="link" toggle-class="drop-arrow-none fs-xxl link-reset p-0 text-muted" end>
                <template #button-content>
                  <Icon icon="ellipsis-vertical" />
                </template>
                <BDropdownItem> <Icon icon="eye" class="me-1" /> View View </BDropdownItem>
                <BDropdownItem> <Icon icon="square-pen" class="me-1" /> Edit </BDropdownItem>
                <BDropdownItem to="#" class="text-danger"> <Icon icon="trash-2" class="me-1" /> Delete </BDropdownItem>
              </BDropdown>
            </td>
          </tr>
        </tbody>
      </BTableSimple>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BTableSimple } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import { toPascalCase } from '~/utils/helpers'
import { staticTableData } from './data'
</script>
