<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <BCardTitle class="mb-1">Layer Control</BCardTitle>
      <p class="text-muted mb-0">Toggles between multiple map layers or overlays using Leaflet’s layer control.</p>
    </BCardHeader>
    <BCardBody>
      
        <LMap v-if="isReady" ref="map" :zoom="zoom" :center="center" style="height: 300px; width: 100%">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" layer-type="base" name="Street Map" />
          <LTileLayer
            url="https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg"
            attribution='Map tiles by <a href="http://stamen.com">Stamen Design</a>,
              <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> —
              Map data &copy; <a href="https://www.openstreetmap.org/copyright">
              OpenStreetMap</a> contributors'
            layer-type="base"
            name="Watercolor"
          />

          <!-- Overlay Layer Group -->
          <LLayerGroup layer-type="overlay" name="Cities">
            <LMarker v-for="(marker, idx) in markers" :key="idx" :lat-lng="marker.latLng" :icon="customIcon">
              <component :is="LPopup">{{ marker.label }}</component>
            </LMarker>
          </LLayerGroup>

          <LControlLayers />
        </LMap>
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { LControlLayers, LLayerGroup, LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet'
import type { Icon, LatLngExpression } from 'leaflet'
import { onMounted, ref, type Ref } from 'vue'

const zoom = ref(10)
const center = ref<[number, number]>([39.73, -104.99])
const isReady = ref(false)
let L: typeof import('leaflet') | null = null

const customIcon: Ref<Icon | undefined> = ref(undefined)

type MarkerType = {
  latLng: LatLngExpression
  label: string
}

const markers = ref<MarkerType[]>([
  { latLng: [39.61, -105.02], label: 'This is Littleton, CO.' },
  { latLng: [39.74, -104.99], label: 'This is Denver, CO.' },
  { latLng: [39.73, -104.8], label: 'This is Aurora, CO.' },
  { latLng: [39.77, -105.23], label: 'This is Golden, CO.' },
])

onMounted(async () => {
  if (typeof window === 'undefined') return

  const leaflet = await import('leaflet')

  L = leaflet

  customIcon.value = L.icon({
    iconUrl: (import.meta.env.VITE_BASE_URL || '') + '/images/leaflet/marker-icon.png',
    shadowUrl: (import.meta.env.VITE_BASE_URL || '') + '/images/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  })

  isReady.value = true
})
</script>
