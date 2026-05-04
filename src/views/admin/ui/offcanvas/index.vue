<template>
  <PageBreadcrumb title="Offcanvas" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Offcanvas" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <RouterLink class="btn btn-primary" to="#" role="button" @click="defaultOffcanvas = !defaultOffcanvas"> Link with href </RouterLink>
          <BButton variant="primary" type="button" @click="defaultOffcanvas = !defaultOffcanvas"> Button with data-bs-target </BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Offcanvas Backdrop" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton variant="primary" class="mt-2 mt-md-0" type="button" @click="offcanvasScrolling = !offcanvasScrolling">Enable body scrolling</BButton>
          <BButton variant="primary" class="mt-2 mt-md-0" type="button" @click="offcanvasBackdrop = !offcanvasBackdrop">Enable backdrop (default)</BButton>
          <BButton variant="primary" class="mt-2 mt-md-0" type="button" @click="offcanvasScrollingBackdrop = !offcanvasScrollingBackdrop">Enable both scrolling & backdrop</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Offcanvas Placement" isTogglable>
        <div>
          <div class="d-flex flex-wrap gap-2">
            <BButton variant="primary" class="mt-2 mt-md-0" type="button" @click="offcanvasTop = !offcanvasTop">Toggle Top offcanvas</BButton>
            <BButton variant="primary" class="mt-2 mt-md-0" type="button" @click="offcanvasStart = !offcanvasStart">Toggle right offcanvas</BButton>
            <BButton variant="primary" class="mt-2 mt-md-0" type="button" @click="offcanvasBottom = !offcanvasBottom">Toggle bottom offcanvas</BButton>
            <BButton variant="primary" class="mt-2 mt-lg-0" type="button" @click="offcanvasEnd = !offcanvasEnd">Toggle Left offcanvas</BButton>
          </div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Dark Placement" isTogglable>
        <BButton variant="primary" class="mt-2 mt-md-0" type="button" @click="offcanvasDark = !offcanvasDark">Dark offcanvas</BButton>
      </CardWithAction>
    </BCol>
  </BRow>

  
    <BOffcanvas v-model="defaultOffcanvas" placement="start" id="offcanvasExample">
      <template #title>
        <h5 id="offcanvasExampleLabel">Offcanvas</h5>
      </template>
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <h5 class="mt-3">List</h5>
      <ul class="ps-3">
        <li>Nemo enim ipsam voluptatem quia aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem</li>
        <li>Quis autem vel eum iure qui in ea</li>
      </ul>

      <ul class="ps-3">
        <li>At vero eos et accusamus et iusto odio dignissimos</li>
        <li>Et harum quidem rerum facilis</li>
        <li>Temporibus autem quibusdam et aut officiis</li>
      </ul>
    </BOffcanvas>
  

  <!-- Offcanvas Placement Top -->
  
    <BOffcanvas v-model="offcanvasTop" placement="top" id="offcanvasExample">
      <template #title>
        <h5 id="offcanvasExampleLabel">Offcanvas Top</h5>
      </template>
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <h5 class="mt-3">List</h5>
      <ul class="ps-3">
        <li>Nemo enim ipsam voluptatem quia aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem</li>
        <li>Quis autem vel eum iure qui in ea</li>
      </ul>
    </BOffcanvas>
  

  <!-- Offcanvas Placement Right -->
  
    <BOffcanvas v-model="offcanvasStart" placement="end" id="offcanvasExample">
      <template #title>
        <h5 id="offcanvasExampleLabel">Offcanvas right</h5>
      </template>
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <h5 class="mt-3">List</h5>
      <ul class="ps-3">
        <li>Nemo enim ipsam voluptatem quia aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem</li>
        <li>Quis autem vel eum iure qui in ea</li>
      </ul>
    </BOffcanvas>
  

  <!-- Offcanvas Placement Bottom -->
  
    <BOffcanvas v-model="offcanvasBottom" placement="bottom" id="offcanvasExample">
      <template #title>
        <h5 id="offcanvasExampleLabel">Offcanvas bottom</h5>
      </template>
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <h5 class="mt-3">List</h5>
      <ul class="ps-3">
        <li>Nemo enim ipsam voluptatem quia aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem</li>
        <li>Quis autem vel eum iure qui in ea</li>
      </ul>
    </BOffcanvas>
  

  <!-- Offcanvas Placement Left -->
  
    <BOffcanvas v-model="offcanvasEnd" placement="start" id="offcanvasExample">
      <template #title>
        <h5 id="offcanvasExampleLabel">Offcanvas Left</h5>
      </template>
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <h5 class="mt-3">List</h5>
      <ul class="ps-3">
        <li>Nemo enim ipsam voluptatem quia aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem</li>
        <li>Quis autem vel eum iure qui in ea</li>
      </ul>
    </BOffcanvas>
  

  <!-- Offcanvas Placement Scrolling -->
  
    <BOffcanvas v-model="offcanvasScrolling" placement="start" id="offcanvasExample" :backdrop="false" :bodyScrolling="true">
      <template #title>
        <h5 id="offcanvasExampleLabel">Colored with scrolling</h5>
      </template>
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <h5 class="mt-3">List</h5>
      <ul class="ps-3">
        <li>Nemo enim ipsam voluptatem quia aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem</li>
        <li>Quis autem vel eum iure qui in ea</li>
      </ul>

      <ul class="ps-3">
        <li>At vero eos et accusamus et iusto odio dignissimos</li>
        <li>Et harum quidem rerum facilis</li>
        <li>Temporibus autem quibusdam et aut officiis</li>
      </ul>
    </BOffcanvas>
  

  <!-- Offcanvas Placement Backdrop -->
  
    <BOffcanvas v-model="offcanvasBackdrop" placement="start" id="offcanvasExample">
      <template #title>
        <h5 id="offcanvasExampleLabel">Offcanvas with backdrop</h5>
      </template>
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <h5 class="mt-3">List</h5>
      <ul class="ps-3">
        <li>Nemo enim ipsam voluptatem quia aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem</li>
        <li>Quis autem vel eum iure qui in ea</li>
      </ul>

      <ul class="ps-3">
        <li>At vero eos et accusamus et iusto odio dignissimos</li>
        <li>Et harum quidem rerum facilis</li>
        <li>Temporibus autem quibusdam et aut officiis</li>
      </ul>
    </BOffcanvas>
  

  <!-- Offcanvas Placement Scrolling & Backdrop -->
  
    <BOffcanvas v-model="offcanvasScrollingBackdrop" placement="start" id="offcanvasExample" :bodyScrolling="true">
      <template #title>
        <h5 id="offcanvasExampleLabel">Backdroped with scrolling</h5>
      </template>
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <h5 class="mt-3">List</h5>
      <ul class="ps-3">
        <li>Nemo enim ipsam voluptatem quia aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem</li>
        <li>Quis autem vel eum iure qui in ea</li>
      </ul>

      <ul class="ps-3">
        <li>At vero eos et accusamus et iusto odio dignissimos</li>
        <li>Et harum quidem rerum facilis</li>
        <li>Temporibus autem quibusdam et aut officiis</li>
      </ul>
    </BOffcanvas>
  

  <!-- Offcanvas Placement Dark -->
  
    <BOffcanvas class="text-bg-dark" v-model="offcanvasDark" placement="start" id="offcanvasDark" header-close-class="btn-close-white">
      <template #title>
        <h5 id="offcanvasExampleLabel">Dark Offcanvas</h5>
      </template>
      <div>Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.</div>
      <h5 class="mt-3">List</h5>
      <ul class="ps-3">
        <li>Nemo enim ipsam voluptatem quia aspernatur</li>
        <li>Neque porro quisquam est, qui dolorem</li>
        <li>Quis autem vel eum iure qui in ea</li>
      </ul>
    </BOffcanvas>
  
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { ref } from 'vue'
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
const defaultOffcanvas = ref(false)
const offcanvasEnd = ref(false)
const offcanvasStart = ref(false)
const offcanvasTop = ref(false)
const offcanvasBottom = ref(false)
const offcanvasDark = ref(false)

const offcanvasScrolling = ref(false)
const offcanvasBackdrop = ref(false)
const offcanvasScrollingBackdrop = ref(false)

</script>
