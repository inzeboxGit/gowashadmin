<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <h5 class="mb-1 card-title">Marker, Circle & Polygon</h5>
      <p class="text-muted mb-0">Shows how to add interactive markers, circles, and polygons on the map.</p>
    </BCardHeader>
    <BCardBody>
      
        <LMap v-if="isReady" ref="map" :zoom="zoom" :center="[51.5, -0.09]" style="height: 300px; width: 100%">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors' />

          <LMarker :lat-lng="[51.5, -0.09]" :icon="customIcon" />

          <LCircle :lat-lng="[51.508, -0.11]" :radius="500" color="red" fill-color="#f03" :fill-opacity="0.5" />

          <LPolygon :lat-lngs="polygonCoordinates" />
        </LMap>
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { LCircle, LMap, LMarker, LPolygon, LTileLayer } from '@vue-leaflet/vue-leaflet'
import type { Icon, LatLngExpression } from 'leaflet'
import { onMounted, ref, type Ref } from 'vue'

const zoom = ref(12)
const polygonCoordinates = ref<LatLngExpression[]>([
  [51.509, -0.08],
  [51.503, -0.06],
  [51.51, -0.047],
])

const isReady = ref(false)

const customIcon: Ref<Icon | undefined> = ref(undefined)

onMounted(async () => {
  if (typeof window === 'undefined') return

  const leaflet = await import('leaflet')

  customIcon.value = leaflet.icon({
    iconUrl: (import.meta.env.VITE_BASE_URL || '') + '/images/leaflet/marker-icon.png',
    shadowUrl: (import.meta.env.VITE_BASE_URL || '') + '/images/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  })

  isReady.value = true
})
</script>
