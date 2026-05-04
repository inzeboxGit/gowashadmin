<template>
  <div class="bg-body-secondary">
    <Navbar />
    <Hero />
    <Services />
    <Features />
    <PricingPlans />
    <CTA />
    <Testimonials />
    <Contact />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import Contact from './components/Contact.vue'
import CTA from './components/CTA.vue'
import Features from './components/Features.vue'
import Footer from './components/Footer.vue'
import Hero from './components/Hero.vue'
import Navbar from './components/Navbar.vue'
import PricingPlans from './components/PricingPlans.vue'
import Services from './components/Services.vue'
import Testimonials from './components/Testimonials.vue'

</script>

<style scoped></style>
