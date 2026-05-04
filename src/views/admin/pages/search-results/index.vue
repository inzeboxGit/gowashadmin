<template>
  <PageBreadcrumb title="Search Results" subtitle="Pages" />
  <BRow>
    <BCol cols="12">
      <div class="text-center w-md-75 w-xl-50 mx-auto py-3">
        <div class="app-search app-search-pill input-group mb-3 rounded-pill">
          <BFormInput type="text" class="py-2 fw-semibold" v-model="search" placeholder="Search AI platforms..." />
          <Icon icon="search" class="app-search-icon text-muted" />
          <button class="btn btn-secondary" type="button">Discover</button>
        </div>
        <div class="d-flex justify-content-center align-items-center gap-1">
          <h5 class="text-muted mb-0">Popular Searches :</h5>
          <RouterLink to="" class="badge bg-primary-subtle text-primary rounded-pill px-2 py-1 fs-6">Text Generation</RouterLink>
          <RouterLink to="" class="badge bg-primary-subtle text-primary rounded-pill px-2 py-1 fs-6">Image AI</RouterLink>
          <RouterLink to="" class="badge bg-primary-subtle text-primary rounded-pill px-2 py-1 fs-6">Speech</RouterLink>
          <RouterLink to="" class="badge bg-primary-subtle text-primary rounded-pill px-2 py-1 fs-6">Coding</RouterLink>
        </div>
      </div>
      <BCard no-body>
        <BCardHeader class="border-light justify-content-between">
          <h4 class="fst-italic text-muted mb-0">
            Found
            <span class="fw-bold badge badge-soft-danger">72</span>
            results for
            <span class="text-dark">"AI Content Tools"</span>
          </h4>
          <div class="d-flex flex-wrap align-items-center gap-3">
            <span class="fw-semibold">Filter By:</span>
            <div class="app-search">
              <select class="form-select form-control my-1 my-md-0">
                <option>Tool Type</option>
                <option value="chatbot">Chatbot</option>
                <option value="analytics">Analytics</option>
                <option value="image">Image Generator</option>
                <option value="voice">Voice AI</option>
                <option value="automation">Automation</option>
              </select>
              <Icon icon="cpu" class="app-search-icon text-muted" />
            </div>
            <div class="app-search">
              <select class="form-select form-control my-1 my-md-0">
                <option>Pricing</option>
                <option value="free">Free</option>
                <option value="pro">Pro</option>
                <option value="enterprise">Enterprise</option>
              </select>
              <Icon icon="wallet" class="app-search-icon text-muted" />
            </div>
          </div>
        </BCardHeader>
        <BCardBody class="p-0">
          <div v-for="(item, idx) in searchResultData" :key="idx" class="border-bottom border-dashed px-4 py-3">
            <h4 class="fs-md mb-1">
              <RouterLink to="" target="_blank" class="text-reset">
                {{ item.title }}
              </RouterLink>
            </h4>
            <p class="text-success mb-2">{{ item.href }}</p>
            <p class="text-muted mb-2">{{ item.description }}</p>
            <p class="d-flex flex-wrap gap-3 text-muted mb-1 align-items-center fs-base">
              <span class="d-flex align-items-center gap-1">
                <img :src="item.user.image" height="24" width="24" alt="avatar-4" class="img-fluid avatar-xs rounded-circle" />
                <RouterLink to="" class="link-reset fw-semibold">
                  {{ item.user.name }}
                </RouterLink>
              </span>
              <span class="d-flex align-items-center gap-1">
                <Icon icon="calendar" />
                Published on: {{ item.publishedDate }}
              </span>
              <span class="d-flex align-items-center gap-1">
                <Icon icon="users" />
                Users: {{ item.users }}+
              </span>
              <span class="d-flex align-items-center gap-1">
                <Icon icon="message-circle" />
                <RouterLink to="" class="link-reset"> Feedback: {{ item.feedback }} </RouterLink>
              </span>
              <span class="d-flex align-items-center gap-1">
                <Icon icon="star" />
                Rating: {{ item.rating }}
              </span>
            </p>
          </div>

          <div class="border-bottom border-dashed px-4 py-3">
            <h4 class="fs-md mb-3">Featured AI Creators:</h4>
            <div class="d-flex gap-2">
              <div class="avatar">
                <img src="/images/users/user-4.jpg" alt="" class="rounded avatar-xl" />
              </div>
              <div class="avatar">
                <img src="/images/users/user-5.jpg" alt="" class="rounded avatar-xl" />
              </div>
              <div class="avatar">
                <img src="/images/users/user-3.jpg" alt="" class="rounded avatar-xl" />
              </div>
              <div class="avatar">
                <img src="/images/users/user-8.jpg" alt="" class="rounded avatar-xl" />
              </div>
              <div class="avatar">
                <img src="/images/users/user-2.jpg" alt="" class="rounded avatar-xl" />
              </div>
            </div>
          </div>

          <div class="border-bottom border-dashed px-4 py-3">
            <h4 class="fs-md mb-3">People also search for:</h4>
            <div class="d-flex gap-2 flex-wrap">
              <div class="px-3 py-2 bg-light bg-opacity-50 rounded">
                <RouterLink to="" class="text-reset fs-md fw-semibold">
                  AI SaaS Platforms
                  <Icon icon="search" class="ms-2 align-middle" />
                </RouterLink>
              </div>
              <div class="px-3 py-2 bg-light bg-opacity-50 rounded">
                <RouterLink to="" class="text-reset fs-md fw-semibold">
                  AI Code Generators
                  <Icon icon="search" class="ms-2 align-middle" />
                </RouterLink>
              </div>
              <div class="px-3 py-2 bg-light bg-opacity-50 rounded">
                <RouterLink to="" class="text-reset fs-md fw-semibold">
                  AI Productivity Tools
                  <Icon icon="search" class="ms-2 align-middle" />
                </RouterLink>
              </div>
              <div class="px-3 py-2 bg-light bg-opacity-50 rounded">
                <RouterLink to="" class="text-reset fs-md fw-semibold">
                  AI for Marketing
                  <Icon icon="search" class="ms-2 align-middle" />
                </RouterLink>
              </div>
            </div>
          </div>
          <BPagination v-model="currentPage" :total-rows="42" :per-page="1" class="pagination-rounded pagination-boxed justify-content-center mb-0 py-3" aria-controls="my-table" :no-goto-end-buttons="true">
            <template #prev-text>
              <Icon icon="chevron-left" />
            </template>
            <template #next-text>
              <Icon icon="chevron-right" />
            </template>
          </BPagination>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BCardHeader, BPagination } from 'bootstrap-vue-next'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import user4 from '/images/users/user-4.jpg'
