<template>
  <BCard no-body>
    <BCardHeader>
      <div class="flex-grow-1">
        <BCardTitle>Floating labels</BCardTitle>
      </div>
    </BCardHeader>
    <BCardBody>
      <BRow>
        <BCol lg="6">
          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="floatingInputEmail" class="col-form-label">Email address</label>
            </BCol>
            <BCol lg="8">
              <BFormFloatingLabel label="Email address">
                <BFormInput id="floatingInputEmail" type="email" placeholder="name@example.com" />
              </BFormFloatingLabel>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="floatingTextarea" class="col-form-label">Comments</label>
            </BCol>
            <BCol lg="8">
              <BFormFloatingLabel label="Comments">
                <BFormTextarea id="floatingTextarea" placeholder="Leave a comment here" style="height: 100px" />
              </BFormFloatingLabel>
            </BCol>
          </BRow>
        </BCol>

        <BCol lg="6">
          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="floatingPassword" class="col-form-label">Password</label>
            </BCol>
            <BCol lg="8">
              <BFormFloatingLabel label="Password">
                <BFormInput id="floatingPassword" type="password" placeholder="Password" />
              </BFormFloatingLabel>
            </BCol>
          </BRow>

          <div class="border-top border-dashed my-3" />

          <BRow class="g-lg-4 g-2">
            <BCol lg="4">
              <label for="floatingSelect" class="col-form-label">Select Menu</label>
            </BCol>
            <BCol lg="8">
              <BFormFloatingLabel label="Works with selects">
                <BFormSelect id="floatingSelect" aria-label="Floating label select example">
                  <BFormSelectOption value="">Open this select menu</BFormSelectOption>
                  <BFormSelectOption value="1">One</BFormSelectOption>
                  <BFormSelectOption value="2">Two</BFormSelectOption>
                  <BFormSelectOption value="3">Three</BFormSelectOption>
                </BFormSelect>
              </BFormFloatingLabel>
            </BCol>
          </BRow>
        </BCol>
      </BRow>
    </BCardBody>
  </BCard>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCol, BFormFloatingLabel, BFormInput, BFormSelect, BFormSelectOption, BFormTextarea, BRow } from 'bootstrap-vue-next'
</script>
