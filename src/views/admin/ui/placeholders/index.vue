<template>
  <PageBreadcrumb title="Placeholders" subtitle="UI" />

  <BRow>
    <BCol xl="6">
      <CardWithAction title="Placeholders" isTogglable>
        <BRow>
          <BCol md="5">
            <BCard no-body class="border shadow-none mb-md-0">
              <img src="/images/stock/small-1.jpg" class="card-img-top" alt="..." />

              <BCardBody>
                <BCardTitle as="h5" class="mb-2">Card Title</BCardTitle>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <RouterLink to="#" class="btn btn-primary">Go somewhere</RouterLink>
              </BCardBody>
            </BCard>
          </BCol>

          <BCol md="5">
            <BCard no-body class="border shadow-none mb-0" aria-hidden="true">
              <svg class="card-img-top" width="100%" style="aspect-ratio: 16 / 10" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" viewBox="0 0 16 10">
                <title>Placeholder</title>
                <rect width="16" height="10" fill="#20c997"></rect>
              </svg>

              <BCardBody>
                <BCardTitle as="h5" class="mb-2 placeholder-glow">
                  <span class="placeholder col-6">&nbsp;</span>
                </BCardTitle>
                <p class="card-text placeholder-glow">
                  <BPlaceholder cols="7" />&nbsp;
                  <BPlaceholder cols="4" />
                  <BPlaceholder cols="4" />&nbsp;
                  <BPlaceholder cols="6" />
                  <BPlaceholder cols="3" />
                </p>
                <RouterLink to="" class="btn btn-primary disabled placeholder col-6" aria-disabled="true">
                  <span class="invisible">Read Only</span>
                </RouterLink>
              </BCardBody>
            </BCard>
          </BCol>
        </BRow>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Color" isTogglable>
        <BPlaceholder cols="12" class=""></BPlaceholder>
        <BPlaceholder cols="12" variant="primary" />
        <BPlaceholder cols="12" variant="secondary" />
        <BPlaceholder cols="12" variant="success" />
        <BPlaceholder cols="12" variant="danger" />
        <BPlaceholder cols="12" variant="warning" />
        <BPlaceholder cols="12" variant="info" />
        <BPlaceholder cols="12" variant="light" />
        <BPlaceholder cols="12" variant="dark" />
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Width" isTogglable>
        <BPlaceholder cols="6" />
        <BPlaceholder class="w-75" /> <br />
        <BPlaceholder width="25%" class="me-1" />
        <BPlaceholder width="10%" />
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Sizing" isTogglable>
        <BPlaceholder cols="12" size="lg" />
        <BPlaceholder cols="12" />
        <BPlaceholder cols="12" size="sm" />
        <BPlaceholder cols="12" size="xs" />
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="How it works" isTogglable>
        <p aria-hidden="true">
          <BPlaceholder cols="6" />
        </p>

        <BPlaceholder cols="4" tag="a" href="#" class="btn btn-primary disabled" aria-hidden="true" />
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Animation" isTogglable>
        <BPlaceholder animation="glow" cols="12" class="mb-3" />
        <BPlaceholder animation="wave" cols="12" class="mb-0" />
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
