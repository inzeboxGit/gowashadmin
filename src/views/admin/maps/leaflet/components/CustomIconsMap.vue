<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <BCardTitle class="mb-1">Custom Icons</BCardTitle>
      <p class="text-muted mb-0">Demonstrates using custom image icons for Leaflet map markers.</p>
    </BCardHeader>
    <BCardBody>
      
        <LMap v-if="isReady" ref="map" :zoom="zoom" :center="[51.5, -0.09]" style="height: 300px; width: 100%">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />

          <LMarker v-for="marker in markers" :key="marker.id" :lat-lng="marker.latLng" :icon="marker.icon" />
        </LMap>
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { LMap, LMarker, LTileLayer } from '@vue-leaflet/vue-leaflet'
import type { Icon, LatLngExpression } from 'leaflet'
import { onMounted, ref, type Ref } from 'vue'

type MarkerType = {
  id: number
  latLng: LatLngExpression
  icon: Icon
}

const zoom = ref(10)
const isReady = ref(false)
const markers: Ref<MarkerType[]> = ref([])

let L: typeof import('leaflet') | null = null

onMounted(async () => {
  if (typeof window === 'undefined') return
  const leaflet = await import('leaflet')
  L = leaflet.default

  L.Icon.Default.mergeOptions({
    iconRetinaUrl: (await import('leaflet/dist/images/marker-icon-2x.png')).default,
    iconUrl: (await import('leaflet/dist/images/marker-icon.png')).default,
    shadowUrl: (await import('leaflet/dist/images/marker-shadow.png')).default,
  })

  const createLeafIcon = (color: 'green' | 'red' | 'orange'): Icon => {
    return L!.icon({
      iconUrl: (import.meta.env.VITE_BASE_URL || '') + `/images/leaflet/leaf-${color}.png`,
      shadowUrl: (import.meta.env.VITE_BASE_URL || '') + '/images/leaflet/leaf-shadow.png',
      iconSize: [38, 95],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      shadowAnchor: [4, 62],
      popupAnchor: [-3, -76],
    })
  }

  markers.value = [
    { id: 1, latLng: [51.5, -0.09], icon: createLeafIcon('red') },
    { id: 2, latLng: [51.4, -0.51], icon: createLeafIcon('green') },
    { id: 3, latLng: [51.49, -0.45], icon: createLeafIcon('orange') },
  ]

  isReady.value = true
})
</script>
