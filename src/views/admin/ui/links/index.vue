<template>
  <PageBreadcrumb title="Links" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Colored Links" isTogglable>
        <p><RouterLink to="#" class="link-primary">Primary link</RouterLink></p>
        <p><RouterLink to="#" class="link-secondary">Secondary link</RouterLink></p>
        <p><RouterLink to="#" class="link-success">Success link</RouterLink></p>
        <p><RouterLink to="#" class="link-danger">Danger link</RouterLink></p>
        <p><RouterLink to="#" class="link-warning">Warning link</RouterLink></p>
        <p><RouterLink to="#" class="link-info">Info link</RouterLink></p>
        <p><RouterLink to="#" class="link-light">Light link</RouterLink></p>
        <p><RouterLink to="#" class="link-dark">Dark link</RouterLink></p>
        <p class="mb-0">
          <RouterLink to="#" class="link-body-emphasis">Emphasis link</RouterLink>
        </p>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Link Utilities" isTogglable>
        <p>
          <RouterLink to="#" class="link-primary text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Primary link</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="link-secondary text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Secondary link</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="link-success text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Success link</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="link-danger text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Danger link</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="link-warning text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Warning link</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="link-info text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Info link</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="link-light text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Light link</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="link-dark text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Dark link</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="link-body-emphasis text-decoration-underline link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">Emphasis link</RouterLink>
        </p>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Link Opacity" isTogglable>
        <p>
          <RouterLink class="link-opacity-10" to="#">Link opacity 10</RouterLink>
        </p>
        <p>
          <RouterLink class="link-opacity-25" to="#">Link opacity 25</RouterLink>
        </p>
        <p>
          <RouterLink class="link-opacity-50" to="#">Link opacity 50</RouterLink>
        </p>
        <p>
          <RouterLink class="link-opacity-75" to="#">Link opacity 75</RouterLink>
        </p>
        <p class="mb-0">
          <RouterLink class="link-opacity-100" to="#">Link opacity 100</RouterLink>
        </p>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Link Hover Opacity" isTogglable>
        <p class="text-muted">You can even change the opacity level on hover.</p>
        <p>
          <RouterLink class="link-opacity-10-hover" to="#">Link hover opacity 10</RouterLink>
        </p>
        <p>
          <RouterLink class="link-opacity-25-hover" to="#">Link hover opacity 25</RouterLink>
        </p>
        <p>
          <RouterLink class="link-opacity-50-hover" to="#">Link hover opacity 50</RouterLink>
        </p>
        <p>
          <RouterLink class="link-opacity-75-hover" to="#">Link hover opacity 75</RouterLink>
        </p>
        <p class="mb-0">
          <RouterLink class="link-opacity-100-hover" to="#">Link hover opacity 100</RouterLink>
        </p>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Underline Color" isTogglable>
        <p class="text-muted">Change the underline’s color independent of the link text color.</p>
        <p>
          <RouterLink to="#" class="text-decoration-underline link-underline-primary">Primary underline</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="text-decoration-underline link-underline-secondary">Secondary underline</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="text-decoration-underline link-underline-success">Success underline</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="text-decoration-underline link-underline-danger">Danger underline</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="text-decoration-underline link-underline-warning">Warning underline</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="text-decoration-underline link-underline-info">Info underline</RouterLink>
        </p>
        <p>
          <RouterLink to="#" class="text-decoration-underline link-underline-light">Light underline</RouterLink>
        </p>
        <p class="mb-0">
          <RouterLink to="#" class="text-decoration-underline link-underline-dark">Dark underline</RouterLink>
        </p>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Underline Opacity" isTogglable>
        <p>
          <RouterLink class="text-decoration-underline link-offset-2 link-underline link-underline-opacity-0" to="#">Underline opacity 0</RouterLink>
        </p>
        <p>
          <RouterLink class="text-decoration-underline link-offset-2 link-underline link-underline-opacity-10" to="#">Underline opacity 10</RouterLink>
        </p>
        <p>
          <RouterLink class="text-decoration-underline link-offset-2 link-underline link-underline-opacity-25" to="#">Underline opacity 25</RouterLink>
        </p>
        <p>
          <RouterLink class="text-decoration-underline link-offset-2 link-underline link-underline-opacity-50" to="#">Underline opacity 50</RouterLink>
        </p>
        <p>
          <RouterLink class="text-decoration-underline link-offset-2 link-underline link-underline-opacity-75" to="#">Underline opacity 75</RouterLink>
        </p>
        <p class="mb-0">
          <RouterLink class="text-decoration-underline link-offset-2 link-underline link-underline-opacity-100" to="#">Underline opacity 100</RouterLink>
        </p>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Underline Offset" isTogglable>
        <p><RouterLink to="#">Default link</RouterLink></p>
        <p>
          <RouterLink class="text-decoration-underline link-offset-1" to="#">Offset 1 link</RouterLink>
        </p>
        <p>
          <RouterLink class="text-decoration-underline link-offset-2" to="#">Offset 2 link</RouterLink>
        </p>
        <p class="mb-0">
          <RouterLink class="text-decoration-underline link-offset-3" to="#">Offset 3 link</RouterLink>
        </p>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Hover Variants" isTogglable>
        <RouterLink class="link-offset-2 link-offset-3-hover text-decoration-underline link-underline link-underline-opacity-0 link-underline-opacity-75-hover" to="#">Underline opacity 0</RouterLink>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
