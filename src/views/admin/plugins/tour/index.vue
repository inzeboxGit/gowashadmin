<template>
  <PageBreadcrumb title="Tour" subtitle="Plugins" />

  <BRow class="justify-content-center">
    <BCol lg="5">
      <div class="text-center mt-4 mb-5">
        <div class="auth-brand text-center mb-4">
          <RouterLink to="" class="logo-dark">
            <img src="/images/logo-black.png" alt="dark logo" height="32" />
          </RouterLink>
          <RouterLink to="" class="logo-light">
            <!-- <img src="/images/logo.png" alt="logo" height="32" /> -->
          </RouterLink>
        </div>

        <h5 class="fs-lg mb-2">Versatile & Scalable Admin Panel Template</h5>
        <p class="text-muted fs-sm">Build modern web applications faster with our feature-rich admin panel. Compatible with multiple frameworks and packed with diverse demos, it offers seamless customization and a consistent UI across all your projects</p>

        <div class="d-flex justify-content-center mt-4 flex-wrap gap-2">
          <button @click="startTour" class="btn btn-primary">
            <Icon icon="play" class="me-1" />
            Start Guided Tour
          </button>

          <RouterLink to="#" class="btn btn-dark" id="exploreFeatures">
            <Icon icon="compass" class="me-1" />
            Discover Features
          </RouterLink>

          <RouterLink to="" target="_blank" class="btn btn-danger" id="buyNow">
            <Icon icon="shopping-cart" class="me-1" />
            Get the Template
          </RouterLink>
        </div>
      </div>
    </BCol>
  </BRow>

  <BContainer>
    <BRow id="coreFeatures">
      <BCol v-for="(item, idx) in features" xl="3" :key="idx">
        <BCard no-body class="border-0 p-2 card-h-100">
          <BCardBody class="pb-0">
            <div class="avatar-xl mb-3">
              <span class="avatar-title text-bg-secondary rounded-circle fs-22">
                <Icon :icon="item.icon" />
              </span>
            </div>
            <h4 class="fw-semibold mb-2">{{ item.title }}</h4>
            <p class="text-muted mb-3">{{ item.description }}</p>
          </BCardBody>
          <BCardFooter class="border-0 pt-0">
            <RouterLink class="link-primary fw-semibold" to=""
              >Know more
              <Icon icon="arrow-right" class="ms-2 align-middle" />
            </RouterLink>
          </BCardFooter>
        </BCard>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { TourGuideClient } from '@sjmc11/tourguidejs/src/Tour'
import { BCard, BCardBody, BCardFooter, BCol, BContainer, BRow } from 'bootstrap-vue-next'
import { nextTick } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { features } from './components/data'

const tourSteps = [
  {
    title: 'Getting Started',
    content: 'Click here to get started and explore our framework-rich admin panel. 🚀',
    target: '#exploreFeatures',
    placement: 'left',
    order: 1,
  },
  {
    title: 'Buy Now',
    content: 'Ready to supercharge your project ? Click here to purchase the template!',
    target: '#buyNow',
    placement: 'left',
    order: 2,
  },
  {
    title: 'Core Features',
    content: 'Learn more about the versatile services and modules we provide to enhance development',
    target: '#coreFeatures',
    placement: 'top',
    order: 3,
  },
]

let tour: TourGuideClient | null = null

function startTour() {
  nextTick(() => {
    if (!tour) {
      tour = new TourGuideClient({
        steps: tourSteps,
        showStepDots: true,
        dialogZ: 1006,
        showButtons: true,
        nextLabel: 'Next',
        prevLabel: 'Back',
        rememberStep: true,
        finishLabel: 'Finish',
      })

      tour.addSteps([
        {
          title: '👋 Welcome to the Dashboard Tour',
          content: '<p class="mb-3">Take a quick tour to explore the key features of our admin dashboard.</p><p>Use your keyboard or click "Next" to continue.</p>',
          order: 0,
        },
        {
          title: "You're All Set!",
          content: `<p class="mb-3">You’re ready to make the most of your admin panel 🎉</p><p class="mb-3 text-muted">Click anywhere outside the tour to exit.</p>`,
          order: 999,
        },
      ])
    } else {
      tour.refresh()
    }

    tour.start()
  })
}
</script>

<style scoped></style>
