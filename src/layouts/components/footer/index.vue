<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12 text-center">
          {{ currentYear }}
          © {{ META_DATA.name }} - By <span class="fw-semibold">{{ META_DATA.author }}</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { currentYear, META_DATA } from '~/config/constants'
</script>
