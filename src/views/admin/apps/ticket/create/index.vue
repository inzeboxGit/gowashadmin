<template>
  <PageBreadcrumb title="Create New Ticket" subtitle="Support" />
  <BRow class="justify-content-center">
    <BCol xxl="10">
      <BCard no-body>
        <BForm action="#" method="post">
          <BCardBody>
            <div class="mb-3">
              <BFormGroup label="Requester Name" class="form-label" for="request">
                <BFormInput id="request" placeholder="Enter your full name" />
              </BFormGroup>
            </div>

            <div class="mb-3">
              <BFormGroup for="email" class="form-label" label="Email Address">
                <BFormInput type="email" class="form-control" id="email" placeholder="you@example.com" />
              </BFormGroup>
            </div>

            <div class="mb-3">
              <BFormGroup for="subject" class="form-label" label="Ticket Subject">
                <BFormInput type="text" class="form-control" id="subject" placeholder="Brief summary of the issue" />
              </BFormGroup>
            </div>

            <BRow class="mb-3">
              <BCol md="6">
                <label label="prio" for="priority" class="form-label">Priority</label>
                <BFormSelect v-model="priority" id="priority" class="form-select">
                  <option disabled value="">Choose...</option>
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </BFormSelect>
              </BCol>
              <BCol md="6">
                <label for="tickstatus" class="form-label">Status</label>
                <BFormSelect v-model="tickstatus" id="tickstatus" class="form-select">
                  <option value="" disabled>Choose...</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </BFormSelect>
              </BCol>
            </BRow>

            <div class="mb-3">
              <BFormGroup for="tags" class="form-label" label="Tags (comma-separated)">
                <BFormInput type="text" class="form-control" id="tags" placeholder="e.g. login, error, payment" />
              </BFormGroup>
            </div>

            <div class="mb-4">
              <BFormGroup label="Description" for="description" class="form-label">
                <BFormTextarea id="description" class="form-control" rows="5" placeholder="Describe the issue in detail..." />
              </BFormGroup>
            </div>

            <div class="d-flex gap-2 justify-content-center">
              <BButton type="submit" variant="primary" class="btn"><Icon icon="plus" class="me-1" /> Submit Ticket</BButton>
              <BButton type="reset" variant="outline-secondary" class="btn"><Icon icon="refresh-ccw" class="me-1" />Reset</BButton>
            </div>
          </BCardBody>
        </BForm>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'

const priority = ref('')
const tickstatus = ref('')
</script>
