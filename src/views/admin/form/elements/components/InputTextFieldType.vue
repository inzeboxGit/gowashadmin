<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle as="h5">Input Textfield Type</BCardTitle>
    </BCardHeader>
    <BCardBody>
      <BRow>
        <BCol lg="6">
          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="simpleinput">Simple Input</div>
            </BCol>
            <BCol lg="8">
              <BFormInput id="simpleinput" type="text" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label">Floating Input</div>
            </BCol>
            <BCol lg="8">
              <BFormFloatingLabel label="Name">
                <BFormInput type="text" placeholder="name" />
              </BFormFloatingLabel>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="validInput">Valid Input</div>
            </BCol>
            <BCol lg="8">
              <BFormInput id="validInput" type="text" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="example-rounded">Rounded Input</div>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-rounded" type="text" placeholder="Rounded Input" class="rounded-pill" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="example-textarea">Text area</div>
            </BCol>
            <BCol lg="8">
              <BFormTextarea id="example-textarea" rows="5" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="example-disable">Disabled</div>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-disable" type="text" disabled value="Disabled value" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="example-helping">Helping text</div>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-helping" type="text" placeholder="Helping text" />
              <BFormText class="text-muted"> A block of help text that breaks onto a new line and may extend beyond one line. </BFormText>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label">Select with Icon</div>
            </BCol>
            <BCol lg="8">
              <div class="app-search">
                <BFormSelect class="form-control">
                  <option selected>Choose Discount</option>
                  <option value="No Discount">No Discount</option>
                  <option value="Flat Discount">Flat Discount</option>
                  <option value="Percentage Discount">Percentage Discount</option>
                </BFormSelect>
                <Icon icon="badge-percent" class="app-search-icon text-muted" />
              </div>
            </BCol>
          </BRow>
        </BCol>

        <BCol lg="6">
          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label">Label Input</div>
            </BCol>
            <BCol lg="8">
              <BFormGroup label="Label Input" label-for="formBasicEmail">
                <BFormInput id="formBasicEmail" type="email" placeholder="name@example.com" />
              </BFormGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="SearchInput">Search Style</div>
            </BCol>
            <BCol lg="8">
              <div class="app-search">
                <BFormInput type="search" placeholder="Search for something..." />
                <Icon icon="search" class="app-search-icon text-muted" />
              </div>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="inValidationInput">Invalid Input</div>
            </BCol>
            <BCol lg="8">
              <BFormInput id="inValidationInput" type="text" invalid />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="example-placeholder">Placeholder</div>
            </BCol>
            <BCol lg="8">
              <BFormInput id="example-placeholder" type="text" placeholder="placeholder" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="example-readonly">Readonly</div>
            </BCol>
            <BCol lg="8">
              <input type="text" id="example-readonly" class="form-control" readonly value="Readonly value" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="example-static">Static control</div>
            </BCol>
            <BCol lg="8">
              <input type="text" readonly class="form-control-plaintext" id="example-static" value="email&#64;example.com" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label">Default Select</div>
            </BCol>
            <BCol lg="8">
              <BFormSelect>
                <option>Open this select menu</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </BFormSelect>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <div class="col-form-label" for="example-multiselect">Multiple Select</div>
            </BCol>
            <BCol lg="8">
              <BFormSelect id="example-multiselect" multiple>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </BFormSelect>
            </BCol>
          </BRow>
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCardTitle, BCol, BFormFloatingLabel, BFormGroup, BFormInput, BFormSelect, BRow } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
</script>
