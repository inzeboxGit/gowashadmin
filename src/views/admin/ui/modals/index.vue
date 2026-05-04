<template>
  <PageBreadcrumb title="Modals" subtitle="UI" />

  <BRow>
    <BCol xl="12">
      <CardWithAction title="Bootstrap Modals" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton type="button" variant="primary" @click="standardModal = !standardModal">Standard Modal</BButton>
          <BButton type="button" variant="info" @click="largeModal = !largeModal">Large Modal</BButton>
          <BButton type="button" variant="success" @click="smallModal = !smallModal">Small Modal</BButton>
          <BButton type="button" variant="primary" @click="fullModal = !fullModal">Full Width Modal</BButton>
          <BButton type="button" variant="secondary" @click="scrollableModal = !scrollableModal">Scrollable Modal</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="12">
      <CardWithAction title="Modal Position" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton variant="secondary" type="button" @click="topModal = !topModal">Top Modal</BButton>
          <BButton variant="secondary" type="button" @click="bottomModal = !bottomModal">Bottom Modal</BButton>
          <BButton variant="secondary" type="button" @click="centerModal = !centerModal">Center modal</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="12">
      <CardWithAction title="Multiple Modal" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton type="button" variant="primary" @click="multipleModal = !multipleModal">Multiple Modal</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="12">
      <CardWithAction title="Toggle Between Modals" isTogglable>
        <BButton variant="secondary" @click="toggleModal1 = !toggleModal1">Open First Modal</BButton>
      </CardWithAction>
    </BCol>

    <BCol xl="12">
      <CardWithAction title="Fullscreen Modal" isTogglable>
        <div class="hstack gap-2 flex-wrap">
          <BButton type="button" variant="primary" @click="fsModal = !fsModal">Fullscreen Modal</BButton>
          <BButton type="button" variant="primary" @click="fsBSMModal = !fsBSMModal">Full Screen Below sm</BButton>
          <BButton type="button" variant="primary" @click="fsBMDModal = !fsBMDModal">Full Screen Below md</BButton>
          <BButton type="button" variant="primary" @click="fsBLGModal = !fsBLGModal">Full Screen Below lg</BButton>
          <BButton type="button" variant="primary" @click="fsBXLModal = !fsBXLModal">Full Screen Below xl</BButton>
          <BButton type="button" variant="primary" @click="fsBXXLModal = !fsBXXLModal">Full Screen Below xxl</BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="12">
      <CardWithAction title="Static Backdrop" isTogglable>
        <div class="d-flex flex-wrap gap-2">
          <BButton type="button" variant="info" @click="staticBackdropModal = !staticBackdropModal"> Static Backdrop </BButton>
        </div>
      </CardWithAction>
    </BCol>

    <BCol xl="12">
      <CardWithAction title="Varying Modal Content" isTogglable>
        <div class="hstack gap-2 flex-wrap">
          <BButton type="button" variant="primary" @click="varyingModalModal = !varyingModalModal">Open modal for @mdo</BButton>
          <BButton type="button" variant="primary" @click="varyingModalModal = !varyingModalModal">Open modal for @fat</BButton>
          <BButton type="button" variant="primary" @click="varyingModalModal = !varyingModalModal">Open modal for @getbootstrap</BButton>
        </div>
      </CardWithAction>
    </BCol>
  </BRow>

  <BModal v-model="standardModal" title="Modal Heading" title-tag="h4" ok-title="Save changes" cancel-title="Close" cancel-variant="light">
    <h5>Text in a modal</h5>
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    <hr />
    <h5>Overflowing text to show scroll behavior</h5>
    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
    <p class="mb-0">Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
  </BModal>

  <BModal v-model="largeModal" title="Large modal" title-tag="h4" size="lg" hide-footer> ... </BModal>

  <BModal v-model="smallModal" title="Small modal" title-tag="h4" size="sm" hide-footer> ... </BModal>

  <BModal v-model="fullModal" title="Modal Heading" title-tag="h4" dialog-class="modal-full-width" ok-title="Save changes" cancel-title="Close" cancel-variant="light">
    <h5>Text in a modal</h5>
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
    <hr />
    <h5>Overflowing text to show scroll behavior</h5>
    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
    <p class="mb-0">Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
  </BModal>

  <BModal v-model="scrollableModal" title="Modal title" title-tag="h4" ok-title="Save changes" cancel-title="Close" cancel-variant="secondary" scrollable>
    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
    <p>Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
    <p class="mb-0">Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus auctor fringilla.</p>
  </BModal>

  <BModal v-model="topModal" title="Modal Heading" title-tag="h4" ok-title="Save changes" cancel-title="Close" cancel-variant="light" dialog-class="modal-top">
    <h5 class="mt-0">Text in a modal</h5>
    <p class="my-0">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
  </BModal>

  <BModal v-model="bottomModal" title="Modal Heading" title-tag="h4" ok-title="Save changes" cancel-title="Close" cancel-variant="light" dialog-class="modal-bottom">
    <h5 class="mt-0">Text in a modal</h5>
    <p class="my-0">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
  </BModal>

  <BModal v-model="centerModal" title="Center Modal" title-tag="h4" ok-title="Save changes" cancel-title="Close" cancel-variant="light" hide-footer centered>
    <h5 class="mt-0">Overflowing text to show scroll behavior</h5>
    <p>Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.</p>
    <p class="mb-0">Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.</p>
  </BModal>

  <BModal v-model="multipleModal" title="Modal Heading" title-tag="h4" ok-title="Next" ok-only @ok="handleOk">
    <h5 class="mt-0">Text in a modal</h5>
    <p class="my-0">Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
  </BModal>

  <BModal v-model="multipleModal1" title="Modal Heading" title-tag="h4" ok-title="Close" ok-only>
    <h5>Text in a modal</h5>
    <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
  </BModal>

  <BModal v-model="toggleModal1" title="Modal 1" title-tag="h4" ok-title="Open second modal" ok-only @ok="handleToggles" centered> Show a second modal and hide this one with the button below. </BModal>

  <BModal v-model="toggleModal2" title="Modal 2" title-tag="h4" ok-title="Back To First" ok-only @ok="handleToggles" centered> Hide this modal and show the first with the button below. </BModal>

  <BModal v-model="fsModal" title="Full Screen Modal" ok-title="Save Changes" cancel-title="Close" cancel-variant="light" fullscreen> ... </BModal>
  <BModal v-model="fsBSMModal" title="Full screen below sm" ok-title="Save Changes" cancel-title="Close" cancel-variant="light" fullscreen="sm"> ... </BModal>
  <BModal v-model="fsBMDModal" title="Full screen below md" ok-title="Save Changes" cancel-title="Close" cancel-variant="light" fullscreen="md"> ... </BModal>
  <BModal v-model="fsBLGModal" title="Full screen below lg" ok-title="Save Changes" cancel-title="Close" cancel-variant="light" fullscreen="lg"> ... </BModal>
  <BModal v-model="fsBXLModal" title="Full screen below xl" ok-title="Save Changes" cancel-title="Close" cancel-variant="light" fullscreen="xl"> ... </BModal>
  <BModal v-model="fsBXXLModal" title="Full screen below xxl" ok-title="Save Changes" cancel-title="Close" cancel-variant="light" fullscreen="xxl"> ... </BModal>

  <BModal v-model="staticBackdropModal" title="Modal title" ok-title="Understood" cancel-title="Close" :noCloseOnBackdrop="true"> I will not close if you click outside me. Don't even try to press escape key. </BModal>

  <BModal v-model="varyingModalModal" title="New message" ok-title="Send Message" cancel-title="Close">
    <form>
      <div class="mb-3">
        <label for="recipient-name" class="col-form-label">Recipient:</label>
        <input type="text" class="form-control" id="recipient-name" />
      </div>
      <div class="mb-3">
        <label for="message-text" class="col-form-label">Message:</label>
        <textarea class="form-control" id="message-text"></textarea>
      </div>
    </form>
  </BModal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
const standardModal = ref(false)
const largeModal = ref(false)
const smallModal = ref(false)
const fullModal = ref(false)
const scrollableModal = ref(false)

const topModal = ref(false)
const bottomModal = ref(false)
const centerModal = ref(false)

// const filledModal = ref(false)
// const filledVariant = ref('primary')

// const filledfn = (e: string) => {
//   filledVariant.value = e
//   filledModal.value = true
// }

const multipleModal = ref(false)
const multipleModal1 = ref(false)

const handleOk = () => {
  multipleModal.value = !multipleModal.value
  multipleModal1.value = !multipleModal1.value
}

const toggleModal1 = ref(false)
const toggleModal2 = ref(false)

const handleToggles = () => {
  toggleModal1.value = !toggleModal1.value
  toggleModal2.value = !toggleModal2.value
}

const fsModal = ref(false)
const fsBSMModal = ref(false)
const fsBMDModal = ref(false)
const fsBLGModal = ref(false)
const fsBXLModal = ref(false)
const fsBXXLModal = ref(false)

const staticBackdropModal = ref(false)
const varyingModalModal = ref(false)

</script>
