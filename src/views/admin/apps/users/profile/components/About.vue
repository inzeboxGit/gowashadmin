<template>
  <p>I'm an Admin Template Author dedicated to building clean, efficient, and highly customizable dashboards for developers and businesses. My goal is to create UI solutions that are modern, scalable, and easy to integrate.</p>

  <p>
    I specialize in crafting developer-friendly admin panels and UI kits using frameworks like Bootstrap, Tailwind CSS, React, Vue, Angular, Laravel, and Next.js. My templates are designed to accelerate development and provide a strong foundation for web apps, SaaS platforms, and
    enterprise tools.
  </p>

  <p class="mb-0">
    I focus on delivering well-structured, pixel-perfect layouts with a user-centric approach—ensuring responsive design, clean code, and seamless user experiences. Whether you're building a CRM, analytics dashboard, or backend system, my templates are made to help you build
    faster and smarter.
  </p>
  <h4 class="card-title my-3 text-uppercase fs-sm">
    <Icon icon="briefcase" />
    Professional Experience:
  </h4>

  <div class="timeline">
    <div v-for="(item, idx) in timelineData" :key="idx" class="timeline-item d-flex align-items-stretch">
      <div class="timeline-time pe-3 text-muted">
        {{ item.yearRange }}
      </div>

      <div :class="['timeline-dot', item.bulletClassName]"></div>

      <div :class="['timeline-content ps-3', { 'pb-4': idx != timelineData.length - 1 }]">
        <h5 class="mb-1">{{ item.title }}</h5>
        <p class="mb-1 text-muted">{{ item.description }}</p>
        <span class="text-muted fw-semibold">at {{ item.company }}</span>
      </div>
    </div>
  </div>

  <h4 class="card-title my-3 text-uppercase fs-sm">
    <Icon icon="list-check" />
    Tasks Overview:
  </h4>

  <div class="table-responsive">
    <table class="table table-centered table-custom table-sm table-nowrap table-hover mb-0">
      <thead class="bg-light bg-opacity-25 thead-sm">
        <tr class="text-uppercase fs-xxs">
          <th>Task</th>
          <th>Status</th>
          <th>Assigned By</th>
          <th>Start Date</th>
          <th>Priority</th>
          <th>Progress</th>
          <th>Total Time Spent</th>
          <th style="width: 30px"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, idx) in taskData" :key="idx">
          <td>
            <h5 class="fs-sm my-1">
              <RouterLink to="" class="text-body">
                {{ task.title }}
              </RouterLink>
            </h5>
            <span class="text-muted fs-xs">{{ task.due }}</span>
          </td>

          <td>
            <span :class="['badge', task.status === 'in-progress' ? 'badge-soft-warning' : task.status === 'outdated' ? 'badge-soft-danger' : task.status === 'on-hold' ? 'badge-soft-dark' : task.status === 'completed' ? 'badge-soft-success' : 'badge-soft-danger']">
              {{ toPascalCase(task.status) }}
            </span>
          </td>

          <td>
            <div class="d-flex align-items-center gap-2">
              <div class="avatar avatar-sm">
                <img :src="task.user.image" :alt="task.user.name" class="img-fluid rounded-circle" />
              </div>
              <div>
                <h5 class="text-nowrap fs-sm mb-0">{{ task.user.name }}</h5>
                <p class="text-muted fs-xs mb-0">{{ task.user.email }}</p>
              </div>
            </div>
          </td>

          <td>{{ task.startDate }}</td>

          <td>
            <span :class="['badge', task.priority === 'high' ? 'badge-soft-danger' : task.priority === 'medium' ? 'badge-soft-primary' : 'badge-soft-success']">
              {{ task.priority }}
            </span>
          </td>

          <td>{{ task.progress }}</td>
          <td>{{ task.time }}</td>

          <td>
            <RouterLink to="" class="text-muted fs-xxl">
              <Icon icon="square-pen" class="align-middle" />
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import Icon from '~/components/wrappers/Icon.vue'
import { toPascalCase } from '~/utils/helpers'
import { taskData, timelineData } from './data'
</script>

<style scoped></style>
