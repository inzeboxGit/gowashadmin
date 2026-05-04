<template>
  <span class="text-warning d-flex justify-content-center align-items-center" v-bind="$attrs">
    <Icon icon="star" v-for="(_, i) in [...Array(fullStars)]" :key="`full-${i}`" :size="size" />

    <Icon icon="star" v-if="halfStar" :size="size" />

    <Icon icon="star" v-for="(_, i) in [...Array(emptyStars)]" :key="`empty-${i}`" :size="size" />
  </span>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'

type PropsType = {
  rating: number
  size?: number | string
}

const props = defineProps<PropsType>()

const fullStars = Math.floor(props.rating)
const halfStar = props.rating % 1 !== 0
const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
</script>
