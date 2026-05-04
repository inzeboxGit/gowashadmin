<template>
  <PageBreadcrumb title="Tooltips" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Basic" isTogglable>
        <p class="mb-0">
          Powerful admin features like <RouterLink to="#" class="fw-medium" v-b-tooltip.focus.top="'Manage your dashboard easily'">custom dashboards</RouterLink> and UI components help you build scalable web applications efficiently. This template includes pre-built pages, clean
          layouts, and reusable code blocks to boost your development workflow. From user management to analytics and settings, everything is modular and developer-friendly. Create modern admin panels with
          <RouterLink to="#" class="fw-medium" v-b-tooltip.focus.top="'Built with Bootstrap 5'">responsive design</RouterLink> and seamless UX. Get started quickly with a professional-grade
          <RouterLink to="#" class="fw-medium" v-b-tooltip.focus.top="'Tailored for developers'">UI toolkit</RouterLink> and supercharge your app with <RouterLink to="#" class="fw-medium" v-b-tooltip.focus.top="'Includes charts, tables, forms and more'">powerful components</RouterLink>
          and flexible layouts.
        </p>
      </CardWithAction>

      <CardWithAction title="Disabled Elements" isTogglable>
        <span class="d-inline-block" v-b-tooltip="'Disabled tooltip'">
          <BButton variant="primary" class="pe-none" type="button" disabled>Disabled Button</BButton>
        </span>
      </CardWithAction>

      <CardWithAction title="Hover Elements" isTogglable>
        <BButton variant="primary" type="button" v-b-tooltip.hover="'Hover Only, Not a Focus'">Hover to See Info</BButton>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Four Directions" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton type="button" variant="info" v-b-tooltip.hover.top="'Tooltip on top'">Tooltip on top</BButton>
          <BButton type="button" variant="info" v-b-tooltip.hover.bottom="'Tooltip on bottom'">Tooltip on bottom</BButton>
          <BButton type="button" variant="info" v-b-tooltip.hover.left="'Tooltip on left'">Tooltip on left</BButton>
          <BButton type="button" variant="info" v-b-tooltip.hover.right="'Tooltip on right'">Tooltip on right</BButton>
        </div>
      </CardWithAction>

      <CardWithAction title="HTML Tags" isTogglable>
        <BTooltip>
          <em>Tooltip</em> <u>with</u> <b>HTML</b><br />
          custom message here!
          <template #target>
            <BButton type="button" variant="secondary"> Tooltip with HTML </BButton>
          </template>
        </BTooltip>
      </CardWithAction>

      <CardWithAction title="Color Tooltips" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BTooltip class="tooltip-primary">
            This is a primary tooltip with a custom style.
            <template #target>
              <BButton variant="primary" type="button"> Primary tooltip </BButton>
            </template>
          </BTooltip>
          <BTooltip class="tooltip-danger">
            This is a danger tooltip with a custom warning message.
            <template #target>
              <BButton variant="danger" type="button"> Danger tooltip </BButton>
            </template>
          </BTooltip>

          <BTooltip class="tooltip-info">
            This is an info tooltip that provides extra details.
            <template #target>
              <BButton variant="info" type="button"> Info tooltip </BButton>
            </template>
          </BTooltip>

          <BTooltip class="tooltip-success">
            This is a success tooltip to indicate completion.
            <template #target>
              <BButton variant="success" type="button"> Success tooltip </BButton>
            </template>
          </BTooltip>

          <BTooltip class="tooltip-secondary">
            This is a secondary tooltip to indicate completion.
            <template #target>
              <BButton variant="secondary" type="button"> Secondary tooltip </BButton>
            </template>
          </BTooltip>
          <BTooltip class="tooltip-warning">
            This is a warning tooltip to alert you.
            <template #target>
              <BButton variant="warning" type="button"> Warning tooltip </BButton>
            </template>
          </BTooltip>

          <BTooltip class="tooltip-dark">
            This is a dark tooltip with important information.
            <template #target>
              <BButton variant="dark" type="button"> Dark tooltip </BButton>
            </template>
          </BTooltip>
        </div>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
