<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <BCardTitle as="h4" class="mb-1">Colorpicker</BCardTitle>
      <p class="text-muted mb-0">Pickr - A simple, multi-themed, responsive and hackable Color-Picker library. No dependencies, no jQuery. Compatible with all CSS Frameworks e.g. Bootstrap, Materialize. Supports alpha channel, rgba, hsla, hsva and more!</p>
    </BCardHeader>

    <div class="border-top border-dashed" />

    <BCardBody>
      <BCardTitle as="h4" class="mb-3">Example</BCardTitle>

      <BRow class="align-items-center g-4">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Sketch Demo</h5>
          <p class="text-muted mb-0">Use <code> &lt;color-sketch v-model="color"/&gt; </code> colorpicker.</p>
        </BCol>
        <BCol lg="6">
          
            <SketchPicker v-model="color" />
          
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="align-items-center g-4">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Chrome Color Picker</h5>
          <p class="text-muted mb-0">Use <code> &lt;color-chrome v-model="color"/&gt; </code> colorpicker.</p>
        </BCol>
        <BCol lg="6">
          
            <ChromePicker v-model="color" />
          
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="align-items-center g-4">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Slider</h5>
          <p class="text-muted mb-0">Use <code> &lt;color-slider v-model="color"/&gt; </code> colorpicker.</p>
        </BCol>
        <BCol lg="6">
          
            <SliderPicker v-model="color" />
          
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="align-items-center g-4">
        <BCol lg="6">
          <h5 class="fw-semibold mb-1">Color Format</h5>
          <p class="text-muted mb-0">Use <code> &lt;color-twitter v-model="color"/&gt; </code></p>
        </BCol>
        <BCol lg="6">
          
            <TwitterPicker v-model="color" />
          
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import { ChromePicker, SketchPicker, SliderPicker, TwitterPicker } from 'vue-color'
import 'vue-color/style.css'

const color = ref('#00ef20')
</script>
