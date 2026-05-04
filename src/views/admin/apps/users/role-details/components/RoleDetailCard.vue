<template>
  <BCard no-body>
    <div class="position-absolute top-0 end-0" style="width: 180px">
      <img src="/images/auth-card-bg.svg" class="auth-card-bg-img" alt="auth-card-bg" />
    </div>
    <div class="card-body d-flex flex-column justify-content-between">
      <div class="d-flex mb-4">
        <div class="flex-shrink-0">
          <div class="avatar-xl rounded bg-primary-subtle d-flex align-items-center justify-content-center">
            <Icon icon="shield-half" class="fs-24 text-primary"></Icon>
          </div>
        </div>
        <div class="ms-3">
          <h5 class="mb-1">Security Officer</h5>
          <p class="text-muted mb-0 fs-base">Handles platform safety and protocol reviews.</p>
        </div>
        <div class="ms-auto">
          <BDropdown variant="link" toggle-class="text-muted fs-xl drop-arrow-none p-0">
            <template #button-content>
              <Icon icon="ellipsis-vertical"></Icon>
            </template>
            <BDropdownItem><Icon icon="square-pen" class="me-2"></Icon>Edit</BDropdownItem>
            <BDropdownItem><Icon icon="trash-2" class="me-2"></Icon>Remove</BDropdownItem>
          </BDropdown>
        </div>
      </div>

      <ul class="list-unstyled mb-3">
        <li class="d-flex align-items-center mb-2"><Icon icon="check" class="fs-lg text-success me-2"></Icon> Daily Risk Assessment</li>
        <li class="d-flex align-items-center mb-2"><Icon icon="check" class="fs-lg text-success me-2"></Icon> Manage Security Logs</li>
        <li class="d-flex align-items-center mb-2"><Icon icon="check" class="fs-lg text-success me-2"></Icon> Control Access Rights</li>
        <li class="d-flex align-items-center"><Icon icon="check" class="fs-lg text-success me-2"></Icon> Emergency Protocols</li>
      </ul>

      <p class="mb-2 text-muted">Total 17 users</p>
      <div class="avatar-group avatar-group-sm mb-3">
        <div class="avatar">
          <img src="/images/users/user-7.jpg" alt="" class="rounded-circle avatar-sm" />
        </div>
        <div class="avatar">
          <img src="/images/users/user-8.jpg" alt="" class="rounded-circle avatar-sm" />
        </div>
        <div class="avatar">
          <img src="/images/users/user-9.jpg" alt="" class="rounded-circle avatar-sm" />
        </div>
        <div class="avatar">
          <img src="/images/users/user-10.jpg" alt="" class="rounded-circle avatar-sm" />
        </div>
      </div>

      <div class="d-flex justify-content-between align-items-center">
        <span class="text-muted fs-xs"><Icon icon="clock" class="me-1"></Icon> Updated 1 hour ago</span>
        <BButton variant="outline-primary" size="sm" class="rounded-pill" @click="editRoleModal = !editRoleModal">Edit Role</BButton>
      </div>
    </div>
  </BCard>

  <BModal v-model="editRoleModal" size="lg" title="Edit Role" ok-title="Save Changes" tabindex="-1" aria-hidden="true">
    <BForm id="editRoleForm">
      <BRow class="g-3">
        <BCol md="6">
          <BFormGroup label="Role Name" label-for="editRoleName">
            <BFormInput type="text" class="form-control" id="editRoleName" v-model="role" required />
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Description" label-for="editRoleDescription">
            <BFormInput type="text" class="form-control" id="editRoleDescription" v-model="description" required />
          </BFormGroup>
        </BCol>
        <BCol cols="12">
          <BFormGroup label="Key Responsibilities" label-for="editRoleResponsibilities">
            <BFormTextarea class="form-control" id="editRoleResponsibilities" rows="4" v-model="responsibilities" required />
            <small class="text-muted">Separate each item by comma or line</small>
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Assign Users" label-for="editRoleUsers">
            <BFormSelect class="form-select" id="editRoleUsers" multiple>
              <option value="1" selected>Leah Kim</option>
              <option value="2" selected>David Tran</option>
              <option value="3">Michael Brown</option>
              <option value="4">Emma Wilson</option>
            </BFormSelect>
            <small class="text-muted">Hold Ctrl (Windows) or Cmd (Mac) to select multiple users</small>
          </BFormGroup>
        </BCol>
        <BCol md="6">
          <BFormGroup label="Role Icon" label-for="editRoleIcon">
            <BFormInput type="text" class="form-control" id="editRoleIcon" v-model="roleIcon" />
            <small class="text-muted">Use icon class from your icon library</small>
          </BFormGroup>
        </BCol>
      </BRow>
    </BForm>
  </BModal>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import Icon from '~/components/wrappers/Icon.vue'

const editRoleModal = ref(false)
const role = ref('Developer')
const description = ref('Builds and maintains the platform core features.')
const responsibilities = ref('Developer')
const roleIcon = ref('ti ti-code')
</script>

<style scoped></style>
