<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <h4 class="card-title">Table Group Dividers</h4>
      <a href="https://getbootstrap.com/docs/5.3/content/tables/#table-group-dividers" target="_blank" class="icon-link icon-link-hover link-secondary link-underline-secondarlink-secondary link-underline-opacity-25 fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      <BTableSimple responsive class="table align-middle mb-0">
        <thead class="align-middle thead-sm">
          <tr class="text-uppercase fs-xxs">
            <th v-for="(header, idx) in staticTableData.header" :key="idx" :style="header === 'Actions' ? { width: '1%' } : { width: 'auto' }">
              {{ header }}
            </th>
          </tr>
        </thead>

        <tbody class="table-group-divider">
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
              <BDropdown end variant="link" class="text-muted" toggle-class="drop-arrow-none fs-xxl link-reset p-0">
                <template #button-content>
                  <Icon icon="ellipsis-vertical" />
                </template>

                <BDropdownItem> <Icon icon="eye" class="me-1" /> View </BDropdownItem>
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
import Icon from '~/components/wrappers/Icon.vue'
import { toPascalCase } from '~/utils/helpers'
import { staticTableData } from './data'
</script>
