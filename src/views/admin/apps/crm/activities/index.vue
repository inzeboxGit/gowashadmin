<template>
  <PageBreadcrumb title="Activities" subtitle="CRM" />
  <BRow class="justify-content-center">
    <BCol xxl="9">
      <BCard no-body>
        <BCardBody>
          <div class="timeline timeline-icon-bordered">
            <div class="mb-3">
              <h6 class="text-muted fw-bold mb-3">01 Aug, 2025</h6>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">09:30 AM</div>
                <div class="timeline-dot">
                  <Icon icon="user-plus" class="fs-xl text-success"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>New lead:</strong> <RouterLink to="#">John Carter</RouterLink> added to the "Enterprise" pipeline by
                    <span class="fw-semibold text-primary">Sarah Lee</span>
                    .
                  </p>
                  <div class="d-flex align-items-start gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-secondary">Follow Up</button>
                    <button class="btn btn-sm btn-outline-info">Log Note</button>
                  </div>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-light border text-muted">Cold Lead</span>
                    <small class="text-muted">01 Aug, 2025, 09:30 AM</small>
                  </div>
                </div>
              </div>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">10:15 AM</div>
                <div class="timeline-dot">
                  <Icon icon="briefcase" class="fs-xl text-info"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Deal created:</strong> <RouterLink to="#">Q3 Licensing</RouterLink> for John Carter added by
                    <span class="fw-semibold text-primary">Sarah Lee</span>
                    with value $15,000.
                  </p>
                  <div class="d-flex align-items-start gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-primary">View Deal</button>
                  </div>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-info-subtle text-info">High Priority</span>
                    <small class="text-muted">01 Aug, 2025, 10:15 AM</small>
                  </div>
                </div>
              </div>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">11:45 AM</div>
                <div class="timeline-dot">
                  <Icon icon="pencil" class="fs-xl text-muted"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Note added:</strong>
                    Client requested a 15-day extension on proposal deadline. Logged by
                    <span class="fw-semibold text-primary">Sarah Lee</span>
                    .
                  </p>
                  <div class="d-flex align-items-start gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-info">Edit Note</button>
                  </div>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-warning-subtle text-warning">Client Requested</span>
                    <small class="text-muted">01 Aug, 2025, 11:45 AM</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <h6 class="text-muted fw-bold mb-3">31 Jul, 2025</h6>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">03:30 PM</div>
                <div class="timeline-dot">
                  <Icon icon="phone-call" class="fs-xl text-success"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Call completed:</strong>
                    Follow-up call with
                    <strong>Emily Watson</strong>
                    to discuss contract renewal.
                  </p>
                  <div class="d-flex align-items-start gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-success">Call Again</button>
                  </div>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-warning-subtle text-warning">Follow Up Needed</span>
                    <small class="text-muted">31 Jul, 2025, 03:30 PM</small>
                  </div>
                </div>
              </div>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">01:00 PM</div>
                <div class="timeline-dot">
                  <Icon icon="mail" class="fs-xl text-danger"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Email:</strong>
                    Welcome email with demo link sent to
                    <span class="fw-semibold text-primary">Michael Barnes</span>
                    .
                  </p>
                  <div class="d-flex align-items-start gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-dark">Resend</button>
                  </div>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-light border text-muted">Automated</span>
                    <small class="text-muted">31 Jul, 2025, 01:00 PM</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <h6 class="text-muted fw-bold mb-3">30 Jul, 2025</h6>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">02:45 PM</div>
                <div class="timeline-dot">
                  <Icon icon="calendar-check" class="fs-xl text-primary"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Demo scheduled:</strong>
                    A demo was booked with
                    <strong>Linda Rowe</strong>
                    for 02 Aug at 4:00 PM. Invite sent with Google Meet link.
                  </p>
                  <div class="d-flex align-items-start gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-success">Send Reminder</button>
                  </div>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-light border text-muted">Scheduled</span>
                    <small class="text-muted">30 Jul, 2025, 02:45 PM</small>
                  </div>
                </div>
              </div>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">10:00 AM</div>
                <div class="timeline-dot">
                  <Icon icon="circle-user-round" class="fs-xl text-secondary"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Lead reassigned:</strong>
                    Lead
                    <strong>Alice Monroe</strong>
                    was reassigned from
                    <em>James Parker</em>
                    to
                    <strong>Lisa Turner</strong>
                    for better regional alignment.
                  </p>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-light border text-muted">Internal</span>
                    <small class="text-muted">30 Jul, 2025, 10:00 AM</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <h6 class="text-muted fw-bold mb-3">29 Jul, 2025</h6>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">05:30 PM</div>
                <div class="timeline-dot">
                  <Icon icon="star" class="fs-xl text-success"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Lead converted:</strong> <strong>Jacob Wells</strong>
                    converted into customer after final proposal approval. Contract sent for signing.
                  </p>
                  <div class="d-flex align-items-start gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-primary">View Client</button>
                  </div>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-success-subtle text-success">Won</span>
                    <small class="text-muted">29 Jul, 2025, 05:30 PM</small>
                  </div>
                </div>
              </div>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">11:15 AM</div>
                <div class="timeline-dot">
                  <Icon icon="message-square" class="fs-xl text-muted"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Note added:</strong>
                    Added post-call notes for
                    <strong>Emily Watson</strong>
                    . Follow-up set for next week to review proposal edits.
                  </p>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-light border text-muted">Internal Note</span>
                    <small class="text-muted">29 Jul, 2025, 11:15 AM</small>
                  </div>
                </div>
              </div>
            </div>

            <div class="mb-3">
              <h6 class="text-muted fw-bold mb-3">27 Jul, 2025</h6>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">03:00 PM</div>
                <div class="timeline-dot">
                  <Icon icon="x" class="fs-xl text-danger"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Deal lost:</strong>
                    Deal
                    <strong>IT Revamp - BetaSoft</strong>
                    marked as lost due to pricing mismatch. Feedback recorded.
                  </p>
                  <div class="d-flex align-items-start gap-2 mt-2">
                    <button class="btn btn-sm btn-outline-dark">Review Notes</button>
                  </div>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-danger-subtle text-danger">Lost</span>
                    <small class="text-muted">27 Jul, 2025, 03:00 PM</small>
                  </div>
                </div>
              </div>

              <div class="timeline-item d-flex align-items-start">
                <div class="timeline-time pe-3 text-muted">09:20 AM</div>
                <div class="timeline-dot">
                  <Icon icon="square-pen" class="fs-xl text-primary"></Icon>
                </div>
                <div class="timeline-content ps-3 pb-4">
                  <p class="mb-1">
                    <strong>Contact info updated:</strong>
                    Phone and email updated for
                    <strong>Jessica Tran</strong>
                    . New contact details logged.
                  </p>
                  <div class="d-flex align-items-center gap-2 mt-2">
                    <span class="badge bg-light border text-muted">Updated</span>
                    <small class="text-muted">27 Jul, 2025, 09:20 AM</small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="d-flex align-items-center justify-content-center gap-2 p-3">
            <strong>Loading...</strong>
            <div class="spinner-border spinner-border-sm text-danger" role="status" aria-hidden="true"></div>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router"
import { BCard, BCardBody, BCol, BRow } from 'bootstrap-vue-next'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
</script>
