<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Nesting</BCardTitle>
      <a href="https://getbootstrap.com/docs/5.3/content/tables/#nesting" target="_blank" class="icon-link icon-link-hover link-secondary link-underline-secondarlink-secondary link-underline-opacity-25 fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      <BTableSimple responsive class="align-middle mb-0">
        <thead class="align-middle thead-sm">
          <tr class="text-uppercase fs-xxs">
            <th v-for="head in staticTableData.header" :key="head">{{ head }}</th>
          </tr>
        </thead>

        <tbody>
          <template v-for="(item, index) in staticTableData.data" :key="index">
            <tr>
              <td>{{ item.name }}</td>
              <td>{{ item.category }}</td>
              <td>{{ item.price }}</td>
              <td>{{ item.stock }}</td>
              <td>{{ item.rating }} ★</td>

              <td>
                <span
                  class="badge badge-label"
                  :class="{
                    'badge-soft-success': item.status === 'active',
                    'badge-soft-danger': item.status === 'out-of-stock',
                  }"
                >
                  {{ item.status === 'active' ? 'Active' : 'Out of Stock' }}
                </span>
              </td>

              <td class="text-end">
                <BDropdown end variant="link" class="text-muted" toggle-class="fs-xxl link-reset p-0 drop-arrow-none">
                  <template #button-content>
                    <Icon icon="ellipsis-vertical" />
                  </template>
                  <BDropdownItem><Icon icon="eye" class="me-1" /> View</BDropdownItem>
                  <BDropdownItem><Icon icon="square-pen" class="me-1" /> Edit</BDropdownItem>
                  <BDropdownItem to="#" class="text-danger"><Icon icon="trash-2" class="me-1" /> Delete</BDropdownItem>
                </BDropdown>
              </td>
            </tr>

            <tr v-if="item.children">
              <td colspan="7" class="p-3">
                <table class="table table-sm mb-0">
                  <thead class="align-middle thead-sm">
                    <tr class="text-uppercase fs-xxs">
                      <th>Variant</th>
                      <th>Color</th>
                      <th>SKU</th>
                      <th>Stock</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(child, cIdx) in item.children" :key="cIdx">
                      <td>{{ child.variant }}</td>
                      <td>{{ child.color }}</td>
                      <td>{{ child.sku }}</td>
                      <td>{{ child.stock }}</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </template>
        </tbody>
      </BTableSimple>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
import { staticTableData } from './data'
</script>
