<template>
  <PageBreadcrumb subtitle="Plugins" title="Clipboard" />

  <BRow class="justify-content-center">
    <BCol xs="12">
      <BCard no-body>
        <BCardHeader>
          <BCardTitle>Examples</BCardTitle>
        </BCardHeader>
        <BCardBody>
          <BRow class="g-3">
            <BCol xl="6">
              <div class="border border-light rounded p-3 h-100">
                <h5 class="mb-1">Copy from Element</h5>
                <p class="text-muted mb-2">Use <code>ref</code> to copy text from a specific element.</p>
                <p class="text-primary fw-bold" ref="copytext">Click the button to copy this promotional text.</p>
                <BButton variant="primary" size="sm" @click="copyFromElement(copytext)">
                  <Icon icon="copy" class="me-1" />
                  Copy Text
                </BButton>
              </div>
            </BCol>

            <BCol xl="6">
              <div class="border border-light rounded p-3 h-100">
                <h5 class="mb-1">Cut from Textarea</h5>
                <p class="text-muted mb-2">Use <code>cut</code> to remove and copy content.</p>
                <textarea class="form-control" ref="cutArea">This content will be cut and removed from this textarea.</textarea>
                <BButton variant="primary" size="sm" class="mt-3" @click="cutFromInput(cutArea)">
                  <Icon icon="scissors" class="me-1" />
                  Cut Content
                </BButton>
              </div>
            </BCol>

            <BCol xl="6">
              <div class="border border-light rounded p-3 h-100">
                <h5 class="mb-1">Copy Email Address</h5>
                <p class="text-muted mb-2">Click to copy email:</p>
                <span ref="copyEmail" class="d-block text-primary fw-bold">support@example.com</span>
                <BButton variant="primary" size="sm" class="mt-2" @click="copyFromElement(copyEmail)">
                  <Icon icon="copy" class="me-1" />
                  Copy Email
                </BButton>
              </div>
            </BCol>

            <BCol xl="6">
              <div class="border border-light rounded p-3 h-100">
                <h5 class="mb-1">Cut Input Value</h5>
                <p class="text-muted mb-2">This cuts the value from a single-line input field.</p>
                <input ref="cutInput" type="text" class="form-control" value="Temporary token: 8GDF-393K-L99Z" />
                <BButton variant="danger" size="sm" class="mt-2" @click="cutFromInput(cutInput)">
                  <Icon icon="scissors" class="me-1" />
                  Cut Token
                </BButton>
              </div>
            </BCol>

            <BCol xl="6">
              <div class="border border-light rounded p-3 h-100">
                <h5 class="mb-1">Copy Code Snippet</h5>
                <p class="text-muted mb-2">Copy this snippet by clicking the button:</p>
                <pre><code ref="codeSnippet">npm install clipboard --save</code></pre>
                <BButton variant="success" size="sm" class="mt-2" @click="copyFromElement(codeSnippet)">
                  <Icon icon="copy" class="me-1" />
                  Copy Command
                </BButton>
              </div>
            </BCol>

            <BCol xl="6">
              <div class="border border-light rounded p-3 h-100">
                <h5 class="mb-1">Copy from Input Group</h5>
                <p class="text-muted mb-2">Click the copy icon to copy the link here:</p>
                <div class="input-group">
                  <input ref="copyLink" type="text" class="form-control" value="https://example.com/invite?ref=12345" readonly />
                  <BButton variant="secondary" class="btn-icon" @click="copyFromElement(copyLink)">
                    <Icon icon="copy" class="fs-lg" />
                  </BButton>
                </div>
              </div>
            </BCol>

            <BCol xl="6">
              <div class="border border-light rounded p-3 h-100">
                <h5 class="mb-1">Copy Username</h5>
                <p class="text-muted mb-2">Copy a predefined username from a span element.</p>
                <span ref="copyUsername" class="d-block text-primary fw-bold">john_doe_92</span>
                <BButton variant="primary" size="sm" class="mt-2" @click="copyFromElement(copyUsername)">
                  <Icon icon="copy" class="me-1" />
                  Copy Username
                </BButton>
              </div>
            </BCol>

            <BCol xl="6">
              <div class="border border-light rounded p-3 h-100">
                <h5 class="mb-1">Copy Discount Code</h5>
                <p class="text-muted mb-2">Copy a promotional discount code for checkout.</p>
                <div class="input-group">
                  <input ref="discountCode" type="text" class="form-control" value="SAVE20NOW" readonly />
                  <BButton variant="warning" class="btn-icon" @click="copyFromElement(discountCode)">
                    <Icon icon="copy" class="fs-lg" />
                  </BButton>
                </div>
              </div>
            </BCol>

            <BCol xl="6">
              <div class="border border-light rounded p-3 h-100">
                <h5 class="mb-1">Copy HTML Template</h5>
                <p class="text-muted mb-2">Copy a block of HTML code from a tag.</p>
                <pre><code ref="htmlTemplate">&lt;button class="btn btn-primary"&gt;Click Me&lt;/button&gt;</code></pre>
                <BButton variant="info" size="sm" class="mt-2" @click="copyFromElement(htmlTemplate)">
                  <Icon icon="copy" class="me-1" />
                  Copy HTML
                </BButton>
              </div>
            </BCol>
          </BRow>
        </BCardBody>
      </BCard>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BCol, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'

const copyText = async (value: string): Promise<void> => {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(value)
  } else {
    const textarea = document.createElement('textarea')
    textarea.value = value
    textarea.style.position = 'fixed'
    textarea.style.opacity = '0'
    document.body.appendChild(textarea)
    textarea.focus()
    textarea.select()

    try {
      document.execCommand('copy')
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    } finally {
      document.body.removeChild(textarea)
    }
  }
}

const cutText = async (element: HTMLInputElement | HTMLTextAreaElement): Promise<void> => {
  element.select()
  const success = document.execCommand('cut')
  return success ? Promise.resolve() : Promise.reject('Cut failed')
}

const highlightElementText = (el: HTMLElement) => {
  const range = document.createRange()
  range.selectNodeContents(el)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)
}

// Refs for DOM elements
const copytext = ref<HTMLElement | null>(null)
const cutArea = ref<HTMLTextAreaElement | null>(null)
const copyEmail = ref<HTMLElement | null>(null)
const cutInput = ref<HTMLInputElement | null>(null)
const codeSnippet = ref<HTMLElement | null>(null)
const copyLink = ref<HTMLInputElement | null>(null)
const copyUsername = ref<HTMLElement | null>(null)
const discountCode = ref<HTMLInputElement | null>(null)
const htmlTemplate = ref<HTMLElement | null>(null)

const copyFromElement = (el: HTMLElement | null) => {
  if (!el) return
  const value = (el as HTMLInputElement).value || el.innerText
  highlightElementText(el)
  copyText(value)
}

const cutFromInput = (el: HTMLInputElement | HTMLTextAreaElement | null) => {
  if (!el) return
  cutText(el)
}
</script>
