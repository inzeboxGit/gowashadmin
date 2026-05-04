<template>
  <PageBreadcrumb title="Spinners" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Border Spinner" isTogglable>
        <BSpinner class="m-2" />
      </CardWithAction>

      <CardWithAction title="Colors" isTogglable>
        <BSpinner variant="primary" class="m-2" />
        <BSpinner variant="secondary" class="m-2" />
        <BSpinner variant="success" class="m-2" />
        <BSpinner variant="danger" class="m-2" />
        <BSpinner variant="warning" class="m-2" />
        <BSpinner variant="info" class="m-2" />
        <BSpinner variant="light" class="m-2" />
        <BSpinner variant="dark" class="m-2" />
        <BSpinner class="m-2 text-purple" />
      </CardWithAction>

      <CardWithAction title="Alignment" isTogglable>
        <div class="d-flex align-items-center">
          <strong>Loading...</strong>
          <BSpinner class="ms-auto" />
        </div>

        <div class="d-flex justify-content-center mt-3">
          <BSpinner />
        </div>
      </CardWithAction>

      <CardWithAction title="Buttons Spinner" isTogglable>
        <BRow class="g-3">
          <BCol lg="6">
            <div class="d-flex flex-wrap gap-2">
              <BButton variant="primary" class="btn-icon" type="button" disabled>
                <BSpinner small />
              </BButton>
              <BButton variant="primary" class="rounded-circle btn-icon" type="button" disabled>
                <BSpinner small />
              </BButton>
              <BButton variant="primary" type="button" disabled>
                <BSpinner small />
              </BButton>
              <BButton variant="primary" type="button" disabled>
                <BSpinner small class="me-1" />
                Loading...
              </BButton>
            </div>
          </BCol>

          <BCol lg="6">
            <div class="d-flex flex-wrap gap-2">
              <BButton variant="primary" class="btn-icon" type="button" disabled>
                <BSpinner small type="grow" />
              </BButton>
              <BButton variant="primary" class="btn-icon rounded-circle" type="button" disabled>
                <BSpinner small type="grow" />
              </BButton>
              <BButton variant="primary" type="button" disabled>
                <BSpinner small type="grow" />
              </BButton>
              <BButton variant="primary" type="button" disabled>
                <BSpinner small class="me-1" type="grow" />
                Loading...
              </BButton>
            </div>
          </BCol>
        </BRow>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Growing Spinner" isTogglable>
        <BSpinner class="m-2" type="grow" />
      </CardWithAction>

      <CardWithAction title="Color Growing Spinner" isTogglable>
        <BSpinner variant="primary" class="m-2" type="grow" />
        <BSpinner variant="secondary" class="m-2" type="grow" />
        <BSpinner variant="success" class="m-2" type="grow" />
        <BSpinner variant="danger" class="m-2" type="grow" />
        <BSpinner variant="warning" class="m-2" type="grow" />
        <BSpinner variant="info" class="m-2" type="grow" />
        <BSpinner variant="light" class="m-2" type="grow" />
        <BSpinner variant="dark" class="m-2" type="grow" />
        <BSpinner type="grow" class="text-purple m-2" />
      </CardWithAction>

      <CardWithAction title="Size" isTogglable>
        <BRow>
          <BCol lg="6">
            <BSpinner variant="primary" class="avatar-lg m-2" />
            <BSpinner variant="secondary" class="avatar-lg m-2" type="grow" />
          </BCol>

          <BCol lg="6">
            <BSpinner variant="primary" class="avatar-md m-2" />
            <BSpinner variant="secondary" class="avatar-md m-2" type="grow" />
          </BCol>

          <BCol lg="6">
            <BSpinner variant="primary" class="avatar-sm m-2" />
            <BSpinner variant="secondary" class="avatar-sm m-2" type="grow" />
          </BCol>

          <BCol lg="6">
            <BSpinner small class="m-2" />
            <BSpinner small class="m-2" type="grow" />
          </BCol>
        </BRow>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
