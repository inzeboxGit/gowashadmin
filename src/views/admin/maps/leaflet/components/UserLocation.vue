<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <h5 class="mb-1 card-title">User Location</h5>
      <p class="text-muted mb-0">Uses the browser's geolocation API to show the user's current location.</p>
    </BCardHeader>

    <BCardBody>
      
        <LMap v-if="isReady" :zoom="zoom" :center="[51.5, -0.09]" style="height: 300px; width: 100%">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          <LMarker v-if="position" :lat-lng="position" :icon="customIcon">
            <LPopup> You are somewhere around {{ Math.round(accuracy) }} meters from this point. </LPopup>
          </LMarker>
          <LCircle v-if="position" :lat-lng="position" :radius="accuracy" color="blue" fill-color="lightblue" :fill-opacity="0.3" />
        </LMap>
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { LCircle, LMap, LMarker, LPopup, LTileLayer } from '@vue-leaflet/vue-leaflet'
import type { Icon, LatLngExpression } from 'leaflet'
import { onMounted, ref, type Ref } from 'vue'

const zoom = ref(13)
const center = ref<LatLngExpression>([42.35, -71.08])
const position = ref<LatLngExpression | null>(null)
const accuracy = ref<number>(0)
const isReady = ref(false)
const customIcon: Ref<Icon | undefined> = ref(undefined)

onMounted(async () => {
  if (typeof window === 'undefined') return

  const L = await import('leaflet')

  customIcon.value = L.icon({
    iconUrl: (import.meta.env.VITE_BASE_URL || '') + '/images/leaflet/marker-icon.png',
    shadowUrl: (import.meta.env.VITE_BASE_URL || '') + '/images/leaflet/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowSize: [41, 41],
  })

  isReady.value = true

  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        position.value = [pos.coords.latitude, pos.coords.longitude]
        accuracy.value = pos.coords.accuracy
        center.value = position.value
      },
      () => {},
      { enableHighAccuracy: true }
    )
  } else {
    alert('Geolocation not supported in your browser.')
  }
})
</script>
