<template>
  <PageBreadcrumb title="Collapse" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Collapse" isTogglable>
        <p>
          <RouterLink class="btn btn-primary" v-b-toggle.collapseExample to="#collapseExample" data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseExample"> Link with href </RouterLink>
          <button class="btn btn-primary ms-1" type="button" v-b-toggle.collapseExample data-bs-toggle="collapse" aria-expanded="false" aria-controls="collapseExample">Button with data-bs-target</button>
        </p>
        <BCollapse show id="collapseExample">
          <BCard no-body class="card-body mb-0">Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</BCard>
        </BCollapse>
      </CardWithAction>

      <CardWithAction title="Multiple Targets" isTogglable>
        <p class="d-flex flex-wrap gap-2">
          <button class="btn btn-primary" v-b-toggle.multiCollapseExample1>Toggle first element</button>
          <button class="btn btn-primary" v-b-toggle.multiCollapseExample2>Toggle second element</button>
          <button class="btn btn-primary" v-b-toggle.multiCollapseExample1.multiCollapseExample2>Toggle both elements</button>
        </p>

        <BRow>
          <BCol>
            <BCollapse class="multi-collapse" id="multiCollapseExample1">
              <BCard no-body class="border border-dashed border-light card-body mb-0"
                >Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</BCard
              >
            </BCollapse>
          </BCol>
          <BCol>
            <BCollapse class="multi-collapse" id="multiCollapseExample2">
              <BCard no-body class="border border-dashed border-light card-body mb-0"
                >Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.</BCard
              >
            </BCollapse>
          </BCol>
        </BRow>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Collapse Horizontal" isTogglable>
        <p>
          <button class="btn btn-primary" type="button" v-b-toggle.collapseWidthExample aria-expanded="false" aria-controls="collapseWidthExample">Toggle width collapse</button>
        </p>
        <div style="height: 100px">
          <BCollapse horizontal class="collapse-horizontal" id="collapseWidthExample">
            <BCard no-body class="card-body mb-0" style="width: 300px">This is some placeholder content for a horizontal collapse. It's hidden by default and shown when triggered.</BCard>
          </BCollapse>
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
