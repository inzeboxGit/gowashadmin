<template>
  <BCard no-body>
    <BCardHeader class="d-flex justify-content-between align-items-center">
      <h4 class="card-title">Captions</h4>
      <a
        href="https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/table.html#custom-empty-and-empty-filtered-rendering"
        target="_blank"
        class="icon-link icon-link-hover link-secondary link-underline-secondarlink-secondary link-underline-opacity-25 fw-semibold"
      >
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      <div class="table-responsive">
        <BTableSimple responsive hover class="align-middle mb-0">
          <caption>
            List of Ecommerce Products
          </caption>

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
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BTableSimple } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import { toPascalCase } from '~/utils/helpers'
import { staticTableData } from './data'
</script>
