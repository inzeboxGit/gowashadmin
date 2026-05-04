<template>
  <form action="#" class="mb-3">
    <textarea rows="3" class="form-control" placeholder="Write something..."></textarea>
    <div class="d-flex py-2 justify-content-between">
      <div>
        <RouterLink to="" class="btn btn-sm btn-icon btn-light">
          <Icon icon="user" class="fs-md" />
        </RouterLink>
        <RouterLink to="" class="btn btn-sm btn-icon btn-light">
          <Icon icon="map-pin" class="fs-md" />
        </RouterLink>
        <RouterLink to="" class="btn btn-sm btn-icon btn-light">
          <Icon icon="camera" class="fs-md" />
        </RouterLink>
        <RouterLink to="" class="btn btn-sm btn-icon btn-light">
          <Icon icon="smile" class="fs-md" />
        </RouterLink>
      </div>
      <button type="submit" class="btn btn-sm btn-dark">Post</button>
    </div>
  </form>

  <div class="border border-light border-dashed rounded p-2 mb-3">
    <div class="d-flex align-items-center mb-2">
      <img class="me-2 avatar-md rounded-circle" src="/images/users/user-3.jpg" alt="Generic placeholder image" />
      <div class="w-100">
        <h5 class="m-0">Jeremy Tomlinson</h5>
        <p class="text-muted mb-0">
          <small>about 2 minutes ago</small>
        </p>
      </div>
    </div>
    <p>Story based around the idea of time lapse, animation to post soon!</p>

    <img src="/images/stock/small-1.jpg" alt="post-img" class="rounded me-1" height="60" />
    <img src="/images/stock/small-2.jpg" alt="post-img" class="rounded me-1" height="60" />
    <img src="/images/stock/small-3.jpg" alt="post-img" class="rounded" height="60" />

    <div class="mt-2">
      <RouterLink to="javascript: void(0);" class="btn btn-sm fs-sm btn-link text-muted">
        <Icon icon="corner-up-left" class="me-1" />
        Reply
      </RouterLink>
      <span class="btn btn-sm fs-sm btn-link text-muted" data-toggler="on">
        <span data-toggler-on class="align-middle">
          <Icon icon="heart" class="text-danger" />
          Liked!
        </span>
        <span data-toggler-off class="d-none align-middle">
          <Icon icon="heart" class="text-muted" />
          Like
        </span>
      </span>
      <RouterLink to="" class="btn btn-sm fs-sm btn-link text-muted">
        <Icon icon="share-2" class="me-1" />
        Share
      </RouterLink>
    </div>
  </div>

  <div class="border border-light border-dashed rounded p-2 mb-3">
    <div class="d-flex align-items-center mb-2">
      <img class="me-2 avatar-sm rounded-circle" src="/images/users/user-4.jpg" alt="Generic placeholder image" />
      <div class="w-100">
        <h5 class="m-0">Sophia Martinez</h5>
        <p class="text-muted mb-0">
          <small>about 30 minutes ago</small>
        </p>
      </div>
    </div>

    <div class="fs-16 text-center mt-3 mb-4 fst-italic">
      <Icon icon="quote" class="fs-20" />
      Just finished a weekend project! Built a small weather app using React and OpenWeather API. Feeling excited to share the results with everyone soon. 🚀
    </div>

    <div class="bg-light-subtle m-n2 p-2 border-top border-bottom border-dashed">
      <div class="d-flex align-items-start">
        <img class="me-2 avatar-sm rounded-circle" src="/images/users/user-1.jpg" alt="Generic placeholder image" />
        <div class="w-100">
          <h5 class="mt-0 mb-1">
            Liam Johnson
            <small class="text-muted">10 minutes ago</small>
          </h5>
          That sounds awesome! Can't wait to see how you designed the UI.
          <br />
          <RouterLink to="" class="text-muted font-13 d-inline-block mt-2">
            <Icon icon="corner-up-left" />
            Reply
          </RouterLink>

          <div class="d-flex align-items-start mt-3">
            <RouterLink class="pe-2" to="#">
              <img src="/images/users/user-2.jpg" class="avatar-sm rounded-circle" alt="Generic placeholder image" />
            </RouterLink>
            <div class="w-100">
              <h5 class="mt-0 mb-1">
                Olivia Carter
                <small class="text-muted">15 minutes ago</small>
              </h5>
              I recently built something similar with Vue. Let's collaborate sometime!
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex align-items-start mt-2">
        <RouterLink class="pe-2" to="#">
          <img src="/images/users/user-3.jpg" class="rounded-circle" alt="Generic placeholder image" height="31" />
        </RouterLink>
        <div class="w-100">
          <input type="text" id="simpleinput" class="form-control form-control-sm" placeholder="Add a comment..." />
        </div>
      </div>
    </div>

    <div class="mt-3">
      <RouterLink to="" class="btn btn-sm fs-sm btn-link text-muted">
        <Icon icon="corner-up-left" class="me-1" />
        Reply
      </RouterLink>
      <span class="btn btn-sm fs-sm btn-link text-muted" data-toggler="off">
        <span data-toggler-on class="d-none align-middle">
          <Icon icon="heart" class="text-danger" />
          Liked!
        </span>
        <span data-toggler-off class="align-middle">
          <Icon icon="heart" class="text-muted" />
          Likes (45)
        </span>
      </span>
      <RouterLink to="" class="btn btn-sm fs-sm btn-link text-muted">
        <Icon icon="share-2" class="me-1" />
        Share
      </RouterLink>
    </div>
  </div>

  <div class="border border-light border-dashed rounded p-2 mb-3">
    <div class="d-flex align-items-center mb-2">
      <img class="me-2 avatar-sm rounded-circle" src="/images/users/user-2.jpg" alt="Profile photo of Anika Roy" />
      <div class="w-100">
        <h5 class="m-0">Anika Roy</h5>
        <p class="text-muted mb-0">
          <small>2 hours ago</small>
        </p>
      </div>
    </div>

    <p>Sharing a couple of timelapses from my recent Iceland trip. Let me know which one you like most!</p>

    <BRow class="g-2">
      <BCol md="6">
        <div class="ratio ratio-16x9 rounded overflow-hidden">
          <iframe src="https://player.vimeo.com/video/1084537" allowfullscreen></iframe>
        </div>
      </BCol>
      <BCol md="6">
        <div class="ratio ratio-16x9 rounded overflow-hidden">
          <iframe src="https://player.vimeo.com/video/76979871" allowfullscreen></iframe>
        </div>
      </BCol>
    </BRow>
  </div>

  <div class="d-flex align-items-center justify-content-center gap-2 p-3">
    <strong>Loading...</strong>
    <div class="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import Icon from '~/components/wrappers/Icon.vue'
</script>

<style scoped></style>
