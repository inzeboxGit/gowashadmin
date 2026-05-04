<template>
  <section class="section-custom bg-light bg-opacity-30 border-top border-light border-bottom" id="features">
    <BContainer>
      <BRow>
        <BCol cols="12" class="text-center">
          <span class="text-muted rounded-3 d-inline-block">🚀 Designed for Performance & Scalability</span>
          <h2 class="mt-3 fw-bold mb-5">Discover the Core <span class="text-primary">Features</span> of UBold</h2>
        </BCol>
      </BRow>

      <BRow class="align-items-center pb-5">
        <BCol lg="6" xl="5" class="py-3">
          <div class="text-center">
            <img src="https://illustrations.popsy.co/violet/paper-plane.svg" class="rounded-3 img-fluid" alt="saas-img" />
            <small class="fst-italic">Image by: <RouterLink to="https://popsy.co/illustrations" target="_blank">Popsy.co</RouterLink></small>
          </div>
        </BCol>

        <BCol lg="5" class="ms-auto py-3">
          <h3 class="mb-3 fs-xl lh-base">Powering Smart Admin Experiences with UBold</h3>
          <p class="mb-2 lead">UBold is a feature-rich, high-performance admin dashboard template built for modern web applications and enterprise-grade interfaces.</p>
          <p class="text-muted fs-sm mb-4">Streamline your workflow, monitor key metrics, and manage data seamlessly with intuitive UI and powerful components.</p>
          <RouterLink to="#!" class="btn btn-primary mb-4">Launch Dashboard</RouterLink>

          <div class="d-flex flex-wrap justify-content-between gap-4 mt-4">
            <div v-for="(item, idx) in stats1" :key="idx">
              <h3 class="mb-2 d-inline-flex">
                
                  <CountUp
                    :endVal="item.value"
                    :options="{
                      duration: 2,
                      decimalPlaces: 1,
                      enableScrollSpy: true,
                      scrollSpyOnce: true,
                    }"
                  />
                
                <span class="text-primary">{{ item.suffix }}</span>
              </h3>
              <p class="text-muted mb-0">{{ item.label }}</p>
            </div>
          </div>
        </BCol>
      </BRow>

      <BRow class="align-items-center">
        <BCol lg="5" class="py-3 order-2 order-lg-1">
          <h2 class="mb-3 fs-xl lh-base">Control Everything from One Unified Dashboard</h2>
          <p class="mb-2 lead">UBold empowers admins with a smart, responsive interface to manage users, analytics, content, and workflows effortlessly.</p>
          <p class="text-muted fs-sm mb-4">Track performance, automate tasks, and make data-driven decisions — all from a secure and scalable admin panel.</p>
          <RouterLink to="/" class="btn btn-primary mb-4">Explore UBold Admin</RouterLink>

          <div class="d-flex flex-wrap gap-4 mt-4">
            <div v-for="(item, idx) in stats2" :key="idx">
              <h3 class="mb-2 d-inline-flex">
                
                  <CountUp
                    :endVal="item.value"
                    :options="{
                      duration: 2,
                      decimalPlaces: 1,
                      enableScrollSpy: true,
                      scrollSpyOnce: true,
                    }"
                  />
                
                <span class="text-primary">{{ item.suffix }}</span>
              </h3>
              <p class="text-muted mb-0">{{ item.label }}</p>
            </div>
          </div>
        </BCol>

        <BCol lg="6" xl="5" class="ms-auto py-3 order-1 order-lg-2">
          <div class="text-center">
            <img src="https://illustrations.popsy.co/violet/success.svg" class="rounded-3 img-fluid" alt="saas-img" />
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCol, BContainer, BRow } from 'bootstrap-vue-next'
import CountUp from 'vue-countup-v3'

const stats1 = [
  { value: 98.6, suffix: '%', label: 'Customer satisfaction' },
  { value: 10.2, suffix: 'x', label: 'Productivity boost' },
  { value: 3500, suffix: '+', label: 'Businesses using UBold' },
]
const stats2 = [
  { value: 97.8, suffix: '%', label: 'Task automation efficiency' },
  { value: 4.5, suffix: 'x', label: 'Faster admin operations' },
]
</script>
