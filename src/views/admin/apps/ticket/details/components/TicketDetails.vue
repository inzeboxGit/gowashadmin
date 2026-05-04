<template>
  <BCard no-body>
    <BCardHeader class="justify-content-between">
      <h5 class="mb-0">#SUP-2523 - <span class="text-muted">App freezes when uploading files</span></h5>
      <span class="badge badge-label text-bg-warning">Pending</span>
    </BCardHeader>

    <BCardBody>
      <BRow class="mb-4">
        <BCol md="4">
          <h6 class="text-uppercase text-muted">Requested By</h6>
          <div class="d-flex align-items-center gap-2">
            <img src="/images/users/user-5.jpg" alt="Ava Sullivan" class="rounded-circle avatar-sm" />
            <span>Ava Sullivan</span>
          </div>
        </BCol>
        <BCol md="4">
          <h6 class="text-uppercase text-muted">Assigned Agent</h6>
          <div class="d-flex align-items-center gap-2">
            <img src="/images/users/user-4.jpg" alt="Liam Brooks" class="rounded-circle avatar-sm" />
            <span>Liam Brooks</span>
          </div>
        </BCol>
      </BRow>

      <BRow class="mb-4">
        <BCol md="4">
          <h6 class="text-uppercase text-muted">Priority</h6>
          <span class="badge bg-danger">High</span>
        </BCol>
        <BCol md="4">
          <h6 class="text-uppercase text-muted">Created On</h6>
          <p class="mb-0">05 Aug, 2025 <small class="text-muted">1:20 PM</small></p>
        </BCol>
        <BCol md="4">
          <h6 class="text-uppercase text-muted">Due Date</h6>
          <p class="mb-0">09 Aug, 2025</p>
        </BCol>
      </BRow>

      <div class="mb-4">
        <h6 class="text-uppercase text-muted">Description</h6>
        <p class="mb-0">When trying to upload files through the project form, the application becomes unresponsive after selecting a file larger than 5MB. This issue occurs consistently across browsers. Please investigate and apply a fix.</p>
      </div>

      <div class="mb-4">
        <h6 class="text-uppercase text-muted">Tags</h6>
        <span class="badge text-bg-light me-1">Upload</span>
        <span class="badge text-bg-light me-1">Performance</span>
        <span class="badge text-bg-light">UI Bug</span>
      </div>

      <div class="mb-4">
        <h6 class="text-uppercase text-muted mb-4">Activity:</h6>
        <div class="timeline">
          <div class="timeline-item d-flex align-items-stretch">
            <div class="timeline-time pe-3 text-muted">Just Now</div>
            <div class="timeline-dot bg-success"></div>
            <div class="timeline-content ps-3 pb-4">
              <h6 class="mb-1 fs-sm">Ticket Resolved</h6>
              <p class="mb-1 text-muted">Agent closed the ticket after applying a patch for the file upload freeze issue.</p>
              <span class="text-primary fw-semibold">By Liam Brooks</span>
            </div>
          </div>

          <div class="timeline-item d-flex align-items-stretch">
            <div class="timeline-time pe-3 text-muted">Today, 10:40 AM</div>
            <div class="timeline-dot bg-info"></div>
            <div class="timeline-content ps-3 pb-4">
              <h6 class="mb-1 fs-sm">Status Changed to "In Progress"</h6>
              <p class="mb-1 text-muted">Ticket was picked up by the assigned agent for investigation.</p>
              <span class="text-primary fw-semibold">By Liam Brooks</span>
            </div>
          </div>

          <div class="timeline-item d-flex align-items-stretch">
            <div class="timeline-time pe-3 text-muted">Yesterday, 4:15 PM</div>
            <div class="timeline-dot bg-warning"></div>
            <div class="timeline-content ps-3 pb-4">
              <h6 class="mb-1 fs-sm">User Comment Added</h6>
              <p class="mb-1 text-muted">User emphasized urgency due to impact on production file uploads.</p>
              <span class="text-primary fw-semibold">By Ava Sullivan</span>
            </div>
          </div>

          <div class="timeline-item d-flex align-items-stretch">
            <div class="timeline-time pe-3 text-muted">02 Aug, 2025 - 3:00 PM</div>
            <div class="timeline-dot bg-danger"></div>
            <div class="timeline-content ps-3 pb-4">
              <h6 class="mb-1 fs-sm">Ticket Created</h6>
              <p class="mb-1 text-muted">Ticket submitted regarding the app freezing on file upload.</p>
              <span class="text-primary fw-semibold">By Ava Sullivan</span>
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex gap-2 justify-content-center">
        <RouterLink to="apps/ticket/create" class="btn btn-primary"><Icon icon="pencil" class="me-1" />Edit Ticket</RouterLink>
        <RouterLink to="" class="btn btn-danger"><Icon icon="x" class="me-1" />Close Ticket</RouterLink>
        <RouterLink to="apps/ticket/list" class="btn btn-outline-secondary"><Icon icon="arrow-left" class="me-1" />Back to List</RouterLink>
      </div>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import Icon from '~/components/wrappers/Icon.vue'
</script>
