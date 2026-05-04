<template>
  <BModal id="addAttributeModal" size="lg" centered tabindex="-1" aria-hidden="true" cancel-variant="light" ok-variant="danger" ok-title="Save Attribute" class="border-light rounded-3 shadow-sm">
    <template #title>
      <span class="fw-semibold"><Icon icon="circle-plus" class="me-2" /> Add New Attribute</span>
    </template>
    <BForm id="addAttributeForm">
      <BRow class="g-3">
        <BCol md="6">
          <BFormGroup label="Attribute Name" label-for="attributeName" label-class="form-label fw-semibold">
            <BFormInput type="text" id="attributeName" class="form-control" placeholder="e.g. Color, Size, Material" required />
          </BFormGroup>
        </BCol>

        <BCol md="6">
          <BFormGroup label="Type" label-for="attributeType" label-class="form-label fw-semibold">
            <BFormSelect id="attributeType" class="form-select" required>
              <option value="">Select Type</option>
              <option value="Dropdown">Dropdown</option>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
            </BFormSelect>
          </BFormGroup>
        </BCol>

        <BCol cols="12">
          <BFormGroup label="Values" label-for="attributeValues" label-class="form-label fw-semibold">
            <BFormTextarea id="attributeValues" class="form-control" rows="2" placeholder="Separate multiple values with commas (e.g. Red, Blue, Green)" />
            <small class="text-muted d-block mt-1"> Applicable only for Dropdown or selectable attributes. </small>
          </BFormGroup>
        </BCol>

        <BCol cols="12">
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" id="attributeStatus" checked />
            <label class="form-check-label fw-semibold" for="attributeStatus">Active</label>
          </div>
        </BCol>
      </BRow>
    </BForm>
  </BModal>
</template>
<script setup lang="ts">
import Icon from '~/components/wrappers/Icon.vue'
</script>
