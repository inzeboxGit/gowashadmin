<template>
  <PageBreadcrumb title="Progress" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Examples" isTogglable>
        <BProgress class="mb-2" :value="0" />
        <BProgress class="mb-2" :value="25" />
        <BProgress class="mb-2" :value="50" />
        <BProgress class="mb-2" :value="75" />
        <BProgress :value="100" />
      </CardWithAction>

      <CardWithAction title="Height" isTogglable>
        <BProgress class="mb-2" variant="danger" style="height: 1px" :value="25" />
        <BProgress class="mb-2" variant="primary" style="height: 3px" :value="25" />
        <BProgress class="mb-2 progress-sm" variant="success" :value="25" />
        <BProgress class="mb-2 progress-md" variant="info" :value="50" />
        <BProgress class="mb-2 progress-lg" variant="warning" :value="75" />
        <BProgress class="mb-2 progress-xl" variant="success" :value="38" />
      </CardWithAction>

      <CardWithAction title="Multiple Bars" isTogglable>
        <BProgress>
          <BProgressBar variant="primary" :value="15" />
          <BProgressBar variant="success" :value="30" />
          <BProgressBar variant="info" :value="20" />
        </BProgress>
      </CardWithAction>

      <CardWithAction title="Animated Stripes" isTogglable>
        <BProgress class="mb-2" variant="primary" striped animated :value="75" />
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Labels" isTogglable>
        <BProgress class="mb-3">
          <BProgressBar variant="primary" :value="25"> 25% </BProgressBar>
        </BProgress>

        <BProgress>
          <BProgressBar class="overflow-visible text-dark" variant="primary" :value="10"> Long label text for the progress bar, set to a dark color </BProgressBar>
        </BProgress>
      </CardWithAction>

      <CardWithAction title="Backgrounds" isTogglable>
        <BProgress class="mb-2" variant="success" :value="25" />
        <BProgress class="mb-2" variant="info" :value="50" />
        <BProgress class="mb-2" variant="warning" :value="75" />
        <BProgress class="mb-2" variant="danger" :value="100" />
        <BProgress class="mb-2" variant="dark" :value="65" />
        <BProgress variant="secondary" :value="50" />
      </CardWithAction>

      <CardWithAction title="Striped" isTogglable>
        <BProgress bg-variant="primary" striped class="mb-2" :value="10" />
        <BProgress bg-variant="success" striped class="mb-2" :value="25" />
        <BProgress bg-variant="info" striped class="mb-2" :value="50" />
        <BProgress bg-variant="warning" striped class="mb-2" :value="75" />
        <BProgress bg-variant="danger" striped :value="100" />
      </CardWithAction>

      <CardWithAction title="Steps" isTogglable>
        <div class="position-relative m-4">
          <BProgress style="height: 2px">
            <BProgressBar variant="primary" :value="50" />
          </BProgress>
          <BButton type="button" variant="primary" pill class="position-absolute top-0 start-0 translate-middle btn-icon">1</BButton>
          <BButton type="button" variant="primary" pill class="position-absolute top-0 start-50 translate-middle btn-icon">2</BButton>
          <BButton type="button" variant="light" pill class="position-absolute top-0 start-100 translate-middle btn-icon">3</BButton>
        </div>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BProgress, BRow } from 'bootstrap-vue-next'
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
