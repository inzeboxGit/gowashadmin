<template>
  <PageBreadcrumb title="Accordions" subtitle="UI" />

  <BRow>
    <BCol xl="6">
      <CardWithAction title="Default Accordions" isTogglable>
        <BAccordion>
          <BAccordionItem v-for="(item, idx) in accordionData" :key="idx" :title="item.question + '#' + (idx + 1)" :visible="idx == 0">
            <div v-html="item.answer"></div>
          </BAccordionItem>
        </BAccordion>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Flush Accordions" isTogglable>
        <BAccordion flush>
          <BAccordionItem v-for="(item, idx) in accordionData" :key="idx" :title="item.question + '#' + (idx + 1)" :visible="idx == 0">
            <div v-html="item.answer"></div>
          </BAccordionItem>
        </BAccordion>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Always Open Accordions" isTogglable>
        <BAccordion free>
          <BAccordionItem v-for="(item, idx) in accordionData" :key="idx" :title="item.question + '#' + (idx + 1)" :visible="idx == 0">
            <div v-html="item.answer"></div>
          </BAccordionItem>
        </BAccordion>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Accordion Without Arrow" isTogglable>
        <BAccordion class="accordion-arrow-none">
          <BAccordionItem v-for="(item, idx) in accordionData" :key="idx" :title="item.question + '#' + (idx + 1)" :visible="idx == 0">
            <div v-html="item.answer"></div>
          </BAccordionItem>
        </BAccordion>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Bordered Accordions" isTogglable>
        <BAccordion class="accordion-bordered">
          <BAccordionItem v-for="(item, idx) in accordionData" :key="idx" :title="item.question + '#' + (idx + 1)" :visible="idx == 0">
            <div v-html="item.answer"></div>
          </BAccordionItem>
        </BAccordion>
      </CardWithAction>
    </BCol>

    <BCol xl="6">
      <CardWithAction title="Custom Icon Accordion" isTogglable>
        <BAccordion v-model="activeItem" class="accordion-custom-icon accordion-arrow-none">
          <BAccordionItem id="0">
            <template #title>
              Accordion item with custom icons
              <Icon icon="plus" class="accordion-icon accordion-icon-on" />
              <Icon icon="minus" class="accordion-icon accordion-icon-off" />
            </template>
            <div>
              <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </BAccordionItem>

          <BAccordionItem id="1">
            <template #title>
              Accordion item with custom icons
              <Icon icon="plus" class="accordion-icon accordion-icon-on" />
              <Icon icon="minus" class="accordion-icon accordion-icon-off" />
            </template>

            <div>
              <strong>This is the second item's accordion body.</strong>
              It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or
              overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </BAccordionItem>

          <BAccordionItem id="2">
            <template #title>
              Accordion item with custom icons
              <Icon icon="plus" class="accordion-icon accordion-icon-on" />
              <Icon icon="minus" class="accordion-icon accordion-icon-off" />
            </template>

            <div>
              <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS
              transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
            </div>
          </BAccordionItem>
        </BAccordion>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import { BAccordion, BAccordionItem, BCol, BRow } from 'bootstrap-vue-next'
import { ref } from 'vue'
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
import Icon from '~/components/wrappers/Icon.vue'
const activeItem = ref('0')

type AccordionType = {
  question: string
  answer: string
}

const accordionData: AccordionType[] = [
  {
    question: 'Accordion Item ',
    answer:
      "<strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
  },
  {
    question: 'Accordion Item ',
    answer:
      "<strong>This is the second item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
  },
  {
    question: 'Accordion Item ',
    answer:
      "<strong>This is the third item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.",
  },
]
</script>
