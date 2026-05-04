<template>
  <PageBreadcrumb title="SweetAlert2" subtitle="Plugins" />

  <BRow class="justify-content-center">
    <BCol cols="12">
      <BCard no-body>
        <BCardHeader>
          <h4 class="card-title">Examples</h4>
        </BCardHeader>

        <BCardBody>
          <div class="table-responsive-sm">
            <table class="table mb-0">
              <tbody>
                <tr>
                  <td>
                    <h5 class="mb-1">Basic</h5>
                    <p class="text-muted mb-0">Displays a simple SweetAlert popup.</p>
                  </td>
                  <td>
                    <BButton variant="primary" size="sm" type="button" @click="executeExample('basicMessage')">Click me</BButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">Title</h5>
                    <p class="text-muted mb-0">A popup with a title and supporting text.</p>
                  </td>
                  <td>
                    <BButton variant="primary" size="sm" type="button" @click="executeExample('titleText')">Click Me</BButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">HTML</h5>
                    <p class="text-muted mb-0">Shows a popup with custom HTML content.</p>
                  </td>
                  <td>
                    <BButton variant="primary" size="sm" type="button" @click="executeExample('customHtml')">Toggle HTML SweetAlert</BButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">All States</h5>
                    <p class="text-muted mb-0">Examples of SweetAlert in different alert states.</p>
                  </td>
                  <td>
                    <div class="d-flex flex-wrap gap-2">
                      <BButton variant="info" size="sm" type="button" @click="executeExample('info')">Toggle Info</BButton>
                      <BButton variant="warning" size="sm" type="button" @click="executeExample('warning')">Toggle Warning</BButton>
                      <BButton variant="danger" size="sm" type="button" @click="executeExample('error')">Toggle Error</BButton>
                      <BButton variant="success" size="sm" type="button" @click="executeExample('success')">Toggle Success</BButton>
                      <BButton variant="primary" size="sm" type="button" @click="executeExample('question')">Toggle Question</BButton>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">Long Content</h5>
                    <p class="text-muted mb-0">A popup with extended content for demonstration.</p>
                  </td>
                  <td>
                    <BButton variant="secondary" size="sm" type="button" @click="executeExample('longContent')">Click Me</BButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">With Confirm Button</h5>
                    <p class="text-muted mb-0">A confirmation dialog with an attached action.</p>
                  </td>
                  <td>
                    <BButton variant="secondary" size="sm" type="button" @click="executeExample('confirmButton')">Click Me</BButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">With Cancel Button</h5>
                    <p class="text-muted mb-0">Includes cancel and confirm options with different actions.</p>
                  </td>
                  <td>
                    <BButton variant="secondary" size="sm" type="button" @click="executeExample('cancelButton')">Click Me</BButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">With Image Header (Logo)</h5>
                    <p class="text-muted mb-0">Custom popup with a logo or image header.</p>
                  </td>
                  <td>
                    <BButton variant="secondary" size="sm" type="button" @click="executeExample('customImage')">Click Me</BButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">Auto Close</h5>
                    <p class="text-muted mb-0">Displays a popup that closes automatically after a timeout.</p>
                  </td>
                  <td>
                    <BButton variant="secondary" size="sm" type="button" @click="executeExample('timer')">Click Me</BButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">Position</h5>
                    <p class="text-muted mb-0">Shows the alert in different screen positions.</p>
                  </td>
                  <td>
                    <div class="d-flex flex-wrap gap-2">
                      <BButton variant="primary" size="sm" @click="openAlertWithPosition('top-start')">Top Start</BButton>
                      <BButton variant="primary" size="sm" @click="openAlertWithPosition('top-end')">Top End</BButton>
                      <BButton variant="primary" size="sm" @click="openAlertWithPosition('bottom-start')">Bottom Start</BButton>
                      <BButton variant="primary" size="sm" @click="openAlertWithPosition('bottom-end')">Bottom End</BButton>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">With Custom Padding, Background</h5>
                    <p class="text-muted mb-0">Popup with custom dimensions, padding, and background style.</p>
                  </td>
                  <td>
                    <BButton variant="secondary" size="sm" type="button" @click="executeExample('customBackground')">Click Me</BButton>
                  </td>
                </tr>
                <tr>
                  <td>
                    <h5 class="mb-1">Ajax Request</h5>
                    <p class="text-muted mb-0">Demonstrates an alert with an Ajax request.</p>
                  </td>
                  <td>
                    <BButton variant="secondary" size="sm" type="button" @click="executeExample('ajaxRequest')">Click Me</BButton>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCard, BCardBody, BCardHeader, BCol, BRow } from 'bootstrap-vue-next'
