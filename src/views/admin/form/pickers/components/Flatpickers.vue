<template>
  <BCard no-body>
    <BCardHeader class="d-block">
      <BCardTitle as="h4" class="mb-1">Flatpickr</BCardTitle>
      <p class="text-muted mb-0">Lightweight, powerful javascript datetimepicker with no dependencies</p>
    </BCardHeader>

    <div class="border-top border-dashed" />

    <BCardBody>
      <BCardTitle class="fs-sm fw-bold mb-4">Examples</BCardTitle>

      <BRow class="g-4">
        <BCol lg="6">
          <h5>Basic</h5>
          <p class="text-muted mb-0">Set options <code>&#123; dateFormat: "d M, Y" &#125;</code></p>
        </BCol>
        <BCol lg="6">
          <FlatPickr class="form-control" v-model="basicDate" :config="{ dateFormat: 'd M, Y', defaultDate: 'today' }" />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-4">
        <BCol lg="6">
          <h5>DateTime</h5>
          <p class="text-muted mb-0">Set options <code>&#123; dateFormat: "d.m.y", enableTime: true &#125;</code></p>
        </BCol>
        <BCol lg="6">
          <FlatPickr class="form-control" v-model="dateTimeDate" :config="{ dateFormat: 'd.m.y h:i ', enableTime: true, defaultDate: 'today' }" />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-4">
        <BCol lg="6">
          <h5>Human-Friendly Dates</h5>
          <p class="text-muted mb-0">Set options <code>&#123; altFormat: "F j, Y", dateFormat: "Y-m-d" &#125;</code></p>
        </BCol>
        <BCol lg="6">
          <FlatPickr
            v-model="humanFriendlyDate"
            class="form-control"
            :config="{
              altInput: true,
              altFormat: 'F j, Y',
              dateFormat: 'Y-m-d',
              defaultDate: 'today',
            }"
          />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-4">
        <BCol lg="6">
          <h5>MinDate and MaxDate</h5>
          <p class="text-muted mb-0">Set options <code>&#123; minDate: "25 12, 2021", maxDate: "29 12, 2021" &#125;</code></p>
        </BCol>
        <BCol lg="6">
          <FlatPickr
            class="form-control"
            v-model="minAndMaxDate"
            placeholder="Select Date"
            :config="{
              dateFormat: 'd M, Y',
              minDate: '25 12, 2021',
              maxDate: '29 12, 2021',
            }"
          />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-4">
        <BCol lg="6">
          <h5>Selecting Multiple Dates</h5>
          <p class="text-muted mb-0">Set options <code>&#123; mode: "multiple" &#125;</code></p>
        </BCol>
        <BCol lg="6">
          <FlatPickr
            v-model="multiDate"
            class="form-control"
            :config="{
              dateFormat: 'd M, Y',
              defaultDate: 'today',
              mode: 'multiple',
            }"
          />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-4">
        <BCol lg="6">
          <h5>Range</h5>
          <p class="text-muted mb-0">Set options <code>&#123; mode: "range" &#125;</code></p>
        </BCol>
        <BCol lg="6">
          <FlatPickr v-model="rangeDate" class="form-control" :config="{ dateFormat: 'd M, Y', mode: 'range' }" />
        </BCol>
      </BRow>

      <div class="my-4 border-top border-dashed" />

      <BRow class="g-4">
        <BCol lg="6">
          <h5>Timepicker</h5>
          <p class="text-muted mb-0">Set options <code>&#123; enableTime: true, noCalendar: true, dateFormat: "H:i" &#125;</code></p>
        </BCol>
        <BCol lg="6">
          <FlatPickr class="form-control" v-model="timePickr" :config="{ enableTime: true, noCalendar: true, dateFormat: 'H:i' }" />
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import FlatPickr from 'vue-flatpickr-component'
const basicDate = ref('')
const dateTimeDate = ref('')
const humanFriendlyDate = ref('')
const minAndMaxDate = ref('')
const multiDate = ref('')
const rangeDate = ref('')
const timePickr = ref('')
</script>
