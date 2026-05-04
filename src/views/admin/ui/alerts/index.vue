<template>
  <PageBreadcrumb title="Alerts" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Default Alert" isTogglable>
        <BAlert :model-value="true" variant="primary" role="alert"> This is a primary alert—something important you should know! </BAlert>

        <BAlert :model-value="true" variant="secondary" role="alert"> This is a secondary alert—some additional context. </BAlert>

        <BAlert :model-value="true" variant="success" role="alert"> Success! Your operation was completed successfully. </BAlert>

        <BAlert :model-value="true" variant="danger" role="alert"> Error! Something went wrong—please try again. </BAlert>

        <BAlert :model-value="true" variant="warning" role="alert"> Warning! Please double-check your inputs. </BAlert>

        <BAlert :model-value="true" variant="info" role="alert"> Info: Here's something you might find useful. </BAlert>

        <BAlert :model-value="true" variant="light" role="alert"> Light alert—just a subtle notification. </BAlert>

        <BAlert :model-value="true" variant="dark" role="alert" class="mb-0"> Dark alert—use for general-purpose messages. </BAlert>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Dismissing Alert with Solid Colors" isTogglable>
        <BAlert variant="primary" dismissible show class="text-bg-primary" role="alert">
          <div>Heads up! This is a primary alert with important information.</div>
        </BAlert>

        <BAlert variant="secondary" dismissible show class="text-bg-secondary" role="alert">
          <div>Notice: This is a secondary alert with supporting details.</div>
        </BAlert>

        <BAlert variant="success" dismissible show class="text-bg-success" role="alert">
          <div>Success! Your action was completed successfully.</div>
        </BAlert>

        <BAlert variant="danger" dismissible show class="text-bg-danger" role="alert">
          <div>Error! Something went wrong—please try again later.</div>
        </BAlert>

        <BAlert variant="warning" dismissible show class="text-bg-warning" role="alert">
          <div>Warning! Please review your input before proceeding.</div>
        </BAlert>

        <BAlert variant="info" dismissible show class="text-bg-info" role="alert">
          <div>Info: Here’s something you might find helpful.</div>
        </BAlert>

        <BAlert variant="light" dismissible show class="text-bg-light" role="alert">
          <div>Note: This is a light alert with a subtle message.</div>
        </BAlert>

        <BAlert variant="dark" dismissible show class="text-bg-dark" role="alert" alert-class="mb-0">
          <div>Notice: This dark alert is great for general messages.</div>
        </BAlert>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Link Color" isTogglable>
        <BAlert show variant="primary" role="alert">
          Need more info? Check out
          <RouterLink to="" class="alert-link">this primary link</RouterLink>
          for important details.
        </BAlert>

        <BAlert show variant="secondary" role="alert">
          Here's a secondary message with
          <RouterLink to="" class="alert-link">a helpful link</RouterLink>
          for additional context.
        </BAlert>

        <BAlert show variant="success" role="alert">
          Operation successful! View the results
          <RouterLink to="" class="alert-link">by clicking here</RouterLink>
          .
        </BAlert>

        <BAlert show variant="danger" role="alert">
          Something went wrong. Learn more
          <RouterLink to="" class="alert-link">through this alert link</RouterLink>
          .
        </BAlert>

        <BAlert show variant="warning" role="alert">
          Heads up! You might want to check
          <RouterLink to="" class="alert-link">this warning link</RouterLink>
          .
        </BAlert>

        <BAlert show variant="info" role="alert">
          Here’s some information that may help—click
          <RouterLink to="" class="alert-link">this link</RouterLink>
          to read more.
        </BAlert>

        <BAlert show variant="light" role="alert">
          Just a light reminder with
          <RouterLink to="" class="alert-link">a gentle link</RouterLink>
          to explore.
        </BAlert>

        <BAlert show variant="dark" role="alert" alert-class="mb-0">
          This is a general dark alert. Find out more
          <RouterLink to="" class="alert-link">by clicking here</RouterLink>
          .
        </BAlert>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Additional Content" isTogglable>
        <BAlert show variant="success" class="p-3" role="alert">
          <h4 class="alert-heading">Great job!</h4>
          <p>You&apos;ve successfully read this important alert message. The text is intentionally a bit longer to demonstrate how spacing behaves in this kind of layout.</p>
          <hr class="border-success border-opacity-25" />
          <p class="mb-0">Use margin utilities to keep your content clean and organized.</p>
        </BAlert>

        <BAlert show variant="secondary" class="p-3" role="alert">
          <div class="d-flex align-items-start gap-2 mb-2">
            <Icon icon="alarm-clock" class="fs-1" />
            <div>
              <h4 class="alert-heading">Heads up!</h4>
              <p>This alert message gives additional information with a longer message to show content spacing within an alert.</p>
              <hr class="border-secondary border-opacity-25" />
              <p class="mb-0">Apply spacing classes wisely to maintain structure and clarity.</p>
            </div>
          </div>
        </BAlert>

        <BAlert show class="alert-danger p-3 mb-0" role="alert">
          <div class="d-flex align-items-start gap-2 mb-2">
            <Icon icon="phone-call" class="fs-1" />
            <div>
              <h4 class="alert-heading">Notice!</h4>
              <p>You’ve just read through a primary alert message. The extra length helps show how well the layout handles content spacing.</p>
              <button type="button" class="btn btn-danger btn-sm">Got it</button>
            </div>
          </div>
        </BAlert>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Custom Alerts" isTogglable>
        <BAlert variant="primary" dismissible show class="border border-primary" role="alert">
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          <div>A primary alert with a full border!</div>
        </BAlert>

        <BAlert dismissible variant="secondary" show class="alert-bordered border-start border-secondary" role="alert">
          <div>A secondary alert with a left border only!</div>
        </BAlert>

        <BAlert variant="dark" dismissible show class="alert-bordered border-bottom border-dark" role="alert">
          <div>A dark alert with a bottom border!</div>
        </BAlert>

        <BAlert dismissible show class="alert-success border-2 border border-dashed border-success" role="alert">
          <div>A purple alert with a dashed border!</div>
        </BAlert>

        <BAlert variant="danger" dismissible show class="border-2 border-danger" role="alert">
          <div>A danger alert with a thick border!</div>
        </BAlert>

        <BAlert
          variant="warning"
          dismissible
          header-class="w-100"
          close-variant="warning"
          close-class="ms-auto btn btn-sm bg-warning rounded-circle p-2 d d-flex justify-content-center m-1"
          body-class="d-flex w-100 align-items-center justify-content-between"
          show
          alert-class="d-flex w-100 align-items-center"
          role="alert"
        >
          <div>A warning alert with a custom close button!</div>
        </BAlert>

        <BAlert variant="info" dismissible show class="d-flex align-items-center gap-2" role="alert"> <Icon icon="octagon-alert" class="fs-xl" /> An info alert with a custom icon! </BAlert>

        <BAlert variant="light" show class="border-2 p-3 mb-0" role="alert">
          <div class="d-flex align-items-center">
            <Icon icon="phone-call" class="text-success fs-2 me-3" />
            <div>
              <h4 class="alert-heading">Notice!</h4>
              <p class="m-0">You’ve just read through a primary alert message. The extra length helps show how well the layout handles content spacing.</p>
            </div>
          </div>
        </BAlert>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Live Alert" isTogglable>
        <BAlert :show="showLiveAlert" variant="success" dismissible role="alert">
          <div>Nice, you triggered this alert message!</div>
        </BAlert>
        <BButton variant="primary" @click="showLiveAlert = !showLiveAlert">Show live alert</BButton>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BAlert, BCol, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
const showLiveAlert = ref(false)

</script>
