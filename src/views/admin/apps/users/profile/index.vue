<template>
  <PageBreadcrumb title="Profile" subtitle="Users" />

  <BRow>
    <BCol xs="12">
      <BCard no-body class="overflow-hidden mb-0">
        <div class="position-relative card-side-img overflow-hidden" :style="{ minHeight: '300px', backgroundImage: `url('/images/profile-bg.jpg')` }">
          <div class="p-4 card-img-overlay rounded-start-0 auth-overlay d-flex align-items-center flex-column justify-content-center">
            <h3 class="text-white mb-1 fst-italic">"Crafting innovation through clean design"</h3>
            <p class="text-white mb-4">– MyStatus</p>
          </div>
        </div>
      </BCard>
    </BCol>
  </BRow>

  <div class="px-3 mt-n4">
    <BRow>
      <BCol xl="4">
        <ProfileCard />
      </BCol>

      <BCol xl="8">
        <BCard no-body>
          <BCardHeader class="card-tabs">
            <div class="flex-grow-1">
              <h4 class="card-title">My Account</h4>
            </div>
            
              <div class="overflow-hidden">
                <BTabs title="My Account" justified content-class="pt-3" nav-item-class=" py-1" nav-class="nav-bordered">
                  <BTab>
                    <template #title>
                      <Icon icon="circle-user-round" class="d-md-none d-block fs-lg" />
                      <span class="d-none d-md-block fw-bold">About Me</span>
                    </template>
                    <About />
                  </BTab>
                  <BTab>
                    <template #title>
                      <Icon icon="clock" class="d-md-none d-block fs-lg" />
                      <span class="d-none d-md-block fw-bold">Timeline</span>
                    </template>
                    <Timeline />
                  </BTab>
                  <BTab>
                    <template #title>
                      <Icon icon="settings" class="d-md-none d-block fs-lg"></Icon>
                      <span class="d-none d-md-block fw-bold">Settings</span>
                    </template>
                    <Settings />
                  </BTab>
                </BTabs>
              </div>
            
          </BCardHeader>
        </BCard>
      </BCol>
    </BRow>
  </div>
</template>

<script setup lang="ts">
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
import About from './components/About.vue'
import ProfileCard from './components/ProfileCard.vue'
import Settings from './components/Settings.vue'
import Timeline from './components/Timeline.vue'
</script>

<style scoped></style>