import Swal, { type SweetAlertPosition } from 'sweetalert2'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import logoSm from '/images/logo-sm.png'

type TVueSwalInstance = typeof Swal & typeof Swal.fire

const openAlertWithPosition = (position: SweetAlertPosition) => {
  Swal.fire({
    icon: 'success',
    text: 'Saved successfully!',
    showConfirmButton: false,
    timer: 1500,
    position: position,
  })
}

const executeExample = (sub: string) => {
  switch (sub) {
    case 'basicMessage':
      ;(Swal as TVueSwalInstance).fire({
        title: 'Simple Alert',
        text: 'This is a basic SweetAlert dialog.',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      })
      return

    case 'titleText':
      ;(Swal as TVueSwalInstance).fire({
        title: 'Notice',
        text: 'This is a titled alert with additional details.',
        icon: 'question',
        showCloseButton: true,
        customClass: {
          confirmButton: 'btn btn-primary',
        },
      })
      return

    case 'errorType':
      ;(Swal as TVueSwalInstance).fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>',
      })
      return
    case 'errorType':
      ;(Swal as TVueSwalInstance).fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href>Why do I have this issue?</a>',
      })
      return

    case 'customHtml':
      ;(Swal as TVueSwalInstance).fire({
        title: '<i>HTML</i> <u>Alert</u>',
        html: 'Use <b>bold</b>, <a href="#">links</a>, and other HTML here.',
        icon: 'info',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText:
          '<svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="me-1 align-middle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" /></svg> Like it!',
        cancelButtonText:
          '<svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="currentColor"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M13 21.008a3 3 0 0 0 2.995 -2.823l.005 -.177v-4h2a3 3 0 0 0 2.98 -2.65l.015 -.173l.005 -.177l-.02 -.196l-1.006 -5.032c-.381 -1.625 -1.502 -2.796 -2.81 -2.78l-.164 .008h-8a1 1 0 0 0 -.993 .884l-.007 .116l.001 9.536a1 1 0 0 0 .5 .866a2.998 2.998 0 0 1 1.492 2.396l.007 .202v1a3 3 0 0 0 3 3z" /><path d="M5 14.008a1 1 0 0 0 .993 -.883l.007 -.117v-9a1 1 0 0 0 -.883 -.993l-.117 -.007h-1a2 2 0 0 0 -1.995 1.852l-.005 .15v7a2 2 0 0 0 1.85 1.994l.15 .005h1z" /></svg>',
        customClass: {
          confirmButton: 'btn btn-success me-2',
          cancelButton: 'btn btn-danger',
        },
      })
      return

    case 'longContent':
      ;(Swal as TVueSwalInstance).fire({
        imageUrl: 'https://placehold.co/300x1000/1ab394/white',
        imageHeight: 1000,
        imageAlt: 'Very tall content image',
        showCloseButton: true,
        customClass: { confirmButton: 'btn btn-secondary mt-2' },
      })
      return

    case 'confirmButton':
      ;(Swal as TVueSwalInstance)
        .fire({
          title: 'Confirm Deletion',
          text: 'Are you sure you want to delete this item?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          showCloseButton: true,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary me-2 mt-2',
            cancelButton: 'btn btn-danger mt-2',
          },
        })
        .then((result: any) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your item has been successfully removed.',
              icon: 'success',
            })
          }
        })
      return

    case 'cancelButton':
      ;(Swal as TVueSwalInstance)
        .fire({
          title: 'Delete File?',
          text: 'This action cannot be undone!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete',
          cancelButtonText: 'Cancel',
          showCloseButton: true,
          buttonsStyling: false,
          customClass: {
            confirmButton: 'btn btn-primary mt-2 me-2',
            cancelButton: 'btn btn-danger mt-2',
          },
        })
        .then((result: any) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Deleted!',
              text: 'The file has been deleted.',
              icon: 'success',
            })
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
              title: 'Action Cancelled',
              text: 'Your file is safe.',
              icon: 'error',
            })
          }
        })
      return

    case 'customImage':
      ;(Swal as TVueSwalInstance).fire({
        title: 'Custom Branding',
        text: 'This alert includes a logo.',
        imageUrl: logoSm,
        imageHeight: 40,
        showCloseButton: true,
      })
      return

    case 'timer': {
      ;(Swal as TVueSwalInstance).fire({
        title: 'Auto Dismiss',
        html: 'Closing in <b></b> seconds...',
        timer: 2000,
        timerProgressBar: true,
        showCloseButton: true,
      })
      return
    }

    case 'customBackground': {
      ;(Swal as TVueSwalInstance).fire({
        title: 'Custom Design',
        html: '<p class="text-white">This alert has custom size, padding, and background.</p>',
        width: 600,
        padding: '100px',
        color: '#fff',
        background: `url('/images/stock/small-2.jpg') no-repeat center`,
      })
      return
    }

    case 'ajaxRequest':
      ;(Swal as TVueSwalInstance)
        .fire({
          title: 'Submit your Github username',
          input: 'text',
          inputAttributes: {
            autocapitalize: 'off',
          },
          showCancelButton: true,
          confirmButtonText: 'Look up',
          showLoaderOnConfirm: true,
          preConfirm: (login: any) => {
            return fetch(`//api.github.com/users/${login}`)
              .then((response) => {
                if (!response.ok) {
                  throw new Error(response.statusText)
                }
                return response.json()
              })
              .catch((error) => {
                ;(Swal as TVueSwalInstance).showValidationMessage(`Request failed: ${error}`)
              })
          },
          allowOutsideClick: () => !(Swal as TVueSwalInstance).isLoading(),
        })
        .then((result: any) => {
          if (result.isConfirmed) {
            ;(Swal as TVueSwalInstance).fire({
              title: `${result.value.login}'s avatar`,
              imageUrl: result.value.avatar_url,
            })
          }
        })
      return

    case 'success':
      ;(Swal as TVueSwalInstance).fire({
        text: 'Action completed successfully!',
        icon: 'success',
        confirmButtonText: 'Great!',
        customClass: { confirmButton: 'btn btn-success' },
      })
      return

    case 'error':
      ;(Swal as TVueSwalInstance).fire({
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        confirmButtonText: 'Dismiss',
        customClass: { confirmButton: 'btn btn-danger' },
      })
      return

    case 'warning':
      ;(Swal as TVueSwalInstance).fire({
        text: 'Heads up! Something might require your attention.',
        icon: 'warning',
        confirmButtonText: 'Got it',
        customClass: { confirmButton: 'btn btn-warning' },
      })
      return

    case 'info':
      ;(Swal as TVueSwalInstance).fire({
        text: 'This is an informational message to keep you updated.',
        icon: 'info',
        confirmButtonText: 'Understood',
        customClass: { confirmButton: 'btn btn-info' },
      })
      return

    case 'question':
      ;(Swal as TVueSwalInstance).fire({
        text: 'Do you need more information about this feature?',
        icon: 'question',
        confirmButtonText: 'Yes, please',
      })
      return
  }
}
</script>

<style scoped></style>
