<template>
  <PageBreadcrumb title="Vector Maps" subtitle="Maps" />

  <BRow>
    <BCol xl="6">
      <BCard no-body>
        <BCardHeader class="d-block">
          <BCardTitle as="h4" class="mb-1">World Vector Map</BCardTitle>
          <p class="text-muted mb-0">A global map showing countries with interactive markers.</p>
        </BCardHeader>
        <BCardBody>
          <JsVectorMap id="global-map" :options="getWorldMapOptions()" style="height: 360px" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader class="d-block">
          <BCardTitle as="h4" class="mb-1">World Vector Live Map</BCardTitle>
          <p class="text-muted mb-0">Live dynamic vector representation of the world with real-time features.</p>
        </BCardHeader>
        <BCardBody>
          <JsVectorMap id="world-map-marker-line" :options="getWorldMarkerLineOptions()" style="height: 360px" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader class="d-block">
          <BCardTitle as="h4" class="mb-1">US Vector Map</BCardTitle>
          <p class="text-muted mb-0">Interactive vector map of the United States with state-level details.</p>
        </BCardHeader>
        <BCardBody>
          <JsVectorMap id="usa-vector-map" :options="getUSAMapOptions()" style="height: 360px" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader class="d-block">
          <BCardTitle as="h4" class="mb-1">Canada Vector Map</BCardTitle>
          <p class="text-muted mb-0">Displays Canadian provinces and territories with interactive regions.</p>
        </BCardHeader>
        <BCardBody>
          <JsVectorMap id="canada-map" :options="getCanadaMapOptions()" style="height: 360px" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader class="d-block">
          <BCardTitle as="h4" class="mb-1">Russia Vector Map</BCardTitle>
          <p class="text-muted mb-0">DInteractive map highlighting major regions across Russia..</p>
        </BCardHeader>
        <BCardBody>
          <JsVectorMap id="russia-map" :options="getRussiaMapOptions()" style="height: 360px" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader class="d-block">
          <BCardTitle as="h4" class="mb-1">Iraq Vector Map</BCardTitle>
          <p class="text-muted mb-0">Vector visualization of Iraq highlighting provinces and regions.</p>
        </BCardHeader>
        <BCardBody>
          <JsVectorMap id="iraq-map" :options="getIraqMapOptions()" style="height: 360px" />
        </BCardBody>
      </BCard>
    </BCol>

    <BCol xl="6">
      <BCard no-body>
        <BCardHeader class="d-block">
          <BCardTitle as="h4" class="mb-1">Spain Vector Map</BCardTitle>
          <p class="text-muted mb-0">Geographical map of Spain with region-based interaction.</p>
        </BCardHeader>
        <BCardBody>
          <JsVectorMap id="spain-map" :options="getSpainMapOptions()" style="height: 360px" />
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import JsVectorMap from '~/components/JsVectorMap.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import { getCanadaMapOptions, getIraqMapOptions, getRussiaMapOptions, getSpainMapOptions, getUSAMapOptions, getWorldMapOptions, getWorldMarkerLineOptions } from './components/data'
</script>
