<template>
  <PageBreadcrumb title="Utilities" subtitle="UI" />
  <BRow>
    <BCol xl="4">
      <CardWithAction title="Color & Background" isTogglable>
        <div class="d-flex flex-column gap-2">
          <div class="text-bg-primary p-2">Primary with contrasting color (.text-bg-primary)</div>
          <div class="text-bg-secondary p-2">Secondary with contrasting color (.text-bg-secondary)</div>
          <div class="text-bg-success p-2">Success with contrasting color (.text-bg-success)</div>
          <div class="text-bg-danger p-2">Danger with contrasting color (.text-bg-danger)</div>
          <div class="text-bg-warning p-2">Warning with contrasting color (.text-bg-warning)</div>
          <div class="text-bg-info p-2">Info with contrasting color (.text-bg-info)</div>
          <div class="text-bg-light p-2">Light with contrasting color (.text-bg-light)</div>
          <div class="text-bg-dark p-2">Dark with contrasting color (.text-bg-dark)</div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Background Opacity" isTogglable>
        <div class="bg-primary p-2 text-white">This is default primary background</div>
        <div class="bg-primary p-2 text-white bg-opacity-75">This is 75% opacity primary background</div>
        <div class="bg-primary p-2 text-dark bg-opacity-50">This is 50% opacity primary background</div>
        <div class="bg-primary p-2 text-dark bg-opacity-25">This is 25% opacity primary background</div>
        <div class="bg-primary p-2 text-dark bg-opacity-10">This is 10% opacity success background</div>

        <div class="bg-dark p-2 mt-4 text-white">This is default dark background</div>
        <div class="bg-dark p-2 text-white bg-opacity-75">This is 75% opacity dark background</div>
        <div class="bg-dark p-2 text-dark bg-opacity-50">This is 50% opacity dark background</div>
        <div class="bg-dark p-2 text-dark bg-opacity-25">This is 25% opacity dark background</div>
        <div class="bg-dark p-2 text-dark bg-opacity-10">This is 10% opacity success background</div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Text Opacity Color" isTogglable>
        <p class="text-muted">Text color utilities are generated with Sass using CSS variables. This allows for real-time color changes without compilation and dynamic alpha transparency changes.</p>

        <div class="text-primary">This is default primary text</div>
        <div class="text-primary text-opacity-75">This is 75% opacity primary text</div>
        <div class="text-primary text-opacity-50">This is 50% opacity primary text</div>
        <div class="text-primary text-opacity-25">This is 25% opacity primary text</div>
      </CardWithAction>

      <CardWithAction title="Opacity" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <div class="opacity-100 p-2 bg-primary text-light fw-bold rounded">100%</div>
          <div class="opacity-75 p-2 bg-primary text-light fw-bold rounded">75%</div>
          <div class="opacity-50 p-2 bg-primary text-light fw-bold rounded">50%</div>
          <div class="opacity-25 p-2 bg-primary text-light fw-bold rounded">25%</div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Border Radius" isTogglable>
        <p class="text-muted">Add classes to an element to easily round its corners.</p>

        <div class="d-flex align-items-start flex-wrap gap-2">
          <img src="/images/users/user-2.jpg" class="avatar-lg rounded" alt="rounded" />
          <img src="/images/users/user-2.jpg" class="avatar-lg rounded-top" alt="rounded-top" />
          <img src="/images/users/user-2.jpg" class="avatar-lg rounded-end" alt="rounded-end" />
          <img src="/images/users/user-2.jpg" class="avatar-lg rounded-bottom" alt="rounded-bottom" />
          <img src="/images/users/user-2.jpg" class="avatar-lg rounded-start" alt="rounded-start" />
          <img src="/images/users/user-2.jpg" class="avatar-lg rounded-circle" alt="rounded-circle" />
          <img src="/images/stock/small-3.jpg" class="w-auto rounded-pill" alt="rounded-pill" width="80" />
        </div>
      </CardWithAction>

      <CardWithAction title="Pointer Events" isTogglable>
        <p>
          <RouterLink to="#" class="pe-none" tabindex="-1">This link</RouterLink>
          can not be clicked.
        </p>
        <p>
          <RouterLink to="#" class="pe-auto">This link</RouterLink>
          can be clicked (this is default behavior).
        </p>
        <p class="pe-none">
          <RouterLink to="#" tabindex="-1">This link</RouterLink>
          can not be clicked because the
          <code>pointer-events</code>
          property is inherited from its parent. However,
          <RouterLink to="#" class="pe-auto">this link</RouterLink>
          has a
          <code>pe-auto</code>
          class and can be clicked.
        </p>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Border Radius Size" isTogglable>
        <div class="d-flex align-items-start flex-wrap gap-2">
          <img src="/images/users/user-4.jpg" class="avatar-lg rounded-0" alt="rounded-0" />
          <img src="/images/users/user-4.jpg" class="avatar-lg rounded-1" alt="rounded-1" />
          <img src="/images/users/user-4.jpg" class="avatar-lg rounded-2" alt="rounded-2" />
          <img src="/images/users/user-4.jpg" class="avatar-lg rounded-3" alt="rounded-3" />
          <img src="/images/users/user-4.jpg" class="avatar-lg rounded-4" alt="rounded-4" />
          <img src="/images/users/user-4.jpg" class="avatar-lg rounded-5" alt="rounded-5" />
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Text Selection" isTogglable>
        <p class="user-select-all">This paragraph will be entirely selected when clicked by the user.</p>
        <p class="user-select-auto">This paragraph has default select behavior.</p>
        <p class="user-select-none mb-0">This paragraph will not be selectable when clicked by the user.</p>
      </CardWithAction>
    </BCol>

    <BCol xl="12">
      <CardWithAction title="Overflow" isTogglable>
        <div class="d-flex flex-wrap gap-4">
          <div class="overflow-auto p-3 bg-light" style="max-width: 260px; max-height: 100px">
            This is an example of using
            <code>.overflow-auto</code>
            on an element with set width and height dimensions. By design, this content will vertically scroll.
          </div>
          <div class="overflow-hidden p-3 bg-light" style="max-width: 260px; max-height: 100px">
            This is an example of using
            <code>.overflow-hidden</code>
            on an element with set width and height dimensions.
          </div>
          <div class="overflow-visible p-3 bg-light" style="max-width: 260px; max-height: 100px">
            This is an example of using
            <code>.overflow-visible</code>
            on an element with set width and height add more text dimensions premium admin dashboard template.
          </div>
          <div class="overflow-scroll p-3 bg-light" style="max-width: 260px; max-height: 100px">
            This is an example of using
            <code>.overflow-scroll</code>
            on an element with set width and height dimensions.
          </div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Position in Arrange" isTogglable>
        <div class="position-relative p-5 bg-light bg-opacity-50 m-3 border rounded" style="height: 180px">
          <div class="position-absolute top-0 start-0 avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-0 end-0 avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-50 start-50 avatar-xs bg-dark rounded"></div>
          <div class="position-absolute bottom-50 end-50 avatar-xs bg-dark rounded"></div>
          <div class="position-absolute bottom-0 start-0 avatar-xs bg-dark rounded"></div>
          <div class="position-absolute bottom-0 end-0 avatar-xs bg-dark rounded"></div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Position in Center" isTogglable>
        <div class="position-relative m-3 bg-light bg-opacity-50 border rounded" style="height: 180px">
          <div class="position-absolute top-0 start-0 translate-middle avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-0 start-50 translate-middle avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-0 start-100 translate-middle avatar-xs bg-dark rounded"></div>

          <div class="position-absolute top-50 start-0 translate-middle avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-50 start-50 translate-middle avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-50 start-100 translate-middle avatar-xs bg-dark rounded"></div>

          <div class="position-absolute top-100 start-0 translate-middle avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-100 start-50 translate-middle avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-100 start-100 translate-middle avatar-xs bg-dark rounded"></div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Position in Axis" isTogglable>
        <div class="position-relative m-3 bg-light border rounded" style="height: 180px">
          <div class="position-absolute top-0 start-0 avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-0 start-50 translate-middle-x avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-0 end-0 avatar-xs bg-dark rounded"></div>

          <div class="position-absolute top-50 start-0 translate-middle-y avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-50 start-50 translate-middle avatar-xs bg-dark rounded"></div>
          <div class="position-absolute top-50 end-0 translate-middle-y avatar-xs bg-dark rounded"></div>

          <div class="position-absolute bottom-0 start-0 avatar-xs bg-dark rounded"></div>
          <div class="position-absolute bottom-0 start-50 translate-middle-x avatar-xs bg-dark rounded"></div>
          <div class="position-absolute bottom-0 end-0 avatar-xs bg-dark rounded"></div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Shadows" isTogglable>
        <div class="shadow-none p-2 mb-2 bg-light rounded">No shadow</div>
        <div class="shadow-sm p-2 mb-2 rounded">Small shadow</div>
        <div class="shadow p-2 mb-2 rounded">Regular shadow</div>
        <div class="shadow-lg p-2 mb-2 rounded">Larger shadow</div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Width" isTogglable>
        <div class="w-25 p-2 bg-light">Width 25%</div>

        <div class="w-50 p-2 bg-light">Width 50%</div>

        <div class="w-75 p-2 bg-light">Width 75%</div>

        <div class="w-100 p-2 bg-light">Width 100%</div>

        <div class="w-auto p-2 bg-light">Width auto</div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Height" isTogglable>
        <div class="d-flex flex-wrap gap-3 align-items-start" style="height: 255px">
          <div class="h-25 p-2 bg-light">Height25%</div>

          <div class="h-50 p-2 bg-light">Height50%</div>

          <div class="h-75 p-2 bg-light">Height75%</div>

          <div class="h-100 p-2 bg-light">Height100%</div>

          <div class="h-auto p-2 bg-light">Height auto</div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Object Fit" isTogglable>
        <div class="d-flex align-items-start flex-wrap gap-3 text-center">
          <div>
            <img src="/images/stock/small-1.jpg" class="object-fit-contain border rounded avatar-xl" alt="..." />
            <p class="mt-1 mb-0">
              <code class="user-select-all">.object-fit-contain</code>
            </p>
          </div>
          <div>
            <img src="/images/stock/small-1.jpg" class="object-fit-cover border rounded avatar-xl" alt="..." />
            <p class="mt-1 mb-0">
              <code class="user-select-all">.object-fit-cover</code>
            </p>
          </div>
          <div>
            <img src="/images/stock/small-1.jpg" class="object-fit-fill border rounded avatar-xl" alt="..." />
            <p class="mt-1 mb-0">
              <code class="user-select-all">.object-fit-fill</code>
            </p>
          </div>
          <div>
            <img src="/images/stock/small-1.jpg" class="object-fit-scale border rounded avatar-xl" alt="..." />
            <p class="mt-1 mb-0">
              <code class="user-select-all">.object-fit-scale</code>
            </p>
          </div>
          <div>
            <img src="/images/stock/small-1.jpg" class="object-fit-none border rounded avatar-xl" alt="..." />
            <p class="mt-1 mb-0">
              <code class="user-select-all">.object-fit-none</code>
            </p>
          </div>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="4">
      <CardWithAction title="Z-index" isTogglable>
        <div class="position-relative" style="height: 220px; z-index: 1">
          <div class="z-3 position-absolute p-5 rounded-3 bg-primary-subtle"></div>
          <div class="z-2 position-absolute p-5 m-2 rounded-3 bg-success-subtle"></div>
          <div class="z-1 position-absolute p-5 m-3 rounded-3 bg-secondary-subtle"></div>
          <div class="z-0 position-absolute p-5 m-4 rounded-3 bg-danger-subtle"></div>
          <div class="z-n1 position-absolute p-5 m-5 rounded-3 bg-info-subtle"></div>
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
