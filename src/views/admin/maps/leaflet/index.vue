<template>
  <PageBreadcrumb title="Leaflet Maps" subtitle="Map" />
  <BRow>
    <BCol xl="6">
      <BasicMap />
    </BCol>
    <BCol xl="6">
      <ShapeMap />
    </BCol>
    <BCol xl="6">
      <DraggableMarker />
    </BCol>
    <BCol xl="6">
      <CustomIconsMap />
    </BCol>
    <BCol xl="6">
      <LayerControlMap />
    </BCol>
    <BCol xl="6">
      <ChoroplethMap />
    </BCol>
    <BCol xl="6">
      <UserLocation />
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import BasicMap from './components/BasicMap.vue'
import ChoroplethMap from './components/ChoroplethMap.vue'
import CustomIconsMap from './components/CustomIconsMap.vue'
import DraggableMarker from './components/DraggableMarker.vue'
import LayerControlMap from './components/LayerControlMap.vue'
import ShapeMap from './components/ShapeMap.vue'
import UserLocation from './components/UserLocation.vue'
</script>
