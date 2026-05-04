<template>
  <PageBreadcrumb title="Pagination" subtitle="UI" />
  <BRow>
    <BCol xl="6">
      <CardWithAction title="Default Pagination" isTogglable>
        <nav aria-label="Page navigation example">
          <ul class="pagination mb-0">
            <li class="page-item">
              <RouterLink class="page-link" to="#">Previous</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="#">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="#">2</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="#">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="#">Next</RouterLink>
            </li>
          </ul>
        </nav>
      </CardWithAction>

      <CardWithAction title="Alignment" isTogglable>
        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-center">
            <li class="page-item disabled">
              <RouterLink class="page-link" to="" tabindex="-1">Previous</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">Next</RouterLink>
            </li>
          </ul>
        </nav>

        <nav aria-label="Page navigation example">
          <ul class="pagination justify-content-end">
            <li class="page-item disabled">
              <RouterLink class="page-link" to="" tabindex="-1">Previous</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">Next</RouterLink>
            </li>
          </ul>
        </nav>
      </CardWithAction>

      <CardWithAction title="Custom Color Pagination" isTogglable>
        <nav>
          <ul class="pagination pagination-boxed pagination-info">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <Icon icon="chevron-left" class="align-middle fs-lg" />
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item active">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">4</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">5</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <Icon icon="chevron-right" class="align-middle fs-lg" />
              </RouterLink>
            </li>
          </ul>
        </nav>

        <nav>
          <ul class="pagination pagination-boxed pagination-secondary mb-0">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <Icon icon="arrow-left" class="align-middle fs-lg" />
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item active">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">4</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">5</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <Icon icon="arrow-right" class="align-middle fs-lg" />
              </RouterLink>
            </li>
          </ul>
        </nav>
      </CardWithAction>

      <CardWithAction title="Disabled and active states" isTogglable>
        <nav aria-label="...">
          <ul class="pagination mb-0">
            <li class="page-item disabled">
              <RouterLink class="page-link" to="#" tabindex="-1">Previous</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="#">1</RouterLink>
            </li>
            <li class="page-item active" aria-current="page">
              <RouterLink class="page-link" to="#">2</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="#">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="#">Next</RouterLink>
            </li>
          </ul>
        </nav>
      </CardWithAction>

      <CardWithAction title="Custom Icon Pagination" isTogglable>
        <nav>
          <ul class="pagination pagination-boxed">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <Icon icon="chevron-left" class="align-middle fs-lg" />
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item active">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">4</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">5</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <Icon icon="chevron-right" class="align-middle fs-lg" />
              </RouterLink>
            </li>
          </ul>
        </nav>

        <nav>
          <ul class="pagination pagination-boxed mb-0">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <Icon icon="arrow-left" class="align-middle fs-lg" />
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item active">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">4</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">5</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <Icon icon="arrow-right" class="align-middle fs-lg" />
              </RouterLink>
            </li>
          </ul>
        </nav>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Sizing" isTogglable>
        <nav>
          <ul class="pagination pagination-lg">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </RouterLink>
            </li>
          </ul>
        </nav>

        <nav>
          <ul class="pagination pagination-sm mb-0">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </CardWithAction>

      <CardWithAction title="Boxed Pagination" isTogglable>
        <nav>
          <ul class="pagination pagination-boxed">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item active">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">4</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">5</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </RouterLink>
            </li>
          </ul>

          <ul class="pagination pagination-lg pagination-boxed">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item active">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">4</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">5</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </RouterLink>
            </li>
          </ul>

          <ul class="pagination pagination-sm pagination-boxed mb-0">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item active">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">4</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">5</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </CardWithAction>

      <CardWithAction title="Rounded Pagination" isTogglable>
        <nav>
          <ul class="pagination pagination-rounded pagination-boxed mb-0">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item active">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">4</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">5</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </CardWithAction>

      <CardWithAction title="Soft Pagination" isTogglable>
        <nav>
          <ul class="pagination pagination-soft-danger pagination-boxed mb-0">
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Previous">
                <Icon icon="chevron-left" class="align-middle fs-lg" />
              </RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">1</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">2</RouterLink>
            </li>
            <li class="page-item active">
              <RouterLink class="page-link" to="">3</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">4</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="">5</RouterLink>
            </li>
            <li class="page-item">
              <RouterLink class="page-link" to="" aria-label="Next">
                <Icon icon="chevron-right" class="align-middle fs-lg" />
              </RouterLink>
            </li>
          </ul>
        </nav>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCol, BRow } from 'bootstrap-vue-next'
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
</script>
