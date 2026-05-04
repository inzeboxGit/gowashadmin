<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Small Table</BCardTitle>
      <a href="https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/table.html" target="_blank" class="icon-link icon-link-hover link-secondary link-underline-secondarlink-secondary link-underline-opacity-25 fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      <BTableSimple responsive small class="align-middle mb-0">
        <thead class="align-middle thead-sm">
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
            <td class="text-center">
              <BDropdown end variant="link" class="text-muted" toggle-class="fs-xxl link-reset p-0 drop-arrow-none">
                <template #button-content>
                  <Icon icon="ellipsis-vertical" />
                </template>
                <BDropdownItem href=""> <Icon icon="eye" class="me-1" /> View </BDropdownItem>
                <BDropdownItem href=""> <Icon icon="square-pen" class="me-1" /> Edit </BDropdownItem>
                <BDropdownItem href="" class="text-danger"> <Icon icon="trash-2" class="me-1" /> Delete </BDropdownItem>
              </BDropdown>
            </td>
          </tr>
        </tbody>
      </BTableSimple>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
import { toPascalCase } from '~/utils/helpers'
import { staticTableData } from './data'
</script>
