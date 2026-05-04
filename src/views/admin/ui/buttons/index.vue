<template>
  <PageBreadcrumb title="Buttons" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Default Buttons" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton class="btn-default" :variant="null">Default</BButton>
          <BButton variant="primary">Primary</BButton>
          <BButton variant="secondary">Secondary</BButton>
          <BButton variant="success">Success</BButton>
          <BButton variant="danger">Danger</BButton>
          <BButton variant="warning">Warning</BButton>
          <BButton variant="info">Info</BButton>
          <BButton variant="light">Light</BButton>
          <BButton variant="dark">Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Button Rounded" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton class="btn-default" :variant="null" pill>Default</BButton>
          <BButton variant="primary" pill>Primary</BButton>
          <BButton variant="secondary" pill>Secondary</BButton>
          <BButton variant="success" pill>Success</BButton>
          <BButton variant="danger" pill>Danger</BButton>
          <BButton variant="warning" pill>Warning</BButton>
          <BButton variant="info" pill>Info</BButton>
          <BButton variant="light" pill>Light</BButton>
          <BButton variant="dark" pill>Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6" no-body>
      <CardWithAction title="Button Outline" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton variant="outline-primary">Primary</BButton>
          <BButton variant="outline-secondary">Secondary</BButton>
          <BButton variant="outline-success">Success</BButton>
          <BButton variant="outline-danger">Danger</BButton>
          <BButton variant="outline-warning">Warning</BButton>
          <BButton variant="outline-info">Info</BButton>
          <BButton variant="outline-light">Light</BButton>
          <BButton variant="outline-dark">Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Button Outline Rounded" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton pill variant="outline-primary">Primary</BButton>
          <BButton pill variant="outline-secondary">Secondary</BButton>
          <BButton pill variant="outline-success">Success</BButton>
          <BButton pill variant="outline-danger">Danger</BButton>
          <BButton pill variant="outline-warning">Warning</BButton>
          <BButton pill variant="outline-info">Info</BButton>
          <BButton pill variant="outline-light">Light</BButton>
          <BButton pill variant="outline-dark">Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Soft Buttons" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton :variant="null" class="btn-soft-primary">Primary</BButton>
          <BButton :variant="null" class="btn-soft-secondary">Secondary</BButton>
          <BButton :variant="null" class="btn-soft-success">Success</BButton>
          <BButton :variant="null" class="btn-soft-danger">Danger</BButton>
          <BButton :variant="null" class="btn-soft-warning">Warning</BButton>
          <BButton :variant="null" class="btn-soft-info">Info</BButton>
          <BButton :variant="null" class="btn-soft-dark">Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Soft Rounded Buttons" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton :variant="null" pill class="btn-soft-primary">Primary</BButton>
          <BButton :variant="null" pill class="btn-soft-secondary">Secondary</BButton>
          <BButton :variant="null" pill class="btn-soft-success">Success</BButton>
          <BButton :variant="null" pill class="btn-soft-danger">Danger</BButton>
          <BButton :variant="null" pill class="btn-soft-warning">Warning</BButton>
          <BButton :variant="null" pill class="btn-soft-info">Info</BButton>
          <BButton :variant="null" pill class="btn-soft-dark">Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Ghost Buttons" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton type="button" :variant="null" class="btn-ghost-primary">Primary</BButton>
          <BButton type="button" class="btn-ghost-secondary">Secondary</BButton>
          <BButton type="button" class="btn-ghost-success">Success</BButton>
          <BButton type="button" class="btn-ghost-danger">Danger</BButton>
          <BButton type="button" class="btn-ghost-warning">Warning</BButton>
          <BButton type="button" class="btn-ghost-info">Info</BButton>
          <BButton type="button" class="btn-ghost-dark">Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Ghost Rounded Buttons" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton pill :variant="null" type="button" class="btn-ghost-primary">Primary</BButton>
          <BButton pill type="button" class="btn-ghost-secondary">Secondary</BButton>
          <BButton pill type="button" class="btn-ghost-success">Success</BButton>
          <BButton pill type="button" class="btn-ghost-danger">Danger</BButton>
          <BButton pill type="button" class="btn-ghost-warning">Warning</BButton>
          <BButton pill type="button" class="btn-ghost-info">Info</BButton>
          <BButton pill type="button" class="btn-ghost-dark">Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Gradient Buttons" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton class="btn-default bg-gradient">Default</BButton>
          <BButton variant="primary" class="btn-primary bg-gradient">Primary</BButton>
          <BButton variant="secondary" class="btn-secondary bg-gradient">Secondary</BButton>
          <BButton variant="success" class="btn-success bg-gradient">Success</BButton>
          <BButton variant="danger" class="btn-danger bg-gradient">Danger</BButton>
          <BButton variant="warning" class="btn-warning bg-gradient">Warning</BButton>
          <BButton variant="info" class="btn-info bg-gradient">Info</BButton>
          <BButton variant="light" class="btn-light bg-gradient">Light</BButton>
          <BButton variant="dark" class="btn-dark bg-gradient">Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Gradient Rounded Buttons" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <button type="button" class="btn btn-default rounded-pill bg-gradient">Default</button>
          <button type="button" class="btn btn-primary rounded-pill bg-gradient">Primary</button>
          <button type="button" class="btn btn-secondary rounded-pill bg-gradient">Secondary</button>
          <button type="button" class="btn btn-success rounded-pill bg-gradient">Success</button>
          <button type="button" class="btn btn-danger rounded-pill bg-gradient">Danger</button>
          <button type="button" class="btn btn-warning rounded-pill bg-gradient">Warning</button>
          <button type="button" class="btn btn-info rounded-pill bg-gradient">Info</button>
          <button type="button" class="btn btn-light rounded-pill bg-gradient">Light</button>
          <button type="button" class="btn btn-dark rounded-pill bg-gradient">Dark</button>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Button Sizes" isTogglable>
        <div class="d-flex flex-wrap align-items-center gap-2">
          <BButton variant="primary" size="lg">Large</BButton>
          <BButton variant="info">Normal</BButton>
          <BButton class="btn-success" size="sm">Small</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Disabled Buttons" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton variant="info" disabled>Info</BButton>
          <BButton variant="success" disabled>Success</BButton>
          <BButton variant="danger" disabled>Danger</BButton>
          <BButton variant="dark" disabled>Dark</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Block Button" isTogglable>
        <div class="d-grid gap-2">
          <BButton variant="primary" size="sm">Block Button</BButton>
          <BButton variant="success" size="lg">Block Button</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Toggle Button" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton variant="primary" type="button" v-model:pressed="buttonToggle">Toggle button</BButton>
          <button type="button" class="btn btn-primary active">Active toggle button</button>
          <button type="button" class="btn btn-primary" disabled>Disabled toggle button</button>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Icon Buttons" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <button type="button" class="btn btn-primary btn-icon">
            <Icon icon="star" class="fs-xl" />
          </button>
          <button type="button" class="btn btn-purple btn-icon">
            <Icon icon="leaf" class="fs-xl" />
          </button>
          <button type="button" class="btn btn-warning btn-icon">
            <Icon icon="settings" class="fs-xl" />
          </button>
          <button type="button" class="btn btn-soft-info rounded-circle btn-icon">
            <Icon icon="bell" class="fs-xl" />
          </button>
          <button type="button" class="btn btn-secondary rounded-circle btn-icon">
            <Icon icon="rocket" class="fs-xl" />
          </button>
          <button type="button" class="btn btn-outline-dark rounded-circle btn-icon">
            <Icon icon="plane" class="fs-xl" />
          </button>
          <button type="button" class="btn btn-soft-secondary btn-icon">
            <Icon icon="mic" class="fs-xl" />
          </button>

          <button type="button" class="btn btn-light">
            <Icon icon="hand" class="fs-xl me-1" />
            Stop
          </button>
          <button type="button" class="btn btn-dark">
            <Icon icon="bolt" class="fs-xl me-1" />
            Boost
          </button>

          <button type="button" class="btn btn-outline-info">
            <Icon icon="credit-card" class="fs-xl me-1" />
            Payment
          </button>
          <button type="button" class="btn btn-danger">
            <Icon icon="pencil-ruler" class="fs-xl me-1" />
            Tools
          </button>
        </div>

        <div class="d-flex flex-wrap gap-2 mt-3">
          <button class="btn btn-sm btn-outline-secondary btn-icon" type="button">
            <Icon icon="star" />
          </button>
          <button class="btn btn-sm btn-primary btn-icon" type="button">
            <Icon icon="leaf" />
          </button>
          <button class="btn btn-sm btn-success btn-icon rounded-circle" type="button">
            <Icon icon="settings" />
          </button>

          <button class="btn btn-outline-secondary btn-icon btn-lg" type="button">
            <Icon icon="bell" class="fs-xxl" />
          </button>
          <button class="btn btn-primary btn-icon btn-lg rounded-circle" type="button">
            <Icon icon="rocket" class="fs-xxl" />
          </button>
          <button class="btn btn-success btn-icon btn-lg rounded-circle" type="button">
            <Icon icon="share-2" class="fs-xxl" />
          </button>
          <button class="btn btn-info btn-icon btn-lg" type="button">
            <Icon icon="star" class="fs-xxl" />
          </button>
          <button class="btn btn-warning btn-icon btn-lg" type="button">
            <Icon icon="octagon-alert" class="fs-xxl" />
          </button>
        </div>
      </CardWithAction>

      <CardWithAction title="Button Tags" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <RouterLink class="btn btn-primary" to="#" role="button">Link</RouterLink>
          <BButton vrainat="primary" type="submit">Button</BButton>
          <input class="btn btn-primary" type="button" value="Input" />
          <input class="btn btn-primary" type="submit" value="Submit" />
          <input class="btn btn-primary" type="reset" value="Reset" />
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Button Group" isTogglable>
        <BButtonGroup class="mb-2">
          <BButton variant="light">Left</BButton>
          <BButton variant="light">Middle</BButton>
          <BButton variant="light">Right</BButton>
        </BButtonGroup>
        <br />
        <BButtonGroup class="mb-2 me-1">
          <BButton variant="light">1</BButton>
          <BButton variant="light">2</BButton>
          <BButton variant="light">3</BButton>
        </BButtonGroup>
        <BButtonGroup class="mb-2 me-1">
          <BButton variant="light">4</BButton>
          <BButton variant="light">5</BButton>
          <BButton variant="light">6</BButton>
          <BButton variant="light">7</BButton>
        </BButtonGroup>
        <BButtonGroup class="mb-2">
          <BButton variant="light">8</BButton>
        </BButtonGroup>
        <br />
        <BButtonGroup class="mb-2">
          <BButton variant="light">1</BButton>
          <BButton variant="primary">2</BButton>
          <BButton variant="light">3</BButton>
          <BDropdown text="Dropdown" variant="light" menu-class="dropdown-menu-end">
            <BDropdownItem>Dropdown link</BDropdownItem>
            <BDropdownItem>Dropdown link</BDropdownItem>
          </BDropdown>
        </BButtonGroup>
        <BRow>
          <BCol md="3">
            <BButtonGroup vertical>
              <BButton variant="light">Top</BButton>
              <BButton variant="light">Middle</BButton>
              <BButton variant="light">Bottom</BButton>
            </BButtonGroup>
          </BCol>
          <BCol md="3">
            <BButtonGroup vertical>
              <BButton variant="light">Button 1</BButton>
              <BButton variant="light">Button 2</BButton>
              <BDropdown text="Button 3" variant="light" menu-class="dropdown-menu-end">
                <BDropdownItem>Dropdown link</BDropdownItem>
                <BDropdownItem>Dropdown link</BDropdownItem>
              </BDropdown>
            </BButtonGroup>
          </BCol>
        </BRow>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BButtonGroup, BCol, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
const buttonToggle = ref(false)

</script>
