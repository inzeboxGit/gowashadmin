<template>
  <PageBreadcrumb title="List Group" subtitle="UI" />
  <BRow>
    <BCol xl="4">
      <CardWithAction title="Basic Example" isTogglable>
        <ul class="list-group">
          <li class="list-group-item">Dropbox Cloud Storage</li>
          <li class="list-group-item">Slack Team Collaboration</li>
          <li class="list-group-item">Microsoft Windows OS</li>
          <li class="list-group-item">Zendesk Customer Support</li>
          <li class="list-group-item">Stripe Payment Integration</li>
        </ul>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Active Items" isTogglable>
        <ul class="list-group">
          <li class="list-group-item active">GitHub Repository</li>
          <li class="list-group-item">Figma Design Tool</li>
          <li class="list-group-item">Notion Workspace</li>
          <li class="list-group-item">Trello Task Manager</li>
          <li class="list-group-item">DigitalOcean Cloud</li>
        </ul>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Disabled Items" isTogglable>
        <ul class="list-group">
          <li class="list-group-item disabled" aria-disabled="true">Dropbox Cloud Storage</li>
          <li class="list-group-item">Slack Team Collaboration</li>
          <li class="list-group-item">Microsoft Windows OS</li>
          <li class="list-group-item">Zendesk Customer Support</li>
          <li class="list-group-item">Stripe Payment Integration</li>
        </ul>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Links and Buttons" isTogglable>
        <div class="list-group">
          <RouterLink to="#" class="list-group-item list-group-item-action active">Stripe Payment Integration</RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action">Dropbox Cloud Service</RouterLink>
          <button type="button" class="list-group-item list-group-item-action">Slack Communication</button>
          <button type="button" class="list-group-item list-group-item-action">Notion Productivity App</button>
          <RouterLink to="#" class="list-group-item list-group-item-action disabled" tabindex="-1">Zendesk Support Tool</RouterLink>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Flush" isTogglable>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Slack Collaboration Tool</li>
          <li class="list-group-item">Dropbox Cloud Storage</li>
          <li class="list-group-item">Notion Workspace Organizer</li>
          <li class="list-group-item">Zendesk Customer Support</li>
          <li class="list-group-item">Stripe Payment Processor</li>
        </ul>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Horizontal" isTogglable>
        <ul class="list-group list-group-horizontal mb-3">
          <li class="list-group-item">Slack</li>
          <li class="list-group-item">Notion</li>
          <li class="list-group-item">Dropbox</li>
        </ul>

        <ul class="list-group list-group-horizontal-sm mb-3">
          <li class="list-group-item">Figma</li>
          <li class="list-group-item">Stripe</li>
          <li class="list-group-item">Zendesk</li>
        </ul>

        <ul class="list-group list-group-horizontal-md">
          <li class="list-group-item">Trello</li>
          <li class="list-group-item">Asana</li>
          <li class="list-group-item">ClickUp</li>
        </ul>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Contextual Classes" isTogglable>
        <ul class="list-group">
          <li class="list-group-item">Dapibus ac facilisis in</li>
          <li class="list-group-item list-group-item-primary">A simple primary list group item</li>
          <li class="list-group-item list-group-item-secondary">A simple secondary list group item</li>
          <li class="list-group-item list-group-item-success">A simple success list group item</li>
          <li class="list-group-item list-group-item-danger">A simple danger list group item</li>
          <li class="list-group-item list-group-item-warning">A simple warning list group item</li>
          <li class="list-group-item list-group-item-info">A simple info list group item</li>
          <li class="list-group-item list-group-item-light">A simple light list group item</li>
          <li class="list-group-item list-group-item-dark">A simple dark list group item</li>
        </ul>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Contextual Classes with Link" isTogglable>
        <div class="list-group">
          <RouterLink to="#" class="list-group-item list-group-item-action">Darius ac facilities in</RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action list-group-item-primary">A simple primary list group item</RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action list-group-item-secondary">A simple secondary list group item</RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action list-group-item-success">A simple success list group item</RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action list-group-item-danger">A simple danger list group item</RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action list-group-item-warning">A simple warning list group item</RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action list-group-item-info">A simple info list group item</RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action list-group-item-light">A simple light list group item</RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action list-group-item-dark">A simple dark list group item</RouterLink>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Custom Content" isTogglable>
        <div class="list-group">
          <RouterLink to="#" class="list-group-item list-group-item-action active">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-2">List group item heading</h5>
              <small>3 days ago</small>
            </div>
            <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small>Donec id elit non mi porta.</small>
          </RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-2">List group item heading</h5>
              <small class="text-muted">3 days ago</small>
            </div>
            <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small class="text-muted">Donec id elit non mi porta.</small>
          </RouterLink>
          <RouterLink to="#" class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h5 class="mb-2">List group item heading</h5>
              <small class="text-muted">3 days ago</small>
            </div>
            <p class="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small class="text-muted">Donec id elit non mi porta.</small>
          </RouterLink>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="With Badges" isTogglable>
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Gmail Notifications
            <span class="badge bg-primary rounded-pill">14</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Unprocessed Orders
            <span class="badge bg-success rounded-pill">2</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Urgent Tickets
            <span class="badge bg-danger rounded-pill">99+</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Completed Transactions
            <span class="badge bg-success rounded-pill">20+</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center">
            Invoices Awaiting Approval
            <span class="badge bg-warning rounded-pill">12</span>
          </li>
        </ul>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Checkboxes and Radios" isTogglable>
        <ul class="list-group">
          <li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="" id="newsletterCheckbox" />
            <label class="form-check-label" for="newsletterCheckbox">Subscribe to newsletter</label>
          </li>
          <li class="list-group-item">
            <input class="form-check-input me-1" type="checkbox" value="" id="termsCheckbox" />
            <label class="form-check-label" for="termsCheckbox">Accept terms and conditions</label>
          </li>
        </ul>

        <ul class="list-group mt-2">
          <li class="list-group-item">
            <input class="form-check-input me-1" type="radio" name="notificationOptions" value="" id="emailRadio" checked />
            <label class="form-check-label" for="emailRadio">Notify by Email</label>
          </li>
          <li class="list-group-item">
            <input class="form-check-input me-1" type="radio" name="notificationOptions" value="" id="smsRadio" />
            <label class="form-check-label" for="smsRadio">Notify by SMS</label>
          </li>
        </ul>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Numbered" isTogglable>
        <ol class="list-group list-group-numbered">
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Admin Dashboard Pro</div>
              A premium admin dashboard with modern UI components.
            </div>
            <span class="badge bg-primary rounded-pill">865</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Vue Admin Lite</div>
              Clean and minimal admin panel built with Vue.js.
            </div>
            <span class="badge bg-primary rounded-pill">140</span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
              <div class="fw-bold">Angular Admin Panel</div>
              Lightweight and powerful Angular-based admin template.
            </div>
            <span class="badge bg-primary rounded-pill">85</span>
          </li>
        </ol>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