import user5 from '/images/users/user-5.jpg'
import user6 from '/images/users/user-6.jpg'

const currentPage = ref(1)
const search = ref('AI Content Tools')
const searchResultData = [
  {
    title: 'NeuroVision AI – Smart Analytics Dashboard',
    description: 'NeuroVision AI is a powerful analytics platform that uses machine learning to transform raw data into actionable insights, perfect for startups and enterprises.',
    href: 'https://example.com/neurovision-ai',
    user: {
      name: 'Alex Johnson',
      image: user4,
    },
    publishedDate: 'Aug 10, 2025',
    users: 3200,
    feedback: 145,
    rating: 4.9,
  },
  {
    title: 'SynthChat – AI Conversational Assistant',
    description: 'SynthChat is an intelligent chatbot solution designed for customer support and team collaboration, offering natural language understanding and real-time integrations.',
    href: 'https://example.com/synthchat',
    user: {
      name: 'Maria Lopez',
      image: user5,
    },
    publishedDate: 'Jul 28, 2025',
    users: 2450,
    feedback: 89,
    rating: 4.7,
  },
  {
    title: 'VisionaryGen – AI Image Creator',
    description: 'VisionaryGen is a creative AI platform that generates stunning images, graphics, and illustrations from text prompts, helping designers and marketers save time and boost creativity.',
    href: 'https://example.com/visionarygen',
    user: {
      name: 'James Carter',
      image: user6,
    },
    publishedDate: 'Jun 15, 2025',
    users: 1780,
    feedback: 67,
    rating: 4.8,
  },
  {
    title: 'EchoAI – Voice & Speech Recognition',
    description: 'EchoAI offers advanced speech recognition and voice synthesis, enabling businesses to build smart assistants, transcription tools, and voice-enabled applications.',
    href: 'https://example.com/echoai',
    user: {
      name: 'Daniel Kim',
      image: user5,
    },
    publishedDate: 'May 30, 2025',
    users: 1120,
    feedback: 54,
    rating: 4.6,
  },
]
</script>
