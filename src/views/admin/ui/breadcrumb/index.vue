<template>
  <PageBreadcrumb title="Breadcrumb" subtitle="UI" />

  <BRow>
    <BCol xl="6">
      <CardWithAction title="Basic" isTogglable>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 py-2">
            <li class="breadcrumb-item active" aria-current="page">Home</li>
          </ol>
        </nav>

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 py-2">
            <li class="breadcrumb-item">
              <RouterLink to="#">Home</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Library</li>
          </ol>
        </nav>

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 py-2">
            <li class="breadcrumb-item">
              <RouterLink to="#">Home</RouterLink>
            </li>
            <li class="breadcrumb-item">
              <RouterLink to="#">Library</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="With Icons" isTogglable>
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-light bg-opacity-50 p-2 mb-2">
            <li class="breadcrumb-item active" aria-current="page">
              <Icon icon="house-wifi" class="me-1" />
              Home
            </li>
          </ol>
        </nav>

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-light bg-opacity-50 p-2 mb-2">
            <li class="breadcrumb-item">
              <RouterLink to="#">
                <Icon icon="house-wifi" />
                Home
              </RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Library</li>
          </ol>
        </nav>

        <nav aria-label="breadcrumb">
          <ol class="breadcrumb bg-light bg-opacity-50 p-2 mb-0">
            <li class="breadcrumb-item">
              <RouterLink to="#">
                <Icon icon="house-wifi" />
                Home
              </RouterLink>
            </li>
            <li class="breadcrumb-item">
              <RouterLink to="#">Library</RouterLink>
            </li>
            <li class="breadcrumb-item active" aria-current="page">Data</li>
          </ol>
        </nav>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCol, BRow } from 'bootstrap-vue-next'
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
</script>
