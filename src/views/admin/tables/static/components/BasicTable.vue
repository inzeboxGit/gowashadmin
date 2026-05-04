<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <BCardTitle>Basic Table</BCardTitle>
      <a href="https://bootstrap-vue-next.github.io/bootstrap-vue-next/docs/components/table.html" target="_blank" class="icon-link icon-link-hover link-secondary link-underline-secondarlink-secondary link-underline-opacity-25 fw-semibold">
        View Docs
        <Icon icon="arrow-right" class="bi align-middle fs-lg" />
      </a>
    </BCardHeader>

    <BCardBody>
      <BTableSimple responsive class="align-middle mb-0">
        <thead class="fs-xs">
          <tr>
            <th v-for="(header, idx) in staticTableData.header" :key="idx">{{ header }}</th>
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
            <td>
              <BButton variant="primary" size="sm">Edit</BButton>
              &nbsp;
              <BButton variant="danger" size="sm">Delete</BButton>
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
