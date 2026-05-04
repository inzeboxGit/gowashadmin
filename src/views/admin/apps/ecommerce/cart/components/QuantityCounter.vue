<template>
  <BInputGroup data-touchspin style="max-width: 130px">
    <BButton variant="primary" class="floating" type="button" aria-label="Decrease quantity" @click="handleDecrease">
      <Icon icon="minus" />
    </BButton>

    <BFormInput size="sm" type="number" v-model="props.quantity" readonly class="border-0 text-center" aria-label="Quantity" />
    <BButton variant="primary" class="floating" type="button" aria-label="Increase quantity" @click="handleIncrease">
      <Icon icon="plus" />
    </BButton>
  </BInputGroup>
</template>

<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'

type Props = {
  id: number
  quantity: number
  onChange: (id: number, newQuantity: number) => void
  min?: number
  max?: number
}

const props = withDefaults(defineProps<Props>(), {
  min: 1,
  max: 800000,
})

const emit = defineEmits(['update:quantity'])

const handleDecrease = () => {
  if (props.quantity > props.min) {
    emit('update:quantity', props.quantity - 1)
  }
}

const handleIncrease = () => {
  if (props.quantity < props.max) {
    emit('update:quantity', props.quantity + 1)
  }
}
</script>
