<template>
  <BRow>
    <BCol cols="12">
      <div class="d-flex align-items-sm-center flex-sm-row flex-column my-3">
        <div class="flex-grow-1">
          <h4 class="fs-xl mb-1">Manage Roles</h4>
          <p class="text-muted mb-0">Manage roles for smoother operations and secure access.</p>
        </div>

        <div class="text-end">
          <BButton variant="success" v-b-modal.addRoleModal> <Icon icon="plus" class="me-1" /> Add New Role </BButton>
        </div>
      </div>

      <BRow>
        <BCol v-for="(member, idx) in memberRoleData" :key="idx" md="6" lg="3">
          <MemberRoleCard :member="member" />
        </BCol>
      </BRow>

      <BRow>
        <BCol cols="12">
          <UserTable />
        </BCol>
      </BRow>
    </BCol>
  </BRow>

  <BModal id="addRoleModal" size="lg" title="Add New Role" class="fade" tabindex="-1" aria-hidden="true" ok-title="Add Role" cancel-variant="light">
    <BForm id="addRoleForm">
      <BRow class="g-3">
        <BCol md="6">
          <BFormGroup label="Role Name" label-for="roleName" class="mb-0">
            <BFormInput type="text" class="form-control" id="roleName" placeholder="e.g. Developer, Project Manager" required />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Description" label-for="roleDescription" class="mb-0">
            <BFormInput type="text" class="form-control" id="roleDescription" placeholder="Brief description" required />
          </BFormGroup>
        </BCol>
        <BCol cols="12">
          <BFormGroup label="Key Responsibilities" label-for="roleResponsibilities" class="mb-0">
            <BFormTextarea class="form-control" id="roleResponsibilities" rows="4" placeholder="Enter responsibilities separated by commas or lines" required />
            <small class="text-muted">Example: Codebase Maintenance, API Integration, Unit Testing</small>
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Assign Users" label-for="roleUsers" class="mb-0">
            <BFormSelect class="form-select" id="roleUsers" multiple>
              <option value="1">John Doe</option>
              <option value="2">Sarah Smith</option>
              <option value="3">Michael Brown</option>
              <option value="4">Emma Wilson</option>
            </BFormSelect>
            <small class="text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple users</small>
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Role Icon" label-for="roleIcon" class="mb-0">
            <BFormInput type="text" class="form-control" id="roleIcon" placeholder="e.g. ti ti-shield, ti ti-briefcase" />
            <small class="text-muted">Use icon class from your icon library</small>
          </BFormGroup>
        </BCol>
      </BRow>
    </BForm>
  </BModal>
</template>

<script setup lang="ts">
import { vBModal } from 'bootstrap-vue-next/directives'
import Icon from '~/components/wrappers/Icon.vue'
import { memberRoleData } from './components/data'
import MemberRoleCard from './components/MemberRoleCard.vue'
import UserTable from './components/UserTable.vue'

</script>

<style scoped></style>
