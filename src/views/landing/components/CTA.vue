<template>
  <section>
    <div class="section-cta position-relative card-side-img overflow-hidden" style="background-image: url(/images/landing-cta.jpg)">
      <div class="card-img-overlay d-flex align-items-center flex-column gap-3 justify-content-center auth-overlay text-center">
        <h3 class="text-white fs-24 mb-0 fw-bold">Power Your Project with Our Premium Admin Dashboard</h3>
        <p class="text-white text-opacity-75 fs-md">
          Launch faster with a sleek, responsive, and developer-focused admin panel. <br />
          Get started today — free 14-day trial, no credit card required.
        </p>
        <RouterLink to="#!" class="btn btn-light rounded-pill">Get Started Now</RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
</script>
