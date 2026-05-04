<template>
  <BCard no-body>
    <BCardHeader>
      <BCardTitle as="h4">Input Groups</BCardTitle>
    </BCardHeader>
    <BCardBody>
      <BRow>
        <BCol lg="6">
          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Username</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup>
                <BInputGroupText id="basic-addon1">@</BInputGroupText>
                <BFormInput id="username" placeholder="Username" aria-describedby="basic-addon1" />
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Amount</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup>
                <BInputGroupText>$</BInputGroupText>
                <BFormInput aria-label="Amount" />
                <BInputGroupText>.00</BInputGroupText>
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Textarea</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup>
                <BInputGroupText>With textarea</BInputGroupText>
                <BFormTextarea rows="2" aria-label="With textarea" />
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Wrapping</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup class="flex-nowrap">
                <BInputGroupText id="addon-wrapping">@</BInputGroupText>
                <BFormInput placeholder="Username" aria-describedby="addon-wrapping" />
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Input + Button</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup>
                <BFormInput placeholder="Recipient's username" />
                <BButton variant="dark">Button</BButton>
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="formFileMultiple01" class="col-form-label">Multiple Files</label>
            </BCol>
            <BCol lg="8">
              <BFormFile id="formFileMultiple01" multiple />
            </BCol>
          </BRow>
        </BCol>

        <BCol lg="6">
          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Recipient</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup>
                <BFormInput id="recipient" placeholder="Recipient's username" aria-describedby="basic-addon2" />
                <BInputGroupText id="basic-addon2">@example.com</BInputGroupText>
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Email Login</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup>
                <BFormInput placeholder="Username" />
                <BInputGroupText>@</BInputGroupText>
                <BFormInput placeholder="Server" />
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="basic-url" class="col-form-label">Vanity URL</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup>
                <BInputGroupText id="basic-addon3">https://example.com/users/</BInputGroupText>
                <BFormInput id="basic-url" aria-describedby="basic-addon3" />
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label class="col-form-label">Dropdown + Input</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup>
                <BDropdown variant="primary" text="Dropdown">
                  <BDropdownItem>Action</BDropdownItem>
                  <BDropdownItem>Another action</BDropdownItem>
                  <BDropdownItem>Something else here</BDropdownItem>
                </BDropdown>
                <BFormInput />
              </BInputGroup>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="inputGroupFile04" class="col-form-label">File Input</label>
            </BCol>
            <BCol lg="8">
              <BFormFile id="inputGroupFile04" />
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="inputGroupSelect01" class="col-form-label">Input Group Select</label>
            </BCol>
            <BCol lg="8">
              <BInputGroup>
                <BInputGroupText>Options</BInputGroupText>
                <BFormSelect id="inputGroupSelect01">
                  <option>Choose...</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </BFormSelect>
              </BInputGroup>
            </BCol>
          </BRow>
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BButton, BCol, BDropdown, BDropdownItem, BFormFile, BFormInput, BFormSelect, BFormTextarea, BInputGroup, BInputGroupText, BRow } from 'bootstrap-vue-next'
</script>
