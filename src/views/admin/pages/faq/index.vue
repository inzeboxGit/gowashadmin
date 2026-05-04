<template>
  <PageBreadcrumb title="FAQs" subtitle="Pages" />

  <BRow class="justify-content-center">
    <BCol xxl="10">
      <BRow class="justify-content-center mb-5">
        <BCol lg="6" md="8">
          <div class="text-center">
            <div class="mb-3">
              <Icon icon="badge-question-mark" class="fs-1 text-primary" />
            </div>
            <h3 class="fw-semibold mb-2">Need Help with Something?</h3>
            <p class="text-muted mb-4">
              We're here to assist you with any technical questions, account issues, or feedback.
              <br />
              Reach out to our support team — we’ll get back to you as soon as possible!
            </p>
            <div class="d-flex justify-content-center gap-2 flex-wrap">
              <RouterLink to="mailto:support@example.com" class="btn btn-success">
                <Icon icon="mail" class="fs-5 me-1" />
                Contact Support
              </RouterLink>
              <RouterLink to="https://twitter.com/intent/tweet?text=Hello+Support" target="_blank" class="btn btn-primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="me-1">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
                  <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
                </svg>
                Tweet to Us
              </RouterLink>
            </div>
          </div>
        </BCol>
      </BRow>

      <BRow>
        <BCol xl="6">
          <BCard no-body>
            <BCardHeader class="d-block">
              <BCardTitle as="h4" class="mb-1">General</BCardTitle>
              <p class="text-muted mb-0">Here are some common questions about our templates.</p>
            </BCardHeader>
            <BCardBody>
              <BAccordion class="accordion-bordered">
                <BAccordionItem v-for="(faq, idx) in generalFaqData" :key="idx" class="border-0" button-class="shadow-none bg-light bg-opacity-50" :title="faq.question">
                  {{ faq.answer }}
                </BAccordionItem>
              </BAccordion>
            </BCardBody>
          </BCard>
        </BCol>

        <BCol xl="6">
          <BCard no-body>
            <BCardHeader class="d-block">
              <BCardTitle as="h4" class="mb-1">Payments</BCardTitle>
              <p class="text-muted mb-0">Here are some common questions related to billing and payment.</p>
            </BCardHeader>
            <BCardBody>
              <BAccordion class="accordion-bordered">
                <BAccordionItem v-for="(faq, idx) in paymentFaqData" :key="idx" class="border-0" button-class="shadow-none bg-light bg-opacity-50" :title="faq.question">
                  {{ faq.answer }}
                </BAccordionItem>
              </BAccordion>
            </BCardBody>
          </BCard>
        </BCol>
      </BRow>

      <BRow>
        <BCol xl="6">
          <BCard no-body>
            <BCardHeader class="d-block">
              <BCardTitle as="h4" class="mb-1">Refunds</BCardTitle>
              <p class="text-muted mb-0">Find answers related to our refund policy and conditions.</p>
            </BCardHeader>
            <BCardBody>
              <BAccordion class="accordion-bordered">
                <BAccordionItem v-for="(faq, idx) in refundFaqData" :key="idx" class="border-0" button-class="shadow-none bg-light bg-opacity-50" :title="faq.question">
                  {{ faq.answer }}
                </BAccordionItem>
              </BAccordion>
            </BCardBody>
          </BCard>
        </BCol>

        <BCol xl="6">
          <BCard no-body>
            <BCardHeader class="d-block">
              <BCardTitle as="h4" class="mb-1">Customization</BCardTitle>
              <p class="text-muted mb-0">Questions about custom development and template modifications.</p>
            </BCardHeader>
            <BCardBody>
              <BAccordion class="accordion-bordered">
                <BAccordionItem v-for="(faq, idx) in customizationFaqData" :key="idx" class="border-0" button-class="shadow-none bg-light bg-opacity-50" :title="faq.question">
                  {{ faq.answer }}
                </BAccordionItem>
              </BAccordion>
            </BCardBody>
          </BCard>
        </BCol>
      </BRow>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BAccordion, BAccordionItem, BCard, BCardBody, BCardHeader, BCardTitle, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import { customizationFaqData, generalFaqData, paymentFaqData, refundFaqData } from './components/data'
</script>
