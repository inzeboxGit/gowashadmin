<template>
    <Loader />
    <RouterView />
</template>

<script setup lang="ts">
import Loader from '~/components/Loader.vue'
import { RouterView } from 'vue-router'
import { useLayout } from '~/stores/layout'

const layoutStore = useLayout()
</script>
