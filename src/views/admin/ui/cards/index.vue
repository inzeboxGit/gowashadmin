<template>
  <PageBreadcrumb title="Cards" subtitle="UI" />

  <BRow>
    <BCol sm="6" lg="3">
      <BCard no-body>
        <BCardBody>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up.</p>
          <BButton size="sm" variant="primary">Button</BButton>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol sm="6" lg="3">
      <BCard no-body>
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Basic Card with Title</BCardTitle>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up.</p>
          <BButton size="sm" variant="primary">Button</BButton>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol sm="6" lg="3">
      <BCard no-body class="text-bg-primary border-0">
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Card with Background Color</BCardTitle>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up.</p>
          <BButton size="sm" variant="light">Button</BButton>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol sm="6" lg="3">
      <BCard no-body class="text-bg-success bg-gradient">
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Card with Background Gradient</BCardTitle>
          <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content. Some quick example text to build on the card title and make up.</p>
          <BButton size="sm" variant="light">Button</BButton>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol md="4">
      <BCard no-body>
        <h5 class="card-header">Card with Header</h5>
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Special title treatment</BCardTitle>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <RouterLink to="" class="btn btn-sm btn-primary">Go somewhere</RouterLink>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol md="4">
      <BCard no-body>
        <BCardHeader class="d-block">
          <BCardTitle as="h5" class="mb-1">Card with Sub Header</BCardTitle>
          <h6 class="card-subtitle text-body-secondary">Card subtitle</h6>
        </BCardHeader>

        <BCardBody>
          <blockquote class="card-bodyquote mb-0">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
            <footer class="mb-0">
              Someone famous in
              <cite title="Source Title">Source Title</cite>
            </footer>
          </blockquote>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol md="4">
      <BCard no-body>
        <BCardHeader class="bg-light-subtle">Featured Card Title</BCardHeader>
        <BCardBody>
          <RouterLink to="" class="btn btn-sm btn-primary">Go somewhere</RouterLink>
        </BCardBody>
        <BCardFooter class="border-top border-light text-muted">2 days ago</BCardFooter>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xs="12">
      <h4 class="mb-4 mt-3">Advanced Card</h4>
    </BCol>
  </BRow>

  <BRow>
    <BCol md="4">
      <CardWithAction title="Card with Action Tools" isTogglable isReloadable isCloseable>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <RouterLink to="" class="btn btn-sm btn-primary">Go somewhere</RouterLink>
      </CardWithAction>
    </BCol>

    <BCol md="4">
      <CardWithAction title="Card with Action Tools & Background Colors" isTogglable isReloadable isCloseable className="text-bg-primary border-0">
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <RouterLink to="" class="btn btn-sm btn-light">Go somewhere</RouterLink>
      </CardWithAction>
    </BCol>

    <BCol md="4">
      <CardWithAction title="Card with Action Tools" isTogglable isReloadable isCloseable>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <RouterLink to="" class="btn btn-sm btn-primary">Go somewhere</RouterLink>
      </CardWithAction>
    </BCol>
  </BRow>

  <BRow>
    <BCol xs="12">
      <h4 class="mb-4 mt-3">Bordered Card</h4>
    </BCol>
  </BRow>

  <BRow>
    <BCol md="4">
      <BCard no-body class="border-primary border">
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Card with Colored Border</BCardTitle>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <RouterLink to="" class="btn btn-primary btn-sm">Button</RouterLink>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol md="4">
      <BCard no-body class="border-primary border border-dashed">
        <BCardBody>
          <BCardTitle as="h5" class="mb-2 text-primary">Card with Simple Border</BCardTitle>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <RouterLink to="" class="btn btn-primary btn-sm">Button</RouterLink>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol md="4">
      <BCard no-body class="border-primary border-2">
        <BCardBody>
          <BCardTitle as="h5" class="mb-2 text-primary">Card with Double Border</BCardTitle>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <RouterLink to="" class="btn btn-primary btn-sm">Button</RouterLink>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol md="4">
      <BCard no-body class="card-bordered">
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Card with Start Border</BCardTitle>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <RouterLink to="" class="btn btn-dark btn-sm">Button</RouterLink>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol md="4">
      <BCard no-body class="border-primary card-bordered">
        <BCardBody>
          <BCardTitle as="h5" class="mb-2 text-primary">Card with Colored Border</BCardTitle>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <RouterLink to="" class="btn btn-primary btn-sm">Button</RouterLink>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol md="4">
      <BCard no-body class="border-info card-bordered">
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Card with Colored Border</BCardTitle>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <RouterLink to="" class="btn btn-info btn-sm">Button</RouterLink>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xs="12">
      <h4 class="mb-4 mt-3">Horizontal Card</h4>
    </BCol>
  </BRow>

  <BRow>
    <BCol lg="6">
      <BCard no-body>
        <BRow class="g-0 align-items-center">
          <BCol md="4">
            <img src="/images/stock/small-1.jpg" class="img-fluid rounded-start" alt="..." />
          </BCol>
          <BCol md="8">
            <BCardBody>
              <BCardTitle as="h5" class="mb-3">Card with Horizontal Mode</BCardTitle>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </BCardBody>
          </BCol>
        </BRow>
      </BCard>
    </BCol>

    <BCol lg="6">
      <BCard no-body>
        <BRow class="g-0 align-items-center">
          <BCol md="8">
            <BCardBody>
              <BCardTitle as="h5" class="mb-3">Card with Horizontal Mode</BCardTitle>
              <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
              <p class="card-text">
                <small class="text-muted">Last updated 3 mins ago</small>
              </p>
            </BCardBody>
          </BCol>

          <BCol md="4">
            <img src="/images/stock/small-2.jpg" class="img-fluid rounded-end" alt="..." />
          </BCol>
        </BRow>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xs="12">
      <h4 class="mb-4 mt-3">Stretched Link</h4>
    </BCol>
  </BRow>

  <BRow>
    <BCol sm="6" lg="3">
      <BCard no-body>
        <img src="/images/stock/small-3.jpg" class="card-img-top" alt="..." />
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Card with stretched link</BCardTitle>
          <RouterLink to="" class="btn btn-primary mt-2 stretched-link">Go somewhere</RouterLink>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol sm="6" lg="3">
      <BCard no-body>
        <img src="/images/stock/small-4.jpg" class="card-img-top" alt="..." />
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">
            <RouterLink to="" class="text-primary stretched-link">Card with stretched link</RouterLink>
          </BCardTitle>
          <p class="card-text">Some quick example text to build on the card up the bulk of the card's content.</p>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol sm="6" lg="3">
      <BCard no-body>
        <img src="/images/stock/small-5.jpg" class="card-img-top" alt="..." />
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Card with stretched link</BCardTitle>
          <RouterLink to="" class="btn btn-primary mt-2 stretched-link">Go somewhere</RouterLink>
        </BCardBody>
      </BCard>
    </BCol>

    <BCol sm="6" lg="3">
      <BCard no-body>
        <img src="/images/stock/small-6.jpg" class="card-img-top" alt="..." />
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">
            <RouterLink to="" class="text-primary stretched-link">Card with stretched link</RouterLink>
          </BCardTitle>
          <p class="card-text">Some quick example text to build on the card up the bulk of the card's content.</p>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>

  <BRow>
    <BCol xs="12">
      <h4 class="mb-4 mt-3">Card Group</h4>
    </BCol>
  </BRow>

  <BRow>
    <BCol xs="12">
      <BCardGroup class="mb-3">
        <BCard v-for="i in 3" :key="i" no-body>
          <img :src="`/images/stock/small-${7 + i}.jpg`" class="card-img-top" />
          <BCardBody>
            <BCardTitle as="h5" class="mb-2">Card title</BCardTitle>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
          </BCardBody>
        </BCard>
      </BCardGroup>
    </BCol>
  </BRow>

  <BCardGroup>
    <BCard v-for="i in 3" :key="i" no-body>
      <BCardBody>
        <BCardTitle class="mb-2">Card title</BCardTitle>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      </BCardBody>
      <template #footer>
        <small class="text-body-secondary">Last updated 3 mins ago</small>
      </template>
    </BCard>
  </BCardGroup>

  <BRow>
    <BCol xs="12">
      <h4 class="my-4">Navigation with Card</h4>
    </BCol>
  </BRow>

  <BRow>
    <BCol xl="6">
      <BCard no-body class="text-center">
        <template #header>
          <BNav tabs card-header>
            <BNavItem active>Active</BNavItem>
            <BNavItem>Link</BNavItem>
            <BNavItem disabled>Disabled</BNavItem>
          </BNav>
        </template>
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Special title treatment</BCardTitle>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <BButton variant="primary">Go somewhere</BButton>
        </BCardBody>
      </BCard>
    </BCol>
    <BCol xl="6">
      <BCard no-body class="text-center" b>
        <template #header>
          <BNav pills card-header>
            <BNavItem active>Active</BNavItem>
            <BNavItem>Link</BNavItem>
            <BNavItem disabled>Disabled</BNavItem>
          </BNav>
        </template>
        <BCardBody>
          <BCardTitle as="h5" class="mb-2">Special title treatment</BCardTitle>
          <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
          <BButton variant="primary">Go somewhere</BButton>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
