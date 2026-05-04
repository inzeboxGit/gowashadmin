<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <BCardTitle class="mb-1">Interactive Choropleth Map</BCardTitle>
      <p class="text-muted mb-0">Displays region-based data using GeoJSON and interactive color scales.</p>
    </BCardHeader>
    <BCardBody>
      
        <LMap v-if="loaded && geojson" :zoom="zoom" :center="center" style="height: 300px; width: 100%">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          <LGeoJson :geojson="geojson" :options-style="styleFunction" />
        </LMap>
      
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { LGeoJson, LMap, LTileLayer } from '@vue-leaflet/vue-leaflet'
import type { Feature, Geometry } from 'geojson'
import type { PathOptions, PointExpression } from 'leaflet'
import { onMounted, ref } from 'vue'

const zoom = ref(3)
const center = ref<PointExpression>([44.2669, -72.576])
const geojson = ref(null)
const loaded = ref(false)

onMounted(async () => {
  if (typeof window === 'undefined') return
  loaded.value = true

  const L = (await import('leaflet')).default
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: (await import('leaflet/dist/images/marker-icon-2x.png')).default,
    iconUrl: (await import('leaflet/dist/images/marker-icon.png')).default,
    shadowUrl: (await import('leaflet/dist/images/marker-shadow.png')).default,
  })

  try {
    const response = await fetch((import.meta.env.VITE_BASE_URL || '') + '/data/leaflet.json')
    if (!response.ok) throw new Error('Network error')
    geojson.value = await response.json()
  } catch (err) {
    console.error('Failed to load GeoJSON:', err)
  }
})

const getColor = (density: number) => {
  return density > 1000 ? '#800026' : density > 500 ? '#BD0026' : density > 200 ? '#E31A1C' : density > 100 ? '#FC4E2A' : density > 50 ? '#FD8D3C' : density > 20 ? '#FEB24C' : density > 10 ? '#FED976' : '#FFEDA0'
}

const styleFunction = (feature?: Feature<Geometry, { density: number }>): PathOptions => {
  const density = feature?.properties.density ?? 0
  return {
    fillColor: getColor(density),
    weight: 2,
    opacity: 1,
    color: 'white',
    dashArray: '3',
    fillOpacity: 0.7,
  }
}
</script>
