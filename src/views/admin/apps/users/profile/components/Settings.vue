<template>
  <BForm>
    <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light d-flex justify-content-center align-items-center gap-1">
      <Icon icon="circle-user-round" class="fs-lg" />
      Personal Info
    </h5>

    <BRow>
      <BCol md="6">
        <BFormGroup label="First Name" label-for="firstname" class="mb-3">
          <BFormInput type="text" id="firstname" placeholder="Enter first name" class="form-control" />
        </BFormGroup>
      </BCol>
      <BCol md="6">
        <BFormGroup label="Last Name" label-for="lastname" class="mb-3">
          <BFormInput type="text" id="lastname" placeholder="Enter last name" class="form-control" />
        </BFormGroup>
      </BCol>
    </BRow>

    <BRow>
      <BCol md="6">
        <BFormGroup label="Job Title" label-for="jobtitle" class="mb-3">
          <BFormInput type="text" id="jobtitle" placeholder="e.g. UI Developer, Designer" class="form-control" />
        </BFormGroup>
      </BCol>
      <BCol md="6">
        <BFormGroup label="Phone Number" label-for="phone" class="mb-3">
          <BFormInput type="text" id="phone" placeholder="+1 234 567 8901" class="form-control" />
        </BFormGroup>
      </BCol>
    </BRow>

    <BFormGroup label="Bio" label-for="userbio" class="mb-3">
      <BFormTextarea id="userbio" rows="4" placeholder="Write something about yourself..." class="form-control" />
    </BFormGroup>

    <BRow>
      <BCol md="6">
        <BFormGroup label="Email Address" label-for="useremail" class="mb-3">
          <BFormInput type="email" id="useremail" placeholder="Enter email" class="form-control" />
          <span class="form-text fs-xs fst-italic text-muted">
            <RouterLink to="#" class="link-reset">Click here to change your email</RouterLink>
          </span>
        </BFormGroup>
      </BCol>
      <BCol md="6">
        <BFormGroup label="Password" label-for="userpassword" class="mb-3">
          <BFormInput type="password" id="userpassword" placeholder="Enter new password" class="form-control" />
          <span class="form-text fs-xs fst-italic text-muted">
            <RouterLink to="#" class="link-reset">Click here to change your password</RouterLink>
          </span>
        </BFormGroup>
      </BCol>
    </BRow>

    <div class="mb-4">
      <label for="profilephoto" class="form-label">Profile Photo</label>
      <input class="form-control" type="file" id="profilephoto" />
    </div>

    <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light d-flex justify-content-center align-items-center gap-1">
      <Icon icon="map-pin" class="fs-lg" />
      Address Info
    </h5>

    <BRow>
      <BCol md="6">
        <BFormGroup label="Address Line 1" label-for="address-line1" class="mb-3">
          <BFormInput type="text" id="address-line1" placeholder="Street, Apartment, Unit, etc." class="form-control" />
        </BFormGroup>
      </BCol>
      <BCol md="6">
        <BFormGroup label="Address Line 2" label-for="address-line2" class="mb-3">
          <BFormInput type="text" id="address-line2" placeholder="Optional" class="form-control" />
        </BFormGroup>
      </BCol>
    </BRow>

    <BRow>
      <BCol md="4">
        <BFormGroup label="City" label-for="city" class="mb-3">
          <BFormInput type="text" id="city" placeholder="City" class="form-control" />
        </BFormGroup>
      </BCol>
      <BCol md="4">
        <BFormGroup label="State / Province" label-for="state" class="mb-3">
          <BFormInput type="text" id="state" placeholder="State or Province" class="form-control" />
        </BFormGroup>
      </BCol>
      <BCol md="4">
        <BFormGroup label="Postal / ZIP Code" label-for="zipcode" class="mb-3">
          <BFormInput type="text" id="zipcode" placeholder="Postal Code" class="form-control" />
        </BFormGroup>
      </BCol>
    </BRow>

    <BRow>
      <BCol md="6">
        <BFormGroup label="Country" label-for="country" class="mb-3">
          <BFormInput type="text" id="country" placeholder="Country" class="form-control" />
        </BFormGroup>
      </BCol>
    </BRow>

    <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light d-flex justify-content-center align-items-center gap-1">
      <Icon icon="building" class="fs-lg" />
      Company Info
    </h5>

    <BRow>
      <BCol md="6">
        <BFormGroup label="Company Name" label-for="companyname" class="mb-3">
          <BFormInput type="text" id="companyname" placeholder="Enter company name" class="form-control" />
        </BFormGroup>
      </BCol>
      <BCol md="6">
        <BFormGroup label="Website" label-for="cwebsite" class="mb-3">
          <BFormInput type="text" id="cwebsite" placeholder="https://yourcompany.com" class="form-control" />
        </BFormGroup>
      </BCol>
    </BRow>

    <h5 class="mb-3 text-uppercase bg-light-subtle p-1 border-dashed border rounded border-light d-flex justify-content-center align-items-center gap-1">
      <Icon icon="earth" class="fs-lg" />
      Social
    </h5>

    <BRow class="g-3">
      <BCol md="6">
        <BFormGroup label="Facebook" label-for="social-fb">
          <BInputGroup>
            <BInputGroupText>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-facebook">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" />
              </svg>
            </BInputGroupText>
            <BFormInput type="text" id="social-fb" placeholder="Facebook URL" class="form-control" />
          </BInputGroup>
        </BFormGroup>
      </BCol>

      <BCol md="6">
        <BFormGroup label="Twitter X" label-for="social-tw">
          <BInputGroup>
            <BInputGroupText>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-x">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
              </svg>
            </BInputGroupText>
            <BFormInput type="text" id="social-tw" placeholder="@username" class="form-control" />
          </BInputGroup>
        </BFormGroup>
      </BCol>

      <BCol md="6">
        <BFormGroup label="Instagram" label-for="social-insta">
          <BInputGroup>
            <BInputGroupText>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-instagram">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 8a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                <path d="M16.5 7.5v.01" />
              </svg>
            </BInputGroupText>
            <BFormInput type="text" id="social-insta" placeholder="Instagram URL" class="form-control" />
          </BInputGroup>
        </BFormGroup>
      </BCol>

      <BCol md="6">
        <BFormGroup label="LinkedIn" label-for="social-lin">
          <BInputGroup>
            <BInputGroupText>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-linkedin">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 11v5" />
                <path d="M8 8v.01" />
                <path d="M12 16v-5" />
                <path d="M16 16v-3a2 2 0 1 0 -4 0" />
                <path d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z" />
              </svg>
            </BInputGroupText>
            <BFormInput type="text" id="social-lin" placeholder="LinkedIn Profile" class="form-control" />
          </BInputGroup>
        </BFormGroup>
      </BCol>

      <BCol md="6">
        <BFormGroup label="GitHub" label-for="social-gh">
          <BInputGroup>
            <BInputGroupText>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-github">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path
                  d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5"
                />
              </svg>
            </BInputGroupText>
            <BFormInput type="text" id="social-gh" placeholder="GitHub Username" class="form-control" />
          </BInputGroup>
        </BFormGroup>
      </BCol>

      <BCol md="6">
        <BFormGroup label="Dribbble" label-for="social-sky">
          <BInputGroup>
            <BInputGroupText>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brand-dribbble">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <path d="M9 3.6c5 6 7 10.5 7.5 16.2" />
                <path d="M6.4 19c3.5 -3.5 6 -6.5 14.5 -6.4" />
                <path d="M3.1 10.75c5 0 9.814 -.38 15.314 -5" />
              </svg>
            </BInputGroupText>
            <BFormInput type="text" id="social-sky" placeholder="@username" class="form-control" />
          </BInputGroup>
        </BFormGroup>
      </BCol>
    </BRow>

    <div class="text-end mt-4">
      <BButton variant="success" type="submit">Save Changes</BButton>
    </div>
  </BForm>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import Icon from '~/components/wrappers/Icon.vue'
</script>

<style scoped></style>
