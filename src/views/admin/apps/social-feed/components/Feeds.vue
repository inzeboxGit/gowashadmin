<template>
  <BCard no-body>
    <BCardBody>
      <h5 class="mb-2">What’s on your mind?</h5>

      <form>
        <textarea rows="3" class="form-control" placeholder="Share your thoughts..."></textarea>

        <div class="d-flex pt-2 justify-content-between align-items-center">
          <div class="d-flex gap-1">
            <BButton variant="light" size="sm" class="btn-icon" title="Tag People">
              <Icon icon="user" class="fs-md" />
            </BButton>
            <BButton variant="light" size="sm" class="btn-icon" title="Add Location">
              <Icon icon="map-pin" class="fs-md" />
            </BButton>
            <BButton variant="light" size="sm" class="btn-icon" title="Upload Photo">
              <Icon icon="camera" class="fs-md" />
            </BButton>
            <BButton variant="light" size="sm" class="btn-icon" title="Add Emoji">
              <Icon icon="smile" class="fs-md" />
            </BButton>
          </div>

          <button type="submit" class="btn btn-dark btn-sm">Post</button>
        </div>
      </form>
    </BCardBody>
  </BCard>

  <CommonPostCard image="/images/users/user-10.jpg" name="Jeremy Tomlinson" time="about 2 minutes ago" description="Story based around the idea of time lapse, animation to post soon!">
    <BRow class="g-1">
      <BCol md="6">
        <img src="/images/gallery/10.jpg" class="img-fluid w-100 h-100 rounded" style="aspect-ratio: 3/4; object-fit: cover" alt="Tall Image" />
      </BCol>
      <BCol md="6" class="d-flex flex-column gap-1">
        <img src="/images/gallery/2.jpg" class="img-fluid w-100 rounded" style="aspect-ratio: 4/3; object-fit: cover" alt="Top Right" />
        <img src="/images/gallery/3.jpg" class="img-fluid w-100 rounded" style="aspect-ratio: 4/3; object-fit: cover" alt="Bottom Right" />
      </BCol>
    </BRow>
  </CommonPostCard>

  <CommonPostCard image="/images/users/user-4.jpg" name="Sophia Martinez" time="about 30 minutes ago">
    <div class="fs-16 text-center mt-3 mb-4 fst-italic">
      <Icon icon="quote" class="fs-20" />
      Just finished a weekend project! Built a small weather app using React and OpenWeather API. Feeling excited to share the results with everyone soon. 🚀
    </div>

    <div class="bg-light-subtle mx-n3 p-3 border-top border-bottom border-dashed">
      <div class="d-flex align-items-start mb-2">
        <img src="/images/users/user-1.jpg" class="me-2 avatar-sm rounded-circle" />
        <div class="w-100">
          <h5 class="mt-0 mb-1">
            <RouterLink to="/apps/users/profile" class="link-reset">Liam Johnson</RouterLink>
            <small class="text-muted fw-normal float-end">10 minutes ago</small>
          </h5>
          That sounds awesome! Can't wait to see how you designed the UI.
          <br />
          <RouterLink to="" class="text-muted font-13 d-inline-block mt-2"> <Icon icon="corner-up-left" /> Reply </RouterLink>

          <div class="d-flex align-items-start mt-3">
            <RouterLink to="" class="pe-2">
              <img src="/images/users/user-2.jpg" class="avatar-sm rounded-circle" />
            </RouterLink>
            <div class="w-100">
              <h5 class="mt-0 mb-1">
                <RouterLink to="/apps/users/profile" class="link-reset">Olivia Carter</RouterLink>
                <small class="text-muted fw-normal float-end">5 minutes ago</small>
              </h5>
              I'm excited to see the final result! Let me know when you're ready to share.
            </div>
          </div>
        </div>
      </div>

      <div class="d-flex align-items-start mt-3">
        <RouterLink to="" class="pe-2">
          <img src="/images/users/user-3.jpg" class="rounded-circle" height="31" />
        </RouterLink>
        <div class="w-100">
          <input type="text" class="form-control form-control-sm" placeholder="Add a comment..." />
        </div>
      </div>
    </div>
  </CommonPostCard>

  <CommonPostCard image="/images/users/user-2.jpg" name="Anika Roy" time="2 hours ago" description="Sharing a couple of timelapses from my recent Iceland trip. Let me know which one you like most!">
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
  </CommonPostCard>

  <CommonPostCard image="/images/users/user-6.jpg" name="David Kim" time="Posted 1 hour ago">
    <h5 class="mb-3">🔥 Quick Poll: What’s your go-to front-end framework in 2025?</h5>
    <p class="text-muted">We’re gathering developer preferences for our next project. Cast your vote below! 💻</p>

    <form>
      <div class="form-check mb-1">
        <input class="form-check-input" type="radio" name="framework_poll" id="optionReact" />
        <label class="form-check-label" for="optionReact">React (Meta)</label>
      </div>
      <div class="form-check mb-1">
        <input class="form-check-input" type="radio" name="framework_poll" id="optionVue" />
        <label class="form-check-label" for="optionVue">Vue.js (Evan You)</label>
      </div>
      <div class="form-check mb-1">
        <input class="form-check-input" type="radio" name="framework_poll" id="optionAngular" />
        <label class="form-check-label" for="optionAngular">Angular (Google)</label>
      </div>
      <div class="form-check mb-3">
        <input class="form-check-input" type="radio" name="framework_poll" id="optionSvelte" />
        <label class="form-check-label" for="optionSvelte">Svelte (Emerging Favorite)</label>
      </div>
      <button type="submit" class="btn btn-sm btn-primary">Submit Vote</button>
    </form>
  </CommonPostCard>

  <CommonPostCard image="/images/users/user-2.jpg" name="Anika Roy" time="Posted 2 hours ago">
    <h5 class="mb-2">📢 You're Invited: <strong>Dev Meetup 2025 – Build with AI</strong></h5>
    <p class="text-muted mb-2">Join developers and tech enthusiasts for an inspiring evening of AI-driven development talks, live demos, and networking opportunities.</p>
    <ul class="list-unstyled mb-3">
      <li class="pb-2"><strong>Date:</strong> Saturday, 14th September 2025</li>
      <li class="pb-2"><strong>Time:</strong> 10:00 AM – 4:00 PM</li>
      <li><strong>Location:</strong> Green Valley National Park</li>
    </ul>

    <div class="d-flex gap-2">
      <button class="btn btn-sm btn-outline-primary"><Icon icon="bell" class="me-1" /> Interested</button>
      <button class="btn btn-sm btn-primary"><Icon icon="user-plus" class="me-1" /> Join Now</button>
    </div>
  </CommonPostCard>

  <BCard no-body>
    <BCardBody class="text-center">
      <h1 class="mb-2">🏆</h1>
      <h4 class="mb-1 fw-semibold">Congratulations, Anika! 🎉</h4>
      <p class="text-muted fst-italic mb-3">You’ve hit <strong>1,000 followers</strong>! Your content is making waves in the community!</p>

      <div class="d-flex justify-content-center mb-3">
        <div class="me-4 text-center">
          <h6 class="mb-0">Posts</h6>
          <span class="fw-bold">135</span>
        </div>
        <div class="me-4 text-center">
          <h6 class="mb-0">Likes</h6>
          <span class="fw-bold">8,400</span>
        </div>
        <div class="text-center">
          <h6 class="mb-0">Followers</h6>
          <span class="fw-bold">1,000</span>
        </div>
      </div>

      <button class="btn btn-sm btn-outline-success me-2"><Icon icon="share-2" class="me-1" /> Share Achievement</button>
      <RouterLink to="/apps/users/profile" class="btn btn-sm btn-primary"> <Icon icon="user" class="me-1" /> View Profile </RouterLink>
    </BCardBody>
  </BCard>

  <div class="d-flex align-items-center justify-content-center gap-2 p-3 mb-3">
    <strong>Loading...</strong>
    <div class="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BButton, BCard, BCardBody, BCol, BRow } from 'bootstrap-vue-next'
import Icon from '~/components/wrappers/Icon.vue'
import CommonPostCard from './CommonPostCard.vue'
</script>
