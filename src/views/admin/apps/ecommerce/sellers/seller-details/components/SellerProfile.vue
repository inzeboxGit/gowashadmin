<template>
  <BCard no-body class="card-top-sticky">
    <BCardBody>
      <article class="d-flex justify-content-between align-items-center rounded border-light p-2 bg-light-subtle border">
        <div class="d-flex justify-content-start align-items-center gap-3">
          <div class="avatar avatar-xl">
            <img src="/images/sellers/1.png" alt="avatar-2" class="img-fluid rounded-circle" />
          </div>
          <div>
            <h5 class="text-nowrap fw-bold mb-1">MacHub Retailers</h5>
            <p class="text-muted mb-0">Since 2017</p>
          </div>
        </div>
        <div class="d-flex gap-2">
          <BDropdown placement="bottom-end" toggle-class="btn btn-icon btn-light btn-sm drop-arrow-none">
            <template #button-content>
              <Icon icon="ellipsis" class="fs-24" />
            </template>
            <BDropdownItem>Edit Profile</BDropdownItem>
            <BDropdownItem class="text-danger">Report</BDropdownItem>
          </BDropdown>
        </div>
      </article>

      <div class="mt-3">
        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
            <Icon icon="user" class="fs-xl text-muted" />
          </div>
          <p class="mb-0 fs-sm">Owner: <span class="fw-semibold">Sophie Martinez</span></p>
        </div>

        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
            <Icon icon="briefcase" class="fs-xl text-muted" />
          </div>
          <p class="mb-0 fs-sm">Business Type: <span class="fw-semibold">Fashion Retail</span></p>
        </div>

        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
            <Icon icon="calendar-check" class="fs-xl text-muted" />
          </div>
          <p class="mb-0 fs-sm">Founded: <span class="fw-semibold">2015</span></p>
        </div>

        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
            <Icon icon="map-pin" class="fs-xl text-muted" />
          </div>
          <p class="mb-0 fs-sm">Location: <span class="fw-semibold">Los Angeles, USA</span></p>
        </div>

        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
            <Icon icon="mail" class="fs-xl text-muted" />
          </div>
          <p class="mb-0 fs-sm">Support:&nbsp;<RouterLink to="mailto:help&#64;stylehub.com" class="text-primary fw-semibold">help@stylehub.com</RouterLink></p>
        </div>

        <div class="d-flex align-items-center gap-2 mb-2">
          <div class="avatar-sm bg-light d-flex align-items-center justify-content-center rounded">
            <Icon icon="earth" class="fs-xl text-muted" />
          </div>
          <p class="mb-0 fs-sm">Website:&nbsp;<RouterLink to="" class="text-primary fw-semibold">www.stylehub.com</RouterLink></p>
        </div>
      </div>
    </BCardBody>

    <BCardBody class="border-top border-dashed">
      <h5 class="mb-3">Contact Seller</h5>
      <form action="#">
        <div class="mb-3">
          <textarea class="form-control" id="exampleFormControlTextarea1" rows="4" placeholder="Enter your messages..."></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-primary">Send Messages</button>
        </div>
      </form>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import Icon from '~/components/wrappers/Icon.vue'
</script>

<style lang="scss" scoped></style>
