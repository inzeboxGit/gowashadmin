<template>
  <PageBreadcrumb title="Carousel" subtitle="UI" />
  <BRow>
    <BCol lg="6">
      <CardWithAction title="Slides Only" isTogglable>
        <BCarousel ride="carousel">
          <BCarouselSlide img-src="/images/stock/small-1.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-2.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-3.jpg" class="img-fluid" />
        </BCarousel>
      </CardWithAction>
    </BCol>

    <BCol lg="6">
      <CardWithAction title="With Controls" isTogglable>
        <BCarousel controls ride="carousel">
          <BCarouselSlide img-src="/images/stock/small-4.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-1.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-2.jpg" class="img-fluid" />
        </BCarousel>
      </CardWithAction>
    </BCol>

    <BCol lg="6">
      <CardWithAction title="With Indicators" isTogglable>
        <BCarousel controls indicators ride="carousel">
          <BCarouselSlide img-src="/images/stock/small-3.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-2.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-1.jpg" class="img-fluid" />
        </BCarousel>
      </CardWithAction>
    </BCol>

    <BCol lg="6">
      <CardWithAction title="With Captions" isTogglable>
        <BCarousel id="carouselCaptions" controls ride="carousel">
          <BCarouselSlide img-src="/images/stock/small-1.jpg" caption="First slide label" text="Some representative placeholder content for the first slide." class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-3.jpg" caption="Second slide label" text="Some representative placeholder content for the second slide." class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-2.jpg" caption="Third slide label" text="Some representative placeholder content for the third slide." class="img-fluid" />
        </BCarousel>
      </CardWithAction>
    </BCol>

    <BCol lg="6">
      <CardWithAction title="Crossfade" isTogglable>
        <BCarousel id="carouselCrossfade" controls indicators fade ride="carousel">
          <BCarouselSlide img-src="/images/stock/small-1.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-2.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-3.jpg" class="img-fluid" />
        </BCarousel>
      </CardWithAction>
    </BCol>

    <BCol lg="6">
      <CardWithAction title="Individual Interval" isTogglable>
        <BCarousel id="carouselInterval" controls indicators :interval="2000" ride="carousel">
          <BCarouselSlide img-src="/images/stock/small-4.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-3.jpg" class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-2.jpg" class="img-fluid" />
        </BCarousel>
      </CardWithAction>
    </BCol>

    <BCol lg="6">
      <CardWithAction title="Dark Variant" isTogglable>
        <BCarousel controls indicators ride="carousel" class="carousel-dark">
          <BCarouselSlide img-src="/images/stock/small-8.jpg" caption="First slide label" text="Dark variant text example." class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-9.jpg" caption="Second slide label" text="Dark variant text example." class="img-fluid" />
          <BCarouselSlide img-src="/images/stock/small-10.jpg" caption="Third slide label" text="Dark variant text example." class="img-fluid" />
        </BCarousel>
      </CardWithAction>
    </BCol>
  </BRow>
</template>

<script setup lang="ts">
import CardWithAction from '~/components/CardWithAction.vue'
import PageBreadcrumb from '~/components/PageBreadcrumb.vue'
</script>
