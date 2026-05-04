<template>
  <PageBreadcrumb title="Account Settings" subtitle="Users" />
  <BRow>
    <BCol cols="12">
      <BCard class="overflow-hidden mb-0" no-body>
        <div class="position-relative card-side-img overflow-hidden" style="height: 300px; background-image: url('/images/profile-bg.jpg')">
          <div class="p-4 card-img-overlay rounded-start-0 flex-column gap-2 auth-overlay d-flex align-items-center justify-content-center">
            <h3 class="text-white mb-0 fst-italic">
              "Designing the future, one template at a time"
              <RouterLink to="" class="link-primary">
                <Icon icon="square-pen"></Icon>
              </RouterLink>
            </h3>
            <BButton variant="danger" size="sm" type="button">Change Background</BButton>
          </div>
        </div>
      </BCard>

      <div class="px-3 mt-n4">
        <BRow>
          <BCol cols="12">
            <BCard no-body>
              <BCardBody>
                <BForm>
                  <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light text-center">
                    <Icon icon="circle-user-round" class="me-1 fs-lg"></Icon>
                    Personal Info
                  </h5>
                  <BRow>
                    <BCol md="6">
                      <div class="mb-3">
                        <BFormGroup label="First Name" label-for="firstname">
                          <BFormInput id="firstname" v-model="form.firstName" placeholder="Enter first name" />
                        </BFormGroup>
                      </div>
                    </BCol>
                    <BCol md="6">
                      <div class="mb-3">
                        <BFormGroup label="Last Name" label-for="lastname">
                          <BFormInput id="lastname" v-model="form.lastName" placeholder="Enter last name" />
                        </BFormGroup>
                      </div>
                    </BCol>
                  </BRow>

                  <BRow>
                    <BCol md="6">
                      <div class="mb-3">
                        <BFormGroup label="Job Title" label-for="jobtitle">
                          <BFormInput id="jobtitle" v-model="form.jobTitle" placeholder="e.g. UI Developer, Designer" />
                        </BFormGroup>
                      </div>
                    </BCol>
                    <BCol md="6">
                      <div class="mb-3">
                        <BFormGroup label="Phone Number" label-for="phone">
                          <BFormInput id="phone" v-model="form.phone" placeholder="+1 234 567 8901" />
                        </BFormGroup>
                      </div>
                    </BCol>
                  </BRow>

                  <BFormGroup label="Bio" label-for="userbio">
                    <div class="mb-3">
                      <BFormTextarea id="userbio" v-model="form.bio" rows="4" placeholder="Write something about yourself..." />
                    </div>
                  </BFormGroup>

                  <BRow>
                    <BCol md="6">
                      <div class="mb-3">
                        <BFormGroup label="Email Address" label-for="useremail">
                          <BFormInput id="useremail" v-model="form.email" type="email" placeholder="Enter email" />
                          <template #description>
                            <RouterLink to="#" class="link-reset text-muted fst-italic">Click here to change your email</RouterLink>
                          </template>
                        </BFormGroup>
                      </div>
                    </BCol>
                    <BCol md="6">
                      <div class="mb-3">
                        <BFormGroup label="Password" label-for="userpassword">
                          <BFormInput id="userpassword" v-model="form.password" type="password" placeholder="Enter new password" />
                          <template #description>
                            <RouterLink to="#" class="link-reset text-muted fst-italic">Click here to change your password</RouterLink>
                          </template>
                        </BFormGroup>
                      </div>
                    </BCol>
                  </BRow>

                  <div class="mb-4">
                    <label for="profilephoto" class="form-label">Profile Photo</label>
                    <input class="form-control" type="file" id="profilephoto" />
                  </div>

                  <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light text-center">
                    <Icon icon="map-pin" class="me-1 fs-lg"></Icon>
                    Address Info
                  </h5>
                  <BRow>
                    <BCol md="6">
                      <div class="mb-3">
                        <label for="address-line1" class="form-label">Address Line 1</label>
                        <BFormInput type="text" id="address-line1" placeholder="Street, Apartment, Unit, etc." />
                      </div>
                    </BCol>
                    <BCol md="6">
                      <div class="mb-3">
                        <label for="address-line2" class="form-label">Address Line 2</label>
                        <BFormInput type="text" id="address-line2" placeholder="Optional" />
                      </div>
                    </BCol>
                  </BRow>
                  <BRow>
                    <BCol md="4">
                      <div class="mb-3">
                        <label for="city" class="form-label">City</label>
                        <BFormInput type="text" id="city" placeholder="City" />
                      </div>
                    </BCol>
                    <BCol md="4">
                      <div class="mb-3">
                        <label for="state" class="form-label">State / Province</label>
                        <BFormInput type="text" id="state" placeholder="State or Province" />
                      </div>
                    </BCol>
                    <BCol md="4">
                      <div class="mb-3">
                        <label for="zipcode" class="form-label">Postal / ZIP Code</label>
                        <BFormInput type="text" id="zipcode" placeholder="Postal Code" />
                      </div>
                    </BCol>
                  </BRow>
                  <BRow>
                    <BCol md="6">
                      <div class="mb-3">
                        <label for="country" class="form-label">Country</label>
                        <BFormInput type="text" id="country" placeholder="Country" />
                      </div>
                    </BCol>
                  </BRow>

                  <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light text-center">
                    <Icon icon="building" class="me-1 fs-lg"></Icon>
                    Company Info
                  </h5>
                  <BRow>
                    <BCol md="6">
                      <div class="mb-3">
                        <label for="companyname" class="form-label">Company Name</label>
                        <BFormInput type="text" id="companyname" placeholder="Enter company name" />
                      </div>
                    </BCol>
                    <BCol md="6">
                      <div class="mb-3">
                        <label for="cwebsite" class="form-label">Website</label>
                        <BFormInput type="text" id="cwebsite" placeholder="https://yourcompany.com" />
                      </div>
                    </BCol>
                  </BRow>

                  <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light text-center">
                    <Icon icon="earth" class="me-1 fs-lg"></Icon>
                    Social
                  </h5>
                  <BRow class="g-3">
                    <BCol md="6">
                      <label for="social-fb" class="form-label">Facebook</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
                          </svg>
                        </span>
                        <BFormInput type="text" id="social-fb" placeholder="Facebook URL" />
                      </div>
                    </BCol>
                    <BCol md="6">
                      <label for="social-tw" class="form-label">Twitter X</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                          </svg>
                        </span>
                        <BFormInput type="text" id="social-tw" placeholder="@username" />
                      </div>
                    </BCol>
                    <BCol md="6">
                      <label for="social-insta" class="form-label">Instagram</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                            <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                            <path d="M16.5 7.5v.01" />
                          </svg>
                        </span>
                        <BFormInput type="text" id="social-insta" placeholder="Instagram URL" />
                      </div>
                    </BCol>
                    <BCol md="6">
                      <label for="social-lin" class="form-label">LinkedIn</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M8 11v5" />
                            <path d="M8 8v.01" />
                            <path d="M12 16v-5" />
                            <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                            <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
                          </svg>
                        </span>
                        <BFormInput type="text" id="social-lin" placeholder="LinkedIn Profile" />
                      </div>
                    </BCol>
                    <BCol md="6">
                      <label for="social-gh" class="form-label">GitHub</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path
                              d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
                            />
                          </svg>
                        </span>
                        <BFormInput type="text" id="social-gh" placeholder="GitHub Username" />
                      </div>
                    </BCol>
                    <BCol md="6">
                      <label for="social-sky" class="form-label">Dribbble</label>
                      <div class="input-group">
                        <span class="input-group-text">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-dribbble">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                            <path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
                            <path d="M6.4 19c3.5 -3.5 6 -6.5 14.5 -6.4" />
                            <path d="M3.1 10.75c5 0 9.814 -.38 15.314 -5" />
                          </svg>
                        </span>
                        <BFormInput type="text" id="social-sky" placeholder="@username" />
                      </div>
                    </BCol>
                  </BRow>

                  <div class="text-end mt-4">
                    <BButton variant="success" type="submit">Save Changes</BButton>
                  </div>
                </BForm>
              </BCardBody>
            </BCard>
          </BCol>
        </BRow>
      </div>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BCard, BCardBody, BCol, BForm, BFormGroup, BFormInput, BFormTextarea, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'

const form = ref({
  firstName: '',
  lastName: '',
  jobTitle: '',
  phone: '',
  bio: '',
  email: '',
  password: '',
  profilePhoto: null,
  address1: '',
  address2: '',
  city: '',
  state: '',
  zipcode: '',
  country: '',
  companyName: '',
  companyWebsite: '',
})
</script>
