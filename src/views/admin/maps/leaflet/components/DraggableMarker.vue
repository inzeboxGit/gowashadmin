<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <BCardTitle class="mb-1">Draggable Marker with Popup</BCardTitle>
      <p class="text-muted mb-0">Allows dragging a marker with a popup that displays dynamic content.</p>
    </BCardHeader>
    <BCardBody class="card-body">
      
        <LMap v-if="isReady" ref="map" :zoom="zoom" :center="[48.817152, 2.455]" style="height: 300px; width: 100%">
          <component :is="LTileLayer" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors" />

          <LMarker :lat-lng="markerLatLng" :icon="customIcon" draggable @update:lat-lng="onMarkerDrag">
            <LPopup>
              <b>You're here!</b>
            </LPopup>
          </LMarker>
        </LMap>
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet'
import type { Icon, LatLng, LatLngLiteral } from 'leaflet'
import { onMounted, ref, type Ref } from 'vue'

const zoom = ref(12)
const markerLatLng = ref<LatLngLiteral>({ lat: 48.817152, lng: 2.455 })

let L: typeof import('leaflet') | null = null

const customIcon: Ref<Icon | undefined> = ref(undefined)

const isReady = ref(false)

onMounted(async () => {
  if (typeof window === 'undefined') return

  const leaflet = await import('leaflet')
  L = leaflet.default

  customIcon.value = L.icon({
    iconUrl: (import.meta.env.VITE_BASE_URL || '') + '/images/leaflet/marker-icon.png',
    shadowUrl: (import.meta.env.VITE_BASE_URL || '') + '/images/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  })

  isReady.value = true
})

function onMarkerDrag(newLatLng: LatLng) {
  markerLatLng.value = { lat: newLatLng.lat, lng: newLatLng.lng }
  console.log('Marker moved to:', markerLatLng.value)
}
</script>
