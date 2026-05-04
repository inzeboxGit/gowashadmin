<template>
  <PageBreadcrumb title="Videos" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Responsive embed video 21:9" isTogglable>
        <div class="ratio ratio-21x9">
          <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe>
        </div>
      </CardWithAction>

      <CardWithAction title="Responsive embed video 1:1" isTogglable>
        <div class="ratio ratio-1x1">
          <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Responsive embed video 16:9" isTogglable>
        <div class="ratio ratio-16x9">
          <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe>
        </div>
      </CardWithAction>

      <CardWithAction title="Responsive embed video 4:3" isTogglable>
        <div class="ratio ratio-4x3">
          <iframe src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0"></iframe>
        </div>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
