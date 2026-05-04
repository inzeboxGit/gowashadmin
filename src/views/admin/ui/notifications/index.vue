<template>
  <PageBreadcrumb title="Notifications" subtitle="UI" />

  <BRow>
    <BCol lg="6">
      <CardWithAction title="Basic" isTogglable>
        <div class="p-3">
          <BToast class="fade" :model-value="true" :noCloseButton="true" role="alert">
            <template #title>
              <img src="/images/logo-sm.png" alt="brand-logo" height="16" class="me-1" />
              <strong class="me-auto text-body">BRAND</strong>
              <small>11 mins ago</small>
              <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </template>
            Hello, world! This is a toast message.
          </BToast>
        </div>
      </CardWithAction>

      <CardWithAction title="Placement" isTogglable>
        <div class="p-3">
          <div aria-live="polite" aria-atomic="true" class="d-flex justify-content-center align-items-center" style="min-height: 200px">
            <BToast class="fade" :model-value="true" :noCloseButton="true" role="alert">
              <template #title>
                <img src="/images/logo-sm.png" alt="brand-logo" height="16" class="me-1" />
                <strong class="me-auto text-body">BRAND</strong>
                <small>11 mins ago</small>
                <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </template>
              Hello, world! This is a toast message.
            </BToast>
          </div>
        </div>
      </CardWithAction>

      <CardWithAction title="Placement" isTogglable>
        <BForm>
          <div class="mb-3">
            <label for="selectToastPlacement">Toast placement</label>
            <BFormSelect v-model="selected" :options="options" class="mt-2" id="selectToastPlacement" />
          </div>
        </BForm>
        <div aria-live="polite" aria-atomic="true" class="bg-light position-relative bd-example-toasts" style="min-height: 294px">
          <div class="toast-container position-absolute p-3" id="toastPlacement" :class="selected">
            <BToast class="fade" :model-value="true" :noCloseButton="true" role="alert">
              <template #title>
                <img src="/images/logo-sm.png" alt="brand-logo" height="16" class="me-1" />
                <strong class="me-auto text-body">BRAND</strong>
                <small>11 mins ago</small>
                <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
              </template>
              Hello, world! This is a toast message.
            </BToast>
          </div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol lg="6">
      <CardWithAction title="Live Toast" isTogglable>
        <button type="button" class="btn btn-primary" @click="showLiveAlert()">Show live toast</button>

        <div v-if="active" class="toast-container position-fixed top-0 end-0 p-3">
          <BToast class="fade" :model-value="active" :noCloseButton="true" role="alert">
            <template #title>
              <img src="/images/logo-sm.png" alt="brand-logo" height="16" class="me-1" />
              <strong class="me-auto text-body">BRAND</strong>
              <small>11 mins ago</small>
              <button type="button" class="ms-2 btn-close" @click="active = !active" aria-label="Close"></button>
            </template>
            Hello, world! This is a toast message.
          </BToast>
        </div>
      </CardWithAction>

      <CardWithAction title="Translucent" isTogglable>
        <div class="p-3 bg-light bg-opacity-50">
          <BToast class="fade" :model-value="true" :noCloseButton="true" role="alert">
            <template #title>
              <img src="/images/logo-sm.png" alt="brand-logo" height="16" class="me-1" />
              <strong class="me-auto text-body">BRAND</strong>
              <small>11 mins ago</small>
              <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </template>
            Hello, world! This is a toast message.
          </BToast>
        </div>
      </CardWithAction>

      <CardWithAction title="Stacking" isTogglable>
        <p class="text-muted">When you have multiple toasts, we default to vertiaclly stacking them in a readable manner.</p>
        <div class="p-3">
          <div aria-live="polite" aria-atomic="true" style="position: relative; min-height: 200px">
            <div class="toast-container" style="position: absolute; top: 0; right: 0">
              <BToast class="fade" :model-value="true" :noCloseButton="true" role="alert">
                <template #title>
                  <img src="/images/logo-sm.png" alt="brand-logo" height="16" class="me-1" />
                  <strong class="me-auto text-body">BRAND</strong>
                  <small>just now</small>
                  <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </template>
                See? Just like this.
              </BToast>

              <BToast class="fade" :model-value="true" :noCloseButton="true" role="alert">
                <template #title>
                  <img src="/images/logo-sm.png" alt="brand-logo" height="16" class="me-1" />
                  <strong class="me-auto text-body">BRAND</strong>
                  <small>2 seconds ago</small>
                  <button type="button" class="ms-2 btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </template>
                Heads up, toasts will stack automatically
              </BToast>
            </div>
          </div>
        </div>
      </CardWithAction>

      <CardWithAction title="Custom content" isTogglable>
        <BToast show class="align-items-center mb-2" role="alert" aria-live="assertive" aria-atomic="true"> Hello, world! This is a toast message. </BToast>

        <BToast show class="align-items-center text-white bg-primary border-0 mb-2" role="alert" aria-live="assertive" aria-atomic="true"> Hello, world! This is a toast message. </BToast>

        <BToast show class="mb-2" role="alert" aria-live="assertive" :noCloseButton="true">
          Hello, world! This is a toast message.
          <div class="mt-2 pt-2 border-top">
            <button type="button" class="btn btn-primary btn-sm">Take action</button>
            <button type="button" class="btn btn-secondary btn-sm ms-1" data-bs-dismiss="toast">Close</button>
          </div>
        </BToast>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
const selected = ref(null)
const active = ref(false)

function showLiveAlert() {
  active.value = true
}
const options = [
  { value: null, text: 'Select a position...' },
  { value: 'top-0 start-0', text: 'Top left' },
  { value: 'top-0 start-50 translate-middle-x', text: 'Top center' },
  { value: 'top-0 end-0', text: 'Top right' },
  { value: 'top-50 start-0 translate-middle-y', text: 'Middle left' },
  { value: 'top-50 start-50 translate-middle', text: 'Middle center' },
  { value: 'top-50 end-0 translate-middle-y', text: 'Middle right' },
  { value: 'bottom-0 start-0', text: 'Bottom left' },
  { value: 'bottom-0 start-50 translate-middle-x', text: 'Bottom center' },
  { value: 'bottom-0 end-0', text: 'Bottom right' },
]

</script>
