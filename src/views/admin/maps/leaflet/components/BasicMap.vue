<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <BCardTitle as="h4" class="mb-1">Basic Map</BCardTitle>
      <p class="text-muted mb-0">A simple Leaflet map centered with default tile layer and controls.</p>
    </BCardHeader>
    <BCardBody>
      
        <LMap v-if="loaded" :zoom="zoom" :center="center" style="height: 300px; width: 100%" :scrollWheelZoom="false">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors" />
        </LMap>
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import { onMounted, ref } from 'vue'

const loaded = ref(false)
const zoom = 10
const center: [number, number] = [42.35, -71.08]

onMounted(async () => {
  loaded.value = true

  const L = (await import('leaflet')).default
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: (await import('leaflet/dist/images/marker-icon-2x.png')).default,
    iconUrl: (await import('leaflet/dist/images/marker-icon.png')).default,
    shadowUrl: (await import('leaflet/dist/images/marker-shadow.png')).default,
  })
})
</script>
